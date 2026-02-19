// import React from "react";

// const Score: React.FC = () => {
//   const fakeStats = [
//     { label: "Total Quizzes", value: "12", icon: "🎯" },
//     { label: "Average Score", value: "86%", icon: "📈" },
//     { label: "Best Score", value: "98%", icon: "🏆" },
//     { label: "Languages", value: "4", icon: "💻" },
//   ];

//   const fakeLeaderboard = [
//     { id: 1, name: "Hammad", score: 98 },
//     { id: 2, name: "Zubair", score: 91 },
//     { id: 3, name: "Ali", score: 84 },
//   ];

//   return (
//     <section className="min-h-screen px-6 lg:px-24 py-24 bg-transparent">
//       <div className="max-w-7xl mx-auto space-y-16">

//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
//             Quiz <span className="text-purple-500">Scores</span>
//           </h2>
//           <p className="text-white/50">
//             Here is your current performance overview (Demo Data).
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {fakeStats.map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-purple-500/40 transition-all"
//             >
//               <div className="text-3xl mb-4">{stat.icon}</div>
//               <div className="text-4xl font-black">{stat.value}</div>
//               <div className="text-xs uppercase tracking-widest text-white/40 mt-2">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Leaderboard */}
//         <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-8">
//           <h3 className="text-2xl font-bold mb-6 text-purple-400">
//             Leaderboard
//           </h3>

//           <div className="space-y-4">
//             {fakeLeaderboard.map((user, index) => (
//               <div
//                 key={user.id}
//                 className="flex justify-between items-center bg-white/5 p-4 rounded-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <span className="text-purple-400 font-bold">
//                     #{index + 1}
//                   </span>
//                   <span>{user.name}</span>
//                 </div>
//                 <span className="font-bold">{user.score}%</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Score;















































// import React from 'react';
// import Lightning from '@/components/Lightning'


// const Scores: React.FC = () => {
//   const stats = [
//     { label: "Total Quizzes", value: "0", icon: "🎯" },
//     { label: "Average Score", value: "0%", icon: "📈" },
//     { label: "Best Score", value: "0%", icon: "🏆" },
//     { label: "Languages", value: "0", icon: "📅" }
//   ];


//   return (
//     <section className="py-32 px-6 lg:px-24 bg-black relative overflow-hidden border-t border-white/5">
//       {/* Background Ambience */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-20 space-y-6">
//           <div className="flex justify-center mb-6">
//             <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center glow-purple">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
//             Quiz <span className="text-purple-500">Scores</span>
//           </h2>
//           <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
//             Track your learning progress and compare your performance across different programming languages.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {stats.map((stat, idx) => (
//             <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-8 group hover:border-purple-500/40 transition-all relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-3 mono text-[8px] text-white/10 uppercase tracking-widest">METRIC_0{idx + 1}</div>
//               <div className="space-y-4">
//                 <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
//                   {stat.icon}
//                 </div>
//                 <div className="space-y-1">
//                   <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
//                   <div className="mono text-[10px] uppercase text-white/30 tracking-widest">{stat.label}</div>
//                 </div>
//               </div>
//               <div className="absolute bottom-0 left-0 h-1 bg-purple-600/20 w-8 group-hover:w-full transition-all duration-500"></div>
//             </div>
//           ))}
//         </div>

//         {/* Search & Filter Bar */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex-grow relative">
//             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </span>
//             <input 
//               type="text" 
//               placeholder="Search by email or language..." 
//               className="w-full bg-[#080808] border border-white/10 p-5 pl-14 text-sm focus:border-purple-500/50 outline-none transition-all placeholder:text-white/10 mono"
//             />
//             <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
//                <div className="w-5 h-5 bg-purple-600/10 border border-purple-500/30 rounded-sm flex items-center justify-center">
//                  <div className="w-1 h-1 bg-purple-500"></div>
//                </div>
//             </div>
//           </div>
//           <button className="bg-[#080808] border border-white/10 px-8 py-5 flex items-center justify-center gap-3 hover:border-purple-500/50 transition-all group whitespace-nowrap">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
//             </svg>
//             <span className="font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">All Languages</span>
//           </button>
//         </div>

//         {/* Main Dashboard Area (Empty State) */}
//         <div className="bg-[#050505] border border-white/10 min-h-[500px] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden glow-purple">
//            {/* Scanline Effect */}
//            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent pointer-events-none"></div>
           
//            <div className="relative z-10 space-y-8">
//              <div className="w-24 h-24 rounded-full bg-purple-600/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-4 group">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/10 group-hover:text-purple-500/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//              </div>
             
//              <div className="space-y-2">
//                <h3 className="text-3xl font-black uppercase tracking-tighter">No Scores Found</h3>
//                <p className="text-white/30 italic">Take your first quiz to see your scores here!</p>
//              </div>
             
//              <div className="pt-8 flex justify-center gap-1">
//                {[1, 2, 3].map(i => <div key={i} className="w-12 h-1 bg-white/5"></div>)}
//              </div>
//            </div>

//            {/* Technical Corner Data */}
//            <div className="absolute top-4 left-4 mono text-[8px] text-white/10 uppercase tracking-[0.4em]">QUERY_MODE: NULL_SET</div>
//            <div className="absolute bottom-4 right-4 mono text-[8px] text-white/10 uppercase tracking-[0.4em]">ERR_NO_DATA_STREAM</div>
//         </div>

//         {/* Footer Technical Accents */}
//         <div className="mt-12 flex justify-between items-center mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
//            <div className="flex gap-4 items-center">
//              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
//              <span>System Ready</span>
//            </div>
//            <div className="flex gap-8">
//              <span>SECURE_VAL_0</span>
//              <span>TIMESTAMP: 2025.04.12</span>
//            </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Scores;


// import React from 'react'
// import Lightning from '../components/Lightning'

// const Scores: React.FC = () => {
//   const stats = [
//     { label: "Total Quizzes", value: "0", icon: "🎯" },
//     { label: "Average Score", value: "0%", icon: "📈" },
//     { label: "Best Score", value: "0%", icon: "🏆" },
//     { label: "Languages", value: "0", icon: "📅" }
//   ]

//   return (
//     <div className="relative min-h-screen bg-black text-white overflow-hidden">

//       {/* ================= LIGHTNING BACKGROUND ================= */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

//         {/* Lightning */}
//         <div className="absolute inset-0">
//           <Lightning
//             hue={266}
//             xOffset={-0.1}
//             speed={1.2}
//             intensity={1}
//             size={1}
//           />
//         </div>

//         {/* Glow Effects */}
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <section className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5">

//         <div className="max-w-7xl mx-auto">

//           {/* Header */}
//           <div className="text-center mb-20 space-y-6">
//             <div className="flex justify-center mb-6">
//               <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                     d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//             </div>

//             <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
//               Quiz <span className="text-purple-500">Scores</span>
//             </h2>

//             <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
//               Track your learning progress and compare your performance across different programming languages.
//             </p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {stats.map((stat, idx) => (
//               <div key={idx}
//                 className="bg-[#0a0a0a] border border-white/5 p-8 group hover:border-purple-500/40 transition-all relative overflow-hidden">

//                 <div className="absolute top-0 right-0 p-3 text-[8px] text-white/10 uppercase tracking-widest">
//                   METRIC_0{idx + 1}
//                 </div>

//                 <div className="space-y-4">
//                   <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-xl">
//                     {stat.icon}
//                   </div>

//                   <div className="space-y-1">
//                     <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
//                     <div className="text-[10px] uppercase text-white/30 tracking-widest">
//                       {stat.label}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 h-1 bg-purple-600/20 w-8 group-hover:w-full transition-all duration-500"></div>
//               </div>
//             ))}
//           </div>

//           {/* Empty Dashboard */}
//           <div className="bg-[#050505] border border-white/10 min-h-[500px] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">

//             <div className="space-y-8">
//               <div className="w-24 h-24 rounded-full bg-purple-600/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12 text-white/10"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor">
//                   <path strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>

//               <div>
//                 <h3 className="text-3xl font-black uppercase tracking-tighter">
//                   No Scores Found
//                 </h3>
//                 <p className="text-white/30 italic">
//                   Take your first quiz to see your scores here!
//                 </p>
//               </div>
//             </div>

//           </div>

//         </div>
//       </section>
//     </div>
//   )
// }

// export default Scores





import React from 'react'
import Lightning from '../components/Lightning'

const Scores: React.FC = () => {
  const stats = [
    { label: "Total Quizzes", value: "0", icon: "🎯" },
    { label: "Average Score", value: "0%", icon: "📈" },
    { label: "Best Score", value: "0%", icon: "🏆" },
    { label: "Languages", value: "0", icon: "📅" }
  ]

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative z-10 pt-0 pb-24 px-6 lg:px-24 border-t border-white/5">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Quiz <span className="text-purple-500">Scores</span>
            </h2>

            <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
              Track your learning progress and compare your performance across different programming languages.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0a] border border-white/5 p-8 group hover:border-purple-500/40 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 text-[8px] text-white/10 uppercase tracking-widest">
                  METRIC_0{idx + 1}
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-xl">
                    {stat.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="text-4xl font-black tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase text-white/30 tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 bg-purple-600/20 w-8 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Empty Dashboard */}
          <div className="bg-[#050505] border border-white/10 min-h-[450px] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">

            <div className="space-y-8">
              <div className="w-24 h-24 rounded-full bg-purple-600/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white/10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  No Scores Found
                </h3>
                <p className="text-white/30 italic">
                  Take your first quiz to see your scores here!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Scores






















































































// import React from 'react';

// const Scores: React.FC = () => {
//   const stats = [
//     { label: "Total Quizzes", value: "0", icon: "🎯" },
//     { label: "Average Score", value: "0%", icon: "📈" },
//     { label: "Best Score", value: "0%", icon: "🏆" },
//     { label: "Languages", value: "0", icon: "📅" }
//   ];

//   return (
//     <section className="py-32 px-6 lg:px-24 bg-black relative overflow-hidden border-t border-white/5">
//       {/* Background Ambience */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-20 space-y-6">
//           <div className="flex justify-center mb-6">
//             <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center glow-purple">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
//             Quiz <span className="text-purple-500">Scores</span>
//           </h2>
//           <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
//             Track your learning progress and compare your performance across different programming languages.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {stats.map((stat, idx) => (
//             <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-8 group hover:border-purple-500/40 transition-all relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-3 mono text-[8px] text-white/10 uppercase tracking-widest">METRIC_0{idx + 1}</div>
//               <div className="space-y-4">
//                 <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
//                   {stat.icon}
//                 </div>
//                 <div className="space-y-1">
//                   <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
//                   <div className="mono text-[10px] uppercase text-white/30 tracking-widest">{stat.label}</div>
//                 </div>
//               </div>
//               <div className="absolute bottom-0 left-0 h-1 bg-purple-600/20 w-8 group-hover:w-full transition-all duration-500"></div>
//             </div>
//           ))}
//         </div>

//         {/* Search & Filter Bar */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex-grow relative">
//             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </span>
//             <input 
//               type="text" 
//               placeholder="Search by email or language..." 
//               className="w-full bg-[#080808] border border-white/10 p-5 pl-14 text-sm focus:border-purple-500/50 outline-none transition-all placeholder:text-white/10 mono"
//             />
//             <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
//                <div className="w-5 h-5 bg-purple-600/10 border border-purple-500/30 rounded-sm flex items-center justify-center">
//                  <div className="w-1 h-1 bg-purple-500"></div>
//                </div>
//             </div>
//           </div>
//           <button className="bg-[#080808] border border-white/10 px-8 py-5 flex items-center justify-center gap-3 hover:border-purple-500/50 transition-all group whitespace-nowrap">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
//             </svg>
//             <span className="font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">All Languages</span>
//           </button>
//         </div>

//         {/* Main Dashboard Area (Empty State) */}
//         <div className="bg-[#050505] border border-white/10 min-h-[500px] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden glow-purple">
//            {/* Scanline Effect */}
//            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent pointer-events-none"></div>
           
//            <div className="relative z-10 space-y-8">
//              <div className="w-24 h-24 rounded-full bg-purple-600/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-4 group">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/10 group-hover:text-purple-500/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//              </div>
             
//              <div className="space-y-2">
//                <h3 className="text-3xl font-black uppercase tracking-tighter">No Scores Found</h3>
//                <p className="text-white/30 italic">Take your first quiz to see your scores here!</p>
//              </div>
             
//              <div className="pt-8 flex justify-center gap-1">
//                {[1, 2, 3].map(i => <div key={i} className="w-12 h-1 bg-white/5"></div>)}
//              </div>
//            </div>

//            {/* Technical Corner Data */}
//            <div className="absolute top-4 left-4 mono text-[8px] text-white/10 uppercase tracking-[0.4em]">QUERY_MODE: NULL_SET</div>
//            <div className="absolute bottom-4 right-4 mono text-[8px] text-white/10 uppercase tracking-[0.4em]">ERR_NO_DATA_STREAM</div>
//         </div>

//         {/* Footer Technical Accents */}
//         <div className="mt-12 flex justify-between items-center mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
//            <div className="flex gap-4 items-center">
//              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
//              <span>System Ready</span>
//            </div>
//            <div className="flex gap-8">
//              <span>SECURE_VAL_0</span>
//              <span>TIMESTAMP: 2025.04.12</span>
//            </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Scores;



// import React from "react"
// import { useState, useEffect } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Trophy, Calendar, Target, TrendingUp, Filter, Search } from 'lucide-react'
// import { supabase, QuizScore } from '../lib/supabase'

// const Score = () => {
//   const { user, isSignedIn } = useAuth()
//   const [scores, setScores] = useState<QuizScore[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [filterLanguage, setFilterLanguage] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     if (isSignedIn) {
//       fetchScores()
//     }
//   }, [isSignedIn])

//   const fetchScores = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('quiz_scores')
//         .select('*')
//         .order('completed_at', { ascending: false })

//       if (error) {
//         console.error('Error fetching scores:', error)
//       } else {
//         setScores(data || [])
//       }
//     } catch (error) {
//       console.error('Error fetching scores:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getUniqueLanguages = () => {
//     const languages = [...new Set(scores.map(score => score.programming_language))]
//     return languages.sort()
//   }

//   const filteredScores = scores.filter(score => {
//     const matchesLanguage = filterLanguage === 'all' || score.programming_language === filterLanguage
//     const matchesSearch = score.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          score.programming_language.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchesLanguage && matchesSearch
//   })

//   const getScoreColor = (score: number, total: number) => {
//     const percentage = (score / total) * 100
//     if (percentage >= 80) return 'text-green-400'
//     if (percentage >= 60) return 'text-yellow-400'
//     return 'text-red-400'
//   }

//   const getScoreBadge = (score: number, total: number) => {
//     const percentage = (score / total) * 100
//     if (percentage >= 90) return { label: 'Excellent', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
//     if (percentage >= 80) return { label: 'Great', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
//     if (percentage >= 60) return { label: 'Good', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
//     return { label: 'Needs Work', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
//   }

//   // Calculate statistics
//   const userScores = scores.filter(score => score.user_id === user?.id)
//   const totalQuizzes = userScores.length
//   const averageScore = totalQuizzes > 0 
//     ? userScores.reduce((acc, score) => acc + (score.score / score.total_questions * 100), 0) / totalQuizzes 
//     : 0
//   const bestScore = totalQuizzes > 0 
//     ? Math.max(...userScores.map(score => (score.score / score.total_questions * 100)))
//     : 0
//   const languageCount = new Set(userScores.map(score => score.programming_language)).size

//   if (!isSignedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//             <Trophy className="w-16 h-16 text-purple-400" />
//           </div>
//           <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Sign In Required
//           </h1>
//           <p className="text-gray-300 mb-6">
//             Please sign in to view quiz scores and track your learning progress.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen">
//       <section className="container mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex justify-center mb-8">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
//               <Trophy className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Quiz Scores
//           </h1>
          
//           <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
//             Track your learning progress and compare your performance across different programming languages.
//           </p>
//         </div>

//         {/* Personal Statistics */}
//         <div className="grid md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{totalQuizzes}</div>
//             <div className="text-gray-300">Total Quizzes</div>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{Math.round(averageScore)}%</div>
//             <div className="text-gray-300">Average Score</div>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{Math.round(bestScore)}%</div>
//             <div className="text-gray-300">Best Score</div>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{languageCount}</div>
//             <div className="text-gray-300">Languages</div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by email or language..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
//             />
//           </div>
          
//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <select
//               value={filterLanguage}
//               onChange={(e) => setFilterLanguage(e.target.value)}
//               className="pl-10 pr-8 py-3 bg-black/20 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors appearance-none cursor-pointer"
//             >
//               <option value="all">All Languages</option>
//               {getUniqueLanguages().map(language => (
//                 <option key={language} value={language}>{language}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent mx-auto mb-4"></div>
//             <p className="text-gray-300">Loading scores...</p>
//           </div>
//         )}

//         {/* Scores Table */}
//         {!isLoading && (
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
//             {filteredScores.length === 0 ? (
//               <div className="text-center py-20">
//                 <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-white mb-2">No Scores Found</h3>
//                 <p className="text-gray-300">
//                   {scores.length === 0 
//                     ? "Take your first quiz to see your scores here!"
//                     : "No scores match your current filters."
//                   }
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-black/20 border-b border-purple-500/20">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">User</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Language</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Score</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Performance</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredScores.map((score, index) => {
//                       const badge = getScoreBadge(score.score, score.total_questions)
//                       const percentage = Math.round((score.score / score.total_questions) * 100)
//                       const isCurrentUser = score.user_id === user?.id
                      
//                       return (
//                         <tr 
//                           key={score.id || index} 
//                           className={`border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors ${
//                             isCurrentUser ? 'bg-purple-500/10' : ''
//                           }`}
//                         >
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className={`w-2 h-2 rounded-full mr-3 ${isCurrentUser ? 'bg-purple-400' : 'bg-gray-400'}`}></div>
//                               <span className={`font-medium ${isCurrentUser ? 'text-purple-300' : 'text-gray-300'}`}>
//                                 {isCurrentUser ? 'You' : score.user_email.split('@')[0]}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className="text-white font-medium">{score.programming_language}</span>
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <div className="flex flex-col items-center">
//                               <span className={`text-2xl font-bold ${getScoreColor(score.score, score.total_questions)}`}>
//                                 {score.score}/{score.total_questions}
//                               </span>
//                               <span className="text-sm text-gray-400">{percentage}%</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
//                               {badge.label}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-center text-gray-400 text-sm">
//                             {new Date(score.completed_at).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Call to Action */}
//         {!isLoading && filteredScores.length > 0 && (
//           <div className="text-center mt-12">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Keep Learning!</h3>
//               <p className="text-gray-300 mb-6">
//                 Challenge yourself with more quizzes and improve your programming skills across different languages.
//               </p>
//               <a
//                 href="/courses"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
//               >
//                 Take Another Quiz
//                 <Target className="ml-2 w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   )
// }

// export default Score


