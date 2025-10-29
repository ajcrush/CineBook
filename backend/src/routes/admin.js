import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken, requireRole } from "../middleware/auth.js";
import Movie from "../models/Movie.js";
import Showtime from "../models/Showtime.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware to check admin role
const adminAuth = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
};

// Create movie (admin only)
router.post(
  "/movies",
  adminAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("genre").isArray().withMessage("Genre must be an array"),
    body("language")
      .notEmpty()
      .withMessage("Language is required")
      .isIn(["en", "hi", "ta", "te", "kn", "ml", "mr", "pa", "bn", "gu", "ur"])
      .withMessage("Invalid language selected"),
    body("duration").isNumeric().withMessage("Duration must be a number"),
    body("releaseDate")
      .isISO8601()
      .withMessage("Valid release date is required"),
    body("posterUrl").isURL().withMessage("Valid poster URL is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        description,
        genre,
        language,
        duration,
        releaseDate,
        posterUrl,
        status,
      } = req.body;

      const movie = new Movie({
        title,
        description,
        genre,
        language,
        duration,
        releaseDate,
        posterUrl,
        status: status || "active",
      });

      await movie.save();
      res.status(201).json({ message: "Movie created", movie });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Update movie (admin only)
router.put("/movies/:movieId", adminAuth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie updated", movie });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete movie (admin only)
router.delete("/movies/:movieId", adminAuth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create showtime (admin only)
router.post(
  "/showtimes",
  adminAuth,
  [
    body("movieId").notEmpty().withMessage("Movie ID is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("startTime").notEmpty().withMessage("Start time is required"),
    body("endTime").notEmpty().withMessage("End time is required"),
    body("theater").notEmpty().withMessage("Theater is required"),
    body("totalSeats").isNumeric().withMessage("Total seats must be a number"),
    body("price").isNumeric().withMessage("Price must be a number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { movieId, date, startTime, endTime, theater, totalSeats, price } =
        req.body;

      // Verify movie exists
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // Generate seats
      const seats = [];
      const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const seatsPerRow = Math.ceil(totalSeats / rows.length);

      for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= seatsPerRow; j++) {
          if (seats.length < totalSeats) {
            seats.push({
              seatNumber: `${rows[i]}${j}`,
              row: rows[i],
              status: "available",
            });
          }
        }
      }

      const showtime = new Showtime({
        movie: movieId,
        date,
        startTime,
        endTime,
        theater,
        totalSeats,
        seats,
        price,
      });

      await showtime.save();

      // Add showtime to movie
      movie.showtimes.push(showtime._id);
      await movie.save();

      res.status(201).json({ message: "Showtime created", showtime });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Update showtime (admin only)
router.put("/showtimes/:showtimeId", adminAuth, async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(
      req.params.showtimeId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json({ message: "Showtime updated", showtime });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete showtime (admin only)
router.delete("/showtimes/:showtimeId", adminAuth, async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.showtimeId);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Remove from movie
    if (showtime.movie) {
      await Movie.findByIdAndUpdate(showtime.movie, {
        $pull: { showtimes: showtime._id },
      });
    }

    res.json({ message: "Showtime deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all showtimes with movie details (admin only)
router.get("/showtimes/list/all", adminAuth, async (req, res) => {
  try {
    const showtimes = await Showtime.find()
      .populate("movie", "title status")
      .sort({ date: 1 });

    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get admin dashboard data
router.get("/dashboard/stats", adminAuth, async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    const recentBookings = await Booking.find()
      .populate("user", "name email")
      .populate("movie", "title")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalMovies,
      totalUsers,
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentBookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all bookings (admin only)
router.get("/bookings", adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("movie", "title")
      .populate("showtime")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all users (admin only)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update booking status (admin only)
router.put("/bookings/:bookingId", adminAuth, async (req, res) => {
  try {
    const { bookingStatus } = req.body;

    if (!["confirmed", "completed", "cancelled"].includes(bookingStatus)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { bookingStatus },
      { new: true }
    )
      .populate("user", "name email")
      .populate("movie", "title")
      .populate("showtime");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Refund booking (admin only)
router.post("/bookings/:bookingId/refund", adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.paymentStatus === "refunded") {
      return res.status(400).json({ message: "Booking already refunded" });
    }

    if (booking.paymentStatus === "pending") {
      return res
        .status(400)
        .json({ message: "Cannot refund a pending payment" });
    }

    // Update payment status to refunded
    booking.paymentStatus = "refunded";
    booking.bookingStatus = "cancelled";
    await booking.save();

    // Free up seats
    const showtime = await Showtime.findById(booking.showtime);
    if (showtime) {
      booking.seats.forEach((bookingSeat) => {
        const seat = showtime.seats.find(
          (s) => s.seatNumber === bookingSeat.seatNumber
        );
        if (seat) {
          seat.status = "available";
          seat.bookedBy = null;
        }
      });
      await showtime.save();
    }

    // Populate for response
    await booking.populate("user", "name email");
    await booking.populate("movie", "title");
    await booking.populate("showtime");

    res.json({
      message: "Booking refunded successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get analytics data (admin only)
router.get("/analytics", adminAuth, async (req, res) => {
  try {
    const { range = "all" } = req.query;

    // Calculate date range
    let startDate = new Date(0); // Beginning of time for 'all'
    const now = new Date();

    if (range === "7days") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === "30days") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (range === "90days") {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    }

    // Get current period bookings
    const bookings = await Booking.find({ createdAt: { $gte: startDate } })
      .populate("movie", "title")
      .populate("showtime");

    // Get previous period for growth calculation
    const periodLength =
      range === "7days"
        ? 7
        : range === "30days"
        ? 30
        : range === "90days"
        ? 90
        : 365;
    const prevStartDate = new Date(
      startDate.getTime() - periodLength * 24 * 60 * 60 * 1000
    );
    const prevBookings = await Booking.find({
      createdAt: { $gte: prevStartDate, $lt: startDate },
    });

    // Calculate metrics
    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.paymentStatus === "completed" ? b.totalPrice : 0),
      0
    );
    const prevRevenue = prevBookings.reduce(
      (sum, b) => sum + (b.paymentStatus === "completed" ? b.totalPrice : 0),
      0
    );
    const revenueGrowth =
      prevRevenue > 0
        ? Math.round(((totalRevenue - prevRevenue) / prevRevenue) * 100)
        : 0;

    const totalBookings = bookings.length;
    const prevTotalBookings = prevBookings.length;
    const bookingGrowth =
      prevTotalBookings > 0
        ? Math.round(
            ((totalBookings - prevTotalBookings) / prevTotalBookings) * 100
          )
        : 0;

    // Calculate occupancy
    const showtimes = await Showtime.find();
    const totalSeats = showtimes.reduce((sum, s) => sum + s.totalSeats, 0);
    const bookedSeats = showtimes.reduce(
      (sum, s) =>
        sum + s.seats.filter((seat) => seat.status === "booked").length,
      0
    );

    // Payment status distribution
    const paymentStats = {
      completed: bookings.filter((b) => b.paymentStatus === "completed").length,
      pending: bookings.filter((b) => b.paymentStatus === "pending").length,
      failed: bookings.filter((b) => b.paymentStatus === "failed").length,
      refunded: bookings.filter((b) => b.paymentStatus === "refunded").length,
    };

    // Booking status distribution
    const bookingStats = {
      confirmed: bookings.filter((b) => b.bookingStatus === "confirmed").length,
      completed: bookings.filter((b) => b.bookingStatus === "completed").length,
      cancelled: bookings.filter((b) => b.bookingStatus === "cancelled").length,
    };

    // Cancelled bookings
    const cancelledBookings = bookings.filter(
      (b) => b.bookingStatus === "cancelled"
    ).length;

    // Refunded amount
    const refundedAmount = bookings
      .filter((b) => b.paymentStatus === "refunded")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    // Active movies count
    const activeMovies = await Movie.countDocuments({ status: "active" });

    // Upcoming showtimes
    const upcomingShowtimes = await Showtime.countDocuments({
      date: { $gte: new Date() },
    });

    // Top movies by bookings
    const movieBookings = {};
    bookings.forEach((booking) => {
      if (booking.movie) {
        if (!movieBookings[booking.movie._id]) {
          movieBookings[booking.movie._id] = {
            title: booking.movie.title,
            totalBookings: 0,
            totalRevenue: 0,
            avgSeatsBooked: 0,
          };
        }
        movieBookings[booking.movie._id].totalBookings += 1;
        movieBookings[booking.movie._id].totalRevenue +=
          booking.paymentStatus === "completed" ? booking.totalPrice : 0;
        movieBookings[booking.movie._id].avgSeatsBooked += booking.seats.length;
      }
    });

    const topMovies = Object.values(movieBookings)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10)
      .map((movie) => ({
        ...movie,
        avgSeatsBooked: Math.round(movie.avgSeatsBooked / movie.totalBookings),
      }));

    // Theater occupancy
    const theaterOccupancy = {};
    showtimes.forEach((showtime) => {
      if (!theaterOccupancy[showtime.theater]) {
        theaterOccupancy[showtime.theater] = {
          name: showtime.theater,
          totalSeats: 0,
          bookedSeats: 0,
        };
      }
      theaterOccupancy[showtime.theater].totalSeats += showtime.totalSeats;
      theaterOccupancy[showtime.theater].bookedSeats += showtime.seats.filter(
        (s) => s.status === "booked"
      ).length;
    });

    res.json({
      totalRevenue,
      revenueGrowth,
      totalBookings,
      bookingGrowth,
      totalSeats,
      bookedSeats,
      paymentStats,
      bookingStats,
      cancelledBookings,
      refundedAmount,
      activeMovies,
      upcomingShowtimes,
      topMovies,
      theaterOccupancy: Object.values(theaterOccupancy),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Promote user to admin (admin only)
router.post("/users/:userId/promote", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "User is already an admin" });
    }

    user.role = "admin";
    await user.save();

    res.json({
      message: "User promoted to admin successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Ban user (admin only)
router.post("/users/:userId/ban", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "banned") {
      return res.status(400).json({ message: "User is already banned" });
    }

    user.status = "banned";
    await user.save();

    res.json({
      message: "User banned successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Unban user (admin only)
router.post("/users/:userId/unban", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === "active") {
      return res.status(400).json({ message: "User is already active" });
    }

    user.status = "active";
    await user.save();

    res.json({
      message: "User unbanned successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
