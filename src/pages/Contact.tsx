import React from 'react';
import Lightning from '@/components/Lightning';

const Contact: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* ⚡ Lightning Background */}
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

        {/* Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* ⭐ Content */}
      <div className="relative z-10 py-32 px-6 lg:px-24">

        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-24 space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
              Get In Touch
            </h2>

            <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Side */}
            <div className="lg:col-span-5 space-y-12">

              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                Let's Connect
                <span className="h-px flex-grow bg-white/10"></span>
              </h3>

              <div className="space-y-6">

                {[
                  {
                    label: "Email",
                    value: "codingwithhammad786@gmail.com",
                    sub: "We typically respond within 24 hours",
                    id: "CH_01"
                  },
                  {
                    label: "Support",
                    value: "Technical Assistance",
                    sub: "Get help with platform issues",
                    id: "CH_02"
                  },
                  {
                    label: "Feedback",
                    value: "Improvement Requests",
                    sub: "Suggest new features",
                    id: "CH_03"
                  }
                ].map((channel) => (

                  <div
                    key={channel.id}
                    className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-purple-600/5 transition-all relative overflow-hidden"
                  >

                    <div className="absolute top-0 right-0 p-3 text-[8px] text-white/20 tracking-widest">
                      {channel.id}
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs uppercase text-purple-500 font-bold tracking-widest">
                        {channel.label}
                      </div>

                      <div className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                        {channel.value}
                      </div>

                      <p className="text-white/40 text-xs">
                        {channel.sub}
                      </p>
                    </div>

                  </div>

                ))}

              </div>
            </div>

            {/* Right Side Form */}
            <div className="lg:col-span-7">

              <div className="bg-[#0a0a0a]/80 backdrop-blur border border-white/10 p-10 md:p-16 relative">

                <h3 className="text-3xl font-black uppercase tracking-tighter mb-12">
                  Send us a Message
                </h3>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-black border border-white/10 p-4 focus:border-purple-500 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Your Age"
                    className="bg-black border border-white/10 p-4 focus:border-purple-500 outline-none"
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="md:col-span-2 bg-black border border-white/10 p-4 focus:border-purple-500 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Subject"
                    className="md:col-span-2 bg-black border border-white/10 p-4 focus:border-purple-500 outline-none"
                  />

                  <textarea
                    rows={6}
                    placeholder="Description"
                    className="md:col-span-2 bg-black border border-white/10 p-6 focus:border-purple-500 outline-none resize-none"
                  />

                  <button className="md:col-span-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 py-5 font-bold uppercase transition-all hover:-translate-y-1">
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// import React from 'react';

// const Contact: React.FC = () => {
//   return (
//     <section className="py-32 px-6 lg:px-24 border-t border-white/5 bg-black relative overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-24 space-y-6">
//           <div className="flex justify-center mb-6">
//             <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center glow-purple">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">Get In Touch</h2>
//           <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
//             Have questions, feedback, or suggestions? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           {/* Left: Connection Channels */}
//           <div className="lg:col-span-5 space-y-12">
//             <div>
//               <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
//                 Let's Connect
//                 <span className="h-px flex-grow bg-white/10"></span>
//               </h3>
              
//               <div className="space-y-6">
//                 {[
//                   { 
//                     label: "Email", 
//                     value: "codingwithhammad786@gmail.com", 
//                     sub: "We typically respond within 24 hours",
//                     icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//                     id: "CH_01"
//                   },
//                   { 
//                     label: "Support", 
//                     value: "Technical Assistance", 
//                     sub: "Get help with technical issues, account problems, or platform features",
//                     icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
//                     id: "CH_02"
//                   },
//                   { 
//                     label: "Feedback", 
//                     value: "Improvement Requests", 
//                     sub: "Share your ideas for new features or improvements to make LearnAI better",
//                     icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
//                     id: "CH_03"
//                   }
//                 ].map((channel) => (
//                   <div key={channel.id} className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-purple-600/5 transition-all relative overflow-hidden">
//                     <div className="absolute top-0 right-0 p-3 mono text-[8px] text-white/20 tracking-widest">{channel.id}</div>
//                     <div className="flex gap-6 items-start">
//                       <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-purple-500 bg-black group-hover:border-purple-500/50 transition-colors">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={channel.icon} />
//                         </svg>
//                       </div>
//                       <div className="space-y-1">
//                         <div className="mono text-[10px] uppercase text-purple-500 font-bold tracking-widest">{channel.label}</div>
//                         <div className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{channel.value}</div>
//                         <p className="text-white/40 text-xs leading-relaxed">{channel.sub}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right: Messaging Interface */}
//           <div className="lg:col-span-7">
//             <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-16 relative glow-purple">
//               {/* Technical Accents */}
//               <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-purple-500/50"></div>
//               <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-purple-500/50"></div>
              
//               <div className="flex justify-between items-center mb-12">
//                 <h3 className="text-3xl font-black uppercase tracking-tighter">Send us a Message</h3>
//                 <div className="flex gap-1">
//                   {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-purple-500"></div>)}
//                 </div>
//               </div>

//               <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <label className="mono text-[10px] uppercase text-white/40 tracking-widest">Name *</label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                     </span>
//                     <input 
//                       type="text" 
//                       placeholder="Your full name" 
//                       className="w-full bg-black border border-white/10 p-4 pl-12 text-sm focus:border-purple-500 outline-none transition-colors mono placeholder:text-white/10"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label className="mono text-[10px] uppercase text-white/40 tracking-widest">Age *</label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                     </span>
//                     <input 
//                       type="text" 
//                       placeholder="Your age" 
//                       className="w-full bg-black border border-white/10 p-4 pl-12 text-sm focus:border-purple-500 outline-none transition-colors mono placeholder:text-white/10"
//                     />
//                   </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-3">
//                   <label className="mono text-[10px] uppercase text-white/40 tracking-widest">Email *</label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </span>
//                     <input 
//                       type="email" 
//                       placeholder="your@email.com" 
//                       className="w-full bg-black border border-white/10 p-4 pl-12 text-sm focus:border-purple-500 outline-none transition-colors mono placeholder:text-white/10"
//                     />
//                   </div>
//                 </div>

//                 <div className="md:col-span-2 space-y-3">
//                   <label className="mono text-[10px] uppercase text-white/40 tracking-widest">Subject *</label>
//                   <input 
//                     type="text" 
//                     placeholder="What's this about?" 
//                     className="w-full bg-black border border-white/10 p-4 text-sm focus:border-purple-500 outline-none transition-colors mono placeholder:text-white/10"
//                   />
//                 </div>

//                 <div className="md:col-span-2 space-y-3">
//                   <label className="mono text-[10px] uppercase text-white/40 tracking-widest">Description *</label>
//                   <textarea 
//                     rows={6}
//                     placeholder="Tell us more about your message..." 
//                     className="w-full bg-black border border-white/10 p-6 text-sm focus:border-purple-500 outline-none transition-colors mono placeholder:text-white/10 resize-none"
//                   ></textarea>
//                 </div>

//                 <div className="md:col-span-2 pt-6">
//                   <button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white font-black uppercase py-5 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(168,85,247,0.4)]">
//                     Send Message
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                     </svg>
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-12 flex items-center justify-between mono text-[8px] text-white/20 uppercase tracking-[0.4em]">
//                 <span>Transmitting via SECURE_LINE</span>
//                 <span>ENC: AES-256</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
