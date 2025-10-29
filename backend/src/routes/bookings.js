import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import Booking from "../models/Booking.js";
import Showtime from "../models/Showtime.js";
import User from "../models/User.js";

const router = express.Router();

// Helper function to release expired seat locks
const releaseExpiredLocks = async (showtime) => {
  const now = new Date();
  let hasChanges = false;

  showtime.seats.forEach((seat) => {
    // If seat is locked and lock time has expired, release it
    if (
      seat.status === "locked" &&
      seat.lockedUntil &&
      new Date(seat.lockedUntil) < now
    ) {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockedUntil = null;
      hasChanges = true;
    }
  });

  if (hasChanges) {
    await showtime.save();
  }

  return hasChanges;
};

// Lock seats
router.post("/lock-seats", authenticateToken, async (req, res) => {
  try {
    const { showtimeId, seats } = req.body;

    if (!showtimeId || !seats || seats.length === 0) {
      return res
        .status(400)
        .json({ message: "ShowtimeId and seats are required" });
    }

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Release any expired locks first
    await releaseExpiredLocks(showtime);

    // Lock seats for 15 minutes
    const lockDuration = 15 * 60 * 1000;
    const lockedUntil = new Date(Date.now() + lockDuration);

    seats.forEach((seatNumber) => {
      const seat = showtime.seats.find((s) => s.seatNumber === seatNumber);
      if (seat && seat.status === "available") {
        seat.status = "locked";
        seat.lockedBy = req.user.id;
        seat.lockedUntil = lockedUntil;
      }
    });

    await showtime.save();

    res.json({
      message: "Seats locked successfully",
      lockedUntil,
      seats: seats,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create booking
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { showtimeId, movieId, seats } = req.body;

    if (!showtimeId || !movieId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Release any expired locks first
    await releaseExpiredLocks(showtime);

    // Verify seats exist and are available or locked
    const validSeats = [];
    seats.forEach((seatNumber) => {
      const seat = showtime.seats.find((s) => s.seatNumber === seatNumber);
      if (seat && (seat.status === "available" || seat.status === "locked")) {
        validSeats.push(seat);
      }
    });

    if (validSeats.length !== seats.length) {
      return res.status(400).json({ message: "Some seats are not available" });
    }

    // Generate unique booking code
    const bookingCode = `BOOK-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    // Calculate total price
    const totalPrice = showtime.price * seats.length;

    // Map seats with their row information
    const bookingSeats = [];
    for (const seatNumber of seats) {
      const seat = showtime.seats.find((s) => s.seatNumber === seatNumber);
      if (seat) {
        bookingSeats.push({
          seatNumber,
          row: seat.row,
        });
      }
    }

    // Create booking
    const booking = new Booking({
      user: req.user.id,
      showtime: showtimeId,
      movie: movieId,
      seats: bookingSeats,
      totalPrice: totalPrice,
      bookingCode,
      paymentStatus: "pending",
      bookingStatus: "confirmed",
    });

    await booking.save();

    // Update seats to 'booked'
    seats.forEach((seatNumber) => {
      const seat = showtime.seats.find((s) => s.seatNumber === seatNumber);
      if (seat) {
        seat.status = "booked";
        seat.bookedBy = req.user.id;
      }
    });

    await showtime.save();

    // Add booking to user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookings: booking._id },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user bookings
router.get("/my-bookings", authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("movie")
      .populate("showtime")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get showtime seats with expired locks released
router.get("/showtime/:showtimeId/seats", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.showtimeId);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Release any expired locks
    await releaseExpiredLocks(showtime);

    // Return updated seats
    res.json({
      message: "Seats retrieved successfully",
      seats: showtime.seats,
      showtimeId: showtime._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get booking details
router.get("/:bookingId", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("movie")
      .populate("showtime")
      .populate("user");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user is the booking owner or admin
    if (
      booking.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Cancel booking
router.post("/:bookingId/cancel", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    // Free up seats
    const showtime = await Showtime.findById(booking.showtime);
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

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
