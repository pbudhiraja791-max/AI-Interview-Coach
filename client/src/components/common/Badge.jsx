import React from 'react';

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const variantStyles = {
    default: 'bg-white/[0.05] text-slate-300 border-white/10',
    primary: 'bg-sky-500/10 text-sky-300 border-sky-400/25 shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)]',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/25 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-400/25 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]',
    danger: 'bg-rose-500/10 text-rose-300 border-rose-400/25 shadow-[0_0_15px_-3px_rgba(244,63,94,0.2)]',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/25 shadow-[0_0_15px_-3px_rgba(6,182,212,0.25)]',
    purple: 'bg-indigo-500/10 text-indigo-300 border-indigo-400/25 shadow-[0_0_15px_-3px_rgba(99,102,241,0.25)]'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full',
    md: 'text-xs px-3 py-1 rounded-full',
    lg: 'text-sm px-3.5 py-1.5 rounded-full font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border backdrop-blur-md ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size] || sizeStyles.md} ${className}`}>
      {children}
    </span>
  );
}
