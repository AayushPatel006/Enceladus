import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei'; // For placing HTML elements in the 3D space
import clickSound from '/sound.mp3';
import './HUD.css'; // Ensure you have the same CSS file for consistent styling
import ExoplanetQuiz from './Quiz.jsx'; // Ensure the path is correct

// Preload audio file
const typingAudio = new Audio(clickSound);
const clickAudio = new Audio(clickSound);

const FuturisticScreen = ({ onPlanetSelect, setTransitionState }) => {
    const [typedText, setTypedText] = useState('');
    const fullText = 'Select Planet to visit:';
    const [currentIndex, setCurrentIndex] = useState(0);
    const planetTypes = ['Gas Giants', 'Super Earths', 'Terrestrial', 'Neptune-like'];
    const [isInteracted, setIsInteracted] = useState(false);
    const [quizOpen, setQuizOpen] = useState(false);
    const [selectedExoplanet, setSelectedExoplanet] = useState(null); // New state for selected exoplanet
    const [isFloatingWindowOpen, setIsFloatingWindowOpen] = useState(false); // New state for floating window visibility

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timer = setTimeout(() => {
                setTypedText((prev) => prev + fullText[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);

                if (isInteracted) {
                    typingAudio.play().catch((error) => console.error('Audio playback error:', error));
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, isInteracted]);

    const handleClick = (planet) => {
        clickAudio.currentTime = 0;
        clickAudio.play().catch((error) => console.error('Audio playback error:', error));
        setSelectedExoplanet(planet); // Set the selected exoplanet
        setIsFloatingWindowOpen(true); // Open the floating window
        setTransitionState(true);
        onPlanetSelect(planet);
    };

    const handleInteraction = () => {
        setIsInteracted(true);
    };

    useEffect(() => {
        window.addEventListener('click', handleInteraction);
        return () => {
            window.removeEventListener('click', handleInteraction);
        };
    }, []);

    const toggleQuiz = () => {
        setQuizOpen(!quizOpen);
        clickAudio.currentTime = 0;
        clickAudio.play().catch((error) => console.error('Audio playback error:', error));
    };

    // New function to close the floating window
    const closeFloatingWindow = () => {
        setIsFloatingWindowOpen(false);
        setSelectedExoplanet(null); // Clear the selected exoplanet
    };

    // New floating window component
    const FloatingWindow = () => {
        if (!isFloatingWindowOpen || !selectedExoplanet) return null; 

        const exoplanetToTravel = {
            'Gas Giants': "Kepler-138d", 
            'Super Earths': "Proxima Centauri b", 
            'Terrestrial': "TOI-849b", 
            'Neptune-like': "Phoenix"
        }

        return (
            <div style={styles.floatingWindow} onClick={(e) => e.stopPropagation()}>
                <h2>{selectedExoplanet}</h2>
                <p>{getExoplanetType(selectedExoplanet)}</p>
                <button onClick={() => window.location.href = '/planet'}>Go to {exoplanetToTravel[selectedExoplanet]}</button>
            </div>
        );
    };

    // Effect to handle clicks outside the floating window
    useEffect(() => {
        const handleClickOutside = (event) => {
            const floatingWindow = document.getElementById('floating-window');
            if (floatingWindow && !floatingWindow.contains(event.target)) {
                closeFloatingWindow();
            }
        };

        if (isFloatingWindowOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isFloatingWindowOpen]);

    // Function to get exoplanet type based on the selected planet
    const getExoplanetType = (planet) => {
        const types = {
            'Gas Giants': 'Large planets with thick atmospheres',
            'Super Earths': 'Planets larger than Earth but smaller than gas giants',
            'Terrestrial': 'Rocky planets similar to Earth',
            'Neptune-like': 'Planets with characteristics similar to Neptune',
        };
        return types[planet] || 'Unknown type';
    };

    return (
        <Html position={[1.2, 1, 2.8876587670825806]} transformScale={0.1}>
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
                    
                    <button onClick={toggleQuiz} style={styles.quizButton}>
                      {quizOpen && "Quiz ʌ"}
                      {!quizOpen && "Quiz v"}
                    </button>
                </div>
                {quizOpen && <ExoplanetQuiz onClose={toggleQuiz} />}
                <FloatingWindow id="floating-window" /> {/* Render the floating window */}
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
        backgroundColor: 'rgba(0, 0, 50, 0.5)',
        borderRadius: '15px',
        padding: '20px',
        border: '2px solid #00FFFF',
        boxShadow: '0px 0px 15px 5px #00FFFF',
        color: 'white',
        width: '300px',
    },
    typewriterText: {
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '22px',
        color: '#00FFFF',
        textShadow: '0px 0px 5px #00FFFF',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    planetButton: {
        padding: '10px 20px',
        backgroundColor: '#001F3F',
        border: '2px solid #00FFFF',
        color: '#00FFFF',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '8px',
        textShadow: '0px 0px 2px #00FFFF',
        transition: 'transform 0.2s',
    },
    quizButton: {
        padding: '10px 20px',
        backgroundColor: '#FF5733',
        border: '2px solid #00FFFF',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        borderRadius: '8px',
        textShadow: '0px 0px 2px #00FFFF',
        transition: 'transform 0.2s',
    },
    floatingWindow: {
        position: 'absolute',
        top: '18%', // Adjusted position to be higher
        left: '20%', // Adjusted position to be on the right side
        transform: 'translate(-140%, 0)', // Center horizontally
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid #00FFFF',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 0px 15px 5px #00FFFF',
        zIndex: 10,
    },
};

export default FuturisticScreen;
