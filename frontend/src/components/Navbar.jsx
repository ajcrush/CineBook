import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          🎬 CineBook
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/movies" className="hover:text-primary transition">
            Movies
          </Link>

          {user ? (
            <>
              <Link to="/my-bookings" className="hover:text-primary transition">
                My Bookings
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-primary transition">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-3">
                <span className="text-sm">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-primary px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Register
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
