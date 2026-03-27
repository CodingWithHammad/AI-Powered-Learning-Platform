
"use client"

import { useState } from "react"
import SolarSystem from "@/components/SolarSystem" // ✅ fixed
import HeartViewer from "../components/HeartViewer"
import EarthExplorer from "../components/EarthExplorer"
import Lightning from "../components/Lightning" // 👈 IMPORT THIS

export default function ARViewer() {

  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* ⚡ BACKGROUND EFFECT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

        {/* Lightning */}
        <div className="absolute inset-0">
          <Lightning
            hue={209}
            xOffset={-0.1}
            speed={1.5}
            intensity={2}
            size={1}
          />
        </div>

        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-900/10 blur-[120px] rounded-full"></div>

      </div>

      {/* 🔥 Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center py-6 border-b border-slate-700 relative z-10">
        🚀 AR 3D Viewer
      </h1>

      {/* 🔘 MENU */}
      {!active && (
        <div className="flex justify-around items-center flex-1 text-center px-6 relative z-10">

          <button
            onClick={() => setActive("heart")}
            className="text-xl md:text-2xl hover:text-sky-400 transition"
          >
            ❤️ Human Heart
          </button>

          <button
            onClick={() => setActive("space")}
            className="text-xl md:text-2xl hover:text-sky-400 transition"
          >
            🌌 Space Simulator
          </button>

          <button
            onClick={() => setActive("earth")}
            className="text-xl md:text-2xl hover:text-sky-400 transition"
          >
            🌍 3D Earth Explorer
          </button>

        </div>
      )}

      {/* 🎯 VIEW */}
      {active && (
        <div className="flex-1 relative z-10">

          {/* 🔙 Back */}
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 left-4 z-50 bg-slate-800 px-4 py-2 rounded hover:bg-sky-600"
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