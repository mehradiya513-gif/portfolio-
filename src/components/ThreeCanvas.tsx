"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DriftingMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;

  // Distribute particles in a sparse 3D box bounding volume
  const [positions, colors, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const colorIvory = new THREE.Color("#fff5f5");
    const colorPeach = new THREE.Color("#e599ad");
    const colorLilac = new THREE.Color("#c5b5e5");

    // Pure LCG pseudo-random generator to satisfy react-hooks/purity
    let seed = 1;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      // Bounding box range: x[-5, 5], y[-4, 4], z[-5, 2]
      positions[i * 3] = (random() - 0.5) * 10;
      positions[i * 3 + 1] = (random() - 0.5) * 8;
      positions[i * 3 + 2] = (random() - 0.5) * 8;

      // Assign speed parameter for organic varying speeds
      speeds[i] = 0.0015 + random() * 0.002;

      // Soft palette blending
      const mixedColor = colorIvory.clone();
      const mixRatio = random();
      if (mixRatio < 0.35) {
        mixedColor.lerp(colorPeach, random());
      } else if (mixRatio < 0.7) {
        mixedColor.lerp(colorLilac, random());
      } else {
        mixedColor.lerp(colorIvory, random());
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return [positions, colors, speeds];
  }, []);

  // Frame animation loop to compute drift vector translation
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    // React to cursor pointer coordinate offset slightly
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Slowly float upwards
      array[i3 + 1] += speeds[i] + Math.sin(time * 0.8 + i) * 0.0005; // Y axis drift
      
      // Sway side to side (X axis) and drift back/forth (Z axis)
      array[i3] += Math.sin(time * 0.3 + i) * 0.001 + mouseX * 0.0005;
      array[i3 + 2] += Math.cos(time * 0.3 + i) * 0.0008 + mouseY * 0.0005;

      // Recycle particles if they float past the top boundary
      if (array[i3 + 1] > 4.5) {
        array[i3 + 1] = -4.5;
        array[i3] = (Math.random() - 0.5) * 10;
      }
      
      // Wrap horizontal bounds
      if (Math.abs(array[i3]) > 5) {
        array[i3] = -array[i3];
      }
    }
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-transparent overflow-hidden pointer-events-none">
      {/* Light warm-tinted vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,248,248,0.2),#fff8f8_90%)] pointer-events-none z-10" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.1} />
        <DriftingMotes />
      </Canvas>
    </div>
  );
}
