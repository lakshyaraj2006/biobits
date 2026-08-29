import React, { useState } from 'react';
import {
  PlusCircle,
  Clock,
  FileCheck,
  AlertTriangle,
  Sparkles,
  Users,
  Search
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatCard } from '../common/StatCard';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { PatientCaseCard } from './PatientCaseCard';
import { DoctorQueueView } from './DoctorQueueView';
import { NewCaseModal } from './NewCaseModal';
import { PrescriptionModal } from './PrescriptionModal';

export const TeleconsultationHub = () => {
  const {
    cases,
    userRole,
    isNewCaseModalOpen,
    setIsNewCaseModalOpen,
    selectedCaseForRx,
    setSelectedCaseForRx,
  } = useHealthData();

  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState(userRole === 'doctor' ? 'doctor' : 'patient');
  const [filterQuery, setFilterQuery] = useState('');

  React.useEffect(() => {
    if (userRole === 'doctor') setViewMode('doctor');
  }, [userRole]);

  const totalCases = cases.length;
  const prescriptionsIssued = cases.filter((c) => c.status === 'reviewed').length;
  const pendingReview = cases.filter((c) => c.status === 'pending').length;
  const emergencyCount = cases.filter((c) => c.triageLevel === 'Emergency').length;

  const filteredCases = cases.filter((c) =>
    c.patientName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.village.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.symptoms.some((s) => s.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep via-[#9f1239] to-[#4c0519] text-white p-6 sm:p-9 shadow-xl border border-brand-deep">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-100 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-rose-200" />
            <span>{t('storeAndForward', 'Store & Forward Rural Teleconsultation • 100% Offline Compatible')}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('teleHeader', 'Asynchronous Teleconsultation')}
            </h2>
            <AudioVoiceButton
              text={`${t('teleHeader')}. ${t('teleSubheader')}.`}
              size="lg"
              className="!bg-white !text-brand-deep !border-white shrink-0"
            />
          </div>

          <p className="text-xs sm:text-base text-rose-100 leading-relaxed font-medium">
            {t('teleSubheader', 'The doctor gets a case file (symptoms, vitals, photo) and replies with a prescription whenever they are free — no need for both people online at once.')}
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsNewCaseModalOpen(true)}
              className="flex items-center gap-2 bg-white text-brand-deep hover:bg-rose-50 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-black/15 hover:scale-[1.01] active:scale-[0.99] transition-all border border-white"
            >
              <PlusCircle className="w-4 h-4 text-brand-primary" />
              <span>{t('btnNewCase', '+ Log New Case File')}</span>
            </button>

            <div className="flex items-center gap-1 bg-[#4c0519] p-1 rounded-xl border border-rose-300/30 text-xs shadow-inner">
              <button
                onClick={() => setViewMode('patient')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs border ${viewMode === 'patient' ? 'bg-brand-primary text-white border-rose-300 shadow-sm' : 'bg-transparent text-rose-100 border-transparent hover:bg-white/10'}`}
              >
                👤 {t('patientView', 'Patient View')}
              </button>
              <button
                onClick={() => setViewMode('doctor')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs border ${viewMode === 'doctor' ? 'bg-brand-primary text-white border-rose-300 shadow-sm' : 'bg-transparent text-rose-100 border-transparent hover:bg-white/10'}`}
              >
                🩺 {t('doctorQueue', 'Doctor Queue')} ({pendingReview})
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 bottom-0 -mb-10 w-60 h-60 bg-rose-200/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard title={t('totalCases', 'Total Registered Cases')} value={totalCases} subtitle={t('villageLabel', 'Cases logged across PHC villages')} icon={Users} color="rose" />
        <StatCard title={t('prescriptionsIssued', 'Prescriptions Issued')} value={prescriptionsIssued} subtitle={t('rxReady', 'Digital signed slips ready')} icon={FileCheck} color="rose" />
        <StatCard title={t('pendingReview', 'Pending Clinical Review')} value={pendingReview} subtitle={t('awaitingDoctor', 'Awaiting doctor evaluation')} icon={Clock} color="amber" />
        <StatCard title={t('emergencyTriaged', 'Emergency Triaged')} value={emergencyCount} subtitle={t('immediatePriority', 'Immediate clinical priority')} icon={AlertTriangle} color="rose" />
      </div>

      {viewMode === 'doctor' ? (
        <DoctorQueueView onSelectCaseForRx={(caseItem) => setSelectedCaseForRx(caseItem)} />
      ) : (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-cream-border shadow-sm">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-text-dark">{t('myCases', 'Community Case History')} ({filteredCases.length})</h3>
              <AudioVoiceButton text={`${t('myCases', 'Community Case History')}. ${t('viewRx', 'Tap View Prescription to see doctor instructions.')}`} size="sm" />
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={t('searchPlaceholder', 'Search patient, symptom or village...')}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-cream-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary bg-cream-panel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCases.map((caseItem) => (
              <PatientCaseCard key={caseItem.id} caseItem={caseItem} onOpenRx={(item) => setSelectedCaseForRx(item)} onReview={(item) => setSelectedCaseForRx(item)} />
            ))}
          </div>
        </div>
      )}

      <NewCaseModal isOpen={isNewCaseModalOpen} onClose={() => setIsNewCaseModalOpen(false)} />
      {selectedCaseForRx && (
        <PrescriptionModal caseData={selectedCaseForRx} isOpen={Boolean(selectedCaseForRx)} onClose={() => setSelectedCaseForRx(null)} />
      )}
    </div>
  );
};
