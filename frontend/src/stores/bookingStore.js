import { create } from "zustand";
import api from "../services/api";

export const useBookingStore = create((set) => ({
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,

  lockSeats: async (showtimeId, seats) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/bookings/lock-seats", {
        showtimeId,
        seats,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to lock seats";
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  createBooking: async (
    showtimeId,
    seats,
    totalPrice,
    movieId,
    paymentMethod
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/bookings/create", {
        showtimeId,
        movieId,
        seats,
        totalPrice,
        paymentMethod,
      });
      set({ currentBooking: response.data.booking, isLoading: false });
      return response.data.booking;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to create booking";
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  getMyBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/bookings/my-bookings");
      set({ bookings: response.data || [], isLoading: false });
      return response.data || [];
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch bookings";
      set({ bookings: [], error: errorMsg, isLoading: false });
      throw error;
    }
  },

  cancelBooking: async (bookingId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/bookings/${bookingId}/cancel`);
      set({
        bookings: (bookings) => bookings.filter((b) => b._id !== bookingId),
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to cancel booking";
      set({ error: errorMsg, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
