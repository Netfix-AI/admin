import React, { useState } from 'react';
import { FileCheck2, Search, Download, Filter, X } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../data/mockAdminData';
import type { AuditLog } from '../../types';

export const AuditTrailView: React.FC = () => {
  const [logs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('All');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'All' || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  const handleExport = (format: string) => {
    setToastMessage(`Exporting audit log summary as ${format}...`);
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
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Audit Trail</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Track important actions, configuration updates, and security events across the platform.
          </p>
        </div>

        {/* Export Dropdown UI */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-admin-teal" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-admin-teal" />
            <span>Excel</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90 shadow-md shadow-admin-teal/20 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="p-4 rounded-2xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit logs by action or target..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-admin-teal"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Module:</span>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#07090F] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-admin-teal"
          >
            <option value="All">All Modules</option>
            <option value="Auth">Auth</option>
            <option value="Users">Users</option>
            <option value="Agents">Agents</option>
            <option value="Access">Access</option>
            <option value="Config">Config</option>
            <option value="Export">Export</option>
          </select>
        </div>
      </div>

      {/* Audit Data Table */}
      <div className="rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="py-3 px-4 font-mono">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{log.user}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-semibold">{log.action}</td>
                  <td className="py-3.5 px-4 font-mono text-admin-teal">{log.module}</td>
                  <td className="py-3.5 px-4 text-slate-300">{log.target}</td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.result === 'Success'
                          ? 'bg-admin-green/15 text-admin-green border border-admin-green/30'
                          : 'bg-admin-amber/15 text-admin-amber border border-admin-amber/30'
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                    >
                      View Event
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Detail Drawer */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedLog(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-[#0C101A] border-l border-white/15 p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-admin-teal" />
                <h3 className="text-lg font-bold text-white">Audit Event Detail</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div><span className="text-slate-400">Event ID:</span> <span className="font-mono text-white">{selectedLog.id}</span></div>
                <div><span className="text-slate-400">Timestamp:</span> <span className="font-mono text-white">{selectedLog.timestamp}</span></div>
                <div><span className="text-slate-400">Performed By:</span> <span className="font-bold text-white">{selectedLog.user}</span></div>
                <div><span className="text-slate-400">Action:</span> <span className="font-bold text-admin-teal">{selectedLog.action}</span></div>
                <div><span className="text-slate-400">Module:</span> <span className="font-mono text-slate-300">{selectedLog.module}</span></div>
                <div><span className="text-slate-400">Target Resource:</span> <span className="text-slate-200">{selectedLog.target}</span></div>
                {selectedLog.contextDetails && (
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-slate-400 block mb-1">Context Details:</span>
                    <p className="text-slate-300 leading-relaxed font-mono bg-black/40 p-2 rounded-lg border border-white/5">
                      {selectedLog.contextDetails}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
