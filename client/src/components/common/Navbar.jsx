import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Sparkles,
  Flame,
  Zap,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bot,
  Layers,
  Code,
  FileText,
  Briefcase,
  TrendingUp,
  Calendar
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Layers },
    { name: 'Mock Interview', path: '/interview/setup', icon: Bot },
    { name: 'Job Matcher', path: '/job-description', icon: Briefcase },
    { name: 'Coding Studio', path: '/coding', icon: Code },
    { name: 'Practice', path: '/practice', icon: Zap },
    { name: 'Question Bank', path: '/questions', icon: Layers },
    { name: 'Progress', path: '/progress', icon: TrendingUp },
    { name: 'Study Plan', path: '/preparation-plan', icon: Calendar }
  ];

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-40 bg-[#0A0F1D]/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-glow-primary">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                AI Interview Coach
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PRO
                </span>
              </span>
              <span className="text-[11px] text-slate-400 -mt-1">Adaptive Career Engine</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 6).map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <Link to="/#features" className="hover:text-white transition-colors">Features</Link>
              <Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link to="/questions" className="hover:text-white transition-colors">Question Bank</Link>
              <Link to="/coding" className="hover:text-white transition-colors">Coding Challenges</Link>
            </nav>
          )}

          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Gamification Streak & XP */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 animate-pulse" />
                    <span>{user?.streakDays || 7}d Streak</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                    <Zap className="w-3.5 h-3.5 fill-indigo-400" />
                    <span>{user?.xp || 850} XP</span>
                  </div>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="hidden md:flex flex-col text-left">
                      <span className="text-xs font-semibold text-white leading-tight">{user?.name || 'Candidate'}</span>
                      <span className="text-[10px] text-indigo-400 font-medium leading-none">{user?.targetRole || 'Full Stack'}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-slate-800">
                        <p className="text-xs font-semibold text-white">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        My Profile & Target Role
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        AI Settings & API Keys
                      </Link>
                      <div className="border-t border-slate-800 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await demoLogin();
                    navigate('/dashboard');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 hover:bg-cyan-900/60 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3" />
                  1-Click Demo
                </button>
                {!isAuthPage && (
                  <>
                    <Link
                      to="/login"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-primary transition-all"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {isAuthenticated ? (
            <>
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200"
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
                <span>Signed in as <b>{user?.name}</b></span>
                <button onClick={handleLogout} className="text-rose-400 font-semibold">Log Out</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 rounded-lg bg-slate-900 text-slate-200 text-sm">Log In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm">Sign Up Free</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
