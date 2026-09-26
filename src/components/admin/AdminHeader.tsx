import React, { useState } from 'react';
import { Menu, Search, Bell, Activity, X, User } from 'lucide-react';
import type { AdminNavItemId } from '../../types';

interface AdminHeaderProps {
  activeTab: AdminNavItemId;
  onOpenMobileSidebar: () => void;
  onSelectTab: (tab: AdminNavItemId) => void;
  onSignOut: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onSelectTab,
  onSignOut,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getPageTitle = (tab: AdminNavItemId) => {
    switch (tab) {
      case 'dashboard':
        return 'Overview & Command Dashboard';
      case 'users':
        return 'Platform Users Management';
      case 'agents':
        return 'AI Agents & Orchestrator';
      case 'access-requests':
        return 'Role Access Requests';
      case 'audit':
        return 'System Audit Trail';
      case 'support':
        return 'User Support & Issue Tickets';
      case 'profile':
        return 'Administrator Profile';
      case 'settings':
        return 'Platform Settings & Integrations';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="relative z-20 w-full bg-[#0C101A]/80 border-b border-white/10 backdrop-blur-xl px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle & Breadcrumb Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] border border-white/10"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
            <span>NETFIX AI ADMIN</span>
            <span>/</span>
            <span className="text-admin-teal capitalize">{activeTab.replace('-', ' ')}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none mt-0.5">
            {getPageTitle(activeTab)}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar Placeholder */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users, agents, access requests, logs..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-admin-teal focus:ring-1 focus:ring-admin-teal/40 transition-all"
          />
        </div>
      </div>

      {/* Right: Live Status, Notifications Bell & Admin Avatar */}
      <div className="flex items-center gap-3">
        {/* System Live Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-admin-green/10 border border-admin-green/20 text-xs font-semibold text-admin-green">
          <Activity className="w-3.5 h-3.5 text-admin-green animate-pulse" />
          <span>Live Systems</span>
        </div>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            aria-expanded={notificationsOpen}
            aria-label="Admin Notifications"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white relative transition-colors focus:outline-none"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-admin-amber absolute top-2 right-2 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-admin-amber absolute top-2 right-2" />
          </button>

          {/* Notifications Glass Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0C101A] border border-white/15 shadow-2xl p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150 z-50">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Admin Notifications</h3>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-admin-amber/10 border border-admin-amber/20 text-slate-200">
                  <div className="font-bold text-admin-amber mb-0.5">18 Access Requests Pending</div>
                  <p className="text-[11px] text-slate-400">Requires administrator review & approval.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-admin-teal/10 border border-admin-teal/20 text-slate-200">
                  <div className="font-bold text-admin-teal mb-0.5">Ultron Orchestrator Active</div>
                  <p className="text-[11px] text-slate-400">Multi-agent legal routing operating smoothly.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-200">
                  <div className="font-semibold text-white mb-0.5">New Support Issue #TKT-1</div>
                  <p className="text-[11px] text-slate-400">Assigned from Rohan Mehta (Management).</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            aria-expanded={profileMenuOpen}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-admin-teal to-admin-indigo flex items-center justify-center font-bold text-xs text-white shadow-md">
              AD
            </div>
            <span className="hidden sm:inline text-xs font-bold text-white pr-1">Admin</span>
          </button>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0C101A] border border-white/15 shadow-2xl p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50 text-xs">
              <button
                onClick={() => {
                  onSelectTab('profile');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-left transition-colors"
              >
                <User className="w-3.5 h-3.5 text-admin-teal" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setProfileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-left transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-admin-indigo" />
                <span>System Health</span>
              </button>
              <div className="border-t border-white/10 pt-1" />
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-left transition-colors font-semibold"
              >
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
