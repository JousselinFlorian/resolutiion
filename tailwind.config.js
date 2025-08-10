import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      "light": {
        extend: "light",
        colors: {
          background: "#FFFFFF",
          foreground: "#1A1A1A",
          primary: {
            50: "#F0F4FF",
            100: "#E0E9FF",
            200: "#C7D6FF",
            300: "#A5B8FF",
            400: "#8B5CF6",
            500: "#6A48FF",
            600: "#5B3DFF",
            700: "#4C32FF",
            800: "#3D27FF",
            900: "#2E64FF",
            DEFAULT: "#6A48FF",
            foreground: "#FFFFFF"
          },
          focus: "#8B5CF6"
        }
      },
      "dark": {
        extend: "dark",
        colors: {
          background: "#0F0F23",
          foreground: "#F8FAFC",
          primary: {
            50: "#F0F4FF",
            100: "#E0E9FF",
            200: "#C7D6FF",
            300: "#A5B8FF",
            400: "#8B5CF6",
            500: "#6A48FF",
            600: "#5B3DFF",
            700: "#4C32FF",
            800: "#3D27FF",
            900: "#2E64FF",
            DEFAULT: "#6A48FF",
            foreground: "#0F0F23"
          },
          focus: "#8B5CF6"
        }
      }
    },
  }),],
}

module.exports = config;