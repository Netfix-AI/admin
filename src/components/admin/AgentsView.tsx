import React, { useState } from 'react';
import { Cpu, Search, CheckCircle2, Clock, X, AlertTriangle, Layers } from 'lucide-react';
import { MOCK_AI_AGENTS } from '../../data/mockAdminData';
import type { AIAgent } from '../../types';

export const AgentsView: React.FC = () => {
  const [agents] = useState<AIAgent[]>(MOCK_AI_AGENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">AI Agents & Orchestrator</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Monitor the intelligence layer, specialized agents, and human-in-the-loop outputs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-admin-teal bg-admin-teal/10 border border-admin-teal/30 px-3 py-1.5 rounded-xl">
            26 Specialized Agents
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Agents</span>
          <div className="text-2xl font-black text-white font-mono mt-1">26</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Active Node Agents</span>
          <div className="text-2xl font-black text-admin-green font-mono mt-1">20</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Idle</span>
          <div className="text-2xl font-black text-slate-400 font-mono mt-1">4</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Node Warnings / Errors</span>
          <div className="text-2xl font-black text-rose-400 font-mono mt-1">2</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search AI agents by name or capability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-admin-teal"
          />
        </div>
      </div>

      {/* Agents Table */}
      <div className="rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Agent Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 font-mono">Tasks (Today)</th>
                <th className="py-3 px-4 font-mono">Avg Response</th>
                <th className="py-3 px-4 font-mono">Failure Rate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAgents.map((agt) => (
                <tr
                  key={agt.id}
                  className={`hover:bg-white/[0.02] transition-colors ${
                    agt.isOrchestrator ? 'bg-admin-indigo/10 border-l-4 border-admin-indigo' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          agt.isOrchestrator
                            ? 'bg-admin-indigo/20 text-admin-indigo border border-admin-indigo/40 shadow-[0_0_12px_rgba(117,103,255,0.3)]'
                            : 'bg-white/[0.05] text-slate-300 border border-white/10'
                        }`}
                      >
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{agt.name}</span>
                          {agt.isOrchestrator && (
                            <span className="text-[9px] font-mono font-bold text-admin-indigo bg-admin-indigo/20 border border-admin-indigo/40 px-2 py-0.5 rounded-full">
                              ORCHESTRATOR
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block max-w-md truncate">
                          {agt.description}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {agt.status === 'Active' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-green/15 text-admin-green border border-admin-green/30 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    )}
                    {agt.status === 'Processing' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-amber/15 text-admin-amber border border-admin-amber/30 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" /> Processing
                      </span>
                    )}
                    {agt.status === 'Idle' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/[0.06] text-slate-400 border border-white/10">
                        Idle
                      </span>
                    )}
                    {agt.status === 'Error' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Error
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-white">{agt.tasksToday}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{agt.avgResponseTime}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{agt.failureRate}</td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedAgent(agt)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                    >
                      Inspect Logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Detail Side Drawer */}
      {selectedAgent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg h-full bg-[#0C101A] border-l border-white/15 p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-admin-teal" />
                <h3 className="text-lg font-bold text-white">{selectedAgent.name}</h3>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <p className="text-xs text-slate-300">{selectedAgent.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div><span className="text-slate-500">Model:</span> <span className="font-mono text-white">{selectedAgent.model}</span></div>
                  <div><span className="text-slate-500">Provider:</span> <span className="font-mono text-white">{selectedAgent.provider}</span></div>
                </div>
              </div>

              {/* Human Review Task Logs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-admin-indigo" />
                  <span>Human-in-the-Loop Task Log</span>
                </h4>

                {selectedAgent.taskLogs.length > 0 ? (
                  <div className="space-y-2 text-xs">
                    {selectedAgent.taskLogs.map((log) => (
                      <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{log.input}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.humanReviewStatus === 'Approved'
                                ? 'bg-admin-green/20 text-admin-green'
                                : log.humanReviewStatus === 'Edited'
                                ? 'bg-admin-amber/20 text-admin-amber'
                                : 'bg-white/10 text-slate-400'
                            }`}
                          >
                            Review: {log.humanReviewStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Task ID: {log.id}</span>
                          <span>Duration: {log.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No active task logs recorded for this agent in current cycle.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
