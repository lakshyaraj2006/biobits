import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const TrustBadge = ({ type, className = '' }) => {
  const badgeConfig = {
    verified: {
      text: '✓ Verified',
      style: 'text-rose-800 bg-rose-50 border-rose-200'
    },
    sahay_checked: {
      text: 'Sahay Checked',
      style: 'text-brand-primary bg-rose-50/50 border-brand-primary/20'
    },
    government: {
      text: 'Government-linked',
      style: 'text-amber-800 bg-amber-50 border-amber-200'
    },
    community: {
      text: 'Community Verified',
      style: 'text-stone-800 bg-stone-50 border-stone-200'
    },
    recent: {
      text: 'Recently Confirmed',
      style: 'text-emerald-800 bg-emerald-50 border-emerald-200'
    },
    emergency: {
      text: 'Emergency Capable',
      style: 'text-red-950 bg-red-100 border-red-300'
    }
  };

  const current = badgeConfig[type] || badgeConfig['verified'];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${current.style} ${className}`}
    >
      <ShieldCheck className="w-3 h-3 text-current shrink-0" />
      <span>{current.text}</span>
    </span>
  );
};
