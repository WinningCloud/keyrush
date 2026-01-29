import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralField = () => {
  const count = 500; // Number of particles
  const meshRef = useRef();

  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(20);
      const y = THREE.MathUtils.randFloatSpread(20);
      const z = THREE.MathUtils.randFloatSpread(20);
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    // Make the whole field rotate slowly
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    // Make it react slightly to mouse
    meshRef.current.rotation.x = state.mouse.y * 0.2;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particles.length / 3} 
          array={particles} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#58a6ff" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
};