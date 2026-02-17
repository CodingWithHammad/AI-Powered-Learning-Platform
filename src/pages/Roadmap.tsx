import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { generateRoadmap } from "../lib/gemini";
import { languages } from "../constant";
import Lightning from "@/components/Lightning";

const Roadmap = () => {
  const { isSignedIn } = useAuth();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageClick = async (language: string) => {
    if (!isSignedIn) return;

    setSelectedLanguage(language);
    setIsLoading(true);
    setExpandedPhases(new Set([0]));

    try {
      const roadmap = await generateRoadmap(language);

      setRoadmapData({
        title: roadmap?.title || `${language} Learning Roadmap`,
        phases: roadmap?.phases || [],
      });
    } catch (err) {
      console.error("Roadmap Error:", err);

      setRoadmapData({
        title: `${language} Learning Roadmap`,
        phases: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePhase = (index: number) => {
    const newSet = new Set(expandedPhases);

    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);

    setExpandedPhases(newSet);
  };

  const resetView = () => {
    setSelectedLanguage(null);
    setRoadmapData(null);
    setExpandedPhases(new Set());
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#020202] relative overflow-hidden flex items-center justify-center">

        {/* LIGHTNING */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <Lightning hue={266} xOffset={-0.1} speed={1.2} intensity={1} size={1} />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-white/70 uppercase tracking-widest text-sm">
            Generating AI Roadmap...
          </p>
        </div>
      </section>
    );
  }

  /* ================= ROADMAP VIEW ================= */
  if (selectedLanguage && roadmapData) {
    return (
      <section className="min-h-screen bg-[#020202] text-white px-6 py-24 relative overflow-hidden">

        {/* LIGHTNING */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <Lightning hue={266} xOffset={-0.1} speed={1.2} intensity={1} size={1} />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">

          <div className="mb-16">
            <button
              onClick={resetView}
              className="text-purple-400 text-sm mb-6"
            >
              ← Back
            </button>

            <h1 className="text-5xl font-black uppercase">
              {roadmapData.title}
            </h1>

            <p className="text-white/40 text-sm mt-2">
              Structured AI Learning Path
            </p>
          </div>

          <div className="space-y-8">
            {(roadmapData.phases || []).map((phase: any, index: number) => {
              const open = expandedPhases.has(index);

              return (
                <div key={index} className="border border-white/10 bg-black p-8">

                  <button
                    onClick={() => togglePhase(index)}
                    className="flex justify-between w-full text-left"
                  >
                    <div>
                      <h2 className="text-2xl font-bold uppercase">
                        {phase?.phase || `Phase ${index + 1}`}
                      </h2>
                      <p className="text-white/40 text-sm">
                        {phase?.duration || ""}
                      </p>
                    </div>

                    <ChevronDown
                      className={`transition ${open ? "rotate-180 text-purple-400" : ""}`}
                    />
                  </button>

                  {open && (
                    <div className="mt-6 space-y-6">
                      {(phase?.topics || []).map((topic: any, i: number) => (
                        <div
                          key={i}
                          className="border border-purple-500/20 p-6 bg-purple-500/[0.02]"
                        >
                          <h3 className="font-bold text-lg mb-2">
                            {topic?.title || "Topic"}
                          </h3>

                          <p className="text-white/60 mb-4">
                            {topic?.description || ""}
                          </p>

                          {topic?.subtopics && (
                            <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-300">
                              {topic.subtopics.map((sub: string, idx: number) => (
                                <li key={idx}>• {sub}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/courses"
              className="bg-purple-600 hover:bg-purple-500 px-10 py-4 uppercase font-bold"
            >
              Take {selectedLanguage} Quiz
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ================= LANGUAGE SELECT ================= */
  return (
    <section className="py-32 px-6 lg:px-24 bg-[#020202] text-white relative overflow-hidden">

      {/* LIGHTNING */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Lightning hue={266} xOffset={-0.1} speed={1.2} intensity={1} size={1} />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-24">
          <h1 className="text-7xl font-black uppercase">
            Learning <span className="text-purple-500">Roadmaps</span>
          </h1>

          <p className="text-white/40 mt-4 uppercase text-sm tracking-widest">
            AI Generated Developer Paths
          </p>

          {!isSignedIn && (
            <div className="mt-10 border border-purple-500/20 p-10 max-w-md mx-auto">
              <p className="text-white/50 mb-6 uppercase text-xs">
                Authentication Required
              </p>

              <Link
                to="/sign-up"
                className="bg-purple-600 px-8 py-3 font-bold uppercase"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
          {languages.map((lang) => (
            <button
              key={lang.name}
              disabled={!isSignedIn}
              onClick={() => handleLanguageClick(lang.name)}
              className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
            >
              <div className="space-y-4 text-center">
                <img
                  src={lang.logo}
                  alt={lang.name}
                  className="w-14 h-14 mx-auto object-contain opacity-70 group-hover:opacity-100"
                />

                <h3 className="font-bold uppercase group-hover:text-purple-400">
                  {lang.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;














// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateRoadmap } from "../lib/gemini";
// import { languages } from "../constant";

// const Roadmap = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [roadmapData, setRoadmapData] = useState<any>(null);
//   const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   // ---------- Generate Roadmap ----------
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedPhases(new Set([0]));

//     try {
//       const roadmap = await generateRoadmap(language);

//       // SAFE fallback structure
//       setRoadmapData({
//         title: roadmap?.title || `${language} Learning Roadmap`,
//         phases: roadmap?.phases || [],
//       });
//     } catch (err) {
//       console.error("Roadmap Error:", err);

//       setRoadmapData({
//         title: `${language} Learning Roadmap`,
//         phases: [],
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------- Toggle Phase ----------
//   const togglePhase = (index: number) => {
//     const newSet = new Set(expandedPhases);

//     if (newSet.has(index)) {
//       newSet.delete(index);
//     } else {
//       newSet.add(index);
//     }

//     setExpandedPhases(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setRoadmapData(null);
//     setExpandedPhases(new Set());
//   };

//   // =============================
//   // LOADING SCREEN
//   // =============================
//   if (isLoading) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-[#020202]">
//         <div className="text-center">
//           <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//           <p className="text-white/70 mono uppercase tracking-widest text-sm">
//             Generating AI Roadmap...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // ROADMAP VIEW
//   // =============================
//   if (selectedLanguage && roadmapData) {
//     return (
//       <section className="min-h-screen bg-[#020202] text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto">

//           {/* Header */}
//           <div className="mb-16">
//             <button
//               onClick={resetView}
//               className="text-purple-400 text-sm mono mb-6"
//             >
//               ← Back
//             </button>

//             <h1 className="text-5xl font-black tracking-tight uppercase">
//               {roadmapData.title}
//             </h1>

//             <p className="text-white/40 mono text-sm mt-2">
//               Structured AI Learning Path
//             </p>
//           </div>

//           {/* Phases */}
//           <div className="space-y-8">
//             {(roadmapData.phases || []).map((phase: any, index: number) => {
//               const open = expandedPhases.has(index);

//               return (
//                 <div
//                   key={index}
//                   className="border border-white/10 bg-black p-8"
//                 >
//                   {/* Phase Header */}
//                   <button
//                     onClick={() => togglePhase(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h2 className="text-2xl font-bold uppercase">
//                         {phase?.phase || `Phase ${index + 1}`}
//                       </h2>
//                       <p className="text-white/40 text-sm">
//                         {phase?.duration || ""}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* Topics */}
//                   {open && (
//                     <div className="mt-6 space-y-6">
//                       {(phase?.topics || []).map((topic: any, i: number) => (
//                         <div
//                           key={i}
//                           className="border border-purple-500/20 p-6 bg-purple-500/[0.02]"
//                         >
//                           <h3 className="font-bold text-lg mb-2">
//                             {topic?.title || "Topic"}
//                           </h3>

//                           <p className="text-white/60 mb-4">
//                             {topic?.description || ""}
//                           </p>

//                           {topic?.subtopics && (
//                             <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-300">
//                               {topic.subtopics.map(
//                                 (sub: string, idx: number) => (
//                                   <li key={idx}>• {sub}</li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <div className="mt-20 text-center">
//             <Link
//               to="/courses"
//               className="bg-purple-600 hover:bg-purple-500 px-10 py-4 uppercase font-bold tracking-wide"
//             >
//               Take {selectedLanguage} Quiz
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // LANGUAGE SELECT VIEW
//   // =============================
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] text-white">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Learning <span className="text-purple-500">Roadmaps</span>
//           </h1>

//           <p className="text-white/40 mt-4 mono uppercase text-sm tracking-widest">
//             AI Generated Developer Paths
//           </p>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-10 max-w-md mx-auto">
//               <p className="text-white/50 mb-6 uppercase mono text-xs">
//                 Authentication Required
//               </p>

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 px-8 py-3 font-bold uppercase"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Languages Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="space-y-4 text-center">
//                 <img
//                   src={lang.logo}
//                   alt={lang.name}
//                   className="w-14 h-14 mx-auto object-contain opacity-70 group-hover:opacity-100"
//                 />

//                 <h3 className="font-bold uppercase group-hover:text-purple-400">
//                   {lang.name}
//                 </h3>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roadmap;













































// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateRoadmap } from "../lib/gemini";
// import { languages } from "../constant";

// const Roadmap = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [roadmapData, setRoadmapData] = useState<any>(null);
//   const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   // ---------- Generate Roadmap ----------
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedPhases(new Set([0]));

//     try {
//       const roadmap = await generateRoadmap(language);

//       // SAFE fallback structure
//       setRoadmapData({
//         title: roadmap?.title || `${language} Learning Roadmap`,
//         phases: roadmap?.phases || [],
//       });
//     } catch (err) {
//       console.error("Roadmap Error:", err);

//       setRoadmapData({
//         title: `${language} Learning Roadmap`,
//         phases: [],
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------- Toggle Phase ----------
//   const togglePhase = (index: number) => {
//     const newSet = new Set(expandedPhases);

//     if (newSet.has(index)) {
//       newSet.delete(index);
//     } else {
//       newSet.add(index);
//     }

//     setExpandedPhases(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setRoadmapData(null);
//     setExpandedPhases(new Set());
//   };

//   // =============================
//   // LOADING SCREEN
//   // =============================
//   if (isLoading) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-[#020202]">
//         <div className="text-center">
//           <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//           <p className="text-white/70 mono uppercase tracking-widest text-sm">
//             Generating AI Roadmap...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // ROADMAP VIEW
//   // =============================
//   if (selectedLanguage && roadmapData) {
//     return (
//       <section className="min-h-screen bg-[#020202] text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto">

//           {/* Header */}
//           <div className="mb-16">
//             <button
//               onClick={resetView}
//               className="text-purple-400 text-sm mono mb-6"
//             >
//               ← Back
//             </button>

//             <h1 className="text-5xl font-black tracking-tight uppercase">
//               {roadmapData.title}
//             </h1>

//             <p className="text-white/40 mono text-sm mt-2">
//               Structured AI Learning Path
//             </p>
//           </div>

//           {/* Phases */}
//           <div className="space-y-8">
//             {(roadmapData.phases || []).map((phase: any, index: number) => {
//               const open = expandedPhases.has(index);

//               return (
//                 <div
//                   key={index}
//                   className="border border-white/10 bg-black p-8"
//                 >
//                   {/* Phase Header */}
//                   <button
//                     onClick={() => togglePhase(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h2 className="text-2xl font-bold uppercase">
//                         {phase?.phase || `Phase ${index + 1}`}
//                       </h2>
//                       <p className="text-white/40 text-sm">
//                         {phase?.duration || ""}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* Topics */}
//                   {open && (
//                     <div className="mt-6 space-y-6">
//                       {(phase?.topics || []).map((topic: any, i: number) => (
//                         <div
//                           key={i}
//                           className="border border-purple-500/20 p-6 bg-purple-500/[0.02]"
//                         >
//                           <h3 className="font-bold text-lg mb-2">
//                             {topic?.title || "Topic"}
//                           </h3>

//                           <p className="text-white/60 mb-4">
//                             {topic?.description || ""}
//                           </p>

//                           {topic?.subtopics && (
//                             <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-300">
//                               {topic.subtopics.map(
//                                 (sub: string, idx: number) => (
//                                   <li key={idx}>• {sub}</li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <div className="mt-20 text-center">
//             <Link
//               to="/courses"
//               className="bg-purple-600 hover:bg-purple-500 px-10 py-4 uppercase font-bold tracking-wide"
//             >
//               Take {selectedLanguage} Quiz
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // LANGUAGE SELECT VIEW
//   // =============================
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] text-white">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Learning <span className="text-purple-500">Roadmaps</span>
//           </h1>

//           <p className="text-white/40 mt-4 mono uppercase text-sm tracking-widest">
//             AI Generated Developer Paths
//           </p>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-10 max-w-md mx-auto">
//               <p className="text-white/50 mb-6 uppercase mono text-xs">
//                 Authentication Required
//               </p>

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 px-8 py-3 font-bold uppercase"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Languages Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="space-y-4 text-center">
//                 <img
//                   src={lang.logo}
//                   alt={lang.name}
//                   className="w-14 h-14 mx-auto object-contain opacity-70 group-hover:opacity-100"
//                 />

//                 <h3 className="font-bold uppercase group-hover:text-purple-400">
//                   {lang.name}
//                 </h3>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roadmap;

















































// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateRoadmap } from "../lib/gemini";
// import { languages } from "../constant";

// const Roadmap = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [roadmapData, setRoadmapData] = useState<any>(null);
//   const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   // ---------- Generate Roadmap ----------
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedPhases(new Set([0]));

//     try {
//       const roadmap = await generateRoadmap(language);

//       // SAFE fallback structure
//       setRoadmapData({
//         title: roadmap?.title || `${language} Learning Roadmap`,
//         phases: roadmap?.phases || [],
//       });
//     } catch (err) {
//       console.error("Roadmap Error:", err);

//       setRoadmapData({
//         title: `${language} Learning Roadmap`,
//         phases: [],
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------- Toggle Phase ----------
//   const togglePhase = (index: number) => {
//     const newSet = new Set(expandedPhases);

//     if (newSet.has(index)) {
//       newSet.delete(index);
//     } else {
//       newSet.add(index);
//     }

//     setExpandedPhases(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setRoadmapData(null);
//     setExpandedPhases(new Set());
//   };

//   // =============================
//   // LOADING SCREEN
//   // =============================
//   if (isLoading) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-[#020202]">
//         <div className="text-center">
//           <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//           <p className="text-white/70 mono uppercase tracking-widest text-sm">
//             Generating AI Roadmap...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // ROADMAP VIEW
//   // =============================
//   if (selectedLanguage && roadmapData) {
//     return (
//       <section className="min-h-screen bg-[#020202] text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto">

//           {/* Header */}
//           <div className="mb-16">
//             <button
//               onClick={resetView}
//               className="text-purple-400 text-sm mono mb-6"
//             >
//               ← Back
//             </button>

//             <h1 className="text-5xl font-black tracking-tight uppercase">
//               {roadmapData.title}
//             </h1>

//             <p className="text-white/40 mono text-sm mt-2">
//               Structured AI Learning Path
//             </p>
//           </div>

//           {/* Phases */}
//           <div className="space-y-8">
//             {(roadmapData.phases || []).map((phase: any, index: number) => {
//               const open = expandedPhases.has(index);

//               return (
//                 <div
//                   key={index}
//                   className="border border-white/10 bg-black p-8"
//                 >
//                   {/* Phase Header */}
//                   <button
//                     onClick={() => togglePhase(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h2 className="text-2xl font-bold uppercase">
//                         {phase?.phase || `Phase ${index + 1}`}
//                       </h2>
//                       <p className="text-white/40 text-sm">
//                         {phase?.duration || ""}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* Topics */}
//                   {open && (
//                     <div className="mt-6 space-y-6">
//                       {(phase?.topics || []).map((topic: any, i: number) => (
//                         <div
//                           key={i}
//                           className="border border-purple-500/20 p-6 bg-purple-500/[0.02]"
//                         >
//                           <h3 className="font-bold text-lg mb-2">
//                             {topic?.title || "Topic"}
//                           </h3>

//                           <p className="text-white/60 mb-4">
//                             {topic?.description || ""}
//                           </p>

//                           {topic?.subtopics && (
//                             <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-300">
//                               {topic.subtopics.map(
//                                 (sub: string, idx: number) => (
//                                   <li key={idx}>• {sub}</li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <div className="mt-20 text-center">
//             <Link
//               to="/courses"
//               className="bg-purple-600 hover:bg-purple-500 px-10 py-4 uppercase font-bold tracking-wide"
//             >
//               Take {selectedLanguage} Quiz
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // LANGUAGE SELECT VIEW
//   // =============================
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] text-white">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Learning <span className="text-purple-500">Roadmaps</span>
//           </h1>

//           <p className="text-white/40 mt-4 mono uppercase text-sm tracking-widest">
//             AI Generated Developer Paths
//           </p>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-10 max-w-md mx-auto">
//               <p className="text-white/50 mb-6 uppercase mono text-xs">
//                 Authentication Required
//               </p>

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 px-8 py-3 font-bold uppercase"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Languages Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="space-y-4 text-center">
//                 <img
//                   src={lang.logo}
//                   alt={lang.name}
//                   className="w-14 h-14 mx-auto object-contain opacity-70 group-hover:opacity-100"
//                 />

//                 <h3 className="font-bold uppercase group-hover:text-purple-400">
//                   {lang.name}
//                 </h3>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roadmap;
































// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateRoadmap } from "../lib/gemini";
// import { languages } from "../constant";

// const Roadmap = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [roadmapData, setRoadmapData] = useState<any>(null);
//   const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   // ---------- Generate Roadmap ----------
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedPhases(new Set([0]));

//     try {
//       const roadmap = await generateRoadmap(language);
//       setRoadmapData(roadmap);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------- Toggle Phase ----------
//   const togglePhase = (index: number) => {
//     const newSet = new Set(expandedPhases);

//     newSet.has(index) ? newSet.delete(index) : newSet.add(index);

//     setExpandedPhases(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setRoadmapData(null);
//     setExpandedPhases(new Set());
//   };

//   // =============================
//   // LOADING SCREEN
//   // =============================
//   if (isLoading) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-[#020202]">
//         <div className="text-center">
//           <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//           <p className="text-white/70 mono uppercase tracking-widest text-sm">
//             Generating AI Roadmap...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // ROADMAP VIEW
//   // =============================
//   if (selectedLanguage && roadmapData) {
//     return (
//       <section className="min-h-screen bg-[#020202] text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto">

//           {/* Header */}
//           <div className="mb-16">
//             <button
//               onClick={resetView}
//               className="text-purple-400 text-sm mono mb-6"
//             >
//               ← Back
//             </button>

//             <h1 className="text-5xl font-black tracking-tight uppercase">
//               {roadmapData.title}
//             </h1>

//             <p className="text-white/40 mono text-sm mt-2">
//               Structured AI Learning Path
//             </p>
//           </div>

//           {/* Phases */}
//           <div className="space-y-8">
//             {roadmapData.phases?.map((phase: any, index: number) => {
//               const open = expandedPhases.has(index);

//               return (
//                 <div
//                   key={index}
//                   className="border border-white/10 bg-black p-8"
//                 >
//                   {/* Phase Header */}
//                   <button
//                     onClick={() => togglePhase(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h2 className="text-2xl font-bold uppercase">
//                         {phase.phase}
//                       </h2>
//                       <p className="text-white/40 text-sm">
//                         {phase.duration}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* Topics */}
//                   {open && (
//                     <div className="mt-6 space-y-6">
//                       {phase.topics?.map((topic: any, i: number) => (
//                         <div
//                           key={i}
//                           className="border border-purple-500/20 p-6 bg-purple-500/[0.02]"
//                         >
//                           <h3 className="font-bold text-lg mb-2">
//                             {topic.title}
//                           </h3>

//                           <p className="text-white/60 mb-4">
//                             {topic.description}
//                           </p>

//                           {topic.subtopics && (
//                             <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-300">
//                               {topic.subtopics.map(
//                                 (sub: string, idx: number) => (
//                                   <li key={idx}>• {sub}</li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <div className="mt-20 text-center">
//             <Link
//               to="/courses"
//               className="bg-purple-600 hover:bg-purple-500 px-10 py-4 uppercase font-bold tracking-wide"
//             >
//               Take {selectedLanguage} Quiz
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // LANGUAGE SELECT VIEW
//   // =============================
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] text-white">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Learning <span className="text-purple-500">Roadmaps</span>
//           </h1>

//           <p className="text-white/40 mt-4 mono uppercase text-sm tracking-widest">
//             AI Generated Developer Paths
//           </p>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-10 max-w-md mx-auto">
//               <p className="text-white/50 mb-6 uppercase mono text-xs">
//                 Authentication Required
//               </p>

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 px-8 py-3 font-bold uppercase"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Languages Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="space-y-4 text-center">
//                 <img
//                   src={lang.logo}
//                   className="w-14 h-14 mx-auto object-contain opacity-70 group-hover:opacity-100"
//                 />

//                 <h3 className="font-bold uppercase group-hover:text-purple-400">
//                   {lang.name}
//                 </h3>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roadmap;






























































// import React from 'react';

// const Roadmaps: React.FC = () => {
//   const languages = [
//     { name: "JavaScript", icon: "JS" },
//     { name: "Python", icon: "PY" },
//     { name: "Java", icon: "JV" },
//     { name: "C++", icon: "C+" },
//     { name: "C#", icon: "C#" },
//     { name: "Go", icon: "GO" },
//     { name: "Rust", icon: "RS" },
//     { name: "PHP", icon: "PH" },
//     { name: "Swift", icon: "SW" },
//     { name: "Kotlin", icon: "KT" }
//   ];

//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] relative overflow-hidden border-t border-white/5">
//       {/* Visual background details */}
//       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-24 space-y-6">
//           <div className="flex justify-center mb-8">
//             <div className="w-20 h-20 rounded-full bg-purple-600/5 border border-purple-500/20 flex items-center justify-center glow-purple">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//               </svg>
//             </div>
//           </div>
          
//           <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
//             Learning <span className="text-purple-500">Roadmaps</span>
//           </h2>
          
//           <p className="text-white/40 max-w-xl mx-auto text-lg mono uppercase tracking-widest text-sm">
//             AI-generated learning paths from beginner to expert.
//           </p>

//           <div className="mt-12 max-w-xl mx-auto">
//             <div className="bg-[#0a0a0a] border border-white/10 p-10 relative glow-purple group">
//               {/* Corner Accents */}
//               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-500"></div>
//               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-500"></div>
              
//               <p className="mono text-[10px] text-white/30 uppercase tracking-[0.3em] mb-6">Authentication Required</p>
//               <h3 className="text-xl font-bold mb-8 uppercase tracking-tight text-white/80">Sign in to access personalized roadmaps</h3>
              
//               <button className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase px-10 py-4 flex items-center justify-center gap-3 mx-auto transition-all shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
//                 Get Started
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Language Selection Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
//           {languages.map((lang, idx) => (
//             <div key={idx} className="group bg-black p-12 flex flex-col items-center justify-center gap-6 hover:bg-purple-600/[0.03] transition-all cursor-pointer border border-transparent hover:border-purple-500/20 relative">
//               {/* Scanline effect on hover */}
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
              
//               <div className="w-16 h-16 border border-white/10 flex items-center justify-center bg-[#080808] group-hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all">
//                 <span className="mono text-xl font-bold text-white/40 group-hover:text-purple-400">
//                   {lang.icon}
//                 </span>
//               </div>
              
//               <div className="space-y-1 text-center">
//                 <h4 className="text-lg font-black uppercase tracking-tighter group-hover:text-purple-400 transition-colors">
//                   {lang.name}
//                 </h4>
//                 <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="w-4 h-[1px] bg-purple-500"></div>
//                   <div className="w-1 h-[1px] bg-purple-500"></div>
//                 </div>
//               </div>

//               {/* Module numbering */}
//               <span className="absolute bottom-4 right-4 mono text-[8px] text-white/10 group-hover:text-purple-500/40">
//                 PATH_ID_{idx + 100}
//               </span>
//             </div>
//           ))}
//         </div>
        
//         {/* Technical Footer Decoration */}
//         <div className="mt-20 flex justify-between items-center mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
//            <div className="flex gap-2">
//              <div className="w-1 h-1 bg-purple-500/40"></div>
//              <div className="w-8 h-1 bg-purple-500/20"></div>
//            </div>
//            <span>Mapping active nodes // Select target core</span>
//            <div className="flex gap-2 text-right">
//              <div className="w-8 h-1 bg-purple-500/20"></div>
//              <div className="w-1 h-1 bg-purple-500/40"></div>
//            </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Roadmaps;




// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import {
//   Map,
//   ChevronRight,
//   ChevronDown,
//   Clock,
//   Target,
//   CheckCircle,
// } from "lucide-react";
// import { generateRoadmap } from "../lib/gemini";
// import { languages } from "../constant/index";

// const Roadmap = () => {
//   const { isSignedIn } = useAuth();
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [roadmapData, setRoadmapData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set());

//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setIsLoading(true);
//     setSelectedLanguage(language);
//     setExpandedPhases(new Set([0]));

//     try {
//       const roadmap = await generateRoadmap(language);
//       setRoadmapData(roadmap);
//     } catch (error) {
//       console.error("Error generating roadmap:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePhaseExpansion = (phaseIndex: number) => {
//     const newExpanded = new Set(expandedPhases);
//     newExpanded.has(phaseIndex)
//       ? newExpanded.delete(phaseIndex)
//       : newExpanded.add(phaseIndex);

//     setExpandedPhases(newExpanded);
//   };

//   const handleBackToLanguages = () => {
//     setSelectedLanguage(null);
//     setRoadmapData(null);
//     setExpandedPhases(new Set());
//   };

//   /* ================= LOADING ================= */

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center">
//         <div>
//           <div className="w-28 h-28 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
//           <h2 className="text-2xl font-semibold text-white mb-2">
//             Generating Roadmap...
//           </h2>
//           <p className="text-gray-400">
//             Preparing learning path for {selectedLanguage}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /* ================= ROADMAP VIEW ================= */

//   if (selectedLanguage && roadmapData) {
//     return (
//       <div className="min-h-screen text-gray-200">
//         <section className="container mx-auto px-6 py-20">

//           {/* Header */}
//           <div className="flex items-center mb-12">
//             <button
//               onClick={handleBackToLanguages}
//               className="mr-6 p-2 rounded-lg hover:bg-purple-500/10 transition"
//             >
//               <ChevronRight className="w-6 h-6 text-purple-400 rotate-180" />
//             </button>

//             <div>
//               <h1 className="text-4xl font-bold text-white">
//                 {roadmapData.title}
//               </h1>
//               <p className="text-gray-400 mt-2">
//                 Your personalized learning journey
//               </p>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="max-w-4xl mx-auto space-y-8">
//             {roadmapData.phases?.map((phase: any, phaseIndex: number) => {
//               const isExpanded = expandedPhases.has(phaseIndex);

//               return (
//                 <div key={phaseIndex} className="relative">

//                   {/* Line */}
//                   {phaseIndex < roadmapData.phases.length - 1 && (
//                     <div className="absolute left-8 top-20 w-[2px] h-14 bg-purple-500/30" />
//                   )}

//                   <div className="flex items-start">

//                     {/* Phase Icon */}
//                     <div className="flex-shrink-0 w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl backdrop-blur-xl">
//                       {phaseIndex + 1}
//                     </div>

//                     {/* Phase Card */}
//                     <div className="flex-grow ml-6">
//                       <button
//                         onClick={() => togglePhaseExpansion(phaseIndex)}
//                         className="w-full text-left p-6 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition group"
//                       >
//                         <div className="flex justify-between items-center">

//                           <div>
//                             <div className="flex items-center mb-2">
//                               <h3 className="text-2xl font-semibold text-white mr-4">
//                                 {phase.phase}
//                               </h3>

//                               {phase.duration && (
//                                 <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center">
//                                   <Clock className="w-4 h-4 mr-1" />
//                                   {phase.duration}
//                                 </span>
//                               )}
//                             </div>

//                             <p className="text-gray-400">
//                               {phase.topics?.length || 0} topics to master
//                             </p>
//                           </div>

//                           <ChevronDown
//                             className={`w-6 h-6 text-purple-400 transition ${
//                               isExpanded ? "rotate-180" : ""
//                             }`}
//                           />
//                         </div>
//                       </button>

//                       {/* Topics */}
//                       {isExpanded && (
//                         <div className="mt-4 space-y-4">
//                           {phase.topics?.map((topic: any, i: number) => (
//                             <div
//                               key={i}
//                               className="p-6 rounded-xl bg-black/30 border border-purple-500/10 backdrop-blur-xl"
//                             >
//                               <div className="flex items-start">

//                                 <div className="mr-4 mt-1">
//                                   <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
//                                     <Target className="w-4 h-4 text-purple-400" />
//                                   </div>
//                                 </div>

//                                 <div>
//                                   <h4 className="text-lg font-semibold text-white mb-2">
//                                     {topic.title}
//                                   </h4>

//                                   <p className="text-gray-400 mb-4">
//                                     {topic.description}
//                                   </p>

//                                   {topic.subtopics && (
//                                     <div className="grid md:grid-cols-2 gap-2">
//                                       {topic.subtopics.map(
//                                         (sub: string, idx: number) => (
//                                           <div key={idx} className="flex items-center">
//                                             <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
//                                             <span className="text-sm text-gray-400">
//                                               {sub}
//                                             </span>
//                                           </div>
//                                         )
//                                       )}
//                                     </div>
//                                   )}
//                                 </div>

//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* CTA */}
//           <div className="text-center mt-16">
//             <div className="p-10 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl max-w-2xl mx-auto">

//               <h3 className="text-2xl font-semibold text-white mb-4">
//                 Ready to Start Your Journey?
//               </h3>

//               <p className="text-gray-400 mb-6">
//                 Test your knowledge with AI quizzes and track progress.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">

//                 <Link
//                   to="/courses"
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition"
//                 >
//                   Take {selectedLanguage} Quiz
//                 </Link>

//                 <button
//                   onClick={handleBackToLanguages}
//                   className="border border-purple-500/40 text-purple-300 px-8 py-3 rounded-lg hover:bg-purple-500/10 transition"
//                 >
//                   Explore Other Languages
//                 </button>

//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   /* ================= LANGUAGE LIST VIEW ================= */

//   return (
//     <div className="min-h-screen text-gray-200">
//       <section className="container mx-auto px-6 py-24 text-center">

//         {/* Hero */}
//         <div className="flex justify-center mb-10">
//           <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-xl">
//             <Map className="w-12 h-12 text-purple-400" />
//           </div>
//         </div>

//         <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
//           Learning <span className="text-purple-400">Roadmaps</span>
//         </h1>

//         <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
//           AI-generated learning paths from beginner to expert.
//         </p>

//         {!isSignedIn && (
//           <div className="p-6 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl max-w-md mx-auto">
//             <p className="text-gray-400 mb-4">
//               Sign in to access personalized roadmaps
//             </p>

//             <Link
//               to="/sign-up"
//               className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//             >
//               Get Started
//               <ChevronRight className="ml-2 w-4 h-4" />
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* Languages */}
//       <section className="container mx-auto px-6 pb-24">
//         <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 max-w-6xl mx-auto">

//           {languages.map((language) => (
//             <button
//               key={language.name}
//               onClick={() => handleLanguageClick(language.name)}
//               disabled={!isSignedIn}
//               className={`group p-6 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition hover:-translate-y-1 ${
//                 !isSignedIn ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <div className="text-center">

//                 <div className="bg-purple-500/10 w-16 h-16 rounded-lg p-3 mx-auto mb-4 group-hover:bg-purple-500/20 transition">
//                   <img
//                     src={language.logo}
//                     alt={language.name}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 <h3 className="text-lg font-semibold text-white group-hover:text-purple-300">
//                   {language.name}
//                 </h3>

//               </div>
//             </button>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Roadmap;




// import { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { Map, ChevronRight, ChevronDown, Clock, Target, CheckCircle } from 'lucide-react'
// import { generateRoadmap } from '../lib/gemini'
// import { languages } from '../constant/index'

// const Roadmap = () => {
//   const { isSignedIn } = useAuth()
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
//   const [roadmapData, setRoadmapData] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set())


//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return
    
//     setIsLoading(true)
//     setSelectedLanguage(language)
//     setExpandedPhases(new Set([0])) // Expand first phase by default
    
//     try {
//       const roadmap = await generateRoadmap(language)
//       setRoadmapData(roadmap)
//     } catch (error) {
//       console.error('Error generating roadmap:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const togglePhaseExpansion = (phaseIndex: number) => {
//     const newExpanded = new Set(expandedPhases)
//     if (newExpanded.has(phaseIndex)) {
//       newExpanded.delete(phaseIndex)
//     } else {
//       newExpanded.add(phaseIndex)
//     }
//     setExpandedPhases(newExpanded)
//   }

//   const handleBackToLanguages = () => {
//     setSelectedLanguage(null)
//     setRoadmapData(null)
//     setExpandedPhases(new Set())
//   }

//   const getPhaseColor = (phaseIndex: number) => {
//     const colors = [
//       'from-green-400 to-blue-500',
//       'from-blue-400 to-purple-500',
//       'from-purple-400 to-pink-500',
//       'from-pink-400 to-red-500'
//     ]
//     return colors[phaseIndex % colors.length]
//   }

//   const getPhaseIcon = (phaseIndex: number) => {
//     if (phaseIndex === 0) return '🌱'
//     if (phaseIndex === 1) return '🌿'
//     if (phaseIndex === 2) return '🌳'
//     return '🏆'
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-4">Generating Roadmap...</h2>
//           <p className="text-gray-300">Our AI is creating a personalized learning path for {selectedLanguage}</p>
//         </div>
//       </div>
//     )
//   }

//   if (selectedLanguage && roadmapData) {
//     return (
//       <div className="min-h-screen">
//         <section className="container mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="flex items-center mb-12">
//             <button
//               onClick={handleBackToLanguages}
//               className="mr-6 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
//             >
//               <ChevronRight className="w-6 h-6 text-purple-400 transform rotate-180" />
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 {roadmapData.title}
//               </h1>
//               <p className="text-gray-300 mt-2">Your personalized learning journey</p>
//             </div>
//           </div>

//           {/* Roadmap Timeline */}
//           <div className="max-w-4xl mx-auto">
//             <div className="space-y-8">
//               {roadmapData.phases?.map((phase: any, phaseIndex: number) => {
//                 const isExpanded = expandedPhases.has(phaseIndex)
                
//                 return (
//                   <div key={phaseIndex} className="relative">
//                     {/* Connecting Line */}
//                     {phaseIndex < roadmapData.phases.length - 1 && (
//                       <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-purple-500 to-pink-500"></div>
//                     )}
                    
//                     <div className="flex items-start">
//                       {/* Phase Icon */}
//                       <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${getPhaseColor(phaseIndex)} flex items-center justify-center text-2xl shadow-lg z-10`}>
//                         {getPhaseIcon(phaseIndex)}
//                       </div>
                      
//                       {/* Phase Content */}
//                       <div className="flex-grow ml-6">
//                         <button
//                           onClick={() => togglePhaseExpansion(phaseIndex)}
//                           className="w-full text-left bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
//                         >
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <div className="flex items-center mb-2">
//                                 <h3 className="text-2xl font-bold text-white mr-4">{phase.phase}</h3>
//                                 {phase.duration && (
//                                   <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 flex items-center">
//                                     <Clock className="w-4 h-4 mr-1" />
//                                     {phase.duration}
//                                   </span>
//                                 )}
//                               </div>
//                               <p className="text-gray-300">
//                                 {phase.topics?.length || 0} topics to master in this phase
//                               </p>
//                             </div>
                            
//                             <ChevronDown className={`w-6 h-6 text-purple-400 transition-transform group-hover:text-purple-300 ${isExpanded ? 'rotate-180' : ''}`} />
//                           </div>
//                         </button>
                        
//                         {/* Phase Topics */}
//                         {isExpanded && (
//                           <div className="mt-4 space-y-4">
//                             {phase.topics?.map((topic: any, topicIndex: number) => (
//                               <div key={topicIndex} className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-6 rounded-xl border border-purple-500/10">
//                                 <div className="flex items-start">
//                                   <div className="flex-shrink-0 mr-4 mt-1">
//                                     <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
//                                       <Target className="w-4 h-4 text-purple-400" />
//                                     </div>
//                                   </div>
                                  
//                                   <div className="flex-grow">
//                                     <h4 className="text-lg font-semibold text-white mb-2">{topic.title}</h4>
//                                     <p className="text-gray-300 mb-4">{topic.description}</p>
                                    
//                                     {topic.subtopics && topic.subtopics.length > 0 && (
//                                       <div>
//                                         <h5 className="text-sm font-medium text-purple-300 mb-3">Key Concepts:</h5>
//                                         <div className="grid md:grid-cols-2 gap-2">
//                                           {topic.subtopics.map((subtopic: string, subtopicIndex: number) => (
//                                             <div key={subtopicIndex} className="flex items-center">
//                                               <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
//                                               <span className="text-sm text-gray-300">{subtopic}</span>
//                                             </div>
//                                           ))}
//                                         </div>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="text-center mt-16">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
//               <p className="text-gray-300 mb-6">
//                 Test your knowledge with our AI-generated quizzes and track your progress as you follow this roadmap.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/courses"
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//                 >
//                   Take {selectedLanguage} Quiz
//                 </Link>
//                 <button
//                   onClick={handleBackToLanguages}
//                   className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
//                 >
//                   Explore Other Languages
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen">
//       <section className="container mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="flex justify-center mb-8">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
//               <Map className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Learning Roadmaps
//           </h1>
          
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
//             Get personalized, AI-generated learning roadmaps for any programming language. 
//             Follow structured paths from beginner to expert level.
//           </p>
          
//           {!isSignedIn && (
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
//               <p className="text-purple-300 mb-4">Sign in to access personalized roadmaps</p>
//               <Link
//                 to="/sign-up"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
//               >
//                 Get Started
//                 <ChevronRight className="ml-2 w-4 h-4" />
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Features */}
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-4xl mb-4">🎯</div>
//             <h3 className="text-xl font-bold text-white mb-2">Personalized Paths</h3>
//             <p className="text-gray-300">AI-generated roadmaps tailored to your learning goals and current skill level</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-4xl mb-4">📚</div>
//             <h3 className="text-xl font-bold text-white mb-2">Structured Learning</h3>
//             <p className="text-gray-300">Step-by-step progression from beginner concepts to advanced techniques</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-4xl mb-4">⚡</div>
//             <h3 className="text-xl font-bold text-white mb-2">Real-time Updates</h3>
//             <p className="text-gray-300">Roadmaps updated with the latest industry trends and best practices</p>
//           </div>
//         </div>

//         {/* Programming Languages Grid */}
//         <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6">
//           {languages.map((language) => (
//             <button
//               key={language.name}
//               onClick={() => handleLanguageClick(language.name)}
//               disabled={!isSignedIn}
//               className={`group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
//                 !isSignedIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//               }`}
//             >
//               <div className="text-center">
//                 <div className="bg-white/10 w-16 h-16 rounded-lg p-3 mx-auto mb-4 group-hover:bg-white/20 transition-colors">
//                   <img
//                     src={language.logo}
//                     alt={language.name}
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement
//                       target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a855f7'%3E%3Cpath d='M12 2L2 7V17L12 22L22 17V7L12 2M12 4.44L19.55 8.5L12 12.56L4.45 8.5L12 4.44M4 10.37L11 14.15V20.85L4 17.07V10.37M20 10.37V17.07L13 20.85V14.15L20 10.37Z'/%3E%3C/svg%3E`
//                     }}
//                   />
//                 </div>
//                 <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
//                   {language.name}
//                 </h3>
//               </div>
              
//               {isSignedIn && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
//               )}
              
//               {!isSignedIn && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
//                   <span className="text-purple-300 font-medium">Sign in required</span>
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Call to Action */}
//         {!isSignedIn && (
//           <div className="text-center mt-16">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Start Your Learning Journey</h3>
//               <p className="text-gray-300 mb-6">
//                 Join thousands of developers who are advancing their careers with our AI-powered learning platform.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/sign-up"
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//                 >
//                   Create Free Account
//                 </Link>
//                 <Link
//                   to="/about"
//                   className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   )
// }

// export default Roadmap