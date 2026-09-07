import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import {
  Calendar,
  Sparkles,
  CheckCircle2,
  Circle,
  Play,
  RotateCcw,
  BookOpen,
  Code,
  Bot,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function PreparationPlanPage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedDays, setExpandedDays] = useState({ 1: true, 2: true, 3: true, 4: true });

  useEffect(() => {
    async function loadPlan() {
      try {
        const res = await api.progress.getPlan();
        if (res.plan) setPlan(res.plan);
      } catch (err) {
        console.warn("Could not load study plan:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, []);

  const handleToggleTask = async (dayNumber, taskId, currentStatus) => {
    try {
      const res = await api.progress.updateTask({
        dayNumber,
        taskId,
        completed: !currentStatus
      });
      setPlan(res.plan);
    } catch (err) {
      console.error("Task status update failed:", err);
    }
  };

  const handleRegeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const res = await api.progress.generatePlan();
      setPlan(res.plan);
    } catch (err) {
      alert(err.message || 'Failed to regenerate study plan.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleDay = (dayNum) => {
    setExpandedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Calculate completion percentage
  let totalTasks = 0;
  let completedTasks = 0;
  plan?.days?.forEach(d => {
    d.tasks?.forEach(t => {
      totalTasks++;
      if (t.completed) completedTasks++;
    });
  });

  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 40;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="purple">Adaptive Curriculum</Badge>
            <span className="text-xs text-slate-400">Weakness-Driven Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Personalized 7-Day Interview Preparation Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Structured daily curriculum tailored to eliminate your diagnosed skill gaps and weak areas.
          </p>
        </div>

        <button
          type="button"
          disabled={isGenerating}
          onClick={handleRegeneratePlan}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold shadow-glow-primary transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          {isGenerating ? 'Regenerating...' : 'Regenerate Plan with AI'}
        </button>
      </div>

      {/* Overview Card with Progress & Detected Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress summary */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 shadow-xl flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Roadmap Completion
          </span>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold font-mono text-white">{completionPercent}%</span>
              <span className="text-xs font-mono text-indigo-400">{completedTasks} of {totalTasks} Tasks</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">Mark daily tasks as completed to track readiness.</p>
        </div>

        {/* Targeted Weaknesses */}
        <div className="md:col-span-2 p-6 rounded-2xl glass-card border border-slate-800 space-y-3 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Diagnosed Focus Areas
          </span>
          <div className="flex flex-wrap gap-2">
            {(plan?.detectedWeaknesses || [
              "SQL Joins & Index Optimization",
              "Behavioral STAR Action Detailing",
              "Distributed Cache Invalidation & Idempotency"
            ]).map((w, idx) => (
              <Badge key={idx} variant="warning" size="md">{w}</Badge>
            ))}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The curriculum below provides daily interactive exercises, coding drills, and mock interviews targeting these exact areas.
          </p>
        </div>
      </div>

      {/* Daily Schedule List */}
      <div className="space-y-4">
        {plan?.days?.map((day) => {
          const isExpanded = Boolean(expandedDays[day.dayNumber]);
          return (
            <div
              key={day.dayNumber}
              className={`p-6 rounded-2xl glass-card border transition-all space-y-4 shadow-xl ${
                day.completed ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-slate-800'
              }`}
            >
              {/* Day Header */}
              <div
                onClick={() => toggleDay(day.dayNumber)}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold font-mono text-xs ${
                    day.completed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    D{day.dayNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white">{day.topic}</h3>
                      {day.completed && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{day.description}</p>
                  </div>
                </div>

                <button className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Tasks List */}
              {isExpanded && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                  {day.tasks?.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(day.dayNumber, task.id, task.completed)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        task.completed
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                          : 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0 hover:text-indigo-400" />
                        )}
                        <span className={`text-xs font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                          {task.title}
                        </span>
                      </div>

                      <Badge variant={task.type === 'interview' ? 'purple' : task.type === 'coding' ? 'cyan' : 'default'} size="sm">
                        {task.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
