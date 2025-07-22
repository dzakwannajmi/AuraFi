import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import * as THREE from "three"; // Import Three.js

function HomePage() {
  const { user, login } = useOutletContext();
  const mountRef = useRef(null); // Ref untuk elemen DOM tempat scene 3D akan di-mount

  useEffect(() => {
    // --- Setup Scene Three.js ---
    let scene, camera, renderer;
    let particles = []; // Array untuk menyimpan objek partikel
    const numParticles = 150; // Jumlah partikel
    const particleSpeed = 0.005; // Kecepatan animasi partikel
    const particleSize = 0.15; // Ukuran partikel

    // Define abstract colors (green, blue, purple shades)
    const abstractColors = [
      0x3ad9a3, // green-primary
      0x0f7c5f, // green-secondary
      0x1abc9c, // green-accent-1
      0x2ecc71, // green-accent-2
      0x27ae60, // green-accent-3
      0x2c3e50, // green-accent-5 (dark blue-gray)
      0x6366f1, // indigo-500 (from original Tailwind for contrast if needed)
      0x8884d8, // purple-recharts
    ];

    const initThree = () => {
      // 1. Scene
      scene = new THREE.Scene();
      scene.background = null; // Set background to null for transparency

      // 2. Camera
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight, // Gunakan clientWidth/Height dari ref
        0.1,
        1000
      );
      camera.position.z = 10; // Posisi kamera sedikit lebih jauh

      // 3. Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
      renderer.setPixelRatio(window.devicePixelRatio); // Untuk kualitas render yang lebih baik
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      ); // Gunakan clientWidth/Height dari ref
      mountRef.current.appendChild(renderer.domElement);

      // Enable shadows
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

      // 4. Lighting
      // Hapus light1 dan light2 yang lama
      // Cahaya Ambient untuk penerangan dasar
      const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // Cahaya ambient umum, intensitas lebih tinggi
      scene.add(ambientLight);

      // Cahaya Directional untuk simulasi cahaya matahari / sumber cahaya utama
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Cahaya putih, intensitas sedang
      directionalLight.position.set(5, 10, 7); // Posisi cahaya
      directionalLight.castShadow = true; // Cahaya ini akan menghasilkan bayangan
      scene.add(directionalLight);

      // Konfigurasi bayangan untuk directionalLight
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;

      // PointLight tambahan untuk efek highlight atau warna
      const pointLight = new THREE.PointLight(0x3ad9a3, 0.5, 50); // Cahaya hijau, intensitas lebih rendah
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // 5. Create Particles (representing abstract financial elements)
      const geometry = new THREE.SphereGeometry(particleSize, 32, 32); // Bentuk bola dengan lebih banyak segmen untuk kehalusan
      for (let i = 0; i < numParticles; i++) {
        const randomColor =
          abstractColors[Math.floor(Math.random() * abstractColors.length)];
        // Menggunakan MeshStandardMaterial untuk PBR (Physically Based Rendering)
        const material = new THREE.MeshStandardMaterial({
          color: randomColor,
          roughness: 0.5, // Seberapa kasar permukaan (0=halus, 1=kasar)
          metalness: 0.2, // Seberapa metalik permukaan (0=non-metal, 1=metal)
          emissive: randomColor, // Efek cahaya sendiri (glow)
          emissiveIntensity: 0.05, // Intensitas glow lebih rendah
        });
        const particle = new THREE.Mesh(geometry, material);

        // Posisi acak dalam volume yang lebih besar
        particle.position.x = (Math.random() - 0.5) * 30; // Rentang lebih besar
        particle.position.y = (Math.random() - 0.5) * 30;
        particle.position.z = (Math.random() - 0.5) * 30;

        // Skala acak
        const scale = Math.random() * 0.5 + 0.5;
        particle.scale.set(scale, scale, scale);

        particle.castShadow = true; // Partikel menghasilkan bayangan
        particle.receiveShadow = true; // Partikel menerima bayangan

        particles.push(particle);
        scene.add(particle);
      }

      // Tambahkan bidang dasar untuk menerima bayangan
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.8,
        metalness: 0.1,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2; // Putar agar horizontal
      plane.position.y = -5; // Posisikan di bawah partikel
      plane.receiveShadow = true; // Bidang menerima bayangan
      scene.add(plane);
    };

    // --- Animation Loop ---
    let cameraAngle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotasi dan gerakkan partikel
      particles.forEach((particle) => {
        particle.rotation.x += particleSpeed * 0.5;
        particle.rotation.y += particleSpeed * 0.5;

        // Gerakan mengambang yang lebih kompleks
        particle.position.y +=
          Math.sin(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.x +=
          Math.cos(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.z +=
          Math.sin(Date.now() * 0.0007 + particle.id) * 0.01;

        // Reset posisi partikel jika terlalu jauh (simulasi tak terbatas)
        // Jarak reset disesuaikan dengan rentang posisi awal
        if (particle.position.length() > 20) {
          particle.position.x = (Math.random() - 0.5) * 30;
          particle.position.y = (Math.random() - 0.5) * 30;
          particle.position.z = (Math.random() - 0.5) * 30;
        }
      });

      // Gerakan kamera yang halus (mengorbit dan sedikit maju/mundur)
      cameraAngle += 0.0005;
      camera.position.x = Math.sin(cameraAngle) * 15;
      camera.position.z = Math.cos(cameraAngle) * 15;
      camera.position.y = Math.sin(cameraAngle * 0.7) * 5; // Gerakan naik turun
      camera.lookAt(scene.position); // Selalu melihat ke tengah scene

      renderer.render(scene, camera);
    };

    // --- Handle Window Resize ---
    const onWindowResize = () => {
      // Gunakan clientWidth/Height dari ref untuk ukuran renderer yang memenuhi layar
      if (mountRef.current) {
        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };

    // Inisialisasi Three.js saat komponen di-mount
    if (mountRef.current) {
      initThree();
      animate();
      window.addEventListener("resize", onWindowResize);
    }

    // Cleanup function: Hapus scene dan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
        // Hapus objek dari scene untuk mencegah kebocoran memori
        scene.traverse((object) => {
          if (!object.isMesh) return;
          object.geometry.dispose();
          object.material.dispose();
        });
        scene.clear();
      }
    };
  }, []); // Dependensi kosong agar efek hanya berjalan sekali saat mount/unmount

  return (
    <section
      id="home"
      // Menggunakan w-full h-full untuk memenuhi seluruh parent <main>
      // flex items-center justify-center untuk memusatkan konten secara vertikal dan horizontal
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Container untuk scene 3D */}
      <div
        ref={mountRef}
        // Fixed position agar memenuhi seluruh layar dan tidak terpengaruh scroll
        className="fixed inset-0 z-0"
        style={{ pointerEvents: "none" }} // Mencegah canvas menangkap event mouse
      ></div>

      {/* Konten teks dan tombol */}
      {/* p-10 max-w-4xl mx-auto text-center diterapkan pada div konten */}
      <div className="relative z-10 p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text leading-tight">
          Ayo Cek Kesehatan Finansialmu!
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          AuraFi adalah DApps inovatif yang membantu Anda melacak, menganalisis,
          dan meningkatkan kesehatan finansial Anda. Mulai perjalanan Anda
          menuju stabilitas keuangan sekarang.
        </p>
        {/* Tombol Login with Internet Identity hanya tampil jika user BELUM login */}
        {!user && (
          <button
            onClick={login}
            className="px-8 py-4 text-xl rounded-lg font-semibold text-white-default bg-gradient-to-r from-green-primary to-green-secondary shadow-lg hover:opacity-90 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 active:shadow-md"
          >
            Login with Internet Identity
          </button>
        )}
      </div>
    </section>
  );
}

export default HomePage;
