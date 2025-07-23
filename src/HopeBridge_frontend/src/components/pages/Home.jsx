import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import * as THREE from "three";

// Create an instance of Three.js TextureLoader
const textureLoader = new THREE.TextureLoader();

function HomePage() {
  const { user, login } = useOutletContext();
  const mountRef = useRef(null);
  let mouse = new THREE.Vector2(); // Declare mouse variable for interaction

  useEffect(() => {
    let scene, camera, renderer;
    let particles = [];
    const numParticles = 150; // Number of floating icons
    const particleSpeed = 0.005; // Speed of animation
    const particleBaseSize = 1.5; // Base size for particles

    // Define abstract colors for the icons, matching your theme
    const iconColors = [
      0x3ad9a3, // green-primary
      0x0f7c5f, // green-secondary
      0x1abc9c, // green-accent-1
      0x2ecc71, // green-accent-2
      0x27ae60, // green-accent-3
      0x2c3e50, // green-accent-5 (dark blue-gray, for subtle background effect if desired)
    ];

    // Define the list of paths to your SVG icon files in public/Crypto
    // This list is generated based on the file names from your provided images.
    const availableIconPaths = [
      "/Crypto/ada.svg",
      "/Crypto/Audiocoin.svg",
      "/Crypto/Aurouracoin.svg",
      "/Crypto/Bitcoincash.svg",
      "/Crypto/BitcoinGold.svg",
      "/Crypto/Bitcoin.svg",
      "/Crypto/Bitconnect.svg",
      "/Crypto/Bitshares.svg",
      "/Crypto/Dash.svg",
      "/Crypto/decred.svg", // Note: "decred copy" might be a typo for "decred.svg"
      "/Crypto/Devcoin.svg",
      "/Crypto/DOGE.svg", // Assuming this is Dogecoin
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
      "/Crypto/Omnisego.svg", // Note: "Omnise go" might be specific
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
      "/Crypto/ven.svg", // Assuming this is VeChain
      "/Crypto/Verge.svg",
      "/Crypto/Vertcoin.svg",
      "/Crypto/WAVES.svg",
      "/Crypto/xrp.svg", // Assuming this is Ripple
      "/Crypto/xtz.svg", // Assuming this is Tezos
      "/Crypto/ZcashWallet.svg", // Assuming this is Zcash
      // Note: "crypto-coins.svg" from your previous input seems to be a composite file.
      // If you intend to use individual icons from it, they must be exported as separate SVGs.
      // For now, I'm excluding it as it's not a single distinct crypto icon in the same way as others.
    ];

    // Function to create a Three.js texture from an image (PNG/SVG) loaded via its path
    const createTextureFromImage = (imagePath, callback) => {
      textureLoader.load(
        imagePath,
        (texture) => {
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          // Store original aspect ratio (width / height) for correct plane scaling
          if (texture.image && texture.image.width && texture.image.height) {
            texture.userData.aspectRatio =
              texture.image.width / texture.image.height;
          } else {
            texture.userData.aspectRatio = 1; // Default to 1:1 if aspect ratio cannot be determined
          }
          if (callback) callback(texture);
        },
        undefined, // Progress callback (optional)
        (err) => {
          console.error(`Error loading texture ${imagePath}:`, err);
        }
      );
    };

    const initThree = () => {
      scene = new THREE.Scene();
      scene.background = null;

      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      mountRef.current.appendChild(renderer.domElement);

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 7);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;

      const pointLight = new THREE.PointLight(0x3ad9a3, 0.5, 50);
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // Load all textures asynchronously
      const texturePromises = availableIconPaths.map(
        (path) =>
          new Promise((resolve) => {
            createTextureFromImage(path, (texture) => {
              resolve(texture);
            });
          })
      );

      Promise.all(texturePromises).then((loadedTextures) => {
        // Only create particles after all textures are loaded
        for (let i = 0; i < numParticles; i++) {
          const randomTexture =
            loadedTextures[Math.floor(Math.random() * loadedTextures.length)];

          // Adjust plane geometry based on icon's aspect ratio
          const currentParticleGeometry = new THREE.PlaneGeometry(
            particleBaseSize * randomTexture.userData.aspectRatio,
            particleBaseSize
          );

          const material = new THREE.MeshBasicMaterial({
            map: randomTexture,
            transparent: true,
            alphaTest: 0.1,
            side: THREE.DoubleSide,
            // You can optionally apply a color tint to the icon here
            // color: new THREE.Color(iconColors[Math.floor(Math.random() * iconColors.length)]),
          });

          const particle = new THREE.Mesh(currentParticleGeometry, material);

          particle.position.x = (Math.random() - 0.5) * 30;
          particle.position.y = (Math.random() - 0.5) * 30;
          particle.position.z = (Math.random() - 0.5) * 30;

          const scale = Math.random() * 0.5 + 0.7;
          particle.scale.set(scale, scale, scale);

          particle.userData.originalScale = scale;
          particles.push(particle);
          scene.add(particle);
        }
      });

      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.8,
        metalness: 0.1,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -5;
      plane.receiveShadow = true;
      scene.add(plane);
    };

    const onMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onMouseDown = (event) => {
      if (event.button !== 0) return;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(particles);

      if (intersects.length > 0) {
        const intersectedParticle = intersects[0].object;

        if (!intersectedParticle.userData.isClicked) {
          intersectedParticle.userData.isClicked = true;
          intersectedParticle.userData.clickedTime = Date.now();
          setTimeout(() => {
            intersectedParticle.userData.isClicked = false;
          }, 200);
        }
      }
    };

    let cameraAngle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      particles.forEach((particle) => {
        particle.lookAt(camera.position);

        particle.position.y +=
          Math.sin(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.x +=
          Math.cos(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.z +=
          Math.sin(Date.now() * 0.0007 + particle.id) * 0.01;

        if (particle.position.length() > 20) {
          particle.position.x = (Math.random() - 0.5) * 30;
          particle.position.y = (Math.random() - 0.5) * 30;
          particle.position.z = (Math.random() - 0.5) * 30;
        }

        if (particle.userData.clickedTime) {
          const elapsedTime = Date.now() - particle.userData.clickedTime;
          const duration = 500;
          const maxScaleFactor = 1.5;

          if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const scaleFactor =
              1 + Math.sin(progress * Math.PI) * (maxScaleFactor - 1);
            particle.scale.setScalar(
              scaleFactor * particle.userData.originalScale
            );
          } else {
            particle.scale.setScalar(particle.userData.originalScale);
            particle.userData.clickedTime = null;
          }
        }
      });

      cameraAngle += 0.0005;
      camera.position.x = Math.sin(cameraAngle) * 15;
      camera.position.z = Math.cos(cameraAngle) * 15;
      camera.position.y = Math.sin(cameraAngle * 0.7) * 5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
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

    if (mountRef.current) {
      initThree();
      animate();
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("resize", onWindowResize);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current && renderer) {
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose();
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        });
        scene.clear();
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div
        ref={mountRef}
        className="fixed inset-0 z-0"
        style={{ pointerEvents: "none" }}
      ></div>

      <div className="relative z-10 p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text leading-tight">
          Check Your Financial Health!
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          AuraFi is an innovative DApp that helps you track, analyze, and
          improve your financial health. Start your journey towards financial
          stability now.
        </p>
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
