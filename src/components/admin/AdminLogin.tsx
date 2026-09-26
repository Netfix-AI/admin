import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Loader2, Lock, Mail } from 'lucide-react';
import { adminAuthService } from '../../services/adminService';
import { AdminStepIndicator } from '../common/AdminStepIndicator';

interface AdminLoginProps {
  onNextStep: (
    email: string,
    tempToken: string,
    isFirstTimeMfa: boolean,
    mfaSecret?: string,
    otpauthUrl?: string,
    qrCodeDataUrl?: string
  ) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNextStep }) => {
  const [email, setEmail] = useState('admin@netfixai.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      setIsLoading(true);
      const res = await adminAuthService.login(email, password);
      if (res.success && res.tempToken) {
        onNextStep(
          email,
          res.tempToken,
          res.isFirstTimeMfa ?? false,
          res.mfaSecret,
          res.otpauthUrl,
          res.qrCodeDataUrl
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to verify administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#04121F]/85 border border-[#00B8FF]/35 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,184,255,0.14)] p-6 sm:p-8 text-white overflow-hidden transition-all">
      {/* L-Shaped Corner Accents (┌ ┐ └ ┘) */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />

      {/* Card Header */}
      <div className="text-center mb-5">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
          WELCOME <span className="text-[#00B8FF] drop-shadow-[0_0_12px_rgba(0,184,255,0.4)]">BACK!</span>
        </h1>
      </div>

      {/* 3-Step Flow Indicator */}
      <AdminStepIndicator currentStep={1} />

      {/* Error Feedback Message */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-medium text-rose-300 text-center animate-in fade-in duration-200">
          {errorMessage}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address Field */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-200">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="admin-email"
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all min-h-[44px]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-200">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link & Remember Me */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#00B8FF]/30 bg-white/5 text-[#00B8FF] focus:ring-[#00B8FF]/40 accent-[#00B8FF]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setErrorMessage('Please contact MARG Group system administration to reset credentials.')}
            className="text-[#00B8FF] hover:text-sky-300 transition-colors font-medium"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Action Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
