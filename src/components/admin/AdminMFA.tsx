import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, ShieldCheck, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { adminAuthService } from '../../services/adminService';
import { AdminStepIndicator } from '../common/AdminStepIndicator';

interface AdminMFAProps {
  userEmail: string;
  isFirstTimeMfa?: boolean;
  tempToken: string;
  mfaSecret?: string;
  otpauthUrl?: string;
  qrCodeDataUrl?: string;
  onBackToLogin: () => void;
  onSuccessMfa: (mfaToken: string) => void;
}

export const AdminMFA: React.FC<AdminMFAProps> = ({
  userEmail,
  isFirstTimeMfa = false,
  tempToken,
  mfaSecret,
  otpauthUrl,
  qrCodeDataUrl,
  onBackToLogin,
  onSuccessMfa,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedQrUrl, setGeneratedQrUrl] = useState<string | null>(qrCodeDataUrl || null);
  const [copiedKey, setCopiedKey] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const activeSecret = mfaSecret || 'JBSWY3DPEHPK3PXP';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (qrCodeDataUrl) {
      setGeneratedQrUrl(qrCodeDataUrl);
    } else if (isFirstTimeMfa) {
      const uri = otpauthUrl || `otpauth://totp/NETFIX%20AI:${encodeURIComponent(userEmail)}?secret=${activeSecret}&issuer=NETFIX%20AI`;
      QRCode.toDataURL(uri, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 300,
        color: { dark: '#000000', light: '#FFFFFF' },
      })
        .then((url) => setGeneratedQrUrl(url))
        .catch((err) => console.error('[AdminMFA] Client QR generation error:', err));
    }
  }, [qrCodeDataUrl, otpauthUrl, activeSecret, isFirstTimeMfa, userEmail]);

  useEffect(() => {
    let interval: any = null;
    if (timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerSeconds(30);
    }
    return () => clearInterval(interval);
  }, [timerSeconds]);

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

  const handleCopyKey = () => {
    navigator.clipboard.writeText(activeSecret);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMessage('Enter the complete 6-digit TOTP code from your authenticator app.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await adminAuthService.verifyMfa(tempToken, code);
      if (res.success && res.mfaToken) {
        onSuccessMfa(res.mfaToken);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid or expired TOTP verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#04121F]/85 border border-[#00B8FF]/35 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,184,255,0.14)] p-6 sm:p-8 text-white overflow-hidden transition-all">
      {/* L-Shaped Corner Accents (┌ ┐ └ ┘) */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />

      {/* Back Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00B8FF]" />
          <span>Back to Credentials</span>
        </button>
      </div>

      {/* Card Header */}
      <div className="text-center mb-5">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
          {isFirstTimeMfa ? 'Setup Authenticator App' : 'Verify Your Identity'}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {isFirstTimeMfa
            ? 'Secure your account with two-factor authentication (MFA).'
            : 'Enter the 6-digit code from your authenticator app.'}
        </p>
      </div>

      {/* 3-Step Flow Indicator */}
      <AdminStepIndicator currentStep={2} step2Label={isFirstTimeMfa ? 'Setup MFA' : 'Verification'} />

      {/* Error Feedback Message */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-medium text-rose-300 text-center animate-in fade-in duration-200">
          {errorMessage}
        </div>
      )}

      {/* First-Time MFA Setup QR Code view */}
      {isFirstTimeMfa ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white shadow-xl border border-white/20 text-slate-950 relative max-w-xs mx-auto text-center">
            <div className="w-44 h-44 sm:w-48 sm:h-48 relative flex items-center justify-center bg-white p-1 rounded-xl">
              {generatedQrUrl ? (
                <img
                  src={generatedQrUrl}
                  alt="NETFIX AI MFA Authenticator QR Code"
                  className="w-full h-full object-contain rounded-lg shadow-inner"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs font-mono">
                  Generating QR Code...
                </div>
              )}
            </div>
            <div className="text-xs font-bold text-slate-800 tracking-wide pt-2">
              Scan this QR code
            </div>
            <div className="text-[10px] text-slate-500 max-w-[210px] mt-0.5 leading-tight">
              Use Google Authenticator, Microsoft Authenticator, or any TOTP app to scan this QR code.
            </div>
          </div>

          <div className="flex items-center gap-3 my-2 text-xs text-slate-500 uppercase tracking-widest font-semibold justify-center">
            <span className="h-[1px] w-12 bg-slate-800"></span>
            <span>OR</span>
            <span className="h-[1px] w-12 bg-slate-800"></span>
          </div>

          <div className="text-center space-y-1.5">
            <div className="text-xs text-slate-400 font-medium">Enter this key manually</div>
            <div className="flex items-center justify-between gap-2 max-w-xs mx-auto p-2.5 rounded-xl bg-[#041828] border border-[#00B8FF]/30 font-mono text-sm tracking-widest text-[#00B8FF]">
              <span className="font-bold pl-2 truncate">{activeSecret}</span>
              <button
                type="button"
                onClick={handleCopyKey}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
                title="Copy secret key"
              >
                {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#00B8FF]" />}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="text-center text-xs text-slate-300 font-medium">
              Enter the 6-digit code from your authenticator app
            </div>
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
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono text-white bg-[#041828]/75 border border-[#00B8FF]/25 rounded-xl focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all shadow-inner"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying MFA Setup...</span>
                </>
              ) : (
                <span>Verify & Continue →</span>
              )}
            </button>
          </form>

          <div className="text-center pt-1">
            <a href="#help" className="text-xs text-slate-400 hover:text-[#00B8FF] transition-colors">
              Need help? <span className="underline">View setup guide</span>
            </a>
          </div>
        </div>
      ) : (
        /* Returning Administrator TOTP Verification */
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#00B8FF]/15 border border-[#00B8FF]/30 text-[#00B8FF] mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(0,184,255,0.25)]">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono text-white bg-[#041828]/75 border border-[#00B8FF]/25 rounded-xl focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all shadow-inner"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Identity...</span>
                </>
              ) : (
                <span>Verify & Continue →</span>
              )}
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
            <span>
              Code expires in <span className="font-mono font-bold text-[#00B8FF]">{formatTimer(timerSeconds)}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
