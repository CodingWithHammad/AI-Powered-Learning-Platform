import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { generateQuiz } from "../lib/gemini";
import Quiz from "../components/Quiz";
import { languages } from "../constant";
import Lightning from "../components/Lightning"; // ✅ IMPORT LIGHTNING

const Courses = () => {
  const { isSignedIn } = useAuth();

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageClick = async (language: string) => {
    if (!isSignedIn) return;

    setIsLoading(true);
    setSelectedLanguage(language);

    try {
      const quiz = await generateQuiz(language);
      setQuizData(quiz);
    } catch (error) {
      console.error("Quiz Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = () => {
    setSelectedLanguage(null);
    setQuizData(null);
  };

  // ✅ Quiz Screen
  if (selectedLanguage && quizData && !isLoading) {
    return (
      <Quiz
        language={selectedLanguage}
        quizData={quizData}
        onComplete={handleQuizComplete}
      />
    );
  }

  return (
    <section className="py-32 px-6 lg:px-24 bg-black relative overflow-hidden min-h-screen">

      {/* ================= LIGHTNING BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0">
          <Lightning
            hue={266}
            xOffset={-0.1}
            speed={1.2}
            intensity={1}
            size={1}
          />
        </div>

        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-24 space-y-8">

          <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
            AI-Powered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
              Quizzes
            </span>
          </h2>

          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Practice with AI-generated quizzes across multiple programming languages.
          </p>

          {!isSignedIn && (
            <div className="inline-block p-8 bg-purple-600/[0.03] border border-white/5 relative">
              <p className="text-white/40 uppercase text-xs mb-4">
                Ready to start learning?
              </p>

              <Link
                to="/sign-up"
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase px-8 py-3 inline-block transition-all hover:scale-105"
              >
                Sign Up Now ›
              </Link>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { label: "10 Questions", sub: "Per quiz session" },
            { label: "~15 Minutes", sub: "Average completion" },
            { label: "Unlimited", sub: "Retakes allowed" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#080808] border border-white/5 p-10 text-center hover:border-purple-500/30 transition-all"
            >
              <div className="text-2xl font-black uppercase">{item.label}</div>
              <div className="text-xs text-white/30 uppercase tracking-widest">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin h-16 w-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white">Generating Quiz...</h2>
            <p className="text-gray-400">
              Creating questions for {selectedLanguage}
            </p>
          </div>
        )}

        {/* Languages Grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-32">
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => handleLanguageClick(lang.name)}
                disabled={!isSignedIn}
                className={`group bg-[#0a0a0a] border border-white/5 p-8 text-center transition-all hover:bg-purple-600/[0.02] hover:border-purple-500/40 hover:-translate-y-1 relative ${
                  !isSignedIn ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="w-14 h-14 mx-auto mb-6">
                  <img
                    src={lang.logo}
                    alt={lang.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-purple-400">
                  {lang.name}
                </h3>

                <p className="text-xs text-white/30 uppercase">
                  {lang.description}
                </p>

                {!isSignedIn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition">
                    <span className="text-purple-300 text-sm">
                      Sign in required
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!isSignedIn && !isLoading && (
          <div className="bg-[#050505] border border-white/10 p-12 text-center">
            <h3 className="text-4xl font-black uppercase mb-6">
              Ready to Test Your Skills?
            </h3>

            <p className="text-white/40 max-w-lg mx-auto mb-10">
              Sign up to unlock unlimited quizzes and track your progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sign-up"
                className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase px-12 py-5 transition-all hover:-translate-y-1"
              >
                Start Learning Free
              </Link>

              <Link
                to="/about"
                className="border border-white/10 hover:border-white/30 px-12 py-5 font-black uppercase"
              >
                Learn More
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;

// import React from 'react';

// const Courses: React.FC = () => {
//   const languages = [
//     { name: "JavaScript", desc: "The language of the web", color: "text-yellow-400" },
//     { name: "Python", desc: "Simple and powerful", color: "text-blue-400" },
//     { name: "Java", desc: "Write once, run anywhere", color: "text-red-400" },
//     { name: "C++", desc: "System programming powerhouse", color: "text-blue-500" },
//     { name: "C#", desc: "Microsoft's versatile language", color: "text-purple-400" },
//     { name: "Go", desc: "Fast and efficient", color: "text-cyan-400" },
//     { name: "Rust", desc: "Safe systems programming", color: "text-orange-500" },
//     { name: "PHP", desc: "Web development classic", color: "text-indigo-400" },
//     { name: "Swift", desc: "Apple's modern language", color: "text-orange-400" },
//     { name: "Kotlin", desc: "Modern Android development", color: "text-purple-500" }
//   ];

//   return (
//     <section className="py-32 px-6 lg:px-24 bg-black relative overflow-hidden">
//       {/* Background Ambience */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Section Header */}
//         <div className="text-center mb-24 space-y-8">
//           <div className="flex justify-center mb-6">
//             <div className="w-16 h-16 rounded-full border border-purple-500/30 flex items-center justify-center glow-purple">
//                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
          
//           <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
//             AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Courses</span>
//           </h2>
          
//           <p className="text-white/50 max-w-xl mx-auto text-lg">
//             Practice with AI-generated quizzes across multiple programming languages and strengthen your coding skills.
//           </p>

//           <div className="inline-block p-8 bg-purple-600/[0.03] border border-white/5 relative group">
//              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-purple-500/40"></div>
//              <p className="mono text-[10px] text-white/40 uppercase tracking-widest mb-4">Ready to start learning?</p>
//              <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase px-8 py-3 flex items-center gap-3 mx-auto transition-all transform hover:scale-105">
//                Sign Up Now <span className="text-xl">›</span>
//              </button>
//           </div>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
//           {[
//             { label: "10 Questions", sub: "Per quiz session", icon: "🏆" },
//             { label: "~15 Minutes", sub: "Average completion", icon: "⏱️" },
//             { label: "Unlimited", sub: "Retakes allowed", icon: "🔄" }
//           ].map((item, i) => (
//             <div key={i} className="bg-[#080808] border border-white/5 p-10 text-center space-y-4 hover:border-purple-500/30 transition-all group">
//               <div className="text-2xl mb-4 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
//               <div className="text-2xl font-black uppercase tracking-tight">{item.label}</div>
//               <div className="mono text-[10px] text-white/30 uppercase tracking-widest">{item.sub}</div>
//             </div>
//           ))}
//         </div>

//         {/* Language Cards Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-32">
//           {languages.map((lang, idx) => (
//             <div key={idx} className="group bg-[#0a0a0a] border border-white/5 p-8 text-center transition-all hover:bg-purple-600/[0.02] hover:border-purple-500/40 hover:-translate-y-1 relative">
//               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
//               </div>
              
//               <div className={`text-4xl font-black mb-6 ${lang.color} opacity-80 group-hover:opacity-100 transition-all`}>
//                 {lang.name.charAt(0)}{lang.name.charAt(1)}
//               </div>
              
//               <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors">
//                 {lang.name}
//               </h3>
//               <p className="text-[10px] text-white/30 leading-snug uppercase tracking-wider h-8 flex items-center justify-center">
//                 {lang.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA Banner */}
//         <div className="bg-[#050505] border border-white/10 p-12 md:p-20 relative overflow-hidden text-center">
//           <div className="absolute inset-0 bg-gradient-to-br from-purple-600/[0.05] to-transparent pointer-events-none"></div>
          
//           <div className="relative z-10 space-y-8">
//             <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Ready to Test Your Skills?</h3>
//             <p className="text-white/40 max-w-lg mx-auto italic">
//               Sign up to unlock unlimited quizzes and track your progress across our entire catalog of programming languages.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
//               <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-black uppercase px-12 py-5 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all transform hover:-translate-y-1">
//                 Start Learning Free
//               </button>
//               <button className="w-full sm:w-auto border border-white/10 hover:border-white/30 px-12 py-5 font-black uppercase transition-all">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Decorative Corner Accents */}
//           <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-purple-500/50 transition-colors"></div>
//           <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-purple-500/50 transition-colors"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Courses;
























// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { Play, Award, Clock, ChevronRight } from "lucide-react";
// import { generateQuiz } from "../lib/gemini";
// import Quiz from "../components/Quiz";
// import { languages } from "../constant/index";

// const Courses = () => {
//   const { isSignedIn } = useAuth();
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [quizData, setQuizData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setIsLoading(true);
//     setSelectedLanguage(language);

//     try {
//       const quiz = await generateQuiz(language);
//       setQuizData(quiz);
//     } catch (error) {
//       console.error("Quiz error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleQuizComplete = () => {
//     setSelectedLanguage(null);
//     setQuizData(null);
//   };

//   if (selectedLanguage && quizData && !isLoading) {
//     return (
//       <Quiz
//         language={selectedLanguage}
//         quizData={quizData}
//         onComplete={handleQuizComplete}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen text-gray-200">

//       {/* ---------------- HERO ---------------- */}
//       <section className="container mx-auto px-6 py-24 text-center">

//         <div className="flex justify-center mb-10">
//           <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-xl">
//             <Play className="w-12 h-12 text-purple-400" />
//           </div>
//         </div>

//         <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
//           AI-Powered <span className="text-purple-400">Courses</span>
//         </h1>

//         <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
//           Practice with AI-generated quizzes across multiple programming
//           languages and strengthen your coding skills.
//         </p>

//         {!isSignedIn && (
//           <div className="p-6 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl max-w-md mx-auto">
//             <p className="text-gray-400 mb-4">Ready to start learning?</p>

//             <Link
//               to="/sign-up"
//               className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
//             >
//               Sign Up Now
//               <ChevronRight className="ml-2 w-4 h-4" />
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* ---------------- STATS ---------------- */}
//       <section className="container mx-auto px-6 mb-24">
//         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

//           {[
//             { icon: Award, title: "10 Questions", desc: "Per quiz session" },
//             { icon: Clock, title: "~15 Minutes", desc: "Average completion" },
//             { icon: Play, title: "Unlimited", desc: "Retakes allowed" },
//           ].map(({ icon: Icon, title, desc }, index) => (
//             <div
//               key={index}
//               className="p-8 text-center rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all"
//             >
//               <Icon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-white mb-2">
//                 {title}
//               </h3>
//               <p className="text-gray-400">{desc}</p>
//             </div>
//           ))}

//         </div>
//       </section>

//       {/* ---------------- LOADING ---------------- */}
//       {isLoading && (
//         <div className="text-center py-20">
//           <div className="w-24 h-24 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
//           <h2 className="text-2xl font-semibold text-white mb-2">
//             Generating Quiz...
//           </h2>
//           <p className="text-gray-400">
//             Preparing questions for {selectedLanguage}
//           </p>
//         </div>
//       )}

//       {/* ---------------- LANGUAGE GRID ---------------- */}
//       {!isLoading && (
//         <section className="container mx-auto px-6 mb-24">

//           <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 max-w-6xl mx-auto">

//             {languages.map((language) => (
//               <button
//                 key={language.name}
//                 onClick={() => handleLanguageClick(language.name)}
//                 disabled={!isSignedIn}
//                 className={`group p-6 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300 hover:-translate-y-1 ${
//                   !isSignedIn ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <div className="text-center">

//                   <div className="bg-purple-500/10 w-16 h-16 rounded-lg p-3 mx-auto mb-4 group-hover:bg-purple-500/20 transition">
//                     <img
//                       src={language.logo}
//                       alt={language.name}
//                       className="w-full h-full object-contain"
//                     />
//                   </div>

//                   <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300">
//                     {language.name}
//                   </h3>

//                   <p className="text-sm text-gray-400">
//                     {language.description}
//                   </p>

//                 </div>

//                 {!isSignedIn && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition">
//                     <span className="text-purple-300 font-medium">
//                       Sign in required
//                     </span>
//                   </div>
//                 )}
//               </button>
//             ))}

//           </div>
//         </section>
//       )}

//       {/* ---------------- CTA ---------------- */}
//       {!isSignedIn && !isLoading && (
//         <section className="container mx-auto px-6 pb-24 text-center">

//           <div className="p-10 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl max-w-3xl mx-auto">

//             <h3 className="text-2xl font-semibold text-white mb-4">
//               Ready to Test Your Skills?
//             </h3>

//             <p className="text-gray-400 mb-6">
//               Sign up to unlock unlimited quizzes and track your progress.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
//               >
//                 Start Learning Free
//               </Link>

//               <Link
//                 to="/about"
//                 className="border border-purple-500/40 text-purple-300 px-8 py-3 rounded-lg hover:bg-purple-500/10 transition-all"
//               >
//                 Learn More
//               </Link>

//             </div>

//           </div>

//         </section>
//       )}
//     </div>
//   );
// };

// export default Courses;



// import { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { Play, Award, Clock, ChevronRight } from 'lucide-react'
// import { generateQuiz } from '../lib/gemini'
// import Quiz from '../components/Quiz'
// import { languages } from '../constant/index'

// const Courses = () => {
//   const { isSignedIn } = useAuth()
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
//   const [quizData, setQuizData] = useState<any>(null)
//   const [isLoading, setIsLoading] = useState(false)

 
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return

//     setIsLoading(true)
//     setSelectedLanguage(language)

//     try {
//       const quiz = await generateQuiz(language)
//       setQuizData(quiz)
//     } catch (error) {
//       console.error('Error generating quiz:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleQuizComplete = () => {
//     setSelectedLanguage(null)
//     setQuizData(null)
//   }

//   if (selectedLanguage && quizData && !isLoading) {
//     return (
//       <Quiz
//         language={selectedLanguage}
//         quizData={quizData}
//         onComplete={handleQuizComplete}
//       />
//     )
//   }

//   return (
//     <div className="min-h-screen">
//       <section className="container mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="flex justify-center mb-8">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
//               <Play className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             AI-Powered Courses
//           </h1>

//           <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
//             Challenge yourself with dynamically generated quizzes for 10 popular programming languages.
//             Each quiz is unique and tailored to test your knowledge comprehensively.
//           </p>

//           {!isSignedIn && (
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
//               <p className="text-purple-300 mb-4">Ready to start learning?</p>
//               <Link
//                 to="/sign-up"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
//               >
//                 Sign Up Now
//                 <ChevronRight className="ml-2 w-4 h-4" />
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Course Statistics */}
//         <div className="grid md:grid-cols-3 gap-8 mb-16">
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-2">10 Questions</h3>
//             <p className="text-gray-300">Per quiz session</p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-2">~15 Minutes</h3>
//             <p className="text-gray-300">Average completion time</p>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Play className="w-12 h-12 text-purple-400 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-2">Unlimited</h3>
//             <p className="text-gray-300">Retakes with new questions</p>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="text-center py-20">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//               <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-4">Generating Quiz...</h2>
//             <p className="text-gray-300">Our AI is creating unique questions for {selectedLanguage}</p>
//           </div>
//         )}

//         {/* Programming Languages Grid */}
//         {!isLoading && (
//           <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6">
//             {languages.map((language) => (
//               <button
//                 key={language.name}
//                 onClick={() => handleLanguageClick(language.name)}
//                 disabled={!isSignedIn}
//                 className={`group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${!isSignedIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//                   }`}
//               >
//                 <div className="text-center">
//                   <div className="bg-white/10 w-16 h-16 rounded-lg p-3 mx-auto mb-4 group-hover:bg-white/20 transition-colors">
//                     <img
//                       src={language.logo}
//                       alt={language.name}
//                       className="w-full h-full object-contain"
//                       onError={(e) => {
//                         // Fallback for broken images
//                         const target = e.target as HTMLImageElement
//                         target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a855f7'%3E%3Cpath d='M12 2L2 7V17L12 22L22 17V7L12 2M12 4.44L19.55 8.5L12 12.56L4.45 8.5L12 4.44M4 10.37L11 14.15V20.85L4 17.07V10.37M20 10.37V17.07L13 20.85V14.15L20 10.37Z'/%3E%3C/svg%3E`
//                       }}
//                     />
//                   </div>
//                   <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
//                     {language.name}
//                   </h3>
//                   <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
//                     {language.description}
//                   </p>
//                 </div>

//                 {isSignedIn && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
//                 )}

//                 {!isSignedIn && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
//                     <span className="text-purple-300 font-medium">Sign in required</span>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Call to Action */}
//         {!isSignedIn && !isLoading && (
//           <div className="text-center mt-16">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Skills?</h3>
//               <p className="text-gray-300 mb-6">
//                 Sign up now to access unlimited AI-generated quizzes, track your progress, and compete with developers worldwide.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/sign-up"
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//                 >
//                   Start Learning Free
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

// export default Courses









// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { generateQuiz } from "../lib/gemini";
// import Quiz from "../components/Quiz";
// import { languages } from "../constant";

// const Courses = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [quizData, setQuizData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Handle Quiz Generation
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setIsLoading(true);
//     setSelectedLanguage(language);

//     try {
//       const quiz = await generateQuiz(language);
//       setQuizData(quiz);
//     } catch (error) {
//       console.error("Quiz Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Reset after quiz
//   const handleQuizComplete = () => {
//     setSelectedLanguage(null);
//     setQuizData(null);
//   };

//   // ✅ Quiz Screen
//   if (selectedLanguage && quizData && !isLoading) {
//     return (
//       <Quiz
//         language={selectedLanguage}
//         quizData={quizData}
//         onComplete={handleQuizComplete}
//       />
//     );
//   }

//   return (
//     <section className="py-32 px-6 lg:px-24 bg-black relative overflow-hidden min-h-screen">

//       {/* Background Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto relative z-10">

//         {/* Header */}
//         <div className="text-center mb-24 space-y-8">

//           <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
//             AI-Powered{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
//               Courses
//             </span>
//           </h2>

//           <p className="text-white/50 max-w-xl mx-auto text-lg">
//             Practice with AI-generated quizzes across multiple programming languages.
//           </p>

//           {/* Sign Up CTA */}
//           {!isSignedIn && (
//             <div className="inline-block p-8 bg-purple-600/[0.03] border border-white/5 relative">
//               <p className="text-white/40 uppercase text-xs mb-4">
//                 Ready to start learning?
//               </p>

//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase px-8 py-3 inline-block transition-all hover:scale-105"
//               >
//                 Sign Up Now ›
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
//           {[
//             { label: "10 Questions", sub: "Per quiz session" },
//             { label: "~15 Minutes", sub: "Average completion" },
//             { label: "Unlimited", sub: "Retakes allowed" },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-[#080808] border border-white/5 p-10 text-center hover:border-purple-500/30 transition-all"
//             >
//               <div className="text-2xl font-black uppercase">{item.label}</div>
//               <div className="text-xs text-white/30 uppercase tracking-widest">
//                 {item.sub}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Loading */}
//         {isLoading && (
//           <div className="text-center py-20">
//             <div className="animate-spin h-16 w-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" />
//             <h2 className="text-2xl font-bold text-white">Generating Quiz...</h2>
//             <p className="text-gray-400">
//               Creating questions for {selectedLanguage}
//             </p>
//           </div>
//         )}

//         {/* Languages Grid */}
//         {!isLoading && (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-32">

//             {languages.map((lang) => (
//               <button
//                 key={lang.name}
//                 onClick={() => handleLanguageClick(lang.name)}
//                 disabled={!isSignedIn}
//                 className={`group bg-[#0a0a0a] border border-white/5 p-8 text-center transition-all hover:bg-purple-600/[0.02] hover:border-purple-500/40 hover:-translate-y-1 relative ${
//                   !isSignedIn ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {/* Language Logo */}
//                 <div className="w-14 h-14 mx-auto mb-6">
//                   <img
//                     src={lang.logo}
//                     alt={lang.name}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-purple-400">
//                   {lang.name}
//                 </h3>

//                 <p className="text-xs text-white/30 uppercase">
//                   {lang.description}
//                 </p>

//                 {!isSignedIn && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition">
//                     <span className="text-purple-300 text-sm">
//                       Sign in required
//                     </span>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Bottom CTA */}
//         {!isSignedIn && !isLoading && (
//           <div className="bg-[#050505] border border-white/10 p-12 text-center">
//             <h3 className="text-4xl font-black uppercase mb-6">
//               Ready to Test Your Skills?
//             </h3>

//             <p className="text-white/40 max-w-lg mx-auto mb-10">
//               Sign up to unlock unlimited quizzes and track your progress.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/sign-up"
//                 className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase px-12 py-5 transition-all hover:-translate-y-1"
//               >
//                 Start Learning Free
//               </Link>

//               <Link
//                 to="/about"
//                 className="border border-white/10 hover:border-white/30 px-12 py-5 font-black uppercase"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Courses;
// import { useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { generateQuiz } from "../lib/gemini";
// import Quiz from "../components/Quiz";
// import { languages } from "../constant";
// import LightPillar from "../components/LightPillar"; // ✅ Background Component

// const Courses = () => {
//   const { isSignedIn } = useAuth();

//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [quizData, setQuizData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // ✅ Handle Quiz Generation
//   const handleLanguageClick = async (language: string) => {
//     if (!isSignedIn) return;

//     setIsLoading(true);
//     setSelectedLanguage(language);

//     try {
//       const quiz = await generateQuiz(language);
//       setQuizData(quiz);
//     } catch (error) {
//       console.error("Quiz Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ✅ Reset after quiz
//   const handleQuizComplete = () => {
//     setSelectedLanguage(null);
//     setQuizData(null);
//   };

//   // ✅ Quiz Screen
//   if (selectedLanguage && quizData && !isLoading) {
//     return (
//       <Quiz
//         language={selectedLanguage}
//         quizData={quizData}
//         onComplete={handleQuizComplete}
//       />
//     );
//   }

//   return (
//     <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
//       {/* ✅ Global Background */}
//       <div className="absolute inset-0 -z-10">
//         <LightPillar
//           topColor="#a855f7"
//           middleColor="#9333ea"
//           bottomColor="#6b21a8"
//         />
//       </div>

//       <section className="py-32 px-6 lg:px-24 relative">

//         {/* Glow Effect */}
//         <div className="absolute top-1/2 left-1/2 
//         -translate-x-1/2 -translate-y-1/2 
//         w-[800px] h-[800px] bg-purple-600/5 
//         blur-[150px] rounded-full pointer-events-none" />

//         <div className="max-w-7xl mx-auto relative z-10">

//           {/* Header */}
//           <div className="text-center mb-24 space-y-8">
//             <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
//               AI-Powered{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">
//                 Courses
//               </span>
//             </h2>

//             <p className="text-white/50 max-w-xl mx-auto text-lg">
//               Practice with AI-generated quizzes across multiple programming languages.
//             </p>

//             {!isSignedIn && (
//               <div className="inline-block p-8 bg-purple-600/[0.03] border border-white/5">
//                 <p className="text-white/40 uppercase text-xs mb-4">
//                   Ready to start learning?
//                 </p>

//                 <Link
//                   to="/sign-up"
//                   className="bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase px-8 py-3 inline-block transition-all hover:scale-105"
//                 >
//                   Sign Up Now ›
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
//             {[
//               { label: "10 Questions", sub: "Per quiz session" },
//               { label: "~15 Minutes", sub: "Average completion" },
//               { label: "Unlimited", sub: "Retakes allowed" },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="bg-[#080808] border border-white/5 p-10 text-center hover:border-purple-500/30 transition-all"
//               >
//                 <div className="text-2xl font-black uppercase">{item.label}</div>
//                 <div className="text-xs text-white/30 uppercase tracking-widest">
//                   {item.sub}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Loading */}
//           {isLoading && (
//             <div className="text-center py-20">
//               <div className="animate-spin h-16 w-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" />
//               <h2 className="text-2xl font-bold text-white">Generating Quiz...</h2>
//               <p className="text-gray-400">
//                 Creating questions for {selectedLanguage}
//               </p>
//             </div>
//           )}

//           {/* Languages Grid */}
//           {!isLoading && (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-32">
//               {languages.map((lang) => (
//                 <button
//                   key={lang.name}
//                   onClick={() => handleLanguageClick(lang.name)}
//                   disabled={!isSignedIn}
//                   className={`group bg-[#0a0a0a] border border-white/5 p-8 text-center transition-all 
//                   hover:bg-purple-600/[0.02] hover:border-purple-500/40 hover:-translate-y-1 relative ${
//                     !isSignedIn ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   <div className="w-14 h-14 mx-auto mb-6">
//                     <img
//                       src={lang.logo}
//                       alt={lang.name}
//                       className="w-full h-full object-contain"
//                     />
//                   </div>

//                   <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-purple-400">
//                     {lang.name}
//                   </h3>

//                   <p className="text-xs text-white/30 uppercase">
//                     {lang.description}
//                   </p>

//                   {!isSignedIn && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition">
//                       <span className="text-purple-300 text-sm">
//                         Sign in required
//                       </span>
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Bottom CTA */}
//           {!isSignedIn && !isLoading && (
//             <div className="bg-[#050505] border border-white/10 p-12 text-center">
//               <h3 className="text-4xl font-black uppercase mb-6">
//                 Ready to Test Your Skills?
//               </h3>

//               <p className="text-white/40 max-w-lg mx-auto mb-10">
//                 Sign up to unlock unlimited quizzes and track your progress.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link
//                   to="/sign-up"
//                   className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase px-12 py-5 transition-all hover:-translate-y-1"
//                 >
//                   Start Learning Free
//                 </Link>

//                 <Link
//                   to="/about"
//                   className="border border-white/10 hover:border-white/30 px-12 py-5 font-black uppercase"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             </div>
//           )}

//         </div>
//       </section>
//     </div>
//   );
// };

// export default Courses;
