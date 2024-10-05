import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

// Component to load and display the .glb model
const Model = () => {
  const { scene } = useGLTF('/models/CubeSat.glb');
  return <primitive object={scene} scale={1.5} />;
};

// Main component to setup the Three.js scene
const MyThree = () => {
  return (
    <div className="canvas-container">
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model />
      <OrbitControls />
    </Canvas>
    </div>
  );
};

export default MyThree;