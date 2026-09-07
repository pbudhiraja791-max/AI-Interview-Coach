import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

                  {/* Onboarding */}
                  <Route
                    path="/onboarding"
                    element={
                      <ProtectedRoute>
                        <OnboardingPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Core Dashboard */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Interview Flow */}
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

                  {/* Job Matcher */}
                  <Route path="/resume" element={<Navigate to="/dashboard" replace />} />
                  <Route
                    path="/job-description"
                    element={
                      <ProtectedRoute>
                        <JobDescriptionPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Coding, Practice & Questions */}
                  <Route
                    path="/coding"
                    element={
                      <ProtectedRoute>
                        <CodingInterviewPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/practice"
                    element={
                      <ProtectedRoute>
                        <PracticePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/questions"
                    element={
                      <ProtectedRoute>
                        <QuestionBankPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Progress & Plan */}
                  <Route
                    path="/progress"
                    element={
                      <ProtectedRoute>
                        <ProgressPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/preparation-plan"
                    element={
                      <ProtectedRoute>
                        <PreparationPlanPage />
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
