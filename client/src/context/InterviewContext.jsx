import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api.js';

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [activeInterview, setActiveInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  const startInterview = async (config) => {
    setIsAiThinking(true);
    try {
      const res = await api.interviews.setup(config);
      setActiveInterview(res.interview);
      setCurrentQuestionIndex(0);
      setCurrentEvaluation(null);
      return res.interview;
    } finally {
      setIsAiThinking(false);
    }
  };

  const loadInterview = async (id) => {
    const res = await api.interviews.getById(id);
    setActiveInterview(res.interview);
    const lastAnswered = res.interview.questions.findIndex(q => !q.candidateAnswer);
    setCurrentQuestionIndex(lastAnswered !== -1 ? lastAnswered : Math.max(0, res.interview.questions.length - 1));
    return res.interview;
  };

  const submitAnswer = async (answer) => {
    if (!activeInterview) return;
    setIsSubmitting(true);
    setIsAiThinking(true);
    try {
      const res = await api.interviews.submitAnswer(activeInterview._id, {
        questionIndex: currentQuestionIndex,
        answer
      });
      setActiveInterview(res.interview);
      setCurrentEvaluation(res.evaluation);
      return res.evaluation;
    } finally {
      setIsSubmitting(false);
      setIsAiThinking(false);
    }
  };

  const fetchNextQuestion = async () => {
    if (!activeInterview) return;
    setIsAiThinking(true);
    try {
      const res = await api.interviews.getNextQuestion(activeInterview._id);
      if (res.isCompleted) {
        return { isCompleted: true };
      }
      setActiveInterview(res.interview);
      setCurrentQuestionIndex(res.interview.questions.length - 1);
      setCurrentEvaluation(null);
      return res.question;
    } finally {
      setIsAiThinking(false);
    }
  };

  const finishInterview = async () => {
    if (!activeInterview) return;
    setIsAiThinking(true);
    try {
      const res = await api.interviews.complete(activeInterview._id);
      setActiveInterview(res.interview);
      return res.interview;
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <InterviewContext.Provider value={{
      activeInterview,
      currentQuestionIndex,
      isSubmitting,
      isAiThinking,
      currentEvaluation,
      startInterview,
      loadInterview,
      submitAnswer,
      fetchNextQuestion,
      finishInterview,
      setCurrentEvaluation
    }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
}
