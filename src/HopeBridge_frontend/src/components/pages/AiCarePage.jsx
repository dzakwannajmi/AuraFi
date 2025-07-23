import React, { useState, useEffect, useRef, useCallback } from "react"; // Tambahkan useCallback
import { useOutletContext } from "react-router-dom";

function AiCarePage() {
  // Destrukturisasi semua data dan fungsi yang dibutuhkan dari useOutletContext
  const {
    gajiBulanan, // Monthly Salary
    pendapatanPasif, // Passive Income
    calculatedTotalExpenses, // Total Medical Expenses
    calculatedTotalIncome, // Total Insurance Claims
    netBalance, // Net Health Balance
    netWorth, // Net Worth
    budget, // Monthly Budget
    savings, // Savings Amount
    retirementSavings, // Retirement Savings
    emergencyFund, // Emergency Fund
    debts, // Total Debts
    punyaAset, // Has Assets (boolean)
    vehicles, // Vehicle Value
    rumahValue, // House Value
    tanahValue, // Land Value
    bangunanValue, // Building Value
    aiCareInput, // State untuk input pengguna di chat
    setAiCareInput, // Setter untuk input pengguna
    aiCareLoading, // State loading dari AI
    setAiCareLoading, // Setter untuk loading
    getAiFinancialAdvice, // Fungsi untuk mendapatkan saran AI (sudah terintegrasi dengan Deepseek API)
  } = useOutletContext();

  // State untuk riwayat chat: array objek { type: 'user' | 'ai', text: string, loading?: boolean }
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null); // Untuk auto-scrolling ke bagian bawah chat

  // Fungsi untuk menggulir ke pesan terbaru
  const scrollToBottom = useCallback(() => {
    // Gunakan useCallback
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Efek samping untuk menggulir setiap kali riwayat chat berubah
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]); // Tambahkan scrollToBottom ke dependensi

  // Modified function to send message and manage chat history
  const handleSendMessage = async () => {
    if (!aiCareInput.trim()) return; // Jangan kirim pesan kosong

    const userMessage = { type: "user", text: aiCareInput };
    setChatHistory((prev) => [...prev, userMessage]); // Tambahkan pesan pengguna ke riwayat
    setAiCareInput(""); // Kosongkan input

    setAiCareLoading(true); // Set loading ke true
    // Tambahkan pesan "AI is typing..."
    const typingMessage = {
      type: "ai",
      text: "AI is typing...",
      loading: true, // Flag loading untuk pesan ini
    };
    setChatHistory((prev) => [...prev, typingMessage]);
    scrollToBottom(); // Gulir ke pesan "typing..."

    // Siapkan snapshot finansial untuk AI
    // Ini mengumpulkan semua data finansial yang relevan ke dalam satu string
    const currentFinancialSnapshot = `
      Monthly Income: Rp ${gajiBulanan.toLocaleString("id-ID")}
      Passive Income: Rp ${pendapatanPasif.toLocaleString("id-ID")}
      Total Medical Expenses: Rp ${calculatedTotalExpenses.toLocaleString(
        "id-ID"
      )}
      Total Insurance Claims: Rp ${calculatedTotalIncome.toLocaleString(
        "id-ID"
      )}
      Net Health Balance: Rp ${netBalance.toLocaleString("id-ID")}
      Net Worth: Rp ${netWorth.toLocaleString("id-ID")}
      Monthly Budget: Rp ${budget.toLocaleString("id-ID")}
      Savings Amount: Rp ${savings.toLocaleString("id-ID")}
      Retirement Savings: Rp ${retirementSavings.toLocaleString("id-ID")}
      Emergency Fund: Rp ${emergencyFund.toLocaleString("id-ID")}
      Total Debts: Rp ${debts.toLocaleString("id-ID")}
      ${
        punyaAset
          ? `Vehicle Value: Rp ${vehicles.toLocaleString(
              "id-ID"
            )}, House Value: Rp ${rumahValue.toLocaleString(
              "id-ID"
            )}, Land Value: Rp ${tanahValue.toLocaleString(
              "id-ID"
            )}, Building Value: Rp ${bangunanValue.toLocaleString("id-ID")}`
          : ""
      }
    `;

    // Panggil fungsi getAiFinancialAdvice dari context (yang terintegrasi dengan Deepseek API)
    const aiResponseText = await getAiFinancialAdvice(
      userMessage.text, // Kirim pertanyaan spesifik pengguna
      currentFinancialSnapshot // Kirim snapshot finansial lengkap
    );

    setAiCareLoading(false); // Set loading ke false
    // Hapus pesan "AI is typing..." dan ganti dengan respons AI yang sebenarnya
    setChatHistory((prev) =>
      prev.map((msg) =>
        msg.loading ? { ...msg, text: aiResponseText, loading: false } : msg
      )
    );
  };

  return (
    <section id="ai-care" className="p-10 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        AI Care: Your Personal Financial Consultant ✨
      </h2>
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border flex flex-col h-[600px]">
        {/* Area Tampilan Riwayat Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {chatHistory.length === 0 && (
            <div className="text-center text-gray-text-secondary mt-10">
              Hello! I am your AI Financial Consultant. Ask me anything about
              your finances.
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div
              key={index} // Menggunakan index sebagai key, ok untuk chat sederhana tanpa reordering
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                  msg.type === "user"
                    ? "bg-green-secondary text-white-default" // Gaya untuk pesan pengguna
                    : "bg-gray-dark text-white-default" // Gaya untuk pesan AI
                }`}
              >
                {/* Teks pesan, dengan indikator loading jika AI sedang mengetik */}
                {msg.text}
                {msg.loading && <span className="ml-2 animate-pulse">...</span>}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />{" "}
          {/* Elemen kosong untuk tujuan auto-scroll */}
        </div>

        {/* Area Input Chat */}
        <div className="mt-4 flex items-center border-t border-gray-border pt-4">
          <textarea
            className="flex-1 p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30 min-h-[40px] max-h-[120px] resize-y mr-3"
            placeholder="Type your question here..."
            value={aiCareInput}
            onChange={(e) => setAiCareInput(e.target.value)}
            onKeyPress={(e) => {
              // Kirim pesan saat Enter ditekan (tanpa Shift+Enter)
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Mencegah baris baru di textarea
                handleSendMessage();
              }
            }}
          ></textarea>
          <button
            onClick={handleSendMessage}
            disabled={aiCareLoading || !aiCareInput.trim()} // Tombol dinonaktifkan saat loading atau input kosong
            className="px-6 py-3 rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {/* Tampilkan ikon loading atau ikon pesawat kertas */}
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
