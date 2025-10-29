import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ["en", "hi", "ta", "te", "kn", "ml", "mr", "pa", "bn", "gu", "ur"],
      default: "en",
      select: true,
      // Explicitly exclude from any text indexes
      index: false,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    status: {
      type: String,
      enum: ["coming", "active", "ended"],
      default: "active",
    },
    showtimes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure no text indexes include the language field
movieSchema.index({}, { language: "none" });

export default mongoose.model("Movie", movieSchema);
