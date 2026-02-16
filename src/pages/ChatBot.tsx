
import React from 'react';

const Chatbot: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-24 bg-[#020202] relative overflow-hidden border-t border-white/5">
      {/* Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/[0.05] blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Chat Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/40 flex items-center justify-center glow-purple">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white">
            AI Programming Assistant
          </h2>
          <p className="mono text-[10px] uppercase text-white/30 tracking-[0.4em]">Ask me anything about programming!</p>
        </div>

        {/* Chat Window Mockup */}
        <div className="max-w-5xl mx-auto bg-[#080808] border border-white/10 rounded-sm overflow-hidden shadow-2xl relative">
          {/* Top Status Bar */}
          <div className="px-6 py-3 border-b border-white/5 bg-black/50 flex justify-between items-center mono text-[8px] text-white/20 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse"></span>
              Gemini Pro 3.0 Instance // Active
            </div>
            <div>Uptime: 142:04:12</div>
          </div>

          {/* Conversation Area */}
          <div className="p-8 space-y-12 max-h-[700px] overflow-y-auto custom-scrollbar">
            
            {/* AI Greeting */}
            <div className="flex gap-4 items-start max-w-[85%]">
              <div className="w-10 h-10 rounded-sm bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="p-5 bg-purple-600/5 border border-purple-500/20 text-white/80 leading-relaxed text-sm">
                  Hello! 👋 I'm your AI programming assistant. I can help you with coding questions, explain programming concepts, debug issues, and provide learning guidance. What would you like to know?
                </div>
                <div className="mono text-[9px] text-white/20">10:21 PM</div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4 items-start justify-end ml-auto max-w-[85%]">
              <div className="space-y-1 text-right">
                <div className="p-5 bg-purple-600 text-white font-bold leading-relaxed text-sm rounded-sm shadow-[0_0_25px_rgba(168,85,247,0.2)]">
                  provide me html boiler plate code
                </div>
                <div className="mono text-[9px] text-white/20">10:21 PM</div>
              </div>
              <div className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center flex-shrink-0 bg-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* AI Response Detailed */}
            <div className="flex gap-4 items-start max-w-[95%]">
              <div className="w-10 h-10 rounded-sm bg-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-4 w-full">
                <div className="p-6 bg-purple-600/5 border border-purple-500/20 text-white/80 leading-relaxed text-sm space-y-6">
                  <p>Ah, great question! When you're diving into web development with HTML, a "boilerplate" is essentially the minimum, basic structure you need to get any HTML page up and running correctly. Think of it as the foundation or the standard starting point for every web page you create.</p>
                  
                  <p>It includes essential elements that tell the browser how to interpret the page, handle character sets, and provide basic information about your site.</p>
                  
                  <p>Here's the standard HTML5 boilerplate code:</p>

                  <div className="bg-black border border-white/10 p-6 mono text-xs text-green-400 overflow-x-auto relative group">
                    <div className="absolute top-2 right-4 text-[9px] text-white/20 uppercase tracking-widest">HTML // COPY</div>
                    <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website</title>
</head>
<body>
    <!-- All the visible content of your webpage goes here -->
    <h1>Welcome to my website!</h1>
    <p>This is a paragraph of content.</p>
</body>
</html>`}</pre>
                  </div>

                  <p>Let's break down each part so you understand what's happening:</p>

                  <ul className="space-y-4 list-none pl-4 border-l border-purple-500/30">
                    <li>
                      <strong className="text-purple-400">1. &lt;!DOCTYPE html&gt;</strong>: This is the "document type declaration". It's not an HTML tag itself, but rather an instruction to the web browser about what version of HTML the page is written in.
                    </li>
                    <li>
                      <strong className="text-purple-400">2. &lt;html lang="en"&gt;</strong>: This is the "root element" of an HTML page. The "lang" attribute is highly recommended.
                    </li>
                    <li>
                      <strong className="text-purple-400">3. &lt;head&gt;</strong>: The head element contains "metadata" about the HTML document.
                    </li>
                    <li>
                      <strong className="text-purple-400">4. &lt;body&gt;</strong>: The body element contains all the visible content of the web page.
                    </li>
                  </ul>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <h4 className="font-black uppercase tracking-tight text-white">Why is this boilerplate so important?</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                       <li className="flex gap-2"><span className="text-purple-500">▶</span> Browser Compatibility</li>
                       <li className="flex gap-2"><span className="text-purple-500">▶</span> Accessibility</li>
                       <li className="flex gap-2"><span className="text-purple-500">▶</span> SEO Optimization</li>
                       <li className="flex gap-2"><span className="text-purple-500">▶</span> Responsiveness</li>
                    </ul>
                  </div>

                  <p>From here, you'd start adding your structural elements, content, styles (with CSS), and interactivity (with JavaScript) to build out your full web page! Happy coding!</p>
                </div>
                <div className="mono text-[9px] text-white/20">10:22 PM</div>
              </div>
            </div>

          </div>

          {/* Chat Input */}
          <div className="p-8 border-t border-white/10 bg-black relative">
            <div className="absolute top-0 left-0 w-8 h-px bg-purple-600"></div>
            
            <div className="flex gap-4">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder="Ask me about programming, debugging, concepts, or anything code related..."
                  className="w-full bg-[#0a0a0a] border border-white/10 p-5 pr-16 text-sm mono focus:border-purple-500/50 outline-none transition-all placeholder:text-white/10"
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                   <span className="mono text-[8px] text-white/20 uppercase">Core_Ready</span>
                </div>
              </div>
              <button className="w-16 h-[62px] bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 flex justify-between items-center mono text-[8px] text-white/10 uppercase tracking-widest">
              <span>Press Enter to send // Shift+Enter for new line</span>
              <span>Encrypted Transaction: TR-5420</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </section>
  );
};

export default Chatbot;
