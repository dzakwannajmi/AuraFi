import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import useAuth from "../../hooks/useAuth"; // Pastikan jalur ini benar
import useFinancialHealthData from "../../hooks/useFinancialHealthData"; // Pastikan jalur ini benar

// Perbaikan Jalur Impor
import OnboardingModal from "../modals/OnboardingModal"; // Pastikan jalur ini benar
import Header from "../Header"; // Pastikan jalur ini benar
import Footer from "../Footer"; // Pastikan jalur ini benar

function Layout() {
  const { authReady, user, login, logout } = useAuth();
  // Menggunakan hook useFinancialHealthData untuk mendapatkan semua data dan fungsi
  const financialData = useFinancialHealthData();

  // Hapus state isSidebarOpen dan setIsSidebarOpen karena tidak ada sidebar lagi
  const [showOnboarding, setShowOnboarding] = useState(true); // State untuk mengontrol visibilitas OnboardingModal
  const [isScrolled, setIsScrolled] = useState(false); // State untuk mendeteksi scroll untuk efek Header
  const location = useLocation(); // Menggunakan useLocation untuk mendapatkan path halaman saat ini

  // Path halaman saat ini
  const currentPagePath = location.pathname;

  // Efek untuk mendeteksi scroll dan memperbarui state isScrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Efek ini hanya berjalan sekali saat komponen mount dan clean-up saat unmount

  // Tampilkan loading screen jika autentikasi belum siap
  if (!authReady) {
    return (
      <p className="text-center mt-10 font-poppins text-gray-400">
        Loading Identity...
      </p>
    );
  }

  // Definisikan tinggi header agar konten utama tidak tertutup header fixed
  // Ini harus sesuai dengan tinggi aktual Header Anda (py-5 px-10 => sekitar 80px)
  const HEADER_HEIGHT = "80px";

  // Tentukan apakah Footer harus ditampilkan atau tidak
  // Footer tidak akan ditampilkan jika berada di halaman utama ("/")
  const shouldShowFooter = currentPagePath !== "/";

  return (
    <div className="min-h-screen bg-black-primary text-white-default font-poppins flex flex-col">
      {/* Header Komponen */}
      {/* Header ini fixed dan memiliki logika scroll-aware untuk latar belakang */}
      <Header
        user={user}
        login={login}
        logout={logout}
        isScrolled={isScrolled} // Teruskan isScrolled ke Header
      />

      {/* Konten utama: sekarang hanya perlu padding top untuk header fixed */}
      <div className="flex flex-1" style={{ paddingTop: HEADER_HEIGHT }}>
        {/* Konten Halaman (Outlet) */}
        {/* Semua props dari useAuth dan useFinancialHealthData diteruskan melalui context */}
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <Outlet
            context={{
              user,
              login,
              logout,
              // Meneruskan semua state dan fungsi dari useFinancialHealthData hook
              ...financialData,
            }}
          />
        </main>
      </div>

      {/* Footer Komponen - Dirender secara kondisional */}
      {shouldShowFooter && <Footer />}

      {/* Onboarding Modal - Dirender secara kondisional */}
      {/* Hanya muncul jika showOnboarding true DAN berada di halaman utama */}
      {showOnboarding && currentPagePath === "/" && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}

export default Layout;