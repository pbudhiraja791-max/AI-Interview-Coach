import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Bot, User, Mail, Lock, Briefcase, Award, ArrowRight, AlertCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    targetRole: 'Full Stack Developer',
    experienceLevel: '1-3 years'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFillSample = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setFormData({
      name: 'Siddhika Sharma',
      email: `siddhika.sharma${randomSuffix}@example.com`,
      password: 'password123',
      targetRole: 'Full Stack Developer',
      experienceLevel: '1-3 years'
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanPassword = formData.password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      setError('Please fill in all required fields (Name, Email, and Password).');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register({
        ...formData,
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword
      });
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-12 relative overflow-hidden">
      {/* Background celestial glow flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-sky-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <span className="text-xl">✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Create Your Account</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Start your AI-powered personalized interview preparation
          </p>
        </div>

        {/* Quick Fill Helper */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center flex items-center justify-between gap-2 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Fast test registration</span>
          </div>
          <button
            type="button"
            onClick={handleFillSample}
            className="py-1 px-3 rounded-full lumine-pill-secondary text-xs font-medium"
          >
            Fill Sample Details
          </button>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#060a1d]/90 border border-white/[0.08] space-y-5 shadow-2xl backdrop-blur-2xl">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Siddhika Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="siddhika@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create strong password (min 6 chars)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Target Role</label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60"
                >
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Experience</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-sky-400/60"
                >
                  <option value="Student">Student</option>
                  <option value="Fresher">Fresher (0 exp)</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3+ years">3+ years (Senior)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full lumine-pill-primary text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Profile...' : 'Complete Registration'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-400 font-semibold hover:underline">
              Sign In (Log In)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
