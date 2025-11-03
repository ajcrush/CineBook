import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={() => {
        onClick?.();
        setIsMenuOpen(false);
      }}
      className="block px-4 py-2 md:px-0 md:py-0 hover:text-primary transition"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
          🎬 CineBook
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
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

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 transition-colors duration-200">
          <div className="px-4 py-4 space-y-2">
            <NavLink to="/movies">Movies</NavLink>

            {user ? (
              <>
                <NavLink to="/my-bookings">My Bookings</NavLink>
                {user.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
                <div className="pt-2 border-t border-gray-300 dark:border-gray-600">
                  <p className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {user.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 bg-primary text-white rounded hover:bg-red-700 transition font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">
                  <div className="bg-primary text-white px-4 py-2 rounded text-center font-semibold hover:bg-red-700 transition">
                    Register
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
