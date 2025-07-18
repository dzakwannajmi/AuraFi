import React from "react";

function OnboardingModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black-primary bg-opacity-75 flex items-center justify-center z-[100]">
      <div className="bg-gray-900 bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-lg w-11/12 mx-auto text-center border border-gray-700 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-green-primary text-2xl focus:outline-none"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h3 className="text-3xl font-bold gradient-text mb-6">
          Selamat Datang di AuraFi!
        </h3>
        <p className="text-lg text-gray-300 mb-6">
          AuraFi adalah pendamping finansial kesehatan pribadi Anda. Mari kita
          lihat fitur-fitur utamanya:
        </p>
        <ul className="list-disc list-inside text-left text-gray-300 space-y-3 mb-8">
          <li>
            <span className="font-semibold text-green-primary">Dashboard:</span>{" "}
            Lihat ringkasan kesehatan finansial Anda, level keuangan, dan tren
            pemasukan/pengeluaran.
          </li>
          <li>
            <span className="font-semibold text-green-primary">Transaksi:</span>{" "}
            Catat semua pengeluaran dan pemasukan medis Anda untuk pelacakan
            yang akurat.
          </li>
          <li>
            <span className="font-semibold text-green-primary">AI Care:</span>{" "}
            Dapatkan saran finansial yang dipersonalisasi dari AI kami
            berdasarkan data Anda.
          </li>
          <li>
            <span className="font-semibold text-green-primary">
              Data Input:
            </span>{" "}
            Masukkan detail penghasilan, pengeluaran, tabungan, investasi, aset,
            dan utang Anda untuk analisis mendalam.
          </li>
        </ul>
        <button
          onClick={onClose}
          className="px-8 py-3 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
        >
          Mulai Sekarang!
        </button>
      </div>
    </div>
  );
}
export default OnboardingModal;
