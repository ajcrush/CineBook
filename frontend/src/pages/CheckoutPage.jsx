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
      await createBooking(
        showtime._id,
        seats,
        totalPrice,
        movie._id,
        paymentMethod
      );

      // Note: Stripe payment integration would go here
      // For now, we'll just confirm the booking
      // const paymentResponse = await api.post("/payments/create-intent", {
      //   bookingId: booking._id,
      // });

      // In a real app, you would integrate Stripe Elements here
      // For now, we'll mock the payment confirmation
      setToast({
        message: "✅ Booking confirmed! Your seats are reserved.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/my-bookings", {
          state: { bookingConfirmed: true },
        });
      }, 2000);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Checkout failed",
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

        <div className="grid gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-dark mb-4">Order Summary</h2>

            <div className="space-y-4 border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Movie</span>
                <span className="font-bold text-dark">{movie.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-bold text-dark">
                  {new Date(showtime.date).toLocaleDateString()} @{" "}
                  {showtime.startTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hall</span>
                <span className="font-bold text-dark">{showtime.theater}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats</span>
                <span className="font-bold text-dark">{seats.join(", ")}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {seats.map((seat) => (
                <div key={seat} className="flex justify-between">
                  <span className="text-gray-600">Seat {seat}</span>
                  <span className="font-bold text-dark">₹{showtime.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-bold text-dark">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-dark mb-4">
              Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer border-primary bg-blue-50">
                <input
                  type="radio"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-semibold text-dark">
                  Credit/Debit Card (Stripe)
                </span>
              </label>

              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer border-gray-300 hover:border-primary">
                <input
                  type="radio"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="ml-3 font-semibold text-dark">
                  Razorpay (UPI/Wallet)
                </span>
              </label>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isProcessing
              ? "Processing..."
              : `Pay ₹${totalPrice} & Confirm Booking`}
          </button>

          <p className="text-center text-gray-600 text-sm">
            ⏱️ You have 15 minutes to complete this booking before seats are
            released
          </p>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
