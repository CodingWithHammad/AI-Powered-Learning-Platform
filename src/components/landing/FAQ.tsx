
import React, { useState } from 'react';

const faqs = [
  {
    question: "How are the quiz questions generated?",
    answer: "Our engine uses large language models specifically fine-tuned on programming documentation and best practices to ensure technical accuracy and relevance."
  },
  {
    question: "Can I retake quizzes?",
    answer: "Yes, you can retake quizzes as many times as you like. Our AI will generate a different set of questions each time to prevent memorization."
  },
  {
    question: "What programming languages are supported?",
    answer: "We currently support Python, JavaScript, TypeScript, Java, C++, Go, Rust, Swift, Kotlin, and PHP."
  },
  {
    question: "How are learning roadmaps created?",
    answer: "Roadmaps are generated based on your current skill level assessment and your desired career goal (e.g., Frontend Dev, Data Scientist, System Engineer)."
  },
  {
    question: "Is the platform free to use?",
    answer: "We offer a generous free tier for individual learners, with premium features available for power users and enterprise teams."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-500 font-light italic">Got questions? We have answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-white/10 overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'bg-zinc-900/40' : 'bg-transparent hover:bg-zinc-950'}`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className={`text-sm md:text-base font-medium uppercase tracking-widest transition-colors ${activeIndex === idx ? 'text-purple-400' : 'text-zinc-300'}`}>
                  {faq.question}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${activeIndex === idx ? 'rotate-45 text-purple-500' : 'text-zinc-600'}`}>
                  +
                </span>
              </button>
              
              <div className={`px-8 transition-all duration-300 ease-in-out ${activeIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <p className="text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
