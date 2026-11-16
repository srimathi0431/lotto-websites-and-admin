import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import './Realistic3DBackground.css';

// Lottery Ball Component with 3D geometry and realistic materials
function LotteryBall({ position, number, color, size = 1, floatSpeed = 1, rotationSpeed = 0.3 }) {
  const ballRef = useRef();

  useFrame((state) => {
    if (ballRef.current) {
      const t = state.clock.getElapsedTime() * floatSpeed;
      ballRef.current.position.y = position[1] + Math.sin(t) * 0.3;
      ballRef.current.rotation.y += 0.005 * rotationSpeed;
      ballRef.current.rotation.x += 0.003 * rotationSpeed;
    }
  });

  // Color mapping
  const colorMap = {
    purple: '#7c3aed',
    blue: '#2563eb',
    orange: '#f97316',
    pink: '#ec4899',
    cyan: '#06b6d4',
    dark: '#374151'
  };

  return (
    <group ref={ballRef} position={position}>
      {/* Main ball sphere */}
      <Sphere args={[size, 64, 64]}>
        <meshStandardMaterial
          color={colorMap[color] || colorMap.blue}
          metalness={0.3}
          roughness={0.2}
          envMapIntensity={1}
        />
      </Sphere>

      {/* White number panel */}
      <Sphere args={[size * 0.45, 32, 32]} position={[size * 0.3, 0, size * 0.7]}>
        <meshStandardMaterial
          color="white"
          metalness={0.1}
          roughness={0.3}
        />
      </Sphere>

      {/* Specular highlight */}
      <Sphere args={[size * 0.2, 16, 16]} position={[-size * 0.3, size * 0.3, size * 0.7]}>
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
}

// Flowing Ribbon Component
function FlowingRibbon({ points, color, opacity = 0.6 }) {
  const ribbonRef = useRef();

  useFrame((state) => {
    if (ribbonRef.current) {
      ribbonRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(points);
  }, [points]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.5, 8, false);
  }, [curve]);

  return (
    <mesh ref={ribbonRef} geometry={tubeGeometry}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        metalness={0.5}
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Small Decorative Sphere
function DecorativeSphere({ position, size = 0.3 }) {
  return (
    <Sphere args={[size, 32, 32]} position={position}>
      <meshStandardMaterial
        color="white"
        transparent
        opacity={0.6}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  );
}

// Main 3D Scene
function Scene() {
  // Lottery balls configuration
  const lotteryBalls = [
    { position: [-10, 2, -5], number: '7', color: 'purple', size: 1.5 },
    { position: [-11, -2, -3], number: '5', color: 'blue', size: 1.0 },
    { position: [-8, -3, -2], number: '3', color: 'orange', size: 0.9 },
    { position: [10, 3, -5], number: '9', color: 'pink', size: 1.6 },
    { position: [11, -1, -3], number: '1', color: 'cyan', size: 1.1 },
    { position: [9, -3, -1], number: '8', color: 'dark', size: 1.3 },
  ];

  // Decorative spheres
  const decorativeSpheres = [
    { position: [-6, 1, -4], size: 0.4 },
    { position: [-7, -1, -2], size: 0.25 },
    { position: [7, 2, -4], size: 0.35 },
    { position: [8, -2, -2], size: 0.3 },
  ];

  // Flowing ribbons
  const ribbons = [
    {
      points: [
        new THREE.Vector3(-12, 4, -6),
        new THREE.Vector3(-9, 2, -4),
        new THREE.Vector3(-6, 0, -2),
      ],
      color: '#ec4899',
      opacity: 0.4
    },
    {
      points: [
        new THREE.Vector3(12, 3, -6),
        new THREE.Vector3(9, 1, -4),
        new THREE.Vector3(6, -1, -2),
      ],
      color: '#06b6d4',
      opacity: 0.4
    },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 5, 5]} intensity={2} color="#ec4899" />
      <pointLight position={[10, 5, 5]} intensity={2} color="#06b6d4" />
      <pointLight position={[0, -3, 3]} intensity={1.5} color="#fbbf24" />

      {/* Lottery Balls */}
      {lotteryBalls.map((ball, index) => (
        <LotteryBall
          key={`ball-${index}`}
          position={ball.position}
          number={ball.number}
          color={ball.color}
          size={ball.size}
          floatSpeed={0.5 + index * 0.1}
          rotationSpeed={0.2 + index * 0.05}
        />
      ))}

      {/* Decorative Spheres */}
      {decorativeSpheres.map((sphere, index) => (
        <DecorativeSphere
          key={`sphere-${index}`}
          position={sphere.position}
          size={sphere.size}
        />
      ))}

      {/* Flowing Ribbons */}
      {ribbons.map((ribbon, index) => (
        <FlowingRibbon
          key={`ribbon-${index}`}
          points={ribbon.points}
          color={ribbon.color}
          opacity={ribbon.opacity}
        />
      ))}

      {/* Floor with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </>
  );
}

// Fallback component for loading state
function Fallback() {
  return null;
}

// Main Background Component
export default function Realistic3DBackground() {
  return (
    <div className="realistic-3d-background">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={<Fallback />}>
          <Scene />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>

      {/* Gradient overlay for sky effect */}
      <div className="gradient-sky-overlay"></div>
    </div>
  );
}
