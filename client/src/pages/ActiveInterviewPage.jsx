import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext.jsx';
import {
  Bot,
  Send,
  Sparkles,
  Clock,
  HelpCircle,
  SkipForward,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Zap,
  BookOpen,
  FileText
} from 'lucide-react';
import AvatarInterviewer from '../components/interview/AvatarInterviewer.jsx';
import AnswerQualityPanel from '../components/interview/VoiceMetricsPanel.jsx';
import LiveFeedbackDrawer from '../components/interview/LiveFeedbackDrawer.jsx';
import Badge from '../components/common/Badge.jsx';

export default function ActiveInterviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    activeInterview,
    currentQuestionIndex,
    isSubmitting,
    isAiThinking,
    currentEvaluation,
    loadInterview,
    submitAnswer,
    fetchNextQuestion,
    finishInterview,
    setCurrentEvaluation
  } = useInterview();

  const [textAnswer, setTextAnswer] = useState('');
  const [showExpectedConcepts, setShowExpectedConcepts] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Load interview on mount
  useEffect(() => {
    if (id) {
      loadInterview(id).catch((err) => {
        console.error("Could not load interview:", err);
      });
    }
  }, [id]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = activeInterview?.questions?.[currentQuestionIndex];
  const isLastQuestion = activeInterview ? currentQuestionIndex >= (activeInterview.totalQuestions - 1) : false;

  // Determine avatar state
  const getAvatarState = () => {
    if (isAiThinking || isSubmitting) return 'thinking';
    if (currentEvaluation) return 'evaluated';
    return 'idle';
  };

  const handleSubmit = async () => {
    const answerToSubmit = textAnswer.trim();
    if (!answerToSubmit) return;

    await submitAnswer(answerToSubmit);
  };

  const handleNext = async () => {
    setTextAnswer('');
    setShowExpectedConcepts(false);
    setCurrentEvaluation(null);

    const next = await fetchNextQuestion();
    if (next?.isCompleted) {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await finishInterview();
    navigate(`/interview/${activeInterview._id}/results`);
  };

  // Quick sample answer insertion for rapid testing & demonstration
  const handleInsertSampleAnswer = (type = 'strong') => {
    let sample = '';
    if (type === 'strong') {
      sample = "In production architectures, we approach this by separating read and write workloads. We leverage dynamic caching with Redis cluster, apply database indexing on composite keys, and enforce thread-safe state management to ensure sub-millisecond response times under high concurrency.";
    } else {
      sample = "Basically, we use a hash map and loops to find the answer. It's fast and simple.";
    }
    setTextAnswer(sample);
  };

  if (!activeInterview || !currentQ) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-sky-400 border-t-transparent animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Initializing adaptive interview room...</p>
      </div>
    );
  }

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative">
      {/* Background celestial ambient flare */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      {/* 1. TOP STATUS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] backdrop-blur-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <Badge variant="primary" size="md">
            Question {currentQuestionIndex + 1} of {activeInterview.totalQuestions}
          </Badge>
          <span className="text-xs font-semibold text-white truncate">{activeInterview.role}</span>
          <span className="hidden sm:inline text-xs text-slate-500">•</span>
          <Badge variant="cyan" size="sm">{activeInterview.interviewType}</Badge>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>
          <button
            onClick={handleFinish}
            className="px-3.5 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition-all cursor-pointer"
          >
            End Interview
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#030712] rounded-full overflow-hidden border border-white/[0.06] -mt-3">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / activeInterview.totalQuestions) * 100}%` }}
        />
      </div>

      {/* 2. MAIN SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* LEFT COLUMN: Interviewer Avatar & Answer Guidance Panel */}
        <div className="lg:col-span-4 space-y-4">
          <AvatarInterviewer
            state={getAvatarState()}
            personality={activeInterview.personality}
            difficulty={activeInterview.currentDifficultyScore}
          />

          <AnswerQualityPanel
            answer={textAnswer}
            interviewType={activeInterview.interviewType}
            expectedConcepts={currentQ.expectedConcepts}
          />
        </div>

        {/* RIGHT COLUMN: Question Card & Answer Studio */}
        <div className="lg:col-span-8 space-y-5">
          {/* Current Question Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] border-t-sky-400/30 space-y-3 shadow-xl relative overflow-hidden backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-sky-300 font-bold border border-sky-400/30">
                  Topic: {currentQ.topic || 'Engineering Fundamentals'}
                </span>
                {currentQ.isFollowUp && (
                  <Badge variant="warning" size="sm">Adaptive Follow-Up</Badge>
                )}
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              "{currentQ.questionText}"
            </h2>

            {/* Expected Concepts Hint */}
            {currentQ.expectedConcepts && currentQ.expectedConcepts.length > 0 && (
              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowExpectedConcepts(!showExpectedConcepts)}
                  className="text-[11px] text-slate-400 hover:text-sky-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  {showExpectedConcepts ? 'Hide Expected Concepts' : 'What is the interviewer looking for? (Concepts Hint)'}
                </button>

                {showExpectedConcepts && (
                  <ul className="mt-2 text-xs text-slate-300 space-y-1 bg-[#030712] p-3.5 rounded-2xl border border-white/[0.08] animate-in fade-in duration-150">
                    {currentQ.expectedConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Real-time Answer Feedback Drawer (when evaluated) */}
          {currentEvaluation ? (
            <LiveFeedbackDrawer
              evaluation={currentEvaluation}
              onNextQuestion={handleNext}
              isLastQuestion={isLastQuestion}
              onFinish={handleFinish}
            />
          ) : (
            /* Answer Studio */
            <div className="p-6 sm:p-7 rounded-3xl bg-[#060a1d]/85 border border-white/[0.08] space-y-4 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">Your Answer Studio</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-[11px] text-slate-400">
                    {textAnswer.trim().split(/\s+/).filter(Boolean).length} words typed
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Structured Response</span>
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1.5">
                <textarea
                  rows={8}
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Type or paste your complete technical answer here... Explain your architecture, algorithms, trade-offs, or STAR context."
                  className="w-full p-4 rounded-2xl bg-[#030712] border border-white/10 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-sky-400/60 leading-relaxed font-sans"
                />

                {/* Quick Sample Answers for Testing */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <span>Quick test sample:</span>
                    <button
                      type="button"
                      onClick={() => handleInsertSampleAnswer('strong')}
                      className="px-3 py-1 rounded-full lumine-pill-secondary text-xs font-medium cursor-pointer"
                    >
                      + Exemplary Answer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertSampleAnswer('brief')}
                      className="px-3 py-1 rounded-full lumine-pill-secondary text-xs font-medium cursor-pointer"
                    >
                      + Basic Answer
                    </button>
                  </div>

                  {textAnswer && (
                    <button
                      type="button"
                      onClick={() => setTextAnswer('')}
                      className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      Clear Answer Box
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full lumine-pill-secondary text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  Skip Question
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={isSubmitting || !textAnswer.trim()}
                    onClick={handleSubmit}
                    className={`w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-xs shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isSubmitting || !textAnswer.trim()
                        ? 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
                        : 'lumine-pill-primary'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                        AI Evaluating Answer...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Answer For AI Evaluation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
