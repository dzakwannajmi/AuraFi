import React, { useState, useEffect } from "react";
import { currencies } from "../utils/currencyUtils"; // Import from utility file

const InvestmentForm = ({ onAddInvestment, showMessage }) => {
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("");
  const [sector, setSector] = useState("");
  const [broker, setBroker] = useState("");
  const [currency, setCurrency] = useState("IDR"); // Default to IDR
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState("Rp"); // New state for currency symbol

  // Update currency symbol when currency dropdown changes
  useEffect(() => {
    const currentCurrency = currencies.find((curr) => curr.code === currency);
    if (currentCurrency) {
      setSelectedCurrencySymbol(currentCurrency.symbol);
    } else {
      setSelectedCurrencySymbol(""); // Fallback if not found
    }
  }, [currency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !assetName ||
      !assetType ||
      !sector ||
      !broker ||
      !currency ||
      isNaN(parseFloat(quantity)) ||
      isNaN(parseFloat(buyPrice)) ||
      !buyDate ||
      parseFloat(quantity) <= 0 ||
      parseFloat(buyPrice) <= 0
    ) {
      showMessage("Please fill in all fields with valid values.", "error");
      return;
    }

    onAddInvestment({
      id: Date.now(), // Simple unique ID
      assetName,
      assetType,
      sector,
      broker,
      currency,
      quantity: parseFloat(quantity),
      buyPrice: parseFloat(buyPrice),
      currentPrice: 0, // Will be updated by API
      buyDate,
      currentValueInIDR: 0, // Initialize for later conversion
    });

    // Clear form
    setAssetName("");
    setAssetType("");
    setSector("");
    setBroker("");
    setCurrency("IDR");
    setQuantity("");
    setBuyPrice("");
    setBuyDate("");
    showMessage("Investment added successfully! Updating prices...", "success");
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6 text-gray-text-tertiary">
        Add New Investment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label
            htmlFor="assetName"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Asset Name
          </label>
          <input
            type="text"
            id="assetName"
            className="input-field"
            placeholder="e.g., Bitcoin (BTC)"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="assetType"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Asset Type
          </label>
          <select
            id="assetType"
            className="input-field"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="">Select Crypto Asset Type</option>
            <option value="Bitcoin">Bitcoin (BTC)</option>
            <option value="Ethereum">Ethereum (ETH)</option>
            <option value="Ripple">Ripple (XRP)</option>
            <option value="Litecoin">Litecoin (LTC)</option>
            <option value="Cardano">Cardano (ADA)</option>
            <option value="Solana">Solana (SOL)</option>
            <option value="Dogecoin">Dogecoin (DOGE)</option>
            <option value="Stablecoin">Stablecoin (USDT, USDC, BUSD)</option>
            <option value="NFT">NFT (Non-Fungible Token)</option>
            <option value="Lainnya">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sector"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Crypto Category
          </label>
          <input
            type="text"
            id="sector"
            className="input-field"
            placeholder="e.g., DeFi, GameFi, Layer 1"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="broker"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Exchange/Platform
          </label>
          <input
            type="text"
            id="broker"
            className="input-field"
            placeholder="e.g., Binance, Indodax, Metamask"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Purchase Currency
          </label>
          <select
            id="currency"
            className="input-field"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="input-field"
            placeholder="e.g., 0.05 (for BTC)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="buyPrice"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Buy Price per Unit ({selectedCurrencySymbol})
          </label>
          <input
            type="number"
            id="buyPrice"
            className="input-field"
            placeholder="e.g., 150000000"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="buyDate"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Purchase Date
          </label>
          <input
            type="date"
            id="buyDate"
            className="input-field"
            value={buyDate}
            onChange={(e) => setBuyDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary mt-6 w-full md:col-span-2">
          Add Investment
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
