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
  const {
    activeDataInputTab,
    setActiveDataInputTab,
    handleFinancialGoalsSubmit,
    gajiBulanan,
    setGajiBulanan,
    pendapatanPasif,
    setPendapatanPasif,
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
    setEmergencyFund,
    budget,
    setBudget,
    incomeChartData,
    expenseChartData,
    investmentChartData,
    assetDebtChartData,
    // NEW: Ambil state crypto dari context
    bitcoinCurrentValue,
    setBitcoinCurrentValue,
    ethereumCurrentValue,
    setEthereumCurrentValue,
    cryptoScenarioPercentage,
    setCryptoScenarioPercentage,
    netWorth, // Untuk menghitung dampak pada net worth
  } = context;

  const COLORS = [
    "#3AD9A3",
    "#0F7C5F",
    "#1ABC9C",
    "#2ECC71",
    "#27AE60",
    "#16A085",
    "#2C3E50",
  ]; // Greenish palette
  const RED_COLORS = ["#FF6B6B", "#E74C3C", "#C0392B", "#A93226"]; // Reddish palette

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

  // NEW: Logika Analisis Crypto
  const calculateCryptoScenario = () => {
    const changeFactor = 1 + cryptoScenarioPercentage / 100;
    const newBitcoinValue = bitcoinCurrentValue * changeFactor;
    const newEthereumValue = ethereumCurrentValue * changeFactor;

    // Hitung dampak pada Net Worth
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

  return (
    <section
      id="financial-goals"
      className="p-10 max-w-3xl mx-auto mb-10 bg-gray-card-bg rounded-xl shadow-md border border-gray-border md:p-5 md:mx-5"
    >
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        Data Input
      </h2>

      {/* Tab Navigation for Data Input */}
      <div className="flex justify-center mb-8 border-b border-gray-700 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveDataInputTab("penghasilan")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "penghasilan"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Penghasilan
        </button>
        <button
          onClick={() => setActiveDataInputTab("pengeluaran")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "pengeluaran"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Pengeluaran
        </button>
        <button
          onClick={() => setActiveDataInputTab("tabunganInvestasi")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "tabunganInvestasi"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Tabungan & Investasi
        </button>
        <button
          onClick={() => setActiveDataInputTab("asetUtang")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "asetUtang"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Aset & Utang
        </button>
        {/* NEW: Tab Analisis Crypto */}
        <button
          onClick={() => setActiveDataInputTab("analisisCrypto")}
          className={`px-6 py-3 text-lg font-medium ${
            activeDataInputTab === "analisisCrypto"
              ? "gradient-text border-b-2 border-green-primary"
              : "text-gray-400 hover:text-green-primary"
          } transition-all duration-300`}
        >
          Analisis Crypto
        </button>
      </div>

      {/* Content based on active tab */}
      {activeDataInputTab === "penghasilan" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              Berapa sih penghasilan kamu setiap bulannya?
            </h3>
            <div className="mb-5">
              <label
                htmlFor="gajiBulanan"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Gaji Bulanan
              </label>
              <input
                type="number"
                id="gajiBulanan"
                placeholder="Rp 0"
                value={gajiBulanan}
                onChange={(e) => setGajiBulanan(Number(e.target.value))}
                className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
              />
              <p className="text-sm text-gray-500 mt-1">
                Penghasilan yang kamu peroleh setelah bekerja setiap bulan
                (freelance, gaji dari kantor, dsb)
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="pendapatanPasif"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Pendapatan Pasif
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
              Punya penghasilan lainnya?
            </h3>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Bisnis Usaha
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Hasil Investasi
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Simpan Penghasilan
            </button>
          </form>

          {/* Income Distribution Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Distribusi Penghasilan
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

      {activeDataInputTab === "pengeluaran" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              Dalam sebulan, berapa biaya pengeluaranmu?
            </h3>
            <div className="mb-5">
              <label
                htmlFor="belanjaKebutuhan"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Belanja Kebutuhan
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
              Punya pengeluaran lainnya?
            </h3>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Transportasi
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Sedekah/Donasi
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Pendidikan
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Pajak
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Premi Asuransi
                Bulanan
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Simpan Pengeluaran
            </button>
          </form>

          {/* Expense Distribution Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Distribusi Pengeluaran
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

      {activeDataInputTab === "tabunganInvestasi" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              Berapa banyak uang untuk kamu tabung dan investasi tiap bulannya?
            </h3>
            <div className="mb-5">
              <label
                htmlFor="tabungInvestasiBulanan"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Menabung + berinvestasi tiap bulan
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
                Uang yang kamu sisihkan perbulannya untuk menabung dan
                berinvestasi. (reksadana, emas, dsb)
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="totalTabunganSaatIni"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Total tabungan kamu saat ini
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
              Sudah punya produk investasi apa saja?
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
                  placeholder="Rp 0 (Kosongkan jika tidak ada)"
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
                  Logam Mulia
                </label>
                <input
                  type="number"
                  id="logamMulia"
                  placeholder="Rp 0 (Kosongkan jika tidak ada)"
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
                  Saham
                </label>
                <input
                  type="number"
                  id="saham"
                  placeholder="Rp 0 (Kosongkan jika tidak ada)"
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
                  placeholder="Rp 0 (Kosongkan jika tidak ada)"
                  value={unitLink}
                  onChange={(e) => setUnitLink(Number(e.target.value))}
                  className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 mt-8">
              Pilih produk investasi lainnya
            </h3>
            <div className="flex flex-wrap gap-3 mb-5">
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Reksadana
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Obligasi/P2P Lending
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Deposito
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> EBA Ritel
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Simpan Tabungan & Investasi
            </button>
          </form>

          {/* Investment Breakdown Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Distribusi Investasi
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

      {activeDataInputTab === "asetUtang" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              Berapa jumlah aset dan utang yang kamu miliki?
            </h3>
            <div className="flex items-center mb-5">
              <label
                htmlFor="punyaAset"
                className="font-medium text-gray-text-tertiary mr-3"
              >
                Punya aset?
              </label>
              <input
                type="checkbox"
                id="punyaAset"
                checked={punyaAset}
                onChange={(e) => setPunyaAset(e.target.checked)}
                className="form-checkbox h-5 w-5 text-green-primary rounded border-gray-600 bg-gray-700"
              />
              <span className="ml-2 text-gray-300">
                {punyaAset ? "Ya" : "Tidak"}
              </span>
            </div>
            {punyaAset && (
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Kendaraan
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Rumah
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Tanah
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Bangunan
                </button>
              </div>
            )}
            {/* Example input fields for assets if 'Punya aset' is checked */}
            {punyaAset && (
              <>
                <div className="mb-5">
                  <label
                    htmlFor="vehicles"
                    className="block mb-2 font-medium text-gray-text-tertiary"
                  >
                    Nilai Kendaraan
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
                    Nilai Rumah
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
                    Nilai Tanah
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
                    Nilai Bangunan
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
                Punya utang?
              </label>
              <input
                type="checkbox"
                id="punyaUtang"
                checked={punyaUtang}
                onChange={(e) => setPunyaUtang(e.target.checked)}
                className="form-checkbox h-5 w-5 text-green-primary rounded border-gray-600 bg-gray-700"
              />
              <span className="ml-2 text-gray-300">
                {punyaUtang ? "Ya" : "Tidak"}
              </span>
            </div>
            {punyaUtang && (
              <div className="mb-5">
                <label
                  htmlFor="debts"
                  className="block mb-2 font-medium text-gray-text-tertiary"
                >
                  Total Utang
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
              Simpan Aset & Utang
            </button>
          </form>

          {/* Assets vs Debts Bar Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Perbandingan Aset dan Utang
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
      {/* NEW: Analisis Crypto Tab Content */}
      {activeDataInputTab === "analisisCrypto" && (
        <div className="space-y-8">
          <form onSubmit={handleFinancialGoalsSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
              Analisis Potensi Perubahan Investasi Crypto Anda
            </h3>
            <div className="mb-5">
              <label
                htmlFor="bitcoinCurrentValue"
                className="block mb-2 font-medium text-gray-text-tertiary"
              >
                Nilai Bitcoin Anda Saat Ini (Rp)
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
                Nilai Ethereum Anda Saat Ini (Rp)
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
                Skenario Perubahan Harga (%)
              </label>
              <input
                type="number"
                id="cryptoScenarioPercentage"
                placeholder="e.g., 10 untuk 10% naik, -5 untuk 5% turun"
                value={cryptoScenarioPercentage}
                onChange={(e) =>
                  setCryptoScenarioPercentage(Number(e.target.value))
                }
                className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30"
              />
              <p className="text-sm text-gray-500 mt-1">
                Masukkan angka positif untuk kenaikan, negatif untuk penurunan.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              Simulasikan Perubahan
            </button>
          </form>

          {/* Hasil Simulasi */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Hasil Simulasi
            </h3>
            <div className="space-y-3">
              <p className="text-lg text-gray-300">
                Potensi Perubahan Nilai Investasi Crypto:{" "}
                <span
                  className={`font-bold ${
                    cryptoScenarioResult.potentialGainLoss >= 0
                      ? "text-green-primary"
                      : "text-red-primary"
                  }`}
                >
                  Rp{" "}
                  {cryptoScenarioResult.potentialGainLoss.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </p>
              <p className="text-lg text-gray-300">
                Nilai Bitcoin Baru:{" "}
                <span className="font-bold text-white-default">
                  Rp{" "}
                  {cryptoScenarioResult.newBitcoinValue.toLocaleString("id-ID")}
                </span>
              </p>
              <p className="text-lg text-gray-300">
                Nilai Ethereum Baru:{" "}
                <span className="font-bold text-white-default">
                  Rp{" "}
                  {cryptoScenarioResult.newEthereumValue.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </p>
              <p className="text-lg text-gray-300">
                Kekayaan Bersih Proyeksi:{" "}
                <span className="font-bold gradient-text">
                  Rp{" "}
                  {cryptoScenarioResult.projectedNetWorth.toLocaleString(
                    "id-ID"
                  )}
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
