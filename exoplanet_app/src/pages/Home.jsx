// App.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import SpaceScene from '../components/Spacefile.jsx'; // Import your 3D scene
import HUD from '../components/Hud.jsx'; // Import HUD
import TransitionVideoBackground from '../components/TransitionVideo.jsx';
// Import the Chatbot component
import Chatbot from '../components/Chatbot.jsx'; // Import your Chatbot component
import VideoComponent from '../components/VideoComponent.jsx';

function App() {
  const [clickPosition, setClickPosition] = React.useState(null);
  const [transitionState, setTransitionState] = React.useState(false);
  
  // Log or perform actions based on the transitionState
  useEffect(() => {
    console.log('Transition state updated:', transitionState);
    if (transitionState) {
      setTimeout(() => {
        setTransitionState(false)
      }, 12000);    
    }
  }, [transitionState]);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet"></link>
      <Canvas>
        Lighting
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} />
        
        {transitionState && <TransitionVideoBackground />}
        {/* The 3D content */}
        <SpaceScene clickPosition={clickPosition} setClickPosition={setClickPosition} setTransitionState={setTransitionState} />
      </Canvas>
      <HUD 
        clickPosition={clickPosition} 
        speed={'1'} 
        destination={'GasGiants'} 
        temperature={'150 '} 
      />

      <VideoComponent videoSrc={'/home.mp4'} />
      {/* Add the Chatbot component here */}
      <Chatbot /> {/* Ensure the Chatbot is rendered here */}
    </div>
  );
}

export default App;