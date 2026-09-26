import React, { useState } from 'react';
import { HelpCircle, MessageSquare, X } from 'lucide-react';
import { MOCK_SUPPORT_TICKETS } from '../../data/mockAdminData';
import type { SupportTicket } from '../../types';

export const SupportView: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newNote, setNewNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

  const handleUpdateStatus = (ticketId: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
    showToast(`Ticket #${ticketId} status updated to ${newStatus}.`);
    if (selectedTicket) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleAddNote = (ticketId: string) => {
    if (!newNote.trim()) return;
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            activityNotes: [
              ...t.activityNotes,
              {
                timestamp: 'Just now',
                author: 'Admin',
                note: newNote,
              },
            ],
          };
        }
        return t;
      })
    );
    showToast('Activity note added to ticket.');
    setNewNote('');
  };

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
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Support & Issues</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Review and resolve support tickets raised by platform users across roles.
          </p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 backdrop-blur-xl">
          <span className="text-xs font-semibold text-rose-300">Open Tickets</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{openCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-admin-amber/10 border border-admin-amber/20 backdrop-blur-xl">
          <span className="text-xs font-semibold text-admin-amber">In Progress</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{inProgressCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-admin-green/10 border border-admin-green/20 backdrop-blur-xl">
          <span className="text-xs font-semibold text-admin-green">Resolved</span>
          <div className="text-2xl font-black text-white font-mono mt-1">{resolvedCount}</div>
        </div>
      </div>

      {/* Support Tickets Data Table */}
      <div className="rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="py-3 px-4 font-mono">Ticket ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Issue Summary</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 font-mono">Created</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono text-admin-teal font-bold">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{t.userName}</td>
                  <td className="py-3.5 px-4 text-slate-200">{t.issue}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">{t.category}</td>

                  <td className="py-3.5 px-4">
                    {t.status === 'Open' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        Open
                      </span>
                    )}
                    {t.status === 'In Progress' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-amber/15 text-admin-amber border border-admin-amber/30">
                        In Progress
                      </span>
                    )}
                    {t.status === 'Resolved' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-green/15 text-admin-green border border-admin-green/30">
                        Resolved
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">{t.created}</td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(t)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                    >
                      Manage Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Detail Drawer */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-[#0C101A] border-l border-white/15 p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-admin-teal" />
                <h3 className="text-lg font-bold text-white">Ticket #{selectedTicket.id}</h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="font-bold text-white text-sm">{selectedTicket.issue}</div>
                <div className="text-slate-400">User: <span className="text-white font-semibold">{selectedTicket.userName}</span></div>
                <div className="text-slate-400">Category: <span className="font-mono text-slate-300">{selectedTicket.category}</span></div>
                <p className="text-slate-300 pt-1 leading-relaxed">{selectedTicket.description}</p>
              </div>

              {/* Update Status Buttons */}
              <div className="space-y-1.5">
                <span className="block font-semibold text-slate-300">Update Ticket Status:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedTicket.id, 'Open')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all ${
                      selectedTicket.status === 'Open' ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedTicket.id, 'In Progress')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all ${
                      selectedTicket.status === 'In Progress' ? 'bg-admin-amber text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedTicket.id, 'Resolved')}
                    className={`py-2 px-3 rounded-xl font-bold transition-all ${
                      selectedTicket.status === 'Resolved' ? 'bg-admin-green text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Resolved
                  </button>
                </div>
              </div>

              {/* Activity & Notes */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <h4 className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-admin-teal" />
                  <span>Activity Notes</span>
                </h4>

                <div className="space-y-2">
                  {selectedTicket.activityNotes.map((note, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-bold text-white">{note.author}</span>
                        <span className="font-mono">{note.timestamp}</span>
                      </div>
                      <p className="text-slate-300">{note.note}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add an internal note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-admin-teal"
                  />
                  <button
                    onClick={() => handleAddNote(selectedTicket.id)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
