import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout"; // Path ini sudah benar
import HomePage from "./components/pages/Home"; // Ini adalah Home page Anda yang sudah ada
import DashboardPage from "./components/pages/DashboardPage";
import TransactionsPage from "./components/pages/TransactionsPage";
import AiCarePage from "./components/pages/AiCarePage";
import DataInputPage from "./components/pages/DataInputPage";
import AboutPage from "./components/pages/AboutPage";

import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

// Hapus semua import yang berkaitan dengan state finansial atau backend yang tidak digunakan langsung di App.jsx
// import { HopeBridge_backend } from "declarations/HopeBridge_backend";
// import { useEffect, useState } from "react";
// import useAuth from "./hooks/useAuth"; // useAuth akan dipanggil di Layout.jsx

export default function App() {
  // HAPUS SEMUA STATE DAN LOGIKA BISNIS DARI SINI
  // Termasuk greetText, dan semua state finansial, kalkulasi, dan fungsi.
  // Mereka semua sudah dipindahkan ke useFinancialHealthData.jsx

  return (
    <AuthProvider> {/* AuthProvider membungkus seluruh aplikasi */}
      <BrowserRouter>
        <Routes>
          {/* Layout akan memanggil useFinancialHealthData dan useAuth, lalu meneruskan ke Outlet context */}
          {/* Layout tidak menerima props langsung dari App lagi */}
          <Route path="/" element={<Layout />}>
            {/* Halaman-halaman anak akan mengambil data dari Outlet context */}
            {/* Halaman juga tidak menerima props langsung dari App lagi */}
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="ai-care" element={<AiCarePage />} />
            <Route path="data-input" element={<DataInputPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
