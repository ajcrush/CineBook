import { useEffect, useState } from "react";
import { useMovieStore } from "../stores/movieStore";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function MoviesPage() {
  const { movies, fetchMovies, isLoading, error } = useMovieStore();
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const genres = ["All"];
  movies.forEach((movie) => {
    movie.genre?.forEach((g) => {
      if (!genres.includes(g)) genres.push(g);
    });
  });

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((m) => m.genre?.includes(selectedGenre));

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-500 text-white p-4 rounded">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Available Movies
        </h1>

        {/* Genre Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
                selectedGenre === genre
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-primary"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <Loader />
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              No movies found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
