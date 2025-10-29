import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function LandingPage() {
  const { user } = useAuthStore();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">🎬 CineBook</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Your Ultimate Movie Booking Platform
        </p>
        <p className="text-gray-700 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Book your favorite movies, lock your seats, and enjoy cinematic
          experiences with ease.
        </p>

        <div className="flex gap-4 justify-center">
          {user ? (
            <>
              <Link
                to="/movies"
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Browse Movies
              </Link>
              <Link
                to="/my-bookings"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition"
              >
                My Bookings
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose CineBook?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-200">
            <div className="text-4xl mb-4">🎟️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Easy Booking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Book your tickets in just a few clicks
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-200">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Secure Payment
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Safe and secure payment with Stripe
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center transition-colors duration-200">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              15 Min Lock
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              15 minutes to complete your booking
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary via-red-600 to-orange-500 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur">
              ✨ Limited Time Offer
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Experience Cinema?
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-2">
            Book your tickets and enjoy unforgettable movie moments
          </p>
          <p className="text-white/80 text-lg mb-10">
            Join thousands of happy moviegoers already booking on CineBook
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-white/80 text-sm">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/80 text-sm">Movies Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-white/80 text-sm">Secure Payment</div>
            </div>
          </div>

          {/* CTA Buttons */}
          {!user && (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎬 Get Started Now
              </Link>
              <Link
                to="/login"
                className="inline-block bg-white/20 text-white border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition backdrop-blur"
              >
                Sign In
              </Link>
            </div>
          )}

          {user && (
            <Link
              to="/movies"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎬 Browse Movies Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
