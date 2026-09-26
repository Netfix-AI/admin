import React, { useState } from 'react';
import { KeyRound, Check, X, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_ACCESS_REQUESTS } from '../../data/mockAdminData';
import type { AccessRequest } from '../../types';

export const AccessRequestsView: React.FC = () => {
  const [requests, setRequests] = useState<AccessRequest[]>(MOCK_ACCESS_REQUESTS);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [reviewingRequest, setReviewingRequest] = useState<AccessRequest | null>(null);
  const [decisionNote, setDecisionNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingRequests = requests.filter((r) => r.status === 'Pending');
  const historyRequests = requests.filter((r) => r.status !== 'Pending');

  const handleDecision = (status: 'Approved' | 'Denied') => {
    if (!decisionNote.trim()) {
      setErrorMsg('A decision note is required before approving or denying an access request.');
      return;
    }
    setErrorMsg(null);

    if (reviewingRequest) {
      setRequests((prev) =>
        prev.map((r) => {
          if (r.id === reviewingRequest.id) {
            return {
              ...r,
              status,
              decisionNote,
              reviewedBy: 'Admin',
              decisionDate: '21 Sep 2026',
            };
          }
          return r;
        })
      );

      setToastMessage(`Access request ${status.toLowerCase()} for ${reviewingRequest.userName}.`);
      setTimeout(() => setToastMessage(null), 3000);
      setReviewingRequest(null);
      setDecisionNote('');
    }
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
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Access Requests</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Review and govern access requests for resources beyond normal role permissions.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'pending'
                ? 'bg-admin-amber text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending Queue ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-admin-teal text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Request History ({historyRequests.length})
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Requester</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Requested Resource</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4 font-mono">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(activeTab === 'pending' ? pendingRequests : historyRequests).map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{r.userName}</td>
                  <td className="py-3.5 px-4 text-slate-300">{r.userRole}</td>
                  <td className="py-3.5 px-4 font-semibold text-admin-teal">{r.requestedResource}</td>
                  <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{r.reason}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{r.duration}</td>

                  <td className="py-3.5 px-4">
                    {r.status === 'Pending' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-amber/15 text-admin-amber border border-admin-amber/30 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                    {r.status === 'Approved' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-green/15 text-admin-green border border-admin-green/30 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    )}
                    {r.status === 'Denied' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 inline-flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Denied
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setReviewingRequest(r);
                        setDecisionNote(r.decisionNote || '');
                        setErrorMsg(null);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90 transition-all shadow-md shadow-admin-teal/20"
                    >
                      {r.status === 'Pending' ? 'Review Request' : 'View Decision'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {reviewingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0C101A] border border-white/15 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-admin-amber" />
                <h3 className="text-lg font-bold text-white">Access Request Review</h3>
              </div>
              <button
                onClick={() => setReviewingRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <div><span className="text-slate-400">Requester:</span> <span className="font-bold text-white">{reviewingRequest.userName} ({reviewingRequest.userRole})</span></div>
                <div><span className="text-slate-400">Requested Resource:</span> <span className="font-semibold text-admin-teal">{reviewingRequest.requestedResource}</span></div>
                <div><span className="text-slate-400">Requested Duration:</span> <span className="font-mono text-white">{reviewingRequest.duration}</span></div>
                <div><span className="text-slate-400">Reason:</span> <p className="text-slate-300 mt-1 leading-relaxed">{reviewingRequest.reason}</p></div>
              </div>

              {errorMsg && (
                <p className="text-[11px] text-rose-400 font-semibold">{errorMsg}</p>
              )}

              {/* Decision Note Textarea */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Decision Note <span className="text-admin-amber">* (Required for auditability)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter explicit reason for granting or denying access..."
                  value={decisionNote}
                  onChange={(e) => {
                    setDecisionNote(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-admin-teal resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleDecision('Denied')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Deny Request</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision('Approved')}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-admin-teal hover:bg-admin-teal/90 shadow-md shadow-admin-teal/25 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
