import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import MovieManager from "../components/admin/MovieManager";
import ShowtimeManager from "../components/admin/ShowtimeManager";
import BookingManager from "../components/admin/BookingManager";
import ReportsManager from "../components/admin/ReportsManager";
import UserManager from "../components/admin/UserManager";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("movies");

  if (user?.role !== "admin") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You don't have admin privileges
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
          {["movies", "showtimes", "bookings", "reports", "users"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-bold transition capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg p-6 transition-colors duration-200">
          {activeTab === "movies" && <MovieManager />}

          {activeTab === "showtimes" && <ShowtimeManager />}

          {activeTab === "bookings" && <BookingManager />}

          {activeTab === "reports" && <ReportsManager />}

          {activeTab === "users" && <UserManager />}
        </div>
      </div>
    </div>
  );
}
