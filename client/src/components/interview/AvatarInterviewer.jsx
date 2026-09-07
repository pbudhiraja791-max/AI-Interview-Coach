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
      color: 'bg-slate-800 text-slate-300 border-slate-700',
      icon: Bot,
      ring: 'border-indigo-500/40 shadow-glow-primary'
    },
    thinking: {
      label: 'AI Evaluating Answer...',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse',
      icon: Brain,
      ring: 'border-purple-500 shadow-glow-primary animate-spin'
    },
    evaluated: {
      label: 'Evaluation Ready',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: CheckCircle2,
      ring: 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
    }
  };

  const curr = stateConfig[state] || stateConfig.idle;
  const Icon = curr.icon;

  const difficultyNames = { 1: 'Foundations (L1)', 2: 'Standard (L2)', 3: 'Bar Raiser (L3)' };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md relative overflow-hidden shadow-xl">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Avatar Container with Animated Rings */}
      <div className="relative my-4">
        {/* Outer Glow Ring */}
        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${curr.ring} bg-slate-950/80`}>
          {/* Inner Avatar Graphic */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-[2px] shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center relative">
              <Bot className="w-9 h-9 sm:w-11 sm:h-11 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Floating status icon indicator */}
        <div className="absolute bottom-0 right-1 p-1.5 rounded-full bg-slate-900 border border-slate-700 text-indigo-400 shadow-lg">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Status Badge */}
      <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 mb-3 ${curr.color}`}>
        <span className="w-2 h-2 rounded-full bg-current animate-ping" />
        {curr.label}
      </div>

      {/* Personality & Adaptive Difficulty */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        <span className="px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 font-medium">
          {personality} Persona
        </span>
        <span className="text-slate-600">•</span>
        <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-mono font-medium">
          {difficultyNames[difficulty] || 'Adaptive Level 2'}
        </span>
      </div>
    </div>
  );
}
