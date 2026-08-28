import React from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Thermometer,
  Activity,
  Heart,
  Volume2,
  Eye,
  Calendar,
  Sparkles,
  MapPin
} from 'lucide-react';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { useLanguage } from '../../context/LanguageContext';

export const PatientCaseCard = ({ caseItem, onOpenRx, onReview }) => {
  const { t } = useLanguage();

  const isReviewed = caseItem.status === 'reviewed';
  const isEmergency = caseItem.triageLevel === 'Emergency';
  const isUrgent = caseItem.triageLevel === 'Urgent';

  const triageClasses = isEmergency
    ? 'bg-rose-50 border-rose-200 text-rose-800'
    : isUrgent
    ? 'bg-amber-50 border-amber-200 text-amber-800'
    : 'bg-emerald-50 border-emerald-200 text-emerald-800';

  const badgeColor = isEmergency
    ? 'bg-rose-600 text-white animate-pulse'
    : isUrgent
    ? 'bg-amber-500 text-white'
    : 'bg-emerald-600 text-white';

  const audioSummary = `Case for patient ${caseItem.patientName}, age ${caseItem.age}, village ${caseItem.village}. Symptoms: ${caseItem.symptoms.join(', ')}. Temperature: ${caseItem.vitals.temperature} Fahrenheit. Blood pressure: ${caseItem.vitals.bpSys} over ${caseItem.vitals.bpDia}. ${isReviewed ? 'Prescription is ready.' : 'Pending doctor review.'}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      
      {/* Card Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {caseItem.photoUrl ? (
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src={caseItem.photoUrl}
                  alt="Medical lesion"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-slate-900/80 text-[9px] text-white px-1 font-bold">
                  IMG
                </span>
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-extrabold text-lg shrink-0">
                {caseItem.patientName?.charAt(0) || 'P'}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-900 text-base leading-tight group-hover:text-emerald-700 transition-colors">
                  {caseItem.patientName}
                </h4>
                <AudioVoiceButton text={audioSummary} size="sm" />
              </div>

              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <span>{caseItem.age} Yrs • {caseItem.gender}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-slate-600">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {caseItem.village}
                </span>
              </p>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${badgeColor}`}>
            {caseItem.triageLevel}
          </span>
        </div>

        {/* Symptoms Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {caseItem.symptoms?.map((sym, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80"
            >
              {sym}
            </span>
          ))}
        </div>

        {/* Vitals Summary Pill Strip */}
        <div className="mt-3.5 grid grid-cols-3 sm:grid-cols-4 gap-1.5 text-[11px]">
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
            <span className="text-slate-400 block text-[10px]">Temp</span>
            <strong className={`font-bold ${caseItem.vitals.temperature >= 100.4 ? 'text-rose-600' : 'text-slate-800'}`}>
              {caseItem.vitals.temperature}°F
            </strong>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
            <span className="text-slate-400 block text-[10px]">BP</span>
            <strong className={`font-bold ${caseItem.vitals.bpSys >= 140 ? 'text-rose-600' : 'text-slate-800'}`}>
              {caseItem.vitals.bpSys}/{caseItem.vitals.bpDia}
            </strong>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
            <span className="text-slate-400 block text-[10px]">Pulse</span>
            <strong className="text-slate-800 font-bold">{caseItem.vitals.pulse} bpm</strong>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center hidden sm:block">
            <span className="text-slate-400 block text-[10px]">SpO2</span>
            <strong className="text-slate-800 font-bold">{caseItem.vitals.spO2}%</strong>
          </div>
        </div>
      </div>

      {/* Card Footer Status & Action */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {isReviewed ? (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t('rxIssued', 'Rx Issued')}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              {t('pendingDoctorReview', 'Doctor Reviewing')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isReviewed ? (
            <button
              onClick={() => onOpenRx(caseItem)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-sm shadow-emerald-600/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('viewRx', 'View Prescription')}</span>
            </button>
          ) : (
            <button
              onClick={() => onReview(caseItem)}
              className="flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-sm shadow-teal-700/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('createRx', 'Write Rx')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
