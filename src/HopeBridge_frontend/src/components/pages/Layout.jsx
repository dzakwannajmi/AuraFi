import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Path ini sudah benar berdasarkan struktur Anda

import OnboardingModal from "../modals/OnboardingModal";

import Header from "../Header";
import Footer from "../Footer";

import HomePage from "./Home";
import DashboardPage from "./DashboardPage";
import TransactionsPage from "./TransactionsPage";
import AiCarePage from "./AiCarePage";
import DataInputPage from "./DataInputPage";
import AboutPage from "./AboutPage";

function Layout({
  // Terima semua props dari App.jsx
  greetText,
  budget,
  setBudget,
  savings,
  setSavings,
  retirementSavings,
  setRetirementSavings,
  vehicles,
  setVehicles,
  otherAssets,
  setOtherAssets,
  debts,
  setDebts,
  emergencyFund,
  setEmergencyFund,
  gajiBulanan,
  setGajiBulanan,
  pendapatanPasif,
  setPendapatanPasif,
  bisnisUsaha,
  setBisnisUsaha,
  hasilInvestasi,
  setHasilInvestasi,
  belanjaKebutuhan,
  setBelanjaKebutuhan,
  transportasi,
  setTransportasi,
  sedekahDonasi,
  setSedekahDonasi,
  pendidikanExpense,
  setPendidikanExpense,
  pajakExpense,
  setPajakExpense,
  premiAsuransi,
  setPremiAsuransi,
  tabungInvestasiBulanan,
  setTabungInvestasiBulanan,
  totalTabunganSaatIni,
  setTotalTabunganSaatIni,
  crowdFunding,
  setCrowdFunding,
  logamMulia,
  setLogamMulia,
  saham,
  setSaham,
  unitLink,
  setUnitLink,
  reksadana,
  setReksadana,
  obligasiP2P,
  setObligasiP2P,
  deposito,
  setDeposito,
  ebaRitel,
  setEbaRitel,
  punyaAset,
  setPunyaAset,
  rumahValue,
  setRumahValue,
  tanahValue,
  setTanahValue,
  bangunanValue,
  setBangunanValue,
  punyaUtang,
  setPunyaUtang,
  calculatedTotalIncome,
  calculatedTotalExpenses,
  netBalance,
  netWorth,
  financialStatus,
  transactions,
  monthlyData,
  categoryExpenseData,
  incomeChartData,
  expenseChartData,
  investmentChartData,
  assetDebtChartData,
  aiCareInput,
  setAiCareInput,
  aiCareResponse,
  setAiCareResponse,
  aiCareLoading,
  setAiCareLoading,
  getAiFinancialAdvice,
  handleFinancialGoalsSubmit,
  activeDataInputTab,
  setActiveDataInputTab, // activeDataInputTab juga harus diteruskan
}) {
  const { authReady } = useAuth(); // Ini dari useAuth Anda
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // State untuk mengontrol modal onboarding
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini

  // Menggunakan currentPagePath untuk menyoroti link aktif
  const currentPagePath = location.pathname;

  // Menampilkan loading jika autentikasi belum siap
  if (!authReady) {
    return (
      <p className="text-center mt-10 font-poppins text-gray-400">
        Loading Identity...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black-primary text-white-default font-poppins flex flex-col">
      {/* Global Styles (Diasumsikan index.css menangani ini) */}
      <style>{`
        body { font-family: 'Poppins', sans-serif; }
        .gradient-text { background: linear-gradient(90deg, var(--tw-gradient-from, #3AD9A3), var(--tw-gradient-to, #0F7C5F)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      {/* Header Komponen */}
      <Header
        greetText={greetText}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Area: Sidebar + Page Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <nav
          className={`
            fixed lg:static top-0 left-0 h-full bg-gray-card-bg border-r border-gray-border p-4 flex flex-col space-y-6 z-50
            transform transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
            lg:translate-x-0 lg:w-20 lg:hover:w-64 lg:overflow-hidden
          `}
        >
          {/* Close button for mobile sidebar */}
          <button
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-green-primary focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          <SidebarLink
            to="/"
            iconClass="fas fa-home"
            label="Home"
            currentPagePath={currentPagePath}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarLink
            to="/dashboard"
            iconClass="fas fa-tachometer-alt"
            label="Dashboard"
            currentPagePath={currentPagePath}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarLink
            to="/transactions"
            iconClass="fas fa-exchange-alt"
            label="Transaksi"
            currentPagePath={currentPagePath}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarLink
            to="/ai-care"
            iconClass="fas fa-robot"
            label="AI Care"
            currentPagePath={currentPagePath}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarLink
            to="/data-input"
            iconClass="fas fa-clipboard-list"
            label="Data Input"
            currentPagePath={currentPagePath}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <SidebarLink
            to="/about"
            iconClass="fas fa-info-circle"
            label="About"
            currentPagePath={currentPagePath}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </nav>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black-primary bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Page Content (Right Side) */}
        <main className="flex-1 p-10 md:p-5 lg:ml-20 transition-all duration-300 ease-in-out">
          {/* Outlet akan merender komponen anak yang sesuai dengan rute */}
          <Outlet
            context={{
              // Meneruskan semua props ke Outlet
              // Pastikan semua props yang diperlukan oleh halaman anak ada di sini
              budget,
              setBudget,
              savings,
              setSavings,
              retirementSavings,
              setRetirementSavings,
              vehicles,
              setVehicles,
              otherAssets,
              setOtherAssets,
              debts,
              setDebts,
              emergencyFund,
              setEmergencyFund,
              gajiBulanan,
              setGajiBulanan,
              pendapatanPasif,
              setPendapatanPasif,
              bisnisUsaha,
              setBisnisUsaha,
              hasilInvestasi,
              setHasilInvestasi,
              belanjaKebutuhan,
              setBelanjaKebutuhan,
              transportasi,
              setTransportasi,
              sedekahDonasi,
              setSedekahDonasi,
              pendidikanExpense,
              setPendidikanExpense,
              pajakExpense,
              setPajakExpense,
              premiAsuransi,
              setPremiAsuransi,
              tabungInvestasiBulanan,
              setTabungInvestasiBulanan,
              totalTabunganSaatIni,
              setTotalTabunganSaatIni,
              crowdFunding,
              setCrowdFunding,
              logamMulia,
              setLogamMulia,
              saham,
              setSaham,
              unitLink,
              setUnitLink,
              reksadana,
              setReksadana,
              obligasiP2P,
              setObligasiP2P,
              deposito,
              setDeposito,
              ebaRitel,
              setEbaRitel,
              punyaAset,
              setPunyaAset,
              rumahValue,
              setRumahValue,
              tanahValue,
              setTanahValue,
              bangunanValue,
              setBangunanValue,
              punyaUtang,
              setPunyaUtang,
              calculatedTotalIncome,
              calculatedTotalExpenses,
              netBalance,
              netWorth,
              financialStatus,
              transactions,
              monthlyData,
              categoryExpenseData,
              incomeChartData,
              expenseChartData,
              investmentChartData,
              assetDebtChartData,
              aiCareInput,
              setAiCareInput,
              aiCareResponse,
              setAiCareResponse,
              aiCareLoading,
              setAiCareLoading,
              getAiFinancialAdvice,
              handleFinancialGoalsSubmit,
              activeDataInputTab,
              setActiveDataInputTab,
            }}
          />
        </main>
      </div>

      {/* Footer Komponen */}
      <Footer />

      {/* Onboarding Modal */}
      {showOnboarding && currentPagePath === "/" && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}

// Helper component for Sidebar Links (updated to use react-router-dom's Link)
import { Link, useResolvedPath, useMatch } from "react-router-dom";

function SidebarLink({ to, iconClass, label, setIsSidebarOpen }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
      className={`group flex flex-col items-center justify-center font-medium py-2 px-1 rounded-lg hover:bg-gray-800 lg:flex-row lg:justify-start lg:px-2 lg:py-3 lg:w-full
        ${
          match
            ? "text-green-primary"
            : "text-gray-400 hover:text-green-primary"
        } transition-colors`}
    >
      <i className={`${iconClass} text-xl mb-1 lg:mb-0 lg:mr-3`}></i>
      <span className="text-xs lg:text-base lg:hidden lg:group-hover:block">
        {label}
      </span>
    </Link>
  );
}

export default Layout;
