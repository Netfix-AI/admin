import { useState, useEffect } from 'react';
import { AdminBackground } from './components/common/AdminBackground';
import { AdminAuthLayout } from './components/common/AdminAuthLayout';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminMFA } from './components/admin/AdminMFA';
import { AdminCaptcha } from './components/admin/AdminCaptcha';

import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { UsersView } from './components/admin/UsersView';
import { AgentsView } from './components/admin/AgentsView';
import { AccessRequestsView } from './components/admin/AccessRequestsView';
import { AuditTrailView } from './components/admin/AuditTrailView';
import { SupportView } from './components/admin/SupportView';
import { ProfileView } from './components/admin/ProfileView';
import { SettingsView } from './components/admin/SettingsView';
import { adminAuthService } from './services/adminService';

import type { AdminNavItemId } from './types';

export function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [activeTab, setActiveTab] = useState<AdminNavItemId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Admin Auth Flow State
  const [userEmail, setUserEmail] = useState('');
  const [tempToken, setTempToken] = useState<string>('temp_pwd_verified');
  const [isFirstTimeMfa, setIsFirstTimeMfa] = useState<boolean>(false);
  const [mfaSecret, setMfaSecret] = useState<string | undefined>('JBSWY3DPEHPK3PXP');
  const [otpauthUrl, setOtpauthUrl] = useState<string | undefined>(undefined);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | undefined>(undefined);
  const [mfaToken, setMfaToken] = useState<string>('mfa_verified');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);

  // Check HttpOnly session cookie status on mount / route change
  useEffect(() => {
    adminAuthService.checkSession().then((res) => {
      if (res.authenticated) {
        setIsAuthenticated(true);
      }
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    setSignOutModalOpen(false);
    await adminAuthService.logout(); // Server clears HttpOnly + Secure cookie
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  // Sync tab with path if route specifies it
  useEffect(() => {
    if (currentPath.includes('/users')) setActiveTab('users');
    else if (currentPath.includes('/agents')) setActiveTab('agents');
    else if (currentPath.includes('/access-requests')) setActiveTab('access-requests');
    else if (currentPath.includes('/audit')) setActiveTab('audit');
    else if (currentPath.includes('/support')) setActiveTab('support');
    else if (currentPath.includes('/profile')) setActiveTab('profile');
    else if (currentPath.includes('/settings')) setActiveTab('settings');
    else if (currentPath.includes('/dashboard')) setActiveTab('dashboard');
  }, [currentPath]);

  const handleSelectTab = (tab: AdminNavItemId) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  // If not authenticated, render Admin 3-Step Auth Flow:
  // Step 1: Login -> Step 2: MFA -> Step 3: CAPTCHA -> HttpOnly Cookie Set by Backend -> Dashboard
  if (!isAuthenticated) {
    return (
      <AdminAuthLayout>
        {currentPath.includes('/captcha') ? (
          <AdminCaptcha
            mfaToken={mfaToken}
            onBackToMfa={() => navigate('/admin/login/mfa')}
            onSuccessAuthenticate={() => {
              setIsAuthenticated(true);
              navigate('/admin/dashboard');
            }}
          />
        ) : currentPath.includes('/mfa') ? (
          <AdminMFA
            userEmail={userEmail}
            tempToken={tempToken}
            isFirstTimeMfa={isFirstTimeMfa}
            mfaSecret={mfaSecret}
            otpauthUrl={otpauthUrl}
            qrCodeDataUrl={qrCodeDataUrl}
            onBackToLogin={() => navigate('/admin/login')}
            onSuccessMfa={(verifiedMfaToken) => {
              setMfaToken(verifiedMfaToken);
              navigate('/admin/login/captcha');
            }}
          />
        ) : (
          <AdminLogin
            onNextStep={(email, pwdTempToken, firstTimeMfaFlag, secretVal, otpUrlVal, qrDataVal) => {
              setUserEmail(email);
              setTempToken(pwdTempToken);
              setIsFirstTimeMfa(firstTimeMfaFlag);
              setMfaSecret(secretVal);
              setOtpauthUrl(otpUrlVal);
              setQrCodeDataUrl(qrDataVal);
              navigate('/admin/login/mfa');
            }}
            onDemoLogin={() => {
              setIsAuthenticated(true);
              navigate('/admin/dashboard');
            }}
          />
        )}
      </AdminAuthLayout>
    );
  }

  // Protected Admin Control Center Layout (Authenticated with JWT)
  return (
    <div className="min-h-screen bg-[#07090F] text-[#F5F7FA] flex font-sans relative selection:bg-[#20E0C2]/30 selection:text-[#20E0C2] overflow-x-hidden">
      {/* Background Command Center Atmosphere */}
      <AdminBackground />

      {/* Left Collapsible Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSignOut={() => setSignOutModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Right Main Application Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Top Header Bar */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onSelectTab={handleSelectTab}
          onSignOut={() => setSignOutModalOpen(true)}
        />

        {/* View Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboardView onNavigateTab={handleSelectTab} />
          )}

          {activeTab === 'users' && <UsersView />}

          {activeTab === 'agents' && <AgentsView />}

          {activeTab === 'access-requests' && <AccessRequestsView />}

          {activeTab === 'audit' && <AuditTrailView />}

          {activeTab === 'support' && <SupportView />}

          {activeTab === 'profile' && <ProfileView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Admin Sign Out Confirmation Dialog */}
      {signOutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-[#0C101A] border border-white/15 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Sign out of Admin Control Center?</h3>
            <p className="text-xs text-slate-300">
              Your administrative session token will be terminated.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSignOutModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
