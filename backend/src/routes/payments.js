import express from "express";
import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
import { authenticateToken } from "../middleware/auth.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Initialize Stripe with the API key from environment
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
};

// Initialize Razorpay with the API key from environment
const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set");
  }
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

// Create payment intent
router.post("/create-intent", authenticateToken, async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Create Stripe payment intent
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100), // Convert to cents
      currency: "inr",
      metadata: {
        bookingId: booking._id.toString(),
        userId: req.user.id,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Confirm payment
router.post("/confirm-payment", authenticateToken, async (req, res) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    if (!bookingId || !paymentIntentId) {
      return res
        .status(400)
        .json({ message: "Booking ID and Payment Intent ID are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Retrieve payment intent from Stripe
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      booking.paymentStatus = "completed";
      booking.paymentId = paymentIntentId;
      booking.bookingStatus = "confirmed";
      await booking.save();

      return res.json({
        message: "Payment confirmed successfully",
        booking,
      });
    } else if (paymentIntent.status === "processing") {
      return res.json({
        message: "Payment is processing",
        status: "processing",
      });
    } else {
      booking.paymentStatus = "failed";
      await booking.save();

      return res.status(400).json({
        message: "Payment failed",
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Webhook for Stripe events
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
      const stripe = getStripe();
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || "test_secret"
      );

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const booking = await Booking.findById(
          paymentIntent.metadata.bookingId
        );

        if (booking) {
          booking.paymentStatus = "completed";
          booking.paymentId = paymentIntent.id;
          await booking.save();
        }
      } else if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;
        const booking = await Booking.findById(
          paymentIntent.metadata.bookingId
        );

        if (booking) {
          booking.paymentStatus = "failed";
          await booking.save();
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Webhook error", error: error.message });
    }
  }
);

// ===== RAZORPAY ENDPOINTS =====

// Create Razorpay Order
router.post("/razorpay/create-order", authenticateToken, async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Create Razorpay Order
    const razorpay = getRazorpay();
    const amountInPaise = Math.round(booking.totalPrice * 100); // Convert to paise

    const orderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `booking_${booking._id.toString()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const order = await razorpay.orders.create(orderOptions);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      bookingId: booking._id.toString(),
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Verify Razorpay Payment
router.post("/razorpay/verify", authenticateToken, async (req, res) => {
  try {
    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !bookingId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature",
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Verify Razorpay Signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      booking.paymentStatus = "failed";
      await booking.save();
      return res.status(400).json({
        message: "Payment verification failed - Invalid signature",
      });
    }

    // Signature is valid, mark booking as paid
    booking.paymentStatus = "completed";
    booking.paymentId = razorpay_payment_id;
    booking.bookingStatus = "confirmed";
    booking.razorpayOrderId = razorpay_order_id;
    await booking.save();

    res.json({
      message: "Payment verified successfully",
      booking,
    });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Razorpay Webhook (optional but recommended)
router.post("/razorpay/webhook", express.json(), async (req, res) => {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const sig = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    if (generatedSignature !== sig) {
      return res
        .status(400)
        .json({ message: "Webhook signature verification failed" });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "payment.authorized" || event === "payment.captured") {
      const paymentData = payload.payment.entity;
      const booking = await Booking.findOne({
        razorpayOrderId: paymentData.order_id,
      });

      if (booking) {
        booking.paymentStatus = "completed";
        booking.paymentId = paymentData.id;
        booking.bookingStatus = "confirmed";
        await booking.save();
        console.log(`Booking ${booking._id} payment confirmed via webhook`);
      }
    } else if (event === "payment.failed") {
      const paymentData = payload.payment.entity;
      const booking = await Booking.findOne({
        razorpayOrderId: paymentData.order_id,
      });

      if (booking) {
        booking.paymentStatus = "failed";
        await booking.save();
        console.log(`Booking ${booking._id} payment failed via webhook`);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ message: "Webhook error", error: error.message });
  }
});

export default router;
