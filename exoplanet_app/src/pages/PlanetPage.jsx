import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import "./PlanetPage.css";
import * as THREE from "three";
import Chatbot from "../components/Chatbot";
import VideoComponent from "../components/VideoComponent";
import ExoplanetQuiz from "../components/Quiz";

// Simple modal component
function Modal({ isCentered, onExplore }) {
  return (
    <div className="modal">
      <h3>{isCentered ? "Visit System" : "Visit Planet"}</h3>
      <button onClick={onExplore}>{isCentered ? "Go Back" : "Explore"}</button> {/* Trigger explore mode */}
    </div>
  );
}

function InfoModal() {
  return (
    <div className="info-modal">
      <h3 style={{textAlign:"center"}}>Planet Information</h3>
      <p><strong>Type:</strong> Neptune-like</p>
      <p><strong>Star:</strong> Wasp-107 (K-Type)</p>
      <p><strong>Distance from Earth:</strong> 200 light years</p>
      <p><strong>Constellation:</strong> Virgo</p>
      <p><strong>Mass:</strong> 30.5 Earth Mass</p>
      <p><strong>Orbital Period:</strong> 5.7 days</p>
      <p><strong>Discovery Method:</strong> Transit</p>
      <p><strong>Description:</strong> Extended Helium Atmosphere</p>
      <img src="/graph.png" alt="Neptune" style={{width: "100%"}} />
      <p>Jessica Spake et al. Wie Field Camera 3 instrument on hubble Transit depth v Wavelength 98Angstrom wide bin centered on helium triplet at 1083Angstroms</p>
      <a href="https://ccnmtl.github.io/astro-simulations/exoplanet-transit-simulator/" target="_blank" rel="noreferrer">Learn more about Transit Simulation</a>
    </div>
  );
}

// Planet component that takes size, texture, and color as props
function Planet({ size, texture, color, distanceFromStar, onClick, isCentered }) {
  const planetTexture = useTexture(texture);
  const planetRef = useRef();

  // Rotate the planet around the star (orbit) if not in centered mode
  useFrame(({ clock }) => {
    if (!isCentered) {
      const t = clock.getElapsedTime();
      planetRef.current.position.x = distanceFromStar * Math.sin(t);
      planetRef.current.position.z = distanceFromStar * Math.cos(t);
    }
  });

  const arg_size = isCentered ? 7 : 1;

  return (
    <mesh
      ref={planetRef}
      scale={[size, size, size]}
      position={isCentered ? [0, 0, 0] : [distanceFromStar, 0, 0]} // Center if explore is clicked
      onClick={onClick}
    >
      <sphereGeometry args={[arg_size, 32, 32]} />
      <meshStandardMaterial map={planetTexture} color={color} />
      {/* Tooltip for the planet */}
      {!isCentered && (
        <Html position={[0, 1.5, 0]} center>
          <div className="tooltip"><p>Wasp-107B</p></div>
        </Html>
      )}
    </mesh>
  );
}

// Star component that emits light
function Star({ size, texture }) {
  const sunTexture = useTexture(texture);
  return (
    <group>
      <mesh scale={[size, size, size]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={new THREE.Color(0xffff00)}
          emissiveIntensity={1}
          emissiveMap={sunTexture}
        />
        <Html position={[0, 1.5, 0]} center>
          <div className="tooltip"><p>Wasp-107</p></div>
        </Html>
      </mesh>
      <pointLight intensity={50} distance={100} decay={2} color={0xfffaf0} />
    </group>
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

// Background stars
function StarsBackground({ count = 500 }) {
  const starPositions = new Float32Array(count * 3);

  // Generate random positions for each star
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 100; // Random value between -50 and 50
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;

    starPositions.set([x, y, z], i * 3);
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={starPositions} count={starPositions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} color="white" />
    </points>
  );
}

// Main PlanetPage component
export default function PlanetPage() {
  const starSize = 1.5;
  const planetSize = 0.5;
  const planetTexture = "/neptune.jpg"; // Replace with your texture path
  const sunTexture = "/sun.jpg";
  const planetColor = "blue";
  const planetDistanceFromStar = 5;

  const [isCentered, setIsCentered] = useState(false);

  // Close modal and trigger explore mode
  const handleExplore = () => {
    setIsCentered(!isCentered);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: isCentered ? [0, 0, 3] : [0, 10, 10], fov: 50 }}>
        <OrbitControls enablePan={!isCentered} enableZoom={!isCentered} />

        {!isCentered ? (<ambientLight intensity={0.3} />) : (<ambientLight intensity={1} />)}

        <StarsBackground count={1000} />

        {!isCentered && <Star size={starSize} texture={sunTexture} />}

        <pointLight intensity={50} distance={300} decay={2} />

        {!isCentered && <OrbitPath radius={planetDistanceFromStar} />}

        {/* Planet, toggle isCentered prop to switch views */}
        <Planet
          size={planetSize}
          texture={planetTexture}
          color={planetColor}
          distanceFromStar={planetDistanceFromStar}
          isCentered={isCentered}
        />
      </Canvas>

      <Modal onExplore={handleExplore} isCentered={isCentered}/>

      {isCentered && <InfoModal />}

      {isCentered && <VideoComponent videoSrc={"/wasp.mp4"} />}

      {isCentered && <div className="quiz-modal">
        <ExoplanetQuiz />  
      </div>}

      <Chatbot />
    </div>
  );
}
