import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'emerald', audioText = '' }) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-200/80',
      text: 'text-emerald-700',
      iconBg: 'bg-emerald-600 text-white',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-200/80',
      text: 'text-amber-700',
      iconBg: 'bg-amber-500 text-white',
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-200/80',
      text: 'text-rose-700',
      iconBg: 'bg-rose-600 text-white',
    },
    sky: {
      bg: 'bg-sky-500/10',
      border: 'border-sky-200/80',
      text: 'text-sky-700',
      iconBg: 'bg-sky-600 text-white',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-200/80',
      text: 'text-indigo-700',
      iconBg: 'bg-indigo-600 text-white',
    },
  };

  const currentTheme = colorMap[color] || colorMap.emerald;

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border ${currentTheme.border} ${currentTheme.bg} backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
            {trend && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-600 line-clamp-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 sm:p-3 rounded-xl shadow-sm ${currentTheme.iconBg}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
    </div>
  );
};
