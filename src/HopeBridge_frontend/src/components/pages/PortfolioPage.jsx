import React, { useState, useEffect } from "react";
import InvestmentForm from "../investments/InvestmentForm"; // Pastikan jalur impor ini benar
import PortfolioList from "../investments/PortfolioList"; // Pastikan jalur impor ini benar

// Mapping nama aset ke ID CoinGecko (penting untuk fetching harga)
// Perluas daftar ini jika Anda ingin melacak lebih banyak aset kripto.
const cryptoIdMap = {
  Bitcoin: "bitcoin",
  Ethereum: "ethereum",
  Ripple: "ripple", // XRP
  Litecoin: "litecoin",
  Cardano: "cardano",
  Solana: "solana",
  Dogecoin: "dogecoin",
  Stablecoin: "tether", // Contoh: menggunakan Tether sebagai representasi stablecoin
  NFT: null, // NFT tidak memiliki harga pasar tunggal yang mudah diakses via API ini
};

const PortfolioPage = () => {
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fungsi untuk menampilkan pesan notifikasi (pengganti alert)
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" }); // Hapus pesan setelah 3 detik
    }, 3000);
  };

  // Fungsi untuk mengambil harga cryptocurrency dari CoinGecko API
  const fetchCryptoPrices = async () => {
    setIsLoading(true); // Tampilkan indikator loading

    // Kumpulkan semua ID koin unik yang ada di portofolio untuk permintaan API
    const uniqueCryptoTypes = new Set(investments.map((inv) => inv.assetType));
    const idsToFetch = Array.from(uniqueCryptoTypes)
      .map((type) => cryptoIdMap[type])
      .filter((id) => id && id !== "null"); // Filter ID yang valid (bukan null atau undefined)

    if (idsToFetch.length === 0) {
      setIsLoading(false);
      showMessage(
        "Tidak ada aset kripto yang dapat diperbarui harganya.",
        "info"
      );
      return;
    }

    const ids = idsToFetch.join(","); // Gabungkan ID menjadi string yang dipisahkan koma
    const vsCurrencies = "idr"; // Mata uang perbandingan (Indonesian Rupiah)
    const coingeckoApiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

    try {
      // Menggunakan LLM (Gemini 2.0 Flash) sebagai proxy untuk melakukan fetch
      // Ini membantu mengatasi masalah CORS atau batasan lingkungan eksekusi.
      const apiKey = ""; // API Key akan disediakan oleh lingkungan Canvas secara otomatis
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const prompt = `Fetch the following URL and return the JSON response:\n${coingeckoApiUrl}`;

      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json", // Minta LLM mengembalikan respons dalam format JSON
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Jika respons dari LLM proxy tidak OK, log error dan lempar exception
        console.error("Respons LLM proxy tidak OK:", response);
        throw new Error(
          `Kesalahan dari LLM proxy: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      let data;
      try {
        // LLM mengembalikan JSON sebagai string di dalam parts[0].text, jadi perlu di-parse
        data = JSON.parse(result.candidates[0].content.parts[0].text);
      } catch (parseError) {
        console.error(
          "Gagal mengurai respons LLM sebagai JSON:",
          result.candidates[0].content.parts[0].text,
          parseError
        );
        throw new Error("Gagal mengurai respons API dari LLM proxy.");
      }

      // Perbarui harga setiap investasi dalam state
      setInvestments((prevInvestments) => {
        return prevInvestments.map((inv) => {
          const cryptoId = cryptoIdMap[inv.assetType];
          // Cek apakah harga ditemukan di data API
          if (cryptoId && data[cryptoId] && data[cryptoId][vsCurrencies]) {
            return { ...inv, currentPrice: data[cryptoId][vsCurrencies] };
          } else if (inv.assetType === "NFT") {
            // Untuk NFT, harga tetap 0 karena tidak ada harga pasar tunggal
            return { ...inv, currentPrice: 0 };
          } else {
            // Fallback: Jika harga tidak ditemukan dari API, gunakan harga beli sebagai harga saat ini
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
      // Fallback untuk semua investasi jika seluruh proses pengambilan gagal
      setInvestments((prevInvestments) => {
        return prevInvestments.map((inv) => {
          if (inv.currentPrice === 0) {
            // Hanya terapkan fallback jika currentPrice belum diatur
            return { ...inv, currentPrice: inv.buyPrice };
          }
          return inv;
        });
      });
    } finally {
      setIsLoading(false); // Sembunyikan indikator loading
    }
  };

  // Efek samping untuk memuat investasi dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedInvestments = localStorage.getItem("cryptoInvestments");
    if (storedInvestments) {
      setInvestments(JSON.parse(storedInvestments));
    }
    fetchCryptoPrices(); // Ambil harga saat halaman pertama kali dimuat
  }, []); // Dependensi kosong berarti efek ini hanya berjalan sekali saat mount

  // Efek samping untuk menyimpan investasi ke localStorage setiap kali state investments berubah
  useEffect(() => {
    localStorage.setItem("cryptoInvestments", JSON.stringify(investments));
  }, [investments]); // Efek ini berjalan setiap kali 'investments' berubah

  // Handler untuk menambah investasi baru
  const handleAddInvestment = (newInvestment) => {
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
    fetchCryptoPrices(); // Perbarui harga setelah menambah investasi baru
  };

  // Handler untuk menghapus investasi
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

      {/* Komponen untuk menampilkan pesan notifikasi */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white-default z-50 ${
            message.type === "success"
              ? "bg-green-primary" // Kelas Tailwind untuk sukses
              : message.type === "error"
              ? "bg-red-primary" // Kelas Tailwind untuk error
              : "bg-purple-recharts" // Kelas Tailwind untuk info
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Komponen Form Penambahan Investasi */}
      <InvestmentForm
        onAddInvestment={handleAddInvestment}
        showMessage={showMessage}
      />

      {/* Komponen Daftar Portofolio dan Visualisasi */}
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
