// HopeBridge_frontend/src/hooks/useFinancialHealthData.jsx
import { useState, useEffect } from "react";
import { HopeBridge_backend } from "declarations/HopeBridge_backend";

const useFinancialHealthData = () => {
  const [greetText, setGreetText] = useState("");
  const [budget, setBudget] = useState(5000000);
  const [savings, setSavings] = useState(15000000);
  const [retirementSavings, setRetirementSavings] = useState(25000000);
  const [vehicles, setVehicles] = useState(50000000);
  const [otherAssets, setOtherAssets] = useState(10000000);
  const [debts, setDebts] = useState(20000000);
  const [emergencyFund, setEmergencyFund] = useState(10000000);

  const [gajiBulanan, setGajiBulanan] = useState(5000000);
  const [pendapatanPasif, setPendapatanPasif] = useState(1000000);
  const [bisnisUsaha, setBisnisUsaha] = useState(0);
  const [hasilInvestasi, setHasilInvestasi] = useState(0);

  const [belanjaKebutuhan, setBelanjaKebutuhan] = useState(2500000);
  const [transportasi, setTransportasi] = useState(0);
  const [sedekahDonasi, setSedekahDonasi] = useState(0);
  const [pendidikanExpense, setPendidikanExpense] = useState(0);
  const [pajakExpense, setPajakExpense] = useState(0); // <--- Pastikan ini sudah benar
  const [premiAsuransi, setPremiAsuransi] = useState(0);

  const [tabungInvestasiBulanan, setTabungInvestasiBulanan] = useState(1000000);
  const [totalTabunganSaatIni, setTotalTabunganSaatIni] = useState(15000000);
  const [crowdFunding, setCrowdFunding] = useState(0);
  const [logamMulia, setLogamMulia] = useState(0);
  const [saham, setSaham] = useState(0);
  const [unitLink, setUnitLink] = useState(0);
  const [reksadana, setReksadana] = useState(0);
  const [obligasiP2P, setObligasiP2P] = useState(0);
  const [deposito, setDeposito] = useState(0);
  const [ebaRitel, setEbaRitel] = useState(0);

  const [punyaAset, setPunyaAset] = useState(true);
  const [rumahValue, setRumahValue] = useState(0);
  const [tanahValue, setTanahValue] = useState(0);
  const [bangunanValue, setBangunanValue] = useState(0);
  const [punyaUtang, setPunyaUtang] = useState(true);

  const [bitcoinCurrentValue, setBitcoinCurrentValue] = useState(0);
  const [ethereumCurrentValue, setEthereumCurrentValue] = useState(0);
  const [cryptoScenarioPercentage, setCryptoScenarioPercentage] = useState(0);

  const [activeDataInputTab, setActiveDataInputTab] = useState("penghasilan");
  const [aiCareInput, setAiCareInput] = useState("");
  const [aiCareResponse, setAiCareResponse] = useState("");
  const [aiCareLoading, setAiCareLoading] = useState(false);

  // State dan Fungsi Transaksi
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      amount: 200000,
      category: "Obat-obatan",
      description: "Paracetamol dan antibiotik",
      date: "2025-07-18",
    },
    {
      id: 2,
      type: "income",
      amount: 500000,
      category: "Klaim Asuransi",
      description: "Reimburse rawat jalan",
      date: "2025-07-17",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleTransactionChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      alert("Harap isi semua field transaksi!");
      return;
    }

    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: parseInt(formData.amount, 10),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: "",
    });
    alert("Transaksi berhasil ditambahkan!");
  };

  // States untuk mengontrol visibilitas input tambahan
  const [showBisnisUsaha, setShowBisnisUsaha] = useState(false);
  const [showHasilInvestasi, setShowHasilInvestasi] = useState(false);

  const [showTransportasi, setShowTransportasi] = useState(false);
  const [showSedekahDonasi, setShowSedekahDonasi] = useState(false);
  const [showPendidikanExpense, setShowPendidikanExpense] = useState(false);
  const [showPajakExpense, setShowPajakExpense] = useState(false);
  const [showPremiAsuransi, setShowPremiAsuransi] = useState(false);

  const [showReksadana, setShowReksadana] = useState(false);
  const [showObligasiP2P, setShowObligasiP2P] = useState(false);
  const [showDeposito, setShowDeposito] = useState(false);
  const [showEbaRitel, setShowEbaRitel] = useState(false);

  const [showKendaraan, setShowKendaraan] = useState(false);
  const [showRumah, setShowRumah] = useState(false);
  const [showTanah, setShowTanah] = useState(false);
  const [showBangunan, setShowBangunan] = useState(false);

  // Fungsi Toggle untuk visibilitas
  const toggleBisnisUsaha = () => setShowBisnisUsaha((prev) => !prev);
  const toggleHasilInvestasi = () => setShowHasilInvestasi((prev) => !prev);
  const toggleTransportasi = () => setShowTransportasi((prev) => !prev);
  const toggleSedekahDonasi = () => setShowSedekahDonasi((prev) => !prev);
  const togglePendidikanExpense = () =>
    setShowPendidikanExpense((prev) => !prev);
  const togglePajakExpense = () => setShowPajakExpense((prev) => !prev);
  const togglePremiAsuransi = () => setShowPremiAsuransi((prev) => !prev);
  const toggleReksadana = () => setShowReksadana((prev) => !prev);
  const toggleObligasiP2P = () => setShowObligasiP2P((prev) => !prev);
  const toggleDeposito = () => setShowDeposito((prev) => !prev);
  const toggleEbaRitel = () => setShowEbaRitel((prev) => !prev);
  const toggleKendaraan = () => setShowKendaraan((prev) => !prev);
  const toggleRumah = () => setShowRumah((prev) => !prev);
  const toggleTanah = () => setShowTanah((prev) => !prev);
  const toggleBangunan = () => setShowBangunan((prev) => !prev);

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
    ebaRitel +
    bitcoinCurrentValue +
    ethereumCurrentValue -
    debts;

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
    { name: "Bitcoin", value: bitcoinCurrentValue },
    { name: "Ethereum", value: ethereumCurrentValue },
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
        ebaRitel +
        bitcoinCurrentValue +
        ethereumCurrentValue,
    },
    { name: "Total Utang", value: debts },
  ];

  const calculateCryptoScenario = () => {
    const changeFactor = 1 + cryptoScenarioPercentage / 100;
    const newBitcoinValue = bitcoinCurrentValue * changeFactor;
    const newEthereumValue = ethereumCurrentValue * changeFactor;

    const oldCryptoTotal = bitcoinCurrentValue + ethereumCurrentValue;
    const newCryptoTotal = newBitcoinValue + newEthereumValue;
    const netWorthImpact = newCryptoTotal - oldCryptoTotal;
    const projectedNetWorth = netWorth + netWorthImpact;

    return {
      newBitcoinValue,
      newEthereumValue,
      potentialGainLoss: netWorthImpact,
      projectedNetWorth,
    };
  };

  const cryptoScenarioResult = calculateCryptoScenario();

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
      Nilai Bitcoin: Rp ${bitcoinCurrentValue.toLocaleString("id-ID")}
      Nilai Ethereum: Rp ${ethereumCurrentValue.toLocaleString("id-ID")}
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

  useEffect(() => {
    async function fetchGreeting() {
      const result = await HopeBridge_backend.greet("Najmi");
      setGreetText(result);
    }
    fetchGreeting();
  }, []);

  return {
    greetText,
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
    cryptoScenarioResult, // NEW: Kembalikan cryptoScenarioResult
    // NEW: Tambahkan state dan fungsi toggle untuk visibilitas
    showBisnisUsaha,
    setShowBisnisUsaha,
    toggleBisnisUsaha,
    showHasilInvestasi,
    setShowHasilInvestasi,
    toggleHasilInvestasi,
    showTransportasi,
    setShowTransportasi,
    toggleTransportasi,
    showSedekahDonasi,
    setShowSedekahDonasi,
    toggleSedekahDonasi,
    showPendidikanExpense,
    setShowPendidikanExpense,
    togglePendidikanExpense,
    showPajakExpense,
    setShowPajakExpense,
    togglePajakExpense,
    showPremiAsuransi,
    setShowPremiAsuransi,
    togglePremiAsuransi,
    showReksadana,
    setShowReksadana,
    toggleReksadana,
    showObligasiP2P,
    setShowObligasiP2P,
    toggleObligasiP2P,
    showDeposito,
    setShowDeposito,
    toggleDeposito,
    showEbaRitel,
    setShowEbaRitel,
    toggleEbaRitel,
    showKendaraan,
    setShowKendaraan,
    toggleKendaraan,
    showRumah,
    setShowRumah,
    toggleRumah,
    showTanah,
    setShowTanah,
    toggleTanah,
    showBangunan,
    setShowBangunan,
    toggleBangunan,
    // NEW: Tambahkan state dan handler untuk transaksi
    transactions,
    setTransactions, // State transaksi
    formData,
    setFormData, // State form transaksi
    handleTransactionChange, // Handler perubahan form transaksi
    handleTransactionSubmit, // Handler submit form transaksi
  };
};

export default useFinancialHealthData;
