import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function LandingPage() {
  const { user } = useAuthStore();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
          🎬 CineBook
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
          Your Ultimate Movie Booking Platform
        </p>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
          Book your favorite movies, lock your seats, and enjoy cinematic
          experiences with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          {user ? (
            <>
              <Link
                to="/movies"
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition min-w-[150px]"
              >
                Browse Movies
              </Link>
              <Link
                to="/my-bookings"
                className="border-2 border-primary text-primary px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition min-w-[150px]"
              >
                My Bookings
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition min-w-[150px]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border-2 border-primary text-primary px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition min-w-[150px]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
          Why Choose CineBook?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
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
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary via-red-600 to-orange-500 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="hidden sm:block absolute top-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="hidden sm:block absolute bottom-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 backdrop-blur">
              ✨ Limited Time Offer
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Ready to Experience Cinema?
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
            Book your tickets and enjoy unforgettable movie moments
          </p>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 sm:mb-12">
            Join thousands of happy moviegoers already booking on CineBook
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                50K+
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                Happy Customers
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                500+
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                Movies Available
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                100%
              </div>
              <div className="text-white/80 text-xs sm:text-sm">
                Secure Payment
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          {!user && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/register"
                className="inline-block bg-white text-primary px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎬 Get Started Now
              </Link>
              <Link
                to="/login"
                className="inline-block bg-white/20 text-white border-2 border-white px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition backdrop-blur"
              >
                Sign In
              </Link>
            </div>
          )}

          {user && (
            <Link
              to="/movies"
              className="inline-block bg-white text-primary px-6 sm:px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎬 Browse Movies Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
