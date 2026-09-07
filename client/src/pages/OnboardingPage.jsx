import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  Target,
  Bot
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function OnboardingPage() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack Developer');
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || '1-3 years');
  const [skills, setSkills] = useState(user?.skills || ['React', 'Node.js', 'JavaScript', 'SQL']);
  const [jobText, setJobText] = useState('');
  const [interviewGoals, setInterviewGoals] = useState([
    'Ace System Design questions',
    'Structure STAR behavioral stories',
    'Improve live spoken fluency'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSkills = [
    'Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express',
    'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'DSA', 'OOP', 'System Design'
  ];

  const roleOptions = [
    'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Data Analyst', 'Data Scientist', 'Product Manager', 'UI/UX Designer', 'DevOps / Cloud Engineer'
  ];

  const experienceOptions = ['Student', 'Fresher', '0–1 years', '1–3 years', '3+ years'];

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleCompleteOnboarding = async () => {
    setIsSubmitting(true);
    try {
      // 1. Update Profile
      await updateUserProfile({
        targetRole,
        experienceLevel,
        skills,
        interviewGoals
      });

      // 2. Analyze Job description if provided
      if (jobText.trim()) {
        try {
          await api.jobs.analyze({ jobText });
        } catch (e) {
          console.warn("Job analysis non-blocking error:", e);
        }
      }

      navigate('/dashboard');
    } catch (err) {
      console.error("Onboarding failed:", err);
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Top Wizard Steps Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Candidate Onboarding Wizard
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Step {step} of 6: {
                step === 1 ? 'Basic Information' :
                step === 2 ? 'Target Role' :
                step === 3 ? 'Experience Level' :
                step === 4 ? 'Core Skills' :
                step === 5 ? 'Job Description' : 'Interview Goals'
              }
            </h1>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            {Math.round((step / 6) * 100)}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Container */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Welcome, {user?.name || 'Candidate'}!</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We'll calibrate your AI mock interviews and readiness score based on your target role, experience, and projects.
            </p>
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Target Role */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">What role are you targeting?</h3>
            <p className="text-xs text-slate-400">
              The AI interviewer will frame technical architecture, system design, and coding rounds for this specialization.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roleOptions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTargetRole(r)}
                  className={`p-3.5 rounded-xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                    targetRole === r
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-primary'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{r}</span>
                  {targetRole === r && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Experience Level */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">What is your current experience level?</h3>
            <p className="text-xs text-slate-400">
              Difficulty and evaluation depth will calibrate to your seniority expectation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experienceOptions.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setExperienceLevel(lvl)}
                  className={`p-4 rounded-xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                    experienceLevel === lvl
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-primary'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{lvl}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {lvl === 'Student' ? 'Focus on fundamentals, DSA & projects' :
                       lvl === 'Fresher' ? 'Entry-level interview rounds' :
                       lvl === '1–3 years' ? 'Mid-level system architecture & clean code' : 'Senior Bar Raiser & distributed systems'}
                    </div>
                  </div>
                  {experienceLevel === lvl && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Skills */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Select your technical skills</h3>
            <p className="text-xs text-slate-400">
              Select all technologies you want the AI to assess in your mock interviews.
            </p>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((skill) => {
                const isSelected = skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-primary'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {skill}
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Job Description */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Target Job Description (Optional)</h3>
            <p className="text-xs text-slate-400">
              Paste a specific job opening description. The AI will benchmark your skills and simulate role-specific interview rounds.
            </p>
            <textarea
              rows={6}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job requirements, responsibilities, and required stack here..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Step 6: Goals */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">What are your primary interview goals?</h3>
            <p className="text-xs text-slate-400">
              Select key focus areas for your AI preparation plan.
            </p>
            <div className="space-y-2">
              {[
                'Master System Design & Distributed Scalability',
                'Improve STAR structure for Behavioral & Conflict questions',
                'Eliminate filler words and improve vocal pace',
                'Master SQL Optimization & Database Internals',
                'Crush Live Coding & Algorithmic Problem Solving'
              ].map((goal) => {
                const isSelected = interviewGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setInterviewGoals(interviewGoals.filter(g => g !== goal));
                      } else {
                        setInterviewGoals([...interviewGoals, goal]);
                      }
                    }}
                    className={`w-full p-3 rounded-xl text-xs font-semibold text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-primary'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{goal}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow-primary flex items-center gap-1.5 transition-all"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCompleteOnboarding}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow-primary flex items-center gap-2 transition-all"
            >
              {isSubmitting ? 'Calibrating Engine...' : 'Complete & Launch Dashboard'}
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
