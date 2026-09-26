import React, { useState } from 'react';
import { Settings, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'integrations' | 'general'>('roles');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0C101A] border border-admin-teal/40 text-xs font-semibold text-admin-teal shadow-2xl animate-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Platform Settings</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage system permissions, integration gateways, and general platform configuration.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'roles' ? 'bg-admin-teal text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Roles & Permissions
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'integrations' ? 'bg-admin-teal text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'general' ? 'bg-admin-teal text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            General Config
          </button>
        </div>
      </div>

      {/* Tab 1: Roles & Permissions Matrix */}
      {activeTab === 'roles' && (
        <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-admin-teal" />
            <span>Role-Based Access Control (RBAC) Matrix</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Accessible Modules</th>
                  <th className="py-3 px-4">AI Agent Scope</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-bold text-white">Internal Employee</td>
                  <td className="py-3.5 px-4 text-slate-300">Cases, Tax, Legal, AI Tasks</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">Assigned Client Scope</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => showToast('Editing RBAC permissions matrix...')} className="text-admin-teal font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-bold text-white">Management / Executive</td>
                  <td className="py-3.5 px-4 text-slate-300">All Modules (Firm-wide analytics, risk)</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">Firm-wide Insights Scope</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => showToast('Editing RBAC permissions matrix...')} className="text-admin-teal font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-bold text-white">Advocate / External Counsel</td>
                  <td className="py-3.5 px-4 text-slate-300">Assigned Cases, Legal Research, Drafts</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">Case Precedent Scope</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => showToast('Editing RBAC permissions matrix...')} className="text-admin-teal font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-bold text-white">Client</td>
                  <td className="py-3.5 px-4 text-slate-300">Own Submissions, Cases & Reports</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">Own Deliverables Scope</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => showToast('Editing RBAC permissions matrix...')} className="text-admin-teal font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-bold text-white">Tenant / Buyer / Vendor</td>
                  <td className="py-3.5 px-4 text-slate-300">Property & Project Info, Requests</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">Linked Contract Scope</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => showToast('Editing RBAC permissions matrix...')} className="text-admin-teal font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-bold text-white">Regulator / Auditor</td>
                  <td className="py-3.5 px-4 text-slate-300">Explicitly Shared Compliance Records</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">Audit Isolation Scope</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => showToast('Editing RBAC permissions matrix...')} className="text-admin-teal font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: System Integrations Status */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-[#0C101A]/85 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">GST API Gateway</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-admin-amber/15 text-admin-amber border border-admin-amber/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Warning (High Latency)
              </span>
            </div>
            <p className="text-xs text-slate-400">Direct integration for automated GSTR return reconciliation.</p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0C101A]/85 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Email & OTP Gateway</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-admin-green/15 text-admin-green border border-admin-green/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">High-priority transactional trunk for login & registration verification.</p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0C101A]/85 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">High Court & E-Courts Portal</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-admin-green/15 text-admin-green border border-admin-green/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">Case status and docket sync integration.</p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0C101A]/85 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Encrypted Document Vault Storage</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-admin-green/15 text-admin-green border border-admin-green/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">Role-isolated document storage vault.</p>
          </div>
        </div>
      )}

      {/* Tab 3: General Configuration */}
      {activeTab === 'general' && (
        <div className="p-6 rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl max-w-2xl space-y-4 text-xs">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-admin-teal" />
            <span>General Platform Parameters</span>
          </h3>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Platform Brand Name</label>
              <input
                type="text"
                readOnly
                value="NETFIX AI — MARG GROUP"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Administrator Session Timeout</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090F] border border-white/10 text-slate-200">
                <option value="30">30 Minutes (Recommended)</option>
                <option value="60">60 Minutes</option>
                <option value="120">120 Minutes</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Audit Log Retention Policy</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090F] border border-white/10 text-slate-200">
                <option value="365">365 Days (1 Year)</option>
                <option value="730">730 Days (2 Years)</option>
                <option value="unlimited">Indefinite Compliance Vault</option>
              </select>
            </div>

            <button
              onClick={() => showToast('Platform configuration saved.')}
              className="py-3 px-5 rounded-xl font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90 transition-all shadow-md shadow-admin-teal/20"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
