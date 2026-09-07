import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">AI Interview Coach</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              State-of-the-art AI mock interview platform with adaptive difficulty, STAR framework scoring, resume deep dives, 50 coding challenges, and customized preparation plans.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Powered by Advanced Generative AI</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Core Modules</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/interview/setup" className="hover:text-indigo-400 transition-colors">Adaptive Mock Interview</Link></li>
              <li><Link to="/resume" className="hover:text-indigo-400 transition-colors">Resume Project Analyzer</Link></li>
              <li><Link to="/job-description" className="hover:text-indigo-400 transition-colors">Job Description Matcher</Link></li>
              <li><Link to="/coding" className="hover:text-indigo-400 transition-colors">Live Coding Studio</Link></li>
              <li><Link to="/practice" className="hover:text-indigo-400 transition-colors">Topic Drills & Practice</Link></li>
            </ul>
          </div>

          {/* Practice & Resources */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Preparation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/questions" className="hover:text-indigo-400 transition-colors">Curated Question Bank</Link></li>
              <li><Link to="/preparation-plan" className="hover:text-indigo-400 transition-colors">7-Day Study Roadmap</Link></li>
              <li><Link to="/progress" className="hover:text-indigo-400 transition-colors">Performance Analytics</Link></li>
              <li><Link to="/settings" className="hover:text-indigo-400 transition-colors">AI Engine Settings</Link></li>
            </ul>
          </div>

          {/* Technology & Demonstration */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">Demonstration</h4>
            <p className="text-xs text-slate-400 mb-3">
              Production-style full stack application built with React, Node.js, and Google Gemini AI.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="text-emerald-400 font-semibold">● Live Demo Mode Active:</span> Pre-loaded with Alex Sharma's full-stack profile, interviews, and weakness analytics.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AI Interview Coach. Built for Senior Engineering & Bar Raiser Interview Success.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">STAR Evaluation Framework</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Zero Hardcoded Keys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
