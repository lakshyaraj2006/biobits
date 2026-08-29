import React from 'react';
import {
  CheckCircle2,
  Clock,
  Send,
  ShieldAlert
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

export const PregnancyTracker = ({ onOpenReminder }) => {
  const { pregnantMothers } = useHealthData();
  const { t, translateText } = useLanguage();

  return (
    <div className="space-y-6">
      {pregnantMothers.map((mother) => {
        const completedVisits = mother.ancVisits.filter((v) => v.status === 'completed').length;
        const ifaPercentage = Math.min(100, Math.round((mother.ifaTabletsConsumed / mother.ifaTabletsTarget) * 100));

        const audioSummary = `${mother.name}, ${mother.gestationalWeeks} ${t('weeks', 'weeks')}, ${translateText(mother.trimester)}. ${mother.highRisk ? t('highRiskFlag', 'High Risk') + ': ' + translateText(mother.riskReason) : t('pregnancyProgress', 'Healthy pregnancy progress.')}`;

        return (
          <div
            key={mother.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 sm:p-7 space-y-6 relative overflow-hidden"
          >
            {mother.highRisk && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 to-amber-500"></div>
            )}

            {/* Mother Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-extrabold text-xl shrink-0">
                  🤰
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {mother.name}
                    </h4>
                    <AudioVoiceButton text={audioSummary} size="sm" />
                    {mother.highRisk && (
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1 animate-pulse">
                        <ShieldAlert className="w-3 h-3 text-rose-600" />
                        {t('highRiskFlag', 'HIGH RISK PREGNANCY')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {t('wifeOf', 'Wife of')} {mother.husbandName} • {mother.village} • {mother.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenReminder(mother)}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-brand-deep border border-rose-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{t('sendReminder', 'Send Vernacular Reminder')}</span>
                </button>
              </div>
            </div>

            {/* Gestational Age & High Risk Reason */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 font-semibold block">{t('gestationalProgress', 'Pregnancy Progress')}</span>
                <strong className="text-slate-900 text-sm">{mother.gestationalWeeks} {t('weeks', 'Weeks')} ({translateText(mother.trimester)})</strong>
                <span className="text-[10px] text-slate-400 block">{t('eddLabel', 'EDD')}: {mother.eddDate}</span>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">{t('ifaTracker', 'IFA Iron Tablets Tracker')}</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${ifaPercentage}%` }}></div>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px]">{mother.ifaTabletsConsumed}/{mother.ifaTabletsTarget}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">{t('ifaGoal', 'Goal: 180 Tablets (Anemia Prevention)')}</span>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">{t('clinicalRiskStatus', 'Clinical Risk Status')}</span>
                {mother.highRisk ? (
                  <strong className="text-rose-700 text-xs block leading-tight">{translateText(mother.riskReason)}</strong>
                ) : (
                  <strong className="text-emerald-700 text-xs block">{t('healthyBaseline', 'Normal & Healthy Baseline')}</strong>
                )}
              </div>
            </div>

            {/* 4 Mandatory Antenatal Care (ANC) Timeline */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t('fourMandatoryAnc', '4 Mandatory ANC Prenatal Checkups (National Health Mission)')}:
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  {completedVisits}/4 {t('completed', 'Completed')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {mother.ancVisits.map((v, idx) => {
                  const isDone = v.status === 'completed';
                  const isDue = v.status === 'due';
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : isDue
                          ? 'bg-amber-50 border-amber-300 text-amber-900 ring-1 ring-amber-400'
                          : 'bg-slate-50/50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs">{translateText(v.visit)}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isDue ? (
                          <span className="bg-amber-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                            {t('due', 'DUE')}
                          </span>
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600">
                        {t('date', 'Date')}: <strong>{v.date}</strong>
                      </p>

                      {isDone && (
                        <div className="mt-2 pt-2 border-t border-emerald-200/60 text-[10px] text-emerald-800 space-y-0.5 font-medium">
                          <p>{t('weight', 'Weight')}: {v.weight} kg • {t('bp', 'BP')}: {v.bp}</p>
                          <p>{t('hbLevel', 'Hb Level')}: <strong>{v.hb} g/dL</strong></p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pregnancy Vaccines */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold">{t('tdInjections', 'Tetanus-Diphtheria (Td) Injections')}:</span>
              {mother.vaccines?.map((vac, vi) => (
                <span
                  key={vi}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ${
                    vac.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  {vac.name} ({translateText(vac.status)})
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
