/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Warna dasar
        "black-primary": "#000000",
        "white-default": "#FFFFFF",
        "gray-dark": "#333",
        "gray-medium": "#999",
        "gray-light": "rgba(255, 255, 255, 0.7)", // Teks navigasi default
        "gray-input-bg": "rgba(0, 0, 0, 0.4)", // Background input
        "gray-card-bg": "rgba(255, 255, 255, 0.05)", // Background kartu
        "gray-table-header": "rgba(255, 255, 255, 0.08)", // Background header tabel
        "gray-table-hover": "rgba(255, 255, 255, 0.03)", // Hover baris tabel
        "gray-border": "rgba(255, 255, 255, 0.1)", // Border umum
        "gray-input-border": "rgba(255, 255, 255, 0.2)", // Border input
        "gray-text-secondary": "rgba(255, 255, 255, 0.5)", // Teks footer
        "gray-text-tertiary": "rgba(255, 255, 255, 0.8)", // Teks judul kartu
        "gray-text-placeholder": "#A0A0A0", // Placeholder input
        "gray-tooltip-bg": "#1a1a1a", // Background tooltip grafik
        "gray-tooltip-border": "#3AD9A3", // Border tooltip grafik
        "gray-tooltip-label": "#3AD9A3", // Label tooltip grafik
        "gray-tooltip-item": "#fff", // Item tooltip grafik
        "gray-legend": "#fff", // Legend grafik
        "gray-grid": "#333", // Grid grafik

        // Warna Aksen Hijau
        "green-primary": "#3AD9A3", // Hijau terang
        "green-secondary": "#0F7C5F", // Hijau gelap
        "green-accent-1": "#1ABC9C", // Varian hijau
        "green-accent-2": "#2ECC71", // Varian hijau
        "green-accent-3": "#27AE60", // Varian hijau
        "green-accent-4": "#16A085", // Varian hijau
        "green-accent-5": "#2C3E50", // Varian hijau (biru gelap keabu-abuan)

        // Warna Aksen Merah
        "red-primary": "#FF6B6B", // Merah cerah
        "red-secondary": "#E74C3C", // Varian merah
        "red-accent-1": "#C0392B", // Varian merah
        "red-accent-2": "#A93226", // Varian merah

        // Warna lainnya
        "purple-recharts": "#8884d8", // Warna default recharts (jika tidak di-override)
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        bounceOnce: {
          "0%, 100%": { transform: "translateY(0)" },
          "20%, 50%, 80%": { transform: "translateY(-8px)" },
          "40%, 60%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "bounce-once": "bounceOnce 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
