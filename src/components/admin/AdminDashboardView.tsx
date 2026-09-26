import React, { useState } from 'react';
import {
  Users,
  Cpu,
  KeyRound,
  HelpCircle,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import type { AdminNavItemId } from '../../types';

interface AdminDashboardViewProps {
  onNavigateTab: (tab: AdminNavItemId) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigateTab }) => {
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome Greeting & Live Date Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-admin-indigo/15 via-[#0C101A] to-admin-teal/15 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-admin-teal">
              COMMAND & CONTROL CENTER
            </span>
            <span className="w-2 h-2 rounded-full bg-admin-green animate-pulse" />
            <span className="text-[10px] font-mono text-admin-green uppercase">Live Session</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, Admin!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Here's what's happening across the NETFIX AI multi-agent platform today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-white">Mon, 21 Sep 2026</div>
            <div className="text-[11px] text-slate-400 font-mono">14:30:15 IST</div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-admin-green/10 border border-admin-green/30 text-xs font-semibold text-admin-green flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Operational</span>
          </div>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Total Users */}
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Total Users</span>
            <Users className="w-4 h-4 text-admin-teal" />
          </div>
          <div className="text-2xl font-black text-white font-mono">12,482</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="text-admin-green font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+8.4%</span> vs last mo.
          </div>
        </div>

        {/* KPI 2: New Registrations */}
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>New Registrations</span>
            <TrendingUp className="w-4 h-4 text-admin-indigo" />
          </div>
          <div className="text-2xl font-black text-white font-mono">328</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="text-admin-green font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />+12.1%</span> this week
          </div>
        </div>

        {/* KPI 3: Open Support Issues */}
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Open Issues</span>
            <HelpCircle className="w-4 h-4 text-admin-blue" />
          </div>
          <div className="text-2xl font-black text-white font-mono">24</div>
          <div className="text-[10px] text-slate-400">
            <span className="text-admin-amber font-bold">12 In Progress</span>
          </div>
        </div>

        {/* KPI 4: Pending Access Requests with Review Action */}
        <div className="p-4 rounded-2xl bg-admin-amber/10 border border-admin-amber/30 backdrop-blur-xl space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs font-semibold text-admin-amber">
            <span>Pending Access</span>
            <KeyRound className="w-4 h-4 text-admin-amber" />
          </div>
          <div className="text-2xl font-black text-white font-mono">18</div>
          <button
            onClick={() => onNavigateTab('access-requests')}
            className="w-full mt-1 text-[11px] font-bold text-admin-amber hover:text-white bg-admin-amber/20 hover:bg-admin-amber/30 py-1 px-2 rounded-lg transition-all flex items-center justify-center gap-1"
          >
            <span>Review Requests</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* KPI 5: Active AI Agent Tasks */}
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Active AI Tasks</span>
            <Cpu className="w-4 h-4 text-admin-teal animate-pulse" />
          </div>
          <div className="text-2xl font-black text-white font-mono">42</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-admin-teal animate-ping" />
            <span className="text-admin-teal font-bold">20 Agents Active</span>
          </div>
        </div>

        {/* KPI 6: System Health Status */}
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl space-y-2 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>System Health</span>
            <Activity className="w-4 h-4 text-admin-green" />
          </div>
          <div className="text-2xl font-black text-admin-green font-mono">99.8%</div>
          <div className="text-[10px] text-slate-400">
            GST API: <span className="text-admin-amber font-bold">Warning</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Panel & User Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Platform Activity Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-white">Platform Activity & AI Volume</h3>
              <p className="text-xs text-slate-400">User sessions, AI agent queries, and document processing volume.</p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold">
              {(['7d', '30d', '90d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1 rounded-lg uppercase font-mono transition-all ${
                    timeFilter === t ? 'bg-admin-teal text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Multi-Series Area Chart Visual */}
          <div className="h-64 w-full relative pt-4 flex flex-col justify-between">
            <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#20E0C2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#20E0C2" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7567FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7567FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Area 1: AI Task Volume */}
              <path
                d="M0,120 Q75,60 150,90 T300,50 T450,80 T500,40 L500,150 L0,150 Z"
                fill="url(#aiGrad)"
              />
              <path
                d="M0,120 Q75,60 150,90 T300,50 T450,80 T500,40"
                fill="none"
                stroke="#7567FF"
                strokeWidth="2.5"
              />

              {/* Area 2: User Activity */}
              <path
                d="M0,130 Q75,90 150,40 T300,70 T450,30 T500,20 L500,150 L0,150 Z"
                fill="url(#userGrad)"
              />
              <path
                d="M0,130 Q75,90 150,40 T300,70 T450,30 T500,20"
                fill="none"
                stroke="#20E0C2"
                strokeWidth="3"
              />
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
              <span>Jan 1</span>
              <span>Jan 5</span>
              <span>Jan 10</span>
              <span>Jan 15</span>
              <span>Jan 20</span>
              <span>Jan 25</span>
              <span>Jan 30</span>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-6 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-admin-teal" />
              <span>User Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-admin-indigo" />
              <span>AI Tasks Processed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-admin-blue" />
              <span>Documents Ingested</span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: User Role Distribution & System Health Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Role Distribution Card */}
          <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
            <h3 className="text-base font-bold text-white">User Role Distribution</h3>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Client</span>
                  <span className="font-mono text-admin-teal font-bold">32% (3,994)</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-admin-teal rounded-full w-[32%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Internal Employee</span>
                  <span className="font-mono text-admin-indigo font-bold">20% (2,496)</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-admin-indigo rounded-full w-[20%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Tenant / Vendor</span>
                  <span className="font-mono text-admin-blue font-bold">18% (2,246)</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-admin-blue rounded-full w-[18%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Management / Exec</span>
                  <span className="font-mono text-admin-green font-bold">12% (1,497)</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-admin-green rounded-full w-[12%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Advocate / Counsel</span>
                  <span className="font-mono text-admin-amber font-bold">10% (1,248)</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-admin-amber rounded-full w-[10%]" />
                </div>
              </div>
            </div>
          </div>

          {/* System Health Card */}
          <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">System Health</h3>
              <span className="text-xs text-admin-green font-mono font-bold">99.8% Up</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-300">Authentication</span>
                <span className="text-admin-green font-bold">Operational</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-300">AI Agent Layer</span>
                <span className="text-admin-green font-bold">Operational</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-admin-amber/10 border border-admin-amber/20">
                <span className="text-slate-200">GST API Gateway</span>
                <span className="text-admin-amber font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Warning</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
                <span className="text-slate-300">Email & OTP Service</span>
                <span className="text-admin-green font-bold">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agents & Pending Access Requests Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Agent Activity Glass Panel */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-admin-teal" />
              <span>AI Agent Activity</span>
            </h3>
            <button
              onClick={() => onNavigateTab('agents')}
              className="text-xs font-semibold text-admin-teal hover:text-white transition-colors"
            >
              View All 26 Agents →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">Agent Name</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 font-mono">Tasks Today</th>
                  <th className="py-2.5 px-3 font-mono">Avg Resp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                    <span>Ultron AI Orchestrator</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-admin-indigo/20 text-admin-indigo border border-admin-indigo/30 font-mono">CORE</span>
                  </td>
                  <td className="py-2.5 px-3"><span className="text-admin-green font-semibold">Active</span></td>
                  <td className="py-2.5 px-3 font-mono">210</td>
                  <td className="py-2.5 px-3 font-mono">1.9s</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">Legal Research Agent</td>
                  <td className="py-2.5 px-3"><span className="text-admin-green font-semibold">Active</span></td>
                  <td className="py-2.5 px-3 font-mono">124</td>
                  <td className="py-2.5 px-3 font-mono">1.8s</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">Tax Intelligence Agent</td>
                  <td className="py-2.5 px-3"><span className="text-admin-green font-semibold">Active</span></td>
                  <td className="py-2.5 px-3 font-mono">98</td>
                  <td className="py-2.5 px-3 font-mono">2.2s</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">Document Intake Agent</td>
                  <td className="py-2.5 px-3"><span className="text-admin-amber font-semibold">Processing</span></td>
                  <td className="py-2.5 px-3 font-mono">176</td>
                  <td className="py-2.5 px-3 font-mono">1.4s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Access Requests Glass Table Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-admin-amber" />
              <span>Pending Access Queue</span>
            </h3>
            <button
              onClick={() => onNavigateTab('access-requests')}
              className="text-xs font-semibold text-admin-amber hover:text-white transition-colors"
            >
              Review All →
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Teja Reddy (Client)</span>
                <span className="text-[11px] text-slate-400">Property Record #PR-9042 • 30 days</span>
              </div>
              <button
                onClick={() => onNavigateTab('access-requests')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90 transition-colors"
              >
                Review
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Priya Sharma (Advocate)</span>
                <span className="text-[11px] text-slate-400">Case Documents #CS-4012 • 90 days</span>
              </div>
              <button
                onClick={() => onNavigateTab('access-requests')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90 transition-colors"
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline: Recent Admin Activity */}
      <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-admin-indigo" />
          <span>Recent Administrative Activity</span>
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-admin-green" />
              <div>
                <span className="font-semibold text-white block">Approved Access Request for Teja Reddy</span>
                <span className="text-[11px] text-slate-400">Granted 30-day access to Property Record #PR-9042</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">14:10 IST</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-admin-indigo" />
              <div>
                <span className="font-semibold text-white block">Exported System Audit Log Summary</span>
                <span className="text-[11px] text-slate-400">Generated PDF report for Q3 compliance filing</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">11:05 IST</span>
          </div>
        </div>
      </div>
    </div>
  );
};
