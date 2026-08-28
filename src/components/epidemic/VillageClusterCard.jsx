import React from 'react';
import {
  Activity,
  AlertTriangle,
  Droplets,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { useLanguage } from '../../context/LanguageContext';

export const VillageClusterCard = ({ cluster, onSelect }) => {
  const { t } = useLanguage();

  const isEmergency = cluster.riskLevel === 'Emergency';
  const isAlert = cluster.riskLevel === 'Alert';
  const isWatch = cluster.riskLevel === 'Watch';

  const riskBadgeColor = isEmergency
    ? 'bg-rose-600 text-white animate-pulse'
    : isAlert
    ? 'bg-orange-500 text-white'
    : isWatch
    ? 'bg-amber-500 text-white'
    : 'bg-emerald-600 text-white';

  const audioSummary = `Village ${cluster.villageName}. Status: ${cluster.riskLevel}. Primary symptom spike: ${cluster.primarySymptom}. ${cluster.casesThisWeek} cases recorded compared to baseline of ${cluster.baselineCases}. Suspected: ${cluster.suspectedDisease}. Recommended action: ${cluster.recommendedAction}`;

  return (
    <div
      onClick={() => onSelect(cluster)}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 p-5 sm:p-6 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Top indicator strip for high risk */}
      {isEmergency && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-600 to-rose-500 animate-pulse"></div>
      )}

      <div>
        {/* Header with Risk Level */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {cluster.villageName}
              </h4>
              <AudioVoiceButton text={audioSummary} size="sm" />
            </div>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              {cluster.block} • Pop: {cluster.population.toLocaleString()}
            </p>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${riskBadgeColor}`}>
            {cluster.riskLevel}
          </span>
        </div>

        {/* Anomaly Score Bar */}
        <div className="mt-4 bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">Outbreak Anomaly Index:</span>
            <span className={isEmergency ? 'text-rose-600 font-black' : 'text-slate-800'}>
              {cluster.anomalyScore}/100
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isEmergency
                  ? 'bg-rose-500'
                  : isAlert
                  ? 'bg-orange-500'
                  : isWatch
                  ? 'bg-amber-400'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${cluster.anomalyScore}%` }}
            ></div>
          </div>
        </div>

        {/* Primary Symptom & Suspected Outbreak */}
        <div className="mt-4 space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              🚨 Dominant Symptom Surge:
            </span>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">
              {cluster.primarySymptom}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500">Suspected Pathogen:</span>
            <span className="font-bold text-slate-800">{cluster.suspectedDisease}</span>
          </div>
        </div>

        {/* Cases vs Baseline Comparison */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
            <span className="text-[10px] font-semibold text-rose-600 block">7-Day Cases</span>
            <strong className="text-base font-extrabold text-rose-900">
              {cluster.casesThisWeek}
            </strong>
            <span className="text-[10px] font-bold text-rose-600 block">{cluster.spikePercentage}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-500 block">Normal Baseline</span>
            <strong className="text-base font-extrabold text-slate-800">
              {cluster.baselineCases}
            </strong>
            <span className="text-[10px] text-slate-400 block">Expected Cases</span>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Droplets className="w-3.5 h-3.5 text-sky-500" />
          <span className="truncate max-w-[170px] text-[11px]">{cluster.waterSourceStatus}</span>
        </div>

        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
          <span>Action Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
