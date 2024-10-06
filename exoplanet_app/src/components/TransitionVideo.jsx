import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';


// Custom background setup using video texture
const TransitionVideoBackground = () => {
    const { scene } = useThree();
  
    useEffect(() => {
      // Create a video element
      const video = document.createElement('video');
      video.src = '/nebula3.mp4'; // Path to your video
      video.crossOrigin = 'Anonymous';
      // video.loop = true;
      video.muted = true;
      video.playbackRate = 2; 
      
      // Start playing when enough data is loaded
      video.addEventListener('loadeddata', () => {
        video.play();
      });
  
      // Check if the video is paused, and resume it if necessary
      const checkVideoPlayback = () => {
        if (video.paused) {
          video.play();
        }
      };
  
      // Create a video texture
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBFormat;
  
      // Apply the video texture to a large plane as background
      const geometry = new THREE.PlaneGeometry(16, 9); // Aspect ratio of 16:9
      const material = new THREE.MeshBasicMaterial({ map: videoTexture });
      const plane = new THREE.Mesh(geometry, material);
      plane.scale.set(4, 4, 4); // Adjust the scaling to cover the background
      plane.position.set(0, 0, -15); // Position it behind the scene
      scene.add(plane);
  
      // Cleanup on unmount and handle video end
      const handleVideoEnd = () => {
        video.pause(); // Pause the video
        scene.remove(plane); // Remove the plane from the scene
      };
  
      video.addEventListener('ended', handleVideoEnd);
  
      // Clean up the event listener and video element on unmount
      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        video.pause();
        scene.remove(plane); // Remove the plane from the scene
      };
    }, [scene]);
  
    return null;
  };
  
//   const TransitionVideo = () => {
  
    // const [enterPressed, setEnterPressed] = useState(false);
  
    // // Handle Enter key press
    // const handleKeyDown = (event) => {
    //   if (event.key === 'Enter') {
    //     setEnterPressed(true);
    //     setTimeout(() => {
    //       setEnterPressed(false)
    //     }, 12000);
    //   }
    // };
  
    // useEffect(() => {
    //   // Add event listener for keydown events
    //   window.addEventListener('keydown', handleKeyDown);
  
    //   // Cleanup event listener
    //   return () => {
    //     window.removeEventListener('keydown', handleKeyDown);
    //   };
    // }, []);
  
//     return (
//       <div className="canvas-container">
//       <Canvas>
//         <ambientLight intensity={0.9} />
//         <directionalLight position={[0, 70, 50]} intensity={7} />
  
//         <Background />
//         {enterPressed && <TransitionVideoBackground />}
//         <Model />
//         <OrbitControls 
//         target={[0, -1, 0]} // Lock camera focus on the origin
//         enablePan={false}   // Disable panning
//         enableZoom={false}   // Optional: Disable zoom with enableZoom={false}
//         minPolarAngle={-Math.PI / 2.2}  // Limit how far the camera can look up
//         maxPolarAngle={Math.PI / 2.2} // Limit how far the camera can look down
//         minAzimuthAngle={-Math.PI / 50} // Optional: Limit rotation around Y-axis (left)
//         maxAzimuthAngle={Math.PI / 50}  // Optional: Limit rotation around Y-axis (right)
//         />
//       </Canvas>
//       </div>
//     );
//   };
  
  export default TransitionVideoBackground; 