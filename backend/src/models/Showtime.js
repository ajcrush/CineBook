import mongoose from "mongoose";

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // HH:MM format
      required: true,
    },
    endTime: {
      type: String, // HH:MM format
      required: true,
    },
    theater: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
      default: 100,
    },
    seats: [
      {
        seatNumber: String,
        row: String,
        status: {
          type: String,
          enum: ["available", "locked", "booked"],
          default: "available",
        },
        lockedBy: mongoose.Schema.Types.ObjectId,
        lockedUntil: Date,
        bookedBy: mongoose.Schema.Types.ObjectId,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Showtime", showtimeSchema);
