import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function DashboardPage({
  totalExpenses,
  totalIncome,
  netBalance,
  netWorth,
  budget,
  savings,
  retirementSavings,
  vehicles,
  otherAssets,
  debts,
  emergencyFund,
  financialStatus,
  monthlyData,
  categoryExpenseData,
}) {
  // Simple financial note based on current status
  const financialNote =
    financialStatus.level >= 4
      ? "Selamat! Kesehatan finansial Anda sangat baik. Terus pertahankan kebiasaan baik ini dan pertimbangkan untuk diversifikasi investasi."
      : financialStatus.level >= 2
      ? "Kesehatan finansial Anda stabil, namun ada ruang untuk perbaikan. Fokus pada pengurangan utang atau peningkatan dana darurat."
      : "Perlu perhatian lebih pada kesehatan finansial Anda. Mari kita mulai dengan membuat anggaran dan melacak pengeluaran Anda.";

  return (
    <section id="dashboard" className="max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        Ringkasan Dashboard Keuangan Kesehatan
      </h2>

      {/* Financial Level Indicator */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
          Level Keuangan Anda:{" "}
          <span className="gradient-text">Level {financialStatus.level}</span>
        </h3>
        <p className="text-lg text-gray-300 mb-4">{financialStatus.message}</p>
        <div className="flex justify-center items-center space-x-2">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  lvl <= financialStatus.level
                    ? "bg-gradient-to-r from-green-primary to-green-secondary text-white-default"
                    : "bg-gray-700 text-gray-400"
                }`}
            >
              {lvl}
            </div>
          ))}
        </div>
      </div>

      {/* Brief Financial Note */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mb-10 text-center">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-3">
          Catatan Ringkas Kesehatan Finansial:
        </h3>
        <p className="text-lg text-gray-300">{financialNote}</p>
      </div>

      {/* Main Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Total Pengeluaran Medis
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {totalExpenses.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Total Klaim Asuransi
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {totalIncome.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Saldo Bersih Kesehatan
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {netBalance.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Kekayaan Bersih (Net Worth)
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {netWorth.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Anggaran Bulanan
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {budget.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Dana Pensiun
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {retirementSavings.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Dana Darurat
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {emergencyFund.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Income vs Expense Line Chart */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10 mb-8">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
          Tren Pemasukan & Pengeluaran Bulanan
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlyData}
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
              itemStyle={{ color: "gray-tooltip-item" }}
              labelStyle={{ color: "gray-tooltip-label" }}
              formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
            />
            <Legend
              wrapperStyle={{ color: "gray-legend", paddingTop: "10px" }}
            />
            <Line
              type="monotone"
              dataKey="Pemasukan"
              stroke="green-primary"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Pengeluaran"
              stroke="red-primary"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Expense Bar Chart */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
          Pengeluaran Berdasarkan Kategori
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={categoryExpenseData}
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
              itemStyle={{ color: "gray-tooltip-item" }}
              labelStyle={{ color: "gray-tooltip-label" }}
              formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
            />
            <Legend
              wrapperStyle={{ color: "gray-legend", paddingTop: "10px" }}
            />
            <Bar
              dataKey="Pengeluaran"
              fill="red-primary"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
export default DashboardPage;
