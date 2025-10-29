import { useState, useEffect } from "react";
import api from "../../services/api";
import Toast from "../Toast";
import Modal from "../Modal";

export default function ShowtimeManager() {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [formData, setFormData] = useState({
    movieId: "",
    date: "",
    startTime: "",
    endTime: "",
    theater: "",
    totalSeats: "100",
    price: "",
  });

  useEffect(() => {
    fetchMovies();
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    setLoading(true);
    try {
      // Use dedicated admin endpoint to get all showtimes
      const response = await api.get("/admin/showtimes/list/all");

      // Map response data to add movieTitle and movieId for display
      const allShowtimes = response.data.map((showtime) => ({
        ...showtime,
        movieTitle: showtime.movie?.title || "Unknown Movie",
        movieId: showtime.movie?._id,
      }));

      setShowtimes(allShowtimes);

      // Log for debugging
      console.log(`Fetched ${allShowtimes.length} showtimes`);
    } catch (error) {
      setToast({
        message: "Failed to fetch showtimes",
        type: "error",
      });
      console.error("Error fetching showtimes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await api.get("/movies");
      setMovies(response.data.filter((m) => m.status === "active"));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddShowtime = () => {
    setEditingShowtime(null);
    setFormData({
      movieId: "",
      date: "",
      startTime: "",
      endTime: "",
      theater: "",
      totalSeats: "100",
      price: "",
    });
    setShowModal(true);
  };

  const handleEditShowtime = (showtime) => {
    setEditingShowtime(showtime);
    setFormData({
      movieId: showtime.movieId || "",
      date: showtime.date.split("T")[0],
      startTime: showtime.startTime,
      endTime: showtime.endTime,
      theater: showtime.theater,
      totalSeats: showtime.totalSeats.toString(),
      price: showtime.price.toString(),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.movieId ||
      !formData.date ||
      !formData.startTime ||
      !formData.price
    ) {
      setToast({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }

    try {
      const payload = {
        movieId: formData.movieId,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        theater:
          formData.theater || `Theater ${Math.floor(Math.random() * 5) + 1}`,
        totalSeats: parseInt(formData.totalSeats),
        price: parseFloat(formData.price),
      };

      if (editingShowtime) {
        await api.put(`/admin/showtimes/${editingShowtime._id}`, payload);
        setToast({
          message: "Showtime updated successfully",
          type: "success",
        });
      } else {
        await api.post("/admin/showtimes", payload);
        setToast({
          message: "Showtime added successfully",
          type: "success",
        });
      }

      setShowModal(false);
      fetchShowtimes();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to save showtime",
        type: "error",
      });
    }
  };

  const handleDeleteShowtime = async (showtimeId) => {
    if (window.confirm("Are you sure you want to delete this showtime?")) {
      try {
        await api.delete(`/admin/showtimes/${showtimeId}`);
        setToast({
          message: "Showtime deleted successfully",
          type: "success",
        });
        fetchShowtimes();
      } catch (error) {
        setToast({
          message: error.response?.data?.message || "Failed to delete showtime",
          type: "error",
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading showtimes...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Showtimes
        </h2>
        <button
          onClick={handleAddShowtime}
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          + Add New Showtime
        </button>
      </div>

      {/* Showtimes Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Movie
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Date
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Time
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Theater
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Seats
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Price
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {showtimes.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-600 dark:text-gray-400"
                >
                  No showtimes found. Add one to get started!
                </td>
              </tr>
            ) : (
              showtimes.map((showtime) => (
                <tr
                  key={showtime._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    {showtime.movieTitle}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {new Date(showtime.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {showtime.startTime} - {showtime.endTime}
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {showtime.theater}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded transition-colors">
                      {showtime.totalSeats}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    ₹{showtime.price}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEditShowtime(showtime)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteShowtime(showtime._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Showtime Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto transition-colors duration-200">
          <h3 className="text-2xl font-bold text-dark mb-4">
            {editingShowtime ? "Edit Showtime" : "Add New Showtime"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Select Movie *
              </label>
              <select
                name="movieId"
                value={formData.movieId}
                onChange={handleInputChange}
                className="border rounded px-3 py-2 w-full"
                required
              >
                <option value="">Choose a movie...</option>
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Theater
                </label>
                <input
                  type="text"
                  name="theater"
                  placeholder="e.g., Theater 1, IMAX"
                  value={formData.theater}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Total Seats
                </label>
                <input
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g., 250"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                  required
                  min="0"
                  step="10"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 rounded font-semibold hover:bg-red-700 transition"
              >
                {editingShowtime ? "Update Showtime" : "Add Showtime"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-dark py-2 rounded font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
