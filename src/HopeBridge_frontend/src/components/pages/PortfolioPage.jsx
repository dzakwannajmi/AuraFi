import React, { useState, useEffect } from "react";
import InvestmentForm from "../investments/InvestmentForm";
import PortfolioList from "../investments/PortfolioList";

// Mapping nama aset ke ID CoinGecko (penting untuk fetching harga)
const cryptoIdMap = {
  Bitcoin: "bitcoin",
  Ethereum: "ethereum",
  Ripple: "ripple", // XRP
  Litecoin: "litecoin",
  Cardano: "cardano",
  Solana: "solana",
  Dogecoin: "dogecoin",
  Stablecoin: "tether", // Contoh: menggunakan Tether sebagai representasi stablecoin
  NFT: null, // NFT tidak memiliki harga pasar tunggal seperti koin
};

const PortfolioPage = () => {
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fungsi untuk menampilkan pesan (pengganti alert)
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 3000);
  };

  // Fungsi untuk mengambil harga cryptocurrency dari CoinGecko API
  const fetchCryptoPrices = async () => {
    setIsLoading(true);

    const uniqueCryptoTypes = new Set(investments.map((inv) => inv.assetType));
    const idsToFetch = Array.from(uniqueCryptoTypes)
      .map((type) => cryptoIdMap[type])
      .filter((id) => id && id !== "null"); // Filter out null for NFT or unknown types

    if (idsToFetch.length === 0) {
      setIsLoading(false);
      showMessage(
        "Tidak ada aset kripto yang dapat diperbarui harganya.",
        "info"
      );
      return;
    }

    const ids = idsToFetch.join(",");
    const vsCurrencies = "idr";
    const coingeckoApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

    try {
      // Menggunakan LLM sebagai proxy untuk melakukan fetch
      const apiKey = ""; // Disediakan oleh Canvas
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const prompt = `Fetch the following URL and return the JSON response:\n${coingeckoApiUrl}`;

      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Respons LLM proxy tidak OK:", response);
        throw new Error(
          `Kesalahan dari LLM proxy: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      let data;
      try {
        data = JSON.parse(result.candidates[0].content.parts[0].text);
      } catch (parseError) {
        console.error(
          "Gagal mengurai respons LLM sebagai JSON:",
          result.candidates[0].content.parts[0].text,
          parseError
        );
        throw new Error("Gagal mengurai respons API dari LLM proxy.");
      }

      setInvestments((prevInvestments) => {
        return prevInvestments.map((inv) => {
          const cryptoId = cryptoIdMap[inv.assetType];
          if (cryptoId && data[cryptoId] && data[cryptoId][vsCurrencies]) {
            return { ...inv, currentPrice: data[cryptoId][vsCurrencies] };
          } else if (inv.assetType === "NFT") {
            return { ...inv, currentPrice: 0 }; // NFT price remains 0
          } else {
            // Fallback to buyPrice if current price not found
            console.warn(
              `Harga tidak ditemukan untuk ${inv.assetName} (${inv.assetType}). Menggunakan harga beli sebagai harga saat ini.`
            );
            return { ...inv, currentPrice: inv.buyPrice };
          }
        });
      });
      showMessage("Harga kripto berhasil diperbarui!", "success");
    } catch (error) {
      console.error("Gagal mengambil harga kripto:", error);
      showMessage(
        "Gagal memperbarui harga kripto. Ini mungkin masalah koneksi, batasan API rate limit, atau masalah dengan proxy LLM. Coba lagi nanti.",
        "error"
      );
      // Fallback for all investments if fetching fails
      setInvestments((prevInvestments) => {
        return prevInvestments.map((inv) => {
          if (inv.currentPrice === 0) {
            // Only fallback if currentPrice hasn't been set
            return { ...inv, currentPrice: inv.buyPrice };
          }
          return inv;
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load investments from localStorage on component mount
  useEffect(() => {
    const storedInvestments = localStorage.getItem("cryptoInvestments");
    if (storedInvestments) {
      setInvestments(JSON.parse(storedInvestments));
    }
    fetchCryptoPrices(); // Fetch prices on initial load
  }, []);

  // Save investments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cryptoInvestments", JSON.stringify(investments));
  }, [investments]);

  const handleAddInvestment = (newInvestment) => {
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
    fetchCryptoPrices(); // Refresh prices after adding
  };

  const handleDeleteInvestment = (id) => {
    setInvestments((prevInvestments) =>
      prevInvestments.filter((inv) => inv.id !== id)
    );
    showMessage("Investasi berhasil dihapus.", "info");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-white-default">
        Portofolio Investasi Saya
      </h1>

      {message.text && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white-default z-50 ${
            message.type === "success"
              ? "bg-green-primary"
              : message.type === "error"
              ? "bg-red-primary"
              : "bg-purple-recharts"
          }`}
        >
          {message.text}
        </div>
      )}

      <InvestmentForm
        onAddInvestment={handleAddInvestment}
        showMessage={showMessage}
      />
      <PortfolioList
        investments={investments}
        onDeleteInvestment={handleDeleteInvestment}
        onRefreshPrices={fetchCryptoPrices}
        showMessage={showMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PortfolioPage;
