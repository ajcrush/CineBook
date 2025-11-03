import express from "express";
import { body, validationResult } from "express-validator";
import Movie from "../models/Movie.js";
import Showtime from "../models/Showtime.js";

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({
      status: { $in: ["active", "coming"] },
    }).populate("showtimes");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get single movie with showtimes
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate({
      path: "showtimes",
      match: {
        date: {
          $gte: new Date(new Date().toISOString().split("T")[0]),
        },
      },
      options: { sort: { date: 1 } },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get showtimes for a movie
router.get("/:movieId/showtimes", async (req, res) => {
  try {
    const showtimes = await Showtime.find({
      movie: req.params.movieId,
    }).sort({ date: 1 });

    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get showtime details with seats
router.get("/showtime/:showtimeId", async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.showtimeId).populate(
      "movie"
    );

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    res.json(showtime);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
