import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3EEE6",
        ink: "#241F1B",
        dusk: {
          DEFAULT: "#1F2E5C",
          light: "#324580",
        },
        marigold: {
          DEFAULT: "#D9631B",
          light: "#F0932B",
        },
        aqi: {
          good: "#4CAF50",
          moderate: "#F5D547",
          usg: "#F0932B",
          unhealthy: "#E5514F",
          veryUnhealthy: "#8E44AD",
          hazardous: "#6B1E23",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
