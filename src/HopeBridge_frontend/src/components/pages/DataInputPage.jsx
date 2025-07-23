import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useOutletContext } from "react-router-dom";

function DataInputPage() {
  const context = useOutletContext();

  // --- DEBUGGING: Log all received context data in DataInputPage ---
  console.log("DataInputPage: Context received:", context);

  // Check if context or its properties are undefined before destructuring
  if (!context || Object.keys(context).length === 0) {
    console.log(
      "DataInputPage: Context is empty or not yet available, displaying loading."
    );
    return (
      <div className="text-center text-gray-400 mt-20">
        Loading input data...
        <br />
        Check your browser console for more details.
      </div>
    );
  }

  const {
    activeDataInputTab,
    setActiveDataInputTab,
    handleFinancialGoalsSubmit,
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
    vehicles,
    setVehicles,
    rumahValue,
    setRumahValue,
    tanahValue,
    setTanahValue,
    bangunanValue,
    setBangunanValue,
    punyaUtang,
    setPunyaUtang,
    debts,
    setDebts,
    emergencyFund,
    budget,
    incomeChartData,
    expenseChartData,
    investmentChartData,
    assetDebtChartData,
    bitcoinCurrentValue,
    setBitcoinCurrentValue,
    ethereumCurrentValue,
    setEthereumCurrentValue,
    cryptoScenarioPercentage,
    setCryptoScenarioPercentage,
    cryptoScenarioResult,
    netWorth,
    // Ensure these are destructured with default values to prevent crashes if context is partial
    showBisnisUsaha = false,
    toggleBisnisUsaha = () => {},
    showHasilInvestasi = false,
    toggleHasilInvestasi = () => {},
    showTransportasi = false,
    toggleTransportasi = () => {},
    showSedekahDonasi = false,
    toggleSedekahDonasi = () => {},
    showPendidikanExpense = false,
    togglePendidikanExpense = () => {},
    showPajakExpense = false,
    togglePajakExpense = () => {},
    showPremiAsuransi = false,
    togglePremiAsuransi = () => {},
    showReksadana = false,
    toggleReksadana = () => {},
    showObligasiP2P = false,
    toggleObligasiP2P = () => {},
    showDeposito = false,
    toggleDeposito = () => {},
    showEbaRitel = false,
    toggleEbaRitel = () => {},
    showKendaraan = false,
    toggleKendaraan = () => {},
    showRumah = false,
    toggleRumah = () => {},
    showTanah = false,
    toggleTanah = () => {},
    showBangunan = false,
    toggleBangunan = () => {},
  } = context;

  const COLORS = [
    "#3AD9A3", // green-primary
    "#0F7C5F", // green-secondary
    "#1ABC9C", // green-accent-1
    "#2ECC71", // green-accent-2
    "#27AE60", // green-accent-3
    "#16A085", // green-accent-4
    "#2C3E50", // green-accent-5 (dark blue-gray)
  ];
  const RED_COLORS = ["#FF6B6B", "#E74C3C", "#C0392B", "#A93226"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Helper to format currency for tooltips/labels (using IDR)
  const formatRpCurrency = (value) => {
    if (typeof value !== "number") {
      return `Rp 0`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  return (
    <section
      id="financial-goals"
      // Adjusted section padding and max-width for better aesthetics
      className="p-8 max-w-6xl mx-auto mb-10 md:p-5"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 gradient-text leading-tight">
        Financial Data Input
      </h2>

      {/* Tab Navigation for Data Input */}
      <div className="bg-gray-card-bg rounded-t-xl p-4 shadow-md border border-gray-border border-b-0 flex justify-start overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-green-primary scrollbar-track-gray-700">
        <button
          type="button"
          onClick={() => setActiveDataInputTab("income")}
          className={`px-6 py-3 text-lg font-medium rounded-md ${
            activeDataInputTab === "income"
              ? "gradient-text border-b-2 border-green-primary bg-gray-dark"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setActiveDataInputTab("expenses")}
          className={`px-6 py-3 text-lg font-medium rounded-md ${
            activeDataInputTab === "expenses"
              ? "gradient-text border-b-2 border-green-primary bg-gray-dark"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Expenses
        </button>
        <button
          type="button"
          onClick={() => setActiveDataInputTab("savingsInvestments")}
          className={`px-6 py-3 text-lg font-medium rounded-md ${
            activeDataInputTab === "savingsInvestments"
              ? "gradient-text border-b-2 border-green-primary bg-gray-dark"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Savings & Investments
        </button>
        <button
          type="button"
          onClick={() => setActiveDataInputTab("assetsDebts")}
          className={`px-6 py-3 text-lg font-medium rounded-md ${
            activeDataInputTab === "assetsDebts"
              ? "gradient-text border-b-2 border-green-primary bg-gray-dark"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Assets & Debts
        </button>
        {/* Crypto Analysis Tab */}
        <button
          type="button"
          onClick={() => setActiveDataInputTab("cryptoAnalysis")}
          className={`px-6 py-3 text-lg font-medium rounded-md ${
            activeDataInputTab === "cryptoAnalysis"
              ? "gradient-text border-b-2 border-green-primary bg-gray-dark"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Crypto Analysis
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="bg-gray-card-bg rounded-b-xl p-8 shadow-md border border-gray-border border-t-0">
        {activeDataInputTab === "income" && (
          <div className="space-y-8">
            <form
              onSubmit={handleFinancialGoalsSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6">
                What is your monthly income?
              </h3>
              <div className="mb-5">
                <label
                  htmlFor="gajiBulanan"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Monthly Salary
                </label>
                <input
                  type="number"
                  id="gajiBulanan"
                  placeholder="Rp 0"
                  value={gajiBulanan}
                  onChange={(e) => setGajiBulanan(Number(e.target.value))}
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="pendapatanPasif"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Passive Income
                </label>
                <input
                  type="number"
                  id="pendapatanPasif"
                  placeholder="Rp 0"
                  value={pendapatanPasif}
                  onChange={(e) => setPendapatanPasif(Number(e.target.value))}
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6 mt-8">
                Do you have other income sources?
              </h3>
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  type="button"
                  onClick={toggleBisnisUsaha}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Business Income
                </button>
                <button
                  type="button"
                  onClick={toggleHasilInvestasi}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Investment Income
                </button>
              </div>
              {showBisnisUsaha && (
                <div className="mb-5">
                  <label
                    htmlFor="bisnisUsaha"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Business Income Value
                  </label>
                  <input
                    type="number"
                    id="bisnisUsaha"
                    placeholder="Rp 0"
                    value={bisnisUsaha}
                    onChange={(e) => setBisnisUsaha(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showHasilInvestasi && (
                <div className="mb-5">
                  <label
                    htmlFor="hasilInvestasi"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Investment Income Value
                  </label>
                  <input
                    type="number"
                    id="hasilInvestasi"
                    placeholder="Rp 0"
                    value={hasilInvestasi}
                    onChange={(e) => setHasilInvestasi(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              <button
                type="submit"
                onClick={handleFinancialGoalsSubmit}
                className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-300"
              >
                Save Income
              </button>
            </form>

            {/* Income Distribution Chart */}
            <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
              <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
                Income Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8" // Direct color for default fill
                    dataKey="value"
                  >
                    {incomeChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2C3E50", // gray-tooltip-bg
                      border: "1px solid #4F5D73", // gray-tooltip-border
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#FFFFFF" }} // white-default
                    labelStyle={{ color: "#9CA3AF" }} // gray-tooltip-label
                    formatter={formatRpCurrency}
                  />
                  <Legend
                    wrapperStyle={{ color: "#9CA3AF", paddingTop: "10px" }} // gray-legend
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeDataInputTab === "expenses" && (
          <div className="space-y-8">
            <form
              onSubmit={handleFinancialGoalsSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6">
                How much are your monthly expenses?
              </h3>
              <div className="mb-5">
                <label
                  htmlFor="belanjaKebutuhan"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Essential Spending
                </label>
                <input
                  type="number"
                  id="belanjaKebutuhan"
                  placeholder="Rp 0"
                  value={belanjaKebutuhan}
                  onChange={(e) => setBelanjaKebutuhan(Number(e.target.value))}
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6 mt-8">
                Do you have other expenses?
              </h3>
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  type="button"
                  onClick={toggleTransportasi}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Transportation
                </button>
                <button
                  type="button"
                  onClick={toggleSedekahDonasi}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Charity/Donation
                </button>
                <button
                  type="button"
                  onClick={togglePendidikanExpense}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Education
                </button>
                <button
                  type="button"
                  onClick={togglePajakExpense}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Tax
                </button>
                <button
                  type="button"
                  onClick={togglePremiAsuransi}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Monthly Insurance
                  Premium
                </button>
              </div>
              {showTransportasi && (
                <div className="mb-5">
                  <label
                    htmlFor="transportasi"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Transportation Value
                  </label>
                  <input
                    type="number"
                    id="transportasi"
                    placeholder="Rp 0"
                    value={transportasi}
                    onChange={(e) => setTransportasi(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showSedekahDonasi && (
                <div className="mb-5">
                  <label
                    htmlFor="sedekahDonasi"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Charity/Donation Value
                  </label>
                  <input
                    type="number"
                    id="sedekahDonasi"
                    placeholder="Rp 0"
                    value={sedekahDonasi}
                    onChange={(e) => setSedekahDonasi(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showPendidikanExpense && (
                <div className="mb-5">
                  <label
                    htmlFor="pendidikanExpense"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Education Value
                  </label>
                  <input
                    type="number"
                    id="pendidikanExpense"
                    placeholder="Rp 0"
                    value={pendidikanExpense}
                    onChange={(e) =>
                      setPendidikanExpense(Number(e.target.value))
                    }
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showPajakExpense && (
                <div className="mb-5">
                  <label
                    htmlFor="pajakExpense"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Tax Value
                  </label>
                  <input
                    type="number"
                    id="pajakExpense"
                    placeholder="Rp 0"
                    value={pajakExpense}
                    onChange={(e) => setPajakExpense(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showPremiAsuransi && (
                <div className="mb-5">
                  <label
                    htmlFor="premiAsuransi"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Monthly Insurance Premium Value
                  </label>
                  <input
                    type="number"
                    id="premiAsuransi"
                    placeholder="Rp 0"
                    value={premiAsuransi}
                    onChange={(e) => setPremiAsuransi(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              <button
                type="submit"
                onClick={handleFinancialGoalsSubmit}
                className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-300"
              >
                Save Expenses
              </button>
            </form>

            {/* Expense Distribution Chart */}
            <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
              <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
                Expense Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={RED_COLORS[index % RED_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2C3E50",
                      border: "1px solid #4F5D73",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#FFFFFF" }}
                    labelStyle={{ color: "#9CA3AF" }}
                    formatter={formatRpCurrency}
                  />
                  <Legend
                    wrapperStyle={{ color: "#9CA3AF", paddingTop: "10px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeDataInputTab === "savingsInvestments" && (
          <div className="space-y-8">
            <form
              onSubmit={handleFinancialGoalsSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6">
                How much do you save and invest monthly?
              </h3>
              <div className="mb-5">
                <label
                  htmlFor="tabungInvestasiBulanan"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Monthly Savings + Investments
                </label>
                <input
                  type="number"
                  id="tabungInvestasiBulanan"
                  placeholder="Rp 0"
                  value={tabungInvestasiBulanan}
                  onChange={(e) =>
                    setTabungInvestasiBulanan(Number(e.target.value))
                  }
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Money you set aside monthly for savings and investments
                  (mutual funds, gold, etc.)
                </p>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="totalTabunganSaatIni"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Current Total Savings
                </label>
                <input
                  type="number"
                  id="totalTabunganSaatIni"
                  placeholder="Rp 0"
                  value={totalTabunganSaatIni}
                  onChange={(e) =>
                    setTotalTabunganSaatIni(Number(e.target.value))
                  }
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6 mt-8">
                What investment products do you currently own?
              </h3>
              <div className="space-y-4 mb-5">
                <div>
                  <label
                    htmlFor="crowdFunding"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Crowd-Funding
                  </label>
                  <input
                    type="number"
                    id="crowdFunding"
                    placeholder="Rp 0 (Leave blank if none)"
                    value={crowdFunding}
                    onChange={(e) => setCrowdFunding(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="logamMulia"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Precious Metals
                  </label>
                  <input
                    type="number"
                    id="logamMulia"
                    placeholder="Rp 0 (Leave blank if none)"
                    value={logamMulia}
                    onChange={(e) => setLogamMulia(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="saham"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Stocks
                  </label>
                  <input
                    type="number"
                    id="saham"
                    placeholder="Rp 0 (Leave blank if none)"
                    value={saham}
                    onChange={(e) => setSaham(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="unitLink"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Unit Link
                  </label>
                  <input
                    type="number"
                    id="unitLink"
                    placeholder="Rp 0 (Leave blank if none)"
                    value={unitLink}
                    onChange={(e) => setUnitLink(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6 mt-8">
                Select other investment products
              </h3>
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  type="button"
                  onClick={toggleReksadana}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Mutual Funds
                </button>
                <button
                  type="button"
                  onClick={toggleObligasiP2P}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Bonds/P2P Lending
                </button>
                <button
                  type="button"
                  onClick={toggleDeposito}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Deposits
                </button>
                <button
                  type="button"
                  onClick={toggleEbaRitel}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Retail ABS
                </button>
              </div>
              {showReksadana && (
                <div className="mb-5">
                  <label
                    htmlFor="reksadana"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Mutual Funds Value
                  </label>
                  <input
                    type="number"
                    id="reksadana"
                    placeholder="Rp 0"
                    value={reksadana}
                    onChange={(e) => setReksadana(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showObligasiP2P && (
                <div className="mb-5">
                  <label
                    htmlFor="obligasiP2P"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Bonds/P2P Lending Value
                  </label>
                  <input
                    type="number"
                    id="obligasiP2P"
                    placeholder="Rp 0"
                    value={obligasiP2P}
                    onChange={(e) => setObligasiP2P(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showDeposito && (
                <div className="mb-5">
                  <label
                    htmlFor="deposito"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Deposits Value
                  </label>
                  <input
                    type="number"
                    id="deposito"
                    placeholder="Rp 0"
                    value={deposito}
                    onChange={(e) => setDeposito(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              {showEbaRitel && (
                <div className="mb-5">
                  <label
                    htmlFor="ebaRitel"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Retail ABS Value
                  </label>
                  <input
                    type="number"
                    id="ebaRitel"
                    placeholder="Rp 0"
                    value={ebaRitel}
                    onChange={(e) => setEbaRitel(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              <button
                type="submit"
                onClick={handleFinancialGoalsSubmit}
                className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-300"
              >
                Save Savings & Investments
              </button>
            </form>

            {/* Investment Breakdown Chart */}
            <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
              <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
                Investment Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={investmentChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDashArray="3 3" stroke="#4F5D73" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2C3E50",
                      border: "1px solid #4F5D73",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#FFFFFF" }}
                    labelStyle={{ color: "#9CA3AF" }}
                    formatter={formatRpCurrency}
                  />
                  <Legend
                    wrapperStyle={{ color: "#9CA3AF", paddingTop: "10px" }}
                  />
                  <Bar dataKey="value" fill="#3AD9A3" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeDataInputTab === "assetsDebts" && (
          <div className="space-y-8">
            <form
              onSubmit={handleFinancialGoalsSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6">
                What are your assets and debts?
              </h3>
              <div className="flex items-center mb-5">
                <label
                  htmlFor="punyaAset"
                  className="font-medium text-gray-text-tertiary mr-3 text-lg"
                >
                  Do you own assets?
                </label>
                <input
                  type="checkbox"
                  id="punyaAset"
                  checked={punyaAset}
                  onChange={(e) => setPunyaAset(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-primary rounded border-gray-600 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">
                  {punyaAset ? "Yes" : "No"}
                </span>
              </div>
              {punyaAset && (
                <div className="flex flex-wrap gap-3 mb-5">
                  <button
                    type="button"
                    onClick={toggleKendaraan}
                    className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                  >
                    <i className="fas fa-plus-circle mr-2"></i> Vehicle
                  </button>
                  <button
                    type="button"
                    onClick={toggleRumah}
                    className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                  >
                    <i className="fas fa-plus-circle mr-2"></i> House
                  </button>
                  <button
                    type="button"
                    onClick={toggleTanah}
                    className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                  >
                    <i className="fas fa-plus-circle mr-2"></i> Land
                  </button>
                  <button
                    type="button"
                    onClick={toggleBangunan}
                    className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center transition-colors"
                  >
                    <i className="fas fa-plus-circle mr-2"></i> Building
                  </button>
                </div>
              )}
              {punyaAset && (
                <>
                  {showKendaraan && (
                    <div className="mb-5">
                      <label
                        htmlFor="vehicles"
                        className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                      >
                        Vehicle Value
                      </label>
                      <input
                        type="number"
                        id="vehicles"
                        placeholder="Rp 0"
                        value={vehicles}
                        onChange={(e) => setVehicles(Number(e.target.value))}
                        className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                      />
                    </div>
                  )}
                  {showRumah && (
                    <div className="mb-5">
                      <label
                        htmlFor="rumahValue"
                        className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                      >
                        House Value
                      </label>
                      <input
                        type="number"
                        id="rumahValue"
                        placeholder="Rp 0"
                        value={rumahValue}
                        onChange={(e) => setRumahValue(Number(e.target.value))}
                        className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                      />
                    </div>
                  )}
                  {showTanah && (
                    <div className="mb-5">
                      <label
                        htmlFor="tanahValue"
                        className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                      >
                        Land Value
                      </label>
                      <input
                        type="number"
                        id="tanahValue"
                        placeholder="Rp 0"
                        value={tanahValue}
                        onChange={(e) => setTanahValue(Number(e.target.value))}
                        className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                      />
                    </div>
                  )}
                  {showBangunan && (
                    <div className="mb-5">
                      <label
                        htmlFor="bangunanValue"
                        className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                      >
                        Building Value
                      </label>
                      <input
                        type="number"
                        id="bangunanValue"
                        placeholder="Rp 0"
                        value={bangunanValue}
                        onChange={(e) =>
                          setBangunanValue(Number(e.target.value))
                        }
                        className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                      />
                    </div>
                  )}
                </>
              )}

              <div className="flex items-center mb-5">
                <label
                  htmlFor="punyaUtang"
                  className="font-medium text-gray-text-tertiary mr-3 text-lg"
                >
                  Do you have debts?
                </label>
                <input
                  type="checkbox"
                  id="punyaUtang"
                  checked={punyaUtang}
                  onChange={(e) => setPunyaUtang(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-green-primary rounded border-gray-600 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">
                  {punyaUtang ? "Yes" : "No"}
                </span>
              </div>
              {punyaUtang && (
                <div className="mb-5">
                  <label
                    htmlFor="debts"
                    className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                  >
                    Total Debts
                  </label>
                  <input
                    type="number"
                    id="debts"
                    placeholder="e.g., 20000000"
                    value={debts}
                    onChange={(e) => setDebts(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              )}
              <button
                type="submit"
                onClick={handleFinancialGoalsSubmit}
                className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-300"
              >
                Save Assets & Debts
              </button>
            </form>

            {/* Assets vs Debts Bar Chart */}
            <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
              <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
                Assets vs Debts Comparison
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={assetDebtChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDashArray="3 3" stroke="#4F5D73" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2C3E50",
                      border: "1px solid #4F5D73",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#FFFFFF" }}
                    labelStyle={{ color: "#9CA3AF" }}
                    formatter={formatRpCurrency}
                  />
                  <Legend
                    wrapperStyle={{ color: "#9CA3AF", paddingTop: "10px" }}
                  />
                  <Bar dataKey="value" fill="#3AD9A3" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {/* NEW: Crypto Analysis Tab Content */}
        {activeDataInputTab === "cryptoAnalysis" && (
          <div className="space-y-8">
            <form
              onSubmit={handleFinancialGoalsSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6">
                Analyze Potential Changes in Your Crypto Investments
              </h3>
              <div className="mb-5">
                <label
                  htmlFor="bitcoinCurrentValue"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Your Current Bitcoin Value (Rp)
                </label>
                <input
                  type="number"
                  id="bitcoinCurrentValue"
                  placeholder="e.g., 10000000"
                  value={bitcoinCurrentValue}
                  onChange={(e) =>
                    setBitcoinCurrentValue(Number(e.target.value))
                  }
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="ethereumCurrentValue"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Your Current Ethereum Value (Rp)
                </label>
                <input
                  type="number"
                  id="ethereumCurrentValue"
                  placeholder="e.g., 5000000"
                  value={ethereumCurrentValue}
                  onChange={(e) =>
                    setEthereumCurrentValue(Number(e.target.value))
                  }
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="cryptoScenarioPercentage"
                  className="block mb-2 font-medium text-gray-text-tertiary text-lg"
                >
                  Price Change Scenario (%)
                </label>
                <input
                  type="number"
                  id="cryptoScenarioPercentage"
                  placeholder="e.g., 10 for 10% increase, -5 for 5% decrease"
                  value={cryptoScenarioPercentage}
                  onChange={(e) =>
                    setCryptoScenarioPercentage(Number(e.target.value))
                  }
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter a positive number for increase, negative for decrease.
                </p>
              </div>
              <button
                type="submit"
                onClick={handleFinancialGoalsSubmit}
                className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-300"
              >
                Simulate Change
              </button>
            </form>

            {/* Simulation Results */}
            <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
              <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
                Simulation Results
              </h3>
              <div className="space-y-3">
                <p className="text-lg text-gray-300">
                  Potential Change in Crypto Investment Value:{" "}
                  <span
                    className={`font-bold ${
                      cryptoScenarioResult &&
                      cryptoScenarioResult.potentialGainLoss >= 0
                        ? "text-green-primary"
                        : "text-red-primary"
                    }`}
                  >
                    Rp{" "}
                    {cryptoScenarioResult
                      ? cryptoScenarioResult.potentialGainLoss.toLocaleString(
                          "id-ID"
                        )
                      : "0"}
                  </span>
                </p>
                <p className="text-lg text-gray-300">
                  New Bitcoin Value:{" "}
                  <span className="font-bold text-white-default">
                    Rp{" "}
                    {cryptoScenarioResult
                      ? cryptoScenarioResult.newBitcoinValue.toLocaleString(
                          "id-ID"
                        )
                      : "0"}
                  </span>
                </p>
                <p className="text-lg text-gray-300">
                  New Ethereum Value:{" "}
                  <span className="font-bold text-white-default">
                    Rp{" "}
                    {cryptoScenarioResult
                      ? cryptoScenarioResult.newEthereumValue.toLocaleString(
                          "id-ID"
                        )
                      : "0"}
                  </span>
                </p>
                <p className="text-lg text-gray-300">
                  Projected Net Worth:{" "}
                  <span className="font-bold gradient-text">
                    Rp{" "}
                    {cryptoScenarioResult
                      ? cryptoScenarioResult.projectedNetWorth.toLocaleString(
                          "id-ID"
                        )
                      : "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DataInputPage;
