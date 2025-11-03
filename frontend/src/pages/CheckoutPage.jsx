import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookingStore } from "../stores/bookingStore";
import api from "../services/api";
import Toast from "../components/Toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime, seats } = location.state || {};
  const { createBooking } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  useEffect(() => {
    if (!movie || !showtime || !seats) {
      navigate("/movies");
    }
  }, [movie, showtime, seats, navigate]);

  if (!movie || !showtime || !seats) {
    return null;
  }

  const totalPrice = seats.length * showtime.price;

  const handleCheckout = async () => {
    if (!paymentMethod) {
      setToast({
        message: "Please select a payment method",
        type: "error",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Lock seats first
      await api.post("/bookings/lock-seats", {
        showtimeId: showtime._id,
        seats,
      });

      // Create booking with movieId
      const bookingResponse = await createBooking(
        showtime._id,
        seats,
        totalPrice,
        movie._id,
        paymentMethod
      );

      if (paymentMethod === "razorpay") {
        // Handle Razorpay payment
        try {
          // Step 1: Create Razorpay Order on backend
          const orderResponse = await api.post(
            "/payments/razorpay/create-order",
            {
              bookingId: bookingResponse._id,
            }
          );

          const { orderId, amount } = orderResponse.data;

          // Step 2: Load Razorpay script if not already loaded
          if (!window.Razorpay) {
            await new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.src = "https://checkout.razorpay.com/v1/checkout.js";
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });
          }

          // Step 3: Initialize Razorpay options
          const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

          if (!razorpayKeyId) {
            throw new Error(
              "Razorpay Key ID is not configured. Please add VITE_RAZORPAY_KEY_ID to .env.local"
            );
          }

          const razorpayOptions = {
            key: razorpayKeyId,
            amount: amount, // in paise
            currency: "INR",
            name: "CineBook",
            description: `Movie Booking - ${movie.title}`,
            order_id: orderId,
            handler: async (response) => {
              try {
                // Step 4: Verify payment on backend
                const verifyResponse = await api.post(
                  "/payments/razorpay/verify",
                  {
                    bookingId: bookingResponse._id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }
                );

                setToast({
                  message: "✅ Payment successful! Booking confirmed.",
                  type: "success",
                });

                setTimeout(() => {
                  navigate("/my-bookings", {
                    state: { bookingConfirmed: true },
                  });
                }, 2000);
              } catch (verifyError) {
                console.error("Verification error:", verifyError);
                setToast({
                  message:
                    verifyError.response?.data?.message ||
                    "Payment verification failed",
                  type: "error",
                });
                setIsProcessing(false);
              }
            },
            prefill: {
              name: "Guest User",
              email: "guest@example.com",
              contact: "9000000000",
            },
            notes: {
              bookingId: bookingResponse._id,
              movieTitle: movie.title,
            },
            theme: {
              color: "#dc2626",
            },
            modal: {
              ondismiss: () => {
                setToast({
                  message: "Payment cancelled. Booking is still reserved.",
                  type: "error",
                });
                setIsProcessing(false);
              },
            },
          };

          // Step 5: Open Razorpay Checkout
          const rzp = new window.Razorpay(razorpayOptions);
          rzp.open();
        } catch (razorpayError) {
          console.error("Razorpay error:", razorpayError);
          setToast({
            message:
              razorpayError.response?.data?.message ||
              "Razorpay integration failed",
            type: "error",
          });
          setIsProcessing(false);
        }
      } else if (paymentMethod === "stripe") {
        // Handle Stripe payment (placeholder for now)
        setToast({
          message: "✅ Booking confirmed! Your seats are reserved.",
          type: "success",
        });

        setTimeout(() => {
          navigate("/my-bookings", {
            state: { bookingConfirmed: true },
          });
        }, 2000);
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Checkout failed",
        type: "error",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-6 sm:py-8 md:py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white mb-6 sm:mb-8">
          Checkout
        </h1>

        <div className="grid gap-6 sm:gap-8">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 sm:space-y-4 border-b border-gray-300 dark:border-gray-600 pb-3 sm:pb-4 mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-base">
                <span className="text-gray-600 dark:text-gray-400">Movie</span>
                <span className="font-bold text-dark dark:text-white">
                  {movie.title}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-base">
                <span className="text-gray-600 dark:text-gray-400">
                  Date & Time
                </span>
                <span className="font-bold text-dark dark:text-white text-right">
                  {new Date(showtime.date).toLocaleDateString()} @{" "}
                  {showtime.startTime}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-base">
                <span className="text-gray-600 dark:text-gray-400">Hall</span>
                <span className="font-bold text-dark dark:text-white">
                  {showtime.theater}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-base">
                <span className="text-gray-600 dark:text-gray-400">Seats</span>
                <span className="font-bold text-dark dark:text-white text-right">
                  {seats.join(", ")}
                </span>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
              {seats.map((seat) => (
                <div
                  key={seat}
                  className="flex justify-between text-xs sm:text-base"
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    Seat {seat}
                  </span>
                  <span className="font-bold text-dark dark:text-white">
                    ₹{showtime.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 pt-3 sm:pt-4">
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-bold text-dark dark:text-white">
                  Total Amount
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  ₹{totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 transition-colors duration-200">
            <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              Payment Method
            </h2>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer border-primary bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition">
                <input
                  type="radio"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 mt-0.5"
                />
                <span className="ml-2 sm:ml-3 font-semibold text-dark dark:text-white text-sm sm:text-base">
                  Credit/Debit Card (Stripe)
                </span>
              </label>

              <label className="flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary transition">
                <input
                  type="radio"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 mt-0.5"
                />
                <span className="ml-2 sm:ml-3 font-semibold text-dark dark:text-white text-sm sm:text-base">
                  Razorpay (UPI/Wallet)
                </span>
              </label>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-red-700 transition disabled:opacity-50 min-h-12 sm:min-h-14"
          >
            {isProcessing
              ? "Processing..."
              : `Pay ₹${totalPrice} & Confirm Booking`}
          </button>

          <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm px-2">
            ⏱️ You have 15 minutes to complete this booking before seats are
            released
          </p>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
