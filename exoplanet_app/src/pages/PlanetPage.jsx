import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

// Planet component that takes size, texture, and color as props
function Planet({ size, texture, color }) {
  // Load texture using useTexture hook
  const planetTexture = useTexture(texture);

  return (
    <mesh scale={[size, size, size]} position={[0, 0, 0]}>
      {/* Sphere geometry for the planet */}
      <sphereGeometry args={[1, 32, 32]} />
      
      {/* Material for the planet (color or texture) */}
      <meshStandardMaterial map={planetTexture} color={color} />
    </mesh>
  );
}

// Main PlanetPage component
export default function PlanetPage() {
  // Example props: size, texture (from public folder), and color
  const size = 1;
  const texture = "/texture.png"; // Replace with your texture path
  const color = "pink"; // Optional, used if texture is not provided

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* 3D canvas */}
      <Canvas>
        {/* OrbitControls allows mouse interaction (zoom, rotate) */}
        <OrbitControls />
        
        {/* Lighting for the planet */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Render the planet with provided props */}
        <Planet size={size} texture={texture} color={color} />
      </Canvas>
    </div>
  );
}
