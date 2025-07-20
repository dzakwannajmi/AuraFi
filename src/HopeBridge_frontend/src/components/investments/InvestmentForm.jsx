import React, { useState } from "react";

// Daftar mata uang dunia (ISO 4217 Codes)
const currencies = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "KRW", name: "South Korean Won" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "THB", name: "Thai Baht" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "DKK", name: "Danish Krone" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "ILS", name: "Israeli New Shekel" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "COP", name: "Colombian Peso" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "QAR", name: "Qatari Rial" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "UGX", name: "Ugandan Shilling" },
  { code: "XOF", name: "West African CFA Franc" },
  { code: "XAF", name: "Central African CFA Franc" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "TND", name: "Tunisian Dinar" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "LBP", name: "Lebanese Pound" },
  { code: "SYP", name: "Syrian Pound" },
  { code: "IQD", name: "Iraqi Dinar" },
  { code: "IRR", name: "Iranian Rial" },
  { code: "AFN", name: "Afghan Afghani" },
  { code: "UZS", name: "Uzbekistani Som" },
  { code: "KZT", name: "Kazakhstani Tenge" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "AZN", name: "Azerbaijani Manat" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "BYN", name: "Belarusian Ruble" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "MDL", name: "Moldovan Leu" },
  { code: "RON", name: "Romanian Leu" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "RSD", name: "Serbian Dinar" },
  { code: "BAM", name: "Bosnia and Herzegovina Convertible Mark" },
  { code: "MKD", name: "Macedonian Denar" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "FJD", name: "Fijian Dollar" },
  { code: "PGK", name: "Papua New Guinean Kina" },
  { code: "SBD", name: "Solomon Islands Dollar" },
  { code: "VUV", name: "Vanuatu Vatu" },
  { code: "WST", name: "Samoan Tala" },
  { code: "TOP", name: "Tongan Paʻanga" },
  { code: "KMF", name: "Comorian Franc" },
  { code: "MGA", name: "Malagasy Ariary" },
  { code: "MRO", name: "Mauritanian Ouguiya" },
  { code: "SCR", name: "Seychellois Rupee" },
  { code: "SLL", name: "Sierra Leonean Leone" },
  { code: "SOS", name: "Somali Shilling" },
  { code: "SSP", name: "South Sudanese Pound" },
  { code: "STD", name: "São Tomé and Príncipe Dobra" },
  { code: "SZL", name: "Swazi Lilangeni" },
  { code: "TJS", name: "Tajikistani Somoni" },
  { code: "TMT", name: "Turkmenistan Manat" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "BWP", name: "Botswana Pula" },
  { code: "BIF", name: "Burundian Franc" },
  { code: "CVE", name: "Cape Verdean Escudo" },
  { code: "CDF", name: "Congolese Franc" },
  { code: "DJF", name: "Djiboutian Franc" },
  { code: "ERN", name: "Eritrean Nakfa" },
  { code: "ETB", name: "Ethiopian Birr" },
  { code: "GMD", name: "Gambian Dalasi" },
  { code: "GNF", name: "Guinean Franc" },
  { code: "LRD", name: "Liberian Dollar" },
  { code: "LSL", name: "Lesotho Loti" },
  { code: "LYD", name: "Libyan Dinar" },
  { code: "MWK", name: "Malawian Kwacha" },
  { code: "MZN", name: "Mozambican Metical" },
  { code: "NAD", name: "Namibian Dollar" },
  { code: "RWF", name: "Rwandan Franc" },
  { code: "SHP", name: "Saint Helena Pound" },
  { code: "SRD", name: "Surinamese Dollar" },
  { code: "VES", name: "Venezuelan Bolívar Soberano" },
  { code: "YER", name: "Yemeni Rial" },
  { code: "ZMW", name: "Zambian Kwacha" },
  { code: "ZWL", name: "Zimbabwean Dollar" },
];

const InvestmentForm = ({ onAddInvestment, showMessage }) => {
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("");
  const [sector, setSector] = useState("");
  const [broker, setBroker] = useState("");
  const [currency, setCurrency] = useState("IDR"); // Default to IDR
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [buyDate, setBuyDate] = useState("");

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
      showMessage("Harap isi semua kolom dengan nilai yang valid.", "error");
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
    showMessage(
      "Investasi berhasil ditambahkan! Memperbarui harga...",
      "success"
    );
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6 text-gray-text-tertiary">
        Tambah Investasi Baru
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
            Nama Aset
          </label>
          <input
            type="text"
            id="assetName"
            className="input-field"
            placeholder="Contoh: Bitcoin (BTC)"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="assetType"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Jenis Aset
          </label>
          <select
            id="assetType"
            className="input-field"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="">Pilih Jenis Aset Kripto</option>
            <option value="Bitcoin">Bitcoin (BTC)</option>
            <option value="Ethereum">Ethereum (ETH)</option>
            <option value="Ripple">Ripple (XRP)</option>
            <option value="Litecoin">Litecoin (LTC)</option>
            <option value="Cardano">Cardano (ADA)</option>
            <option value="Solana">Solana (SOL)</option>
            <option value="Dogecoin">Dogecoin (DOGE)</option>
            <option value="Stablecoin">Stablecoin (USDT, USDC, BUSD)</option>
            <option value="NFT">NFT (Non-Fungible Token)</option>
            <option value="XRP">XRP</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sector"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Kategori Kripto
          </label>
          <input
            type="text"
            id="sector"
            className="input-field"
            placeholder="Contoh: DeFi, GameFi, Layer 1"
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
            placeholder="Contoh: Binance, Indodax, Metamask"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Mata Uang Pembelian
          </label>
          <select
            id="currency"
            className="input-field"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Pilih Mata Uang</option>
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
            Jumlah Unit
          </label>
          <input
            type="number"
            id="quantity"
            className="input-field"
            placeholder="Contoh: 0.05 (untuk BTC)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="buyPrice"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Harga Beli per Unit (Rp)
          </label>
          <input
            type="number"
            id="buyPrice"
            className="input-field"
            placeholder="Contoh: 150000000"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="buyDate"
            className="block text-sm font-medium text-gray-light mb-1"
          >
            Tanggal Pembelian
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
          Tambah Investasi
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;
