import React from 'react';

export const AdminBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Deep Graphite Charcoal Base */}
      <div className="absolute inset-0 bg-[#07090F]" />

      {/* Atmospheric Radial Glows */}
      <div className="absolute -top-40 left-1/4 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(117,103,255,0.09),transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(32,224,194,0.07),transparent_70%)] blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(77,163,255,0.04),transparent_80%)] blur-3xl" />

      {/* Subtle Digital Circuit / Command Center Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top & Bottom Cinematic Vignette Gradients */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#04060A] to-transparent opacity-80" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#04060A] to-transparent opacity-80" />
    </div>
  );
};
