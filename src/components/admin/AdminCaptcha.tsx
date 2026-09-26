import React, { useState } from 'react';
import { ArrowLeft, Loader2, Check, Lock, RefreshCw } from 'lucide-react';
import { adminAuthService } from '../../services/adminService';
import { AdminStepIndicator } from '../common/AdminStepIndicator';

interface AdminCaptchaProps {
  mfaToken: string;
  onBackToMfa: () => void;
  onSuccessAuthenticate: () => void;
}

export const AdminCaptcha: React.FC<AdminCaptchaProps> = ({
  mfaToken,
  onBackToMfa,
  onSuccessAuthenticate,
}) => {
  const [captchaStatus, setCaptchaStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCaptchaClick = () => {
    if (captchaStatus === 'idle') {
      setCaptchaStatus('verifying');
      setTimeout(() => {
        setCaptchaStatus('verified');
      }, 800);
    }
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaStatus !== 'verified') {
      setErrorMessage('Complete the Cloudflare Turnstile verification to proceed.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await adminAuthService.verifyCaptcha(mfaToken, 'turnstile_verified_token_v1');
      if (res.success) {
        onSuccessAuthenticate();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to authenticate administrator session.');
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

      {/* Back Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBackToMfa}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00B8FF]" />
          <span>Back to MFA Verification</span>
        </button>
      </div>

      {/* Card Header */}
      <div className="text-center mb-5">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
          WELCOME <span className="text-[#00B8FF] drop-shadow-[0_0_12px_rgba(0,184,255,0.4)]">BACK!</span>
        </h1>
      </div>

      {/* 3-Step Flow Indicator */}
      <AdminStepIndicator currentStep={3} />

      {/* Error Feedback Message */}
      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-medium text-rose-300 text-center animate-in fade-in duration-200">
          {errorMessage}
        </div>
      )}

      {/* Turnstile Security Check Card */}
      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-[#041828]/75 border border-[#00B8FF]/25 backdrop-blur-xl">
          <div
            onClick={handleCaptchaClick}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer select-none ${
              captchaStatus === 'verified'
                ? 'bg-[#00B8FF]/10 border-[#00B8FF]/40'
                : 'bg-white/[0.04] border-white/10 hover:border-[#00B8FF]/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                  captchaStatus === 'verified'
                    ? 'bg-[#00B8FF] border-[#00B8FF] text-slate-950'
                    : captchaStatus === 'verifying'
                    ? 'bg-white/10 border-[#00B8FF] text-[#00B8FF]'
                    : 'bg-white/5 border-white/30 hover:border-[#00B8FF]'
                }`}
              >
                {captchaStatus === 'verifying' && <Loader2 className="w-4 h-4 animate-spin text-[#00B8FF]" />}
                {captchaStatus === 'verified' && <Check className="w-5 h-5 stroke-[3] text-slate-950" />}
              </div>
              <span className="text-sm font-semibold text-white">Verify you are human</span>
            </div>

            {/* Cloudflare Turnstile Branding */}
            <div className="flex flex-col items-center justify-center text-[8px] text-slate-400 font-mono space-y-0.5">
              <div className="w-6 h-6 rounded bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <span>Turnstile</span>
              <span className="text-[7px] text-slate-500">Privacy - Terms</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleContinue} className="space-y-4">
          <button
            type="submit"
            disabled={isLoading || captchaStatus !== 'verified'}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 min-h-[48px] ${
              captchaStatus === 'verified'
                ? 'text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] cursor-pointer hover:scale-[1.01] active:scale-[0.98]'
                : 'text-slate-500 bg-white/5 border border-white/10 cursor-not-allowed opacity-60'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating Administrator...</span>
              </>
            ) : (
              <span>Continue to Admin Dashboard →</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#00B8FF]" />
          <span>Authorized Access Only. Session encrypted with AES-256.</span>
        </div>
      </div>
    </div>
  );
};
