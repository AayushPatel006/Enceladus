import React, { useRef, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import FuturisticScreen from './FuturisticScreen'; // Ensure correct path

const SpaceScene = () => {
  const spaceshipRef = useRef();
  const videoSphereRef = useRef();
  const videoRef = useRef(); // Video reference
  const { camera, gl, scene } = useThree();
  const [clickPosition, setClickPosition] = useState(null);
  const [videoSpeed, setVideoSpeed] = useState(1); // Control video speed

  // Load Draco compressed model (spaceship)
  useEffect(() => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/'); // Path to Draco decoder
    loader.setDRACOLoader(dracoLoader);

    loader.load('./spacefighter_cockpit_wasp_interdictor.glb', (gltf) => {
      spaceshipRef.current.add(gltf.scene);
      gltf.scene.position.set(0, -4, 3); // Adjust the position here
      gltf.scene.scale.set(1.5, 1.5, 1.5); // Adjust the size here
      gltf.scene.rotation.set(0, Math.PI + 0.001, 0);
    });
  }, []);

  // Create video sphere with video texture
  useEffect(() => {
    const video = document.createElement('video');
    video.src = './215698.mp4'; // Path to the video
    video.loop = true;
    video.muted = true;
    video.play();
    videoRef.current = video; // Store the video in ref

    const texture = new THREE.VideoTexture(video);
    const videoSphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 64, 64),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }) // Map video to the inside of the sphere
    );
    videoSphereRef.current.add(videoSphere);
  }, []);

  // Lighting inside the spaceship
  const addCockpitLighting = () => {
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    const cockpitLight = new THREE.SpotLight(0xffffff, 2);
    cockpitLight.position.set(0, 3, -5); // Light above and in front

    spaceshipRef.current.add(ambientLight);
    spaceshipRef.current.add(cockpitLight);
  };

  useEffect(() => {
    addCockpitLighting();
  }, []);

  // Handle mouse move to control video playback speed
  const handleMouseMove = (event) => {
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    const newSpeed = THREE.MathUtils.lerp(0.5, 2, normalizedX); // Map mouse X to speed range 0.5x to 2x
    setVideoSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed; // Adjust video speed
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Render a small sphere at the clicked position
  const ClickMarker = () => (
    clickPosition ? (
      <mesh position={clickPosition}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
    ) : null
  );

  return (
    <>
      <group ref={spaceshipRef} position={[0, 0, 0]} />
      <group ref={videoSphereRef} />
      <ClickMarker />
      <FuturisticScreen /> {/* Add the futuristic screen here */}

      {/* Orbit Controls for the camera */}
      <OrbitControls
        target={[0, -1, 0]} // Lock camera focus on the origin
        enablePan={false}   // Disable panning
        enableZoom={false}   // Optional: Disable zoom
        minPolarAngle={-Math.PI / 2.2}  // Limit how far the camera can look up
        maxPolarAngle={Math.PI / 2.2} // Limit how far the camera can look down
        minAzimuthAngle={-Math.PI / 50} // Optional: Limit rotation around Y-axis (left)
        maxAzimuthAngle={Math.PI / 50}  // Disable panning
      />
    </>
  );
};

export default SpaceScene;
