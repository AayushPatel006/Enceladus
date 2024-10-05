import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei'; // For placing HTML elements in the 3D space
import clickSound from '/sound.mp3';
import './HUD.css'; // Ensure you have the same CSS file for consistent styling

// Preload audio file
const typingAudio = new Audio(clickSound); // Initialize typing audio
const clickAudio = new Audio(clickSound); // Initialize click audio

const FuturisticScreen = ({ onPlanetSelect }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'What planet do you want to visit?';
  const [currentIndex, setCurrentIndex] = useState(0);
  const planetTypes = ['Gas Giants', 'Super Earths', 'Terrestrial', 'Neptune-like'];
  const [isInteracted, setIsInteracted] = useState(false); // Track user interaction

  // Typewriter effect with typing sound
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);

        if (isInteracted) { // Only play sound if user interacted
          typingAudio.play().catch((error) => console.error('Audio playback error:', error));
        }
      }, 100); // Adjust speed as necessary
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isInteracted]); // Depend on isInteracted

  // Click sound for button
  const handleClick = (planet) => {
    clickAudio.currentTime = 0; // Reset click sound
    clickAudio.play().catch((error) => console.error('Audio playback error:', error)); // Play click sound
    onPlanetSelect(planet);
  };

  // User interaction handler
  const handleInteraction = () => {
    setIsInteracted(true); // Mark that user has interacted
  };

  // Adding event listener for user interaction
  useEffect(() => {
    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <Html position={[0.3816313628563971, -0.00506837456088085, 2.8876587670825806]} transformScale={0.5}>
      <div style={styles.screenContainer}>
        <h1 style={styles.typewriterText}>{typedText}</h1>
        <div style={styles.buttonContainer}>
          {planetTypes.map((planetType) => (
            <button
              key={planetType}
              onClick={() => handleClick(planetType)}
              style={styles.planetButton}
            >
              {planetType}
            </button>
          ))}
        </div>
      </div>
    </Html>
  );
};

// Futuristic HUD-like styling
const styles = {
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 50, 0.5)', // Semi-transparent dark blue background
    borderRadius: '15px',
    padding: '20px',
    border: '2px solid #00FFFF', // Neon blue border for futuristic look
    boxShadow: '0px 0px 15px 5px #00FFFF', // Glowing effect
    color: 'white',
    width: '400px', // Adjust the width to fit the buttons
  },
  typewriterText: {
    fontFamily: 'Orbitron, sans-serif', // Use Orbitron for a consistent font
    fontSize: '22px',
    color: '#00FFFF', // Neon blue text for futuristic effect
    textShadow: '0px 0px 5px #00FFFF',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Space between buttons
  },
  planetButton: {
    padding: '10px 20px',
    backgroundColor: '#001F3F', // Dark blue for button
    border: '2px solid #00FFFF', // Neon border for button
    color: '#00FFFF', // Neon blue text
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '8px',
    textShadow: '0px 0px 2px #00FFFF',
    transition: 'transform 0.2s', // Smooth hover effect
  },
};

export default FuturisticScreen;
