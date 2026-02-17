
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Brain, CheckCircle, ChevronDown } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { faqs, workflowSteps } from "../constant/index";
import Lightning from "../components/Lightning";

const About = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative min-h-screen bg-black text-white">

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
      <div className="relative z-10">

        {/* HERO */}
        <section className="px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn Smarter with AI
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Personalized learning roadmap powered by AI.
          </p>

          <Link
            to={isSignedIn ? "/dashboard" : "/sign-up"}
            className="inline-flex items-center gap-2 bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </section>

        {/* FEATURES */}
        <section className="px-6 py-16 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/5 rounded-xl backdrop-blur">
            <Zap className="mb-4 text-purple-400" size={28} />
            <h3 className="text-xl font-semibold mb-2">Fast Learning</h3>
            <p className="text-gray-400">Speed up your knowledge with AI.</p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl backdrop-blur">
            <Target className="mb-4 text-purple-400" size={28} />
            <h3 className="text-xl font-semibold mb-2">Goal Based</h3>
            <p className="text-gray-400">Follow clear structured roadmap.</p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl backdrop-blur">
            <Brain className="mb-4 text-purple-400" size={28} />
            <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
            <p className="text-gray-400">Adaptive recommendations.</p>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {workflowSteps.map((step, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-xl">
                <CheckCircle className="text-purple-400 mb-3" />
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            FAQs
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-xl">
                <h4 className="font-semibold flex justify-between">
                  {faq.question}
                  <ChevronDown size={18} />
                </h4>
                <p className="text-gray-400 mt-2 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
};

export default About;



// import React from "react"
// import { Link } from "react-router-dom";
// import { ArrowRight, Zap, Target, Brain, CheckCircle, ChevronDown } from "lucide-react";
// import { useAuth } from "@clerk/clerk-react";
// import { faqs, workflowSteps } from "../constant/index";
// import Lightning from "../components/Lightning";
// // import Hero from '@/components/landing/Hero'
// // import Features from '@/components/landing/Features'
// // import HowItWorks from '@/components/landing/HowItWorks'
// // import FAQ from '@/components/landing/FAQ'
// // import Footer from '@/components/landing/Footer'

// const Home = () => {
//   const { isSignedIn } = useAuth();

//   return (
//     <div className="relative min-h-screen bg-black text-white">

//       {/* ================= LIGHTNING BACKGROUND ================= */}
//       <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

//         {/* Lightning Canvas */}
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
//       <div className="relative z-10">

//         {/* ================= HERO SECTION ================= */}
//         <section className="px-6 py-20 text-center">
//           <h1 className="text-5xl font-bold mb-6">
//             Learn Smarter with AI
//           </h1>

//           <p className="text-gray-300 max-w-2xl mx-auto mb-8">
//             Personalized learning roadmap powered by AI.
//           </p>

//           <Link
//             to={isSignedIn ? "/dashboard" : "/sign-up"}
//             className="inline-flex items-center gap-2 bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition"
//           >
//             Get Started
//             <ArrowRight size={18} />
//           </Link>
//         </section>

//         {/* ================= FEATURES SECTION ================= */}
//         <section className="px-6 py-16 grid md:grid-cols-3 gap-8">
//           <div className="p-6 bg-white/5 rounded-xl backdrop-blur">
//             <Zap className="mb-4 text-purple-400" size={28} />
//             <h3 className="text-xl font-semibold mb-2">Fast Learning</h3>
//             <p className="text-gray-400">Speed up your knowledge with AI.</p>
//           </div>

//           <div className="p-6 bg-white/5 rounded-xl backdrop-blur">
//             <Target className="mb-4 text-purple-400" size={28} />
//             <h3 className="text-xl font-semibold mb-2">Goal Based</h3>
//             <p className="text-gray-400">Follow clear structured roadmap.</p>
//           </div>

//           <div className="p-6 bg-white/5 rounded-xl backdrop-blur">
//             <Brain className="mb-4 text-purple-400" size={28} />
//             <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
//             <p className="text-gray-400">Adaptive recommendations.</p>
//           </div>
//         </section>

//         {/* ================= WORKFLOW SECTION ================= */}
//         <section className="px-6 py-20">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             How It Works
//           </h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {workflowSteps.map((step, index) => (
//               <div key={index} className="p-6 bg-white/5 rounded-xl">
//                 <CheckCircle className="text-purple-400 mb-3" />
//                 <h4 className="font-semibold mb-2">{step.title}</h4>
//                 <p className="text-gray-400 text-sm">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ================= FAQ SECTION ================= */}
//         <section className="px-6 py-20">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             FAQs
//           </h2>

//           <div className="max-w-3xl mx-auto space-y-6">
//             {faqs.map((faq, index) => (
//               <div key={index} className="p-6 bg-white/5 rounded-xl">
//                 <h4 className="font-semibold flex justify-between">
//                   {faq.question}
//                   <ChevronDown size={18} />
//                 </h4>
//                 <p className="text-gray-400 mt-2 text-sm">
//                   {faq.answer}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ================= FOOTER ================= */}
      
  
//     <footer className="py-24 px-6 lg:px-24 bg-black relative border-t border-white/5 overflow-hidden">
//       {/* Aesthetic Background Accents */}
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.02] blur-[120px] rounded-full pointer-events-none"></div>
      
//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
//           {/* Brand Column */}
//           <div className="md:col-span-6 space-y-6">
//             <div className="flex items-center gap-2 group cursor-pointer">
//               <span className="text-purple-500 font-black text-2xl group-hover:scale-110 transition-transform tracking-tighter">
//                 &lt; &gt;
//               </span>
//               <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
//                 Learn<span className="text-purple-500">AI</span>
//               </h3>
//             </div>
//             <p className="text-white/40 text-lg leading-relaxed max-w-md">
//               Master programming languages with AI-powered quizzes and personalized learning roadmapss
//             </p>
//             <div className="pt-4 flex gap-4">
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="w-8 h-[1px] bg-white/10"></div>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links Column */}
//           <div className="md:col-span-3 space-y-8">
//             <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white border-b border-purple-500/20 pb-4 inline-block">
//               Quick Links
//             </h4>
//             <ul className="space-y-4">
//               {['Home', 'About', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <a href="#" className="text-white/40 hover:text-purple-400 transition-colors text-sm mono flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-[1px] bg-purple-500 transition-all"></span>
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Learning Column */}
//           <div className="md:col-span-3 space-y-8">
//             <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white border-b border-purple-500/20 pb-4 inline-block">
//               Learning
//             </h4>
//             <ul className="grid grid-cols-1 gap-4">
//               {[
//                 'Courses', 
//                 'Roadmap', 
//                 'Scores', 
//                 'Chatbot', 
//                 'Library', 
//                 'Voice Agent'
//               ].map((item) => (
//                 <li key={item}>
//                   <a href="#" className="text-white/40 hover:text-purple-400 transition-colors text-sm mono flex items-center gap-2 group">
//                     <span className="w-0 group-hover:w-2 h-[1px] bg-purple-500 transition-all"></span>
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-12 border-t border-white/5 text-center relative">
//           {/* Technical label for footer */}
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
//             SYSTEM_FOOTER_v2.0 // EOF
//           </div>

//           <p className="text-white/30 text-[11px] mono uppercase tracking-[0.2em]">
//             © 2026 LearnAI. All rights reserved. <span className="text-purple-500/60">Powered by AI.</span>
//           </p>

//           <div className="mt-8 flex justify-center gap-6 opacity-20 grayscale">
//             {/* Mock badges for aesthetic */}
//             <div className="w-8 h-8 border border-white/20 rounded-sm"></div>
//             <div className="w-8 h-8 border border-white/20 rounded-sm"></div>
//             <div className="w-8 h-8 border border-white/20 rounded-sm"></div>
//           </div>
//         </div>
//       </div>

//       {/* Subtle Scanline Overlay */}
//       {/* <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20"></div> */}
//     </footer>
  



//       </div>
//     </div>
//   );
// };

// export default Home;





// import { Zap, Code } from "lucide-react";
// import { features, stats } from "../constant/index";

// const About = () => {
//   return (
//     <div className="min-h-screen text-gray-200">

//       {/* ---------------- HERO ---------------- */}
//       <section className="container mx-auto px-6 py-24">
//         <div className="max-w-4xl mx-auto text-center">

//           <div className="flex justify-center mb-10">
//             <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-xl">
//               <Code className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
//             About <span className="text-purple-400">LearnAI</span>
//           </h1>

//           <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
//             Revolutionizing programming education through AI-powered learning,
//             personalized roadmaps, and adaptive content generation.
//           </p>
//         </div>
//       </section>

//       {/* ---------------- MISSION ---------------- */}
//       <section className="container mx-auto px-6 py-24">
//         <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

//           <div>
//             <h2 className="text-4xl font-bold mb-6 text-purple-400">
//               Our Mission
//             </h2>

//             <p className="text-gray-400 mb-6 leading-relaxed">
//               We believe programming education should be accessible,
//               engaging, and tailored to each learner’s pace and style.
//               LearnAI leverages advanced AI to deliver personalized
//               learning journeys for developers of all levels.
//             </p>

//             <p className="text-gray-400 leading-relaxed">
//               Our platform bridges theoretical knowledge and real-world
//               development skills to help users master modern programming
//               technologies confidently.
//             </p>
//           </div>

//           {/* Mission Card */}
//           <div className="p-10 rounded-2xl bg-black/40 border border-purple-500/20 backdrop-blur-xl shadow-lg">
//             <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Zap className="w-10 h-10 text-purple-400" />
//             </div>

//             <h3 className="text-xl font-semibold text-white text-center mb-4">
//               Powered by Innovation
//             </h3>

//             <p className="text-gray-400 text-center">
//               Utilizing advanced AI models to create adaptive,
//               intelligent learning systems for developers worldwide.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ---------------- FEATURES ---------------- */}
//       <section className="container mx-auto px-6 py-24">
//         <div className="max-w-6xl mx-auto">

//           <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">
//             What Makes Us Different
//           </h2>

//           <div className="grid md:grid-cols-2 gap-10">

//             {features.map(({ icon: Icon, title, description }, index) => (
//               <div
//                 key={index}
//                 className="p-8 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300"
//               >
//                 <div className="bg-purple-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
//                   <Icon className="w-7 h-7 text-purple-400" />
//                 </div>

//                 <h3 className="text-xl font-semibold text-white mb-3">
//                   {title}
//                 </h3>

//                 <p className="text-gray-400 leading-relaxed">
//                   {description}
//                 </p>
//               </div>
//             ))}

//           </div>
//         </div>
//       </section>

//       {/* ---------------- STATS ---------------- */}
//       <section className="container mx-auto px-6 py-24">
//         <div className="max-w-5xl mx-auto">

//           <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">
//             Platform Statistics
//           </h2>

//           <div className="grid md:grid-cols-4 gap-8">

//             {stats.map(({ number, label }, index) => (
//               <div
//                 key={index}
//                 className="p-8 text-center rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all"
//               >
//                 <div className="text-3xl font-bold text-purple-400 mb-2">
//                   {number}
//                 </div>
//                 <div className="text-gray-400">{label}</div>
//               </div>
//             ))}

//           </div>
//         </div>
//       </section>

//       {/* ---------------- VISION ---------------- */}
//       <section className="container mx-auto px-6 py-24">
//         <div className="max-w-4xl mx-auto text-center">

//           <h2 className="text-4xl font-bold mb-10 text-purple-400">
//             The Future of Learning
//           </h2>

//           <p className="text-lg text-gray-400 mb-10 leading-relaxed">
//             LearnAI envisions a future where programming education is
//             personalized, adaptive, and powered by artificial intelligence —
//             empowering learners worldwide.
//           </p>

//           <div className="p-10 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl">
//             <p className="text-gray-300 italic">
//               "Learning to code shouldn't be one-size-fits-all. Every
//               developer’s journey is unique, and our AI ensures learning
//               paths are tailored to individual goals."
//             </p>

//             <div className="mt-6 text-purple-400 font-semibold">
//               — LearnAI Team
//             </div>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default About;



// // import { Zap, Code } from 'lucide-react'
// // import { features, stats } from '../constant/index'

// // const About = () => {
// //   return (
// //     <div className="min-h-screen">
// //       {/* Hero Section */}
// //       <section className="container mx-auto px-6 py-20">
// //         <div className="max-w-4xl mx-auto text-center">
// //           <div className="flex justify-center mb-8">
// //             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
// //               <Code className="w-12 h-12 text-purple-400" />
// //             </div>
// //           </div>
// //           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
// //             About LearnAI
// //           </h1>
// //           <p className="text-xl text-gray-300 mb-8 leading-relaxed">
// //             Revolutionizing programming education through artificial intelligence,
// //             personalized learning experiences, and adaptive content generation.
// //           </p>
// //         </div>
// //       </section>

// //       {/* Mission Section */}
// //       <section className="container mx-auto px-6 py-20">
// //         <div className="max-w-6xl mx-auto">
// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
// //                 Our Mission
// //               </h2>
// //               <p className="text-lg text-gray-300 mb-6 leading-relaxed">
// //                 We believe that learning programming should be accessible, engaging, and tailored to each individual's pace and style.
// //                 Our mission is to democratize coding education by leveraging cutting-edge AI technology to create personalized learning experiences.
// //               </p>
// //               <p className="text-lg text-gray-300 leading-relaxed">
// //                 Through our platform, we aim to bridge the gap between theoretical knowledge and practical application,
// //                 helping developers of all levels master new programming languages and advance their careers.
// //               </p>
// //             </div>

// //             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20">
// //               <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl mb-6">
// //                 <Zap className="w-12 h-12 text-purple-400 mx-auto" />
// //               </div>
// //               <h3 className="text-2xl font-semibold text-white text-center mb-4">Powered by Innovation</h3>
// //               <p className="text-gray-300 text-center">
// //                 Utilizing Google's Gemini AI to deliver the most advanced and adaptive learning platform for programmers worldwide.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="container mx-auto px-6 py-20">
// //         <div className="max-w-6xl mx-auto">
// //           <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
// //             What Makes Us Different
// //           </h2>

// //           <div className="grid md:grid-cols-2 gap-8">
// //             {features.map(({ icon: Icon, title, description }, index) => (
// //               <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
// //                 <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
// //                   <Icon className="w-8 h-8 text-purple-400" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
// //                 <p className="text-gray-300 leading-relaxed">{description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="container mx-auto px-6 py-20">
// //         <div className="max-w-4xl mx-auto">
// //           <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
// //             Platform Statistics
// //           </h2>

// //           <div className="grid md:grid-cols-4 gap-8">
// //             {stats.map(({ number, label }, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
// //                   <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
// //                     {number}
// //                   </div>
// //                   <div className="text-gray-300 font-medium">{label}</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Vision Section */}
// //       <section className="container mx-auto px-6 py-20">
// //         <div className="max-w-4xl mx-auto text-center">
// //           <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
// //             The Future of Learning
// //           </h2>
// //           <p className="text-xl text-gray-300 mb-8 leading-relaxed">
// //             We envision a world where anyone can master programming through personalized, AI-driven education.
// //             Our platform represents the next evolution in coding education, combining the best of human expertise with artificial intelligence.
// //           </p>
// //           <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
// //             <p className="text-lg text-gray-300 italic">
// //               "Learning to code shouldn't be a one-size-fits-all experience. Every developer's journey is unique,
// //               and our AI ensures that each learning path is as individual as the person taking it."
// //             </p>
// //             <div className="mt-4 text-purple-400 font-semibold">- LearnAI Team</div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   )
// // }

// // export default About