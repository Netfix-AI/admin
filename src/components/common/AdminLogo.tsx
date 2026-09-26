import React from 'react';

interface AdminLogoProps {
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AdminLogo: React.FC<AdminLogoProps> = ({
  size = 'md',
  collapsed = false,
  onClick,
  className = '',
}) => {
  const textSize = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center gap-1.5 leading-none">
        <span className={`font-extrabold tracking-tight text-white ${textSize}`}>
          NETFIX
        </span>
        <span
          className={`font-black tracking-tight ${textSize} text-[#00B8FF] drop-shadow-[0_0_12px_rgba(0,184,255,0.5)]`}
        >
          AI
        </span>
      </div>

      {!collapsed && (
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
            MARG GROUP
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-admin-teal px-1.5 py-0.2 rounded bg-[#20E0C2]/10 border border-[#20E0C2]/20">
            ADMIN
          </span>
        </div>
      )}
    </div>
  );
};
