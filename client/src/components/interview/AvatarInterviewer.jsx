import React from 'react';
import { Bot, Brain, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AvatarInterviewer({
  state = 'idle', // 'idle' | 'thinking' | 'evaluated'
  personality = 'Professional',
  difficulty = 2
}) {
  const stateConfig = {
    idle: {
      label: 'Interviewer Ready',
      color: 'bg-white/[0.05] text-slate-300 border-white/10',
      icon: Bot,
      ring: 'border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.35)]'
    },
    thinking: {
      label: 'AI Evaluating Answer...',
      color: 'bg-sky-500/15 text-sky-200 border-sky-400/30 animate-pulse',
      icon: Brain,
      ring: 'border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.5)] animate-spin'
    },
    evaluated: {
      label: 'Evaluation Ready',
      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      icon: CheckCircle2,
      ring: 'border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
    }
  };

  const curr = stateConfig[state] || stateConfig.idle;
  const Icon = curr.icon;

  const difficultyNames = { 1: 'Foundations (L1)', 2: 'Standard (L2)', 3: 'Bar Raiser (L3)' };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] backdrop-blur-2xl relative overflow-hidden shadow-2xl">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Avatar Container with Animated Rings */}
      <div className="relative my-4">
        {/* Outer Glow Ring */}
        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${curr.ring} bg-[#030712]/90`}>
          {/* Inner Avatar Graphic */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-[2px] shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#030712] flex flex-col items-center justify-center relative">
              <Bot className="w-9 h-9 sm:w-11 sm:h-11 text-sky-300" />
            </div>
          </div>
        </div>

        {/* Floating status icon indicator */}
        <div className="absolute bottom-0 right-1 p-1.5 rounded-full bg-[#070c1e] border border-white/10 text-sky-400 shadow-lg">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Status Badge */}
      <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 mb-3 backdrop-blur-md ${curr.color}`}>
        <span className="w-2 h-2 rounded-full bg-current animate-ping" />
        {curr.label}
      </div>

      {/* Personality & Adaptive Difficulty */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        <span className="px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 font-medium">
          {personality} Persona
        </span>
        <span className="text-slate-600">•</span>
        <span className="px-3 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 font-mono font-medium">
          {difficultyNames[difficulty] || 'Adaptive Level 2'}
        </span>
      </div>
    </div>
  );
}
