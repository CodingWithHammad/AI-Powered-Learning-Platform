
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-black text-xl">{"<>"}</span>
            </div>
            <span className="text-xl font-bold tracking-tighter">LearnAI</span>
          </div>
          <p className="text-zinc-500 max-w-sm mb-8 font-light">
            Empowering the next generation of developers with artificial intelligence. 
            Join the cohort and master the logic of tomorrow.
          </p>
          <div className="flex gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center grayscale hover:grayscale-0 hover:border-purple-500 transition-all cursor-pointer">
                <img src={`https://picsum.photos/seed/social-${i}/40/40`} className="w-full h-full object-cover rounded-full" alt="social" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] mb-8">Platform</h4>
          <ul className="space-y-4 text-sm text-zinc-500 font-light">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Quizzes</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Workshops</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Podcast</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Mentors</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] mb-8">Subscribe to Updates</h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border border-white/10 px-4 py-3 text-sm focus:border-purple-500 outline-none transition-colors"
            />
            <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest py-4 hover:bg-purple-500 hover:text-black transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-zinc-600">Copyright © 2024 LearnAI. All rights reserved.</span>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
