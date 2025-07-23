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
    calculatedTotalExpenses: totalExpenses, // Renamed for clarity in DashboardPage
    calculatedTotalIncome: totalIncome, // Renamed for clarity in DashboardPage
    netBalance,
    netWorth,
    budget,
    savings,
    retirementSavings,
    vehicles, // Keeping original names for data values if they come directly from hook
    otherAssets, // Keeping original names for data values
    debts, // Keeping original names for data values
    emergencyFund,
    financialStatus,
    monthlyData, // Data for monthly income/expense trend
    categoryExpenseData, // Data for expenses by category
    // These are already handled in useFinancialHealthData if needed:
    // incomeChartData,
    // expenseChartData,
    // investmentChartData,
    // assetDebtChartData,
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

  // Helper to format currency for tooltips/labels (using IDR)
  const formatRpCurrency = (value) => {
    if (typeof value !== 'number') {
      return `Rp 0`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  return (
    <section id="dashboard" className="max-w-6xl mx-auto my-10 p-4">
      <h2 className="text-4xl font-extrabold text-center mb-10 gradient-text">
        Financial Health Dashboard
      </h2>

      {/* Financial Level Indicator */}
      <div className="bg-gray-card-bg rounded-xl p-8 shadow-2xl border border-gray-border mb-8 text-center animate-fade-in-up animate-delay-100">
        <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-4">
          Your Financial Level:{" "}
          <span className="gradient-text">
            Level {financialStatus ? financialStatus.level : "N/A"}
          </span>
        </h3>
        <p className="text-lg text-gray-300 mb-6">
          {financialStatus
            ? financialStatus.message
            : "Loading financial status..."}
        </p>
        <div className="flex justify-center items-center space-x-3">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-md font-bold transition-all duration-300 ease-in-out transform
                ${
                  financialStatus && lvl <= financialStatus.level
                    ? "bg-gradient-to-r from-green-primary to-green-secondary text-white-default scale-110 shadow-lg"
                    : "bg-gray-700 text-gray-400 scale-90"
                }`}
            >
              {lvl}
            </div>
          ))}
        </div>
      </div>

      {/* Brief Financial Note */}
      <div className="bg-gray-card-bg rounded-xl p-8 shadow-2xl border border-gray-border mb-10 text-center animate-fade-in-up animate-delay-200">
        <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-4">
          Brief Financial Health Note:
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          {financialNote}
        </p>
      </div>

      {/* Main Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-300">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Total Expenses
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeTotalExpenses.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-400">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Total Income
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeTotalIncome.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-500">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Net Balance
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeNetBalance.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-600">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Net Worth
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeNetWorth.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-700">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Monthly Budget
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeBudget.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-800">
          <h3 className="text-lg font-semibold text-gray-text-tertiary mb-2">
            Retirement Savings
          </h3>
          <p className="text-4xl font-bold gradient-text">
            Rp {safeRetirementSavings.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-gray-card-bg rounded-xl p-6 shadow-md flex flex-col justify-between min-h-[150px] border border-gray-border transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg animate-fade-in-up animate-delay-900">
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
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10 mb-8 animate-fade-in-up animate-delay-1000">
            <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6 text-center">
              Monthly Income & Expense Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDashArray="3 3" stroke="#555" />
                <XAxis dataKey="name" stroke="#BBB" />
                <YAxis stroke="#BBB" formatter={formatRpCurrency} /> {/* Apply formatter to YAxis */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2C3E50", // Direct color from Tailwind's gray-tooltip-bg
                    border: "1px solid #4F5D73", // Direct color from Tailwind's gray-tooltip-border
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#FFFFFF" }} // Direct color from Tailwind's white-default
                  labelStyle={{ color: "#9CA3AF" }} // Direct color from Tailwind's gray-tooltip-label
                  formatter={formatRpCurrency}
                />
                <Legend
                  wrapperStyle={{
                    color: "#9CA3AF", // Direct color from Tailwind's gray-legend
                    paddingTop: "10px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Income" // Data key for Income (English)
                  stroke="#2ECC71" // Direct color from Tailwind's green-accent-2
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  connectNulls={true}
                />
                <Line
                  type="monotone"
                  dataKey="Expenses" // Data key for Expenses (English)
                  stroke="#FF6B6B" // Direct color from Tailwind's red-primary
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category-wise Expense Bar Chart */}
          <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border mt-10 animate-fade-in-up animate-delay-1100">
            <h3 className="text-2xl font-semibold text-gray-text-tertiary mb-6 text-center">
              Expenses by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={categoryExpenseData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDashArray="3 3" stroke="#555" />
                <XAxis dataKey="name" stroke="#BBB" />
                <YAxis stroke="#BBB" formatter={formatRpCurrency} /> {/* Apply formatter to YAxis */}
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
                  wrapperStyle={{
                    color: "#9CA3AF",
                    paddingTop: "10px",
                  }}
                />
                <Bar
                  dataKey="Expenses" // Data key for Expenses (English)
                  fill="#FF6B6B" // Direct color from Tailwind's red-primary
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 mt-20 animate-fade-in-up animate-delay-1000">
          Charts are loading or data is insufficient.
        </div>
      )}
    </section>
  );
}

export default DashboardPage;