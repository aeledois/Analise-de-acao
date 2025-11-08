import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L1 12h3v8h16v-8h3L12 2zm0 2.83l7 7V18H5v-6.17l7-7z" />
    <path d="M9 11h6v6H9z" />
  </svg>
);

export const LoadingSpinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const BuyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
);

export const SellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
    </svg>
);

export const HoldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.182-3.182m0-4.991v4.99" />
    </svg>
);

export const AnalysisIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 56V8H56" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 56V8" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M24 56V8" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M32 56V8" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M40 56V8" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M48 56V8" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M8 48H56" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M8 40H56" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M8 32H56" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M8 24H56" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M8 16H56" stroke="#374151" strokeWidth="1" strokeDasharray="2 2"/>
      <rect x="12" y="40" width="8" height="16" fill="#0052FF" opacity="0.6"/>
      <rect x="22" y="32" width="8" height="24" fill="#0052FF" opacity="0.6"/>
      <rect x="32" y="24" width="8" height="32" fill="#0052FF" opacity="0.6"/>
      <rect x="42" y="16" width="8" height="40" fill="#10B981" opacity="0.8"/>
      <path d="M48 8 L50 12 L54 14 L50 16 L48 20 L46 16 L42 14 L46 12 Z" fill="#60A5FA"/>
      <path d="M12 28 L13 31 L15 32 L13 33 L12 36 L11 33 L9 32 L11 31 Z" fill="#60A5FA" opacity="0.7"/>
    </svg>
  );