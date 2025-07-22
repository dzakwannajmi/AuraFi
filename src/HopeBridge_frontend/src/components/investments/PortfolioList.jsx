import React, { useRef, useEffect } from "react";
import { currencies, formatCurrency } from "../utils/currencyUtils.js"; // Import from utility file

// Mapping asset names to CoinGecko IDs
const cryptoIdMap = {
  Bitcoin: "bitcoin",
  Ethereum: "ethereum",
  Ripple: "ripple", // XRP
  Litecoin: "litecoin",
  Cardano: "cardano",
  Solana: "solana",
  Dogecoin: "dogecoin",
  Stablecoin: "tether", // Example: using Tether
  NFT: null, // NFTs typically don't have a single market price like coins
};

const PortfolioList = ({
  investments,
  onDeleteInvestment,
  onRefreshPrices,
  showMessage,
  isLoading,
  // New props for calculated totals in IDR from PortfolioPage
  totalPortfolioValueIDR,
  totalProfitLossIDR,
  overallPercentageChangeIDR,
}) => {
  const canvasRef = useRef(null);

  // Function to draw the portfolio chart using Canvas
  const drawPortfolioChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas dimensions responsively
    const parentWidth = canvas.parentElement.clientWidth;
    canvas.width = parentWidth > 600 ? 600 : parentWidth;
    canvas.height = 300;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    if (investments.length === 0) {
      ctx.fillStyle = "var(--color-gray-medium)";
      ctx.font = "16px Poppins";
      ctx.textAlign = "center";
      ctx.fillText(
        "No data for visualization.",
        canvas.width / 2,
        canvas.height / 2
      );
      return;
    }

    // Use current value in purchase currency for chart bars
    const assetValues = investments.map(
      (inv) => inv.quantity * inv.currentPrice
    );
    const assetNames = investments.map((inv) => inv.assetName);
    const totalValueChart = assetValues.reduce((sum, val) => sum + val, 0); // Total value for chart scaling

    if (totalValueChart === 0) {
      // Check against chart specific total
      ctx.fillStyle = "var(--color-gray-medium)";
      ctx.font = "16px Poppins";
      ctx.textAlign = "center";
      ctx.fillText(
        "Total portfolio value is zero.",
        canvas.width / 2,
        canvas.height / 2
      );
      return;
    }

    const barWidth = (canvas.width - 60) / investments.length;
    const maxBarHeight = canvas.height - 80;

    const maxValue = Math.max(...assetValues);
    const scale = maxBarHeight / maxValue;

    const chartColors = [
      "var(--color-green-accent-1)",
      "var(--color-green-accent-2)",
      "var(--color-green-accent-3)",
      "var(--color-green-accent-4)",
      "var(--color-green-accent-5)",
      "var(--color-green-primary)",
      "var(--color-green-secondary)",
    ];

    assetValues.forEach((value, index) => {
      const barHeight = value * scale;
      const x = 30 + index * barWidth;
      const y = canvas.height - 40 - barHeight;

      ctx.fillStyle = chartColors[index % chartColors.length];
      ctx.fillRect(x, y, barWidth - 10, barHeight);

      ctx.fillStyle = "var(--color-white-default)";
      ctx.font = "12px Poppins";
      ctx.textAlign = "center";
      ctx.fillText(
        formatCurrency(value, investments[index].currency), // Use formatCurrency
        x + (barWidth - 10) / 2,
        y - 5
      );

      ctx.fillText(
        assetNames[index],
        x + (barWidth - 10) / 2,
        canvas.height - 20
      );
    });
  };

  useEffect(() => {
    drawPortfolioChart();
    window.addEventListener("resize", drawPortfolioChart);
    return () => window.removeEventListener("resize", drawPortfolioChart);
  }, [investments]); // Redraw chart when investments change

  // Total values are now passed as props from PortfolioPage
  // Removed local calculation: totalPortfolioValue, totalProfitLoss, totalBuyValue, overallPercentageChange

  return (
    <>
      {/* Portfolio Summary */}
      <div className="card grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-sm text-gray-light">Total Portfolio Value</p>
          <p
            id="totalPortfolioValue"
            className="text-3xl font-bold text-white-default mt-1"
          >
            {formatCurrency(totalPortfolioValueIDR, "IDR")}{" "}
            {/* Use formatCurrency for summary */}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-light">Total Profit/Loss</p>
          <p
            id="totalProfitLoss"
            className={`text-3xl font-bold mt-1 ${
              totalProfitLossIDR >= 0 ? "profit" : "loss"
            }`}
          >
            {formatCurrency(totalProfitLossIDR, "IDR")}{" "}
            {/* Use formatCurrency for summary */}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-light">Percentage Change</p>
          <p
            id="percentageChange"
            className={`text-3xl font-bold mt-1 ${
              overallPercentageChangeIDR >= 0 ? "profit" : "loss"
            }`}
          >
            {overallPercentageChangeIDR.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Investment List */}
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6 text-gray-text-tertiary">
          Your Investments
        </h2>
        <div className="flex justify-end mb-4">
          <button
            onClick={onRefreshPrices}
            className="btn-secondary flex items-center"
            disabled={isLoading}
          >
            Refresh Prices
            {isLoading && <span className="loading-spinner"></span>}
          </button>
        </div>
        <div id="investmentListContainer" className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Category</th>
                <th>Platform</th>
                <th>Currency</th>
                <th>Quantity</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>Current Value</th>
                <th>P/L</th>
                <th>P/L (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="investmentTableBody">
              {investments.length === 0 ? (
                <tr>
                  <td
                    colSpan="12"
                    className="text-center text-gray-medium py-4"
                  >
                    No investments added yet.
                  </td>
                </tr>
              ) : (
                investments.map((inv) => {
                  const currentValue = inv.quantity * inv.currentPrice;
                  const buyValue = inv.quantity * inv.buyPrice;
                  const profitLoss = currentValue - buyValue;
                  const profitLossPercentage =
                    buyValue > 0 ? (profitLoss / buyValue) * 100 : 0;
                  return (
                    <tr key={inv.id}>
                      <td>{inv.assetName}</td>
                      <td>{inv.assetType}</td>
                      <td>{inv.sector}</td>
                      <td>{inv.broker}</td>
                      <td>{inv.currency}</td>
                      <td>{inv.quantity.toLocaleString("en-US")}</td>
                      <td>{formatCurrency(inv.buyPrice, inv.currency)}</td>
                      <td>{formatCurrency(inv.currentPrice, inv.currency)}</td>
                      <td>{formatCurrency(currentValue, inv.currency)}</td>
                      <td className={profitLoss >= 0 ? "profit" : "loss"}>
                        {formatCurrency(profitLoss, inv.currency)}
                      </td>
                      <td className={profitLoss >= 0 ? "profit" : "loss"}>
                        {profitLossPercentage.toFixed(2)}%
                      </td>
                      <td>
                        <button
                          onClick={() => onDeleteInvestment(inv.id)}
                          className="btn-secondary text-red-primary hover:bg-red-secondary"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portfolio Visualization (Canvas) */}
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6 text-gray-text-tertiary">
          Portfolio Distribution
        </h2>
        <canvas ref={canvasRef} id="portfolioChart"></canvas>
        <p className="text-sm text-gray-text-secondary text-center mt-4">
          This visualization shows the proportion of each asset's value in your
          portfolio.
        </p>
      </div>
    </>
  );
};

export default PortfolioList;
