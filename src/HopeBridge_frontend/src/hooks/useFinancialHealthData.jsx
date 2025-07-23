// HopeBridge_frontend/src/hooks/useFinancialHealthData.jsx
import { useState, useEffect } from "react";
import { HopeBridge_backend } from "declarations/HopeBridge_backend";

const useFinancialHealthData = () => {
  const [greetText, setGreetText] = useState("");
  // All financial values set to 0 initially
  const [budget, setBudget] = useState(0);
  const [savings, setSavings] = useState(0);
  const [retirementSavings, setRetirementSavings] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [otherAssets, setOtherAssets] = useState(0);
  const [debts, setDebts] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(0);

  // Income States - All set to 0
  const [gajiBulanan, setGajiBulanan] = useState(0); // Monthly Salary
  const [pendapatanPasif, setPendapatanPasif] = useState(0); // Passive Income
  const [bisnisUsaha, setBisnisUsaha] = useState(0); // Business Income
  const [hasilInvestasi, setHasilInvestasi] = useState(0); // Investment Income

  // Expense States - All set to 0
  const [belanjaKebutuhan, setBelanjaKebutuhan] = useState(0); // Essential Spending
  const [transportasi, setTransportasi] = useState(0); // Transportation Expense
  const [sedekahDonasi, setSedekahDonasi] = useState(0); // Charity/Donation Expense
  const [pendidikanExpense, setPendidikanExpense] = useState(0); // Education Expense
  const [pajakExpense, setPajakExpense] = useState(0); // Tax Expense
  const [premiAsuransi, setPremiAsuransi] = useState(0); // Insurance Premium

  // Savings & Investment States - All set to 0
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

  // Assets & Debts States - Boolean to false, values to 0
  const [punyaAset, setPunyaAset] = useState(false); // Has Assets checkbox - Set to false
  const [rumahValue, setRumahValue] = useState(0); // House Value
  const [tanahValue, setTanahValue] = useState(0); // Land Value
  const [bangunanValue, setBangunanValue] = useState(0); // Building Value
  const [punyaUtang, setPunyaUtang] = useState(false); // Has Debts checkbox - Set to false

  // Crypto Analysis States - All set to 0
  const [bitcoinCurrentValue, setBitcoinCurrentValue] = useState(0);
  const [ethereumCurrentValue, setEthereumCurrentValue] = useState(0);
  const [cryptoScenarioPercentage, setCryptoScenarioPercentage] = useState(0);

  // Active tab set to 'income' for initial display
  const [activeDataInputTab, setActiveDataInputTab] = useState("income");
  const [aiCareInput, setAiCareInput] = useState("");
  const [aiCareResponse, setAiCareResponse] = useState("");
  const [aiCareLoading, setAiCareLoading] = useState(false);

  // Transaction States and Functions - Initial transactions empty
  const [transactions, setTransactions] = useState([]); // Empty initial array for transactions

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

  // States to control visibility of additional inputs - All set to false
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

  // Toggle functions for visibility (remain unchanged as they toggle boolean states)
  const toggleBisnisUsaha = () => setShowBisnisUsaha((prev) => !prev);
  const toggleHasilInvestasi = () => setShowHasilInvestasi((prev) => !prev);
  const toggleTransportasi = () => setShowTransportasi((prev) => !prev);
  const toggleSedekahDonasi = () => setShowSedekahDonasi((prev) => !prev);
  const togglePendidikanExpense = () => setShowPendidikanExpense((prev) => !prev);
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

  // Dynamic calculations (these will now correctly reflect initial 0 values)
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

  // Chart Data - values will be 0, so filters will correctly show empty charts or "no data" if values are 0
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
    // Conditions adjusted for initial 0 values, so level 1 is always default
    if (balance > 0 && emergency > 0 && netWorthValue > 0) { // Simplified checks for basic positive values
      level = 2;
      message = "Stable Financial Foundation!";
    }
    // Subsequent levels require increasing positive values
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

  const getAiFinancialAdvice = async () => {
    setAiCareLoading(true);
    setAiCareResponse("");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request
    const currentFinancialSnapshot = `
      Monthly Income: Rp ${gajiBulanan.toLocaleString("id-ID")}
      Passive Income: Rp ${pendapatanPasif.toLocaleString("id-ID")}
      Total Medical Expenses: Rp ${calculatedTotalExpenses.toLocaleString(
        "id-ID"
      )}
      Total Insurance Claims: Rp ${calculatedTotalIncome.toLocaleString("id-ID")}
      Net Health Balance: Rp ${netBalance.toLocaleString("id-ID")}
      Net Worth: Rp ${netWorth.toLocaleString("id-ID")}
      Monthly Budget: Rp ${budget.toLocaleString("id-ID")}
      Total Savings: Rp ${savings.toLocaleString("id-ID")}
      Retirement Fund: Rp ${retirementSavings.toLocaleString("id-ID")}
      Emergency Fund: Rp ${emergencyFund.toLocaleString("id-ID")}
      Total Debts: Rp ${debts.toLocaleString("id-ID")}
      Bitcoin Value: Rp ${bitcoinCurrentValue.toLocaleString("id-ID")}
      Ethereum Value: Rp ${ethereumCurrentValue.toLocaleString("id-ID")}
      ${
        punyaAset
          ? `Vehicle Value: Rp ${vehicles.toLocaleString(
              "id-ID"
            )}, House Value: Rp ${rumahValue.toLocaleString(
              "id-ID"
            )}, Land Value: Rp ${tanahValue.toLocaleString(
              "id-ID"
            )}, Building Value: Rp ${bangunanValue.toLocaleString("id-ID")}`
          : ""
      }
      ${aiCareInput ? `Additional Question/Situation: ${aiCareInput}` : ""}
    `;
    setAiCareResponse(`Thank you for your question. Based on the data you provided, here is some initial advice from AuraFi AI (placeholder for your ICP LLM):\n\n
      - **Income Analysis:** With a monthly salary of Rp ${gajiBulanan.toLocaleString(
        "id-ID"
      )} and passive income of Rp ${pendapatanPasif.toLocaleString(
        "id-ID"
      )}, you have a stable cash flow. Consider further optimizing your passive income.
      - **Expense Management:** Your current total expenses are Rp ${calculatedTotalExpenses.toLocaleString(
        "id-ID"
      )}. If there are high spending categories, try to identify areas for savings.
      - **Net Worth:** Your net worth of Rp ${netWorth.toLocaleString(
        "id-ID"
      )} indicates a good financial foundation. Continue to increase assets and reduce debt.
      - **Emergency Fund:** Your emergency fund of Rp ${emergencyFund.toLocaleString(
        "id-ID"
      )} is quite good. Ideally, an emergency fund should cover 3-6 months of expenses.
      - **General Recommendations:**
          - Regularly review your monthly budget to ensure expenses remain under control.
          - If you have high-interest debts, prioritize paying them off.
          - Continue to save for retirement consistently.
          - Utilize the 'Data Input' feature to track all your assets and debts in detail for more accurate analysis.
      \nFor more in-depth advice, please provide more details about your specific financial goals.`);
    setAiCareLoading(false);
  };

  useEffect(() => {
    async function fetchGreeting() {
      const result = await HopeBridge_backend.greet("User");
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
    cryptoScenarioResult,
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
    transactions,
    setTransactions,
    formData,
    setFormData,
    handleTransactionChange,
    handleTransactionSubmit,
  };
};

export default useFinancialHealthData;