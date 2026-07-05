import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cross = (props) => (
  <group {...props}>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 3, 0.5]} />
      <meshStandardMaterial color="#bbe1fa" roughness={0.2} metalness={0.8} />
    </mesh>
    <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <boxGeometry args={[1, 3, 0.5]} />
      <meshStandardMaterial color="#bbe1fa" roughness={0.2} metalness={0.8} />
    </mesh>
  </group>
);

const Scene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    // Smooth scroll interpolation using window scroll directly
    const scrollY = window.scrollY;
    
    // Rotate the entire group based on scroll
    if (groupRef.current) {
      // Lerp rotation to target for smoothness
      const targetRotationY = scrollY * 0.002;
      const targetRotationX = scrollY * 0.001;
      
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
      
      // Move camera slightly
      state.camera.position.y = -scrollY * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Medical Crosses floating around */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Float 
          key={i} 
          speed={1.5 + Math.random()} 
          rotationIntensity={2} 
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 20 - 5
          ]}
        >
          <Cross scale={0.5 + Math.random() * 0.5} />
        </Float>
      ))}
    </group>
  );
};

export default Scene;
