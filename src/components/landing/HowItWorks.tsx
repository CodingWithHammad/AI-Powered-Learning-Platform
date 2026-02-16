
import React from 'react';

const steps = [
  {
    title: "Choose Your Language",
    description: "Select from 10 popular programming languages. From Python to Rust, we support the technologies that drive the industry.",
    number: "01",
    tag: "CURRICULUM"
  },
  {
    title: "Take AI-Generated Quiz",
    description: "Our AI analyzes your skill level and generates 10 unique questions specifically designed to challenge your current knowledge.",
    number: "02",
    tag: "CHALLENGE"
  },
  {
    title: "Review & Learn",
    description: "Get detailed explanations for every answer. Our platform provides context-aware feedback to ensure you never make the same mistake twice.",
    number: "03",
    tag: "ANALYSIS"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 px-6 bg-zinc-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">How It Works</h2>
            <p className="text-zinc-500 text-lg font-light">A streamlined process to accelerate your learning curve.</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 bg-white/10 mx-12 mb-6"></div>
          <div className="text-[10px] font-bold tracking-[0.4em] text-purple-500 uppercase">Step by step logic</div>
        </div>

        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group overflow-hidden border border-white/5 bg-black hover:border-purple-500/20 transition-all p-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="relative z-10 flex-shrink-0">
                <span className="text-9xl font-black text-white/5 group-hover:text-purple-500/5 transition-colors leading-none tracking-tighter">
                  {step.number}
                </span>
              </div>
              
              <div className="flex-1 z-10">
                <span className="inline-block text-[10px] font-bold tracking-widest text-purple-500 mb-4 border border-purple-500/20 px-3 py-1 uppercase">
                  {step.tag}
                </span>
                <h3 className="text-3xl font-bold tracking-tight mb-4">{step.title}</h3>
                <p className="text-zinc-400 max-w-2xl text-lg font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="hidden md:block relative z-10">
                 <img 
                    src={`https://picsum.photos/seed/step-${idx}/400/250`} 
                    alt={step.title}
                    className="w-64 h-40 object-cover opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10"
                 />
              </div>

              {/* Decorative side accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
