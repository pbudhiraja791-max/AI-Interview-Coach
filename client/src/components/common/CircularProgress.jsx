import React from 'react';

export default function CircularProgress({
  value = 74,
  size = 120,
  strokeWidth = 10,
  label = "Readiness",
  sublabel = "",
  showPercentage = true,
  color = "indigo"
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const colorMap = {
    indigo: {
      stroke: "#6366F1",
      glow: "rgba(99, 102, 241, 0.4)",
      bg: "rgba(99, 102, 241, 0.15)"
    },
    emerald: {
      stroke: "#10B981",
      glow: "rgba(16, 185, 129, 0.4)",
      bg: "rgba(16, 185, 129, 0.15)"
    },
    cyan: {
      stroke: "#06B6D4",
      glow: "rgba(6, 182, 212, 0.4)",
      bg: "rgba(6, 182, 212, 0.15)"
    },
    amber: {
      stroke: "#F59E0B",
      glow: "rgba(245, 158, 11, 0.4)",
      bg: "rgba(245, 158, 11, 0.15)"
    },
    rose: {
      stroke: "#F43F5E",
      glow: "rgba(244, 63, 94, 0.4)",
      bg: "rgba(244, 63, 94, 0.15)"
    }
  };

  const selected = colorMap[color] || colorMap.indigo;

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated value progress circle with gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={selected.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: `drop-shadow(0 0 8px ${selected.glow})`
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {showPercentage && (
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
            {value}%
          </span>
        )}
        {label && (
          <span className="text-[11px] font-medium text-slate-400 -mt-0.5">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-[9px] text-slate-500 font-mono">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
