import React, { useState } from "react";

function OnboardingModal({ onClose }) {
  // State untuk melacak langkah onboarding saat ini
  const [currentStep, setCurrentStep] = useState(0);

  // Data untuk setiap langkah onboarding
  const onboardingSteps = [
    {
      title: "Selamat Datang di AuraFi!",
      icon: "fas fa-hand-sparkles",
      description:
        "AuraFi adalah pendamping finansial kesehatan pribadi Anda. Kami hadir untuk membantu Anda mencapai ketenangan finansial.",
      features: [
        {
          name: "Pelacakan Komprehensif",
          desc: "Catat dan kelola semua aspek keuangan Anda.",
        },
        {
          name: "Analisis Cerdas",
          desc: "Dapatkan wawasan mendalam tentang pola pengeluaran dan aset Anda.",
        },
      ],
    },
    {
      title: "Dashboard Anda",
      icon: "fas fa-tachometer-alt",
      description:
        "Dashboard adalah pusat kendali Anda. Di sini, Anda akan melihat gambaran umum kesehatan finansial Anda.",
      features: [
        {
          name: "Level Keuangan",
          desc: "Pahami posisi finansial Anda saat ini.",
        },
        {
          name: "Metrik Utama",
          desc: "Lihat total pemasukan, pengeluaran, kekayaan bersih, dan dana darurat.",
        },
        {
          name: "Tren Visual",
          desc: "Grafik intuitif menunjukkan tren keuangan Anda dari waktu ke waktu.",
        },
      ],
    },
    {
      title: "Input Data & AI Care",
      icon: "fas fa-clipboard-list",
      description:
        "Akurasi data adalah kunci. Masukkan informasi keuangan Anda dengan mudah dan dapatkan saran cerdas.",
      features: [
        {
          name: "Input Terstruktur",
          desc: "Tab terpisah untuk penghasilan, pengeluaran, tabungan, investasi, aset, dan utang.",
        },
        {
          name: "Analisis Crypto",
          desc: "Simulasikan potensi perubahan nilai investasi crypto Anda.",
        },
        {
          name: "Saran AI Personal",
          desc: "Fitur AI Care kami siap memberikan rekomendasi finansial yang disesuaikan.",
        },
      ],
    },
    {
      title: "Siap Memulai Perjalanan Anda?",
      icon: "fas fa-rocket",
      description:
        "AuraFi dirancang untuk memberdayakan Anda. Mari kita mulai menuju kesehatan finansial yang lebih baik!",
      features: [], // Tidak ada fitur spesifik di langkah terakhir
    },
  ];

  const totalSteps = onboardingSteps.length;
  const currentStepData = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose(); // Tutup modal di langkah terakhir
    }
  };

  const handleSkip = () => {
    onClose(); // Tutup modal jika pengguna memilih untuk skip
  };

  return (
    <div className="fixed inset-0 bg-black-primary bg-opacity-100 flex items-center justify-center z-[100] p-4">
      <div className="bg-gray-card-bg p-8 rounded-xl shadow-2xl max-w-lg w-full mx-auto text-center border border-gray-border relative transform transition-transform duration-300 ease-out scale-95 opacity-0 animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-green-primary text-2xl focus:outline-none"
          onClick={handleSkip} // Tombol silang sekarang untuk skip
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex flex-col items-center mb-6">
          {/* Ikon dinamis dengan animasi - pastikan animate-bounce-once didefinisikan di tailwind.config.js */}
          <i
            className={`${currentStepData.icon} text-6xl gradient-text mb-4 animate-bounce-once`}
          ></i>
          <h3 className="text-3xl font-bold gradient-text mb-4">
            {currentStepData.title}
          </h3>
          <p className="text-lg text-gray-300">{currentStepData.description}</p>
        </div>

        {currentStepData.features.length > 0 && (
          <ul className="list-disc list-inside text-left text-gray-300 space-y-3 mb-8 px-4">
            {currentStepData.features.map((feature, index) => (
              <li key={index}>
                <span className="font-semibold text-green-primary">
                  {feature.name}:
                </span>{" "}
                {feature.desc}
              </li>
            ))}
          </ul>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <span
              key={index}
              className={`block w-3 h-3 rounded-full transition-all duration-300
                ${
                  index === currentStep
                    ? "bg-green-primary scale-125"
                    : "bg-gray-700"
                }`}
            ></span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          {currentStep < totalSteps - 1 ? (
            <button
              onClick={handleSkip} // Tombol skip di kiri bawah
              className="px-6 py-3 text-lg rounded-lg font-semibold text-gray-400 border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Lewati
            </button>
          ) : (
            <span></span> // Placeholder agar tombol "Mulai Sekarang" tetap di tengah
          )}

          <button
            onClick={handleNext}
            className="px-8 py-3 text-lg rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
          >
            {currentStep < totalSteps - 1 ? "Lanjut" : "Mulai Sekarang!"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingModal;
