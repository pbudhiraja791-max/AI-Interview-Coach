import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { InterviewProvider } from './context/InterviewContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// Common Components
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InterviewSetupPage from './pages/InterviewSetupPage.jsx';
import ActiveInterviewPage from './pages/ActiveInterviewPage.jsx';
import InterviewResultsPage from './pages/InterviewResultsPage.jsx';
import JobDescriptionPage from './pages/JobDescriptionPage.jsx';
import CodingInterviewPage from './pages/CodingInterviewPage.jsx';
import PracticePage from './pages/PracticePage.jsx';
import QuestionBankPage from './pages/QuestionBankPage.jsx';
import ProgressPage from './pages/ProgressPage.jsx';
import PreparationPlanPage from './pages/PreparationPlanPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

import { useEffect } from 'react';

function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1D]">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <ThemeProvider>
        <AuthProvider>
          <InterviewProvider>
            <div className="min-h-screen flex flex-col bg-[#0A0F1D] text-slate-100 selection:bg-indigo-500 selection:text-white">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Core Modules - Accessible to all (Guests & Authenticated) */}
                  <Route path="/questions" element={<QuestionBankPage />} />
                  <Route path="/coding" element={<CodingInterviewPage />} />
                  <Route path="/practice" element={<PracticePage />} />
                  <Route path="/job-description" element={<JobDescriptionPage />} />
                  <Route path="/resume" element={<Navigate to="/job-description" replace />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/preparation-plan" element={<PreparationPlanPage />} />

                  {/* Onboarding & Dashboard */}
                  <Route
                    path="/onboarding"
                    element={
                      <ProtectedRoute>
                        <OnboardingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Mock Interview Simulation Flow */}
                  <Route
                    path="/interview/setup"
                    element={
                      <ProtectedRoute>
                        <InterviewSetupPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/interview/:id"
                    element={
                      <ProtectedRoute>
                        <ActiveInterviewPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/interview/:id/results"
                    element={
                      <ProtectedRoute>
                        <InterviewResultsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Profile & Settings */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </InterviewProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
