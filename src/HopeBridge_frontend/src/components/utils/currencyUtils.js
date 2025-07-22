// src/utils/currencyUtils.js

// Daftar mata uang dunia (ISO 4217 Codes) dengan simbol
export const currencies = [
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "GBP", name: "British Pound Sterling", symbol: "£" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "CLP", name: "Chilean Peso", symbol: "CLP$" },
  { code: "COP", name: "Colombian Peso", symbol: "COL$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD" },
  { code: "QAR", name: "Qatari Rial", symbol: "QR" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "CFA" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م." },
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "BD" },
  { code: "OMR", name: "Omani Rial", symbol: "RO" },
  { code: "LBP", name: "Lebanese Pound", symbol: "L.L." },
  { code: "SYP", name: "Syrian Pound", symbol: "£S" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "сум" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин." },
  {
    code: "BAM",
    name: "Bosnia and Herzegovina Convertible Mark",
    symbol: "KM",
  },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
  { code: "ALL", name: "Albanian Lek", symbol: "L" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
  { code: "FJD", name: "Fijian Dollar", symbol: "FJ$" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "SI$" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "Vt" },
  { code: "WST", name: "Samoan Tala", symbol: "WS$" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MRO", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "SRe" },
  { code: "SLL", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh.So." },
  { code: "SSP", name: "South Sudanese Pound", symbol: "SS£" },
  { code: "STD", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "E" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
  { code: "TMT", name: "Turkmenistan Manat", symbol: "m" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "BWP", name: "Botswana Pula", symbol: "P" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "Esc" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG" },
  { code: "LRD", name: "Liberian Dollar", symbol: "L$" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$" },
  { code: "RWF", name: "Rwandan Franc", symbol: "RF" },
  { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
  { code: "VES", name: "Venezuelan Bolívar Soberano", symbol: "Bs.S" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "Z$" },
];

export const formatCurrency = (value, currencyCode) => {
  const currencyInfo = currencies.find((curr) => curr.code === currencyCode);

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    console.warn(`Could not format currency for ${currencyCode}: ${error}`);
    const symbol = currencyInfo ? currencyInfo.symbol : currencyCode; // Fallback to code
    return `${symbol} ${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

// Function to get exchange rate (relative to 1 USD or similar)
// CoinGecko's /exchange_rates endpoint provides all rates relative to BTC.
// We can use this to calculate fiat-to-fiat rates.
export const fetchExchangeRates = async () => {
  try {
    const apiKey = ""; // API Key will be provided by Canvas
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const coingeckoExchangeRatesUrl = `https://api.coingecko.com/api/v3/exchange_rates`;

    const prompt = `Fetch the following URL and return the JSON response:\n${coingeckoExchangeRatesUrl}`;

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
      console.error("LLM proxy response not OK for exchange rates:", response);
      throw new Error(
        `Error from LLM proxy for exchange rates: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    const data = JSON.parse(result.candidates[0].content.parts[0].text);

    // Process rates to be relative to a base (e.g., USD or BTC if that's more consistent)
    // CoinGecko's /exchange_rates returns everything relative to BTC.
    // So, if we want NZD to IDR, it's (IDR_value_against_BTC / NZD_value_against_BTC)
    const rates = data.rates;
    const processedRates = {};

    // Convert all rates to be relative to USD for easier fiat-to-fiat conversion
    const btcToUsdRate = rates["usd"].value; // Value of 1 BTC in USD

    for (const code in rates) {
      if (rates[code].type === "fiat") {
        // value is 1 unit of BTC in that fiat currency.
        // To get 1 unit of fiat in USD, it's 1 / (rates[code].value / btcToUsdRate)
        // Or simply: (1 / rates[code].value) * btcToUsdRate if we want USD per unit of fiat
        // To get the value of 1 USD in this fiat currency: rates[code].value / rates['usd'].value
        processedRates[code.toUpperCase()] =
          rates[code].value / rates["usd"].value; // Value of 1 USD in this currency
      } else if (rates[code].type === "crypto") {
        // For cryptos, store their value relative to USD directly if available
        if (rates[code].value_in_btc && btcToUsdRate) {
          processedRates[code.toUpperCase()] =
            rates[code].value_in_btc * btcToUsdRate; // Value of 1 crypto unit in USD
        }
      }
    }

    // Add direct USD to IDR for robust IDR conversion
    // Find the IDR rate relative to USD
    const idrRateInUsd = processedRates["IDR"]; // This is (IDR/USD)
    const usdRateInIdr = 1 / idrRateInUsd; // This is (USD/IDR)

    processedRates["USD_TO_IDR"] = usdRateInIdr;
    processedRates["IDR_TO_USD"] = idrRateInUsd;

    console.log("Fetched Exchange Rates (relative to USD):", processedRates);
    return processedRates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return null;
  }
};

// Function to convert value from source currency to target currency
export const convertCurrency = (value, fromCurrency, toCurrency, rates) => {
  if (!rates) {
    console.warn("Exchange rates not available for conversion.");
    return value; // Return original value if rates are missing
  }

  if (fromCurrency === toCurrency) {
    return value;
  }

  // All rates are currently relative to USD (value of 1 USD in target currency)
  // So, to convert from FROM_CURRENCY to TO_CURRENCY:
  // 1. Convert FROM_CURRENCY to USD: value / rates[FROM_CURRENCY]
  // 2. Convert USD to TO_CURRENCY: (value / rates[FROM_CURRENCY]) * rates[TO_CURRENCY]

  const fromRate = rates[fromCurrency.toUpperCase()];
  const toRate = rates[toCurrency.toUpperCase()];

  if (!fromRate || !toRate) {
    console.warn(
      `Missing exchange rate for ${fromCurrency} or ${toCurrency}. Cannot convert.`
    );
    return value; // Return original if rate is missing
  }

  return (value / fromRate) * toRate;
};
