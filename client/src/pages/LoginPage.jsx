import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Bot, Sparkles, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFillDemo = () => {
    setEmail('parth@example.com');
    setPassword('demo12345');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login({ email: cleanEmail, password: cleanPassword });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Check email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Demo sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      {/* Background celestial glow flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-sky-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <span className="text-xl">✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Sign in to continue your personalized interview prep
          </p>
        </div>

        {/* Demo Candidate Fast-Track Card */}
        <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 shadow-xl text-center space-y-2.5 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Quick Demo Candidate Access
          </div>
          <p className="text-[11px] text-slate-300">
            Pre-configured with <b className="text-white">Parth (Full Stack Engineer)</b> profile, past mock sessions & analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="flex-1 py-2 px-3 rounded-full lumine-pill-primary text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Demo Login
            </button>
            <button
              type="button"
              onClick={handleFillDemo}
              className="py-2 px-3.5 rounded-full lumine-pill-secondary text-xs font-medium"
            >
              Fill Credentials
            </button>
          </div>
          <div className="text-[10px] text-slate-400 font-mono pt-1">
            Demo: parth@example.com | password: demo12345
          </div>
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#060a1d]/90 border border-white/[0.08] space-y-5 shadow-2xl backdrop-blur-2xl">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parth@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-sky-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full lumine-pill-primary text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-sky-400 font-semibold hover:underline">
              Create an account (Sign Up)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

