import "@testing-library/jest-dom";
import { beforeAll } from "vitest";

// Mock environment variables
beforeAll(() => {
  import.meta.env.VITE_API_BASE_URL = "http://localhost:5000/api";
  import.meta.env.VITE_STRIPE_PUBLIC_KEY = "pk_test_dummy";
});
