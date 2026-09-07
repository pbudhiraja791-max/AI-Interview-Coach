import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  Zap,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ChevronDown
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function PracticePage() {
  const location = useLocation();
  const [topic, setTopic] = useState('Java');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionText, setQuestionText] = useState('What is the difference between abstraction and encapsulation in object-oriented programming?');
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  // If navigated from Resume question or Question bank
  useEffect(() => {
    if (location.state?.customQuestion) {
      setQuestionText(location.state.customQuestion);
      if (location.state.customTopic) setTopic(location.state.customTopic);
    }
  }, [location.state]);

  const sampleDrillQuestions = {
    'Java': 'What is the internal working of HashMap in Java 8, and how does treeification prevent hash collision attacks?',
    'React': 'What is the difference between useMemo and useCallback, and when should you avoid using them?',
    'SQL': 'Explain the difference between clustered and non-clustered indexes in SQL databases.',
    'System Design': 'How do you design a distributed rate limiter that handles 50,000 requests per second across multiple server instances?',
    'DSA': 'Explain the difference between BFS and DFS and when you would prefer one over the other for shortest-path search.',
    'Behavioral': 'Tell me about a time when you had to push back on unrealistic technical deadlines.'
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    if (sampleDrillQuestions[newTopic]) {
      setQuestionText(sampleDrillQuestions[newTopic]);
    }
    setEvaluation(null);
  };

  const handleSubmitPractice = async (e) => {
    e.preventDefault();
    if (!candidateAnswer.trim()) return;

    setIsEvaluating(true);
    try {
      const res = await api.questions.practiceAnswer({
        questionText,
        candidateAnswer,
        topic,
        difficulty
      });
      setEvaluation(res.evaluation);
    } catch (err) {
      alert(err.message || 'Evaluation error');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="warning">Rapid Drill Mode</Badge>
          <span className="text-xs text-slate-400">Instant AI Calibration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Targeted Topic Practice Drills
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Practice individual interview questions without launching a full mock interview session. Get instant Bar Raiser evaluation.
        </p>
      </div>

      {/* Drill Configurator */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Choose Topic Drill</label>
            <select
              value={topic}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="Java">Java & Core Collections</option>
              <option value="React">React & Frontend Performance</option>
              <option value="SQL">DBMS & SQL Query Optimization</option>
              <option value="System Design">System Design & Caching</option>
              <option value="DSA">Data Structures & Algorithms</option>
              <option value="Behavioral">Behavioral (STAR Method)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Difficulty Target</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="Easy">Easy Level</option>
              <option value="Medium">Medium (Standard)</option>
              <option value="Hard">Hard (Bar Raiser)</option>
            </select>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-indigo-400">Drill Question:</span>
          <p className="text-sm font-bold text-white leading-relaxed">{questionText}</p>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmitPractice} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Your Answer</label>
            <textarea
              rows={5}
              required
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Type your explanation, runtime trade-offs, and examples here..."
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isEvaluating || !candidateAnswer.trim()}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold text-xs shadow-glow-primary transition-all flex items-center justify-center gap-2"
          >
            {isEvaluating ? 'Evaluating with AI...' : 'Submit Drill Answer & Get Instant Feedback'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Drill Evaluation Results */}
      {evaluation && (
        <div className="p-6 rounded-2xl glass-card border border-indigo-500/30 space-y-5 shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Instant AI Drill Evaluation</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Score: {evaluation.score}/10
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/30 space-y-1">
              <span className="font-bold text-emerald-300">Strengths:</span>
              <ul className="space-y-1 text-slate-300">
                {evaluation.strengths?.map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 space-y-1">
              <span className="font-bold text-amber-300">What to Improve:</span>
              <ul className="space-y-1 text-slate-300">
                {evaluation.improvements?.map((imp, i) => <li key={i}>• {imp}</li>)}
              </ul>
            </div>
          </div>

          {evaluation.betterAnswer && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-indigo-300">Model Senior Answer:</span>
              <p className="text-slate-300 leading-relaxed">{evaluation.betterAnswer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
