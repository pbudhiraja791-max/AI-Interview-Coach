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
  Flame
} from 'lucide-react';
import CircularProgress from '../components/common/CircularProgress.jsx';
import Badge from '../components/common/Badge.jsx';

export default function LandingPage() {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleDemoStart = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shadow-glow-primary">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Generation Adaptive AI Interview Engine</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Ace Your Next Interview With <span className="ai-gradient-text">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Practice smarter with personalized mock interviews, real-time feedback, target job skill matching, 50 coding challenges, and an AI-powered preparation roadmap.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleDemoStart}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-glow-primary transition-all flex items-center justify-center gap-2 group"
            >
              Start Mock Interview
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all text-center"
            >
              Explore Features
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> STAR Behavioral Scoring</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Architectural Depth Analysis</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Demo Mode</span>
          </div>
        </div>

        {/* HERO INTERACTIVE DASHBOARD PREVIEW */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl glass-card border border-slate-700/80 shadow-2xl p-4 sm:p-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400 font-mono ml-2">ai-interview-session.live</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm">Technical & System Design</Badge>
              <Badge variant="purple" size="sm">Adaptive Level 2</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Interviewer Avatar Card */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center relative shadow-glow-primary">
                <Bot className="w-9 h-9 text-indigo-400" />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Sarah Chen</h4>
                <p className="text-xs text-slate-400">Principal Bar Raiser</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-mono bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Interactive Evaluation Engine
              </div>
            </div>

            {/* Live Question & Answer Feed */}
            <div className="md:col-span-2 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div className="text-[10px] uppercase font-mono text-indigo-400 font-bold mb-1">AI Question (System Design):</div>
                <p className="text-slate-200 leading-relaxed font-medium">
                  "You are architecting an e-commerce platform using React and Node.js. How would you structure your distributed cache and manage state when 100K users access concurrently?"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Candidate Response</span>
                  <span className="text-emerald-400">Technical Depth: 9/10</span>
                </div>
                <p className="text-slate-200">
                  "We implemented a cache-aside pattern using Redis cluster with LRU eviction and partitioned cache keys by tenant ID to avoid hot-key contention..."
                </p>
              </div>

              {/* Instant Evaluation snippet */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs">
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Score: 9/10 • Strong Cache-Aside Architecture
                </span>
                <span className="text-indigo-400 text-[11px] font-mono">Next: Probing Edge Cases →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS COUNTER SECTION */}
      <section className="border-y border-slate-800/80 bg-slate-950/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono ai-gradient-text">10K+</div>
              <p className="text-sm font-semibold text-slate-300">Questions Practiced</p>
              <p className="text-xs text-slate-500">Across Java, React, System Design & STAR HR</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono ai-gradient-text">95%</div>
              <p className="text-sm font-semibold text-slate-300">Personalized Feedback</p>
              <p className="text-xs text-slate-500">Instant mistake breakdown & exemplary answers</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono ai-gradient-text">24/7</div>
              <p className="text-sm font-semibold text-slate-300">AI Interview Practice</p>
              <p className="text-xs text-slate-500">Adaptive difficulty & Bar Raiser personas</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY AI INTERVIEW COACH SECTION */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="primary">The Competitive Edge</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Why AI Interview Coach?
          </h2>
          <p className="text-sm text-slate-400">
            Unlike generic chatbots, our platform simulates realistic hiring bars, probes answers deeply, and helps you systematically eliminate weaknesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Personalized Interviews</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every interview adapts dynamically to your experience level, target role, and past answers—just like a senior technical interviewer.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Job Description Matcher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare your skills against target job descriptions. Calculate match score percentages, detect critical skill gaps, and get recommendations.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Adaptive Difficulty Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strong answers trigger deeper follow-ups (Level 3 Bar Raiser). Weaker answers trigger supportive clarifications and analogies.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">AI Evaluation & STAR Framework</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get scored on technical knowledge, clarity, depth, and STAR structure (Situation, Task, Action, Result) with mistake explanations.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interview Mirror Perception</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand how interviewers actually perceive your responses. Get constructive analysis on what hiring managers think.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl glass-card glass-card-hover space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">50 FAANG Coding Practice Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve data structure challenges with live test runners and AI complexity evaluations (Time & Space O(N)) and optimization tips.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (6 STEPS) */}
      <section id="how-it-works" className="py-20 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="cyan">Structured Methodology</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              How It Works
            </h2>
            <p className="text-sm text-slate-400">
              Follow a closed-loop mastery framework designed to take you from initial assessment to hire-ready confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Target Role & Skills', desc: 'Select your target engineering specialization and verified technical skill stack.', icon: Target },
              { step: '02', title: 'Choose Job Description', desc: 'Paste the target job requirements to compute match scores and detect skill gaps.', icon: Briefcase },
              { step: '03', title: 'Practice Interview', desc: 'Engage in conversational mock interviews with adaptive interviewer personas.', icon: Bot },
              { step: '04', title: 'Get AI Feedback', desc: 'Receive score breakdowns, interviewer perspective, and exemplary model answers.', icon: Sparkles },
              { step: '05', title: 'Target Weaknesses', desc: 'Follow dynamically generated 7-day study plans targeting your diagnosed gaps.', icon: TrendingUp },
              { step: '06', title: 'Become Interview Ready', desc: 'Watch your Readiness Score climb as you master technical and behavioral rounds.', icon: Award }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <span className="text-3xl font-extrabold font-mono text-slate-800 group-hover:text-indigo-500/20 transition-colors">
                    {item.step}
                  </span>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-indigo-400" />
            <span>Ready for your next career milestone?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready For Your Next Interview?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of software engineers, backend developers, and tech leads practicing with the smartest AI coach on the market.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleDemoStart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-glow-primary transition-all flex items-center justify-center gap-2"
            >
              Start Practicing Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
