import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#02040A] border-t border-white/[0.08] pt-14 pb-10 mt-24 relative overflow-hidden">
      {/* Subtle bottom horizon glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <div className="w-full h-full bg-[#030712] rounded-[7px] flex items-center justify-center">
                  <span className="text-sky-400 font-bold text-xs">✦</span>
                </div>
              </div>
              <span className="font-semibold text-base text-white tracking-wider">AI COACH</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              State-of-the-Art Adaptive AI Interview Coach & Career Preparation Platform. Designed to transform complex technical rounds into clear, effortless readiness.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300">
              <span className="text-sky-400 text-xs">✦</span>
              <span>Adaptive AI Engine</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Core Modules</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/interview/setup" className="hover:text-white transition-colors">Adaptive Mock Interview</Link></li>
              <li><Link to="/resume" className="hover:text-white transition-colors">Resume Project Analyzer</Link></li>
              <li><Link to="/coding" className="hover:text-white transition-colors">Live Coding Studio</Link></li>
              <li><Link to="/practice" className="hover:text-white transition-colors">Topic Drills & Practice</Link></li>
            </ul>
          </div>

          {/* Practice & Resources */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Preparation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/questions" className="hover:text-white transition-colors">Curated Question Bank</Link></li>
              <li><Link to="/progress" className="hover:text-white transition-colors">Performance Analytics</Link></li>
              <li><Link to="/settings" className="hover:text-white transition-colors">AI Engine Settings</Link></li>
            </ul>
          </div>

          {/* Technology & Demonstration */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Architecture</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Production full-stack engine powered by Google Gemini AI, realtime audio synthesis, and algorithmic problem sandboxes.
            </p>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-slate-300 backdrop-blur-md">
              <span className="text-sky-400 font-semibold">● Free Demo Mode:</span> Full access pre-loaded with mock profiles, interview rounds, and readiness scoring.
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AI Interview Coach. Built with Lumine UI & Adaptive Engineering.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">STAR Evaluation</span>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400">Zero Configuration Setup</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
