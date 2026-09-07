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
    if (w === 0) return { label: 'Awaiting Answer...', color: 'text-slate-400', badge: 'bg-slate-800' };
    if (w < 20) return { label: 'Brief / Introductory', color: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' };
    if (w < 60) return { label: 'Good Core Outline', color: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' };
    return { label: 'Comprehensive & Detailed', color: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' };
  };

  const wordStatus = getWordCountStatus(words);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-3.5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-white">Answer Quality & Depth Live Indicators</span>
        </div>
        <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
          {interviewType} Mode
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Word Count */}
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Words</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono font-bold ${wordStatus.badge}`}>
              {words}
            </span>
          </div>
          <p className={`text-[11px] font-medium ${wordStatus.color} truncate`}>{wordStatus.label}</p>
        </div>

        {/* Character Count */}
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Characters</span>
            <FileText className="w-3 h-3 text-slate-500" />
          </div>
          <p className="text-xs font-mono font-semibold text-white">
            {chars} chars
          </p>
        </div>

        {/* Estimated Reading Time */}
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Read Time</span>
            <Clock className="w-3 h-3 text-slate-500" />
          </div>
          <p className="text-xs font-mono font-semibold text-cyan-300">
            ~{readTimeSeconds}s
          </p>
        </div>

        {/* Structure Guide */}
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-slate-400">Framework</span>
            <Sparkles className="w-3 h-3 text-purple-400" />
          </div>
          <p className="text-[11px] font-medium text-purple-300 truncate">
            {interviewType === 'Behavioral' || interviewType === 'HR' ? 'STAR Method' : 'Architecture & Trade-offs'}
          </p>
        </div>
      </div>

      {/* Answer Tip based on type */}
      <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-[11px] text-slate-400 leading-relaxed">
        {interviewType === 'Behavioral' || interviewType === 'HR' ? (
          <span>💡 <b>Pro-Tip (STAR):</b> Structure your response: <b>Situation</b> (context) → <b>Task</b> (challenge) → <b>Action</b> (your specific contributions) → <b>Result</b> (quantifiable impact).</span>
        ) : (
          <span>💡 <b>Pro-Tip (Technical):</b> State the core solution, analyze algorithmic trade-offs ($O(N)$), and address edge cases (high concurrency, caching, failure modes).</span>
        )}
      </div>
    </div>
  );
}
