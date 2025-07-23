import React, { useEffect, useMemo, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Memuat fitur dasar tsParticles

function HomePage() {
  const { user, login } = useOutletContext();
  const [particlesEngineInitialized, setParticlesEngineInitialized] = useState(false);

  // --- Inisialisasi tsParticles Engine ---
  useEffect(() => {
    if (!particlesEngineInitialized) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setParticlesEngineInitialized(true);
      }).catch(error => {
        console.error("Failed to initialize tsParticles engine:", error);
      });
    }
  }, [particlesEngineInitialized]);

  // Callback saat container Particles dimuat
  const particlesLoaded = (container) => {
    console.log("tsParticles container loaded:", container);
  };

  // --- Konfigurasi tsParticles (options) ---
  const particlesOptions = useMemo(
    () => {
      const customCryptoImageSources = [
        "/Crypto/ada.svg", "/Crypto/Audiocoin.svg", "/Crypto/Aurouracoin.svg",
        "/Crypto/Bitcoincash.svg", "/Crypto/BitcoinGold.svg", "/Crypto/Bitcoin.svg",
        "/Crypto/Bitconnect.svg", "/Crypto/Bitshares.svg", "/Crypto/Dash.svg",
        "/Crypto/decred.svg", "/Crypto/Devcoin.svg", "/Crypto/DOGE.svg",
        "/Crypto/EtheriumClassic.svg", "/Crypto/Etherium.svg", "/Crypto/Europecoin.svg",
        "/Crypto/Expanse.svg", "/Crypto/FLASH.svg", "/Crypto/GAME.svg",
        "/Crypto/Gemz.svg", "/Crypto/GNOSIS.svg", "/Crypto/Golem.svg",
        "/Crypto/Iconomi.svg", "/Crypto/IOTA.svg", "/Crypto/JBS.svg",
        "/Crypto/Komodo.svg", "/Crypto/LISK.svg", "/Crypto/Litecoin.svg",
        "/Crypto/MaidSafeCoin.svg", "/Crypto/Monero.svg", "/Crypto/Namecoin.svg",
        "/Crypto/NEM(Xem).svg", "/Crypto/Neo.svg", "/Crypto/Nxt.svg",
        "/Crypto/OMNI.svg", "/Crypto/Omnisego.svg", "/Crypto/Peercoin.svg",
        "/Crypto/PIVX.svg", "/Crypto/Potcoin.svg", "/Crypto/Prime.svg",
        "/Crypto/qtum.svg", "/Crypto/Rinkeby.svg", "/Crypto/RISE.svg",
        "/Crypto/Robstein.svg", "/Crypto/RUBIES(RBIES).svg", "/Crypto/Steem.svg",
        "/Crypto/Stellarlumens.svg", "/Crypto/Storj.svg", "/Crypto/Synergy.svg",
        "/Crypto/Tether.svg", "/Crypto/ubq.svg", "/Crypto/ven.svg",
        "/Crypto/Verge.svg", "/Crypto/Vertcoin.svg", "/Crypto/WAVES.svg",
        "/Crypto/xrp.svg", "/Crypto/xtz.svg", "/Crypto/ZcashWallet.svg",
      ];

      return {
        // --- Latar belakang tsParticles diatur ke transparan ---
        // Gradien bergerak akan ditangani sepenuhnya oleh CSS pada #tsparticles
        background: {
          color: { value: "transparent" }, // Mengatur warna menjadi transparan
          // Properti 'image', 'repeat', 'size', 'position' dihapus dari sini
          // karena akan ditangani oleh CSS di index.css
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push", // Mode "push" untuk menambah partikel saat klik
            },
            onHover: {
              enable: true,
              mode: 'repulse', // Mode "repulse" untuk menjauhkan partikel saat hover
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4, // Jumlah partikel yang ditambahkan per klik
            },
            repulse: {
              distance: 200, // Jarak partikel menjauh dari kursor
              duration: 0.4,
            },
            grab: { distance: 150, links: { opacity: 1 } },
            bubble: {
              distance: 400, size: 40, duration: 2, opacity: 8, speed: 3,
            },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 5, // Kecepatan partikel
            straight: false,
          },
          number: { value: 150, density: { enable: true, area: 800 } },
          opacity: { value: 1.0 },
          shape: {
            type: "image",
            options: {
              image: customCryptoImageSources.map((src) => ({
                src: src,
                width: 100,
                height: 100,
                replaceColor: false,
              })),
            },
          },
          size: { value: { min: 10, max: 30 } },
        },
        detectRetina: true,
      };
    }, []);

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
          init={async (engine) => { /* engine instance */ }}
          loaded={particlesLoaded}
          options={particlesOptions}
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
              <span className="relative z-10">Login with Internet Identity</span>
            </button>
          )}
        </div>
      </section>
    );
  }

  // Tampilkan loading atau fallback jika engine belum diinisialisasi
  return (
    <section id="home" className="w-screen h-screen flex flex-col items-center justify-center bg-black-primary text-white-default">
      <p className="text-xl text-gray-400 animate-pulse">Loading particles engine...</p>
    </section>
  );
}

export default HomePage;
