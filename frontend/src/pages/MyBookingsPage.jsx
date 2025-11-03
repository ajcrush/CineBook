import { useEffect, useState } from "react";
import { useBookingStore } from "../stores/bookingStore";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import Modal from "../components/Modal";

export default function MyBookingsPage() {
  const { bookings, getMyBookings, cancelBooking, isLoading, error } =
    useBookingStore();
  const [toast, setToast] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    getMyBookings();
  }, [getMyBookings]);

  const handleCancelBooking = async () => {
    try {
      await cancelBooking(selectedBooking._id);
      setToast({ message: "Booking cancelled successfully", type: "success" });
      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to cancel",
        type: "error",
      });
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-500 text-white p-4 rounded">Error: {error}</div>
      </div>
    );
  }

  // Safety check to ensure bookings is always an array
  const bookingsArray = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          My Bookings
        </h1>

        {isLoading ? (
          <Loader />
        ) : bookingsArray.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg p-12 text-center transition-colors duration-200">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Bookings Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start booking your favorite movies
            </p>
            <a
              href="/movies"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Browse Movies
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.isArray(bookingsArray) &&
              bookingsArray.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg p-6 transition-colors duration-200"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Movie Title
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {booking.movie?.title}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Booking Details
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        Seats:{" "}
                        {booking.seats?.map((s) => s.seatNumber).join(", ")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Total Amount
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{booking.totalPrice}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                            booking.paymentStatus === "completed"
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                              : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          }`}
                        >
                          {booking.paymentStatus}
                        </span>
                        {booking.bookingStatus === "confirmed" && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowCancelModal(true);
                            }}
                            className="px-3 py-1 bg-red-500 dark:bg-red-600 text-white rounded font-bold hover:bg-red-600 dark:hover:bg-red-700 transition text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Booking"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to cancel this booking? Your amount will be
            refunded.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowCancelModal(false)}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded font-bold hover:bg-gray-400 dark:hover:bg-gray-700 transition"
            >
              Keep Booking
            </button>
            <button
              onClick={handleCancelBooking}
              className="flex-1 bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-600 dark:hover:bg-red-700 transition"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </Modal>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
