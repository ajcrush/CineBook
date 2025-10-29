import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-primary text-white p-2 rounded-lg">🎬</span>
              CineBook
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your ultimate destination for booking movie tickets online.
              Experience cinema like never before.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-white transition-colors"
                >
                  +91 7004942830
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a
                  href="mailto:support@cinebook.com"
                  className="hover:text-white transition-colors"
                >
                  support@cinebook.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span>Chandigarh, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Browse Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → My Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Special Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  → Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Follow Us</h4>
            <p className="text-gray-400 mb-6">
              Stay updated with latest movie releases and offers
            </p>
            <div className="flex gap-4 mb-8">
              <a
                href="#facebook"
                className="bg-gray-800 dark:bg-gray-800 hover:bg-primary p-3 rounded-full transition-colors"
                title="Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#twitter"
                className="bg-gray-800 dark:bg-gray-800 hover:bg-primary p-3 rounded-full transition-colors"
                title="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href="#instagram"
                className="bg-gray-800 dark:bg-gray-800 hover:bg-primary p-3 rounded-full transition-colors"
                title="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="#linkedin"
                className="bg-gray-800 dark:bg-gray-800 hover:bg-primary p-3 rounded-full transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l bg-gray-800 dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-r transition-colors font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Features */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">✓</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">✓</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg">✓</span>
              <span>Easy Cancellation</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © {currentYear} CineBook. All rights reserved. | Made with{" "}
              <span className="text-primary">❤</span> by CineBook Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
