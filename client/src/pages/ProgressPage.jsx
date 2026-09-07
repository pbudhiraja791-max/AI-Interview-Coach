import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import {
  TrendingUp,
  Award,
  Flame,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  Code,
  Target,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import Badge from '../components/common/Badge.jsx';

export default function ProgressPage() {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await api.progress.getAnalytics();
        setProgressData(res);
      } catch (err) {
        console.error("Could not fetch progress analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  const timelineData = progressData?.timelineData || [
    { name: 'Baseline', score: 61, technical: 65, communication: 58 },
    { name: 'Interview 1', score: 67, technical: 70, communication: 64 },
    { name: 'Interview 2', score: 72, technical: 76, communication: 69 },
    { name: 'Interview 3', score: 78, technical: 82, communication: 74 },
    { name: 'Interview 4', score: 84, technical: 90, communication: 79 }
  ];

  const radarData = progressData?.radarData || [
    { subject: 'Technical Depth', score: 85 },
    { subject: 'Communication', score: 75 },
    { subject: 'Problem Solving', score: 88 },
    { subject: 'STAR Structure', score: 80 },
    { subject: 'Confidence', score: 72 },
    { subject: 'System Design', score: 79 }
  ];

  const stats = progressData?.stats || {
    totalInterviewsCompleted: 5,
    bestScore: 86,
    averageScore: 78,
    questionsPracticed: 28,
    streakDays: 7,
    totalXP: 920
  };

  const badgeShowcase = [
    { name: 'First Interview', icon: Target, desc: 'Completed your first AI mock session', unlocked: true },
    { name: '7-Day Streak Master', icon: Flame, desc: 'Practiced consistently for 7 days', unlocked: true },
    { name: 'Algorithm Ace', icon: Code, desc: 'Solved all Live Coding challenges', unlocked: true },
    { name: 'STAR Storyteller', icon: Award, desc: 'Scored 9+ on behavioral responses', unlocked: true },
    { name: 'High-Impact Articulation', icon: Zap, desc: 'Scored 9+ on technical clarity and depth', unlocked: true },
    { name: '10 Interviews Completed', icon: Sparkles, desc: 'Complete 10 adaptive sessions', unlocked: false }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Performance Intelligence</Badge>
          <span className="text-xs text-slate-400">Historical Trends & Milestones</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Performance Analytics & Skill Growth
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Track your interview readiness trajectory, score evolution, category radar polygons, and milestone badges.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Best Score</span>
          <p className="text-2xl font-bold font-mono text-emerald-400">{stats.bestScore}%</p>
          <span className="text-[10px] text-emerald-500 font-medium">↑ +23% Growth</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Average Score</span>
          <p className="text-2xl font-bold font-mono text-indigo-300">{stats.averageScore}%</p>
          <span className="text-[10px] text-slate-500">Across sessions</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Completed</span>
          <p className="text-2xl font-bold font-mono text-cyan-400">{stats.totalInterviewsCompleted}</p>
          <span className="text-[10px] text-slate-500">Full mock rounds</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Questions</span>
          <p className="text-2xl font-bold font-mono text-purple-400">{stats.questionsPracticed}</p>
          <span className="text-[10px] text-slate-500">Answered & scored</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Active Streak</span>
          <p className="text-2xl font-bold font-mono text-amber-400 flex items-center gap-1">
            <Flame className="w-5 h-5 fill-amber-400 inline" />
            {stats.streakDays}d
          </p>
          <span className="text-[10px] text-amber-500 font-medium">Daily practice</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Total XP</span>
          <p className="text-2xl font-bold font-mono text-indigo-400 flex items-center gap-1">
            <Zap className="w-5 h-5 fill-indigo-400 inline" />
            {stats.totalXP}
          </p>
          <span className="text-[10px] text-indigo-300 font-medium">Level 4 Candidate</span>
        </div>
      </div>

      {/* Recharts Analytics: Timeline Chart & Radar Polygon */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Line Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-card border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Score Trajectory Over Time</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">+23% Net Improvement</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" domain={[40, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1' }} activeDot={{ r: 6 }} name="Overall Score" />
                <Line type="monotone" dataKey="technical" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Technical Depth" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Polygon */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-card border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Category Mastery Polygon</h3>
            <Badge variant="cyan" size="sm">Holistic Fit</Badge>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                <Radar name="Proficiency" dataKey="score" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gamification Achievements / Badges */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Milestone Badges & Gamification</h3>
          </div>
          <span className="text-xs text-indigo-400 font-mono">4 of 6 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badgeShowcase.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all ${
                  b.unlocked
                    ? 'bg-slate-950/80 border-indigo-500/30'
                    : 'bg-slate-950/30 border-slate-900 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  b.unlocked ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-glow-primary' : 'bg-slate-900 text-slate-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{b.name}</h4>
                    {b.unlocked && <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">Unlocked</span>}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
