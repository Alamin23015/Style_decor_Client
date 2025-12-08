/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#5D5FEF",
          "primary-content": "#ffffff",
          "secondary": "#06B6D4",
          "accent": "#EC4899",
          "neutral": "#1E293B",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "info": "#0EA5E9",
          "success": "#10": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
      {
        dark: {
          "primary": "#818CF8",
          "primary-content": "#ffffff",
          "secondary": "#67E8F9",
          "accent": "#F472B6",
          "neutral": "#E2E8F0",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
          "base-300": "#334155",
          "info": "#38BDF8",
          "success": "#34D399",
          "warning": "#FBBF24",
          "error": "#F87171",
        },
      },
    ],
    darkTheme: "dark",
  },
}