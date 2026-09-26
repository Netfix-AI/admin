import React from 'react';
import {
  LayoutDashboard,
  Users,
  Cpu,
  KeyRound,
  FileCheck2,
  HelpCircle,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { AdminLogo } from '../common/AdminLogo';
import type { AdminNavItemId } from '../../types';

interface AdminSidebarProps {
  activeTab: AdminNavItemId;
  onSelectTab: (tab: AdminNavItemId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onSignOut: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onSignOut,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard' as AdminNavItemId, label: 'Overview', icon: LayoutDashboard },
    { id: 'users' as AdminNavItemId, label: 'Users', icon: Users, badge: '12.4k' },
    { id: 'agents' as AdminNavItemId, label: 'AI Agents', icon: Cpu, badge: '26' },
    { id: 'access-requests' as AdminNavItemId, label: 'Access Requests', icon: KeyRound, badge: '18', badgeColor: 'bg-admin-amber/20 text-admin-amber' },
    { id: 'audit' as AdminNavItemId, label: 'Audit Trail', icon: FileCheck2 },
    { id: 'support' as AdminNavItemId, label: 'Support & Issues', icon: HelpCircle, badge: '24' },
    { id: 'profile' as AdminNavItemId, label: 'My Profile', icon: User },
    { id: 'settings' as AdminNavItemId, label: 'Platform Settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 space-y-6">
      {/* Top Brand & Collapse Button */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <AdminLogo collapsed={collapsed} />
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Item List */}
        <nav aria-label="Admin Control Center Navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-admin-teal/15 via-[#111624] to-transparent text-white border border-admin-teal/30 shadow-[0_0_15px_rgba(32,224,194,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-admin-teal shadow-[0_0_8px_#20E0C2]" />
                )}

                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-admin-teal' : 'text-slate-400 group-hover:text-slate-200'}`} />

                {!collapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      item.badgeColor || 'bg-white/[0.06] text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status & Admin Sign Out */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-admin-green animate-pulse" />
                System Status
              </span>
              <span className="text-admin-green font-mono">Operational</span>
            </div>
            <p className="text-[10px] text-slate-500">All 7 enterprise domains & AI node clusters active.</p>
          </div>
        )}

        <button
          onClick={onSignOut}
          title={collapsed ? 'Sign Out' : undefined}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Sign Out</span>}
          </span>
          {!collapsed && <ShieldAlert className="w-3.5 h-3.5 opacity-60" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-[#0C101A]/95 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 z-30 shrink-0 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onCloseMobile}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-72 h-full bg-[#0C101A] border-r border-white/10 shadow-2xl animate-in slide-in-from-left duration-200"
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
