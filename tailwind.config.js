/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d1117",
        surface: "#161b22",
        primary: "#58a6ff",
        accent: "#7ee787",
        error: "#f85149",
        muted: "#8b949e",
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}