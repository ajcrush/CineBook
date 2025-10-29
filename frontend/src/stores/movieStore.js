import { create } from "zustand";
import api from "../services/api";

export const useMovieStore = create((set) => ({
  movies: [],
  currentMovie: null,
  showtimes: [],
  isLoading: false,
  error: null,

  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/movies");
      set({ movies: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch movies";
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  fetchMovieById: async (movieId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/movies/${movieId}`);
      set({ currentMovie: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to fetch movie";
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  fetchShowtimes: async (movieId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/movies/${movieId}/showtimes`);
      set({ showtimes: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch showtimes";
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
