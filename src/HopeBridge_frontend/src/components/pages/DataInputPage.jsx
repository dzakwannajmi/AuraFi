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
    handleFinancialGoalsSubmit, // This is for general goals form
    gajiBulanan, // Monthly Salary
    setGajiBulanan,
    pendapatanPasif, // Passive Income
    setPendapatanPasif,
    bisnisUsaha, // Business Income
    setBisnisUsaha,
    hasilInvestasi, // Investment Income
    setHasilInvestasi,
    belanjaKebutuhan, // Essential Spending
    setBelanjaKebutuhan,
    transportasi, // Transportation Expense
    setTransportasi,
    sedekahDonasi, // Charity/Donation Expense
    setSedekahDonasi,
    pendidikanExpense, // Education Expense
    setPendidikanExpense,
    pajakExpense, // Tax Expense
    setPajakExpense,
    premiAsuransi, // Insurance Premium
    setPremiAsuransi,
    tabungInvestasiBulanan, // Monthly Savings/Investment
    setTabungInvestasiBulanan,
    totalTabunganSaatIni, // Current Total Savings
    setTotalTabunganSaatIni,
    crowdFunding, // Crowdfunding Investment
    setCrowdFunding,
    logamMulia, // Precious Metals Investment
    setLogamMulia,
    saham, // Stock Investment
    setSaham,
    unitLink, // Unit Link Investment
    setUnitLink,
    reksadana, // Mutual Fund Investment
    setReksadana,
    obligasiP2P, // Bonds/P2P Lending Investment
    setObligasiP2P,
    deposito, // Deposit Investment
    setDeposito,
    ebaRitel, // Retail ABS (Asset-Backed Securities) Investment
    setEbaRitel,
    punyaAset, // Has Assets checkbox
    setPunyaAset,
    vehicles, // Vehicle Value
    setVehicles,
    rumahValue, // House Value
    setRumahValue,
    tanahValue, // Land Value
    setTanahValue,
    bangunanValue, // Building Value
    setBangunanValue,
    punyaUtang, // Has Debts checkbox
    setPunyaUtang,
    debts, // Total Debts
    setDebts,
    emergencyFund, // Emergency Fund
    setEmergencyFund,
    budget, // Monthly Budget
    setBudget,
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
    // IMPORTANT PART: Destructure ALL show states and toggle functions from context
    showBisnisUsaha,
    toggleBisnisUsaha,
    showHasilInvestasi,
    toggleHasilInvestasi,
    showTransportasi,
    toggleTransportasi,
    showSedekahDonasi,
    toggleSedekahDonasi,
    showPendidikanExpense,
    togglePendidikanExpense,
    showPajakExpense,
    togglePajakExpense,
    showPremiAsuransi,
    togglePremiAsuransi,
    showReksadana,
    toggleReksadana,
    showObligasiP2P,
    toggleObligasiP2P,
    showDeposito,
    toggleDeposito,
    showEbaRitel,
    toggleEbaRitel,
    showKendaraan,
    toggleKendaraan,
    showRumah,
    toggleRumah,
    showTanah,
    toggleTanah,
    showBangunan,
    toggleBangunan,
  } = context;

  const COLORS = [
    "#3AD9A3",
    "#0F7C5F",
    "#1ABC9C",
    "#2ECC71",
    "#27AE60",
    "#16A085",
    "#2C3E50",
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

  return (
    <section
      id="financial-goals"
      className="p-10 max-w-3xl mx-auto mb-10 bg-gray-card-bg rounded-xl shadow-md border border-gray-border md:p-5 md:mx-5"
    >
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        Data Input
      </h2>

      {/* Tab Navigation for Data Input */}
      <div className="flex justify-start mb-8 border-b border-gray-700 overflow-x-auto whitespace-nowrap px-2 scrollbar-thin scrollbar-thumb-green-primary scrollbar-track-gray-700">
        <button
          type="button"
          onClick={() => setActiveDataInputTab("income")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "income"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setActiveDataInputTab("expenses")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "expenses"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Expenses
        </button>
        <button
          type="button"
          onClick={() => setActiveDataInputTab("savingsInvestments")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "savingsInvestments"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Savings & Investments
        </button>
        <button
          type="button"
          onClick={() => setActiveDataInputTab("assetsDebts")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "assetsDebts"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Assets & Debts
        </button>
        {/* Crypto Analysis Tab */}
        <button
          type="button"
          onClick={() => setActiveDataInputTab("cryptoAnalysis")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "cryptoAnalysis"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Crypto Analysis
        </button>
      </div>

      {/* Content based on active tab */}
      {activeDataInputTab === "income" && (
        <div className="space-y-8">
          <form
            onSubmit={handleFinancialGoalsSubmit}
            className="space-y-5 max-w-xl mx-auto"
          >
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              What is your monthly income?
            </h3>
            <div className="mb-5">
              <label
                htmlFor="gajiBulanan"
                className="block mb-2 font-medium text-gray-text-tertiary"
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
                className="block mb-2 font-medium text-gray-text-tertiary"
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
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 mt-8">
              Do you have other income sources?
            </h3>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                onClick={toggleBisnisUsaha} // Using toggle function from context
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Business Income
              </button>
              <button
                type="button"
                onClick={toggleHasilInvestasi} // Using toggle function from context
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Investment Income
              </button>
            </div>
            {/* Conditional Input Fields for Income */}
            {showBisnisUsaha && (
              <div className="mb-5">
                <label
                  htmlFor="bisnisUsaha"
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
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
                  fill="purple-recharts"
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
                    backgroundColor: "gray-tooltip-bg",
                    border: "1px solid gray-tooltip-border",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "white-default" }}
                  labelStyle={{ color: "gray-tooltip-label" }}
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Legend
                  wrapperStyle={{ color: "gray-legend", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeDataInputTab === "expenses" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              How much are your monthly expenses?
            </h3>
            <div className="mb-5">
              <label
                htmlFor="belanjaKebutuhan"
                className="block mb-2 font-medium text-gray-text-tertiary"
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
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 mt-8">
              Do you have other expenses?
            </h3>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                onClick={toggleTransportasi}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Transportation
              </button>
              <button
                type="button"
                onClick={toggleSedekahDonasi}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Charity/Donation
              </button>
              <button
                type="button"
                onClick={togglePendidikanExpense}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Education
              </button>
              <button
                type="button"
                onClick={togglePajakExpense}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Tax
              </button>
              <button
                type="button"
                onClick={togglePremiAsuransi}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Monthly Insurance
                Premium
              </button>
            </div>
            {/* Conditional Input Fields for Expenses */}
            {showTransportasi && (
              <div className="mb-5">
                <label
                  htmlFor="transportasi"
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
                >
                  Education Value
                </label>
                <input
                  type="number"
                  id="pendidikanExpense"
                  placeholder="Rp 0"
                  value={pendidikanExpense}
                  onChange={(e) => setPendidikanExpense(Number(e.target.value))}
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
            )}
            {showPajakExpense && (
              <div className="mb-5">
                <label
                  htmlFor="pajakExpense"
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
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
                  fill="purple-recharts"
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
                    backgroundColor: "gray-tooltip-bg",
                    border: "1px solid gray-tooltip-border",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "white-default" }}
                  labelStyle={{ color: "gray-tooltip-label" }}
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Legend
                  wrapperStyle={{ color: "gray-legend", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeDataInputTab === "savingsInvestments" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              How much do you save and invest monthly?
            </h3>
            <div className="mb-5">
              <label
                htmlFor="tabungInvestasiBulanan"
                className="block mb-2 font-medium text-gray-text-tertiary"
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
                Money you set aside monthly for savings and investments (mutual
                funds, gold, etc.)
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="totalTabunganSaatIni"
                className="block mb-2 font-medium text-gray-text-tertiary"
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
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 mt-8">
              What investment products do you currently own?
            </h3>
            <div className="space-y-4 mb-5">
              <div>
                <label
                  htmlFor="crowdFunding"
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 mt-8">
              Select other investment products
            </h3>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                onClick={toggleReksadana}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Mutual Funds
              </button>
              <button
                type="button"
                onClick={toggleObligasiP2P}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Bonds/P2P Lending
              </button>
              <button
                type="button"
                onClick={toggleDeposito}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Deposits
              </button>
              <button
                type="button"
                onClick={toggleEbaRitel}
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Retail ABS
              </button>
            </div>
            {showReksadana && (
              <div className="mb-5">
                <label
                  htmlFor="reksadana"
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
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
                <CartesianGrid strokeDasharray="3 3" stroke="gray-grid" />
                <XAxis dataKey="name" stroke="gray-medium" />
                <YAxis stroke="gray-medium" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "gray-tooltip-bg",
                    border: "1px solid gray-tooltip-border",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "white-default" }}
                  labelStyle={{ color: "gray-tooltip-label" }}
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Legend
                  wrapperStyle={{ color: "gray-legend", paddingTop: "10px" }}
                />
                <Bar
                  dataKey="value"
                  fill="green-primary"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeDataInputTab === "assetsDebts" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              What are your assets and debts?
            </h3>
            <div className="flex items-center mb-5">
              <label
                htmlFor="punyaAset"
                className="font-medium text-gray-text-tertiary mr-3"
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
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Vehicle
                </button>
                <button
                  type="button"
                  onClick={toggleRumah}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> House
                </button>
                <button
                  type="button"
                  onClick={toggleTanah}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Land
                </button>
                <button
                  type="button"
                  onClick={toggleBangunan}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Building
                </button>
              </div>
            )}
            {/* Example input fields for assets if 'Do you own assets?' is checked */}
            {punyaAset && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="vehicles"
                    className="block mb-2 font-medium text-gray-text-tertiary"
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
                <div className="mb-5">
                  <label
                    htmlFor="rumahValue"
                    className="block mb-2 font-medium text-gray-text-tertiary"
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
                <div className="mb-5">
                  <label
                    htmlFor="tanahValue"
                    className="block mb-2 font-medium text-gray-text-tertiary"
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
                <div className="mb-5">
                  <label
                    htmlFor="bangunanValue"
                    className="block mb-2 font-medium text-gray-text-tertiary"
                  >
                    Building Value
                  </label>
                  <input
                    type="number"
                    id="bangunanValue"
                    placeholder="Rp 0"
                    value={bangunanValue}
                    onChange={(e) => setBangunanValue(Number(e.target.value))}
                    className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                  />
                </div>
              </>
            )}

            <div className="flex items-center mb-5">
              <label
                htmlFor="punyaUtang"
                className="font-medium text-gray-text-tertiary mr-3"
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
                  className="block mb-2 font-medium text-gray-text-tertiary"
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
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
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
                <CartesianGrid strokeDasharray="3 3" stroke="gray-grid" />
                <XAxis dataKey="name" stroke="gray-medium" />
                <YAxis stroke="gray-medium" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "gray-tooltip-bg",
                    border: "1px solid gray-tooltip-border",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "white-default" }}
                  labelStyle={{ color: "gray-tooltip-label" }}
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Legend
                  wrapperStyle={{ color: "gray-legend", paddingTop: "10px" }}
                />
                <Bar
                  dataKey="value"
                  fill="green-primary"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* NEW: Crypto Analysis Tab Content */}
      {activeDataInputTab === "cryptoAnalysis" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              Analyze Potential Changes in Your Crypto Investments
            </h3>
            <div className="mb-5">
              <label
                htmlFor="bitcoinCurrentValue"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Your Current Bitcoin Value (Rp)
              </label>
              <input
                type="number"
                id="bitcoinCurrentValue"
                placeholder="e.g., 10000000"
                value={bitcoinCurrentValue}
                onChange={(e) => setBitcoinCurrentValue(Number(e.target.value))}
                className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="ethereumCurrentValue"
                className="block mb-2 font-medium text-gray-text-tertiary"
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
                className="block mb-2 font-medium text-gray-text-tertiary"
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
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
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
    </section>
  );
}

export default DataInputPage;
