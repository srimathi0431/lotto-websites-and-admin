import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import './CinematicScene.css';

// Lottery Ball Component
function LotteryBall({ position, color, number, size = 1, floatSpeed = 2 }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Main Ball */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* White Number Panel */}
        <mesh position={[size * 0.3, 0, size * 0.7]} castShadow>
          <sphereGeometry args={[size * 0.4, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>

        {/* Highlight Sphere */}
        <mesh position={[-size * 0.25, size * 0.25, size * 0.8]}>
          <sphereGeometry args={[size * 0.15, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Number Text Sprite (simulated with small sphere) */}
        <mesh position={[size * 0.3, 0, size * 1.1]}>
          <sphereGeometry args={[size * 0.05, 8, 8]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>
      </group>
    </Float>
  );
}

// Flowing Ribbon
function FlowingRibbon({ position, color, rotation }) {
  const ribbonRef = useRef();

  useFrame((state) => {
    if (ribbonRef.current) {
      ribbonRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      ribbonRef.current.rotation.z = rotation + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={ribbonRef} position={position} rotation={[0, 0, rotation]}>
      <torusGeometry args={[3, 0.1, 16, 100, Math.PI]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Floating Crystal Sphere
function CrystalSphere({ position, scale = 1 }) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.05}
          transmission={0.95}
          thickness={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

// Reflective Floor
function ReflectiveFloor() {
  const floorRef = useRef();

  useFrame((state) => {
    if (floorRef.current) {
      floorRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh
      ref={floorRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#1e3a8a"
        metalness={0.9}
        roughness={0.1}
        emissive="#7c3aed"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Atmospheric Background
function AtmosphericBackground() {
  const bgRef = useRef();

  useFrame((state) => {
    if (bgRef.current) {
      bgRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={bgRef}>
      <mesh position={[0, 0, -30]}>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial
          side={THREE.BackSide}
          color="#0ea5e9"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={60} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={2} color="#fbbf24" />
      <pointLight position={[-10, 3, 5]} intensity={1.5} color="#ec4899" />
      <pointLight position={[10, 3, 5]} intensity={1.5} color="#06b6d4" />

      {/* Environment Map */}
      <Environment preset="sunset" />

      {/* Atmospheric Background */}
      <AtmosphericBackground />

      {/* Lottery Balls - Left Side */}
      <LotteryBall position={[-7, 2, -2]} color="#7c3aed" number={7} size={1.2} />
      <LotteryBall position={[-8, -1, -1]} color="#2563eb" number={5} size={0.8} />
      <LotteryBall position={[-6.5, -3, 0]} color="#f97316" number={3} size={0.7} />

      {/* Lottery Balls - Right Side */}
      <LotteryBall position={[7, 2.5, -2]} color="#ec4899" number={9} size={1.3} />
      <LotteryBall position={[8, -0.5, -1]} color="#06b6d4" number={1} size={0.9} />
      <LotteryBall position={[6.8, -3, 0]} color="#374151" number={8} size={1.0} />

      {/* Flowing Ribbons */}
      <FlowingRibbon position={[-8, 0, -5]} color="#ec4899" rotation={-0.5} />
      <FlowingRibbon position={[8, 0, -5]} color="#06b6d4" rotation={0.5} />
      <FlowingRibbon position={[-6, -2, -4]} color="#a855f7" rotation={0.3} />
      <FlowingRibbon position={[6, -2, -4]} color="#f97316" rotation={-0.3} />

      {/* Crystal Spheres */}
      <CrystalSphere position={[-4, 3, 2]} scale={0.8} />
      <CrystalSphere position={[4, 3.5, 2]} scale={1} />
      <CrystalSphere position={[-3, -2, 3]} scale={0.6} />
      <CrystalSphere position={[3.5, -1.5, 3]} scale={0.7} />
      <CrystalSphere position={[0, 4, 1]} scale={0.5} />

      {/* Sparkles */}
      <Sparkles
        count={200}
        scale={30}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#ffffff"
      />

      {/* Reflective Floor */}
      <ReflectiveFloor />
    </>
  );
}

// Main Component
export default function CinematicScene() {
  return (
    <div className="cinematic-scene-container">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
