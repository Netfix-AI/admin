export type AdminNavItemId =
  | 'dashboard'
  | 'users'
  | 'agents'
  | 'access-requests'
  | 'audit'
  | 'support'
  | 'profile'
  | 'settings';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Employee' | 'Management' | 'Advocate' | 'Client' | 'Tenant/Vendor' | 'Regulator';
  status: 'Active' | 'Suspended' | 'Pending';
  registeredDate: string;
  lastActive: string;
  linkedCasesCount: number;
  linkedClientsCount: number;
  linkedPropertiesCount: number;
  loginHistory: {
    date: string;
    time: string;
    device: string;
    location: string;
    status: 'Successful' | 'Failed';
  }[];
}

export interface AIAgent {
  id: string;
  name: string;
  type: 'core' | 'specialized';
  status: 'Active' | 'Processing' | 'Idle' | 'Error';
  tasksToday: number;
  tasksThisWeek: number;
  avgResponseTime: string;
  failureRate: string;
  isOrchestrator?: boolean;
  description: string;
  model: string;
  provider: string;
  version: string;
  taskLogs: {
    id: string;
    input: string;
    started: string;
    completed: string;
    duration: string;
    humanReviewStatus: 'Approved' | 'Edited' | 'Rejected' | 'Pending';
  }[];
}

export interface AccessRequest {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  requestedResource: string;
  reason: string;
  duration: string;
  requestedOn: string;
  status: 'Pending' | 'Approved' | 'Denied' | 'Expired';
  reviewedBy?: string;
  decisionDate?: string;
  decisionNote?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: 'Auth' | 'Users' | 'Agents' | 'Documents' | 'Access' | 'Config' | 'Export';
  target: string;
  result: 'Success' | 'Warning' | 'Failed';
  contextDetails?: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  issue: string;
  category: 'Upload' | 'Case Module' | 'Report' | 'Login' | 'Data mismatch' | 'General';
  status: 'Open' | 'In Progress' | 'Resolved';
  created: string;
  assignedTo: string;
  description: string;
  activityNotes: {
    timestamp: string;
    author: string;
    note: string;
  }[];
}

export interface SystemHealthItem {
  name: string;
  status: 'Operational' | 'Warning' | 'Error';
  latency?: string;
  lastCheck?: string;
}

export interface KpiMetric {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  status?: string;
  subtitle?: string;
}
