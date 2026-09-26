import React, { useState } from 'react';
import { Search, Filter, X, ShieldAlert, CheckCircle2, UserCheck, RotateCcw } from 'lucide-react';
import { MOCK_ADMIN_USERS } from '../../data/mockAdminData';
import type { AdminUser } from '../../types';

export const UsersView: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [suspendModalUser, setSuspendModalUser] = useState<AdminUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`User ${u.name} status updated to ${newStatus}.`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
    setSuspendModalUser(null);
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
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Users</h2>
          <p className="text-xs sm:text-sm text-slate-400">Manage platform users, roles, and access status.</p>
        </div>

        <button
          onClick={() => showToast('New user account invitation workflow will connect to backend API.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-admin-teal hover:bg-admin-teal/90 shadow-md shadow-admin-teal/25 transition-all self-start sm:self-auto"
        >
          + Add User
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Users</span>
          <div className="text-2xl font-black text-white font-mono mt-1">12,482</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Active</span>
          <div className="text-2xl font-black text-admin-green font-mono mt-1">11,240</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Suspended</span>
          <div className="text-2xl font-black text-rose-400 font-mono mt-1">842</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0C101A]/80 border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Pending Verification</span>
          <div className="text-2xl font-black text-admin-amber font-mono mt-1">400</div>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="p-4 rounded-2xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-admin-teal"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#07090F] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-admin-teal"
            >
              <option value="All">All Roles</option>
              <option value="Client">Client</option>
              <option value="Employee">Employee</option>
              <option value="Advocate">Advocate</option>
              <option value="Management">Management</option>
              <option value="Tenant/Vendor">Tenant / Vendor</option>
              <option value="Regulator">Regulator</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#07090F] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-admin-teal"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="rounded-3xl bg-[#0C101A]/85 border border-white/10 backdrop-blur-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 font-mono">Registered</th>
                <th className="py-3 px-4 font-mono">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-admin-teal/20 to-admin-indigo/20 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{u.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{u.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-200">{u.role}</td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-300">{u.email}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{u.phone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {u.status === 'Active' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-green/15 border border-admin-green/30 text-admin-green inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    )}
                    {u.status === 'Suspended' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 border border-rose-500/30 text-rose-400 inline-flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Suspended
                      </span>
                    )}
                    {u.status === 'Pending' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-admin-amber/15 border border-admin-amber/30 text-admin-amber inline-flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">{u.registeredDate}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{u.lastActive}</td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setSuspendModalUser(u)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          u.status === 'Active'
                            ? 'text-rose-400 hover:bg-rose-500/15 border border-rose-500/20'
                            : 'text-admin-green hover:bg-admin-green/15 border border-admin-green/20'
                        }`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Side Drawer */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedUser(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-[#0C101A] border-l border-white/15 p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">User Profile Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="text-base font-extrabold text-white">{selectedUser.name}</div>
                <div className="text-xs text-slate-400">{selectedUser.email} • {selectedUser.phone}</div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-admin-teal/15 border border-admin-teal/30 text-admin-teal">
                    Role: {selectedUser.role}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/[0.06] text-slate-300">
                    Status: {selectedUser.status}
                  </span>
                </div>
              </div>

              {/* Linked Context Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Cases</span>
                  <span className="font-bold text-white font-mono">{selectedUser.linkedCasesCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Clients</span>
                  <span className="font-bold text-white font-mono">{selectedUser.linkedClientsCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 text-[10px] block">Properties</span>
                  <span className="font-bold text-white font-mono">{selectedUser.linkedPropertiesCount}</span>
                </div>
              </div>

              {/* Action Workflows */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => showToast(`Password reset workflow initiated for ${selectedUser.email}.`)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-admin-teal" />
                  <span>Send Password Reset Request</span>
                </button>
              </div>

              {/* Login History */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Recent Login History</h4>
                <div className="space-y-2 text-xs">
                  {selectedUser.loginHistory.map((h, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">{h.device}</span>
                        <span className="text-[11px] text-slate-400">{h.location} • {h.date} {h.time}</span>
                      </div>
                      <span className="text-[10px] font-bold text-admin-green">{h.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suspend / Reactivate Confirmation Modal */}
      {suspendModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0C101A] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">
                {suspendModalUser.status === 'Active' ? 'Suspend user account?' : 'Reactivate user account?'}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {suspendModalUser.status === 'Active'
                ? `This will prevent ${suspendModalUser.name} (${suspendModalUser.email}) from logging into the platform until reactivated.`
                : `This will restore platform access for ${suspendModalUser.name} (${suspendModalUser.email}).`}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setSuspendModalUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleToggleStatus(suspendModalUser.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${
                  suspendModalUser.status === 'Active'
                    ? 'bg-rose-500 hover:bg-rose-600'
                    : 'bg-admin-green hover:bg-admin-green/90 text-slate-950'
                }`}
              >
                {suspendModalUser.status === 'Active' ? 'Confirm Suspension' : 'Confirm Reactivation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
