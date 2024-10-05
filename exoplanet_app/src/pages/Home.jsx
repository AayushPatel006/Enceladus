import React from 'react';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import SpaceScene from '../components/Spacefile.jsx'; // Import your 3D scene
import HUD from '../components/Hud.jsx'; // Import HUD

function App() {
  const [clickPosition, setClickPosition] = React.useState(null);
  return (
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
}

export default App;
