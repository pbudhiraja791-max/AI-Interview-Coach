const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('ai_coach_token');
  const customKey = localStorage.getItem('ai_coach_gemini_key');

  const headers = {
    ...options.headers
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Inject custom API key if provided by user in settings
  if (customKey && options.body && !(options.body instanceof FormData)) {
    try {
      const parsed = JSON.parse(options.body);
      if (!parsed.customApiKey) {
        parsed.customApiKey = customKey;
        options.body = JSON.stringify(parsed);
      }
    } catch (e) {
      // not json, ignore
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred during API request');
  }

  return data;
}

export const api = {
  // Health
  checkHealth: () => request('/health'),

  // Auth
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    demoLogin: () => request('/auth/demo-login', { method: 'POST' }),
    getProfile: () => request('/auth/profile'),
    updateProfile: (updates) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(updates) }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (payload) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) })
  },

  // Interviews
  interviews: {
    setup: (config) => request('/interviews/setup', { method: 'POST', body: JSON.stringify(config) }),
    getById: (id) => request(`/interviews/${id}`),
    getNextQuestion: (id) => request(`/interviews/${id}/next-question`, { method: 'POST', body: JSON.stringify({}) }),
    submitAnswer: (id, payload) => request(`/interviews/${id}/answer`, { method: 'POST', body: JSON.stringify(payload) }),
    complete: (id) => request(`/interviews/${id}/complete`, { method: 'POST', body: JSON.stringify({}) }),
    list: () => request('/interviews')
  },


  // Jobs
  jobs: {
    analyze: (formData) => request('/jobs/analyze', { method: 'POST', body: formData }),
    get: () => request('/jobs')
  },

  // Coding
  coding: {
    getProblems: () => request('/coding/problems'),
    getProblemById: (id) => request(`/coding/problems/${id}`),
    execute: (payload) => request('/coding/execute', { method: 'POST', body: JSON.stringify(payload) }),
    evaluate: (payload) => request('/coding/evaluate', { method: 'POST', body: JSON.stringify(payload) })
  },

  // Progress & Dashboard
  progress: {
    getDashboard: () => request('/progress/dashboard'),
    getAnalytics: () => request('/progress/analytics'),
    getPlan: () => request('/progress/plan'),
    generatePlan: () => request('/progress/plan/generate', { method: 'POST', body: JSON.stringify({}) }),
    updateTask: (payload) => request('/progress/plan/task', { method: 'PUT', body: JSON.stringify(payload) })
  },

  // Question Bank & Practice
  questions: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/questions${query ? `?${query}` : ''}`);
    },
    getBookmarked: () => request('/questions/bookmarked'),
    toggleBookmark: (questionId) => request(`/questions/${questionId}/bookmark`, { method: 'POST' }),
    practiceAnswer: (payload) => request('/questions/practice-answer', { method: 'POST', body: JSON.stringify(payload) })
  }
};
