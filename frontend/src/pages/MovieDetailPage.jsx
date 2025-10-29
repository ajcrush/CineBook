import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchMovieById(id);
    fetchShowtimes(id);
  }, [id]);

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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div
            className="relative rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-primary to-red-800"
            style={{ aspectRatio: "3/4" }}
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
                <p className="text-6xl font-bold opacity-80">
                  {currentMovie.title?.charAt(0).toUpperCase()}
                </p>
                <p className="text-sm mt-4 px-4">{currentMovie.title}</p>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-dark mb-4">
              {currentMovie.title}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Duration</p>
                <p className="text-2xl font-bold text-primary">
                  {currentMovie.duration} mins
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Language</p>
                <p className="text-2xl font-bold text-primary">
                  {currentMovie.language}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg col-span-2">
                <p className="text-gray-600 text-sm">Genre</p>
                <p className="text-lg font-bold text-dark">
                  {currentMovie.genre?.join(", ")}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-xl font-bold text-dark mb-2">Description</h3>
              <p className="text-gray-700">{currentMovie.description}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-dark mb-4">
                Select Showtime
              </h3>
              <div className="space-y-3">
                {showtimes.length === 0 ? (
                  <p className="text-gray-600">No showtimes available</p>
                ) : (
                  showtimes.map((showtime) => (
                    <button
                      key={showtime._id}
                      onClick={() => setSelectedShowtime(showtime)}
                      className={`w-full p-3 rounded-lg font-semibold transition text-left ${
                        selectedShowtime?._id === showtime._id
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-dark hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{showtime.startTime}</span>
                        <span className="text-sm">Hall {showtime.theater}</span>
                        <span className="text-sm">₹{showtime.price}</span>
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
                    className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition disabled:opacity-50 shadow-lg"
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
