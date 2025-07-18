/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2563eb", // biru
        secondary: "#10b981", // hijau
        danger: "#ef4444", // merah
        neutral: "#6b7280", // abu-abu
      },
    },
  },
  plugins: [],
};
