import React, { useState } from 'react';
import {
  X,
  Droplets,
  Users,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  TrendingUp,
  Truck,
  MessageSquare
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

export const OutbreakDetailModal = ({ cluster, isOpen, onClose }) => {
  const { triggerOutbreakAction } = useHealthData();
  const { t, translateText } = useLanguage();

  const [dispatchedKit, setDispatchedKit] = useState(false);
  const [deployedTeam, setDeployedTeam] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen || !cluster) return null;

  const isEmergency = cluster.riskLevel === 'Emergency';

  const handleDispatchKits = () => {
    setDispatchedKit(true);
    triggerOutbreakAction(cluster.id, 'Dispatched 500 ORS Sachets & Water Chlorination Kits');
  };

  const handleDeployTeam = () => {
    setDeployedTeam(true);
    triggerOutbreakAction(cluster.id, 'Mobile Medical Response Team Dispatched');
  };

  const handleBroadcastSMS = () => {
    setBroadcastSent(true);
    triggerOutbreakAction(cluster.id, `Broadcast Emergency SMS Advisory to ${cluster.villageName} (${cluster.population} residents)`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className={`p-5 text-white flex items-center justify-between ${
          isEmergency
            ? 'bg-gradient-to-r from-rose-700 via-red-700 to-rose-900'
            : 'bg-gradient-to-r from-teal-800 to-emerald-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {cluster.villageName} — {t('outbreakDossierTitle', 'Outbreak Early-Warning Dossier')}
                </h3>
                <AudioVoiceButton
                  text={`${cluster.villageName}. ${t('outbreakDossierTitle')}. ${translateText(cluster.suspectedDisease)}. ${cluster.spikePercentage}.`}
                  size="sm"
                  className="bg-white/20 text-white border-white/30"
                />
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                {cluster.block} • {t('population', 'Population')}: {cluster.population.toLocaleString()} • {t('triageLevel', 'Risk')}: {translateText(cluster.riskLevel)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Key Outbreak Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">{t('symptomSurge', 'Dominant Symptom')}</span>
              <strong className="text-slate-900 text-sm block truncate">{translateText(cluster.primarySymptom)}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{t('suspectedDisease', 'Suspected Cause')}</span>
              <strong className="text-rose-700 text-sm block">{translateText(cluster.suspectedDisease)}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{t('casesThisWeek', '7-Day Spike')}</span>
              <strong className="text-rose-600 text-sm block">{cluster.spikePercentage} {t('spike', 'Surge')}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">{t('waterStatus', 'Water Source Status')}</span>
              <strong className="text-amber-800 text-xs block truncate">{translateText(cluster.waterSourceStatus)}</strong>
            </div>
          </div>

          {/* Anomaly Trend Curve Chart */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {t('dailySurgeVsSafe', 'Daily Symptom Surge vs Historical Safe Baseline (Last 5 Days)')}
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {t('anomalyScore', 'Anomaly Score')}: {cluster.anomalyScore}/100
              </span>
            </div>

            {/* Custom Bar Chart Visualizer */}
            <div className="h-40 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
              {cluster.trendData.map((d, idx) => {
                const maxVal = 45;
                const caseHeight = Math.round((d.cases / maxVal) * 100);
                const baselineHeight = Math.round((d.baseline / maxVal) * 100);

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      {/* Baseline Bar */}
                      <div
                        className="w-1/3 bg-slate-300 rounded-t-md transition-all"
                        style={{ height: `${Math.max(10, baselineHeight)}%` }}
                        title={`Baseline: ${d.baseline}`}
                      ></div>
                      {/* Actual Surge Bar */}
                      <div
                        className={`w-1/2 rounded-t-md transition-all ${
                          d.cases > d.baseline * 2 ? 'bg-rose-600 animate-pulse' : 'bg-emerald-600'
                        }`}
                        style={{ height: `${Math.max(12, caseHeight)}%` }}
                        title={`Recorded Cases: ${d.cases}`}
                      ></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">{translateText(d.day)} ({d.cases})</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-1 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-300"></span>
                {t('baselineCases', 'Normal Baseline')} (~{cluster.baselineCases} {t('casesCount', 'cases')})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-600"></span>
                {t('reportedSpike', 'Reported Incident Spike')} ({cluster.casesThisWeek} {t('casesCount', 'cases')})
              </span>
            </div>
          </div>

          {/* Action Protocols & Emergency Response Buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {t('rapidInterventions', 'Rapid Public Health Interventions (Zero-Delay Actions)')}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Action 1: Dispatch Kits */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs">
                    <Droplets className="w-4 h-4" />
                    <span>{t('waterKits', 'Water & Testing Kits')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t('dispatchKitsDesc', 'Send chlorine purification tablets, ORS crates & water bacteriology testing kits to village handpump sites.')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDispatchKits}
                  disabled={dispatchedKit}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    dispatchedKit
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                  }`}
                >
                  {dispatchedKit ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('kitsDispatched', 'Kits Dispatched ✓')}
                    </>
                  ) : (
                    <>
                      <Truck className="w-3.5 h-3.5" />
                      {t('dispatchKitsNow', 'Dispatch Kits Now')}
                    </>
                  )}
                </button>
              </div>

              {/* Action 2: Mobile Fever Clinic */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <Users className="w-4 h-4" />
                    <span>{t('deployClinic', 'Deploy Mobile Clinic')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t('deployClinicDesc', 'Mobilize PHC Doctor, 2 Nurses, and diagnostic rapid test kits to village.')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDeployTeam}
                  disabled={deployedTeam}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    deployedTeam
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  {deployedTeam ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('teamDeployed', 'Team Deployed ✓')}
                    </>
                  ) : (
                    <>
                      <Users className="w-3.5 h-3.5" />
                      {t('deployTeamNow', 'Deploy Medical Team')}
                    </>
                  )}
                </button>
              </div>

              {/* Action 3: Mass SMS Warning */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('broadcastSMS', 'Broadcast SMS Warning')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t('broadcastSMSDesc', 'Send vernacular SMS & Voice Call advisory to all residents: Boil drinking water, drink ORS.')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBroadcastSMS}
                  disabled={broadcastSent}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    broadcastSent
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                  }`}
                >
                  {broadcastSent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t('smsBroadcasted', 'SMS Broadcasted ✓')}
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      {t('broadcastAlert', 'Broadcast SMS Alert')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {t('activeTeams', 'Active Health Teams on Field')}: <strong>{cluster.activeTeams}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
          >
            {t('close', 'Close Dossier')}
          </button>
        </div>
      </div>
    </div>
  );
};
