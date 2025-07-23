// HopeBridge_frontend/src/hooks/useFinancialHealthData.jsx
import { useState, useEffect, useCallback } from "react";
import { HopeBridge_backend } from "declarations/HopeBridge_backend";

const useFinancialHealthData = () => {
  const [greetText, setGreetText] = useState("");
  const [budget, setBudget] = useState(0);
  const [savings, setSavings] = useState(0);
  const [retirementSavings, setRetirementSavings] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [otherAssets, setOtherAssets] = useState(0);
  const [debts, setDebts] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(0);

  // Income States
  const [gajiBulanan, setGajiBulanan] = useState(0); // Monthly Salary
  const [pendapatanPasif, setPendapatanPasif] = useState(0); // Passive Income
  const [bisnisUsaha, setBisnisUsaha] = useState(0); // Business Income
  const [hasilInvestasi, setHasilInvestasi] = useState(0); // Investment Income

  // Expense States
  const [belanjaKebutuhan, setBelanjaKebutuhan] = useState(0); // Essential Spending
  const [transportasi, setTransportasi] = useState(0); // Transportation Expense
  const [sedekahDonasi, setSedekahDonasi] = useState(0); // Charity/Donation Expense
  const [pendidikanExpense, setPendidikanExpense] = useState(0); // Education Expense
  const [pajakExpense, setPajakExpense] = useState(0); // Tax Expense
  const [premiAsuransi, setPremiAsuransi] = useState(0); // Insurance Premium

  // Savings & Investment States
  const [tabungInvestasiBulanan, setTabungInvestasiBulanan] = useState(0); // Monthly Savings/Investment
  const [totalTabunganSaatIni, setTotalTabunganSaatIni] = useState(0); // Current Total Savings
  const [crowdFunding, setCrowdFunding] = useState(0); // Crowdfunding Investment
  const [logamMulia, setLogamMulia] = useState(0); // Precious Metals Investment
  const [saham, setSaham] = useState(0); // Stock Investment
  const [unitLink, setUnitLink] = useState(0); // Unit Link Investment
  const [reksadana, setReksadana] = useState(0); // Mutual Fund Investment
  const [obligasiP2P, setObligasiP2P] = useState(0); // Bonds/P2P Lending Investment
  const [deposito, setDeposito] = useState(0); // Deposit Investment
  const [ebaRitel, setEbaRitel] = useState(0); // Retail ABS (Asset-Backed Securities) Investment

  // Assets & Debts States
  const [punyaAset, setPunyaAset] = useState(false); // Has Assets checkbox
  const [rumahValue, setRumahValue] = useState(0); // House Value

  // Crypto Analysis States
  const [bitcoinCurrentValue, setBitcoinCurrentValue] = useState(0);
  const [ethereumCurrentValue, setEthereumCurrentValue] = useState(0);
  const [cryptoScenarioPercentage, setCryptoScenarioPercentage] = useState(0);

  const [activeDataInputTab, setActiveDataInputTab] = useState("income");
  const [aiCareInput, setAiCareInput] = useState("");
  const [aiCareResponse, setAiCareResponse] = useState("");
  const [aiCareLoading, setAiCareLoading] = useState(false);

  // Transaction States and Functions
  const [transactions, setTransactions] = useState([]);

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
      alert("Please fill in all transaction fields!");
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
    alert("Transaction successfully added!");
  };

  // States to control visibility of additional inputs
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
  const [tanahValue, setTanahValue] = useState(0); // Corrected from setTanahValue to useState(0)
  const [bangunanValue, setBangunanValue] = useState(0);
  const [punyaUtang, setPunyaUtang] = useState(false);

  // Toggle functions for visibility
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

  // Dynamic calculations
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
    { name: "Jan", Income: 0, Expenses: 0 },
    { name: "Feb", Income: 0, Expenses: 0 },
    { name: "Mar", Income: 0, Expenses: 0 },
    { name: "Apr", Income: 0, Expenses: 0 },
    { name: "May", Income: 0, Expenses: 0 },
    { name: "Jun", Income: 0, Expenses: 0 },
    {
      name: "Jul",
      Income: calculatedTotalIncome,
      Expenses: calculatedTotalExpenses,
    },
  ];

  const categoryExpenseData = [
    { name: "Essential Spending", Expenses: belanjaKebutuhan },
    { name: "Transportation", Expenses: transportasi },
    { name: "Charity/Donation", Expenses: sedekahDonasi },
    { name: "Education", Expenses: pendidikanExpense },
    { name: "Tax", Expenses: pajakExpense },
    { name: "Insurance Premium", Expenses: premiAsuransi },
  ].filter((item) => item.Expenses > 0);

  const incomeChartData = [
    { name: "Monthly Salary", value: gajiBulanan },
    { name: "Passive Income", value: pendapatanPasif },
    { name: "Business Income", value: bisnisUsaha },
    { name: "Investment Income", value: hasilInvestasi },
  ].filter((item) => item.value > 0);

  const expenseChartData = [
    { name: "Essential Spending", value: belanjaKebutuhan },
    { name: "Transportation", value: transportasi },
    { name: "Charity/Donation", value: sedekahDonasi },
    { name: "Education", value: pendidikanExpense },
    { name: "Tax", value: pajakExpense },
    { name: "Insurance Premium", value: premiAsuransi },
  ].filter((item) => item.value > 0);

  const investmentChartData = [
    { name: "Crowd-Funding", value: crowdFunding },
    { name: "Precious Metals", value: logamMulia },
    { name: "Stocks", value: saham },
    { name: "Unit Link", value: unitLink },
    { name: "Mutual Funds", value: reksadana },
    { name: "Bonds/P2P Lending", value: obligasiP2P },
    { name: "Deposits", value: deposito },
    { name: "Retail ABS", value: ebaRitel },
    { name: "Bitcoin", value: bitcoinCurrentValue },
    { name: "Ethereum", value: ethereumCurrentValue },
  ].filter((item) => item.value > 0);

  const assetDebtChartData = [
    {
      name: "Total Assets",
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
    { name: "Total Debts", value: debts },
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
    let message = "Start Your Financial Journey!";
    if (balance > 0 && emergency > 0 && netWorthValue > 0) {
      level = 2;
      message = "Stable Financial Foundation!";
    }
    if (
      balance >= 1000000 &&
      emergency >= 5000000 &&
      netWorthValue >= 20000000
    ) {
      level = 3;
      message = "Building a Strong Foundation!";
    }
    if (
      balance >= 5000000 &&
      emergency >= 10000000 &&
      netWorthValue >= 50000000 &&
      retirementSavings >= 10000000
    ) {
      level = 4;
      message = "Finances Under Control, Ready to Grow!";
    }
    if (
      balance >= 10000000 &&
      emergency >= 20000000 &&
      netWorthValue >= 100000000 &&
      retirementSavings >= 20000000
    ) {
      level = 5;
      message = "Financial Health Master!";
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
    alert("Input Data Updated!");
  };

  // --- FUNGSI GET AI FINANCIAL ADVICE DENGAN INTEGRASI DEEPSEEK API ---
  const getAiFinancialAdvice = useCallback(
    async (userQuestion, currentFinancialSnapshot) => {
      setAiCareLoading(true);
      setAiCareResponse("");

      // <<< UBAH CARA MEMBACA VARIABEL LINGKUNGAN DI SINI
      const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY; // Gunakan import.meta.env
      // Atau bisa juga process.env.VITE_DEEPSEEK_API_KEY, tergantung konfigurasi Vite/lingkungan

      if (!DEEPSEEK_API_KEY) {
        console.error("Deepseek API Key is not set in environment variables.");
        setAiCareLoading(false);
        return "Error: AI service not configured. Please check API Key.";
      }

      const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
      const DEEPSEEK_MODEL = "deepseek-chat";

      const messages = [
        {
          role: "system",
          content:
            "You are an AI financial advisor named AuraFi. Provide personalized and actionable financial advice. Prioritize clarity, actionable steps, and a positive, encouraging tone. Always respond in English.",
        },
        {
          role: "user",
          content: `Here is my current financial snapshot:\n${currentFinancialSnapshot}\n\nMy Question: ${userQuestion}\n\nPlease provide actionable advice, categorized (e.g., Income, Expenses, Savings, Investments, Debts). Keep it concise and helpful.`,
        },
      ];

      const payload = {
        model: DEEPSEEK_MODEL,
        messages: messages,
        stream: false,
      };

      try {
        const response = await fetch(DEEPSEEK_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Deepseek API response not OK:",
            response.status,
            response.statusText,
            errorData
          );
          return `Error from AI: ${
            errorData.error?.message || response.statusText
          }. Please try again later.`;
        }

        const result = await response.json();
        const aiResponseContent =
          result.choices?.[0]?.message?.content ||
          "No specific advice could be generated by Deepseek.";

        return aiResponseContent;
      } catch (err) {
        console.error("Error calling Deepseek API:", err);
        const errorMessage = `Network error: Failed to reach AI service. Please check your internet connection or try again later.`;
        return errorMessage;
      } finally {
        setAiCareLoading(false);
      }
    },
    []
  );

  // Initial load: Fetch greeting text (assuming it's still needed)
  useEffect(() => {
    async function fetchGreeting() {
      try {
        // Cek jika window.canister.HopeBridge_backend sudah tersedia
        if (window.canister && window.canister.HopeBridge_backend) {
          const result = await window.canister.HopeBridge_backend.greet("User");
          setGreetText(result);
        } else {
          console.warn(
            "Backend canister not yet available for greeting. Skipping greeting fetch."
          );
        }
      } catch (error) {
        console.error("Failed to fetch greeting:", error);
        setGreetText("Hello!"); // Fallback greeting
      }
    }
    fetchGreeting();
  }, [setGreetText]);

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
    cryptoScenarioResult,
    // Add visibility states and toggle functions
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
    // Add transaction states and handlers
    transactions,
    setTransactions,
    formData,
    setFormData,
    handleTransactionChange,
    handleTransactionSubmit,
  };
};

export default useFinancialHealthData;
