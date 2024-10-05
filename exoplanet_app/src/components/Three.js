import React, { useEffect } from 'react';
import { Canvas, useLoader,useThree } from '@react-three/fiber'; // Import useLoader from fiber
import { OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE for TextureLoader
import SpaceScene from './Spacefile.jsx'; // Import your 3D scene
import HUD from './Hud.jsx'; // Import HUD

// Component to load and display the .glb model
const Model = () => {
  const { scene } = useGLTF('/models/spacefighter_1k.glb');
//   const { scene } = useGLTF('/models/space_figter.glb');
  return <primitive object={scene} position={[0, -4, 3]} scale={1.5} rotation={[0, Math.PI+0.001, 0]} />;
};

// Custom background setup function
const Background = () => {
    const { scene } = useThree();
    const texture = useLoader(THREE.TextureLoader, '/background/bg_8k.jpg'); // Correct path
  
    // Set background image when the component is mounted
    useEffect(() => {
      scene.background = texture;
    }, [texture, scene]);
  
    return null;
  };

// Main component to setup the Three.js scene
const MyThree = () => {
  const [clickPosition, setClickPosition] = React.useState(null);

  return (
    // <div className="canvas-container">
    // <Canvas>
    //   <ambientLight intensity={0.9} />
    //   <directionalLight position={[0, 70, 50]} intensity={7} />
    //   <Background />
    //   {/* Setting the scene background */}
    //   <Model />
    //   <OrbitControls 
    //   target={[0, -1, 0]} // Lock camera focus on the origin
    //   enablePan={false}   // Disable panning
    //   enableZoom={false}   // Optional: Disable zoom with enableZoom={false}
    //   minPolarAngle={-Math.PI / 2.2}  // Limit how far the camera can look up
    //   maxPolarAngle={Math.PI / 2.2} // Limit how far the camera can look down
    //   minAzimuthAngle={-Math.PI / 50} // Optional: Limit rotation around Y-axis (left)
    //   maxAzimuthAngle={Math.PI / 50}  // Optional: Limit rotation around Y-axis (right)
    //   />
    // </Canvas>
    // </div>
    <div style={{ height: '100vh', width: '100vw' }}>
          <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet"></link>
          <Canvas>
            Lighting
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={3} />
            
          
            
            {/* The 3D content */}
            <SpaceScene  setClickPosition={setClickPosition} />
          </Canvas>
          <HUD 
      clickPosition={clickPosition} 
      speed={'1 parsec '} 
      destination={'GasGiants'} 
      temperature={'300K'} 
    />
    </div>
  );
};

export default MyThree; 