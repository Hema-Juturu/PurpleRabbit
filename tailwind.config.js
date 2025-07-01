/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#c084fc",
        gold: "#ffd700",
        softWhite: "#e5e7eb",
        dark: "#111",
      },
      dropShadow: {
        glow: "0 0 12px rgba(192,132,252,0.8)",
        gold: "0 0 12px rgba(255,215,0,0.6)",
      },
      fontFamily: {
        brand: ["'Orbitron'", "sans-serif"],
        cursive: ['"Comic Sans MS"', "cursive", "'Great Vibes'"],
      },
    },
  },
  plugins: [],
};
