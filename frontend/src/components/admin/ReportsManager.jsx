import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import Toast from "../Toast";

export default function ReportsManager() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [dateRange, setDateRange] = useState("all");

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/analytics?range=${dateRange}`);
      setAnalytics(response.data);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to fetch analytics",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading || !analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  // Calculate occupancy rate
  const occupancyRate =
    analytics.totalSeats > 0
      ? Math.round((analytics.bookedSeats / analytics.totalSeats) * 100)
      : 0;

  // Calculate average booking value
  const avgBookingValue =
    analytics.totalBookings > 0
      ? Math.round(analytics.totalRevenue / analytics.totalBookings)
      : 0;

  // Calculate payment completion rate
  const completedPayments = analytics.paymentStats?.completed || 0;
  const paymentCompletionRate =
    analytics.totalBookings > 0
      ? Math.round((completedPayments / analytics.totalBookings) * 100)
      : 0;

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
        Reports & Analytics
      </h2>

      {/* Date Range Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {[
          { value: "7days", label: "Last 7 Days" },
          { value: "30days", label: "Last 30 Days" },
          { value: "90days", label: "Last 90 Days" },
          { value: "all", label: "All Time" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setDateRange(option.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              dateRange === option.value
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-sm opacity-80 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold">
            ₹{analytics.totalRevenue.toLocaleString()}
          </p>
          {analytics.revenueGrowth !== undefined && (
            <p
              className={`text-sm mt-2 ${
                analytics.revenueGrowth >= 0 ? "text-green-200" : "text-red-200"
              }`}
            >
              {analytics.revenueGrowth >= 0 ? "+" : ""}
              {analytics.revenueGrowth}% from last period
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-sm opacity-80 mb-2">Total Bookings</p>
          <p className="text-3xl font-bold">{analytics.totalBookings}</p>
          {analytics.bookingGrowth !== undefined && (
            <p
              className={`text-sm mt-2 ${
                analytics.bookingGrowth >= 0 ? "text-green-200" : "text-red-200"
              }`}
            >
              {analytics.bookingGrowth >= 0 ? "+" : ""}
              {analytics.bookingGrowth}% from last period
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-sm opacity-80 mb-2">Occupancy Rate</p>
          <p className="text-3xl font-bold">{occupancyRate}%</p>
          <p className="text-sm mt-2 opacity-90">
            {analytics.bookedSeats} / {analytics.totalSeats} seats
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-lg shadow-lg">
          <p className="text-sm opacity-80 mb-2">Avg Booking Value</p>
          <p className="text-3xl font-bold">₹{avgBookingValue}</p>
          <p className="text-sm mt-2 opacity-90">
            Payment Rate: {paymentCompletionRate}%
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Active Movies
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {analytics.activeMovies}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Upcoming Showtimes
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {analytics.upcomingShowtimes}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Cancelled Bookings
          </p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {analytics.cancelledBookings}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Refunded Amount
          </p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            ₹{analytics.refundedAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Payment Status Distribution */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Payment Status Distribution
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Completed",
                value: analytics.paymentStats?.completed || 0,
                color: "bg-green-500",
              },
              {
                label: "Pending",
                value: analytics.paymentStats?.pending || 0,
                color: "bg-yellow-500",
              },
              {
                label: "Failed",
                value: analytics.paymentStats?.failed || 0,
                color: "bg-red-500",
              },
              {
                label: "Refunded",
                value: analytics.paymentStats?.refunded || 0,
                color: "bg-purple-500",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{
                        width: `${
                          analytics.totalBookings > 0
                            ? (item.value / analytics.totalBookings) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-200 w-12 text-right">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Booking Status Distribution
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Confirmed",
                value: analytics.bookingStats?.confirmed || 0,
                color: "bg-green-500",
              },
              {
                label: "Completed",
                value: analytics.bookingStats?.completed || 0,
                color: "bg-blue-500",
              },
              {
                label: "Cancelled",
                value: analytics.bookingStats?.cancelled || 0,
                color: "bg-red-500",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{
                        width: `${
                          analytics.totalBookings > 0
                            ? (item.value / analytics.totalBookings) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 dark:text-gray-200 w-12 text-right">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Movies */}
      {analytics.topMovies && analytics.topMovies.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg mb-8 transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Top Movies by Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-gray-900 dark:text-white">
                    Movie
                  </th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900 dark:text-white">
                    Bookings
                  </th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900 dark:text-white">
                    Revenue
                  </th>
                  <th className="px-4 py-2 text-right font-bold text-gray-900 dark:text-white">
                    Avg Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {analytics.topMovies.map((movie, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                      {movie.title}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                      {movie.totalBookings}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-gray-100">
                      ₹{movie.totalRevenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                        {movie.avgSeatsBooked || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Occupancy by Theater */}
      {analytics.theaterOccupancy && analytics.theaterOccupancy.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Occupancy by Theater
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {analytics.theaterOccupancy.map((theater, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {theater.name}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(
                      (theater.bookedSeats / theater.totalSeats) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                    style={{
                      width: `${
                        (theater.bookedSeats / theater.totalSeats) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {theater.bookedSeats} / {theater.totalSeats} seats
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
