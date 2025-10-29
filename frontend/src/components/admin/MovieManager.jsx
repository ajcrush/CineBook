import { useState, useEffect } from "react";
import api from "../../services/api";
import Toast from "../Toast";
import Modal from "../Modal";

// Language options with support for Indian languages
const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { value: "ml", label: "മലയാളം (Malayalam)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  { value: "bn", label: "বাংলা (Bengali)" },
  { value: "gu", label: "ગુજરાતી (Gujarati)" },
  { value: "ur", label: "اردو (Urdu)" },
];

// Genre options
const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

// Helper function to convert language code to label
const getLanguageLabel = (code) => {
  const lang = LANGUAGES.find((l) => l.value === code);
  return lang ? lang.label : code;
};

export default function MovieManager() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: [],
    language: "en",
    duration: "",
    releaseDate: "",
    posterUrl: "",
    status: "active",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await api.get("/movies");
      setMovies(response.data);
    } catch (error) {
      setToast({
        message: "Failed to fetch movies",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenreChange = (genre) => {
    setFormData((prev) => {
      const updatedGenres = prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre];
      return {
        ...prev,
        genre: updatedGenres,
      };
    });
  };

  const handleAddMovie = () => {
    setEditingMovie(null);
    setFormData({
      title: "",
      description: "",
      genre: [],
      language: "en",
      duration: "",
      releaseDate: "",
      posterUrl: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      language: movie.language,
      duration: movie.duration.toString(),
      releaseDate: movie.releaseDate.split("T")[0],
      posterUrl: movie.posterUrl,
      status: movie.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.duration || formData.genre.length === 0) {
      setToast({
        message:
          "Please fill in all required fields including at least one genre",
        type: "error",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        genre: formData.genre,
        duration: parseInt(formData.duration),
      };

      if (editingMovie) {
        await api.put(`/admin/movies/${editingMovie._id}`, payload);
        setToast({
          message: "Movie updated successfully",
          type: "success",
        });
      } else {
        await api.post("/admin/movies", payload);
        setToast({
          message: "Movie added successfully",
          type: "success",
        });
      }

      setShowModal(false);
      fetchMovies();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to save movie",
        type: "error",
      });
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await api.delete(`/admin/movies/${movieId}`);
        setToast({
          message: "Movie deleted successfully",
          type: "success",
        });
        fetchMovies();
      } catch (error) {
        setToast({
          message: error.response?.data?.message || "Failed to delete movie",
          type: "error",
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Movies
        </h2>
        <button
          onClick={handleAddMovie}
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          + Add New Movie
        </button>
      </div>

      {/* Movies Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Title
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Genre
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Duration
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Language
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Status
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-600 dark:text-gray-400"
                >
                  No movies found. Add one to get started!
                </td>
              </tr>
            ) : (
              movies.map((movie) => (
                <tr
                  key={movie._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    {movie.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {movie.genre.join(", ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {movie.duration} min
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {getLanguageLabel(movie.language)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        movie.status === "active"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                      }`}
                    >
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEditMovie(movie)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie._id)}
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

      {/* Add/Edit Movie Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto transition-colors duration-200">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {editingMovie ? "Edit Movie" : "Add New Movie"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Movie Title *"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                required
              />
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes) *"
                value={formData.duration}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                required
              />
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              />
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-700 transition-colors">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Select Genres *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                {GENRES.map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={formData.genre.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <span className="text-sm">{genre}</span>
                  </label>
                ))}
              </div>
              {formData.genre.length === 0 && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  At least one genre is required
                </p>
              )}
              {formData.genre.length > 0 && (
                <div className="mt-2 text-xs">
                  <p className="text-gray-700 dark:text-gray-400">
                    Selected: {formData.genre.join(", ")}
                  </p>
                </div>
              )}
            </div>

            <textarea
              name="description"
              placeholder="Movie Description"
              value={formData.description}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full h-20"
            />

            <input
              type="url"
              name="posterUrl"
              placeholder="Poster URL"
              value={formData.posterUrl}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 rounded font-semibold hover:bg-red-700 transition"
              >
                {editingMovie ? "Update Movie" : "Add Movie"}
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
