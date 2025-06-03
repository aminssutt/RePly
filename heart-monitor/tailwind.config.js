/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'resting': '#4CAF50',
        'exercising': '#FF9800',
        'optimal': '#2196F3',
        'warning': '#F44336',
      },
    },
  },
  plugins: [],
} 