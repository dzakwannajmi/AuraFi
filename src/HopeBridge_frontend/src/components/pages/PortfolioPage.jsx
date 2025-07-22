import React, { useState, useEffect } from "react";
import InvestmentForm from "../investments/InvestmentForm"; // Ensure this import path is correct
import PortfolioList from "../investments/PortfolioList"; // Ensure this import path is correct
import {
  currencies,
  formatCurrency,
  fetchExchangeRates,
  convertCurrency,
} from "../utils/currencyUtils.js"; // Import from utility file

// Mapping asset names to CoinGecko IDs (essential for fetching prices)
// Extend this list if you want to track more crypto assets.
const cryptoIdMap = {
  Bitcoin: "bitcoin",
  Ethereum: "ethereum",
  Ripple: "ripple", // XRP
  Litecoin: "litecoin",
  Cardano: "cardano",
  Solana: "solana",
  Dogecoin: "dogecoin",
  Stablecoin: "tether", // Example: using Tether as a stablecoin representation
  NFT: null, // NFTs typically don't have a single market price easily accessible via this API
};

const PortfolioPage = () => {
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [exchangeRates, setExchangeRates] = useState(null); // New state for exchange rates

  // Function to display notification messages (replaces alert)
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" }); // Clear message after 3 seconds
    }, 3000);
  };

  // Function to fetch cryptocurrency prices from CoinGecko API
  const fetchCryptoPrices = async () => {
    setIsLoading(true); // Show loading indicator

    // Fetch exchange rates first if not already loaded
    if (!exchangeRates) {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      } else {
        showMessage("Failed to fetch exchange rates.", "error");
        setIsLoading(false);
        return;
      }
    }

    // Collect all unique coin IDs and unique purchase currencies from the portfolio
    const uniqueCryptoIds = new Set();
    const uniqueCurrencies = new Set(); // Includes "idr" implicitly from exchange rates fetch if needed

    // Always include 'idr' as a target currency for CoinGecko API if we plan to convert to it
    uniqueCurrencies.add("idr");

    investments.forEach((inv) => {
      const cryptoId = cryptoIdMap[inv.assetType];
      if (cryptoId && cryptoId !== "null") {
        uniqueCryptoIds.add(cryptoId);
      }
      uniqueCurrencies.add(inv.currency.toLowerCase()); // Add purchase currencies to the list
    });

    const ids = Array.from(uniqueCryptoIds).join(",");
    const vsCurrencies = Array.from(uniqueCurrencies).join(","); // Fetch prices against all unique purchase currencies AND IDR

    if (ids.length === 0) {
      // Only check IDs, vsCurrencies might be just 'idr'
      setIsLoading(false);
      showMessage("No crypto assets to update prices for.", "info");
      return;
    }

    const coingeckoApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

    try {
      const apiKey = ""; // API Key will be automatically provided by the Canvas environment
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
      let data;
      try {
        data = JSON.parse(result.candidates[0].content.parts[0].text);
      } catch (parseError) {
        console.error(
          "Failed to parse LLM response as JSON:",
          result.candidates[0].content.parts[0].text,
          parseError
        );
        throw new Error("Failed to parse API response from LLM proxy.");
      }

      // Update the current price of each investment in state
      setInvestments((prevInvestments) => {
        return prevInvestments.map((inv) => {
          const cryptoId = cryptoIdMap[inv.assetType];
          const targetCurrency = inv.currency.toLowerCase(); // Purchase currency for this investment
          let newCurrentPrice = inv.currentPrice; // Default to old price if new not found
          let newCurrentValueInIDR = inv.currentValueInIDR; // Default to old IDR value

          // Try to get price in its own purchase currency first
          if (cryptoId && data[cryptoId] && data[cryptoId][targetCurrency]) {
            newCurrentPrice = data[cryptoId][targetCurrency];
          } else if (inv.assetType === "NFT") {
            newCurrentPrice = 0; // NFT price remains 0
          } else {
            // Fallback: If price not found in purchase currency, try IDR and convert
            if (
              cryptoId &&
              data[cryptoId] &&
              data[cryptoId]["idr"] &&
              exchangeRates
            ) {
              // Convert the IDR price of the crypto to the investment's purchase currency
              newCurrentPrice = convertCurrency(
                data[cryptoId]["idr"],
                "IDR",
                inv.currency,
                exchangeRates
              );
              console.warn(
                `Price for ${inv.assetName} (${inv.assetType}) not found in ${inv.currency}. Converted from IDR.`
              );
            } else {
              console.warn(
                `Price not found for ${inv.assetName} (${inv.assetType}) in ${inv.currency}. Using buy price as current price.`
              );
              newCurrentPrice = inv.buyPrice; // Final fallback to buy price
            }
          }

          // Calculate currentValueInIDR for summary totals
          if (exchangeRates) {
            newCurrentValueInIDR = convertCurrency(
              newCurrentPrice * inv.quantity,
              inv.currency,
              "IDR",
              exchangeRates
            );
          } else {
            newCurrentValueInIDR = newCurrentPrice * inv.quantity; // Fallback if rates not loaded
          }

          return {
            ...inv,
            currentPrice: newCurrentPrice,
            currentValueInIDR: newCurrentValueInIDR,
          };
        });
      });
      showMessage("Crypto prices updated successfully!", "success");
    } catch (error) {
      console.error("Failed to fetch crypto prices:", error);
      showMessage(
        "Failed to update crypto prices. This might be a connection issue, API rate limit, or LLM proxy problem. Please try again later.",
        "error"
      );
      setInvestments((prevInvestments) => {
        return prevInvestments.map((inv) => {
          if (inv.currentPrice === 0) {
            // Only apply fallback if currentPrice hasn't been set
            return {
              ...inv,
              currentPrice: inv.buyPrice,
              currentValueInIDR: inv.buyPrice * inv.quantity,
            }; // Fallback with value in purchase currency
          }
          return inv;
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Effect hook to load investments from localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      const rates = await fetchExchangeRates(); // Fetch rates on load
      if (rates) {
        setExchangeRates(rates);
      } else {
        showMessage("Failed to load exchange rates on startup.", "error");
      }

      const storedInvestments = localStorage.getItem("cryptoInvestments");
      if (storedInvestments) {
        setInvestments(JSON.parse(storedInvestments));
      }
      // fetchCryptoPrices() will be called by the useEffect watching 'investments'
    };
    loadData();
  }, []); // Empty dependency array means this effect runs once on mount

  // Effect hook to save investments to localStorage whenever 'investments' state changes
  useEffect(() => {
    localStorage.setItem("cryptoInvestments", JSON.stringify(investments));
    // Trigger price fetch whenever investments change (e.g., after add/delete)
    // Only fetch if there are investments and exchange rates are loaded
    if (investments.length > 0 && exchangeRates) {
      fetchCryptoPrices();
    } else if (investments.length > 0 && !exchangeRates) {
      // If investments exist but rates aren't loaded yet, try to fetch rates and then prices
      const loadRatesAndPrices = async () => {
        const rates = await fetchExchangeRates();
        if (rates) {
          setExchangeRates(rates);
          // After rates are loaded, re-calculate currentValueInIDR for existing investments
          setInvestments((prevInvestments) =>
            prevInvestments.map((inv) => ({
              ...inv,
              currentValueInIDR: convertCurrency(
                inv.currentPrice * inv.quantity,
                inv.currency,
                "IDR",
                rates
              ),
            }))
          );
          fetchCryptoPrices(); // Then fetch prices
        }
      };
      loadRatesAndPrices();
    }
  }, [investments, exchangeRates]); // This effect runs whenever 'investments' or 'exchangeRates' changes

  // Handler to add a new investment
  const handleAddInvestment = (newInvestment) => {
    // Add initial currentValueInIDR based on buy price if rates available
    if (exchangeRates) {
      newInvestment.currentValueInIDR = convertCurrency(
        newInvestment.buyPrice * newInvestment.quantity,
        newInvestment.currency,
        "IDR",
        exchangeRates
      );
    } else {
      newInvestment.currentValueInIDR =
        newInvestment.buyPrice * newInvestment.quantity; // Fallback for now, will update with fetch
    }
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
    // Price fetch will be triggered by the useEffect after state update
  };

  // Handler to delete an investment
  const handleDeleteInvestment = (id) => {
    setInvestments((prevInvestments) =>
      prevInvestments.filter((inv) => inv.id !== id)
    );
    showMessage("Investment deleted successfully.", "info");
  };

  // Calculate total portfolio values in IDR for summary
  const totalPortfolioValueIDR = investments.reduce(
    (sum, inv) => sum + (inv.currentValueInIDR || 0),
    0
  );
  const totalBuyValueIDR = investments.reduce((sum, inv) => {
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
    return sum + inv.buyPrice * inv.quantity; // Fallback if rates not loaded yet
  }, 0);
  const totalProfitLossIDR = totalPortfolioValueIDR - totalBuyValueIDR;
  const overallPercentageChangeIDR =
    totalBuyValueIDR > 0 ? (totalProfitLossIDR / totalBuyValueIDR) * 100 : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-primary">
        Crypto Portfolio Overview
      </h1>

      {/* Component to display notification messages */}
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

      {/* Investment Addition Form Component */}
      <InvestmentForm
        onAddInvestment={handleAddInvestment}
        showMessage={showMessage}
        currencies={currencies} // Pass currencies to form
      />

      {/* Portfolio List and Visualization Component */}
      <PortfolioList
        investments={investments}
        onDeleteInvestment={handleDeleteInvestment}
        onRefreshPrices={fetchCryptoPrices}
        showMessage={showMessage}
        isLoading={isLoading}
        // Pass totals and rates for consistent display
        totalPortfolioValueIDR={totalPortfolioValueIDR}
        totalProfitLossIDR={totalProfitLossIDR}
        overallPercentageChangeIDR={overallPercentageChangeIDR}
        formatCurrency={formatCurrency} // Pass formatCurrency to list
        currencies={currencies} // Pass currencies to list
      />
    </div>
  );
};

export default PortfolioPage;
