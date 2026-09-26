import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AdminAuthLayoutProps {
  children: React.ReactNode;
}

export const AdminAuthLayout: React.FC<AdminAuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#040812] text-slate-100 flex flex-col justify-center items-center relative font-sans overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background Video Layer */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] scale-105"
        >
          <source src="/backend.mp4" type="video/mp4" />
        </video>

        {/* Dark Navy Glass Vignette & Radial Light Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040B15]/85 via-[#040B15]/75 to-[#040B15]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,184,255,0.18),transparent_70%)] pointer-events-none" />
        
        {/* Subtle Network Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 184, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 184, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* TOP-LEFT BRANDING */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-10 z-20 flex flex-col select-none">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            NETFIX
          </span>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#00B8FF] drop-shadow-[0_0_12px_rgba(0,184,255,0.5)]">
            AI
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400/90 mt-1">
          MARG GROUP
        </span>
      </div>

      {/* TOP-RIGHT TRUST INDICATOR */}
      <div className="hidden sm:flex absolute top-7 right-10 z-20 items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-xs text-slate-300 font-medium select-none">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00B8FF]" />
        <span>Secure</span>
        <span className="text-slate-600">|</span>
        <span>Intelligent</span>
        <span className="text-slate-600">|</span>
        <span>Compliant</span>
      </div>

      {/* MAIN CENTERED LOGIN CONTAINER */}
      <div className="relative z-20 w-full max-w-[560px] px-4 py-6 sm:py-8 my-auto">
        {children}
      </div>
    </div>
  );
};
