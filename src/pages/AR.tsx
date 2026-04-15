
// "use client"

// import { useState } from "react"
// import SolarSystem from "@/components/SolarSystem" // ✅ fixed
// import HeartViewer from "../components/HeartViewer"
// import EarthExplorer from "../components/EarthExplorer"
// import Lightning from "../components/Lightning" // 👈 IMPORT THIS

// export default function ARViewer() {

//   const [active, setActive] = useState<string | null>(null)

//   return (
//     <div className="w-full min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

//        {/* ⚡ Background Effects */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

//         {/* Lightning */}
//         <div className="absolute inset-0">
//           <Lightning
//             hue={266}
//             xOffset={-0.1}
//            speed={1.5}
//             intensity={2}
//             size={1}
//           />
//         </div>

//         {/* Glow */}
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       </div>

//       {/* 🔥 Heading */}
//       {/* <h1 className="text-center text-9xl md:text-5xl font-black py-6 border-b border-slate-700 mt-5 relative z-10">
//          AR <span className="text-purple-500"> 3D Viewer</span>
//       </h1> */}
//         <div className="text-center md:text-6xl mb-24 relative mt-7 z-10">
//           <h1 className="text-7xl font-black uppercase">
//             AR<span className="text-purple-500">3D VIEWER</span>
//           </h1>
//         </div>

//       {/* 🔘 MENU */}
//       {!active && (
//         <div className="flex justify-around items-center flex-1 text-center px-6 relative z-10">

//           <button
//             onClick={() => setActive("heart")}
//             className="text-xl md:text-2xl hover:text-sky-400 transition"
//           >
//             ❤️ Human Heart
//           </button>

//           <button
//             onClick={() => setActive("space")}
//             className="text-xl md:text-2xl hover:text-sky-400 transition"
//           >
//             🌌 Space Simulator
//           </button>

//           <button
//             onClick={() => setActive("earth")}
//             className="text-xl md:text-2xl hover:text-sky-400 transition"
//           >
//             🌍 3D Earth Explorer
//           </button>

//         </div>
//       )}

//       {/* 🎯 VIEW */}
//       {active && (
//         <div className="flex-1 relative z-10">

//           {/* 🔙 Back */}
//           <button
//             onClick={() => setActive(null)}
//             className="absolute top-4 left-4 z-50 bg-slate-800 px-4 py-2 rounded hover:bg-sky-600"
//           >
//             ⬅ Back
//           </button>

//           {active === "heart" && <HeartViewer />}
//           {active === "space" && <SolarSystem />}
//           {active === "earth" && <EarthExplorer />}

//         </div>
//       )}

//     </div>
//   )
// }














// "use client"

// import { useState } from "react"
// import SolarSystem from "@/components/SolarSystem"
// import HeartViewer from "../components/HeartViewer"
// import EarthExplorer from "../components/EarthExplorer"
// import Lightning from "../components/Lightning"

// export default function ARViewer() {

//   const [active, setActive] = useState<string | null>(null)

//   return (
//     <div className="w-full min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

//       {/* ⚡ Background Effects */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//         <div className="absolute inset-0">
//           <Lightning hue={266} xOffset={-0.1} speed={1.5} intensity={2} size={1} />
//         </div>

//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       </div>

//       {/* 🔥 Heading */}
//       <div className="text-center md:text-6xl mb-20 mt-7 relative z-10">
//         <h1 className="text-7xl font-black uppercase">
//           AR <span className="text-purple-500">3D VIEWER</span>
//         </h1>
//       </div>

//       {/* 🧠 CARDS */}
//       {!active && (
//         <div className="flex flex-1 items-center justify-center gap-10 px-6 relative z-10 flex-wrap">

//           {/* ❤️ HEART CARD */}
//           <div
//             onClick={() => setActive("heart")}
//             className="w-72 h-44 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 hover:border-purple-500 transition-all duration-300 backdrop-blur-md"
//           >
//             <h2 className="text-2xl font-bold text-purple-500 text-center">
//               Human Heart
//             </h2>
//           </div>

//           {/* 🌌 SOLAR SYSTEM */}
//           <div
//             onClick={() => setActive("space")}
//             className="w-72 h-44 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 hover:border-purple-500 transition-all duration-300 backdrop-blur-md"
//           >
//             <h2 className="text-2xl font-bold text-purple-500 text-center">
//               Solar System
//             </h2>
//           </div>

//           {/* 🌍 EARTH */}
//           <div
//             onClick={() => setActive("earth")}
//             className="w-72 h-44 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 hover:border-purple-500 transition-all duration-300 backdrop-blur-md"
//           >
//             <h2 className="text-2xl font-bold text-purple-500 text-center">
//               Earth Explorer
//             </h2>
//           </div>

//         </div>
//       )}

//       {/* 🎯 VIEW */}
//       {active && (
//         <div className="flex-1 relative z-10">

//           {/* 🔙 BACK BUTTON */}
//           <button
//             onClick={() => setActive(null)}
//             className="absolute top-4 left-4 z-50 bg-slate-800 px-4 py-2 rounded hover:bg-purple-600 transition"
//           >
//             ⬅ Back
//           </button>

//           {active === "heart" && <HeartViewer />}
//           {active === "space" && <SolarSystem />}
//           {active === "earth" && <EarthExplorer />}

//         </div>
//       )}

//     </div>
//   )
// }
























"use client"

import { useState } from "react"
import SolarSystem from "@/components/SolarSystem"
import HeartViewer from "../components/HeartViewer"
import EarthExplorer from "../components/EarthExplorer"
import Lightning from "../components/Lightning"

export default function ARViewer() {

  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* ⚡ Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

        <div className="absolute inset-0">
          <Lightning
            hue={266}
            xOffset={-0.1}
            speed={1.5}
            intensity={2}
            size={1}
          />
        </div>

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* 🔥 Heading (HIDE WHEN ACTIVE) */}
      {!active && (
        <div className="text-center md:text-6xl mb-20 relative mt-10 z-10">
          <h1 className="text-7xl font-black uppercase tracking-tight">
            AR <span className="text-purple-500">3D VIEWER</span>
          </h1>
        </div>
      )}

      {/* 🟪 CARDS */}
      {!active && (
        <div className="flex flex-wrap justify-center items-center gap-12 px-6 relative z-10">

          {/* ❤️ HEART CARD */}
          <div
            onClick={() => setActive("heart")}
            className="w-[300px] h-[200px] bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            <h2 className="text-2xl font-bold text-purple-500">
              ❤️ Human Heart
            </h2>
          </div>

          {/* 🌌 SPACE CARD */}
          <div
            onClick={() => setActive("space")}
            className="w-[300px] h-[200px] bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            <h2 className="text-2xl font-bold text-purple-500">
              🌌 Solar System
            </h2>
          </div>

          {/* 🌍 EARTH CARD */}
          <div
            onClick={() => setActive("earth")}
            className="w-[300px] h-[200px] bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            <h2 className="text-2xl font-bold text-purple-500">
              🌍 Earth Explorer
            </h2>
          </div>

        </div>
      )}

      {/* 🎯 VIEW */}
      {active && (
        <div className="flex-1 relative z-10">

          {/* 🔙 BACK BUTTON */}
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 left-4 z-50 bg-black border border-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            ⬅ Back
          </button>

          {active === "heart" && <HeartViewer />}
          {active === "space" && <SolarSystem />}
          {active === "earth" && <EarthExplorer />}

        </div>
      )}

    </div>
  )
}








































// import { useState } from "react"
// import SolarSystem from "../components/GalaxyScene" // ✅ fixed
// import HeartViewer from "../components/HeartViewer"
// import EarthExplorer from "../components/EarthExplorer"
// // import Lightning from "../components/Lightning"

// export default function ARViewer() {
//   const [active, setActive] = useState<string | null>(null)

//   return (
//     <div className="w-full min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      
//       <h1 className="text-4xl text-center py-6">🚀 AR 3D Viewer</h1>

//       {!active && (
//         <div className="flex justify-around flex-1">
//           <button onClick={() => setActive("heart")}>Heart</button>
//           <button onClick={() => setActive("space")}>Space</button>
//           <button onClick={() => setActive("earth")}>Earth</button>
//         </div>
//       )}

//       {active && (
//         <>
//           <button onClick={() => setActive(null)}>Back</button>

//           {active === "heart" && <HeartViewer />}
//           {active === "space" && <SolarSystem />}
//           {active === "earth" && <EarthExplorer />}
//         </>
//       )}
//     </div>
//   )
// }