// HopeBridge_frontend/src/hooks/usePortfolio.jsx
import { useState, useEffect, useCallback } from "react";
import { Principal } from "@dfinity/principal"; // Pastikan Anda menginstal @dfinity/principal
import { fetchExchangeRates, convertCurrency } from "../utils/currencyUtils";

// Asumsi objek canister HopeBridge_backend tersedia secara global
// Pastikan dfx generate sudah dijalankan setelah perubahan backend
const backendCanister = window.canister.HopeBridge_backend; // Ganti dengan nama canister backend Anda

// Mapping nama aset ke ID CoinGecko (digunakan untuk fetching harga)
const cryptoIdMap = {
  Bitcoin: "bitcoin",
  Ethereum: "ethereum",
  Ripple: "ripple", // XRP
  Litecoin: "litecoin",
  Cardano: "cardano",
  Solana: "solana",
  Dogecoin: "dogecoin",
  Stablecoin: "tether", // Contoh: menggunakan Tether
  NFT: null, // NFT tidak memiliki harga pasar tunggal
};

const usePortfolio = () => {
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);

  // Fungsi untuk menampilkan pesan (bisa diganti dengan notifikasi UI yang sebenarnya)
  // Ini hanya placeholder untuk tujuan hook, notifikasi sebenarnya di PortfolioPage
  const showMessage = (text, type) => {
    console.log(`[usePortfolio Message - ${type}]: ${text}`);
    // Anda bisa mengintegrasikan dengan context notifikasi global jika ada
  };

  // 1. Fetch data portofolio dari backend
  const fetchPortfolioFromBackend = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await backendCanister.getMyPortfolio();
      console.log("Fetched portfolio from backend:", result);
      setInvestments(result);
    } catch (err) {
      console.error("Failed to fetch portfolio from backend:", err);
      setError("Failed to load portfolio data.");
      showMessage("Failed to load portfolio data.", "error");
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback untuk mencegah re-render yang tidak perlu

  // 2. Fetch harga crypto dan konversi (mirip dengan yang ada di PortfolioPage)
  const fetchCryptoPricesAndConvert = useCallback(
    async (currentInvestments) => {
      setIsLoading(true);
      setError(null);

      // Pastikan exchange rates sudah dimuat
      if (!exchangeRates) {
        const rates = await fetchExchangeRates();
        if (rates) {
          setExchangeRates(rates);
        } else {
          showMessage(
            "Failed to fetch exchange rates for price update.",
            "error"
          );
          setIsLoading(false);
          return;
        }
      }

      const uniqueCryptoIds = new Set();
      const uniqueVsCurrencies = new Set();
      uniqueVsCurrencies.add("idr"); // Selalu minta harga dalam IDR

      currentInvestments.forEach((inv) => {
        const cryptoId = cryptoIdMap[inv.assetType];
        if (cryptoId && cryptoId !== "null") {
          uniqueCryptoIds.add(cryptoId);
        }
        uniqueVsCurrencies.add(inv.currency.toLowerCase());
      });

      const ids = Array.from(uniqueCryptoIds).join(",");
      const vsCurrencies = Array.from(uniqueVsCurrencies).join(",");

      if (ids.length === 0) {
        setIsLoading(false);
        showMessage("No crypto assets to update prices for.", "info");
        return;
      }

      const coingeckoApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

      try {
        const apiKey = ""; // API Key disediakan oleh Canvas
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
          console.error("LLM proxy response not OK:", response);
          throw new Error(
            `Error from LLM proxy: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        const data = JSON.parse(result.candidates[0].content.parts[0].text);

        const updatedInvestments = currentInvestments.map((inv) => {
          const cryptoId = cryptoIdMap[inv.assetType];
          const targetCurrency = inv.currency.toLowerCase();
          let newCurrentPrice = inv.buyPrice; // Default to buy price
          let newCurrentValueInIDR = inv.buyPrice * inv.quantity; // Default to buy value in its currency

          if (cryptoId && data[cryptoId]) {
            if (data[cryptoId][targetCurrency]) {
              newCurrentPrice = data[cryptoId][targetCurrency];
            } else if (data[cryptoId]["idr"] && exchangeRates) {
              newCurrentPrice = convertCurrency(
                data[cryptoId]["idr"],
                "IDR",
                inv.currency,
                exchangeRates
              );
              console.warn(
                `Price for ${inv.assetName} not found in ${inv.currency}. Converted from IDR.`
              );
            } else {
              console.warn(
                `No real-time price for ${inv.assetName} in ${inv.currency} or IDR. Using buy price.`
              );
            }
          } else if (inv.assetType === "NFT") {
            newCurrentPrice = 0;
          }

          if (exchangeRates) {
            newCurrentValueInIDR = convertCurrency(
              newCurrentPrice * inv.quantity,
              inv.currency,
              "IDR",
              exchangeRates
            );
          } else {
            newCurrentValueInIDR = newCurrentPrice * inv.quantity; // Fallback
          }

          return {
            ...inv,
            currentPrice: newCurrentPrice,
            currentValueInIDR: newCurrentValueInIDR,
          };
        });

        // Update backend with new prices
        for (const updatedInv of updatedInvestments) {
          // Panggil backend canister untuk update harga per investasi
          // Pastikan backendCanister.updateInvestmentPrice mengembalikan Opt<Investment>
          // dan parameter id adalah Nat, price dan value adalah Float
          const updateResult = await backendCanister.updateInvestmentPrice(
            updatedInv.id,
            updatedInv.currentPrice,
            updatedInv.currentValueInIDR
          );
          if (updateResult === null) {
            console.error(
              `Failed to update price for investment ID: ${updatedInv.id} in backend.`
            );
          }
        }

        setInvestments(updatedInvestments); // Update frontend state
        showMessage("Crypto prices and values updated!", "success");
      } catch (err) {
        console.error("Failed to fetch or update crypto prices:", err);
        setError("Failed to update crypto prices.");
        showMessage(
          "Failed to update crypto prices. Please try again.",
          "error"
        );
        // Fallback in frontend state if API update fails
        setInvestments((prevInvestments) =>
          prevInvestments.map((inv) => {
            if (inv.currentPrice === 0) {
              // If it's still 0, implies API failed to get it
              return {
                ...inv,
                currentPrice: inv.buyPrice,
                currentValueInIDR: inv.buyPrice * inv.quantity,
              };
            }
            return inv;
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [backendCanister, exchangeRates]
  ); // Depend on backendCanister and exchangeRates

  // 3. Fungsi untuk menambah investasi
  const addInvestment = useCallback(
    async (newInvestmentData) => {
      setIsLoading(true);
      setError(null);
      try {
        // Hitung currentValueInIDR awal
        let initialCurrentValueInIDR =
          newInvestmentData.buyPrice * newInvestmentData.quantity;
        if (exchangeRates) {
          initialCurrentValueInIDR = convertCurrency(
            newInvestmentData.buyPrice * newInvestmentData.quantity,
            newInvestmentData.currency,
            "IDR",
            exchangeRates
          );
        }

        // Panggil backend canister untuk menambah investasi
        const addedInvestment = await backendCanister.addInvestment(
          newInvestmentData.assetName,
          newInvestmentData.assetType,
          newInvestmentData.sector,
          newInvestmentData.broker,
          newInvestmentData.currency,
          newInvestmentData.quantity,
          newInvestmentData.buyPrice,
          newInvestmentData.buyDate,
          initialCurrentValueInIDR // Pass initial converted value
        );

        // Setelah berhasil menambah, fetch ulang portofolio untuk mendapatkan state terbaru
        // Atau langsung tambahkan ke state jika backend mengembalikan objek lengkap
        // Jika backend mengembalikan Investment lengkap, kita bisa langsung update state
        setInvestments((prev) => [...prev, addedInvestment]);
        showMessage("Investment added successfully!", "success");
        fetchCryptoPricesAndConvert(
          Array.from(investments).concat(addedInvestment)
        ); // Perbarui harga setelah menambah
      } catch (err) {
        console.error("Failed to add investment to backend:", err);
        setError("Failed to add investment.");
        showMessage("Failed to add investment.", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [backendCanister, exchangeRates, investments, fetchCryptoPricesAndConvert]
  );

  // 4. Fungsi untuk menghapus investasi
  const deleteInvestment = useCallback(
    async (id) => {
      setIsLoading(true);
      setError(null);
      try {
        const success = await backendCanister.deleteInvestment(id);
        if (success) {
          setInvestments((prev) => prev.filter((inv) => inv.id !== id));
          showMessage("Investment deleted successfully.", "info");
        } else {
          setError("Failed to delete investment from backend.");
          showMessage("Failed to delete investment.", "error");
        }
      } catch (err) {
        console.error("Failed to delete investment from backend:", err);
        setError("Failed to delete investment.");
        showMessage("Failed to delete investment.", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [backendCanister]
  );

  // Initial load: Fetch portfolio and exchange rates
  useEffect(() => {
    const loadInitialData = async () => {
      // Fetch exchange rates first
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      } else {
        showMessage("Failed to load exchange rates on startup.", "error");
      }

      // Fetch portfolio from backend
      await fetchPortfolioFromBackend();
    };
    loadInitialData();
  }, [fetchPortfolioFromBackend]); // Depend on fetchPortfolioFromBackend

  // Fetch prices after investments or exchange rates change
  useEffect(() => {
    if (investments.length > 0 && exchangeRates) {
      fetchCryptoPricesAndConvert(investments);
    } else if (investments.length === 0 && !isLoading) {
      // If no investments, but loaded, ensure no infinite loop
      // And if rates are loaded but no investments, don't show "No crypto assets" message constantly
      showMessage(
        "No investments to display. Add your first investment!",
        "info"
      );
    }
  }, [investments, exchangeRates, fetchCryptoPricesAndConvert, isLoading]); // Depend on investments, exchangeRates, and fetchCryptoPricesAndConvert

  // Hitung total nilai portofolio dalam IDR untuk ringkasan di UI
  const totalPortfolioValueIDR = investments.reduce(
    (sum, inv) => sum + (inv.currentValueInIDR || 0),
    0
  );

  // Perhitungan total nilai beli dalam IDR (memerlukan konversi saat beli)
  const totalBuyValueIDR = investments.reduce((sum, inv) => {
    // Jika rates tersedia, konversi harga beli ke IDR. Jika tidak, gunakan nilai yang ada (belum tentu IDR)
    if (exchangeRates) {
      return (
        sum +
        convertCurrency(
          inv.buyPrice * inv.quantity,
          inv.currency,
          "IDR",
          exchangeRates
        )
      );
    }
    return sum + inv.buyPrice * inv.quantity; // Fallback jika rates belum dimuat
  }, 0);

  const totalProfitLossIDR = totalPortfolioValueIDR - totalBuyValueIDR;
  const overallPercentageChangeIDR =
    totalBuyValueIDR > 0 ? (totalProfitLossIDR / totalBuyValueIDR) * 100 : 0;

  return {
    investments,
    isLoading,
    error,
    addInvestment,
    deleteInvestment,
    refreshPrices: () => fetchCryptoPricesAndConvert(investments), // Fungsi refresh yang memicu update harga
    totalPortfolioValueIDR,
    totalProfitLossIDR,
    overallPercentageChangeIDR,
    // Kita tidak mengembalikan showMessage karena itu seharusnya dikelola oleh komponen yang menggunakannya (misal PortfolioPage)
    // namun untuk debugging di hook, kita bisa biarkan console.log di dalamnya.
  };
};

export default usePortfolio;
