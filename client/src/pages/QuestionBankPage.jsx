import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import {
  Layers,
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  HelpCircle,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function QuestionBankPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [topic, setTopic] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState({});

  useEffect(() => {
    async function loadQuestions() {
      setLoading(true);
      try {
        if (showOnlyBookmarked) {
          const res = await api.questions.getBookmarked();
          setQuestions(res.questions || []);
        } else {
          const res = await api.questions.getAll({
            category: category !== 'All' ? category : undefined,
            topic: topic !== 'All' ? topic : undefined,
            difficulty: difficulty !== 'All' ? difficulty : undefined,
            search: search.trim() || undefined
          });
          setQuestions(res.questions || []);
        }
      } catch (err) {
        console.error("Could not fetch questions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, [category, topic, difficulty, search, showOnlyBookmarked]);

  const handleToggleBookmark = async (id) => {
    try {
      const res = await api.questions.toggleBookmark(id);
      setQuestions(prev => prev.map(q => q.id === id ? { ...q, isBookmarked: res.bookmarked } : q));
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedQuestion(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePractice = (q) => {
    navigate('/practice', {
      state: {
        customQuestion: q.question,
        customTopic: q.topic
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="cyan">Curated Question Repository</Badge>
          <span className="text-xs text-slate-400">100+ Bar Raiser Questions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Question Bank & Answer Repository
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Browse vetted interview questions across Java, React, System Design, SQL, and STAR Behavioral rounds with model exemplary answers.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search concepts, questions, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral (STAR)</option>
              <option value="HR">HR & Fit</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard (Bar Raiser)</option>
            </select>
          </div>

          {/* Bookmarks Toggle */}
          <button
            type="button"
            onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              showOnlyBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-glow-primary'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            {showOnlyBookmarked ? 'Saved Only' : 'Saved Questions'}
          </button>
        </div>
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        </div>
      ) : questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((q) => {
            const isExpanded = Boolean(expandedQuestion[q.id]);
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl glass-card border border-slate-800/90 hover:border-indigo-500/30 transition-all space-y-3"
              >
                {/* Header & Badges */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="primary" size="sm">{q.topic}</Badge>
                    <Badge variant={q.difficulty === 'Easy' ? 'success' : q.difficulty === 'Hard' ? 'danger' : 'warning'} size="sm">
                      {q.difficulty}
                    </Badge>
                    <span className="text-[11px] text-slate-400 font-medium">{q.category}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(q.id)}
                    className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Bookmark question"
                  >
                    {q.isBookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Question */}
                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  "{q.question}"
                </h3>

                {/* Expected Concepts */}
                {q.expectedConcepts && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {q.expectedConcepts.map((concept, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        • {concept}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expanded Section (Sample Answer & Follow-ups) */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800 space-y-3 text-xs animate-in fade-in duration-150">
                    {/* Model Answer */}
                    <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/30 space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-indigo-300">Model Exemplary Answer:</span>
                      <p className="text-slate-300 leading-relaxed">{q.sampleAnswer}</p>
                    </div>

                    {/* Follow-up Questions */}
                    {q.followUps && q.followUps.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Common Bar Raiser Follow-Ups:</span>
                        <ul className="space-y-1 text-slate-300">
                          {q.followUps.map((fu, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-indigo-400 font-bold">→</span>
                              <span>{fu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <button
                    type="button"
                    onClick={() => toggleExpand(q.id)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
                  >
                    {isExpanded ? 'Hide Model Answer' : 'View Model Answer & Follow-ups'}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePractice(q)}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30 flex items-center gap-1.5 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    Practice This
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
          No questions matched your search criteria. Try adjusting the filters.
        </div>
      )}
    </div>
  );
}
