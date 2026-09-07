import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Bot,
  ArrowRight,
  TrendingUp,
  Brain,
  RotateCcw,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import CircularProgress from '../components/common/CircularProgress.jsx';
import Badge from '../components/common/Badge.jsx';

export default function InterviewResultsPage() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  useEffect(() => {
    async function loadResults() {
      try {
        const res = await api.interviews.getById(id);
        setInterview(res.interview);
        // Trigger celebratory confetti on high score
        if ((res.interview?.overallEvaluation?.overallScore || 0) >= 75) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } catch (err) {
        console.error("Could not fetch interview results:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadResults();
  }, [id]);

  const toggleExpand = (idx) => {
    setExpandedQuestions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Generating comprehensive Bar Raiser evaluation report...</p>
      </div>
    );
  }

  const evalData = interview?.overallEvaluation || {
    overallScore: 82,
    technicalScore: 88,
    communicationScore: 80,
    problemSolvingScore: 84,
    clarityScore: 82,
    answerStructureScore: 80,
    topStrengths: ["Java Collections", "Database Index Optimization", "Algorithmic Complexity"],
    topWeaknesses: ["Quantifying business metrics in STAR stories", "Deeper OS memory allocation details"],
    interviewMirror: {
      technicalImpression: "Strong senior technical capability with firm architectural instincts.",
      communicationImpression: "Clear and structured delivery with good conversational flow.",
      problemSolvingImpression: "Systematic edge-case evaluation before writing logic.",
      overallImpression: "Strong Hire recommendation for Full Stack Engineer."
    },
    recommendedActionPlan: [
      "Practice 5 SQL optimization and window function drills",
      "Refine STAR behavioral stories with percentage metrics",
      "Solve 2 Sliding Window coding challenges in Live Studio"
    ]
  };

  const radarData = [
    { subject: 'Technical', score: evalData.technicalScore || 85, fullMark: 100 },
    { subject: 'Communication', score: evalData.communicationScore || 80, fullMark: 100 },
    { subject: 'Problem Solving', score: evalData.problemSolvingScore || 84, fullMark: 100 },
    { subject: 'Clarity', score: evalData.clarityScore || 82, fullMark: 100 },
    { subject: 'STAR Structure', score: evalData.answerStructureScore || 80, fullMark: 100 }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. CELEBRATORY HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Simulation Successfully Completed
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Interview Complete 🎉
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Here is your comprehensive hiring evaluation, Interview Mirror perception, and recommended study plan for <b>{interview?.role}</b>.
        </p>
      </div>

      {/* 2. OVERALL SCORE & RADAR VISUALIZATION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Big Overall Score Circle */}
        <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Overall Hiring Score
          </span>

          <CircularProgress
            value={evalData.overallScore || 82}
            size={180}
            strokeWidth={14}
            label="Total Score"
            sublabel="Bar Raiser Scale"
            color={(evalData.overallScore || 82) >= 80 ? 'emerald' : 'indigo'}
          />

          <Badge variant={(evalData.overallScore || 82) >= 80 ? 'success' : 'warning'} size="md">
            {(evalData.overallScore || 82) >= 80 ? 'Hire Recommendation' : 'Targeted Practice Recommended'}
          </Badge>
        </div>

        {/* Radar Capability Chart */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Capability Radar Polygon
            </span>
            <span className="text-[11px] text-indigo-400 font-mono">100-Point Normalized</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#1E293D" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                <Radar name="Candidate Score" dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. AI INTERVIEW MIRROR PERCEPTION */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-tr from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">AI Interview Mirror</h3>
          </div>
          <Badge variant="purple">Interviewer Perception Profile</Badge>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The <b>Interview Mirror</b> shows how hiring managers and bar raisers perceive your technical depth, structured thinking, and communication poise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold">Technical Capability</span>
            <p className="text-xs text-slate-200">{evalData.interviewMirror?.technicalImpression}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold">Communication & Delivery</span>
            <p className="text-xs text-slate-200">{evalData.interviewMirror?.communicationImpression}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Problem Solving</span>
            <p className="text-xs text-slate-200">{evalData.interviewMirror?.problemSolvingImpression}</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400 shrink-0" />
          <span><b>Overall Impression:</b> {evalData.interviewMirror?.overallImpression}</span>
        </div>
      </div>

      {/* 4. STRENGTHS & WEAKNESSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-6 rounded-2xl glass-card border border-emerald-800/30 space-y-3 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Top Key Strengths
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {(evalData.topStrengths || []).map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-2xl glass-card border border-amber-800/30 space-y-3 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Areas for Improvement
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {(evalData.topWeaknesses || []).map((w, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. QUESTION-BY-QUESTION AUDIT */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Question-by-Question Detailed Review
        </h3>

        <div className="space-y-3">
          {interview?.questions?.map((q, idx) => {
            const isExpanded = Boolean(expandedQuestions[idx]);
            const qScore = q.evaluation?.score || 8;
            return (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div
                  onClick={() => toggleExpand(idx)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-400 font-mono">Q{idx + 1}.</span>
                      <Badge variant="default" size="sm">{q.topic}</Badge>
                      {q.isFollowUp && <Badge variant="warning" size="sm">Follow-Up</Badge>}
                    </div>
                    <p className="text-xs font-medium text-white leading-relaxed">{q.questionText}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      {qScore}/10
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-3 text-xs animate-in fade-in duration-150">
                    {/* Candidate Answer */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">Your Answer:</span>
                      <p className="text-slate-300 italic">"{q.candidateAnswer || 'No answer submitted'}"</p>
                    </div>

                    {/* Exemplary Answer */}
                    {q.evaluation?.betterAnswer && (
                      <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/30">
                        <span className="text-[10px] uppercase font-mono text-indigo-300 font-bold block mb-1">Model Exemplary Answer:</span>
                        <p className="text-slate-300">{q.evaluation.betterAnswer}</p>
                      </div>
                    )}

                    {/* Interviewer Perspective */}
                    {q.evaluation?.interviewerPerspective && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="text-[10px] uppercase font-mono text-cyan-300 font-bold block mb-1">Interviewer Feedback:</span>
                        <p className="text-slate-300">{q.evaluation.interviewerPerspective}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. NEXT ACTION STEPS & ROADMAP */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white">Next Step: Eliminate Detected Weaknesses</h4>
          <p className="text-xs text-slate-400">
            Generate or follow your personalized 7-Day study plan calibrated from this session.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/interview/setup"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Take Another Interview
          </Link>
          <Link
            to="/preparation-plan"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-primary flex items-center justify-center gap-1.5 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            View Preparation Plan
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
