import React from "react";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext

function AiCarePage() {
  // Ambil semua state dan fungsi yang dibutuhkan dari Outlet context
  const {
    gajiBulanan,
    pendapatanPasif,
    calculatedTotalExpenses, // Menggunakan calculatedTotalExpenses dari context
    calculatedTotalIncome, // Menggunakan calculatedTotalIncome dari context
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
    aiCareLoading,
    getAiFinancialAdvice,
  } = useOutletContext();

  return (
    <section id="ai-care" className="p-10 max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-center mb-8 gradient-text">
        AI Care: Dapatkan Saran Finansial ✨
      </h2>
      <div className="bg-gray-card-bg rounded-xl p-6 shadow-md border border-gray-border">
        <p className="text-lg text-gray-300 mb-4">
          Jelaskan situasi keuangan Anda atau ajukan pertanyaan spesifik, dan AI
          kami akan memberikan saran yang dipersonalisasi.
        </p>
        <textarea
          className="w-full p-3 border border-gray-input-border rounded-lg bg-gray-input-bg text-white-default text-base outline-none transition-colors duration-300 focus:border-green-primary focus:ring-2 focus:ring-green-primary focus:ring-opacity-30 min-h-[120px] resize-y mb-4"
          placeholder="Contoh: 'Saya ingin menabung untuk rumah pertama, bagaimana cara terbaik untuk memulainya dengan pendapatan saya saat ini?' atau 'Analisis pengeluaran medis saya dan berikan tips untuk menghemat.'"
          value={aiCareInput}
          onChange={(e) => setAiCareInput(e.target.value)}
        ></textarea>
        <button
          onClick={getAiFinancialAdvice}
          disabled={aiCareLoading}
          className="w-full py-4 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {aiCareLoading ? "Memuat Saran AI..." : "Dapatkan Saran AI ✨"}
        </button>

        {aiCareResponse && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-text-tertiary mb-3">
              Saran dari AI Care:
            </h3>
            <p className="text-gray-300 whitespace-pre-wrap">
              {aiCareResponse}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
export default AiCarePage;
