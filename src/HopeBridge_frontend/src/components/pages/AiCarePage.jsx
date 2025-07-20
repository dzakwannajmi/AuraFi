import React, { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function AiCarePage() {
  const {
    gajiBulanan,
    pendapatanPasif,
    calculatedTotalExpenses,
    calculatedTotalIncome,
    netBalance,
    netWorth,
    budget,
    savings,
    retirementSavings,
    emergencyFund,
    debts,
    punyaAset,
    vehicles,
    rumahValue,
    tanahValue,
    bangunanValue,
    aiCareInput,
    setAiCareInput,
    aiCareResponse,
    setAiCareResponse,
    aiCareLoading,
    getAiFinancialAdvice,
  } = useOutletContext();

  // NEW: State untuk riwayat chat
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null); // Untuk auto-scroll ke bawah

  // Fungsi untuk scroll ke pesan terbaru
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efek untuk scroll setiap kali chatHistory berubah
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Modifikasi fungsi getAiFinancialAdvice untuk mengelola chat history
  const handleSendMessage = async () => {
    if (!aiCareInput.trim()) return; // Jangan kirim pesan kosong

    const userMessage = { type: "user", text: aiCareInput };
    setChatHistory((prev) => [...prev, userMessage]); // Tambahkan pesan user ke history
    setAiCareInput(""); // Kosongkan input

    setAiCareLoading(true);
    // Tambahkan pesan "AI sedang mengetik..."
    const typingMessage = {
      type: "ai",
      text: "AI sedang mengetik...",
      loading: true,
    };
    setChatHistory((prev) => [...prev, typingMessage]);
    scrollToBottom(); // Scroll ke pesan typing

    // Siapkan snapshot finansial untuk AI
    const currentFinancialSnapshot = `
      Penghasilan Bulanan: Rp ${gajiBulanan.toLocaleString("id-ID")}
      Pendapatan Pasif: Rp ${pendapatanPasif.toLocaleString("id-ID")}
      Total Pengeluaran Medis: Rp ${calculatedTotalExpenses.toLocaleString(
        "id-ID"
      )}
      Total Klaim Asuransi: Rp ${calculatedTotalIncome.toLocaleString("id-ID")}
      Saldo Bersih Kesehatan: Rp ${netBalance.toLocaleString("id-ID")}
      Kekayaan Bersih (Net Worth): Rp ${netWorth.toLocaleString("id-ID")}
      Anggaran Bulanan: Rp ${budget.toLocaleString("id-ID")}
      Jumlah Tabungan: Rp ${savings.toLocaleString("id-ID")}
      Dana Pensiun: Rp ${retirementSavings.toLocaleString("id-ID")}
      Dana Darurat: Rp ${emergencyFund.toLocaleString("id-ID")}
      Total Utang: Rp ${debts.toLocaleString("id-ID")}
      ${
        punyaAset
          ? `Nilai Kendaraan: Rp ${vehicles.toLocaleString(
              "id-ID"
            )}, Nilai Rumah: Rp ${rumahValue.toLocaleString(
              "id-ID"
            )}, Nilai Tanah: Rp ${tanahValue.toLocaleString(
              "id-ID"
            )}, Nilai Bangunan: Rp ${bangunanValue.toLocaleString("id-ID")}`
          : ""
      }
    `;

    // Panggil fungsi getAiFinancialAdvice dari context
    // Fungsi ini akan mengembalikan respons dari LLM (saat ini masih placeholder)
    const aiResponseText = await getAiFinancialAdvice(
      aiCareInput,
      currentFinancialSnapshot
    ); // getAiFinancialAdvice harus mengembalikan teks

    setAiCareLoading(false);
    // Hapus pesan "AI sedang mengetik..." dan ganti dengan respons asli
    setChatHistory((prev) =>
      prev.map((msg) =>
        msg.loading ? { ...msg, text: aiResponseText, loading: false } : msg
      )
    );
  };

  return (
    <section id="ai-care" className="p-10 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        AI Care: Konsultan Finansial Pribadi Anda ✨
      </h2>
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border flex flex-col h-[600px]">
        {/* Chat History Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="text-center text-gray-text-secondary mt-10">
              Halo! Saya AI Konsultan Finansial Anda. Ajukan pertanyaan tentang
              keuangan Anda.
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                  msg.type === "user"
                    ? "bg-green-secondary text-white-default"
                    : "bg-gray-dark text-white-default"
                }`}
              >
                {msg.text}
                {msg.loading && <span className="ml-2 animate-pulse">...</span>}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* Elemen untuk auto-scroll */}
        </div>

        {/* Chat Input Area */}
        <div className="mt-4 flex items-center border-t border-gray-border pt-4">
          <textarea
            className="flex-1 p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30 min-h-[40px] max-h-[120px] resize-y mr-3"
            placeholder="Ketik pertanyaan Anda di sini..."
            value={aiCareInput}
            onChange={(e) => setAiCareInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          ></textarea>
          <button
            onClick={handleSendMessage}
            disabled={aiCareLoading || !aiCareInput.trim()}
            className="px-6 py-3 rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {aiCareLoading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
export default AiCarePage;
