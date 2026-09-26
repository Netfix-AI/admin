import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Lock, Activity } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.');
      return;
    }
    showToast('Administrator password updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0C101A] border border-admin-teal/40 text-xs font-semibold text-admin-teal shadow-2xl animate-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">My Profile</h2>
        <p className="text-xs sm:text-sm text-slate-400">Manage administrator account credentials and view personal activity log.</p>
      </div>

      {/* Profile Info Card */}
      <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-admin-teal to-admin-indigo flex items-center justify-center font-extrabold text-2xl text-slate-950 shadow-xl border border-white/20">
          AD
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white">Administrator</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-admin-teal/15 text-admin-teal border border-admin-teal/30">
              Super Admin
            </span>
          </div>
          <p className="text-xs text-slate-300">admin@netfixai.com • +91 98765 43210</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-admin-green" />
            <span>Full System Governance Permission Level</span>
          </div>
        </div>
      </div>

      {/* Grid: Change Password & Personal Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password Panel */}
        <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-admin-teal" />
            <span>Change Password</span>
          </h3>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Current Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-admin-teal"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-admin-teal"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-admin-teal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-admin-teal to-admin-blue hover:opacity-95 transition-all shadow-md shadow-admin-teal/20"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Admin Personal Activity Log */}
        <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-admin-indigo" />
            <span>My Recent Admin Activity</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                <span>21 Sep 2026 14:10</span>
                <span className="text-admin-teal">Access Control</span>
              </div>
              <span className="font-bold text-white block">Approved Access Request for Teja Reddy</span>
              <span className="text-slate-400 text-[11px]">Property Record #PR-9042</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                <span>20 Sep 2026 18:20</span>
                <span className="text-rose-400">User Management</span>
              </div>
              <span className="font-bold text-white block">Suspended User Account (priya@example.com)</span>
              <span className="text-slate-400 text-[11px]">Compliance flag resolution</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                <span>20 Sep 2026 15:10</span>
                <span className="text-admin-indigo">Agent Config</span>
              </div>
              <span className="font-bold text-white block">Updated Ultron AI Orchestrator Parameters</span>
              <span className="text-slate-400 text-[11px]">Local node routing optimization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
