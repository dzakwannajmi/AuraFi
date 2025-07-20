import React, { useRef, useEffect } from "react";

// Mapping nama aset ke ID CoinGecko
const cryptoIdMap = {
  Bitcoin: "bitcoin",
  Ethereum: "ethereum",
  Ripple: "ripple", // XRP
  Litecoin: "litecoin",
  Cardano: "cardano",
  Solana: "solana",
  Dogecoin: "dogecoin",
  Stablecoin: "tether", // Contoh: menggunakan Tether
  NFT: null, // NFT tidak memiliki harga pasar tunggal seperti koin
};

const PortfolioList = ({
  investments,
  onDeleteInvestment,
  onRefreshPrices,
  showMessage,
  isLoading,
}) => {
  const canvasRef = useRef(null);

  // Fungsi untuk menggambar grafik portofolio menggunakan Canvas
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
        "Tidak ada data untuk visualisasi.",
        canvas.width / 2,
        canvas.height / 2
      );
      return;
    }

    const assetValues = investments.map(
      (inv) => inv.quantity * inv.currentPrice
    );
    const assetNames = investments.map((inv) => inv.assetName);
    const totalValue = assetValues.reduce((sum, val) => sum + val, 0);

    if (totalValue === 0) {
      ctx.fillStyle = "var(--color-gray-medium)";
      ctx.font = "16px Poppins";
      ctx.textAlign = "center";
      ctx.fillText(
        "Total nilai portofolio nol.",
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
        `Rp ${value.toLocaleString("id-ID")}`,
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

  let totalPortfolioValue = 0;
  let totalProfitLoss = 0;
  let totalBuyValue = 0;

  investments.forEach((inv) => {
    const currentValue = inv.quantity * inv.currentPrice;
    const buyValue = inv.quantity * inv.buyPrice;
    const profitLoss = currentValue - buyValue;

    totalPortfolioValue += currentValue;
    totalProfitLoss += profitLoss;
    totalBuyValue += buyValue;
  });

  const overallPercentageChange =
    totalBuyValue > 0 ? (totalProfitLoss / totalBuyValue) * 100 : 0;

  return (
    <>
      {/* Ringkasan Portofolio */}
      <div className="card grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-sm text-gray-light">Total Nilai Portofolio</p>
          <p
            id="totalPortfolioValue"
            className="text-3xl font-bold text-white-default mt-1"
          >
            Rp {totalPortfolioValue.toLocaleString("id-ID")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-light">Total Keuntungan/Kerugian</p>
          <p
            id="totalProfitLoss"
            className={`text-3xl font-bold mt-1 ${
              totalProfitLoss >= 0 ? "profit" : "loss"
            }`}
          >
            Rp {totalProfitLoss.toLocaleString("id-ID")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-light">Persentase Perubahan</p>
          <p
            id="percentageChange"
            className={`text-3xl font-bold mt-1 ${
              overallPercentageChange >= 0 ? "profit" : "loss"
            }`}
          >
            {overallPercentageChange.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Daftar Investasi */}
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6 text-gray-text-tertiary">
          Daftar Investasi Anda
        </h2>
        <div className="flex justify-end mb-4">
          <button
            onClick={onRefreshPrices}
            className="btn-secondary flex items-center"
            disabled={isLoading}
          >
            Perbarui Harga
            {isLoading && <span className="loading-spinner"></span>}
          </button>
        </div>
        <div id="investmentListContainer" className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Aset</th>
                <th>Jenis</th>
                <th>Kategori</th>
                <th>Platform</th>
                <th>Mata Uang</th>
                <th>Jumlah</th>
                <th>Harga Beli</th>
                <th>Harga Saat Ini</th>
                <th>Nilai Sekarang</th>
                <th>P/L (Rp)</th>
                <th>P/L (%)</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="investmentTableBody">
              {investments.length === 0 ? (
                <tr>
                  <td
                    colSpan="12"
                    className="text-center text-gray-medium py-4"
                  >
                    Belum ada investasi ditambahkan.
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
                      <td>{inv.quantity.toLocaleString("id-ID")}</td>
                      <td>Rp {inv.buyPrice.toLocaleString("id-ID")}</td>
                      <td>Rp {inv.currentPrice.toLocaleString("id-ID")}</td>
                      <td>Rp {currentValue.toLocaleString("id-ID")}</td>
                      <td className={profitLoss >= 0 ? "profit" : "loss"}>
                        Rp {profitLoss.toLocaleString("id-ID")}
                      </td>
                      <td className={profitLoss >= 0 ? "profit" : "loss"}>
                        {profitLossPercentage.toFixed(2)}%
                      </td>
                      <td>
                        <button
                          onClick={() => onDeleteInvestment(inv.id)}
                          className="btn-secondary text-red-primary hover:bg-red-secondary"
                        >
                          Hapus
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

      {/* Visualisasi Portofolio (Canvas) */}
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6 text-gray-text-tertiary">
          Distribusi Portofolio
        </h2>
        <canvas ref={canvasRef} id="portfolioChart"></canvas>
        <p className="text-sm text-gray-text-secondary text-center mt-4">
          Visualisasi ini menunjukkan proporsi nilai setiap aset dalam
          portofolio Anda.
        </p>
      </div>
    </>
  );
};

export default PortfolioList;
