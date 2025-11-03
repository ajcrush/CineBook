import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieStore } from "../stores/movieStore";
import { useBookingStore } from "../stores/bookingStore";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import SeatSelector from "../components/SeatSelector";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentMovie, fetchMovieById, fetchShowtimes, showtimes, isLoading } =
    useMovieStore();
  const { lockSeats } = useBookingStore();
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [toast, setToast] = useState(null);

  const fetchMovieData = useCallback(() => {
    fetchMovieById(id);
    fetchShowtimes(id);
  }, [id, fetchMovieById, fetchShowtimes]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleLockSeats = async () => {
    if (!selectedShowtime || selectedSeats.length === 0) {
      setToast({ message: "Please select showtime and seats", type: "error" });
      return;
    }

    try {
      await lockSeats(selectedShowtime._id, selectedSeats);
      setToast({
        message: "Seats locked! 15 minutes to complete booking",
        type: "success",
      });
      setTimeout(() => {
        navigate("/checkout", {
          state: {
            movie: currentMovie,
            showtime: selectedShowtime,
            seats: selectedSeats,
          },
        });
      }, 1500);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to lock seats",
        type: "error",
      });
    }
  };

  if (isLoading || !currentMovie) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-6 sm:py-8 md:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Movie Poster */}
          <div
            className="relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-primary to-red-800 mx-auto w-full md:w-auto"
            style={{ aspectRatio: "3/4", maxWidth: "300px" }}
          >
            <img
              src={currentMovie.posterUrl}
              alt={currentMovie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.querySelector(
                  "[data-fallback]"
                ).style.display = "flex";
              }}
            />
            <div
              data-fallback
              className="absolute inset-0 flex items-center justify-center"
              style={{ display: "none" }}
            >
              <div className="text-center text-white">
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold opacity-80">
                  {currentMovie.title?.charAt(0).toUpperCase()}
                </p>
                <p className="text-xs sm:text-sm mt-4 px-4">
                  {currentMovie.title}
                </p>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
              {currentMovie.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  Duration
                </p>
                <p className="text-lg sm:text-2xl font-bold text-primary">
                  {currentMovie.duration} mins
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  Language
                </p>
                <p className="text-lg sm:text-2xl font-bold text-primary">
                  {currentMovie.language}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg col-span-2">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  Genre
                </p>
                <p className="text-base sm:text-lg font-bold text-dark dark:text-white">
                  {currentMovie.genre?.join(", ")}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow mb-6 transition-colors duration-200">
              <h3 className="text-lg sm:text-xl font-bold text-dark dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {currentMovie.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow transition-colors duration-200">
              <h3 className="text-lg sm:text-xl font-bold text-dark dark:text-white mb-3 sm:mb-4">
                Select Showtime
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {showtimes.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    No showtimes available
                  </p>
                ) : (
                  showtimes.map((showtime) => (
                    <button
                      key={showtime._id}
                      onClick={() => setSelectedShowtime(showtime)}
                      className={`w-full p-3 rounded-lg font-semibold transition text-left text-sm sm:text-base ${
                        selectedShowtime?._id === showtime._id
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span>{showtime.startTime}</span>
                        <div className="flex justify-between sm:gap-4">
                          <span className="text-xs sm:text-sm">
                            Hall {showtime.theater}
                          </span>
                          <span className="text-xs sm:text-sm font-bold">
                            ₹{showtime.price}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {selectedShowtime && (
              <div className="mt-6">
                <SeatSelector
                  seats={selectedShowtime.seats}
                  selectedSeats={selectedSeats}
                  onSeatClick={handleSeatClick}
                  theater={selectedShowtime.theater}
                  price={selectedShowtime.price}
                />

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleLockSeats}
                    disabled={selectedSeats.length === 0}
                    className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-red-700 transition disabled:opacity-50 shadow-lg w-full sm:w-auto"
                  >
                    Lock & Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
