import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie._id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-200 cursor-pointer group">
        <div className="relative h-64 bg-gray-300 dark:bg-gray-700 overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.querySelector(
                "[data-fallback]"
              ).style.display = "flex";
            }}
          />
          <div
            data-fallback
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800"
            style={{ display: "none" }}
          >
            <div className="text-center">
              <p className="text-5xl font-bold text-white opacity-80">
                {movie.title?.charAt(0).toUpperCase()}
              </p>
              <p className="text-sm mt-4 text-white px-4">{movie.title}</p>
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded text-sm font-bold shadow-md">
            {movie.language}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {movie.duration} mins
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 line-clamp-2">
            {movie.genre.join(", ")}
          </p>
          <button className="mt-4 w-full bg-primary dark:bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 dark:hover:bg-red-700 transition-colors duration-200">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
}
