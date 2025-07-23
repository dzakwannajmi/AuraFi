import React, { useEffect, useMemo, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Memuat fitur dasar tsParticles

function HomePage() {
  const { user, login } = useOutletContext();
  // State untuk melacak apakah engine tsParticles sudah diinisialisasi
  const [particlesEngineInitialized, setParticlesEngineInitialized] =
    useState(false);

  // --- Inisialisasi tsParticles Engine ---
  // Ini harus dijalankan hanya sekali per siklus hidup aplikasi.
  // Biasanya dilakukan di App.jsx atau Layout.jsx jika ParticlesComponent digunakan di banyak tempat.
  // Namun, karena ini adalah halaman utama, kita bisa menginisialisasinya di sini.
  useEffect(() => {
    // Periksa apakah engine sudah diinisialisasi untuk menghindari inisialisasi ganda
    if (!particlesEngineInitialized) {
      initParticlesEngine(async (engine) => {
        // Memuat fitur 'slim' untuk tsParticles (ukuran bundle lebih kecil)
        await loadSlim(engine);
      })
        .then(() => {
          setParticlesEngineInitialized(true); // Set state menjadi true setelah inisialisasi
        })
        .catch((error) => {
          console.error("Failed to initialize tsParticles engine:", error);
        });
    }
  }, [particlesEngineInitialized]); // Dependensi pada state inisialisasi

  // Callback saat container Particles dimuat
  const particlesLoaded = (container) => {
    console.log("tsParticles container loaded:", container);
    // Di sini Anda bisa mengakses container.particles.array.length untuk jumlah partikel real-time
    // Jika Anda ingin mengintegrasikan dengan Stats.js, ini adalah tempatnya.
  };

  // --- Konfigurasi tsParticles (options) ---
  // Gunakan useMemo untuk memastikan objek options tidak dibuat ulang di setiap render,
  // yang dapat menyebabkan re-render animasi yang tidak perlu.
  const particlesOptions = useMemo(() => {
    // Daftar lengkap jalur SVG ikon kustom Anda
    const customCryptoImageSources = [
      "/Crypto/ada.svg",
      "/Crypto/Audiocoin.svg",
      "/Crypto/Aurouracoin.svg",
      "/Crypto/Bitcoincash.svg",
      "/Crypto/BitcoinGold.svg",
      "/Crypto/Bitcoin.svg",
      "/Crypto/Bitconnect.svg",
      "/Crypto/Bitshares.svg",
      "/Crypto/Dash.svg",
      "/Crypto/decred.svg",
      "/Crypto/Devcoin.svg",
      "/Crypto/DOGE.svg",
      "/Crypto/EtheriumClassic.svg",
      "/Crypto/Etherium.svg",
      "/Crypto/Europecoin.svg",
      "/Crypto/Expanse.svg",
      "/Crypto/FLASH.svg",
      "/Crypto/GAME.svg",
      "/Crypto/Gemz.svg",
      "/Crypto/GNOSIS.svg",
      "/Crypto/Golem.svg",
      "/Crypto/Iconomi.svg",
      "/Crypto/IOTA.svg",
      "/Crypto/JBS.svg",
      "/Crypto/Komodo.svg",
      "/Crypto/LISK.svg",
      "/Crypto/Litecoin.svg",
      "/Crypto/MaidSafeCoin.svg",
      "/Crypto/Monero.svg",
      "/Crypto/Namecoin.svg",
      "/Crypto/NEM(Xem).svg",
      "/Crypto/Neo.svg",
      "/Crypto/Nxt.svg",
      "/Crypto/OMNI.svg",
      "/Crypto/Omnisego.svg",
      "/Crypto/Peercoin.svg",
      "/Crypto/PIVX.svg",
      "/Crypto/Potcoin.svg",
      "/Crypto/Prime.svg",
      "/Crypto/qtum.svg",
      "/Crypto/Rinkeby.svg",
      "/Crypto/RISE.svg",
      "/Crypto/Robstein.svg",
      "/Crypto/RUBIES(RBIES).svg",
      "/Crypto/Steem.svg",
      "/Crypto/Stellarlumens.svg",
      "/Crypto/Storj.svg",
      "/Crypto/Synergy.svg",
      "/Crypto/Tether.svg",
      "/Crypto/ubq.svg",
      "/Crypto/ven.svg",
      "/Crypto/Verge.svg",
      "/Crypto/Vertcoin.svg",
      "/Crypto/WAVES.svg",
      "/Crypto/xrp.svg",
      "/Crypto/xtz.svg",
      "/Crypto/ZcashWallet.svg",
    ];

    return {
      // Latar belakang sekarang hitam solid
      background: {
        color: { value: "#000000" }, // Menggunakan warna hitam solid
      },
      fpsLimit: 120, // Batas FPS untuk performa yang lebih baik
      interactivity: {
        events: {
          onClick: { enable: true, mode: "repulse" }, // Mode repulse saat klik
          onHover: { enable: true, mode: "grab" }, // Mode grab saat hover
          resize: true, // Responsif terhadap perubahan ukuran jendela
        },
        modes: {
          push: { quantity: 4 }, // Jumlah partikel yang ditambahkan saat klik
          repulse: { distance: 200, duration: 0.4 }, // Jarak dan durasi efek repulse
          grab: { distance: 150, links: { opacity: 1 } }, // Jarak grab
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          }, // Efek bubble
        },
      },
      particles: {
        color: { value: "#ffffff" }, // Warna partikel (jika bukan gambar)
        links: {
          // Garis koneksi antar partikel
          color: "#ffffff", // Warna garis
          distance: 150, // Jarak maksimum untuk menggambar garis
          enable: true,
          opacity: 0.3, // Opasitas garis
          width: 1, // Ketebalan garis
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" }, // Partikel memantul dari tepi
          random: true,
          speed: 1,
          straight: false,
        },
        number: { value: 150, density: { enable: true, area: 800 } }, // Jumlah partikel
        opacity: { value: 1.0 }, // Opasitas partikel
        shape: {
          type: "image", // Menggunakan tipe 'image' untuk gambar kustom
          options: {
            image: customCryptoImageSources.map((src) => ({
              src: src,
              width: 100, // Lebar gambar asli (sesuaikan jika ikon Anda berbeda)
              height: 100, // Tinggi gambar asli (sesuaikan jika ikon Anda berbeda)
              replaceColor: false, // Set ini ke true jika Anda ingin tsParticles mengubah warna SVG Anda
              // menjadi warna yang ditentukan di 'particles.color.value'
              // Set ke false jika SVG Anda sudah memiliki warna yang diinginkan
            })),
          },
        },
        size: { value: { min: 10, max: 30 } }, // Ukuran partikel (acak dalam rentang)
      },
      detectRetina: true, // Deteksi layar retina
    };
  }, []); // particlesOptions hanya dibuat sekali berkat useMemo

  // Render komponen Particles hanya jika engine sudah diinisialisasi
  if (particlesEngineInitialized) {
    return (
      <section
        id="home"
        className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Komponen Particles dari tsParticles akan merender kanvas di sini */}
        <Particles
          id="tsparticles" // ID untuk container tsParticles
          className="fixed inset-0 z-0" // Gaya untuk menutupi seluruh layar
          init={async (engine) => {
            /* engine instance */
          }} // initParticlesEngine sudah dipanggil di atas
          loaded={particlesLoaded} // Callback saat container dimuat
          options={particlesOptions} // Konfigurasi partikel yang telah kita definisikan
        />

        {/* Konten teks dan tombol - diposisikan di atas kanvas */}
        <div className="relative z-10 p-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 gradient-text leading-tight animate-fade-in-up animate-delay-100">
            Check Your Financial Health!
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            AuraFi is an innovative DApp that helps you track, analyze, and
            improve your financial health. Start your journey towards financial
            stability now.
          </p>
          {!user && (
            <button
              onClick={login}
              className="px-8 py-4 text-xl rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg active:translate-y-0 active:shadow-md transition-all duration-300 btn-gradient-hover animate-fade-in-up animate-delay-300"
            >
              <span className="relative z-10">
                Login with Internet Identity
              </span>
            </button>
          )}
        </div>
      </section>
    );
  }

  // Tampilkan loading atau fallback jika engine belum diinisialisasi
  return (
    <section
      id="home"
      className="w-screen h-screen flex flex-col items-center justify-center bg-black-primary text-white-default"
    >
      <p className="text-xl text-gray-400 animate-pulse">
        Loading particles engine...
      </p>
    </section>
  );
}

export default HomePage;
