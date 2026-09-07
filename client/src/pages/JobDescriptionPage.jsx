import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  Briefcase,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bot,
  Building2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import CircularProgress from '../components/common/CircularProgress.jsx';
import Badge from '../components/common/Badge.jsx';

export default function JobDescriptionPage() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [jobText, setJobText] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await api.jobs.get();
        if (res.job) setJobData(res.job);
      } catch (err) {
        console.warn("No prior job description:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!jobText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await api.jobs.analyze({
        jobText,
        company: company || 'Target Company',
        role: role || 'Software Engineer'
      });
      setJobData(res.job);
      setJobText('');
    } catch (err) {
      alert(err.message || 'Failed to analyze job description.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartRoleInterview = () => {
    navigate('/interview/setup');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">Skill Gap Diagnostic</Badge>
          <span className="text-xs text-slate-400">JD Match Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Job Description Analyzer & Matcher
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Compare your verified skillset against real-world job postings to identify critical skill gaps and tailor your mock interview simulation.
        </p>
      </div>

      {/* Input Form */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-5 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          Paste Target Job Description
        </h3>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Company Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Google, Stripe, Uber"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Role Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Full Stack Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300 font-medium">Job Description Text</label>
            <textarea
              rows={5}
              required
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste required skills, core responsibilities, and qualifications from the job posting..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !jobText.trim()}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold text-xs shadow-glow-primary transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? 'Extracting Skills & Benchmarking...' : 'Analyze Job Description & Calculate Match'}
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Results Display */}
      {jobData ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Match Score & Overview Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Score Ring */}
            <div className="md:col-span-4 p-6 rounded-2xl glass-card border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Job Match Score
              </span>
              <CircularProgress
                value={jobData.matchScore || 76}
                size={150}
                strokeWidth={12}
                label="Role Fit"
                sublabel="JD Alignment"
                color={(jobData.matchScore || 76) >= 75 ? 'emerald' : 'amber'}
              />
              <Badge variant={(jobData.matchScore || 76) >= 75 ? 'success' : 'warning'} size="sm">
                {(jobData.matchScore || 76) >= 75 ? 'High Skill Alignment' : 'Moderate Skill Alignment'}
              </Badge>
            </div>

            {/* Role Header & Actions */}
            <div className="md:col-span-8 p-6 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wide">{jobData.company || 'Target Company'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">{jobData.role || 'Software Engineer'}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Based on your candidate profile vs this role's specifications, here is your skill breakdown and high-impact interview preparation recommendations.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleStartRoleInterview}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-primary transition-all flex items-center gap-2"
                >
                  <Bot className="w-3.5 h-3.5" />
                  Start Job-Specific Mock Interview
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched */}
            <div className="p-6 rounded-2xl glass-card border border-emerald-800/30 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Matched Skills (Strong Fit)
                </h3>
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  {jobData.matchedSkills?.length || 0} Skills
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(jobData.matchedSkills || ["React", "Node.js", "Java"]).map((s, idx) => (
                  <Badge key={idx} variant="success" size="md">{s} → Strong Match</Badge>
                ))}
              </div>
            </div>

            {/* Missing Gaps */}
            <div className="p-6 rounded-2xl glass-card border border-amber-800/30 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Skill Gaps (Needs Improvement)
                </h3>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  {jobData.missingSkills?.length || 0} Skills
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(jobData.missingSkills || ["SQL", "DSA", "System Design"]).map((s, idx) => (
                  <Badge key={idx} variant="warning" size="md">{s} → Needs Review</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Gap Analysis & Actionable Tips */}
          {jobData.recommendations && (
            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Tailored Interview Preparation Strategy
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {jobData.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
          Paste a job description above to benchmark your fit and detect high-priority skill gaps.
        </div>
      )}
    </div>
  );
}
