import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  User,
  Mail,
  Briefcase,
  Layers,
  Award,
  Check,
  Save,
  Shield
} from 'lucide-react';
import Badge from '../components/common/Badge.jsx';

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Sharma',
    targetRole: user?.targetRole || 'Full Stack Developer',
    experienceLevel: user?.experienceLevel || '1-3 years',
    skills: user?.skills?.join(', ') || 'React, Node.js, Java, SQL, TypeScript, System Design',
    interviewGoals: user?.interviewGoals?.join(', ') || 'Master System Design, Improve STAR behavioral stories'
  });

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        name: formData.name,
        targetRole: formData.targetRole,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        interviewGoals: formData.interviewGoals.split(',').map(g => g.trim()).filter(Boolean)
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      alert(err.message || 'Profile update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="space-y-1.5 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Candidate Profile</Badge>
          <span className="text-xs text-slate-400">Target Role & Specialization</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Manage Candidate Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Keep your role expectations, skill tags, and experience level calibrated for AI mock interviews.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-800 space-y-6 shadow-xl">
        {isSaved && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Profile updated successfully! All future mock interviews will reflect these changes.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Target Specialization</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Experience Seniority</label>
          <select
            value={formData.experienceLevel}
            onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="Student">Student</option>
            <option value="Fresher">Fresher (0 exp)</option>
            <option value="0-1 years">0-1 years</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3+ years">3+ years (Senior / Staff)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Technical Skills (Comma separated)</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="React, Node.js, Java, SQL, System Design, Docker..."
            className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Primary Preparation Goals</label>
          <textarea
            rows={3}
            value={formData.interviewGoals}
            onChange={(e) => setFormData({ ...formData, interviewGoals: e.target.value })}
            placeholder="e.g. Master System Design, improve STAR behavioral stories..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-primary transition-all flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            {loading ? 'Saving Changes...' : 'Save Profile Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
