import express from "express";
import Stripe from "stripe";
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

export default router;
