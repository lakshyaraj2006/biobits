import React from 'react';
import { Clock } from 'lucide-react';

export const LiveStatusIndicator = ({ level, time, className = '' }) => {
  const configs = {
    high: {
      dot: 'bg-emerald-500',
      badge: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      label: 'Confirmed <15 min ago'
    },
    medium: {
      dot: 'bg-amber-500',
      badge: 'bg-amber-50 border-amber-200 text-amber-800',
      label: 'Confirmed 15–60 min ago'
    },
    stale: {
      dot: 'bg-orange-500',
      badge: 'bg-orange-50 border-orange-200 text-orange-800',
      label: 'Older than 60 min'
    },
    unverified: {
      dot: 'bg-stone-400',
      badge: 'bg-stone-50 border-stone-200 text-stone-700',
      label: 'Unverified'
    }
  };

  const active = configs[level] || configs['unverified'];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2 rounded-xl bg-white/40 border border-cream-border/60 ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {level === 'high' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${active.dot}`}></span>
        </span>
        <span className="text-[10px] font-bold text-text-dark">{active.label}</span>
      </div>
      {time && (
        <span className="flex items-center gap-1 text-[9px] font-semibold text-text-muted bg-stone-100/50 px-1.5 py-0.5 rounded-md">
          <Clock className="w-3 h-3 text-text-muted shrink-0" />
          <span>Last Confirmed: {time}</span>
        </span>
      )}
    </div>
  );
};
