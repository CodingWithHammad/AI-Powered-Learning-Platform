"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"

function Earth() {
  const ref: any = useRef()
  const texture = new THREE.TextureLoader().load("@/public/textures/earth.jpg")

  useFrame(() => {
    ref.current.rotation.y += 0.001
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

function Moon() {
  const ref: any = useRef()
  const texture = new THREE.TextureLoader().load("/textures/moon.jpg")

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.position.x = Math.sin(t * 0.5) * 5
    ref.current.position.z = Math.cos(t * 0.5) * 5
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function EarthExplorer() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 3, 5]} intensity={2} />

        <Suspense fallback={null}>
          <Earth />
          <Moon />
        </Suspense>

        <Stars />
        <OrbitControls />
      </Canvas>
    </div>
  )
}