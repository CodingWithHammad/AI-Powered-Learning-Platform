import { Zap, Code } from "lucide-react";
import { features, stats } from "../constant/index";

const About = () => {
  return (
    <div className="min-h-screen text-gray-200">

      {/* ---------------- HERO ---------------- */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">

          <div className="flex justify-center mb-10">
            <div className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-xl">
              <Code className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            About <span className="text-purple-400">LearnAI</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Revolutionizing programming education through AI-powered learning,
            personalized roadmaps, and adaptive content generation.
          </p>
        </div>
      </section>

      {/* ---------------- MISSION ---------------- */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

          <div>
            <h2 className="text-4xl font-bold mb-6 text-purple-400">
              Our Mission
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              We believe programming education should be accessible,
              engaging, and tailored to each learner’s pace and style.
              LearnAI leverages advanced AI to deliver personalized
              learning journeys for developers of all levels.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Our platform bridges theoretical knowledge and real-world
              development skills to help users master modern programming
              technologies confidently.
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-10 rounded-2xl bg-black/40 border border-purple-500/20 backdrop-blur-xl shadow-lg">
            <div className="bg-purple-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-purple-400" />
            </div>

            <h3 className="text-xl font-semibold text-white text-center mb-4">
              Powered by Innovation
            </h3>

            <p className="text-gray-400 text-center">
              Utilizing advanced AI models to create adaptive,
              intelligent learning systems for developers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="bg-purple-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-purple-400" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">
            Platform Statistics
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {stats.map(({ number, label }, index) => (
              <div
                key={index}
                className="p-8 text-center rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {number}
                </div>
                <div className="text-gray-400">{label}</div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ---------------- VISION ---------------- */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-10 text-purple-400">
            The Future of Learning
          </h2>

          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            LearnAI envisions a future where programming education is
            personalized, adaptive, and powered by artificial intelligence —
            empowering learners worldwide.
          </p>

          <div className="p-10 rounded-xl bg-black/40 border border-purple-500/20 backdrop-blur-xl">
            <p className="text-gray-300 italic">
              "Learning to code shouldn't be one-size-fits-all. Every
              developer’s journey is unique, and our AI ensures learning
              paths are tailored to individual goals."
            </p>

            <div className="mt-6 text-purple-400 font-semibold">
              — LearnAI Team
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;



// import { Zap, Code } from 'lucide-react'
// import { features, stats } from '../constant/index'

// const About = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="flex justify-center mb-8">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
//               <Code className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             About LearnAI
//           </h1>
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed">
//             Revolutionizing programming education through artificial intelligence,
//             personalized learning experiences, and adaptive content generation.
//           </p>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Our Mission
//               </h2>
//               <p className="text-lg text-gray-300 mb-6 leading-relaxed">
//                 We believe that learning programming should be accessible, engaging, and tailored to each individual's pace and style.
//                 Our mission is to democratize coding education by leveraging cutting-edge AI technology to create personalized learning experiences.
//               </p>
//               <p className="text-lg text-gray-300 leading-relaxed">
//                 Through our platform, we aim to bridge the gap between theoretical knowledge and practical application,
//                 helping developers of all levels master new programming languages and advance their careers.
//               </p>
//             </div>

//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20">
//               <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl mb-6">
//                 <Zap className="w-12 h-12 text-purple-400 mx-auto" />
//               </div>
//               <h3 className="text-2xl font-semibold text-white text-center mb-4">Powered by Innovation</h3>
//               <p className="text-gray-300 text-center">
//                 Utilizing Google's Gemini AI to deliver the most advanced and adaptive learning platform for programmers worldwide.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             What Makes Us Different
//           </h2>

//           <div className="grid md:grid-cols-2 gap-8">
//             {features.map(({ icon: Icon, title, description }, index) => (
//               <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
//                 <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
//                   <Icon className="w-8 h-8 text-purple-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
//                 <p className="text-gray-300 leading-relaxed">{description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Platform Statistics
//           </h2>

//           <div className="grid md:grid-cols-4 gap-8">
//             {stats.map(({ number, label }, index) => (
//               <div key={index} className="text-center">
//                 <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
//                   <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                     {number}
//                   </div>
//                   <div className="text-gray-300 font-medium">{label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Vision Section */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             The Future of Learning
//           </h2>
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed">
//             We envision a world where anyone can master programming through personalized, AI-driven education.
//             Our platform represents the next evolution in coding education, combining the best of human expertise with artificial intelligence.
//           </p>
//           <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
//             <p className="text-lg text-gray-300 italic">
//               "Learning to code shouldn't be a one-size-fits-all experience. Every developer's journey is unique,
//               and our AI ensures that each learning path is as individual as the person taking it."
//             </p>
//             <div className="mt-4 text-purple-400 font-semibold">- LearnAI Team</div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default About