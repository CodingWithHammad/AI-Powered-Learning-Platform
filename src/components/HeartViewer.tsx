"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"

/* ❤️ HEART MODEL */
function Heart() {
  const { scene } = useGLTF("/models/heart.glb")
  const ref: any = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (ref.current) {
      const scale = 2 + Math.sin(t * 3) * 0.05
      ref.current.scale.set(scale, scale, scale)
    }
  })

  return <primitive ref={ref} object={scene} />
}

/* ➡️ ARROW + LABEL */
function Arrow({ position, label }: any) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
      </mesh>

      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.04, 0.12, 32]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
      </mesh>

      <Html position={[0, 0.8, 0]} center>
        <div
          style={{
            background: "#0ea5e9",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 0 10px #38bdf8",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

export default function HeartViewer() {

  const [selected, setSelected] = useState("Heart")

  /* 🔊 AUDIO STATE */
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio("/humanheart.wav") // change per file if needed
    audio.volume = 0.5
    audio.loop = true
    audioRef.current = audio
  }, [])

  const handlePlay = () => {
    audioRef.current?.play()
    setIsPlaying(true)
  }

  const handleStop = () => {
    audioRef.current?.pause()
    audioRef.current!.currentTime = 0
    setIsPlaying(false)
  }

  /* ❤️ HEART PARTS DATA */
  const heartParts: any = {
    Heart: {
      text: "The heart pumps blood throughout the body.",
      pos: [0, 0.2, 0]
    },
    Aorta: {
      text: "The aorta is the largest artery carrying oxygenated blood.",
      pos: [0.4, 1.1, 0]
    },
    "Left Atrium": {
      text: "Receives oxygenated blood from lungs.",
      pos: [-0.5, 0.6, 0]
    },
    "Right Atrium": {
      text: "Receives deoxygenated blood from body.",
      pos: [0.5, 0.6, 0]
    },
    "Left Ventricle": {
      text: "Pumps oxygenated blood into the body.",
      pos: [-0.4, -0.3, 0]
    },
    "Right Ventricle": {
      text: "Pumps blood to lungs.",
      pos: [0.4, -0.3, 0]
    },
  }

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white relative">

      {/* 🔊 AUDIO BUTTON */}
      <div className="absolute top-4 right-5 z-50 flex border border-white rounded overflow-hidden">
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-black text-white hover:bg-gray-800"
        >
          ⏹ Stop
        </button>
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-white text-black hover:bg-gray-300"
        >
          ▶ Play
        </button>
      </div>

      {/* 🔥 Title */}
      <div className="text-center py-4 text-3xl font-bold border-b border-slate-700">
        ❤️ Human Heart
      </div>

      <div className="flex flex-1">

        {/* 🫀 3D VIEW */}
        <div className="w-2/3 h-full">
          <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>

            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <pointLight position={[0, 3, 3]} intensity={2} color="#38bdf8" />

            <Suspense fallback={null}>
              <Heart />
              <Arrow
                position={heartParts[selected].pos}
                label={selected}
              />
            </Suspense>

            <OrbitControls
              enableZoom
              enablePan
              enableRotate
              rotateSpeed={1.2}
              zoomSpeed={1.2}
            />

            <Environment preset="city" />

          </Canvas>
        </div>

        {/* 📋 SIDE PANEL */}
        <div className="w-1/3 bg-slate-900/80 p-6 overflow-y-auto">

          <h1 className="text-2xl font-bold mb-6">
            Heart Anatomy
          </h1>

          <div className="space-y-3">
            {Object.keys(heartParts).map((part) => (
              <button
                key={part}
                onClick={() => setSelected(part)}
                className="w-full text-left bg-slate-800 p-3 rounded hover:bg-sky-600 transition"
              >
                {part}
              </button>
            ))}
          </div>

          <div className="mt-8 bg-slate-800 p-4 rounded">
            <h2 className="text-xl text-sky-400 mb-2">
              {selected}
            </h2>
            <p className="text-gray-300">
              {heartParts[selected].text}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}




















// "use client"

// import { Canvas, useFrame } from "@react-three/fiber"
// import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
// import { Suspense, useRef, useState } from "react"

// /* ❤️ HEART MODEL */
// function Heart() {
//   const { scene } = useGLTF("/models/heart.glb")
//   const ref: any = useRef()

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime()

//     if (ref.current) {
//       const scale = 2 + Math.sin(t * 3) * 0.05
//       ref.current.scale.set(scale, scale, scale)
//     }
//   })

//   return <primitive ref={ref} object={scene} />
// }

// /* ➡️ ARROW + LABEL */
// function Arrow({ position, label }: any) {
//   return (
//     <group position={position}>

//       {/* Line */}
//       <mesh position={[0, 0.25, 0]}>
//         <cylinderGeometry args={[0.01, 0.01, 0.5, 32]} />
//         <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
//       </mesh>

//       {/* Arrow head */}
//       <mesh position={[0, 0.55, 0]}>
//         <coneGeometry args={[0.04, 0.12, 32]} />
//         <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
//       </mesh>

//       {/* Label */}
//       <Html position={[0, 0.8, 0]} center>
//         <div
//           style={{
//             background: "#0ea5e9",
//             padding: "4px 10px",
//             borderRadius: "6px",
//             fontSize: "12px",
//             color: "white",
//             fontWeight: "bold",
//             boxShadow: "0 0 10px #38bdf8",
//           }}
//         >
//           {label}
//         </div>
//       </Html>

//     </group>
//   )
// }

// export default function HeartViewer() {

//   const [selected, setSelected] = useState("Heart")

//   /* ❤️ HEART PARTS DATA */
//   const heartParts: any = {
//     Heart: {
//       text: "The heart pumps blood throughout the body.",
//       pos: [0, 0.2, 0]
//     },
//     Aorta: {
//       text: "The aorta is the largest artery carrying oxygenated blood.",
//       pos: [0.4, 1.1, 0]
//     },
//     "Left Atrium": {
//       text: "Receives oxygenated blood from lungs.",
//       pos: [-0.5, 0.6, 0]
//     },
//     "Right Atrium": {
//       text: "Receives deoxygenated blood from body.",
//       pos: [0.5, 0.6, 0]
//     },
//     "Left Ventricle": {
//       text: "Pumps oxygenated blood into the body.",
//       pos: [-0.4, -0.3, 0]
//     },
//     "Right Ventricle": {
//       text: "Pumps blood to lungs.",
//       pos: [0.4, -0.3, 0]
//     },
//   }

//   return (
//     <div className="w-full h-screen flex flex-col bg-black text-white">

//       {/* 🔥 Title */}
//       <div className="text-center py-4 text-3xl font-bold border-b border-slate-700">
//         ❤️ Human Heart
//       </div>

//       <div className="flex flex-1">

//         {/* 🫀 3D VIEW */}
//         <div className="w-2/3 h-full">
//           <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>

//             <ambientLight intensity={1.5} />
//             <directionalLight position={[5, 5, 5]} intensity={2} />
//             <pointLight position={[0, 3, 3]} intensity={2} color="#38bdf8" />

//             <Suspense fallback={null}>
//               <Heart />
//               <Arrow
//                 position={heartParts[selected].pos}
//                 label={selected}
//               />
//             </Suspense>

//             <OrbitControls
//               enableZoom
//               enablePan
//               enableRotate
//               rotateSpeed={1.2}
//               zoomSpeed={1.2}
//             />

//             <Environment preset="city" />

//           </Canvas>
//         </div>

//         {/* 📋 SIDE PANEL */}
//         <div className="w-1/3 bg-slate-900/80 p-6 overflow-y-auto">

//           <h1 className="text-2xl font-bold mb-6">
//             Heart Anatomy
//           </h1>

//           {/* Buttons */}
//           <div className="space-y-3">
//             {Object.keys(heartParts).map((part) => (
//               <button
//                 key={part}
//                 onClick={() => setSelected(part)}
//                 className="w-full text-left bg-slate-800 p-3 rounded hover:bg-sky-600 transition"
//               >
//                 {part}
//               </button>
//             ))}
//           </div>

//           {/* Info */}
//           <div className="mt-8 bg-slate-800 p-4 rounded">
//             <h2 className="text-xl text-sky-400 mb-2">
//               {selected}
//             </h2>
//             <p className="text-gray-300">
//               {heartParts[selected].text}
//             </p>
//           </div>

//         </div>

//       </div>
//     </div>
//   )
// }




















// import { Canvas, useFrame } from "@react-three/fiber"
// import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
// import { Suspense, useRef, useState } from "react"

// /* ❤️ HEART MODEL */
// function Heart() {
//   const { scene } = useGLTF("/models/heart.glb")
//   const ref: any = useRef()

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime()

//     if (ref.current) {
//       const scale = 2 + Math.sin(t * 3) * 0.05
//       ref.current.scale.set(scale, scale, scale)
//     }
//   })

//   return <primitive ref={ref} object={scene} />
// }

// /* ➡️ ARROW + LABEL */
// function Arrow({ position, label }: any) {
//   return (
//     <group position={position}>

//       {/* Line */}
//       <mesh position={[0, 0.25, 0]}>
//         <cylinderGeometry args={[0.01, 0.01, 0.5, 32]} />
//         <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
//       </mesh>

//       {/* Arrow head */}
//       <mesh position={[0, 0.55, 0]}>
//         <coneGeometry args={[0.04, 0.12, 32]} />
//         <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" />
//       </mesh>

//       {/* Label */}
//       <Html position={[0, 0.8, 0]} center>
//         <div
//           style={{
//             background: "#0ea5e9",
//             padding: "4px 10px",
//             borderRadius: "6px",
//             fontSize: "12px",
//             color: "white",
//             fontWeight: "bold",
//             boxShadow: "0 0 10px #38bdf8",
//           }}
//         >
//           {label}
//         </div>
//       </Html>

//     </group>
//   )
// }

// export default function HeartViewer() {

//   const [selected, setSelected] = useState("Heart")

//   /* ❤️ HEART PARTS DATA */
//   const heartParts: any = {
//     Heart: {
//       text: "The heart pumps blood throughout the body.",
//       pos: [0, 0.2, 0]
//     },
//     Aorta: {
//       text: "The aorta is the largest artery carrying oxygenated blood.",
//       pos: [0.4, 1.1, 0]
//     },
//     "Left Atrium": {
//       text: "Receives oxygenated blood from lungs.",
//       pos: [-0.5, 0.6, 0]
//     },
//     "Right Atrium": {
//       text: "Receives deoxygenated blood from body.",
//       pos: [0.5, 0.6, 0]
//     },
//     "Left Ventricle": {
//       text: "Pumps oxygenated blood into the body.",
//       pos: [-0.4, -0.3, 0]
//     },
//     "Right Ventricle": {
//       text: "Pumps blood to lungs.",
//       pos: [0.4, -0.3, 0]
//     },
//   }

//   return (
//     <div className="w-full h-screen flex flex-col bg-black text-white">

//       {/* 🔥 Title */}
//       <div className="text-center py-4 text-3xl font-bold border-b border-slate-700">
//         ❤️ Human Heart
//       </div>

//       <div className="flex flex-1">

//         {/* 🫀 3D VIEW */}
//         <div className="w-2/3 h-full">
//           <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>

//             <ambientLight intensity={1.5} />
//             <directionalLight position={[5, 5, 5]} intensity={2} />
//             <pointLight position={[0, 3, 3]} intensity={2} color="#38bdf8" />

//             <Suspense fallback={null}>
//               <Heart />
//               <Arrow
//                 position={heartParts[selected].pos}
//                 label={selected}
//               />
//             </Suspense>

//             <OrbitControls
//               enableZoom
//               enablePan
//               enableRotate
//               rotateSpeed={1.2}
//               zoomSpeed={1.2}
//             />

//             <Environment preset="city" />

//           </Canvas>
//         </div>

//         {/* 📋 SIDE PANEL */}
//         <div className="w-1/3 bg-slate-900/80 p-6 overflow-y-auto">

//           <h1 className="text-2xl font-bold mb-6">
//             Heart Anatomy
//           </h1>

//           {/* Buttons */}
//           <div className="space-y-3">
//             {Object.keys(heartParts).map((part) => (
//               <button
//                 key={part}
//                 onClick={() => setSelected(part)}
//                 className="w-full text-left bg-slate-800 p-3 rounded hover:bg-sky-600 transition"
//               >
//                 {part}
//               </button>
//             ))}
//           </div>

//           {/* Info */}
//           <div className="mt-8 bg-slate-800 p-4 rounded">
//             <h2 className="text-xl text-sky-400 mb-2">
//               {selected}
//             </h2>
//             <p className="text-gray-300">
//               {heartParts[selected].text}
//             </p>
//           </div>

//         </div>

//       </div>
//     </div>
//   )
// }