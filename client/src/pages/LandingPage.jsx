import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Bot,
  Sparkles,
  Zap,
  Target,
  FileText,
  Briefcase,
  Code,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Play,
  Flame,
  ChevronRight,
  Layers
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function LandingPage() {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoStart = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 overflow-hidden relative">
      {/* =========================================================================
          CELESTIAL HORIZON & COSMIC LIGHT SYSTEM (NEONE / LUMINE THEME)
          ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[750px] overflow-hidden pointer-events-none select-none z-0">
        {/* Soft Aurora / Light Shaft */}
        <div className="celestial-light-shaft" />

        {/* The Glowing Celestial Planet Arc */}
        <div className="celestial-arc-wrapper">
          <div className="celestial-arc" />
        </div>

        {/* Starfield / Stardust Floating Dots */}
        <div className="absolute inset-0">
          <div className="star-particle w-1 h-1 top-[18%] left-[22%] opacity-80 shadow-[0_0_8px_#fff]" />
          <div className="star-particle w-0.5 h-0.5 top-[12%] left-[38%] opacity-40" />
          <div className="star-particle w-1 h-1 top-[28%] left-[45%] opacity-60 shadow-[0_0_6px_#93c5fd]" />
          <div className="star-particle w-1.5 h-1.5 top-[15%] right-[25%] opacity-85 shadow-[0_0_10px_#fff]" />
          <div className="star-particle w-0.5 h-0.5 top-[22%] right-[35%] opacity-50" />
          <div className="star-particle w-1 h-1 top-[35%] left-[15%] opacity-70" />
          <div className="star-particle w-1 h-1 top-[32%] right-[18%] opacity-75 shadow-[0_0_6px_#60a5fa]" />
          <div className="star-particle w-0.5 h-0.5 top-[40%] right-[42%] opacity-40" />
          <div className="star-particle w-1 h-1 top-[8%] left-[55%] opacity-65" />
          <div className="star-particle w-0.5 h-0.5 top-[48%] left-[28%] opacity-50" />
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION (Framed inside the Celestial Glowing Horizon Circle)
          ========================================================================= */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Main Title with Lumine Gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.15]">
            Ace Your Next Interview With <br className="hidden sm:inline" />
            <span className="lumine-gradient-text font-bold">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto font-normal">
            A minimal AI-powered system that transforms complex interview prep into clear, glowing, effortless structures — helping you land dream offers faster.
          </p>

          {/* Action Pill Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleDemoStart}
              className="lumine-pill-primary px-7 py-3 text-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="lumine-pill-secondary px-6 py-3 text-sm flex items-center justify-center gap-2"
            >
              Watch Demo
            </a>
          </div>

          {/* Key Value Propositions */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-5 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> STAR Behavioral Scoring</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> 50 FAANG Coding Drills</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> 1-Click Free Instant Demo</span>
          </div>
        </div>

        {/* =========================================================================
            HERO DASHBOARD PREVIEW (EMERGING FROM GLOWING HORIZON)
            ========================================================================= */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl lumine-preview-card p-4 sm:p-7 relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-400 font-mono ml-2">session.interview.lumine.live</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">System Design & Tech</Badge>
              <Badge variant="primary" size="sm">Adaptive Level 2</Badge>
            </div>
          </div>

          {/* Interior Preview UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Interviewer Persona Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center text-center space-y-3">
              <div className="w-18 h-18 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                <Bot className="w-8 h-8 text-sky-300" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050918]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Sarah Chen</h4>
                <p className="text-xs text-slate-400">Principal Bar Raiser</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-sky-300 font-mono bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                <span className="text-sky-400">✦</span>
                <span>Adaptive Neural Evaluation</span>
              </div>
            </div>

            {/* Live Question & Answer Feed */}
            <div className="md:col-span-2 space-y-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-1.5">
                <div className="text-[10px] uppercase font-mono text-sky-400 font-semibold tracking-wider">
                  AI Question (Distributed Architecture):
                </div>
                <p className="text-slate-200 leading-relaxed font-normal">
                  "You are architecting an e-commerce platform using React and Node.js. How would you structure your distributed cache and manage state when 100K users access concurrently?"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-800/30 text-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-slate-300">Candidate Response</span>
                  <span className="text-emerald-400 font-semibold">Technical Depth: 9/10</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  "We implemented a cache-aside pattern using Redis cluster with LRU eviction and partitioned cache keys by tenant ID to avoid hot-key contention..."
                </p>
              </div>

              {/* Instant Evaluation snippet */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
                <span className="text-emerald-300 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Score: 9/10 • Strong Cache-Aside Architecture
                </span>
                <span className="text-sky-400 text-[11px] font-mono hidden sm:inline">Next: Probing Edge Cases →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATISTICS COUNTER SECTION
          ========================================================================= */}
      <section className="border-y border-white/[0.06] bg-[#02040A]/60 py-12 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono lumine-gradient-text">10K+</div>
              <p className="text-sm font-medium text-slate-200">Questions Practiced</p>
              <p className="text-xs text-slate-400">Across Java, React, System Design & STAR HR</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono lumine-gradient-text">95%</div>
              <p className="text-sm font-medium text-slate-200">Personalized Feedback</p>
              <p className="text-xs text-slate-400">Instant mistake breakdown & exemplary answers</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono lumine-gradient-text">24/7</div>
              <p className="text-sm font-medium text-slate-200">AI Interview Practice</p>
              <p className="text-xs text-slate-400">Adaptive difficulty & Bar Raiser personas</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES SECTION
          ========================================================================= */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="primary">The Competitive Edge</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Why AI Interview Coach?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unlike generic chatbots, our platform simulates realistic hiring bars, probes answers deeply, and helps you systematically eliminate weaknesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/25 flex items-center justify-center text-sky-400">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Personalized Interviews</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every interview adapts dynamically to your experience level, target role, and past answers—just like a senior technical interviewer.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/25 flex items-center justify-center text-indigo-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Targeted Skill Drills</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drill deep into essential computer science topics, distributed systems, concurrency, and behavioral questions with instant feedback.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Adaptive Difficulty Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strong answers trigger deeper follow-ups (Level 3 Bar Raiser). Weaker answers trigger supportive clarifications and analogies.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">AI Evaluation & STAR Framework</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get scored on technical knowledge, clarity, depth, and STAR structure (Situation, Task, Action, Result) with mistake explanations.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-400/25 flex items-center justify-center text-rose-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Interview Mirror Perception</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand how interviewers actually perceive your responses. Get constructive analysis on what hiring managers think.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-center text-amber-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">50 FAANG Coding Practice Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve data structure challenges with live test runners and AI complexity evaluations (Time & Space O(N)) and optimization tips.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (6 STEPS)
          ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-[#02040A]/80 border-t border-white/[0.06] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="cyan">Structured Methodology</Badge>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-sm text-slate-400">
              Follow a closed-loop mastery framework designed to take you from initial assessment to hire-ready confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Target Role & Skills', desc: 'Select your target engineering specialization and verified technical skill stack.', icon: Target },
              { step: '02', title: 'Curated Question Bank', desc: 'Browse and practice hundreds of hand-picked interview questions across key tech stacks.', icon: Layers },
              { step: '03', title: 'Practice Interview', desc: 'Engage in conversational mock interviews with adaptive interviewer personas.', icon: Bot },
              { step: '04', title: 'Get AI Feedback', desc: 'Receive score breakdowns, interviewer perspective, and exemplary model answers.', icon: Sparkles },
              { step: '05', title: 'Target Weaknesses', desc: 'Practice targeted drills designed to systematically conquer diagnosed skill gaps.', icon: TrendingUp },
              { step: '06', title: 'Become Interview Ready', desc: 'Watch your Readiness Score climb as you master technical and behavioral rounds.', icon: Award }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 relative overflow-hidden group hover:border-sky-400/30 transition-all backdrop-blur-md">
                  <span className="text-3xl font-extrabold font-mono text-white/10 group-hover:text-sky-400/30 transition-colors">
                    {item.step}
                  </span>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-sky-400" />
                    <h4 className="text-base font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-sky-950/40 via-[#050a1c] to-[#02040a] border border-sky-400/25 shadow-[0_0_50px_-10px_rgba(56,189,248,0.25)] space-y-6 relative overflow-hidden">
          {/* Subtle top rim light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-sky-400/80 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-sky-400/20 text-sky-300 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 fill-sky-400" />
            <span>Ready for your next career milestone?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Ready For Your Next Interview?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of software engineers, backend developers, and tech leads practicing with the smartest AI coach on the market.
          </p>
          <div className="pt-3 flex flex-row items-center justify-center gap-3">
            <button
              onClick={handleDemoStart}
              className="lumine-pill-primary px-8 py-3 text-sm flex items-center justify-center gap-2"
            >
              Start Practicing Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/signup"
              className="lumine-pill-secondary px-6 py-3 text-sm"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
