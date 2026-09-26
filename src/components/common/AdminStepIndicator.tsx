import React from 'react';
import { Check } from 'lucide-react';

interface AdminStepIndicatorProps {
  currentStep: 1 | 2 | 3;
  step2Label?: string;
}

export const AdminStepIndicator: React.FC<AdminStepIndicatorProps> = ({ currentStep, step2Label = 'Verification' }) => {
  const steps = [
    { num: 1, label: 'Credentials' },
    { num: 2, label: step2Label },
    { num: 3, label: 'Access' },
  ];

  return (
    <div className="w-full py-2 mb-6 select-none">
      <div className="flex items-center justify-between max-w-sm mx-auto relative">
        {/* Background Connecting Line */}
        <div className="absolute top-[16px] left-[18%] right-[18%] h-[2px] bg-slate-800/80 z-0" />
        
        {/* Active Filled Progress Line */}
        <div
          className="absolute top-[16px] left-[18%] h-[2px] bg-[#00B8FF] transition-all duration-500 z-0 shadow-[0_0_10px_rgba(0,184,255,0.6)]"
          style={{
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '34%' : '64%',
          }}
        />

        {steps.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;

          return (
            <div key={step.num} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-[#04121F] border-2 border-[#00B8FF] text-[#00B8FF] shadow-[0_0_18px_rgba(0,184,255,0.7)] scale-110'
                    : isCompleted
                    ? 'bg-[#00B8FF] border border-[#00B8FF] text-[#04121F] font-extrabold shadow-[0_0_10px_rgba(0,184,255,0.4)]'
                    : 'bg-[#081525] border border-white/10 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 transition-colors ${
                  isActive ? 'text-[#00B8FF] font-semibold' : isCompleted ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
