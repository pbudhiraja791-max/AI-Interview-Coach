import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import {
  Code,
  Play,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Terminal,
  Cpu,
  Layers,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  Filter,
  Grid,
  List,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function CodingInterviewPage() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [activeTab, setActiveTab] = useState('tests'); // 'tests' | 'evaluation'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        const res = await api.coding.getProblems();
        setProblems(res.problems || []);
        if (res.problems?.length > 0) {
          const first = res.problems[0];
          setSelectedProblem(first);
          setCode(first.starterCode[language] || '');
        }
      } catch (err) {
        console.error("Could not load coding problems:", err);
      }
    }
    loadProblems();
  }, []);

  const handleSelectProblem = (prob) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode[language] || prob.starterCode.javascript || '');
    setTestResults(null);
    setEvaluation(null);
    setIsDrawerOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (selectedProblem?.starterCode?.[lang]) {
      setCode(selectedProblem.starterCode[lang]);
    }
  };

  const handleRunCode = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    try {
      const res = await api.coding.execute({
        problemId: selectedProblem.id,
        language,
        code
      });
      setTestResults(res);
      setActiveTab('tests');
    } catch (err) {
      alert(err.message || 'Execution error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleEvaluateSubmission = async () => {
    if (!selectedProblem) return;
    setIsEvaluating(true);
    try {
      let results = testResults;
      if (!results) {
        const execRes = await api.coding.execute({
          problemId: selectedProblem.id,
          language,
          code
        });
        results = execRes;
        setTestResults(execRes);
      }

      const evalRes = await api.coding.evaluate({
        problemId: selectedProblem.id,
        language,
        code,
        testResults: results.testResults
      });
      setEvaluation(evalRes.evaluation);
      setActiveTab('evaluation');
    } catch (err) {
      alert(err.message || 'Evaluation error');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Categories extraction
  const categories = ['All', ...new Set(problems.map(p => p.category))];

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
    const matchesCat = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesDiff && matchesCat;
  });

  const currentIndex = problems.findIndex(p => p.id === selectedProblem?.id);

  const handlePrevProblem = () => {
    if (currentIndex > 0) {
      handleSelectProblem(problems[currentIndex - 1]);
    }
  };

  const handleNextProblem = () => {
    if (currentIndex < problems.length - 1) {
      handleSelectProblem(problems[currentIndex + 1]);
    }
  };

  if (!selectedProblem) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" size="md">
            Coding Practice Studio ({problems.length} Challenges)
          </Badge>

          {/* Quick Problem Drawer / Browser Toggle */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Grid className="w-3.5 h-3.5 text-indigo-400" />
            Browse All {problems.length} Questions
          </button>

          {/* Quick Prev / Next Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-0.5">
            <button
              type="button"
              disabled={currentIndex <= 0}
              onClick={handlePrevProblem}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Previous problem"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-300 px-1.5">
              {currentIndex + 1} / {problems.length}
            </span>
            <button
              type="button"
              disabled={currentIndex >= problems.length - 1}
              onClick={handleNextProblem}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Next problem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Problem Selector & Language Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Problem Selector Dropdown */}
          <select
            value={selectedProblem.id}
            onChange={(e) => {
              const found = problems.find(p => p.id === e.target.value);
              if (found) handleSelectProblem(found);
            }}
            className="bg-slate-950 border border-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[260px] truncate"
          >
            {problems.map((p, idx) => (
              <option key={p.id} value={p.id}>
                {idx + 1}. {p.title} ({p.difficulty})
              </option>
            ))}
          </select>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
            {['javascript', 'python', 'java', 'cpp'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  language === lang
                    ? 'bg-indigo-600 text-white shadow-glow-primary font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'javascript' ? 'JS (Live)' : lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Coding Layout: Left Problem Statement, Right Editor & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Statement & Examples */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-card border border-slate-800 space-y-4 shadow-xl max-h-[82vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">{selectedProblem.category}</span>
                <span className="text-[10px] font-mono text-slate-500">• Accept {selectedProblem.acceptanceRate}</span>
              </div>
              <h2 className="text-lg font-bold text-white">{selectedProblem.title}</h2>
            </div>
            <Badge variant={selectedProblem.difficulty === 'Easy' ? 'success' : selectedProblem.difficulty === 'Hard' ? 'danger' : 'warning'}>
              {selectedProblem.difficulty}
            </Badge>
          </div>

          {/* Description */}
          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p className="whitespace-pre-line">{selectedProblem.description}</p>
          </div>

          {/* Examples */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Examples</h4>
            {selectedProblem.examples?.map((ex, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1 font-mono">
                <div><span className="text-slate-500 font-bold">Input:</span> <span className="text-slate-200">{ex.input}</span></div>
                <div><span className="text-emerald-400 font-bold">Output:</span> <span className="text-emerald-300">{ex.output}</span></div>
                {ex.explanation && (
                  <div className="text-[11px] text-slate-400 font-sans mt-1">{ex.explanation}</div>
                )}
              </div>
            ))}
          </div>

          {/* Hints */}
          {selectedProblem.hints && selectedProblem.hints.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Algorithmic Hint
              </span>
              <ul className="space-y-1 text-slate-300">
                {selectedProblem.hints.map((h, i) => (
                  <li key={i}>• {h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Optimal Complexity Target */}
          <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-800/30 text-xs space-y-1">
            <span className="text-[10px] uppercase font-mono text-indigo-300 font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Target Complexity
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <span>Time: <b>{selectedProblem.optimalComplexity?.time}</b></span>
              <span>Space: <b>{selectedProblem.optimalComplexity?.space}</b></span>
            </div>
            {selectedProblem.optimalComplexity?.notes && (
              <p className="text-[11px] text-slate-400 font-sans mt-1">{selectedProblem.optimalComplexity.notes}</p>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Console */}
        <div className="lg:col-span-7 space-y-4">
          {/* Code Editor Box */}
          <div className="rounded-2xl glass-card border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 font-medium">
                Solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'cpp'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                  {isRunning ? 'Running...' : 'Run Test Cases'}
                </button>
                <button
                  type="button"
                  onClick={handleEvaluateSubmission}
                  disabled={isEvaluating}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-glow-primary flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isEvaluating ? 'Evaluating with AI...' : 'Submit & AI Review'}
                </button>
              </div>
            </div>

            {/* Monospace Code Input */}
            <textarea
              rows={15}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full p-4 bg-[#0A0F1D] text-indigo-200 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed resize-y border-none"
            />
          </div>

          {/* Console Output & AI Complexity Evaluation */}
          <div className="rounded-2xl glass-card border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('tests')}
                  className={`text-xs font-bold pb-2 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'tests' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Test Case Results
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('evaluation')}
                  className={`text-xs font-bold pb-2 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'evaluation' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  AI Complexity & Quality Review
                </button>
              </div>
            </div>

            {activeTab === 'tests' && (
              <div className="space-y-2">
                {testResults ? (
                  <div className="space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={testResults.status === 'passed' ? 'success' : 'danger'}>
                        {testResults.status === 'passed' ? 'All Test Cases Passed 🎉' : 'Some Test Cases Failed'}
                      </Badge>
                    </div>
                    {testResults.testResults?.map((tc, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                          tc.passed ? 'bg-emerald-950/20 border-emerald-800/30 text-emerald-300' : 'bg-rose-950/20 border-rose-800/30 text-rose-300'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div>Input: <span className="text-slate-300">{tc.input}</span></div>
                          <div>Expected: <span className="text-emerald-400">{tc.expected}</span> | Actual: <span className="text-slate-200">{tc.actual}</span></div>
                        </div>
                        {tc.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-500">
                    Click <b>"Run Test Cases"</b> to execute your code against test suites.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'evaluation' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                {evaluation ? (
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 font-mono">Time Complexity</span>
                        <p className="text-sm font-bold font-mono text-indigo-300">{evaluation.timeComplexity}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 font-mono">Space Complexity</span>
                        <p className="text-sm font-bold font-mono text-cyan-300">{evaluation.spaceComplexity}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 font-mono">Code Quality</span>
                        <p className="text-sm font-bold font-mono text-emerald-300">{evaluation.codeQuality}/10</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 font-mono">Edge Cases</span>
                        <p className="text-sm font-bold font-mono text-purple-300">{evaluation.edgeCases}/10</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-bold text-white">AI Evaluator Feedback:</span>
                      <p className="text-slate-300 leading-relaxed">{evaluation.feedback}</p>
                    </div>

                    {evaluation.optimizationTips && (
                      <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-1">
                        <span className="text-[11px] font-bold text-indigo-300">Optimization Note:</span>
                        <p className="text-slate-300">{evaluation.optimizationTips}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-500">
                    Click <b>"Submit & AI Review"</b> to get algorithmic complexity and edge-case evaluations.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-in Modal / Drawer to Browse All 50 Questions */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Select From {problems.length} Interview Problems
                </h3>
                <p className="text-xs text-slate-400">
                  Search, filter, and practice curated challenges across all core computer science topics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Filters & Search */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search problem title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setFilterDifficulty(diff)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      filterDifficulty === diff
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Grid List */}
            <div className="p-4 overflow-y-auto space-y-2 divide-y divide-slate-800/40">
              {filteredProblems.map((prob, idx) => (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-between group ${
                    selectedProblem.id === prob.id
                      ? 'bg-indigo-950/40 border border-indigo-500/50'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-500 w-6">
                      {idx + 1}.
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {prob.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span>{prob.category}</span>
                        <span>•</span>
                        <span>Acceptance {prob.acceptanceRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={prob.difficulty === 'Easy' ? 'success' : prob.difficulty === 'Hard' ? 'danger' : 'warning'} size="sm">
                      {prob.difficulty}
                    </Badge>
                    {selectedProblem.id === prob.id && (
                      <Check className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                </div>
              ))}

              {filteredProblems.length === 0 && (
                <div className="py-12 text-center text-xs text-slate-500">
                  No problems matched your search criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
