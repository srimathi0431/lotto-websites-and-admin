import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import './ThreeDBalls.css';

// Single 3D Lottery Ball
function LotteryBall3D({ position, color, size = 1 }) {
  const ballRef = useRef();

  useFrame((state) => {
    if (ballRef.current) {
      const t = state.clock.getElapsedTime();
      ballRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
      ballRef.current.rotation.y += 0.005;
      ballRef.current.rotation.x += 0.003;
    }
  });

  return (
    <group ref={ballRef} position={position}>
      <Sphere args={[size, 64, 64]}>
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.2}
          envMapIntensity={1}
        />
      </Sphere>

      <Sphere args={[size * 0.42, 32, 32]} position={[size * 0.35, 0, size * 0.65]}>
        <meshStandardMaterial
          color="white"
          metalness={0.1}
          roughness={0.3}
        />
      </Sphere>

      <Sphere args={[size * 0.18, 16, 16]} position={[-size * 0.28, size * 0.28, size * 0.65]}>
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.9}
        />
      </Sphere>
    </group>
  );
}

// Scene with lighting and balls
function BallsScene() {
  const balls = [
    { position: [-8, 1, -3], color: '#7c3aed', size: 1.4 },
    { position: [-9, -1.5, -2], color: '#2563eb', size: 0.9 },
    { position: [-7, -2.5, -1.5], color: '#f97316', size: 0.8 },
    { position: [8, 1.5, -3], color: '#ec4899', size: 1.5 },
    { position: [9, -1, -2], color: '#06b6d4', size: 1.0 },
    { position: [7.5, -2.8, -1], color: '#374151', size: 1.2 },
  ];

  return (
    <React.Fragment>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-8, 3, 3]} intensity={1.5} color="#ec4899" />
      <pointLight position={[8, 3, 3]} intensity={1.5} color="#06b6d4" />
      
      {balls.map((ball, i) => (
        <LotteryBall3D
          key={i}
          position={ball.position}
          color={ball.color}
          size={ball.size}
        />
      ))}
    </React.Fragment>
  );
}

// Main component
function ThreeDBalls() {
  return (
    <div className="three-d-balls-overlay">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <BallsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeDBalls;
