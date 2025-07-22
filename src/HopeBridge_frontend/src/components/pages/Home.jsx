import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import * as THREE from "three"; // Import Three.js

function HomePage() {
  const { user, login } = useOutletContext();
  const mountRef = useRef(null); // Ref for the DOM element where the 3D scene will be mounted

  useEffect(() => {
    // --- Setup Three.js Scene ---
    let scene, camera, renderer;
    let particles = []; // Array to store particle objects
    const numParticles = 150; // Number of particles
    const particleSpeed = 0.005; // Animation speed of particles
    const particleSize = 0.15; // Size of particles

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

    // Three.js Raycaster and Mouse Vector for interaction
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    const initThree = () => {
      // 1. Scene
      scene = new THREE.Scene();
      scene.background = null; // Set background to null for transparency

      // 2. Camera
      camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight, // Use clientWidth/Height of the ref
        0.1,
        1000
      );
      camera.position.z = 10; // Slightly further camera position

      // 3. Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
      renderer.setPixelRatio(window.devicePixelRatio); // For better render quality
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      ); // Use clientWidth/Height of the ref
      mountRef.current.appendChild(renderer.domElement);

      // Enable shadows
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

      // 4. Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // General ambient light, higher intensity
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // White light, medium intensity
      directionalLight.position.set(5, 10, 7); // Light position
      directionalLight.castShadow = true; // This light will cast shadows
      scene.add(directionalLight);

      // Shadow configuration for directionalLight
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;

      const pointLight = new THREE.PointLight(0x3ad9a3, 0.5, 50); // Green light, lower intensity
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // 5. Create Particles (representing abstract financial elements)
      const geometry = new THREE.SphereGeometry(particleSize, 32, 32); // Sphere shape with more segments for smoothness
      for (let i = 0; i < numParticles; i++) {
        const randomColor =
          abstractColors[Math.floor(Math.random() * abstractColors.length)];
        // Using MeshStandardMaterial for PBR (Physically Based Rendering)
        const material = new THREE.MeshStandardMaterial({
          color: randomColor,
          roughness: 0.5, // How rough the surface is (0=smooth, 1=rough)
          metalness: 0.2, // How metallic the surface is (0=non-metal, 1=metal)
          emissive: randomColor, // Self-illuminating effect (glow)
          emissiveIntensity: 0.05, // Glow intensity
        });
        const particle = new THREE.Mesh(geometry, material);

        // Random position within a larger volume
        particle.position.x = (Math.random() - 0.5) * 30; // Larger range
        particle.position.y = (Math.random() - 0.5) * 30;
        particle.position.z = (Math.random() - 0.5) * 30;

        // Random scale
        const scale = Math.random() * 0.5 + 0.5;
        particle.scale.set(scale, scale, scale);

        particle.castShadow = true; // Particle casts shadows
        particle.receiveShadow = true; // Particle receives shadows

        // Store original data for click effect
        particle.userData.originalColor = material.color.clone();
        particle.userData.originalEmissive = material.emissive.clone();
        particle.userData.originalScale = scale;

        particles.push(particle);
        scene.add(particle);
      }

      // Add a base plane to receive shadows
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.8,
        metalness: 0.1,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
      plane.position.y = -5; // Position below particles
      plane.receiveShadow = true; // Plane receives shadows
      scene.add(plane);
    };

    // --- Mouse Event Handlers ---
    const onMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (event) => {
      // Only react to left click
      if (event.button !== 0) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(particles);

      if (intersects.length > 0) {
        const intersectedParticle = intersects[0].object;

        // Effect for color and scale change on click
        if (!intersectedParticle.userData.isClicked) {
          intersectedParticle.userData.isClicked = true;
          intersectedParticle.material.emissive.setHex(0xffffff); // Bright white glow on click
          intersectedParticle.userData.clickedTime = Date.now(); // Mark click time for animation

          // Revert color and reset isClicked after a delay
          setTimeout(() => {
            intersectedParticle.material.emissive.copy(
              intersectedParticle.userData.originalEmissive
            );
            intersectedParticle.userData.isClicked = false;
          }, 200); // Revert after 200ms
        }
      }
    };

    // --- Animation Loop ---
    let cameraAngle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate and move particles
      particles.forEach((particle) => {
        particle.rotation.x += particleSpeed * 0.5;
        particle.rotation.y += particleSpeed * 0.5;

        // More complex floating movement
        particle.position.y +=
          Math.sin(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.x +=
          Math.cos(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.z +=
          Math.sin(Date.now() * 0.0007 + particle.id) * 0.01;

        // Reset particle position if too far (infinite simulation)
        if (particle.position.length() > 20) {
          particle.position.x = (Math.random() - 0.5) * 30;
          particle.position.y = (Math.random() - 0.5) * 30;
          particle.position.z = (Math.random() - 0.5) * 30;
        }

        // Scale animation when clicked
        if (particle.userData.clickedTime) {
          const elapsedTime = Date.now() - particle.userData.clickedTime;
          const duration = 500; // Animation duration in ms
          const maxScaleFactor = 1.5; // Max scale factor

          if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            // Use sine function for a smooth "bounce" effect
            const scaleFactor =
              1 + Math.sin(progress * Math.PI) * (maxScaleFactor - 1);
            particle.scale.setScalar(scaleFactor * particle.userData.originalScale);
          } else {
            // Reset scale to original size after animation
            particle.scale.setScalar(particle.userData.originalScale);
            particle.userData.clickedTime = null; // End animation
          }
        }
      });

      // Smooth camera movement (orbiting and slight up/down)
      cameraAngle += 0.0005;
      camera.position.x = Math.sin(cameraAngle) * 15;
      camera.position.z = Math.cos(cameraAngle) * 15;
      camera.position.y = Math.sin(cameraAngle * 0.7) * 5; // Up-down movement
      camera.lookAt(scene.position); // Always look at the center of the scene

      renderer.render(scene, camera);
    };

    // --- Handle Window Resize ---
    const onWindowResize = () => {
      // Use clientWidth/Height of ref for renderer size that fills the screen
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

    // Initialize Three.js when component mounts
    if (mountRef.current) {
      initThree();
      animate();
      // Add event listeners for mouse interaction
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("resize", onWindowResize);
    }

    // Cleanup function: Remove scene and event listeners when component unmounts
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
        // Dispose objects from scene to prevent memory leaks
        scene.traverse((object) => {
          if (!object.isMesh) return;
          object.geometry.dispose();
          object.material.dispose();
        });
        scene.clear();
      }
    };
  }, []); // Empty dependency array so effect runs only once on mount/unmount

  return (
    <section
      id="home"
      // Use w-screen h-screen to fill the entire viewport
      // flex items-center justify-center to center content vertically and horizontally
      className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Container for the 3D scene */}
      <div
        ref={mountRef}
        // Fixed position to fill the entire screen and not be affected by scroll
        className="fixed inset-0 z-0"
        style={{ pointerEvents: "none" }} // Prevent canvas from capturing mouse events
      ></div>

      {/* Text content and button */}
      <div className="relative z-10 p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text leading-tight">
          Check Your Financial Health!
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          AuraFi is an innovative DApp that helps you track, analyze, and
          improve your financial health. Start your journey towards financial
          stability now.
        </p>
        {/* Login with Internet Identity button only shown if user is NOT logged in */}
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
