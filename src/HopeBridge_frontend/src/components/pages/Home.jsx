import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fab, // Import fab (brands) for Bitcoin, Ethereum, etc.
} from "@fortawesome/free-brands-svg-icons";
import {
  fas, // Import fas (solid) for sack-dollar
} from "@fortawesome/free-solid-svg-icons";

// Add the necessary icons to the Font Awesome library
library.add(fab, fas); // Ensure both brand and solid icon sets are available

function HomePage() {
  const { user, login } = useOutletContext();
  const mountRef = useRef(null);
  let mouse = new THREE.Vector2(); // Declare mouse variable for interaction

  useEffect(() => {
    let scene, camera, renderer;
    let particles = [];
    const numParticles = 150; // Number of floating icons
    const particleSpeed = 0.005; // Speed of animation
    const particleSize = 1; // Size of each icon particle

    // Define abstract colors for the icons, matching your theme
    const iconColors = [
      0x3ad9a3, // green-primary
      0x0f7c5f, // green-secondary
      0x1abc9c, // green-accent-1
      0x2ecc71, // green-accent-2
      0x27ae60, // green-accent-3
      0x2c3e50, // green-accent-5 (dark blue-gray, for subtle background effect if desired)
    ];

    // Define ONLY the icons you want to use with their correct Unicode and font family
    const availableIcons = [
      { name: "bitcoin", unicode: "\uf15a", font: "'Font Awesome 6 Brands'" },
      { name: "ethereum", unicode: "\uf42e", font: "'Font Awesome 6 Brands'" },
      { name: "sack-dollar", unicode: "\uf81d", font: "'Font Awesome 6 Solid'" },
      // Removed other icons to only use the specified three.
    ];

    // Function to create a Three.js texture from a Font Awesome icon rendered on a 2D canvas
    const createIconTexture = (iconData, colorHex) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const size = 128; // Canvas size (must be a power of 2 for optimal WebGL textures)
      canvas.width = size;
      canvas.height = size;

      context.clearRect(0, 0, size, size); // Clear canvas to ensure transparency

      // Set font properties for drawing the Font Awesome icon
      context.font = `${size * 0.8}px ${iconData.font}`; // Icon size (80% of canvas) and font family
      context.textAlign = "center"; // Center horizontally
      context.textBaseline = "middle"; // Center vertically
      context.fillStyle = `#${colorHex.toString(16)}`; // Set the icon's color

      context.fillText(iconData.unicode, size / 2, size / 2); // Draw the icon character

      const texture = new THREE.CanvasTexture(canvas); // Create Three.js texture from canvas
      texture.needsUpdate = true; // Flag that the texture needs to be uploaded to GPU
      return texture;
    };

    const initThree = () => {
      // 1. Scene Setup: Where all objects, lights, and cameras reside
      scene = new THREE.Scene();
      scene.background = null; // Makes the canvas transparent, allowing CSS background to show

      // 2. Camera Setup: Defines the view of the scene
      camera = new THREE.PerspectiveCamera(
        75, // Field of view (vertical extent of the camera's view)
        mountRef.current.clientWidth / mountRef.current.clientHeight, // Aspect ratio
        0.1, // Near clipping plane (objects closer than this are not rendered)
        1000 // Far clipping plane (objects further than this are not rendered)
      );
      camera.position.z = 10; // Position the camera slightly back

      // 3. Renderer Setup: Draws the scene onto the canvas
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable anti-aliasing for smooth edges and alpha for transparency
      renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI (Retina) displays
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      ); // Set renderer size to fill its container
      mountRef.current.appendChild(renderer.domElement); // Add the renderer's canvas to the DOM

      // Configure shadows for a more realistic look
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use PCFSoftShadowMap for softer, more aesthetically pleasing shadows

      // 4. Lighting: Illuminates the scene
      const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // Soft, uniform light from all directions
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Light from a specific direction (like sunlight)
      directionalLight.position.set(5, 10, 7); // Position of the light
      directionalLight.castShadow = true; // This light will cast shadows
      scene.add(directionalLight);

      // Shadow properties for the directional light (optimizing shadow quality and extent)
      directionalLight.shadow.mapSize.width = 1024; // Resolution of the shadow map
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.5; // Near plane for shadow camera frustum
      directionalLight.shadow.camera.far = 50; // Far plane for shadow camera frustum
      directionalLight.shadow.camera.left = -10; // Frustum edges for shadow camera
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;

      const pointLight = new THREE.PointLight(0x3ad9a3, 0.5, 50); // A light that emits from a single point in all directions (accent light)
      pointLight.position.set(-5, 5, 5);
      scene.add(pointLight);

      // 5. Create Icon Particles: The animated floating elements
      const geometry = new THREE.PlaneGeometry(particleSize, particleSize); // Use a flat plane geometry for 2D icons

      for (let i = 0; i < numParticles; i++) {
        const randomIconData =
          availableIcons[Math.floor(Math.random() * availableIcons.length)]; // Randomly select an icon from our defined list
        const randomColorHex =
          iconColors[Math.floor(Math.random() * iconColors.length)]; // Randomly select a color from our palette
        const iconTexture = createIconTexture(randomIconData, randomColorHex); // Create the icon's texture

        const material = new THREE.MeshBasicMaterial({
          map: iconTexture, // Apply the icon texture
          transparent: true, // Enable transparency for the icon's shape
          alphaTest: 0.1, // A threshold for rendering transparent pixels (helps avoid artifacts)
          side: THREE.DoubleSide, // Render the plane from both front and back
        });

        const particle = new THREE.Mesh(geometry, material); // Create the 3D mesh for the particle

        // Assign a random initial position within a larger cubic volume
        particle.position.x = (Math.random() - 0.5) * 30;
        particle.position.y = (Math.random() - 0.5) * 30;
        particle.position.z = (Math.random() - 0.5) * 30;

        const scale = Math.random() * 0.5 + 0.7; // Apply a random initial scale for variation
        particle.scale.set(scale, scale, scale);

        particle.userData.originalScale = scale; // Store original scale for click animation reset
        particles.push(particle); // Add particle to array for animation loop
        scene.add(particle); // Add particle to the scene
      }

      // Add a large, subtle plane at the bottom to receive shadows
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a, // Very dark gray/black
        roughness: 0.8, // Slightly rough surface
        metalness: 0.1, // Not very metallic
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
      plane.position.y = -5; // Position below the particles
      plane.receiveShadow = true; // This plane will receive shadows cast by other objects
      scene.add(plane);
    };

    // --- Mouse Event Handlers ---
    // Update mouse coordinates for raycasting (detecting clicks on 3D objects)
    const onMouseMove = (event) => {
      // Calculate mouse position relative to the canvas element itself (mountRef)
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; // Normalize X to -1 to +1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1; // Normalize Y to -1 to +1 (Y-axis is inverted in WebGL)
    };

    const onMouseDown = (event) => {
      if (event.button !== 0) return; // Only trigger on left mouse button click

      const raycaster = new THREE.Raycaster(); // Create a new raycaster
      raycaster.setFromCamera(mouse, camera); // Set raycaster from camera and mouse position
      const intersects = raycaster.intersectObjects(particles); // Find objects intersected by the ray

      if (intersects.length > 0) {
        const intersectedParticle = intersects[0].object; // Get the first intersected object

        if (!intersectedParticle.userData.isClicked) {
          intersectedParticle.userData.isClicked = true; // Set a flag to prevent multiple rapid clicks
          intersectedParticle.userData.clickedTime = Date.now(); // Record click time for animation
          // Reset the click flag after a short delay
          setTimeout(() => {
            intersectedParticle.userData.isClicked = false;
          }, 200);
        }
      }
    };

    // --- Animation Loop ---
    let cameraAngle = 0; // For camera orbiting animation
    const animate = () => {
      requestAnimationFrame(animate); // Request the next frame from the browser

      particles.forEach((particle) => {
        particle.lookAt(camera.position); // Make each particle always face the camera (billboard effect)

        // Apply a smooth, undulating floating movement using sine and cosine waves
        particle.position.y +=
          Math.sin(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.x +=
          Math.cos(Date.now() * 0.0005 + particle.id) * 0.01;
        particle.position.z +=
          Math.sin(Date.now() * 0.0007 + particle.id) * 0.01;

        // If a particle drifts too far from the center, reset its position to create an infinite effect
        if (particle.position.length() > 20) {
          particle.position.x = (Math.random() - 0.5) * 30;
          particle.position.y = (Math.random() - 0.5) * 30;
          particle.position.z = (Math.random() - 0.5) * 30;
        }

        // Handle particle click animation (scale up and then back down)
        if (particle.userData.clickedTime) {
          const elapsedTime = Date.now() - particle.userData.clickedTime;
          const duration = 500; // Animation duration in milliseconds
          const maxScaleFactor = 1.5; // Maximum scale increase

          if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            // Use a sine function for a smooth "bounce" or ease-in-out scaling effect
            const scaleFactor =
              1 + Math.sin(progress * Math.PI) * (maxScaleFactor - 1);
            particle.scale.setScalar(
              scaleFactor * particle.userData.originalScale
            );
          } else {
            // Reset to original scale after the animation completes
            particle.scale.setScalar(particle.userData.originalScale);
            particle.userData.clickedTime = null; // Clear the clickedTime to end the animation
          }
        }
      });

      // Camera orbiting around the center of the scene
      cameraAngle += 0.0005;
      camera.position.x = Math.sin(cameraAngle) * 15;
      camera.position.z = Math.cos(cameraAngle) * 15;
      camera.position.y = Math.sin(cameraAngle * 0.7) * 5; // Adds a subtle up/down motion
      camera.lookAt(scene.position); // Always point the camera towards the center

      renderer.render(scene, camera); // Render the current state of the scene
    };

    // --- Handle Window Resize ---
    // Adjust camera aspect ratio and renderer size when the window is resized
    const onWindowResize = () => {
      if (mountRef.current) {
        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix(); // Update the camera's projection matrix to reflect new aspect ratio
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };

    // Initialize Three.js scene and add event listeners when the component mounts
    if (mountRef.current) {
      initThree();
      animate(); // Start the animation loop
      window.addEventListener("mousemove", onMouseMove); // For mouse interaction with particles
      window.addEventListener("mousedown", onMouseDown); // For clicking on particles
      window.addEventListener("resize", onWindowResize); // For responsive rendering
    }

    // Cleanup function: Executed when the component unmounts to prevent memory leaks
    return () => {
      // Remove all added event listeners
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current && renderer) {
        // Safely remove the renderer's canvas from the DOM
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose(); // Dispose of the WebGL context and free GPU memory
        // Traverse the scene and dispose of geometries and materials to prevent memory leaks
        scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose(); // Dispose mesh geometry
            if (object.material.map) object.material.map.dispose(); // Dispose texture if present
            object.material.dispose(); // Dispose mesh material
          }
        });
        scene.clear(); // Clear the entire scene graph
      }
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount and unmount

  return (
    <section
      id="home"
      className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Container for the Three.js 3D animation */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-0" // Fixed position to cover the whole screen, behind other content
        style={{ pointerEvents: "none" }} // Prevents the canvas from interfering with mouse events on content above it
      ></div>

      {/* Main content layer, positioned above the Three.js animation */}
      <div className="relative z-10 p-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text leading-tight">
          Check Your Financial Health!
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          AuraFi is an innovative DApp that helps you track, analyze, and
          improve your financial health. Start your journey towards financial
          stability now.
        </p>
        {/* Login button, only displayed if the user is not logged in */}
        {!user && (
          <button
            onClick={login} // Trigger login function from context
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