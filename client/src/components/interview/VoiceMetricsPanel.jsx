import React from 'react';
import { Gauge, CheckCircle2, FileText, Sparkles, BookOpen, Clock } from 'lucide-react';

export default function AnswerQualityPanel({
  answer = '',
  interviewType = 'Technical',
  expectedConcepts = []
}) {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const chars = answer.length;
  const readTimeSeconds = Math.ceil((words / 150) * 60);

  const getWordCountStatus = (w) => {
    if (w === 0) return { label: 'Awaiting Answer...', color: 'text-slate-400', badge: 'bg-white/[0.05] border-white/10' };
    if (w < 20) return { label: 'Brief / Introductory', color: 'text-amber-300', badge: 'bg-amber-500/10 text-amber-300 border-amber-400/25' };
    if (w < 60) return { label: 'Good Core Outline', color: 'text-sky-300', badge: 'bg-sky-500/10 text-sky-300 border-sky-400/25' };
    return { label: 'Comprehensive & Detailed', color: 'text-emerald-300', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/25' };
  };

  const wordStatus = getWordCountStatus(words);

  return (
    <div className="rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] backdrop-blur-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-white">Answer Quality & Depth Live Indicators</span>
        </div>
        <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-400/20">
          {interviewType} Mode
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Word Count */}
        <div className="p-3 rounded-2xl bg-[#030712] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Words</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${wordStatus.badge}`}>
              {words}
            </span>
          </div>
          <p className={`text-[11px] font-medium ${wordStatus.color} truncate`}>{wordStatus.label}</p>
        </div>

        {/* Character Count */}
        <div className="p-3 rounded-2xl bg-[#030712] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Characters</span>
            <FileText className="w-3 h-3 text-slate-500" />
          </div>
          <p className="text-xs font-mono font-semibold text-white">
            {chars} chars
          </p>
        </div>

        {/* Estimated Reading Time */}
        <div className="p-3 rounded-2xl bg-[#030712] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Read Time</span>
            <Clock className="w-3 h-3 text-slate-500" />
          </div>
          <p className="text-xs font-mono font-semibold text-sky-300">
            ~{readTimeSeconds}s
          </p>
        </div>

        {/* Structure Guide */}
        <div className="p-3 rounded-2xl bg-[#030712] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Framework</span>
            <Sparkles className="w-3 h-3 text-sky-400" />
          </div>
          <p className="text-[11px] font-medium text-sky-300 truncate">
            {interviewType === 'Behavioral' || interviewType === 'HR' ? 'STAR Method' : 'Architecture & Trade-offs'}
          </p>
        </div>
      </div>

      {/* Answer Tip based on type */}
      <div className="p-3 rounded-2xl bg-[#030712]/60 border border-white/[0.06] text-[11px] text-slate-400 leading-relaxed">
        {interviewType === 'Behavioral' || interviewType === 'HR' ? (
          <span>💡 <b className="text-white">Pro-Tip (STAR):</b> Structure your response: <b>Situation</b> (context) → <b>Task</b> (challenge) → <b>Action</b> (your specific contributions) → <b>Result</b> (quantifiable impact).</span>
        ) : (
          <span>💡 <b className="text-white">Pro-Tip (Technical):</b> State the core solution, analyze algorithmic trade-offs (O(N)), and address edge cases (high concurrency, caching, failure modes).</span>
        )}
      </div>
    </div>
  );
}
