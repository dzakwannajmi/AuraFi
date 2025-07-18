import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout"; // Pastikan path ini benar
import HomePage from "./components/pages/Home"; // Ini adalah Home page Anda yang sudah ada
import DashboardPage from "./components/pages/DashboardPage";
import TransactionsPage from "./components/pages/TransactionsPage";
import AiCarePage from "./components/pages/AiCarePage";
import DataInputPage from "./components/pages/DataInputPage";
import AboutPage from "./components/pages/AboutPage";

import { AuthProvider } from "./context/AuthContext";
import { HopeBridge_backend } from "declarations/HopeBridge_backend";
import { useEffect, useState } from "react";

export default function App() {
  const [greetText, setGreetText] = useState("");

  // --- START: States Finansial dan Logika Bisnis (Dipindahkan dari App sebelumnya) ---
  const [budget, setBudget] = useState(5000000);
  const [savings, setSavings] = useState(15000000);
  const [retirementSavings, setRetirementSavings] = useState(25000000);
  const [vehicles, setVehicles] = useState(50000000);
  const [otherAssets, setOtherAssets] = useState(10000000);
  const [debts, setDebts] = useState(20000000);
  const [emergencyFund, setEmergencyFund] = useState(10000000);

  const [gajiBulanan, setGajiBulanan] = useState(5000000);
  const [pendapatanPasif, setPendapatanPasif] = useState(1000000);
  const [bisnisUsaha, setBisnisUsaha] = useState(500000);
  const [hasilInvestasi, setHasilInvestasi] = useState(200000);

  const [belanjaKebutuhan, setBelanjaKebutuhan] = useState(2500000);
  const [transportasi, setTransportasi] = useState(300000);
  const [sedekahDonasi, setSedekahDonasi] = useState(100000);
  const [pendidikanExpense, setPendidikanExpense] = useState(500000);
  const [pajakExpense, setPajakExpense] = useState(150000);
  const [premiAsuransi, setPremiAsuransi] = useState(200000);

  const [tabungInvestasiBulanan, setTabungInvestasiBulanan] = useState(1000000);
  const [totalTabunganSaatIni, setTotalTabunganSaatIni] = useState(15000000);
  const [crowdFunding, setCrowdFunding] = useState(5000000);
  const [logamMulia, setLogamMulia] = useState(10000000);
  const [saham, setSaham] = useState(15000000);
  const [unitLink, setUnitLink] = useState(7000000);
  const [reksadana, setReksadana] = useState(3000000);
  const [obligasiP2P, setObligasiP2P] = useState(2000000);
  const [deposito, setDeposito] = useState(4000000);
  const [ebaRitel, setEbaRitel] = useState(1000000);

  const [punyaAset, setPunyaAset] = useState(true);
  const [rumahValue, setRumahValue] = useState(150000000);
  const [tanahValue, setTanahValue] = useState(80000000);
  const [bangunanValue, setBangunanValue] = useState(70000000);
  const [punyaUtang, setPunyaUtang] = useState(true);

  const [activeDataInputTab, setActiveDataInputTab] = useState("penghasilan");
  const [aiCareInput, setAiCareInput] = useState("");
  const [aiCareResponse, setAiCareResponse] = useState("");
  const [aiCareLoading, setAiCareLoading] = useState(false);

  // Kalkulasi dinamis
  const calculatedTotalIncome =
    gajiBulanan + pendapatanPasif + bisnisUsaha + hasilInvestasi;
  const calculatedTotalExpenses =
    belanjaKebutuhan +
    transportasi +
    sedekahDonasi +
    pendidikanExpense +
    pajakExpense +
    premiAsuransi;
  const netBalance = calculatedTotalIncome - calculatedTotalExpenses;
  const netWorth =
    savings +
    retirementSavings +
    vehicles +
    otherAssets +
    rumahValue +
    tanahValue +
    bangunanValue +
    crowdFunding +
    logamMulia +
    saham +
    unitLink +
    reksadana +
    obligasiP2P +
    deposito +
    ebaRitel -
    debts;

  const transactions = [
    {
      id: 1,
      type: "expense",
      amount: 350000,
      category: "Obat-obatan",
      description: "Pembelian obat flu",
      date: "2025-07-15",
    },
    {
      id: 2,
      type: "income",
      amount: 1200000,
      category: "Klaim Asuransi",
      description: "Klaim rawat inap",
      date: "2025-07-12",
    },
    {
      id: 3,
      type: "expense",
      amount: 150000,
      category: "Dokter Gigi",
      description: "Check-up gigi",
      date: "2025-07-10",
    },
    {
      id: 4,
      type: "expense",
      amount: 500000,
      category: "Konsultasi",
      description: "Konsultasi dokter spesialis",
      date: "2025-07-08",
    },
    {
      id: 5,
      type: "income",
      amount: 800000,
      category: "Klaim Asuransi",
      description: "Klaim rawat jalan",
      date: "2025-07-05",
    },
    {
      id: 6,
      type: "expense",
      amount: 75000,
      category: "Vitamin",
      description: "Suplemen harian",
      date: "2025-07-03",
    },
  ];

  const monthlyData = [
    { name: "Jan", Pemasukan: 1500000, Pengeluaran: 800000 },
    { name: "Feb", Pemasukan: 1800000, Pengeluaran: 950000 },
    { name: "Mar", Pemasukan: 1600000, Pengeluaran: 700000 },
    { name: "Apr", Pemasukan: 2000000, Pengeluaran: 1200000 },
    { name: "Mei", Pemasukan: 1700000, Pengeluaran: 850000 },
    { name: "Jun", Pemasukan: 1900000, Pengeluaran: 1000000 },
    {
      name: "Jul",
      Pemasukan: calculatedTotalIncome,
      Pengeluaran: calculatedTotalExpenses,
    },
  ];

  const categoryExpenseData = [
    { name: "Belanja Kebutuhan", Pengeluaran: belanjaKebutuhan },
    { name: "Transportasi", Pengeluaran: transportasi },
    { name: "Sedekah/Donasi", Pengeluaran: sedekahDonasi },
    { name: "Pendidikan", Pengeluaran: pendidikanExpense },
    { name: "Pajak", Pengeluaran: pajakExpense },
    { name: "Premi Asuransi", Pengeluaran: premiAsuransi },
  ].filter((item) => item.Pengeluaran > 0);

  const incomeChartData = [
    { name: "Gaji Bulanan", value: gajiBulanan },
    { name: "Pendapatan Pasif", value: pendapatanPasif },
    { name: "Bisnis Usaha", value: bisnisUsaha },
    { name: "Hasil Investasi", value: hasilInvestasi },
  ].filter((item) => item.value > 0);

  const expenseChartData = [
    { name: "Belanja Kebutuhan", value: belanjaKebutuhan },
    { name: "Transportasi", value: transportasi },
    { name: "Sedekah/Donasi", value: sedekahDonasi },
    { name: "Pendidikan", value: pendidikanExpense },
    { name: "Pajak", value: pajakExpense },
    { name: "Premi Asuransi", value: premiAsuransi },
  ].filter((item) => item.value > 0);

  const investmentChartData = [
    { name: "Crowd-Funding", value: crowdFunding },
    { name: "Logam Mulia", value: logamMulia },
    { name: "Saham", value: saham },
    { name: "Unit Link", value: unitLink },
    { name: "Reksadana", value: reksadana },
    { name: "Obligasi/P2P Lending", value: obligasiP2P },
    { name: "Deposito", value: deposito },
    { name: "EBA Ritel", value: ebaRitel },
  ].filter((item) => item.value > 0);

  const assetDebtChartData = [
    {
      name: "Total Aset",
      value:
        savings +
        retirementSavings +
        vehicles +
        otherAssets +
        rumahValue +
        tanahValue +
        bangunanValue +
        crowdFunding +
        logamMulia +
        saham +
        unitLink +
        reksadana +
        obligasiP2P +
        deposito +
        ebaRitel,
    },
    { name: "Total Utang", value: debts },
  ];

  const getFinancialLevel = (balance, netWorthValue, emergency) => {
    let level = 1;
    let message = "Mulai Perjalanan Finansial Anda!";
    if (balance > 0 && emergency >= 5000000 && netWorthValue > 0) {
      level = 2;
      message = "Dasar Keuangan Stabil!";
    }
    if (
      balance > 1000000 &&
      emergency >= 10000000 &&
      netWorthValue > 20000000
    ) {
      level = 3;
      message = "Membangun Fondasi Kuat!";
    }
    if (
      balance > 5000000 &&
      emergency >= 20000000 &&
      netWorthValue > 50000000 &&
      retirementSavings > 10000000
    ) {
      level = 4;
      message = "Keuangan Terkendali, Siap Bertumbuh!";
    }
    if (
      balance > 10000000 &&
      emergency >= 30000000 &&
      netWorthValue > 100000000 &&
      retirementSavings > 20000000
    ) {
      level = 5;
      message = "Master Keuangan Kesehatan!";
    }
    return { level, message };
  };

  const financialStatus = getFinancialLevel(
    netBalance,
    netWorth,
    emergencyFund
  );

  const handleFinancialGoalsSubmit = (e) => {
    e.preventDefault();
    alert("Data Input Diperbarui!");
  };

  const getAiFinancialAdvice = async () => {
    setAiCareLoading(true);
    setAiCareResponse("");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request
    const currentFinancialSnapshot = `
      Penghasilan Bulanan: Rp ${gajiBulanan.toLocaleString("id-ID")}
      Pendapatan Pasif: Rp ${pendapatanPasif.toLocaleString("id-ID")}
      Total Pengeluaran Medis: Rp ${calculatedTotalExpenses.toLocaleString(
        "id-ID"
      )}
      Total Klaim Asuransi: Rp ${calculatedTotalIncome.toLocaleString("id-ID")}
      Saldo Bersih Kesehatan: Rp ${netBalance.toLocaleString("id-ID")}
      Kekayaan Bersih (Net Worth): Rp ${netWorth.toLocaleString("id-ID")}
      Anggaran Bulanan: Rp ${budget.toLocaleString("id-ID")}
      Jumlah Tabungan: Rp ${savings.toLocaleString("id-ID")}
      Dana Pensiun: Rp ${retirementSavings.toLocaleString("id-ID")}
      Dana Darurat: Rp ${emergencyFund.toLocaleString("id-ID")}
      Total Utang: Rp ${debts.toLocaleString("id-ID")}
      ${
        punyaAset
          ? `Nilai Kendaraan: Rp ${vehicles.toLocaleString(
              "id-ID"
            )}, Nilai Rumah: Rp ${rumahValue.toLocaleString(
              "id-ID"
            )}, Nilai Tanah: Rp ${tanahValue.toLocaleString(
              "id-ID"
            )}, Nilai Bangunan: Rp ${bangunanValue.toLocaleString("id-ID")}`
          : ""
      }
      ${aiCareInput ? `Pertanyaan/Situasi Tambahan: ${aiCareInput}` : ""}
    `;
    setAiCareResponse(`Terima kasih atas pertanyaan Anda. Berdasarkan data yang Anda berikan, berikut adalah beberapa saran awal dari AI AuraFi (placeholder untuk LLM ICP Anda):\n\n
    - **Analisis Penghasilan:** Dengan gaji bulanan Rp ${gajiBulanan.toLocaleString(
      "id-ID"
    )} dan pendapatan pasif Rp ${pendapatanPasif.toLocaleString(
      "id-ID"
    )}, Anda memiliki arus kas yang stabil. Pertimbangkan untuk mengoptimalkan pendapatan pasif lebih lanjut.
    - **Pengelolaan Pengeluaran:** Total pengeluaran Anda saat ini adalah Rp ${calculatedTotalExpenses.toLocaleString(
      "id-ID"
    )}. Jika ada kategori pengeluaran yang tinggi, coba identifikasi area untuk penghematan.
    - **Kekayaan Bersih:** Kekayaan bersih Anda sebesar Rp ${netWorth.toLocaleString(
      "id-ID"
    )} menunjukkan fondasi keuangan yang baik. Terus tingkatkan aset dan kurangi utang.
    - **Dana Darurat:** Dana darurat Anda sebesar Rp ${emergencyFund.toLocaleString(
      "id-ID"
    )} sudah cukup baik. Idealnya, dana darurat mencakup 3-6 bulan pengeluaran.
    - **Rekomendasi Umum:**
        - Tinjau anggaran bulanan Anda secara berkala untuk memastikan pengeluaran tetap terkendali.
        - Jika Anda memiliki utang dengan bunga tinggi, prioritaskan pelunasannya.
        - Lanjutkan menabung untuk dana pensiun secara konsisten.
        - Manfaatkan fitur 'Data Input' untuk melacak semua aset dan utang Anda secara rinci untuk analisis yang lebih akurat.
    \nUntuk saran yang lebih mendalam, berikan detail lebih lanjut tentang tujuan finansial spesifik Anda.`);
    setAiCareLoading(false);
  };
  // --- END: States Finansial dan Logika Bisnis ---

  useEffect(() => {
    async function fetchGreeting() {
      const result = await HopeBridge_backend.greet("Najmi");
      setGreetText(result);
    }
    fetchGreeting();
  }, []);

  // Consolidate all common props to pass to Layout and then to nested routes
  const sharedProps = {
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
    setActiveDataInputTab,
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout {...sharedProps} />}>
            <Route index element={<HomePage {...sharedProps} />} />
            <Route
              path="dashboard"
              element={<DashboardPage {...sharedProps} />}
            />
            <Route
              path="transactions"
              element={<TransactionsPage {...sharedProps} />}
            />
            <Route path="ai-care" element={<AiCarePage {...sharedProps} />} />
            <Route
              path="data-input"
              element={<DataInputPage {...sharedProps} />}
            />
            <Route path="about" element={<AboutPage {...sharedProps} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
