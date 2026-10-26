import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useInterview } from '../context/InterviewContext.jsx';
import {
  Bot,
  Sparkles,
  Sliders,
  Clock,
  HelpCircle,
  MessageSquare,
  Zap,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function InterviewSetupPage() {
  const { user } = useAuth();
  const { startInterview, isAiThinking } = useInterview();
  const navigate = useNavigate();

  const [role, setRole] = useState(user?.targetRole || 'Full Stack Developer');
  const [interviewType, setInterviewType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Adaptive');
  const [personality, setPersonality] = useState('Professional');
  const [rigor, setRigor] = useState('Standard');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [totalQuestions, setTotalQuestions] = useState(5);

  const interviewTypes = [
    { id: 'Technical', title: 'Technical Round', desc: 'Core languages, data structures, databases, and system internals.' },
    { id: 'Behavioral', title: 'Behavioral (STAR)', desc: 'Conflict resolution, leadership, failure recovery & STAR evaluation.' },
    { id: 'HR', title: 'HR & Culture Fit', desc: 'Introductions, motivations, company alignment, and career aspirations.' },
    { id: 'Job-Specific', title: 'Job-Specific Simulation', desc: 'Questions customized to the responsibilities of your target job description.' },
    { id: 'Mixed', title: 'Mixed Comprehensive', desc: 'Balanced combination of technical depth and behavioral questions.' }
  ];

  const difficulties = [
    { id: 'Adaptive', title: 'Adaptive Engine (Recommended)', desc: 'Dynamically scales from Level 1 to 3 based on your answer depth.' },
    { id: 'Easy', title: 'Foundations (Easy)', desc: 'Standard definitions, core concepts, and basic use cases.' },
    { id: 'Medium', title: 'Standard (Medium)', desc: 'Industry-standard mid-level engineering interview bar.' },
    { id: 'Hard', title: 'Bar Raiser (Hard)', desc: 'High-concurrency edge cases, distributed scaling & internal memory trade-offs.' }
  ];

  const personalities = [
    { id: 'Professional', title: 'Professional & Objective', desc: 'Standard senior engineering hiring bar.' },
    { id: 'Friendly', title: 'Friendly & Supportive', desc: 'Encouraging tone with constructive scaffolding.' },
    { id: 'Technical Expert', title: 'Technical Specialist', desc: 'Focuses strictly on low-level system performance and architectural trade-offs.' },
    { id: 'Strict', title: 'Strict & Direct', desc: 'Concise, high-expectation evaluation with direct feedback.' },
    { id: 'Stress Interviewer', title: 'Stress & Pressure Mode', desc: 'Challenging follow-ups probing edge-case stability under pressure.' }
  ];

  const handleStart = async (e) => {
    e.preventDefault();
    const interview = await startInterview({
      role,
      interviewType,
      difficulty,
      personality,
      rigor,
      durationMinutes,
      totalQuestions
    });
    navigate(`/interview/${interview._id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative">
      {/* Background celestial ambient flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-1.5 border-b border-white/[0.08] pb-5 relative z-10">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Simulation Configurator</Badge>
          <span className="text-xs text-slate-400">Step 1 of 2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Configure Your Mock Interview
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Customize your interview type, interviewer persona, difficulty mode, question count, and duration.
        </p>
      </div>

      <form onSubmit={handleStart} className="space-y-8 relative z-10">
        {/* 1. Target Role */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-3 backdrop-blur-2xl shadow-xl">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-sky-400" />
            Target Engineering Role
          </label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Full Stack Developer, Backend Engineer, React Specialist"
            className="w-full p-3.5 rounded-2xl bg-[#030712] border border-white/10 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-sky-400/60 font-medium"
          />
        </div>

        {/* 2. Interview Type */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-4 backdrop-blur-2xl shadow-xl">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-sky-400" />
            Select Interview Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {interviewTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setInterviewType(t.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  interviewType === t.id
                    ? 'bg-sky-500/15 border-sky-400/40 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-[#030712] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{t.title}</span>
                    {interviewType === t.id && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Difficulty Mode */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-4 backdrop-blur-2xl shadow-xl">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            Difficulty Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {difficulties.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                  difficulty === d.id
                    ? 'bg-sky-500/15 border-sky-400/40 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-[#030712] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div>
                  <span className="font-semibold text-xs text-white">{d.title}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{d.desc}</p>
                </div>
                {difficulty === d.id && <Check className="w-4 h-4 text-sky-400 shrink-0 ml-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Interviewer Personality */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-4 backdrop-blur-2xl shadow-xl">
          <label className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Interviewer Personality
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {personalities.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPersonality(p.id)}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  personality === p.id
                    ? 'bg-sky-500/15 border-sky-400/40 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-[#030712] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{p.title}</span>
                    {personality === p.id && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{p.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Session Parameters (Duration, Questions, Rigor) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Duration */}
          <div className="p-5 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-2 backdrop-blur-2xl shadow-xl">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" /> Duration
            </label>
            <select
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60 font-medium"
            >
              <option value={10}>10 Minutes (Quick)</option>
              <option value={20}>20 Minutes (Standard)</option>
              <option value={30}>30 Minutes (Deep Dive)</option>
              <option value={45}>45 Minutes (Full Panel)</option>
            </select>
          </div>

          {/* Total Questions */}
          <div className="p-5 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-2 backdrop-blur-2xl shadow-xl">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" /> Question Count
            </label>
            <select
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60 font-medium"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
            </select>
          </div>

          {/* Rigor */}
          <div className="p-5 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-2 backdrop-blur-2xl shadow-xl">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Evaluation Rigor
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setRigor('Standard')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  rigor === 'Standard'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-[#030712] border-white/10 text-slate-400'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setRigor('Bar Raiser')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  rigor === 'Bar Raiser'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-[#030712] border-white/10 text-slate-400'
                }`}
              >
                Bar Raiser
              </button>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isAiThinking}
            className="w-full py-4 rounded-full lumine-pill-primary text-sm sm:text-base font-bold shadow-[0_0_35px_rgba(255,255,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isAiThinking ? 'Calibrating Adaptive AI...' : 'Launch Live Mock Interview Session'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
