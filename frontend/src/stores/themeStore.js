import { create } from "zustand";

export const useThemeStore = create((set) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  };

  return {
    theme: getInitialTheme(),
    isDark: getInitialTheme() === "dark",

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);

        // Update HTML element class
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        return {
          theme: newTheme,
          isDark: newTheme === "dark",
        };
      }),

    setTheme: (theme) =>
      set(() => {
        localStorage.setItem("theme", theme);

        // Update HTML element class
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        return {
          theme,
          isDark: theme === "dark",
        };
      }),
  };
});
