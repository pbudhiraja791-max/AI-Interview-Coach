import React, { useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Badge from '../common/Badge.jsx';

export default function LiveFeedbackDrawer({
  evaluation,
  onNextQuestion,
  isLastQuestion = false,
  onFinish = null
}) {
  const [showMistakeDetail, setShowMistakeDetail] = useState(false);

  if (!evaluation) return null;

  const score = evaluation.score || 7;
  const isGood = score >= 7;

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
      {/* Header & Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              AI Answer Evaluation
            </span>
            <Badge variant={isGood ? 'success' : 'warning'} size="sm">
              {isGood ? 'Strong Answer' : 'Needs Optimization'}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">Real-Time Performance Analysis</h3>
        </div>

        {/* Score Pill */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase text-slate-400 font-mono">Answer Score</div>
            <div className="text-2xl font-mono font-extrabold text-white">
              {score}<span className="text-xs text-slate-500 font-normal">/10</span>
            </div>
          </div>
          <div className={`w-3 h-10 rounded-full ${isGood ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
        </div>
      </div>

      {/* Sub-Metrics Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400">Technical Depth</span>
          <p className="text-sm font-bold font-mono text-indigo-300">{evaluation.technicalKnowledge || 8}/10</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400">Clarity</span>
          <p className="text-sm font-bold font-mono text-cyan-300">{evaluation.clarity || 8}/10</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400">Relevance</span>
          <p className="text-sm font-bold font-mono text-purple-300">{evaluation.relevance || 9}/10</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-[10px] text-slate-400">Completeness</span>
          <p className="text-sm font-bold font-mono text-emerald-300">{evaluation.depth || 7}/10</p>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            What You Did Well
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.strengths && evaluation.strengths.length > 0 ? (
              evaluation.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li>Demonstrated clear communication and core understanding.</li>
            )}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            What Could Be Improved
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {evaluation.improvements && evaluation.improvements.length > 0 ? (
              evaluation.improvements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li>Elaborate on real-world edge cases and trade-offs.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Interviewer Perspective */}
      {evaluation.interviewerPerspective && (
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            Interviewer Perspective
          </span>
          <p className="text-xs text-slate-200 italic leading-relaxed">
            "{evaluation.interviewerPerspective}"
          </p>
        </div>
      )}

      {/* Exemplary / Better Model Answer */}
      {evaluation.betterAnswer && (
        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Exemplary Senior Candidate Answer
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {evaluation.betterAnswer}
          </p>
        </div>
      )}

      {/* STAR Analysis for Behavioral */}
      {evaluation.starAnalysis && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            STAR Framework Breakdown
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="p-2 rounded bg-slate-900"><b>Situation:</b> {evaluation.starAnalysis.situation}</div>
            <div className="p-2 rounded bg-slate-900"><b>Task:</b> {evaluation.starAnalysis.task}</div>
            <div className="p-2 rounded bg-slate-900"><b>Action:</b> {evaluation.starAnalysis.action}</div>
            <div className="p-2 rounded bg-slate-900"><b>Result:</b> {evaluation.starAnalysis.result}</div>
          </div>
        </div>
      )}

      {/* "Why was my answer bad?" / Deep Mistake Explorer Toggle */}
      {evaluation.mistakeExplanation && (
        <div className="border-t border-slate-800 pt-3">
          <button
            onClick={() => setShowMistakeDetail(!showMistakeDetail)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5 text-amber-400">
              <HelpCircle className="w-3.5 h-3.5" />
              Why was my answer imperfect? (Deep Mistake Explorer)
            </span>
            {showMistakeDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showMistakeDetail && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
              {evaluation.mistakeExplanation.missing?.length > 0 && (
                <div>
                  <span className="text-rose-400 font-semibold">Missing Elements:</span>
                  <p className="text-slate-300 mt-0.5">{evaluation.mistakeExplanation.missing.join(', ')}</p>
                </div>
              )}
              {evaluation.mistakeExplanation.whyItMatters && (
                <div>
                  <span className="text-indigo-300 font-semibold">Why this matters to a hiring panel:</span>
                  <p className="text-slate-300 mt-0.5">{evaluation.mistakeExplanation.whyItMatters}</p>
                </div>
              )}
              {evaluation.mistakeExplanation.howToImprove && (
                <div>
                  <span className="text-emerald-400 font-semibold">Concrete Action to Improve:</span>
                  <p className="text-slate-300 mt-0.5">{evaluation.mistakeExplanation.howToImprove}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Next Action Button */}
      <div className="pt-3 flex justify-end">
        {isLastQuestion ? (
          <button
            onClick={onFinish}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-glow-primary flex items-center justify-center gap-2 transition-all"
          >
            Finish Interview & View Report
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onNextQuestion}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-glow-primary flex items-center justify-center gap-2 transition-all"
          >
            {evaluation.suggestedFollowUp ? 'Proceed to Adaptive Follow-Up' : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
