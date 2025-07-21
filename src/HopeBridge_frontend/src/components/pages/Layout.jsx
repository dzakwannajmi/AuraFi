import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFinancialHealthData from "../../hooks/useFinancialHealthData";

// Perbaikan Jalur Impor
import OnboardingModal from "../modals/OnboardingModal";
import Header from "../Header";
import Footer from "../Footer";

function Layout({}) {
  const { authReady, user, login, logout } = useAuth();

  const {
    greetText,
    // ... (prop lainnya dari useFinancialHealthData tetap sama)
    setGreetText,
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
    bitcoinCurrentValue,
    setBitcoinCurrentValue,
    ethereumCurrentValue,
    setEthereumCurrentValue,
    cryptoScenarioPercentage,
    setCryptoScenarioPercentage,
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
    toggleBisnisUsaha,
    toggleHasilInvestasi,
    toggleTransportasi,
    toggleSedekahDonasi,
    togglePendidikanExpense,
    togglePajakExpense,
    togglePremiAsuransi,
    toggleReksadana,
    toggleObligasiP2P,
    toggleDeposito,
    toggleEbaRitel,
    toggleKendaraan,
    toggleRumah,
    toggleTanah,
    toggleBangunan,
  } = useFinancialHealthData();

  // Hapus state isSidebarOpen dan setIsSidebarOpen karena tidak ada sidebar lagi
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // State untuk mendeteksi scroll
  const location = useLocation();

  const currentPagePath = location.pathname;

  // Efek untuk mendeteksi scroll
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
  }, []);

  if (!authReady) {
    return (
      <p className="text-center mt-10 font-poppins text-gray-400">
        Loading Identity...
      </p>
    );
  }

  // Definisikan tinggi header
  const HEADER_HEIGHT = "80px"; // Sesuaikan dengan tinggi header Anda (py-5 px-10)

  return (
    <div className="min-h-screen bg-black-primary text-white-default font-poppins flex flex-col">
      {/* Header Komponen */}
      {/* Header ini fixed dan memiliki logika scroll-aware untuk latar belakang */}
      <Header
        user={user}
        login={login}
        logout={logout}
        isScrolled={isScrolled} // Teruskan isScrolled ke Header
        // Hapus prop isSidebarOpen dan setIsSidebarOpen
      />

      {/* Konten utama: sekarang hanya perlu padding top untuk header fixed */}
      <div className="flex flex-1" style={{ paddingTop: HEADER_HEIGHT }}>
        {/* Page Content (Right Side) */}
        <main className="flex-1 p-10 md:p-5 transition-all duration-300 ease-in-out">
          <Outlet
            context={{
              greetText,
              user,
              login,
              logout,
              // ... (meneruskan prop useFinancialHealthData lainnya)
              setGreetText,
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
              bitcoinCurrentValue,
              setBitcoinCurrentValue,
              ethereumCurrentValue,
              setEthereumCurrentValue,
              cryptoScenarioPercentage,
              setCryptoScenarioPercentage,
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
              toggleBisnisUsaha,
              toggleHasilInvestasi,
              toggleTransportasi,
              toggleSedekahDonasi,
              togglePendidikanExpense,
              togglePajakExpense,
              togglePremiAsuransi,
              toggleReksadana,
              toggleObligasiP2P,
              toggleDeposito,
              toggleEbaRitel,
              toggleKendaraan,
              toggleRumah,
              toggleTanah,
              toggleBangunan,
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

// Helper component for Sidebar Links - DIHAPUS karena tidak ada sidebar
// function SidebarLink({ to, iconClass, label, setIsSidebarOpen }) {
//   let resolved = useResolvedPath(to);
//   let match = useMatch({ path: resolved.pathname, end: true });

//   return (
//     <Link
//       to={to}
//       onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
//       className={`group flex flex-col items-center justify-center font-medium py-2 px-1 rounded-lg hover:bg-gray-800 lg:flex-row lg:justify-start lg:px-2 lg:py-3 lg:w-full
//         ${
//           match
//             ? "text-green-primary"
//             : "text-gray-400 hover:text-green-primary"
//         } transition-colors`}
//     >
//       <i className={`${iconClass} text-xl mb-1 lg:mb-0 lg:mr-3`}></i>
//       <span className="text-xs lg:text-base lg:hidden lg:group-hover:block">
//         {label}
//       </span>
//     </Link>
//   );
// }

export default Layout;
