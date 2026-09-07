import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import {
  Bot,
  Sparkles,
  Flame,
  Zap,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  PlusCircle,
  FileText,
  Briefcase,
  Code,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import CircularProgress from '../components/common/CircularProgress.jsx';
import Badge from '../components/common/Badge.jsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.progress.getDashboard();
        setDashboardData(res.dashboard);
      } catch (err) {
        console.warn("Failed to load live dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const readiness = dashboardData?.user?.readinessScore || user?.readinessScore || 74;
  const breakdown = dashboardData?.user?.readinessBreakdown || user?.readinessBreakdown || {
    technical: 82,
    communication: 71,
    problemSolving: 84,
    confidence: 63,
    clarity: 79
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Personalized AI Interview Dashboard
            </span>
            <Badge variant="cyan" size="sm">{user?.targetRole || 'Full Stack Developer'}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {getGreeting()}, {user?.name || 'Siddhika'} 🚀
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Let's make you interview-ready. You have an active {dashboardData?.user?.streakDays || 7}-day streak!
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Link
            to="/interview/setup"
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow-primary transition-all flex items-center gap-2 group"
          >
            <Bot className="w-4 h-4" />
            Start Mock Interview
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* 2. READINESS SCORE & 5-DIMENSION BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Big Circular Progress */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
          <div className="flex items-center justify-between w-full border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Job Readiness Score
            </span>
            <Badge variant="success" size="sm">Active Calibration</Badge>
          </div>

          <div className="py-2">
            <CircularProgress
              value={readiness}
              size={170}
              strokeWidth={12}
              label="Interview Readiness"
              sublabel="Target: 85%+"
              color={readiness >= 80 ? 'emerald' : readiness >= 70 ? 'indigo' : 'amber'}
            />
          </div>

          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Your readiness score is synthesized dynamically from technical accuracy, communication pace, and STAR answer depth across your interview history.
          </p>
        </div>

        {/* Right: 5-Metric Breakdown */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Comprehensive Capability Breakdown
            </h3>
            <span className="text-xs text-slate-400">5-Metric Assessment</span>
          </div>

          <div className="space-y-3.5">
            {[
              { label: 'Technical Knowledge', value: breakdown.technical, color: 'from-indigo-500 to-purple-500', desc: 'Core algorithms, runtime mechanisms, architecture' },
              { label: 'Communication & Delivery', value: breakdown.communication, color: 'from-cyan-500 to-blue-500', desc: 'Speaking pace (WPM), minimal filler words, poise' },
              { label: 'Problem Solving & Trade-offs', value: breakdown.problemSolving, color: 'from-emerald-500 to-teal-500', desc: 'Edge-case handling, distributed trade-offs' },
              { label: 'Confidence & Spoken Indicators', value: breakdown.confidence, color: 'from-amber-500 to-orange-500', desc: 'Minimal long pauses, concise direct assertions' },
              { label: 'Clarity & STAR Structure', value: breakdown.clarity, color: 'from-purple-500 to-pink-500', desc: 'Situation, Task, personal Action, business Result' }
            ].map((metric) => (
              <div key={metric.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">{metric.label}</span>
                  <span className="font-mono text-white">{metric.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-700`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. DAILY RECOMMENDED PRACTICE & WEAKNESSES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Recommendation Banner */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-tr from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              AI Recommended Daily Practice
            </div>
            <Badge variant="warning" size="sm">High Priority</Badge>
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              {dashboardData?.dailyRecommendation?.title || "Practice 5 SQL optimization questions today."}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {dashboardData?.dailyRecommendation?.subtitle || "Targeting your identified weakness in Database Indexing and query plan analysis."}
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/practice"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow-primary transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start 10-Min Drill
            </Link>
            <Link
              to="/preparation-plan"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              View 7-Day Study Plan
            </Link>
          </div>
        </div>

        {/* Strengths & Weaknesses Tags */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Diagnosed Skill Matrix
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Top Strengths
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(dashboardData?.strengths || ["Java", "OOP", "Problem Solving", "React"]).map((s, idx) => (
                  <Badge key={idx} variant="success" size="sm">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1 mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Areas to Improve
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(dashboardData?.weaknesses || ["SQL Joins", "STAR Stories", "Time Complexity"]).map((w, idx) => (
                  <Badge key={idx} variant="warning" size="sm">{w}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RECENT INTERVIEWS & QUICK LAUNCHPAD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Interviews Table */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Recent Mock Interviews
            </h3>
            <Link to="/interview/setup" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              <PlusCircle className="w-3.5 h-3.5" />
              New Session
            </Link>
          </div>

          {dashboardData?.recentInterviews && dashboardData.recentInterviews.length > 0 ? (
            <div className="space-y-2.5">
              {dashboardData.recentInterviews.map((intv) => (
                <div
                  key={intv._id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{intv.role}</span>
                      <Badge variant="cyan" size="sm">{intv.interviewType}</Badge>
                      <span className="text-[10px] text-slate-500">
                        {new Date(intv.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {intv.questions?.length || 0} questions answered • {intv.durationMinutes || 20} min session
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Score</span>
                      <p className="text-sm font-bold font-mono text-emerald-400">
                        {intv.overallEvaluation?.overallScore || 82}%
                      </p>
                    </div>
                    <Link
                      to={`/interview/${intv._id}/results`}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
                    >
                      View Report
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No interview sessions completed yet.{' '}
              <Link to="/interview/setup" className="text-indigo-400 font-bold hover:underline">
                Take your first mock interview now!
              </Link>
            </div>
          )}
        </div>

        {/* Quick Launch Tools */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3.5 shadow-xl flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Preparation Launchpad
          </h3>
          <div className="space-y-2">
            <Link
              to="/interview/setup"
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold text-white">Adaptive Mock Interview</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/job-description"
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Job Skill Gap Matcher</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/coding"
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Code className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white">Live Coding Studio</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </Link>

            <Link
              to="/questions"
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-white">Curated Question Bank</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
