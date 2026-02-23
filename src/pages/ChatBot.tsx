// import React, { useState, useRef, useEffect } from 'react'
// import { useAuthStore } from "../store/authStore"

// import { Link } from 'react-router-dom'
// import { MessageCircle, Send, Bot, User, Loader2 } from 'lucide-react'
// import { GoogleGenerativeAI } from '@google/generative-ai'

// interface Message {
//   id: string
//   content: string
//   isUser: boolean
//   timestamp: Date
// }

// const ChatBot = () => {
//   const { user } = useAuthStore()
//   console.log(user)
//   // const { isSignedIn } = useAuth()
//   const [messages, setMessages] = useState<Message[]>([])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null)

//   const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key'
//   const genAI = new GoogleGenerativeAI(API_KEY)

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   useEffect(() => {
//     if (user && messages.length === 0) {
//       // Add welcome message
//       const welcomeMessage: Message = {
//         id: Date.now().toString(),
//         content: `Hello! 👋 I'm your AI programming assistant. I can help you with coding questions, explain programming concepts, debug issues, and provide learning guidance. What would you like to know?`,
//         isUser: false,
//         timestamp: new Date()
//       }
//       setMessages([welcomeMessage])
//     }
//   }, [user])

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const sendMessage = async () => {
//     if (!inputMessage.trim() || isTyping) return

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: inputMessage.trim(),
//       isUser: true,
//       timestamp: new Date()
//     }

//     setMessages(prev => [...prev, userMessage])
//     setInputMessage('')
//     setIsTyping(true)

//     try {
//       const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

//       const prompt = `You are a helpful AI programming assistant. The user asked: "${userMessage.content}". 
//       Please provide a helpful, accurate, and educational response. If it's about programming, include code examples when relevant. 
//       Keep responses conversational but informative. If the question is not programming-related, gently redirect to programming topics while still being helpful.`

//       const result = await model.generateContent(prompt)
//       const response = await result.response
//       const aiResponse = response.text()

//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponse,
//         isUser: false,
//         timestamp: new Date()
//       }

//       setMessages(prev => [...prev, aiMessage])
//     } catch (error) {
//       console.error('Error sending message:', error)
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
//         isUser: false,
//         timestamp: new Date()
//       }
//       setMessages(prev => [...prev, errorMessage])
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       sendMessage()
//     }
//   }

//   const formatMessage = (content: string) => {
//     // Simple formatting for code blocks
//     const parts = content.split('```')
//     return parts.map((part, index) => {
//       if (index % 2 === 1) {
//         // This is a code block
//         return (
//           <pre key={index} className="bg-black/40 p-4 rounded-lg my-2 overflow-x-auto">
//             <code className="text-green-400 text-sm">{part}</code>
//           </pre>
//         )
//       }
//       // Regular text with line breaks
//       return (
//         <div key={index} className="whitespace-pre-wrap">
//           {part}
//         </div>
//       )
//     })
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//             <MessageCircle className="w-16 h-16 text-purple-400" />
//           </div>
//           <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Sign In Required
//           </h1>
//           <p className="text-gray-300 mb-6">
//             Please sign in to chat with our AI programming assistant.
//           </p>
//           <Link
//             to="/register"
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
//           >
//             Get Started
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-500/20 p-6">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-center">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-full border border-purple-500/30 mr-4">
//               <MessageCircle className="w-8 h-8 text-purple-400" />
//             </div>
//             <div className="text-center">
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 AI Programming Assistant
//               </h1>
//               <p className="text-gray-300">Ask me anything about programming!</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 container mx-auto px-6 py-6 overflow-hidden">
//         <div className="h-full max-w-full mx-auto flex flex-col">
//           <div className="flex-1 overflow-y-auto space-y-4 mb-6">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`flex items-start max-w-[90%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
//                   <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.isUser
//                     ? 'bg-gradient-to-r from-purple-500 to-pink-500 ml-3'
//                     : 'bg-gradient-to-r from-blue-500 to-cyan-500 mr-3'
//                     }`}>
//                     {message.isUser ? (
//                       <User className="w-5 h-5 text-white" />
//                     ) : (
//                       <Bot className="w-5 h-5 text-white" />
//                     )}
//                   </div>

//                   <div className={`rounded-2xl p-4 ${message.isUser
//                     ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
//                     : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-gray-100'
//                     }`}>
//                     <div className="text-sm">
//                       {formatMessage(message.content)}
//                     </div>
//                     <div className={`text-xs mt-2 opacity-70 ${message.isUser ? 'text-purple-100' : 'text-gray-400'
//                       }`}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Typing Indicator */}
//             {isTyping && (
//               <div className="flex justify-start">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3 flex items-center justify-center">
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4">
//                     <div className="flex items-center space-x-2">
//                       <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
//                       <span className="text-gray-300 text-sm">AI is thinking...</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
//             <div className="flex items-end space-x-4">
//               <div className="flex-1">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Ask me about programming, debugging, concepts, or anything code-related..."
//                   className="w-full bg-black/20 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
//                   disabled={isTyping}
//                 />
//               </div>
//               <button
//                 onClick={sendMessage}
//                 disabled={!inputMessage.trim() || isTyping}
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex-shrink-0"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="text-xs text-gray-400 mt-2">
//               Press Enter to send • Shift+Enter for new line
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChatBot






















// import React, { useState } from 'react'
// import { chatbotResponse } from '@/lib/gemini' // adjust path if needed
// import MarkdownRenderer from '@/components/MarkdownRenderer'

// interface Message {
//   role: 'user' | 'assistant'
//   content: string
//   time: string
// }

// const Chatbot: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'assistant',
//       content:
//         "Hello! 👋 I'm your AI programming assistant. I can help you with coding questions, explain programming concepts, debug issues, and provide learning guidance. What would you like to know?",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//   ])

//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSendMessage = async () => {
//     if (!input.trim()) return

//     const userMessage: Message = {
//       role: 'user',
//       content: input.trim(),
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setLoading(true)

//     try {
//       const aiReply = await chatbotResponse(input)

//       const botMessage: Message = {
//         role: 'assistant',
//         content: aiReply,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }

//       setMessages((prev) => [...prev, botMessage])
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: '⚠️ Sorry, something went wrong. Please try again.',
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         }
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] relative overflow-hidden border-t border-white/5">
//       {/* Ambience glow */}
//       <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/[0.05] blur-[120px] rounded-full pointer-events-none"></div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header (optional – keeping your design version) */}
//         <div className="text-center mb-16 space-y-4">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/40 flex items-center justify-center glow-purple">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-8 w-8 text-purple-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
//             AI Programming Assistant
//           </h2>
//           <p className="mono text-[10px] uppercase text-white/30 tracking-[0.4em]">
//             Ask me anything about programming!
//           </p>
//         </div>

//         {/* ──────────────────────────────────────────────── */}
//         {/*               MAIN CHAT CONTAINER                */}
//         {/* ──────────────────────────────────────────────── */}

//         <div className="max-w-5xl mx-auto bg-[#080808] border border-white/10 rounded-sm overflow-hidden shadow-2xl relative">
//           {/* Top bar */}
//           <div className="px-6 py-3 border-b border-white/5 bg-black/50 flex justify-between items-center mono text-[8px] text-white/20 uppercase tracking-[0.3em]">
//             <div className="flex items-center gap-2">
//               <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse"></span>
//               Gemini Pro 3.0 Instance // Active
//             </div>
//             <div>Uptime: 142:04:12</div>
//           </div>

//           {/* Messages area */}
//           <div className="p-8 space-y-12 max-h-[700px] overflow-y-auto custom-scrollbar">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex gap-4 items-start ${
//                   msg.role === 'user'
//                     ? 'justify-end ml-auto max-w-[85%]'
//                     : 'max-w-[95%]'
//                 }`}
//               >
//                 {/* Assistant avatar + bubble */}
//                 {msg.role === 'assistant' && (
//                   <>
//                     <div className="w-10 h-10 rounded-sm bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         />
//                       </svg>
//                     </div>

//                     <div className="space-y-1 w-full">
//                    <div
//   className={`p-5 bg-purple-600/5 border border-purple-500/20 text-white/80 leading-relaxed text-sm whitespace-pre-wrap ${
//     loading && index === messages.length - 1 ? 'animate-pulse' : ''
//   }`}
// >
//   <MarkdownRenderer className='' content={msg.content} />
// </div>
//                       <div className="mono text-[9px] text-white/20">{msg.time}</div>
//                     </div>
//                   </>
//                 )}

//                 {/* User message */}
//                 {msg.role === 'user' && (
//                   <>
//                     <div className="space-y-1 text-right w-full">
//                       <div className="p-5 bg-purple-600 text-white font-bold leading-relaxed text-sm rounded-sm shadow-[0_0_25px_rgba(168,85,247,0.2)] whitespace-pre-wrap">
//                         {msg.content}
//                       </div>
//                       <div className="mono text-[9px] text-white/20">{msg.time}</div>
//                     </div>

//                     <div className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center flex-shrink-0 bg-black">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-white/40"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}

//             {loading && (
//               <div className="flex gap-4 items-start max-w-[95%]">
//                 <div className="w-10 h-10 rounded-sm bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
//                   <svg /* same robot svg as above */ />
//                 </div>
//                 <div className="text-purple-400/70 text-sm animate-pulse">thinking...</div>
//               </div>
//             )}
//           </div>

//           {/* Input area – almost 1:1 with design */}
//           <div className="p-8 border-t border-white/10 bg-black relative">
//             <div className="absolute top-0 left-0 w-8 h-px bg-purple-600"></div>

//             <div className="flex gap-4">
//               <div className="flex-grow relative">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                   placeholder="Ask me about programming, debugging, concepts, or anything code related..."
//                   className="w-full bg-[#0a0a0a] border border-white/10 p-5 pr-16 text-sm mono focus:border-purple-500/50 outline-none transition-all placeholder:text-white/10"
//                 />
//                 <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 pointer-events-none">
//                   <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
//                   <span className="mono text-[8px] text-white/20 uppercase">Core_Ready</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSendMessage}
//                 disabled={loading}
//                 className="w-16 h-[62px] bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all group disabled:opacity-50"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-white group-hover:scale-110 transition-transform"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="mt-4 flex justify-between items-center mono text-[8px] text-white/10 uppercase tracking-widest">
//               <span>Press Enter to send // Shift+Enter for new line</span>
//               <span>Encrypted Transaction: TR-5420</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(168, 85, 247, 0.2);
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(168, 85, 247, 0.4);
//         }
//         .glow-purple {
//           box-shadow: 0 0 25px rgba(168, 85, 247, 0.35);
//         }
//       `}</style>
//     </section>
//   )
// }

// export default Chatbot




















// import React, { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { chatbotResponse } from '@/lib/gemini'
// import MarkdownRenderer from '@/components/MarkdownRenderer'

// interface Message {
//   role: 'user' | 'assistant'
//   content: string
//   time: string
// }

// const Chatbot: React.FC = () => {



  
//   const { isSignedIn } = useAuth()

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'assistant',
//       content:
//         "Hello! 👋 I'm your AI programming assistant. Sign in to start asking coding questions.",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//   ])

//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)

//   // ✅ SEND MESSAGE HANDLER
//   const handleSendMessage = async () => {
//     if (!input.trim()) return

//     // ❌ Block if user not signed in
//     if (!isSignedIn) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: "🔒 Please sign in to use the AI assistant.",
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         }
//       ])
//       return
//     }

//     const userMessage: Message = {
//       role: 'user',
//       content: input.trim(),
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setLoading(true)

//     try {
//       const aiReply = await chatbotResponse(input)

//       const botMessage: Message = {
//         role: 'assistant',
//         content: aiReply,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }

//       setMessages((prev) => [...prev, botMessage])

//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: '⚠️ Something went wrong. Please try again.',
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         }
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   return (
//     <section className="py-32 px-6 lg:px-24 bg-[#020202] relative overflow-hidden border-t border-white/5">

//       <div className="max-w-7xl mx-auto relative z-10">

//         {/* Header */}
//         <div className="text-center mb-16 space-y-4">
//           <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
//             AI Programming Assistant
//           </h2>

//           {!isSignedIn && (
//             <div className="mt-4">
//               <Link
//                 to="/sign-in"
//                 className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 text-sm uppercase font-bold"
//               >
//                 Sign In To Chat
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Chat Container */}
//         <div className="max-w-5xl mx-auto bg-[#080808] border border-white/10">

//           {/* Messages */}
//           <div className="p-8 space-y-8 max-h-[600px] overflow-y-auto custom-scrollbar">

//             {messages.map((msg, index) => (
//               <div key={index} className={`${msg.role === 'user' ? 'text-right' : ''}`}>

//                 <div className={`inline-block p-4 text-sm ${
//                   msg.role === 'user'
//                     ? 'bg-purple-600 text-white'
//                     : 'bg-purple-600/5 border border-purple-500/20 text-white/80'
//                 }`}>
//                   {msg.role === 'assistant'
//                     ? <MarkdownRenderer content={msg.content} />
//                     : msg.content
//                   }
//                 </div>

//                 <div className="text-[10px] text-white/20 mt-1">
//                   {msg.time}
//                 </div>

//               </div>
//             ))}

//             {loading && (
//               <div className="text-purple-400 animate-pulse text-sm">
//                 thinking...
//               </div>
//             )}

//           </div>

//           {/* Input */}
//           <div className="p-6 border-t border-white/10">

//             <div className="flex gap-4">

//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 disabled={!isSignedIn}
//                 placeholder={
//                   isSignedIn
//                     ? "Ask programming question..."
//                     : "Sign in required to chat..."
//                 }
//                 className="flex-grow bg-[#0a0a0a] border border-white/10 p-4 outline-none disabled:opacity-40"
//               />

//               <button
//                 onClick={handleSendMessage}
//                 disabled={loading || !isSignedIn}
//                 className="bg-purple-600 px-6 disabled:opacity-40"
//               >
//                 Send
//               </button>

//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Chatbot


































// import React, { useState } from 'react'
// import { useAuth } from '@clerk/clerk-react'
// import { Link } from 'react-router-dom'
// import { chatbotResponse } from '@/lib/gemini'
// import MarkdownRenderer from '@/components/MarkdownRenderer'
// import Lightning from '@/components/Lightning'

// interface Message {
//   role: 'user' | 'assistant'
//   content: string
//   time: string
// }

// const Chatbot: React.FC = () => {

//   const { isSignedIn } = useAuth()

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: 'assistant',
//       content:
//         "Hello! 👋 I'm your AI programming assistant. Sign in to start asking coding questions.",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//   ])

//   const [input, setInput] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSendMessage = async () => {
//     if (!input.trim()) return

//     if (!isSignedIn) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: "🔒 Please sign in to use the AI assistant.",
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         }
//       ])
//       return
//     }

//     const userMessage: Message = {
//       role: 'user',
//       content: input.trim(),
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }

//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setLoading(true)

//     try {
//       const aiReply = await chatbotResponse(input)

//       const botMessage: Message = {
//         role: 'assistant',
//         content: aiReply,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }

//       setMessages((prev) => [...prev, botMessage])

//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           content: '⚠️ Something went wrong. Please try again.',
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         }
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       handleSendMessage()
//     }
//   }

//   return (
//     <section className="relative min-h-screen bg-black text-white overflow-hidden">

//       {/* ⚡ Lightning Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

//         <div className="absolute inset-0">
//           <Lightning
//             hue={266}
//             xOffset={-0.1}
//             speed={1.2}
//             intensity={1}
//             size={1}
//           />
//         </div>

//         {/* Glow */}
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
//       </div>

//       {/* ⭐ Content */}
//       <div className="relative z-10 py-32 px-6 lg:px-24">

//         <div className="max-w-7xl mx-auto">

//           {/* Header */}
//           <div className="text-center mb-16 space-y-4">
//             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
//               AI Programming Assistant
//             </h2>

//             {!isSignedIn && (
//               <div className="mt-4">
//                 <Link
//                   to="/sign-in"
//                   className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 text-sm uppercase font-bold"
//                 >
//                   Sign In To Chat
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Chat Box */}
//           <div className="max-w-5xl mx-auto bg-[#080808]/80 backdrop-blur border border-white/10">

//             {/* Messages */}
//             <div className="p-8 space-y-8 max-h-[600px] overflow-y-auto custom-scrollbar">

//               {messages.map((msg, index) => (
//                 <div key={index} className={`${msg.role === 'user' ? 'text-right' : ''}`}>

//                   <div className={`inline-block p-4 text-sm ${
//                     msg.role === 'user'
//                       ? 'bg-purple-600 text-white'
//                       : 'bg-purple-600/5 border border-purple-500/20 text-white/80'
//                   }`}>
//                     {msg.role === 'assistant'
//                       ? <MarkdownRenderer content={msg.content} />
//                       : msg.content
//                     }
//                   </div>

//                   <div className="text-[10px] text-white/20 mt-1">
//                     {msg.time}
//                   </div>

//                 </div>
//               ))}

//               {loading && (
//                 <div className="text-purple-400 animate-pulse text-sm">
//                   thinking...
//                 </div>
//               )}

//             </div>

//             {/* Input */}
//             <div className="p-6 border-t border-white/10">

//               <div className="flex gap-4">

//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                   disabled={!isSignedIn}
//                   placeholder={
//                     isSignedIn
//                       ? "Ask programming question..."
//                       : "Sign in required to chat..."
//                   }
//                   className="flex-grow bg-[#0a0a0a] border border-white/10 p-4 outline-none disabled:opacity-40"
//                 />

//                 <button
//                   onClick={handleSendMessage}
//                   disabled={loading || !isSignedIn}
//                   className="bg-purple-600 px-6 disabled:opacity-40"
//                 >
//                   Send
//                 </button>

//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default Chatbot




































import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { chatbotResponse } from '@/lib/gemini'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Lightning from '@/components/Lightning'

interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

const Chatbot: React.FC = () => {

  const { isSignedIn } = useAuth()
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! 👋 I'm your AI programming assistant. Sign in to start asking coding questions.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    if (!isSignedIn) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "🔒 Please sign in to use the AI assistant.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      return
    }

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const aiReply = await chatbotResponse(input)

      const botMessage: Message = {
        role: 'assistant',
        content: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages((prev) => [...prev, botMessage])

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Something went wrong. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <section className="relative h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Lightning hue={266} xOffset={-0.1} speed={1.2} intensity={1} size={1} />
      </div>

      {/* Main Chat Layout */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <div className="px-4 md:px-8 py-4 border-b border-white/10 backdrop-blur bg-black/50">
          <h2 className="text-lg md:text-2xl font-bold text-center">
            AI Programming Assistant
          </h2>

          {!isSignedIn && (
            <div className="text-center mt-2">
              <Link
                to="/sign-in"
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1 text-xs uppercase font-bold rounded"
              >
                Sign In To Chat
              </Link>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[60%] p-3 md:p-4 text-sm rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-[#111] border border-purple-500/20 text-white/80 rounded-bl-none'
                }`}
              >
                {msg.role === 'assistant'
                  ? <MarkdownRenderer content={msg.content} />
                  : msg.content
                }

                <div className="text-[10px] text-white/30 mt-2 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-purple-400 animate-pulse text-sm">
              Thinking...
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Sticky Input */}
        <div className="p-3 md:p-4 border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="flex gap-2">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={!isSignedIn}
              placeholder={
                isSignedIn
                  ? "Ask programming question..."
                  : "Sign in required..."
              }
              className="flex-1 bg-[#0f0f0f] border border-white/10 p-3 rounded-lg outline-none text-sm disabled:opacity-40"
            />

            <button
              onClick={handleSendMessage}
              disabled={loading || !isSignedIn}
              className="bg-purple-600 px-4 md:px-6 rounded-lg disabled:opacity-40 text-sm font-semibold"
            >
              Send
            </button>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Chatbot