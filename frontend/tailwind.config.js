/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#050811',
          blue: '#00d4ff',
          purple: '#8b5cf6',
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}