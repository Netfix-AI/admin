import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import { adminAuthService } from '../../services/adminService';

interface AdminOTPProps {
  maskedContact: string;
  onBack: () => void;
  onSuccessVerify: () => void;
}

export const AdminOTP: React.FC<AdminOTPProps> = ({
  maskedContact,
  onBack,
  onSuccessVerify,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(59);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, '');
    if (!digit && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1);
    setOtp(newOtp);
    if (errorMessage) setErrorMessage(null);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextFocus = Math.min(pastedData.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setErrorMessage('Enter the complete 6-digit verification code.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await adminAuthService.verifyOtp(otpCode);
      if (res.success) {
        onSuccessVerify();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'The verification code is incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setErrorMessage(null);
      setResendSuccess(null);
      await adminAuthService.resendOtp();
      setOtp(['', '', '', '', '', '']);
      setTimerSeconds(59);
      setIsTimerActive(true);
      setResendSuccess('New verification code sent to administrator contact.');
      inputRefs.current[0]?.focus();
      setTimeout(() => setResendSuccess(null), 3000);
    } catch (err: any) {
      setErrorMessage('Failed to resend code.');
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 relative z-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0C101A]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Admin Login</span>
        </button>

        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-admin-teal/15 border border-admin-teal/30 text-admin-teal mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(32,224,194,0.25)]">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight pt-1">
            Verify Administrator Access
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto">
            Enter the verification code sent to your registered contact:
          </p>

          <div className="font-mono text-xs font-bold text-admin-teal bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg inline-block my-1">
            {maskedContact || 'admin***@netfixai.com'}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300 text-center animate-in fade-in duration-200">
            {errorMessage}
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 text-center animate-in fade-in duration-200">
            {resendSuccess}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono text-white bg-white/[0.04] border border-white/10 rounded-xl focus:outline-none focus:border-admin-teal focus:ring-2 focus:ring-admin-teal/40 transition-all shadow-inner"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              {isTimerActive ? (
                <>Code expires in <span className="font-mono font-bold text-admin-teal">{formatTimer(timerSeconds)}</span></>
              ) : (
                <span className="text-rose-400 font-medium">Code expired</span>
              )}
            </span>

            <button
              type="button"
              onClick={handleResend}
              disabled={isTimerActive}
              className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                isTimerActive
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-admin-teal hover:text-sky-300 cursor-pointer underline underline-offset-2'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Resend Code</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-admin-teal via-admin-blue to-admin-teal hover:opacity-95 shadow-[0_0_30px_rgba(32,224,194,0.35)] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Authenticating Administrator...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500">
          Administrator session tokens are encrypted and audited.
        </div>
      </div>
    </div>
  );
};
