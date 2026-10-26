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
    { name: 'Coding Studio', path: '/coding', icon: Code },
    { name: 'Practice', path: '/practice', icon: Zap },
    { name: 'Question Bank', path: '/questions', icon: Layers },
    { name: 'Progress', path: '/progress', icon: TrendingUp }
  ];

  const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - NEONE inspired minimalist star brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <div className="w-full h-full bg-[#030712] rounded-[7px] flex items-center justify-center">
                <span className="text-sky-400 font-bold text-sm group-hover:scale-110 transition-transform">✦</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-wider text-white">
                AI COACH
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white border border-sky-400/30 font-semibold shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm text-slate-300">
              <Link to="/#features" className="hover:text-white transition-colors">Features</Link>
              <Link to="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link to="/questions" className="hover:text-white transition-colors">Question Bank</Link>
              <Link to="/coding" className="hover:text-white transition-colors">Coding Studio</Link>
              <Link to="/practice" className="hover:text-white transition-colors">Practice</Link>
            </nav>
          )}

          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 px-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="hidden md:flex flex-col text-left">
                      <span className="text-xs font-medium text-white leading-tight">{user?.name || 'Candidate'}</span>
                      <span className="text-[10px] text-sky-400 font-medium leading-none">{user?.targetRole || 'Full Stack'}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#070c1e] border border-white/10 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 backdrop-blur-2xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-white/[0.06]">
                        <p className="text-xs font-semibold text-white">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-sky-400" />
                        My Profile & Target Role
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-sky-400" />
                        AI Settings & API Keys
                      </Link>
                      <div className="border-t border-white/[0.06] my-1"></div>
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
              <div className="flex items-center gap-2.5">
                <button
                  onClick={async () => {
                    await demoLogin();
                    navigate('/dashboard');
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-400/20 hover:bg-sky-500/20 hover:border-sky-400/40 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  1-Click Demo
                </button>
                {!isAuthPage && (
                  <>
                    <Link
                      to="/login"
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="lumine-pill-primary px-4 py-1.5 text-xs font-semibold"
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
              className="xl:hidden p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#05091c] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200 hover:bg-white/[0.08]"
                    >
                      <Icon className="w-4 h-4 text-sky-400" />
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
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
                <Link to="/questions" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200">
                  <Layers className="w-4 h-4 text-sky-400" /> Question Bank
                </Link>
                <Link to="/coding" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200">
                  <Code className="w-4 h-4 text-emerald-400" /> Coding Studio
                </Link>
                <Link to="/practice" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200">
                  <Zap className="w-4 h-4 text-amber-400" /> Practice Drills
                </Link>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await demoLogin();
                    navigate('/dashboard');
                  }}
                  className="w-full text-center py-2.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 1-Click Fast Demo Login
                </button>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-200 text-xs font-medium">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-full lumine-pill-primary text-xs font-semibold">Get Started</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
