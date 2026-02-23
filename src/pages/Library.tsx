import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { generateLibraryNotes } from "../lib/gemini";
import Lightning from "@/components/Lightning";

const Library = () => {
  const { isSignedIn } = useAuth();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [notesData, setNotesData] = useState<any>(null);
  const [expandedExamples, setExpandedExamples] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Enhanced Languages (Rust Removed)
  const languages = [
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
    { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "R", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
    { name: "Scala", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg" }
  ];

  const handleLanguageClick = async (language: string) => {
    if (!isSignedIn) return;

    setSelectedLanguage(language);
    setIsLoading(true);
    setExpandedExamples(new Set([0]));

    try {
      const notes = await generateLibraryNotes(language);
      setNotesData(notes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExample = (index: number) => {
    const newSet = new Set(expandedExamples);
    newSet.has(index) ? newSet.delete(index) : newSet.add(index);
    setExpandedExamples(newSet);
  };

  const resetView = () => {
    setSelectedLanguage(null);
    setNotesData(null);
    setExpandedExamples(new Set());
  };

  const Background = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <Lightning hue={266} xOffset={-0.1} speed={1.5}
            intensity={2}
            size={1} />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[140px] rounded-full"></div>
    </div>
  );

  // ================= LOADING =================
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[#020202] text-white">
        <Background />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-purple-400 uppercase tracking-widest text-sm">
            Generating AI Notes...
          </p>
        </div>
      </section>
    );
  }

  // ================= NOTES VIEW =================
  if (selectedLanguage && notesData) {
    return (
      <section className="relative min-h-screen bg-[#020202] text-white px-6 py-24">
        <Background />

        <div className="relative z-10 max-w-4xl mx-auto">

          <button
            onClick={resetView}
            className="text-purple-400 text-sm mb-8 hover:underline"
          >
            ← Back to Library
          </button>

          <h1 className="text-5xl font-black uppercase mb-10 tracking-tight">
            {notesData.title}
          </h1>

          {/* Theory Card */}
          <div className="border border-purple-500/30 p-8 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-xl rounded-2xl mb-12 shadow-xl">
            <h2 className="text-xl font-bold mb-4 uppercase text-purple-400">
              Theory
            </h2>
            <p className="text-white/70 whitespace-pre-line leading-relaxed">
              {notesData.theory}
            </p>
          </div>

          {/* Examples */}
          <div className="space-y-6">
            {notesData.examples?.map((example: any, index: number) => {
              const open = expandedExamples.has(index);

              return (
                <div
                  key={index}
                  className="border border-white/10 bg-black/60 p-6 rounded-xl transition hover:border-purple-500/40"
                >
                  <button
                    onClick={() => toggleExample(index)}
                    className="flex justify-between w-full text-left"
                  >
                    <div>
                      <h3 className="text-lg font-bold">
                        {example.title}
                      </h3>
                      <p className="text-white/40 text-sm">
                        {example.description}
                      </p>
                    </div>

                    <ChevronDown
                      className={`transition duration-300 ${
                        open ? "rotate-180 text-purple-400" : ""
                      }`}
                    />
                  </button>

                  {open && (
                    <pre className="mt-6 bg-[#050505] p-4 border border-purple-500/30 rounded-xl text-purple-300 overflow-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Button */}
          <div className="mt-20 text-center">
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 hover:scale-105 transition transform px-12 py-4 uppercase font-bold rounded-full shadow-lg shadow-purple-600/30"
            >
              Take {selectedLanguage} Quiz
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ================= LANGUAGE GRID =================
  return (
    <section className="relative py-32 px-6 lg:px-24 bg-[#020202] text-white">
      <Background />

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tight">
            Programming <span className="text-purple-500">Library</span>
          </h1>
          <p className="text-white/40 mt-4">
            Select a language to generate AI-powered notes instantly
          </p>
        </div>

        {/* Enhanced Language Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {languages.map((lang) => (
            <button
              key={lang.name}
              disabled={!isSignedIn}
              onClick={() => handleLanguageClick(lang.name)}
              className="group relative bg-black/60 border border-white/10 p-8 rounded-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="absolute inset-0 rounded-2xl bg-purple-600/0 group-hover:bg-purple-600/5 transition"></div>

              <img
                src={lang.logo}
                alt={lang.name}
                className="w-16 h-16 mx-auto mb-6 object-contain transition group-hover:scale-110"
              />

              <h3 className="font-bold uppercase text-sm tracking-wide group-hover:text-purple-400 transition">
                {lang.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;








// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateLibraryNotes } from "../lib/gemini";
// import Lightning from "@/components/Lightning";

// const Library = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [notesData, setNotesData] = useState<any>(null);
//   const [expandedExamples, setExpandedExamples] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Languages With Logos
//   const languages = [
//     { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
//     { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
//     { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
//     { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
//     { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
//     { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
//     { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
//     { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg" },
//     { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
//     { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
//     { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
//     { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
//     { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
//     { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
//     { name: "R", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
//     { name: "Scala", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg" }
//   ];

//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedExamples(new Set([0]));

//     try {
//       const notes = await generateLibraryNotes(language);
//       setNotesData(notes);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleExample = (index: number) => {
//     const newSet = new Set(expandedExamples);
//     newSet.has(index) ? newSet.delete(index) : newSet.add(index);
//     setExpandedExamples(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setNotesData(null);
//     setExpandedExamples(new Set());
//   };

//   const Background = () => (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//       <Lightning hue={266} xOffset={-0.1} speed={1.2} intensity={1} size={1} />
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center bg-[#020202] text-white">
//         <Background />
//         <div className="relative z-10 text-center">
//           <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//           <p className="text-white/70 uppercase tracking-widest text-sm">
//             Generating AI Notes...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   if (selectedLanguage && notesData) {
//     return (
//       <section className="relative min-h-screen bg-[#020202] text-white px-6 py-24">
//         <Background />
//         <div className="relative z-10 max-w-4xl mx-auto">

//           <button onClick={resetView} className="text-purple-400 text-sm mb-6">
//             ← Back
//           </button>

//           <h1 className="text-5xl font-black uppercase mb-6">
//             {notesData.title}
//           </h1>

//           <div className="border border-purple-500/20 p-8 bg-purple-500/[0.02] mb-10 backdrop-blur">
//             <h2 className="text-xl font-bold mb-4 uppercase">Theory</h2>
//             <p className="text-white/70 whitespace-pre-line">
//               {notesData.theory}
//             </p>
//           </div>

//           <div className="space-y-6">
//             {notesData.examples?.map((example: any, index: number) => {
//               const open = expandedExamples.has(index);
//               return (
//                 <div key={index} className="border border-white/10 bg-black/60 p-8">
//                   <button
//                     onClick={() => toggleExample(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h3 className="text-xl font-bold">{example.title}</h3>
//                       <p className="text-white/40 text-sm">
//                         {example.description}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {open && (
//                     <pre className="mt-6 bg-[#050505] p-4 border border-purple-500/20 text-purple-300 overflow-auto">
//                       <code>{example.code}</code>
//                     </pre>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-20 text-center">
//             <Link
//               to="/courses"
//               className="bg-purple-600 hover:bg-purple-500 px-10 py-4 uppercase font-bold"
//             >
//               Take {selectedLanguage} Quiz
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative py-32 px-6 lg:px-24 bg-[#020202] text-white">
//       <Background />

//       <div className="relative z-10 max-w-7xl mx-auto">
//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Programming <span className="text-purple-500">Library</span>
//           </h1>
//         </div>

//         {/* ✅ Language Grid With Logos */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black border border-white/10 p-10 hover:border-purple-500/40 hover:-translate-y-1 transition text-center"
//             >
//               <img
//                 src={lang.logo}
//                 alt={lang.name}
//                 className="w-14 h-14 mx-auto mb-6 object-contain"
//               />

//               <h3 className="font-bold uppercase group-hover:text-purple-400">
//                 {lang.name}
//               </h3>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Library;









































// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateLibraryNotes } from "../lib/gemini";
// import Lightning from "@/components/Lightning";

// const Library = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [notesData, setNotesData] = useState<any>(null);
//   const [expandedExamples, setExpandedExamples] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   const languages = [
//     { name: "JavaScript", icon: "JS" },
//     { name: "Python", icon: "PY" },
//     { name: "Java", icon: "JV" },
//     { name: "C++", icon: "C+" },
//     { name: "C#", icon: "C#" }
//   ];

//   // ---------- Generate Notes ----------
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedExamples(new Set([0]));

//     try {
//       const notes = await generateLibraryNotes(language);
//       setNotesData(notes);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleExample = (index: number) => {
//     const newSet = new Set(expandedExamples);
//     newSet.has(index) ? newSet.delete(index) : newSet.add(index);
//     setExpandedExamples(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setNotesData(null);
//     setExpandedExamples(new Set());
//   };

//   // =============================
//   // LIGHTNING BACKGROUND WRAPPER
//   // =============================
//   const Background = () => (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//       <div className="absolute inset-0">
//         <Lightning
//           hue={266}
//           xOffset={-0.1}
//           speed={1.2}
//           intensity={1}
//           size={1}
//         />
//       </div>

//       {/* Glow */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//     </div>
//   );

//   // =============================
//   // LOADING SCREEN
//   // =============================
//   if (isLoading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center bg-[#020202] text-white">

//         <Background />

//         <div className="relative z-10 text-center">
//           <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
//           <p className="text-white/70 uppercase tracking-widest text-sm">
//             Generating AI Notes...
//           </p>
//         </div>

//       </section>
//     );
//   }

//   // =============================
//   // NOTES VIEW
//   // =============================
//   if (selectedLanguage && notesData) {
//     return (
//       <section className="relative min-h-screen bg-[#020202] text-white px-6 py-24">

//         <Background />

//         <div className="relative z-10 max-w-4xl mx-auto">

//           {/* Header */}
//           <div className="mb-16">
//             <button
//               onClick={resetView}
//               className="text-purple-400 text-sm mb-6"
//             >
//               ← Back
//             </button>

//             <h1 className="text-5xl font-black uppercase">
//               {notesData.title}
//             </h1>

//             <p className="text-white/40 text-sm mt-2">
//               AI Generated Programming Notes
//             </p>
//           </div>

//           {/* Theory */}
//           <div className="border border-purple-500/20 p-8 bg-purple-500/[0.02] mb-10 backdrop-blur">
//             <h2 className="text-xl font-bold mb-4 uppercase">
//               Theory
//             </h2>

//             <p className="text-white/70 whitespace-pre-line">
//               {notesData.theory}
//             </p>
//           </div>

//           {/* Examples */}
//           <div className="space-y-6">
//             {notesData.examples?.map((example: any, index: number) => {
//               const open = expandedExamples.has(index);

//               return (
//                 <div
//                   key={index}
//                   className="border border-white/10 bg-black/60 backdrop-blur p-8"
//                 >
//                   <button
//                     onClick={() => toggleExample(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h3 className="text-xl font-bold">
//                         {example.title}
//                       </h3>
//                       <p className="text-white/40 text-sm">
//                         {example.description}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {open && (
//                     <pre className="mt-6 bg-[#050505] p-4 border border-purple-500/20 text-purple-300 overflow-auto">
//                       <code>{example.code}</code>
//                     </pre>
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
//     <section className="relative py-32 px-6 lg:px-24 bg-[#020202] text-white">

//       <Background />

//       <div className="relative z-10 max-w-7xl mx-auto">

//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Programming <span className="text-purple-500">Library</span>
//           </h1>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-10 max-w-md mx-auto">
//               <p className="text-white/50 mb-6 uppercase text-xs">
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

//         {/* Languages */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="space-y-4 text-center">
//                 <div className="w-14 h-14 border border-white/10 flex items-center justify-center mx-auto">
//                   {lang.icon}
//                 </div>

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

// export default Library;






























// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { generateLibraryNotes } from "../lib/gemini";

// const Library = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [notesData, setNotesData] = useState<any>(null);
//   const [expandedExamples, setExpandedExamples] = useState<Set<number>>(new Set());
//   const [isLoading, setIsLoading] = useState(false);

//   const languages = [
//     { name: "JavaScript", icon: "JS" },
//     { name: "Python", icon: "PY" },
//     { name: "Java", icon: "JV" },
//     { name: "C++", icon: "C+" },
//     { name: "C#", icon: "C#" }
//   ];

//   // ---------- Generate Notes ----------
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);
//     setExpandedExamples(new Set([0]));

//     try {
//       const notes = await generateLibraryNotes(language);
//       setNotesData(notes);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ---------- Toggle Example ----------
//   const toggleExample = (index: number) => {
//     const newSet = new Set(expandedExamples);
//     newSet.has(index) ? newSet.delete(index) : newSet.add(index);
//     setExpandedExamples(newSet);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setNotesData(null);
//     setExpandedExamples(new Set());
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
//             Generating AI Notes...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // NOTES VIEW
//   // =============================
//   if (selectedLanguage && notesData) {
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

//             <h1 className="text-5xl font-black uppercase">
//               {notesData.title}
//             </h1>

//             <p className="text-white/40 mono text-sm mt-2">
//               AI Generated Programming Notes
//             </p>
//           </div>

//           {/* Theory */}
//           <div className="border border-purple-500/20 p-8 bg-purple-500/[0.02] mb-10">
//             <h2 className="text-xl font-bold mb-4 uppercase">
//               Theory
//             </h2>

//             <p className="text-white/70 whitespace-pre-line">
//               {notesData.theory}
//             </p>
//           </div>

//           {/* Examples */}
//           <div className="space-y-6">
//             {notesData.examples?.map((example: any, index: number) => {
//               const open = expandedExamples.has(index);

//               return (
//                 <div
//                   key={index}
//                   className="border border-white/10 bg-black p-8"
//                 >
//                   <button
//                     onClick={() => toggleExample(index)}
//                     className="flex justify-between w-full text-left"
//                   >
//                     <div>
//                       <h3 className="text-xl font-bold">
//                         {example.title}
//                       </h3>
//                       <p className="text-white/40 text-sm">
//                         {example.description}
//                       </p>
//                     </div>

//                     <ChevronDown
//                       className={`transition ${
//                         open ? "rotate-180 text-purple-400" : ""
//                       }`}
//                     />
//                   </button>

//                   {open && (
//                     <pre className="mt-6 bg-[#050505] p-4 border border-purple-500/20 text-purple-300 overflow-auto">
//                       <code>{example.code}</code>
//                     </pre>
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

//         <div className="text-center mb-24">
//           <h1 className="text-7xl font-black uppercase">
//             Programming <span className="text-purple-500">Library</span>
//           </h1>

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

//         {/* Languages */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               disabled={!isSignedIn}
//               onClick={() => handleLanguageClick(lang.name)}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="space-y-4 text-center">
//                 <div className="w-14 h-14 border border-white/10 flex items-center justify-center mx-auto">
//                   {lang.icon}
//                 </div>

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

// export default Library;




























// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { generateLibraryNotes } from "../lib/gemini";

// const Library: React.FC = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [notesData, setNotesData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const languages = [
//     { name: "JavaScript", icon: "JS" },
//     { name: "Python", icon: "PY" },
//     { name: "Java", icon: "JV" },
//     { name: "C++", icon: "C+" },
//     { name: "C#", icon: "C#" }
//   ];

//   // 🔥 Generate Notes (Same Flow as Roadmap)
//   const handleSelectLanguage = async (lang: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(lang);
//     setIsLoading(true);

//     try {
//       const notes = await generateLibraryNotes(lang);
//       setNotesData(notes);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setNotesData(null);
//   };

//   // =============================
//   // LOADING SCREEN
//   // =============================
//   if (isLoading) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-black">
//         <p className="text-purple-400 mono uppercase">
//           Generating Notes...
//         </p>
//       </section>
//     );
//   }

//   // =============================
//   // NOTES VIEW
//   // =============================
//   if (selectedLanguage && notesData) {
//     return (
//       <section className="min-h-screen bg-black text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto space-y-12">

//           <button
//             onClick={resetView}
//             className="text-purple-400 mono text-sm"
//           >
//             ← Back
//           </button>

//           <h1 className="text-5xl font-black uppercase">
//             {selectedLanguage} Notes
//           </h1>

//           {/* Theory */}
//           <div className="border border-purple-500/20 p-8">
//             <h2 className="text-xl font-bold mb-4">Theory</h2>
//             <p className="text-white/70 whitespace-pre-line">
//               {notesData.theory}
//             </p>
//           </div>

//           {/* Code Examples */}
//           {notesData.codeExamples?.map((example: any, i: number) => (
//             <div
//               key={i}
//               className="border border-purple-500/20 p-8 space-y-4"
//             >
//               <h3 className="text-lg font-bold">{example.title}</h3>

//               <p className="text-white/60">
//                 {example.description}
//               </p>

//               <pre className="bg-[#050505] p-4 border border-white/10 text-purple-300 overflow-auto">
//                 <code>{example.code}</code>
//               </pre>
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // LANGUAGE SELECT VIEW
//   // =============================
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-black">
//       <div className="max-w-7xl mx-auto">

//         <div className="text-center mb-20">
//           <h1 className="text-7xl font-black uppercase">
//             Programming <span className="text-purple-500">Library</span>
//           </h1>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-8 max-w-md mx-auto">
//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 px-10 py-3 font-bold uppercase"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Language Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               onClick={() => handleSelectLanguage(lang.name)}
//               disabled={!isSignedIn}
//               className="group bg-black p-12 hover:bg-purple-500/[0.03] transition"
//             >
//               <div className="text-center space-y-4">
//                 <div className="w-14 h-14 border border-white/10 flex items-center justify-center mx-auto">
//                   {lang.icon}
//                 </div>

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

// export default Library;












































// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { generateNotes } from "../lib/gemini"; // 👈 NEW FUNCTION
// import { languages } from "../constant";

// const Library = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [notesData, setNotesData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // =============================
//   // GENERATE NOTES
//   // =============================
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setSelectedLanguage(language);
//     setIsLoading(true);

//     try {
//       const notes = await generateNotes(language);
//       setNotesData(notes);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//     setNotesData(null);
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
//             Generating AI Notes...
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // NOTES VIEW
//   // =============================
//   if (selectedLanguage && notesData) {
//     return (
//       <section className="min-h-screen bg-[#020202] text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto space-y-12">

//           <button
//             onClick={resetView}
//             className="text-purple-400 mono text-sm"
//           >
//             ← Back
//           </button>

//           <h1 className="text-5xl font-black uppercase">
//             {notesData.title}
//           </h1>

//           {/* Theory Sections */}
//           {notesData.sections?.map((section: any, index: number) => (
//             <div
//               key={index}
//               className="border border-purple-500/20 p-8 bg-purple-500/[0.02]"
//             >
//               <h2 className="text-xl font-bold mb-4">
//                 {section.heading}
//               </h2>

//               <p className="text-white/70 mb-6">
//                 {section.content}
//               </p>

//               {/* Code */}
//               {section.code && (
//                 <pre className="bg-black p-4 border border-white/10 text-purple-300 overflow-auto">
//                   <code>{section.code}</code>
//                 </pre>
//               )}

//               {/* Resources */}
//               {section.resources && (
//                 <ul className="mt-4 text-purple-300 text-sm space-y-1">
//                   {section.resources.map((res: string, i: number) => (
//                     <li key={i}>• {res}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}

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
//             Programming <span className="text-purple-500">Library</span>
//           </h1>

//           <p className="text-white/40 mt-4 mono uppercase text-sm tracking-widest">
//             AI Generated Programming Notes
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

//         {/* Language Grid */}
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

// export default Library;

























































































// import React, { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";

// const Library: React.FC = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

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

//   // 🔥 Mock Notes Data (Later you can connect Gemini or DB)
//   const notesData: any = {
//     JavaScript: {
//       theory: "JavaScript is a high-level scripting language used for web development.",
//       example: `console.log("Hello World");`,
//       resources: [
//         "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
//         "https://www.youtube.com/watch?v=W6NZfCO5SIk"
//       ]
//     },
//     Python: {
//       theory: "Python is a beginner-friendly language widely used in AI and automation.",
//       example: `print("Hello World")`,
//       resources: [
//         "https://docs.python.org/3/",
//         "https://www.youtube.com/watch?v=_uQrJ0TkZlc"
//       ]
//     }
//   };

//   const handleSelectLanguage = (lang: string) => {
//     if (!isSignedIn) return;
//     setSelectedLanguage(lang);
//   };

//   const resetView = () => {
//     setSelectedLanguage(null);
//   };

//   // =============================
//   // NOTES VIEW
//   // =============================
//   if (selectedLanguage && notesData[selectedLanguage]) {
//     const data = notesData[selectedLanguage];

//     return (
//       <section className="min-h-screen bg-black text-white px-6 py-24">
//         <div className="max-w-4xl mx-auto space-y-12">

//           <button
//             onClick={resetView}
//             className="text-purple-400 mono text-sm"
//           >
//             ← Back to Library
//           </button>

//           <h1 className="text-5xl font-black uppercase">
//             {selectedLanguage} Notes
//           </h1>

//           {/* Theory */}
//           <div className="border border-purple-500/20 p-8 bg-purple-500/[0.03]">
//             <h2 className="text-xl font-bold mb-4">Theory</h2>
//             <p className="text-white/70">{data.theory}</p>
//           </div>

//           {/* Code Example */}
//           <div className="border border-purple-500/20 p-8 bg-black">
//             <h2 className="text-xl font-bold mb-4">Code Example</h2>

//             <pre className="bg-[#050505] p-4 border border-white/10 text-purple-300 overflow-auto">
//               <code>{data.example}</code>
//             </pre>
//           </div>

//           {/* Resources */}
//           <div className="border border-purple-500/20 p-8 bg-purple-500/[0.03]">
//             <h2 className="text-xl font-bold mb-4">Learning Resources</h2>

//             <ul className="space-y-2 text-purple-400">
//               {data.resources.map((link: string, i: number) => (
//                 <li key={i}>
//                   <a href={link} target="_blank" rel="noreferrer">
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>
//       </section>
//     );
//   }

//   // =============================
//   // MAIN LIBRARY PAGE
//   // =============================
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-black border-t border-white/5">

//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-20">
//           <h1 className="text-7xl font-black uppercase">
//             Programming <span className="text-purple-500">Library</span>
//           </h1>

//           <p className="text-white/40 mt-6 max-w-xl mx-auto">
//             Access AI-generated notes and programming resources.
//           </p>

//           {!isSignedIn && (
//             <div className="mt-10 border border-purple-500/20 p-8 max-w-md mx-auto">
//               <p className="text-white/40 mb-6 uppercase mono text-xs">
//                 Sign in to unlock notes
//               </p>

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 px-10 py-3 font-bold uppercase"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Language Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
//           {languages.map((lang) => (
//             <button
//               key={lang.name}
//               onClick={() => handleSelectLanguage(lang.name)}
//               disabled={!isSignedIn}
//               className={`group bg-black p-12 transition 
//                 ${!isSignedIn ? "opacity-40 cursor-not-allowed" : "hover:bg-purple-500/[0.03]"}`}
//             >
//               <div className="text-center space-y-4">
//                 <div className="w-14 h-14 border border-white/10 flex items-center justify-center mx-auto bg-[#080808]">
//                   <span className="text-white/30 group-hover:text-purple-400 font-bold">
//                     {lang.icon}
//                   </span>
//                 </div>

//                 <h3 className="font-black uppercase group-hover:text-purple-400">
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

// export default Library;






























































// import { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { BookOpen, Copy, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react'
// import { generateLibraryNotes } from '../lib/gemini'
// import { languages } from '../constant/index'

// const Library = () => {
//   const { isSignedIn } = useAuth()
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
//   const [notesData, setNotesData] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [copiedCode, setCopiedCode] = useState<string | null>(null)

//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return
    
//     setIsLoading(true)
//     setSelectedLanguage(language)
    
//     try {
//       const notes = await generateLibraryNotes(language)
//       setNotesData(notes)
//     } catch (error) {
//       console.error('Error generating notes:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleBackToLanguages = () => {
//     setSelectedLanguage(null)
//     setNotesData(null)
//   }

//   const copyToClipboard = async (code: string, id: string) => {
//     try {
//       await navigator.clipboard.writeText(code)
//       setCopiedCode(id)
//       setTimeout(() => setCopiedCode(null), 2000)
//     } catch (error) {
//       console.error('Failed to copy code:', error)
//     }
//   }

//   const getYouTubeSearchUrl = (language: string) => {
//     return `https://www.youtube.com/results?search_query=${encodeURIComponent(language + ' programming tutorial')}`
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-4">Generating Notes...</h2>
//           <p className="text-gray-300">Our AI is creating comprehensive notes for your {selectedLanguage}</p>
//         </div>
//       </div>
//     )
//   }
//   if (selectedLanguage && notesData) {
//     return (
//       <div className="min-h-screen">
//         <section className="container mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="flex items-center mb-12">
//             <button
//               onClick={handleBackToLanguages}
//               className="mr-6 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
//             >
//               <ArrowLeft className="w-6 h-6 text-purple-400" />
//             </button>
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 {selectedLanguage} Notes
//               </h1>
//               <p className="text-gray-300 mt-2">Comprehensive programming guide</p>
//             </div>
//           </div>

//           {/* Notes Content */}
//           <div className="max-w-6xl mx-auto space-y-8">
//             {/* Theory Section */}
//             {notesData.theory && (
//               <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
//                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//                   <BookOpen className="w-6 h-6 mr-3 text-purple-400" />
//                   Theory & Concepts
//                 </h2>
//                 <div className="prose prose-invert max-w-none">
//                   <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
//                     {notesData.theory}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Code Examples */}
//             {notesData.codeExamples && notesData.codeExamples.length > 0 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-white flex items-center">
//                   <Copy className="w-6 h-6 mr-3 text-purple-400" />
//                   Code Examples
//                 </h2>
                
//                 {notesData.codeExamples.map((example: any, index: number) => (
//                   <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
//                     <div className="p-6 border-b border-purple-500/20">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-xl font-semibold text-white">{example.title}</h3>
//                         <button
//                           onClick={() => copyToClipboard(example.code, `code-${index}`)}
//                           className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-colors"
//                         >
//                           {copiedCode === `code-${index}` ? (
//                             <>
//                               <CheckCircle className="w-4 h-4" />
//                               <span className="text-sm">Copied!</span>
//                             </>
//                           ) : (
//                             <>
//                               <Copy className="w-4 h-4" />
//                               <span className="text-sm">Copy</span>
//                             </>
//                           )}
//                         </button>
//                       </div>
//                       {example.description && (
//                         <p className="text-gray-300 mt-2">{example.description}</p>
//                       )}
//                     </div>
                    
//                     <div className="bg-black/40 p-6">
//                       <pre className="overflow-x-auto">
//                         <code className="text-green-400 text-sm whitespace-pre">
//                           {example.code}
//                         </code>
//                       </pre>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* YouTube Learning Resources */}
//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
//               <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//                 <ExternalLink className="w-6 h-6 mr-3 text-purple-400" />
//                 Additional Learning Resources
//               </h2>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 <a
//                   href={getYouTubeSearchUrl(selectedLanguage)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 p-4 rounded-lg transition-colors group"
//                 >
//                   <div className="flex items-center">
//                     <div className="bg-red-500 p-2 rounded-lg mr-3">
//                       <ExternalLink className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-white font-semibold group-hover:text-red-300 transition-colors">
//                         YouTube Tutorials
//                       </h3>
//                       <p className="text-gray-300 text-sm">
//                         Watch {selectedLanguage} programming tutorials
//                       </p>
//                     </div>
//                   </div>
//                 </a>
                
//                 <a
//                   href={`https://www.google.com/search?q=${encodeURIComponent(selectedLanguage + ' programming documentation')}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 p-4 rounded-lg transition-colors group"
//                 >
//                   <div className="flex items-center">
//                     <div className="bg-blue-500 p-2 rounded-lg mr-3">
//                       <BookOpen className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors">
//                         Official Documentation
//                       </h3>
//                       <p className="text-gray-300 text-sm">
//                         Read the official {selectedLanguage} docs
//                       </p>
//                     </div>
//                   </div>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="text-center mt-16">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Ready to Practice?</h3>
//               <p className="text-gray-300 mb-6">
//                 Test your knowledge with our AI-generated quizzes and track your progress.
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
//               <BookOpen className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Programming Library
//           </h1>
          
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
//             Access comprehensive AI-generated notes, theory explanations, and code examples 
//             for popular programming languages.
//           </p>
          
//           {!isSignedIn && (
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
//               <p className="text-purple-300 mb-4">Sign in to access the programming library</p>
//               <Link
//                 to="/sign-up"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Features */}
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-4xl mb-4">📚</div>
//             <h3 className="text-xl font-bold text-white mb-2">Comprehensive Theory</h3>
//             <p className="text-gray-300">Detailed explanations of programming concepts and principles</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-4xl mb-4">💻</div>
//             <h3 className="text-xl font-bold text-white mb-2">Code Examples</h3>
//             <p className="text-gray-300">Practical code samples with copy-to-clipboard functionality</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <div className="text-4xl mb-4">🎥</div>
//             <h3 className="text-xl font-bold text-white mb-2">Learning Resources</h3>
//             <p className="text-gray-300">Curated YouTube tutorials and official documentation links</p>
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
//               <h3 className="text-2xl font-bold text-white mb-4">Unlock Your Learning Potential</h3>
//               <p className="text-gray-300 mb-6">
//                 Join thousands of developers who are advancing their skills with our comprehensive programming library.
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

// export default Library