import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Starfield = ({ speed }) => {
  const starfieldRef = useRef();
  const starCount = 1000; // Number of stars
  const radius = 10; // Radius from the center where stars will be located

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      // Random spherical coordinates within the defined radius
      const theta = Math.random() * Math.PI; // Inclination
      const phi = Math.random() * 2 * Math.PI; // Azimuthal angle

      // Fixed radius for star positions
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions[i * 3] = x; // X
      positions[i * 3 + 1] = y; // Y
      positions[i * 3 + 2] = z; // Z

      // White color for each star
      colors[i * 3] = 1; // R
      colors[i * 3 + 1] = 1; // G
      colors[i * 3 + 2] = 1; // B
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.2, // Size of the stars
      vertexColors: true, // Use colors from the geometry
      transparent: true,
    });

    const stars = new THREE.Points(geometry, material);
    starfieldRef.current.add(stars);

    // Animation function to move stars
    const animateStars = () => {
      requestAnimationFrame(animateStars);
      const positions = geometry.attributes.position.array;

      for (let i = 0; i < starCount; i++) {
        // Move the stars towards the camera based on speed
        positions[i * 3 + 2] += speed; // Move forward in Z direction
        // Reset the star position if it moves too far
        if (positions[i * 3 + 2] > 5) { // Assuming a maximum Z of 5
          positions[i * 3 + 2] = -5; // Reset to the back
        }
      }
      geometry.attributes.position.needsUpdate = true; // Notify Three.js to update positions
    };

    animateStars();

    return () => {
      starfieldRef.current.remove(stars); // Clean up stars
    };
  }, [speed]);

  return <group ref={starfieldRef} />;
};

export default Starfield;
