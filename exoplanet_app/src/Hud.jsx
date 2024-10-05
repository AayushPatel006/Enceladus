import React from 'react';
import './HUD.css'; // Create a CSS file for HUD styling

const HUD = ({ clickPosition, speed, destination, temperature }) => {
  return (
    <div className="hud">
      <h2>🚀 ExoSail</h2>
      {clickPosition && (
        <p className="coordinate-display">
          <span>🛰️ Click Position:</span> 
          X: {clickPosition.x.toFixed(2)}, 
          Y: {clickPosition.y.toFixed(2)}, 
          Z: {clickPosition.z.toFixed(2)}
        </p>
      )}
      <div className="hud-info">
        <p><strong>Speed:</strong> {speed} parsec/h</p>
        <p><strong>Destination:</strong> {destination}</p>
        <p><strong>Temperature:</strong> {temperature} K</p>
      </div>
    </div>
  );
};

export default HUD;
