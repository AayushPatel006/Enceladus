import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from 'three';

// Planet component that takes size, texture, and color as props
function Planet({ size, texture, color, distanceFromStar }) {
  const planetTexture = useTexture(texture);
  const planetRef = useRef();
  
  // Rotate the planet around the star (orbit)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Calculate the planet's position based on time
    planetRef.current.position.x = distanceFromStar * Math.sin(t); // Horizontal movement
    planetRef.current.position.z = distanceFromStar * Math.cos(t); // Circular movement
  });

  return (
    <mesh ref={planetRef} scale={[size, size, size]} position={[distanceFromStar, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={planetTexture} color={color} />
    </mesh>
  );
}

// Star component that emits light
function Star({ size, color }) {
  return (
    <mesh scale={[size, size, size]}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* Material for star (emissive to make it glow) */}
      <meshStandardMaterial emissive={color} emissiveIntensity={1.5} color={color} />
      {/* Light emitted from the star */}
      <pointLight intensity={3} distance={100} decay={2} />
    </mesh>
  );
}

// OrbitPath component to visually show the orbit as a circle
function OrbitPath({ radius }) {
  const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  
  const orbitLine = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={orbitLine}>
      <lineBasicMaterial color="white" />
    </line>
  );
}

// Component for rendering random background stars
function StarsBackground({ count = 500 }) {
  const starPositions = new Float32Array(count * 3); // 3 coordinates per star (x, y, z)
  
  // Generate random positions for each star
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 100;  // Random value between -50 and 50
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    
    starPositions.set([x, y, z], i * 3);
  }

  return (
    <points>
      {/* Star geometry as small points in space */}
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={starPositions} count={starPositions.length / 3} itemSize={3} />
      </bufferGeometry>
      {/* Small white dots for stars */}
      <pointsMaterial size={0.2} color="white" />
    </points>
  );
}

export default function PlanetPage() {
  // Example properties for the star and planet
  const starSize = 1.5;
  const starColor = "yellow";
  const planetSize = 0.5;
  const planetTexture = "/texture.png"; // Replace with your texture path
  const planetColor = "blue";
  const planetDistanceFromStar = 5;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
        <OrbitControls />
        
        {/* Ambient light for some background lighting */}
        <ambientLight intensity={0.1} />

        {/* Background stars */}
        <StarsBackground count={1000} /> {/* Increase count for more stars */}
        
        {/* Star as the center and light source */}
        <Star size={starSize} color={starColor} />

        {/* Orbit Path around the star */}
        <OrbitPath radius={planetDistanceFromStar} />

        {/* Planet revolving around the star */}
        <Planet size={planetSize} texture={planetTexture} color={planetColor} distanceFromStar={planetDistanceFromStar} />
      </Canvas>
    </div>
  );
}
