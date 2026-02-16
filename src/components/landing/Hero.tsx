
import React, { useEffect, useState, useMemo } from 'react';

const Hero: React.FC = () => {
  const [logs, setLogs] = useState([
    { time: '10:42:02', msg: 'Connecting to cluster: us-east-1', type: 'info' },
    { time: '10:42:03', msg: 'WARN: Latency spike detected (42ms)', type: 'warn' },
    { time: '10:42:03', msg: 'Auto-scaling engaged', type: 'info' },
    { time: '10:42:04', msg: 'New node provisioned: node-884', type: 'info' },
    { time: '10:42:05', msg: 'Syncing database shards...', type: 'info' },
  ]);

  // Generate random light streaks
  const streaks = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev.slice(1), { 
          time: new Date().toLocaleTimeString('en-GB', { hour12: false }), 
          msg: `Agent deployed successfully: ${Math.random().toString(36).substring(7)}`, 
          type: 'info' 
        }];
        return newLogs;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 lg:px-20 overflow-hidden pt-20">
      {/* Sidebar Navigation Clone */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className={`w-8 h-8 border flex items-center justify-center text-[10px] mono transition-colors cursor-pointer ${num === 1 ? 'border-purple-500 text-purple-500' : 'border-white/10 text-white/30 hover:border-white/30'}`}>
            0{num}
          </div>
        ))}
      </div>

      {/* Background Visual: Advanced Purple Portal effect */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Light Streaks */}
        {streaks.map((s, i) => (
          <div 
            key={i} 
            className="light-streak" 
            style={{ 
              left: s.left, 
              animationDelay: s.delay, 
              animationDuration: s.duration,
              opacity: s.opacity 
            }} 
          />
        ))}

        {/* The Portal Core */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center">
          {/* Main Glow */}
          <div className="w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] opacity-40 animate-[portal-pulse_10s_ease-in-out_infinite]"></div>
          
          {/* Concentric Animated Rings */}
          <div className="absolute w-[300px] h-[300px] portal-ring border-purple-500/20 animate-[ring-rotate_20s_linear_infinite]"></div>
          <div className="absolute w-[500px] h-[500px] portal-ring border-purple-500/10 animate-[ring-rotate_30s_linear_infinite_reverse]"></div>
          <div className="absolute w-[700px] h-[700px] portal-ring border-purple-500/5 animate-[ring-rotate_40s_linear_infinite]"></div>
          
          {/* The Central Light Distortion (Black Hole effect) */}
          <div className="absolute bottom-0 w-[600px] h-[400px] bg-gradient-to-t from-purple-600/20 via-transparent to-transparent blur-[60px] rounded-full"></div>
          
          {/* Central Pillar of Light */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[100vh] bg-gradient-to-t from-purple-500 via-purple-500/20 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
          
          {/* Horizontal Flare */}
          <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-[2px]"></div>
        </div>

        {/* Global Bottom Gradient Fade */}
        <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              CORE ENGINE: <span className="text-purple-400">ACTIVE</span> // PLATFORM ONLINE
            </span>
          </div>

          <div className="space-y-0">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] text-white uppercase">
              LEARNAI<br />
              <span className="text-white/20">COHORT</span>
            </h1>
          </div>

          <div className="max-w-md border-l-2 border-purple-500/50 pl-6 py-2">
            <p className="mono text-sm text-white/50 leading-relaxed italic">
              Operate distributed learning systems through a unified control layer built for 
              scalability, reliability, and real-time skill automation.
            </p>
          </div>

          <ul className="space-y-3 mono text-[10px] uppercase tracking-widest text-white/80">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-purple-500"></span>
              PERSONALIZED LEARNING AGENTS
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-purple-500"></span>
              AUTONOMOUS ROADMAP ORCHESTRATION
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-purple-500"></span>
              SUB-10MS FEEDBACK EXECUTION
            </li>
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-purple-600 hover:bg-purple-500 text-black px-8 py-4 mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all group">
              INITIALIZE BUILD
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="border border-white/20 hover:border-white/40 px-8 py-4 mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all">
              VIEW DOCUMENTATION
              <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>

          <div className="pt-8 flex gap-8 border-t border-white/5">
            <span className="mono text-[8px] text-white/30 uppercase tracking-[0.2em]">PRODUCTION READY</span>
            <span className="mono text-[8px] text-white/30 uppercase tracking-[0.2em]">INSTANT ENVIORNMENT PROVISIONING</span>
          </div>
        </div>

        {/* Right Content: Terminal Interface Clone */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="bg-[#050505] border border-white/10 p-1 relative scanline overflow-hidden">
            <div className="border border-white/5 p-6 space-y-6">
              
              {/* Terminal Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="mono text-[9px] text-white/40 uppercase tracking-widest font-bold">AXION CONTROL INTERFACE</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  <span className="mono text-[9px] text-purple-400 font-bold">ONLINE</span>
                </div>
              </div>

              {/* Grid with Radar and Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <span className="block mono text-[8px] text-white/30 uppercase mb-1">THROUGHPUT</span>
                    <span className="block text-2xl font-bold tracking-tight">842.5 GB/s</span>
                  </div>
                  <div>
                    <span className="block mono text-[8px] text-white/30 uppercase mb-1">ACTIVE NODES</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold tracking-tight">1,204</span>
                      <span className="mono text-[10px] text-purple-400">+12</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  {/* Radar Visual */}
                  <div className="w-24 h-24 rounded-full border border-white/10 relative flex items-center justify-center">
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-50"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                    <div className="absolute w-[2px] h-[50%] bg-gradient-to-t from-purple-500/50 to-transparent bottom-1/2 origin-bottom animate-[spin_4s_linear_infinite]"></div>
                  </div>
                </div>
              </div>

              {/* Log Window */}
              <div className="space-y-2 mono text-[9px] h-32 overflow-hidden border-t border-white/5 pt-4">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-white/20">{log.time}</span>
                    <span className={log.type === 'warn' ? 'text-purple-400' : 'text-white/60'}>
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between mono text-[8px] text-white/40 mb-2">
                  <span>PIPELINE</span>
                  <div className="flex gap-0.5">
                    <span className="w-1 h-2 bg-purple-500"></span>
                    <span className="w-1 h-2 bg-purple-500"></span>
                    <span className="w-1 h-2 bg-purple-500/30"></span>
                  </div>
                </div>
                <div className="h-1 bg-white/5 w-full relative">
                  <div className="absolute inset-y-0 left-0 bg-purple-500/50 w-[70%]"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Decorative corners */}
      <div className="absolute left-4 bottom-4 w-6 h-6 border-l border-b border-white/20"></div>
      <div className="absolute right-4 top-4 w-6 h-6 border-r border-t border-white/20"></div>
      <div className="absolute left-6 bottom-16 -rotate-90 mono text-[8px] text-white/20 uppercase tracking-[0.4em]">NAV_MODULE_V4</div>
    </section>
  );
};

export default Hero;
