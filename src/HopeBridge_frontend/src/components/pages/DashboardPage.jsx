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
import { useOutletContext } from "react-router-dom";

function DashboardPage() {
  const context = useOutletContext();

  // --- DEBUGGING: Log all received context data ---
  console.log("DashboardPage: Context received:", context);

  // Check if context or its properties are undefined before destructuring
  if (!context || Object.keys(context).length === 0) {
    console.log(
      "DashboardPage: Context is empty or not yet available, displaying loading."
    );
    return (
      <div className="text-center text-gray-400 mt-20">
        Loading dashboard data...
        <br />
        Check your browser console for more details.
      </div>
    );
  }

  // Destructure all required props from context
  const {
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
    monthlyData, // Data for monthly income/expense trend
    categoryExpenseData, // Data for expenses by category
    // Ensure you also pass these data from useFinancialHealthData if you want to use them
    // incomeChartData, // If you have specific income chart data
    // expenseChartData, // If you have specific expense chart data
    // investmentChartData, // If you have specific investment chart data
    // assetDebtChartData, // If you have specific asset/debt chart data
  } = context;

  // Ensure important data used in .toLocaleString() are not undefined
  // Provide default 0 if undefined, to prevent crashes and display "Rp 0.00"
  const safeTotalExpenses = totalExpenses !== undefined ? totalExpenses : 0;
  const safeTotalIncome = totalIncome !== undefined ? totalIncome : 0;
  const safeNetBalance = netBalance !== undefined ? netBalance : 0;
  const safeNetWorth = netWorth !== undefined ? netWorth : 0;
  const safeBudget = budget !== undefined ? budget : 0;
  const safeSavings = savings !== undefined ? savings : 0;
  const safeRetirementSavings =
    retirementSavings !== undefined ? retirementSavings : 0;
  const safeEmergencyFund = emergencyFund !== undefined ? emergencyFund : 0;

  // Simple financial note based on current status
  const financialNote =
    financialStatus && financialStatus.level !== undefined
      ? financialStatus.level >= 4
        ? "Congratulations! Your financial health is excellent. Keep up the good habits and consider diversifying your investments."
        : financialStatus.level >= 2
        ? "Your financial health is stable, but there's room for improvement. Focus on debt reduction or increasing your emergency fund."
        : "More attention is needed for your financial health. Let's start by creating a budget and tracking your expenses."
      : "Loading financial status..."; // Default message if financialStatus is not ready

  // Add checks for chart data before rendering charts
  const isChartDataReady =
    monthlyData &&
    monthlyData.length > 0 &&
    categoryExpenseData &&
    categoryExpenseData.length > 0;

  return (
    <section id="dashboard" className="max-w-6xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        Health Financial Dashboard Summary
      </h2>

      {/* Financial Level Indicator */}
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4">
          Your Financial Level:{" "}
          <span className="gradient-text">
            Level {financialStatus ? financialStatus.level : "N/A"}
          </span>
        </h3>
        <p className="text-lg text-gray-300 mb-4">
          {financialStatus
            ? financialStatus.message
            : "Loading financial status..."}
        </p>
        <div className="flex justify-center items-center space-x-2">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  financialStatus && lvl <= financialStatus.level
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
          Brief Financial Health Note:
        </h3>
        <p className="text-lg text-gray-300">{financialNote}</p>
      </div>

      {/* Main Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Total Medical Expenses
          </h3>
          {/* Default to 0.00 if data is not yet available */}
          <p className="text-4xl font-bold gradient-text">
            Rp {safeTotalExpenses.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Total Insurance Claims
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeTotalIncome.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Net Health Balance
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeNetBalance.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Net Worth
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeNetWorth.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Monthly Budget
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeBudget.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Retirement Savings
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeRetirementSavings.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Emergency Fund
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeEmergencyFund.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {isChartDataReady ? (
        <>
          {/* Income vs Expense Line Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10 mb-8">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Monthly Income & Expense Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />{" "}
                {/* Lighter grid color */}
                <XAxis dataKey="name" stroke="#BBB" />{" "}
                {/* Lighter axis text color */}
                <YAxis stroke="#BBB" /> {/* Lighter axis text color */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-gray-tooltip-bg)",
                    border: "1px solid var(--color-gray-tooltip-border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "var(--color-white-default)" }}
                  labelStyle={{ color: "var(--color-gray-tooltip-label)" }}
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Legend
                  wrapperStyle={{
                    color: "var(--color-gray-legend)",
                    paddingTop: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Pemasukan" // Data key for Income
                  stroke="var(--color-green-accent-2)" /* Bright green color */
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  connectNulls={
                    true
                  } /* Add this to connect null points */
                />
                <Line
                  type="monotone"
                  dataKey="Pengeluaran" // Data key for Expenses
                  stroke="var(--color-red-primary)" /* Bright red color */
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  connectNulls={
                    true
                  } /* Add this to connect null points */
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category-wise Expense Bar Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-4 text-center">
              Expenses by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryExpenseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />{" "}
                {/* Lighter grid color */}
                <XAxis dataKey="name" stroke="#BBB" />{" "}
                {/* Lighter axis text color */}
                <YAxis stroke="#BBB" /> {/* Lighter axis text color */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-gray-tooltip-bg)",
                    border: "1px solid var(--color-gray-tooltip-border)",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "var(--color-white-default)" }}
                  labelStyle={{ color: "var(--color-gray-tooltip-label)" }}
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Legend
                  wrapperStyle={{
                    color: "var(--color-gray-legend)",
                    paddingTop: "10px",
                  }}
                />
                <Bar
                  dataKey="Pengeluaran" // Data key for Expenses
                  fill="var(--color-red-primary)" /* Bright red color */
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          Charts are loading or data is insufficient.
        </div>
      )}
    </section>
  );
}
export default DashboardPage;
