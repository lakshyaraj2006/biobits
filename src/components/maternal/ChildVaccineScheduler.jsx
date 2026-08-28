import React from 'react';
import {
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Sparkles,
  Baby,
  HeartPulse,
  Info
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

export const ChildVaccineScheduler = ({ onOpenReminder }) => {
  const { childVaccinations, updateVaccineStatus } = useHealthData();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {childVaccinations.map((child) => {
        const completedCount = child.vaccines.filter((v) => v.status === 'completed').length;
        const totalCount = child.vaccines.length;
        const hasOverdue = child.vaccines.some((v) => v.status === 'overdue');
        const dueToday = child.vaccines.filter((v) => v.status === 'due');

        const audioSummary = `Child immunization card for ${child.name}, mother ${child.motherName}, village ${child.village}. ${completedCount} of ${totalCount} vaccine doses completed. Weight: ${child.weightKg} kg. ${hasOverdue ? 'Alert: Measles vaccine is overdue!' : 'Vaccines are on schedule.'}`;

        return (
          <div
            key={child.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 sm:p-7 space-y-6 relative overflow-hidden"
          >
            {hasOverdue && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 to-red-600 animate-pulse"></div>
            )}

            {/* Child Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 font-extrabold text-xl shrink-0">
                  👶
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {child.name}
                    </h4>
                    <AudioVoiceButton text={audioSummary} size="sm" />
                    {hasOverdue && (
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
                        ⚠️ VACCINE OVERDUE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Mother: <strong>{child.motherName}</strong> • DOB: {child.dob} • {child.village}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenReminder(child)}
                  className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Send Vaccine SMS / Call</span>
                </button>
              </div>
            </div>

            {/* Immunization Progress & Growth Badge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 font-semibold block">Universal Immunization Progress</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-slate-800">{completedCount}/{totalCount}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">UIP Full Immunization Goal</span>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Child Growth & Weight</span>
                <strong className="text-slate-900 text-sm">{child.weightKg} kg • {child.heightCm} cm</strong>
                <span className="text-[10px] text-emerald-700 block font-semibold">{child.growthStatus}</span>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Immediate Action</span>
                {hasOverdue ? (
                  <strong className="text-rose-700 text-xs block">
                    Immediate MR-1 & Vit A Dose Needed at Anganwadi!
                  </strong>
                ) : dueToday.length > 0 ? (
                  <strong className="text-amber-700 text-xs block">
                    {dueToday.length} Dose(s) scheduled for this week.
                  </strong>
                ) : (
                  <strong className="text-emerald-700 text-xs block">
                    All age-appropriate doses completed on time.
                  </strong>
                )}
              </div>
            </div>

            {/* National Immunization Schedule (UIP) Vaccine Timeline Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Universal Immunization Schedule (Birth to 5 Years):
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Tap status to toggle dose completion
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {child.vaccines.map((vac) => {
                  const isDone = vac.status === 'completed';
                  const isOverdue = vac.status === 'overdue';
                  const isDue = vac.status === 'due';

                  return (
                    <div
                      key={vac.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                          : isOverdue
                          ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-400/50'
                          : isDue
                          ? 'bg-amber-50 border-amber-300 text-amber-950 ring-1 ring-amber-400'
                          : 'bg-slate-50/50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <strong className="text-xs font-extrabold text-slate-900 leading-tight">
                            {vac.name}
                          </strong>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase shrink-0 ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isOverdue
                              ? 'bg-rose-600 text-white animate-pulse'
                              : isDue
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {vac.status}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 font-semibold mt-1">
                          ⏰ Age Milestone: <strong>{vac.timing}</strong>
                        </p>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-snug">
                          🛡️ Prevents: {vac.prevents}
                        </p>
                      </div>

                      {/* Interactive Dose Toggle Button */}
                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          {isDone ? `Administered: ${vac.date}` : `Target: ${vac.date}`}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateVaccineStatus(
                              child.id,
                              vac.id,
                              isDone ? 'due' : 'completed'
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            isDone
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-slate-800 text-white hover:bg-slate-900 shadow-sm'
                          }`}
                        >
                          {isDone ? '✓ Administered' : 'Mark Given +'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
