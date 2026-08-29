import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

export const DoctorQueueView = ({ onSelectCaseForRx }) => {
  const { cases } = useHealthData();
  const { t, translateText } = useLanguage();

  const [filterPriority, setFilterPriority] = useState('all'); // all | Emergency | Urgent | Routine
  const [filterStatus, setFilterStatus] = useState('all'); // all | pending | reviewed
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = cases.filter((c) => {
    const matchesPriority = filterPriority === 'all' || c.triageLevel === filterPriority;
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesSearch =
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesStatus && matchesSearch;
  });

  const pendingCount = cases.filter((c) => c.status === 'pending').length;
  const emergencyCount = cases.filter((c) => c.triageLevel === 'Emergency' && c.status === 'pending').length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
      
      {/* Header & Clinical Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              {t('doctorQueue', 'PHC Doctor Clinical Consultation Queue')}
            </h3>
            <AudioVoiceButton
              text={`${t('doctorQueue')}. ${t('immediatePriority')}.`}
              size="sm"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('teleSubheader', 'Review patient case files asynchronously, evaluate photos & vitals, and issue signed e-prescriptions.')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>{emergencyCount} {t('emergencyTriaged', 'Emergency Pending')}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-800">
            <span>{pendingCount} {t('pendingReview', 'Awaiting Review')}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder', 'Search by patient name, village, or Case ID...')}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none"
          >
            <option value="all">{t('triageLevel', 'All Triage Priorities')}</option>
            <option value="Emergency">🔴 {translateText('Emergency')}</option>
            <option value="Urgent">🟡 {translateText('Urgent')}</option>
            <option value="Routine">🟢 {translateText('Routine')}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none"
          >
            <option value="all">{t('status', 'All Status')}</option>
            <option value="pending">⏳ {t('pendingReview', 'Pending Review')}</option>
            <option value="reviewed">✓ {t('rxIssued', 'Rx Issued')}</option>
          </select>
        </div>
      </div>

      {/* Table View of Cases for PHC Doctor */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <th className="py-3 px-4">{t('patientName', 'Case ID & Patient')}</th>
              <th className="py-3 px-4">{t('triageLevel', 'Triage Risk')}</th>
              <th className="py-3 px-4">{t('villageLabel', 'Village')}</th>
              <th className="py-3 px-4">{t('vitalsTitle', 'Key Vitals')}</th>
              <th className="py-3 px-4">{t('symptomsTitle', 'Chief Symptoms')}</th>
              <th className="py-3 px-4">{t('status', 'Status')}</th>
              <th className="py-3 px-4 text-right">{t('actions', 'Clinical Action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredCases.map((c) => {
              const isReviewed = c.status === 'reviewed';
              const isEmergency = c.triageLevel === 'Emergency';
              return (
                <tr
                  key={c.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    isEmergency && !isReviewed ? 'bg-rose-50/40' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      {c.photoUrl ? (
                        <img
                          src={c.photoUrl}
                          alt="Patient"
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                          {c.patientName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <strong className="text-slate-900 block font-bold text-xs">{c.patientName}</strong>
                        <span className="text-[10px] text-slate-500">{c.id} • {c.age}y/{translateText(c.gender)}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      c.triageLevel === 'Emergency'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : c.triageLevel === 'Urgent'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {translateText(c.triageLevel)}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {c.village}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 text-[11px]">
                      <span className={`block font-semibold ${c.vitals.temperature >= 101 ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                        {t('temp', 'Temp')}: {c.vitals.temperature}°F
                      </span>
                      <span className="text-slate-500 block">
                        {t('bp', 'BP')}: {c.vitals.bpSys}/{c.vitals.bpDia} • {t('spO2', 'SpO2')}: {c.vitals.spO2}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="truncate text-slate-700 font-semibold" title={c.symptoms.map(s => translateText(s)).join(', ')}>
                      {c.symptoms.slice(0, 2).map(s => translateText(s)).join(', ')}
                      {c.symptoms.length > 2 && ` +${c.symptoms.length - 2}`}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {isReviewed ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        {t('rxIssued', 'Rx Issued')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Clock className="w-3 h-3" />
                        {t('pendingReview', 'Pending')}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectCaseForRx(c)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                        isReviewed
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                      }`}
                    >
                      {isReviewed ? t('viewEditRx', 'View / Edit Rx') : `${t('writeRx', 'Write Rx')} →`}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
