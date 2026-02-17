import React from "react";
import Lightning from "@/components/Lightning";

const VoiceAssistant: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-24 bg-[#020202] relative overflow-hidden border-t border-white/5">

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

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center glow-purple">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
          </div>

          <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            AI Voice <span className="text-purple-500">Assistant</span>
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            Have natural conversations with our AI voice assistant. Ask programming questions, get explanations, and learn through interactive voice sessions.
          </p>
        </div>

        {/* Connection Dashboard */}
        <div className="max-w-4xl mx-auto bg-[#080808] border border-white/10 p-16 md:p-24 text-center relative overflow-hidden group mb-12">

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent pointer-events-none"></div>

          <div className="relative z-10 space-y-10">
            <div className="text-[10px] uppercase text-white/30 tracking-[0.4em]">
              Ready to connect
            </div>

            <button className="w-32 h-32 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center mx-auto transition-all shadow-[0_0_50px_rgba(34,197,94,0.3)] hover:scale-110 active:scale-95 relative">
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>

            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Start Voice Session
              </h3>

              <p className="text-[10px] text-white/20 uppercase tracking-widest">
                Click to begin talking with the AI assistant
              </p>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/20"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/20"></div>

        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: "Natural Speech", desc: "Speak naturally and get human-like responses", icon: "🎙️" },
            { title: "Smart AI", desc: "Powered by advanced AI for accurate programming help", icon: "🧠" },
            { title: "Live Transcript", desc: "See your conversation in real-time text format", icon: "📝" }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#0a0a0a] border border-white/5 p-10 text-center hover:border-purple-500/30 transition-all group relative"
            >
              <div className="text-3xl mb-6">{feature.icon}</div>

              <h4 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h4>

              <p className="text-white/40 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VoiceAssistant;

// import React from 'react';

// const VoiceAssistant: React.FC = () => {
//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] relative overflow-hidden border-t border-white/5">
//       {/* Background Ambience */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/[0.03] blur-[150px] rounded-full pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header Section */}
//         <div className="text-center mb-20 space-y-6">
//           <div className="flex justify-center mb-6">
//             <div className="w-20 h-20 rounded-full bg-purple-600/10 border border-purple-500/30 flex items-center justify-center glow-purple">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
//             AI Voice <span className="text-purple-500">Assistant</span>
//           </h2>
//           <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
//             Have natural conversations with our AI voice assistant. Ask programming questions, get explanations, and learn through interactive voice sessions.
//           </p>
//         </div>

//         {/* Connection Dashboard */}
//         <div className="max-w-4xl mx-auto bg-[#080808] border border-white/10 p-16 md:p-24 text-center relative overflow-hidden group mb-12">
//           {/* Scanline Effect */}
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.01] to-transparent pointer-events-none"></div>
          
//           <div className="relative z-10 space-y-10">
//             <div className="mono text-[10px] uppercase text-white/30 tracking-[0.4em]">Ready to connect</div>
            
//             <button className="w-32 h-32 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center mx-auto transition-all shadow-[0_0_50px_rgba(34,197,94,0.3)] hover:scale-110 active:scale-95 group relative">
//               {/* Pulse waves */}
//               <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//             </button>
            
//             <div className="space-y-2">
//               <h3 className="text-2xl font-black uppercase tracking-tight">Start Voice Session</h3>
//               <p className="mono text-[10px] text-white/20 uppercase tracking-widest">Click to begin talking with the AI assistant</p>
//             </div>
//           </div>

//           {/* Technical Corner Accents */}
//           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/20"></div>
//           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/20"></div>
//           <div className="absolute top-4 right-4 mono text-[8px] text-white/10 tracking-[0.3em]">VOICE_ENGINE_v2.0</div>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           {[
//             { 
//               title: "Natural Speech", 
//               desc: "Speak naturally and get human-like responses", 
//               icon: "🎙️" 
//             },
//             { 
//               title: "Smart AI", 
//               desc: "Powered by advanced AI for accurate programming help", 
//               icon: "🧠" 
//             },
//             { 
//               title: "Live Transcript", 
//               desc: "See your conversation in real-time text format", 
//               icon: "📝" 
//             }
//           ].map((feature, idx) => (
//             <div key={idx} className="bg-[#0a0a0a] border border-white/5 p-10 text-center hover:border-purple-500/30 transition-all group relative">
//               <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all">{feature.icon}</div>
//               <h4 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-purple-400 transition-colors">
//                 {feature.title}
//               </h4>
//               <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/5 group-hover:w-full group-hover:bg-purple-500/20 transition-all duration-500"></div>
//             </div>
//           ))}
//         </div>

//         {/* Demo Note */}
//         <div className="max-w-4xl mx-auto border border-white/10 bg-[#050505] p-8 relative">
//            <div className="absolute top-0 left-0 w-2 h-px bg-purple-500"></div>
//            <div className="space-y-4">
//              <div className="mono text-[10px] font-bold uppercase text-purple-500 tracking-widest">Demo Note</div>
//              <p className="text-white/40 text-sm italic leading-relaxed">
//                This is a demonstration of the Vapi AI voice assistant integration. In a production environment, this would connect to the actual Vapi service for real-time voice conversations with AI.
//              </p>
//            </div>
//            {/* Decorative bitstream */}
//            <div className="absolute bottom-2 right-4 mono text-[8px] text-white/5 tracking-[0.5em] select-none">
//              01011101 10010011 00011101
//            </div>
//         </div>

//         {/* Footer Technical Accents */}
//         <div className="mt-12 flex justify-between items-center mono text-[10px] text-white/20 uppercase tracking-[0.5em]">
//            <div className="flex gap-4 items-center">
//              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40"></div>
//              <span>Input Device: Detected</span>
//            </div>
//            <div className="flex gap-8">
//              <span>BITRATE: 48KHZ</span>
//              <span>LATENCY: 124MS</span>
//            </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VoiceAssistant;




// // Trying to integrate vapi voice agent over here

// import { useState, useRef, useEffect } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { Mic, MicOff, Phone, PhoneOff, Volume2 } from 'lucide-react'

// interface TranscriptMessage {
//   id: string
//   content: string
//   isUser: boolean
//   timestamp: Date
// }

// const VapiAgent = () => {
//   const { isSignedIn } = useAuth()
//   const [isConnected, setIsConnected] = useState(false)
//   const [isListening, setIsListening] = useState(false)
//   const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
//   const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'disconnected'>('idle')
//   const transcriptEndRef = useRef<HTMLDivElement>(null)

//   // Note: This is a demo implementation. In a real app, you would integrate with Vapi's actual SDK

//   useEffect(() => {
//     scrollToBottom()
//   }, [transcript])

//   const scrollToBottom = () => {
//     transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const startVoiceSession = async () => {
//     try {
//       setConnectionStatus('connecting')
      
//       // Simulate connection delay
//       await new Promise(resolve => setTimeout(resolve, 2000))
      
//       setIsConnected(true)
//       setConnectionStatus('connected')
//       setIsListening(true)
      
//       // Add welcome message
//       const welcomeMessage: TranscriptMessage = {
//         id: Date.now().toString(),
//         content: "Hello! I'm your AI voice assistant. I can help you with programming questions, explain concepts, and provide coding guidance. What would you like to know?",
//         isUser: false,
//         timestamp: new Date()
//       }
//       setTranscript([welcomeMessage])
      
//       // Simulate voice interaction (in real implementation, this would be handled by Vapi SDK)
//       simulateVoiceInteraction()
      
//     } catch (error) {
//       console.error('Error starting voice session:', error)
//       setConnectionStatus('disconnected')
//     }
//   }

//   const endVoiceSession = () => {
//     setIsConnected(false)
//     setIsListening(false)
//     setConnectionStatus('idle')
    
//     // Add goodbye message
//     const goodbyeMessage: TranscriptMessage = {
//       id: Date.now().toString(),
//       content: "Voice session ended. Thanks for chatting! Feel free to start a new session anytime.",
//       isUser: false,
//       timestamp: new Date()
//     }
//     setTranscript(prev => [...prev, goodbyeMessage])
//   }

//   // Demo simulation of voice interaction
//   const simulateVoiceInteraction = () => {
//     // This is just for demo purposes - in real implementation, Vapi would handle this
//     setTimeout(() => {
//       if (isConnected) {
//         const demoUserMessage: TranscriptMessage = {
//           id: Date.now().toString(),
//           content: "Can you explain what JavaScript is?",
//           isUser: true,
//           timestamp: new Date()
//         }
        
//         const demoAIResponse: TranscriptMessage = {
//           id: (Date.now() + 1).toString(),
//           content: "JavaScript is a versatile programming language primarily used for web development. It allows you to create interactive websites, handle user events, and build both frontend and backend applications. It's known for its flexibility and ease of learning.",
//           isUser: false,
//           timestamp: new Date()
//         }
        
//         setTranscript(prev => [...prev, demoUserMessage])
        
//         setTimeout(() => {
//           setTranscript(prev => [...prev, demoAIResponse])
//         }, 2000)
//       }
//     }, 5000)
//   }

//   const getStatusColor = () => {
//     switch (connectionStatus) {
//       case 'connecting': return 'text-yellow-400'
//       case 'connected': return 'text-green-400'
//       case 'disconnected': return 'text-red-400'
//       default: return 'text-gray-400'
//     }
//   }

//   const getStatusText = () => {
//     switch (connectionStatus) {
//       case 'connecting': return 'Connecting...'
//       case 'connected': return 'Connected'
//       case 'disconnected': return 'Disconnected'
//       default: return 'Ready to connect'
//     }
//   }

//   if (!isSignedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//             <Mic className="w-16 h-16 text-purple-400" />
//           </div>
//           <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Sign In Required
//           </h1>
//           <p className="text-gray-300 mb-6">
//             Please sign in to access the AI voice assistant.
//           </p>
//           <Link
//             to="/sign-up"
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//           >
//             Get Started
//           </Link>
//         </div>
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
//               <Mic className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             AI Voice Assistant
//           </h1>
          
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
//             Have natural conversations with our AI voice assistant. Ask programming questions, 
//             get explanations, and learn through interactive voice sessions.
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Voice Controls */}
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 mb-8">
//             <div className="flex flex-col items-center space-y-6">
//               {/* Status */}
//               <div className="text-center">
//                 <div className={`text-lg font-semibold ${getStatusColor()}`}>
//                   {getStatusText()}
//                 </div>
//                 {isConnected && (
//                   <div className="flex items-center justify-center mt-2">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
//                     <span className="text-sm text-gray-300">Voice session active</span>
//                   </div>
//                 )}
//               </div>

//               {/* Main Control Button */}
//               <div className="relative">
//                 {!isConnected ? (
//                   <button
//                     onClick={startVoiceSession}
//                     disabled={connectionStatus === 'connecting'}
//                     className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-green-500/25"
//                   >
//                     <Phone className="w-12 h-12" />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={endVoiceSession}
//                     className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
//                   >
//                     <PhoneOff className="w-12 h-12" />
//                   </button>
//                 )}
                
//                 {/* Listening indicator */}
//                 {isListening && (
//                   <div className="absolute -inset-4 border-4 border-green-400 rounded-full animate-ping"></div>
//                 )}
//               </div>

//               {/* Action Text */}
//               <div className="text-center">
//                 <p className="text-white font-semibold">
//                   {!isConnected ? 'Start Voice Session' : 'End Voice Session'}
//                 </p>
//                 <p className="text-gray-300 text-sm mt-1">
//                   {!isConnected 
//                     ? 'Click to begin talking with the AI assistant' 
//                     : 'Click to end the current voice session'
//                   }
//                 </p>
//               </div>

//               {/* Voice Controls */}
//               {isConnected && (
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2 bg-black/20 px-4 py-2 rounded-lg">
//                     {isListening ? (
//                       <Mic className="w-5 h-5 text-green-400" />
//                     ) : (
//                       <MicOff className="w-5 h-5 text-red-400" />
//                     )}
//                     <span className="text-sm text-gray-300">
//                       {isListening ? 'Listening' : 'Muted'}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center space-x-2 bg-black/20 px-4 py-2 rounded-lg">
//                     <Volume2 className="w-5 h-5 text-blue-400" />
//                     <span className="text-sm text-gray-300">Audio Active</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Transcript */}
//           {transcript.length > 0 && (
//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-6">
//               <h2 className="text-xl font-bold text-white mb-6 flex items-center">
//                 <Volume2 className="w-5 h-5 mr-2 text-purple-400" />
//                 Conversation Transcript
//               </h2>
              
//               <div className="space-y-4 max-h-96 overflow-y-auto">
//                 {transcript.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div className={`max-w-[80%] rounded-lg p-4 ${
//                       message.isUser
//                         ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
//                         : 'bg-black/20 text-gray-100 border border-purple-500/20'
//                     }`}>
//                       <div className="flex items-center mb-2">
//                         <span className="text-sm font-medium">
//                           {message.isUser ? 'You' : 'AI Assistant'}
//                         </span>
//                         <span className="text-xs opacity-70 ml-2">
//                           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                       </div>
//                       <p className="text-sm">{message.content}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={transcriptEndRef} />
//               </div>
//             </div>
//           )}

//           {/* Features */}
//           <div className="grid md:grid-cols-3 gap-6 mt-12">
//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//               <div className="text-4xl mb-4">🎤</div>
//               <h3 className="text-lg font-bold text-white mb-2">Natural Speech</h3>
//               <p className="text-gray-300 text-sm">Speak naturally and get human-like responses</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//               <div className="text-4xl mb-4">🧠</div>
//               <h3 className="text-lg font-bold text-white mb-2">Smart AI</h3>
//               <p className="text-gray-300 text-sm">Powered by advanced AI for accurate programming help</p>
//             </div>
            
//             <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//               <div className="text-4xl mb-4">📝</div>
//               <h3 className="text-lg font-bold text-white mb-2">Live Transcript</h3>
//               <p className="text-gray-300 text-sm">See your conversation in real-time text format</p>
//             </div>
//           </div>

//           {/* Note */}
//           <div className="mt-12 bg-blue-500/10 border border-blue-500/30 p-6 rounded-xl">
//             <h3 className="text-blue-300 font-semibold mb-2">Demo Note</h3>
//             <p className="text-gray-300 text-sm">
//               This is a demonstration of the Vapi AI voice assistant integration. 
//               In a production environment, this would connect to the actual Vapi service 
//               for real-time voice conversations with AI.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default VapiAgent;