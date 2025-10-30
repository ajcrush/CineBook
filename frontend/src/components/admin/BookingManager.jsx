import { useState, useEffect } from "react";
import api from "../../services/api";
import Toast from "../Toast";

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [refundingId, setRefundingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to fetch bookings",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (bookingId) => {
    if (!window.confirm("Are you sure you want to refund this booking?")) {
      return;
    }

    setRefundingId(bookingId);
    try {
      const response = await api.post(`/admin/bookings/${bookingId}/refund`);
      setToast({
        message: response.data.message || "Booking refunded successfully",
        type: "success",
      });
      fetchBookings();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to refund booking",
        type: "error",
      });
    } finally {
      setRefundingId(null);
    }
  };

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((booking) => {
    const searchMatch =
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movie?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      filterStatus === "all" || booking.bookingStatus === filterStatus;

    return searchMatch && statusMatch;
  });

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.put(`/admin/bookings/${bookingId}`, {
        bookingStatus: newStatus,
      });
      setToast({
        message: "Booking status updated",
        type: "success",
      });
      fetchBookings();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to update booking",
        type: "error",
      });
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Manage Bookings
      </h2>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by booking code, user name, email, or movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          />
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex items-center">
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Total Bookings</p>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Confirmed</p>
          <p className="text-2xl font-bold">
            {bookings.filter((b) => b.bookingStatus === "confirmed").length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Total Revenue</p>
          <p className="text-2xl font-bold">
            ₹
            {bookings
              .filter(
                (b) =>
                  b.paymentStatus === "completed" ||
                  b.paymentStatus === "refunded"
              )
              .reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Refunded Amount</p>
          <p className="text-2xl font-bold">
            ₹
            {bookings
              .filter((b) => b.paymentStatus === "refunded")
              .reduce((sum, b) => sum + (b.totalPrice || 0), 0)}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No bookings found</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Booking Code
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Movie
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  User
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Seats
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Payment
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-sm text-gray-900 dark:text-white">
                    {booking.bookingCode}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {booking.movie?.title}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {booking.user?.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {booking.user?.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {booking.seats?.map((seat, idx) => (
                        <span key={idx} className="inline-block mr-2">
                          {seat.row}
                          {seat.seatNumber}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">
                    ₹{booking.totalPrice}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.bookingStatus}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-sm font-semibold border-0 cursor-pointer ${getStatusBadgeColor(
                        booking.bookingStatus
                      )}`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getPaymentStatusBadgeColor(
                        booking.paymentStatus
                      )}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(booking.createdAt).toLocaleDateString()} <br />
                    <span className="text-gray-600">
                      {new Date(booking.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRefund(booking._id)}
                      disabled={
                        booking.paymentStatus === "refunded" ||
                        refundingId === booking._id
                      }
                      className={`px-3 py-1 rounded text-sm font-semibold transition ${
                        booking.paymentStatus === "refunded"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600 active:scale-95"
                      }`}
                    >
                      {refundingId === booking._id ? "Refunding..." : "Refund"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
