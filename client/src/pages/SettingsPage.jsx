import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { api } from '../services/api.js';
import {
  Settings,
  Key,
  Sliders,
  Sparkles,
  ShieldCheck,
  Check,
  Info,
  Server,
  Zap,
  Cpu,
  Layers
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function SettingsPage() {
  const {
    apiKey,
    saveApiKey
  } = useTheme();

  const [inputKey, setInputKey] = useState(apiKey);
  const [isSaved, setIsSaved] = useState(false);
  const [healthInfo, setHealthInfo] = useState(null);

  useEffect(() => {
    async function checkBackend() {
      try {
        const res = await api.checkHealth();
        setHealthInfo(res);
      } catch (e) {
        console.warn("Health check error:", e);
      }
    }
    checkBackend();
  }, []);

  const handleSaveKey = (e) => {
    e.preventDefault();
    saveApiKey(inputKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">Configuration & AI Engine</Badge>
          <span className="text-xs text-slate-400">Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          System & AI Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Configure live Gemini API keys, demo mode fallbacks, and AI engine model diagnostics.
        </p>
      </div>

      {/* Backend Status Banner */}
      <div className="p-5 rounded-2xl glass-card border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">AI Engine Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {healthInfo?.aiMode || 'Smart AI Fallback Engine (Demo Mode Active)'}
            </p>
          </div>
        </div>
        <Badge variant="success" size="md">Online & Ready</Badge>
      </div>

      {/* 1. Gemini API Key Configuration */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Google Gemini API Key (Optional)</h3>
          </div>
          <Badge variant={apiKey ? 'success' : 'default'} size="sm">
            {apiKey ? 'Live API Configured' : 'Using Smart Fallback'}
          </Badge>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          If provided, all adaptive questions, answer evaluations, and STAR analyses will be powered by your live Gemini API model. If left blank, the platform runs in full <b>Smart Offline Demo Mode</b> with zero rate limits.
        </p>

        <form onSubmit={handleSaveKey} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Keys are stored strictly locally in your browser's session storage.</span>
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-primary transition-all flex items-center gap-1.5"
            >
              {isSaved ? 'Key Saved!' : 'Save Key'}
            </button>
          </div>
        </form>
      </div>

      {/* 2. AI Model & Evaluation Architecture */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Evaluation Architecture & Reasoning Models</h3>
          </div>
          <Badge variant="cyan" size="sm">Gemini 2.5 Flash</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Adaptive Question Generator
            </span>
            <p className="text-slate-400 leading-relaxed">
              Analyzes candidate answers, adjusts difficulty across 3 levels, and pivots dynamically across domains without repeating questions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Bar Raiser Scoring Rubric
            </span>
            <p className="text-slate-400 leading-relaxed">
              Deconstructs candidate responses across Technical Knowledge, Clarity, Relevance, Depth, and STAR Behavioral framework.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
