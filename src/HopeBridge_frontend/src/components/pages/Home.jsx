import React from "react";
import { useOutletContext } from "react-router-dom";
function HomePage() {
  const { user, login } = useOutletContext();

  return (
    <section
      id="home"
      className="p-10 max-w-4xl mx-auto my-10 text-center flex flex-col items-center justify-center min-h-[calc(100vh-200px)]"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text leading-tight">
        Ayo Cek Kesehatan Finansialmu!
      </h2>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl">
        AuraFi adalah DApps inovatif yang membantu Anda melacak, menganalisis,
        dan meningkatkan kesehatan finansial Anda. Mulai perjalanan Anda menuju
        stabilitas keuangan sekarang.
      </p>
      {/* Tombol Login with Internet Identity hanya tampil jika user BELUM login */}
      {!user && ( // <-- Tambahkan kondisi ini
        <button
          onClick={login} // Panggil fungsi login dari Outlet context
          className="px-8 py-4 text-xl rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
        >
          Login with Internet Identity
        </button>
      )}
    </section>
  );
}

export default HomePage;
