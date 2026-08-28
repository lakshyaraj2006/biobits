import React, { useState } from 'react';
import {
  HeartHandshake,
  Heart,
  Baby,
  Scale,
  Calendar,
  Sparkles,
  ShieldCheck,
  Send,
  Volume2
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatCard } from '../common/StatCard';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { PregnancyTracker } from './PregnancyTracker';
import { ChildVaccineScheduler } from './ChildVaccineScheduler';
import { GrowthMonitor } from './GrowthMonitor';
import { ReminderSimulatorModal } from './ReminderSimulatorModal';

export const MaternalChildHub = () => {
  const {
    pregnantMothers,
    childVaccinations,
    activeReminderModal,
    setActiveReminderModal,
  } = useHealthData();
  const { t } = useLanguage();

  const [activeSubTab, setActiveSubTab] = useState('mothers'); // 'mothers' | 'children' | 'growth'

  const totalMothers = pregnantMothers.length;
  const highRiskMothers = pregnantMothers.filter((m) => m.highRisk).length;
  const totalChildren = childVaccinations.length;
  const overdueVaccinesCount = childVaccinations.reduce((acc, child) => {
    return acc + child.vaccines.filter((v) => v.status === 'overdue').length;
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-800 to-slate-900 text-white p-6 sm:p-9 shadow-xl border border-teal-700/50">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Janani & Shishu Suraksha • National Universal Immunization (UIP)</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('maternalHeader', 'Maternal & Child Health Module')}
            </h2>
            <AudioVoiceButton
              text={`${t('maternalHeader')}. ${t('maternalSubheader')}. Track prenatal visits for mothers and timely vaccination milestones for infants.`}
              size="lg"
              className="bg-white/20 text-white border-white/30"
            />
          </div>

          <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-medium">
            {t(
              'maternalSubheader',
              'Sends automated reminders for vaccines and pregnancy checkups so mothers and babies don’t miss life-saving care.'
            )}
          </p>

          {/* Sub-tab buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setActiveSubTab('mothers')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${
                activeSubTab === 'mothers'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900 border border-emerald-600/40'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{t('tabMothers', 'Pregnant Mothers (ANC)')} ({totalMothers})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('children')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${
                activeSubTab === 'children'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900 border border-emerald-600/40'
              }`}
            >
              <Baby className="w-3.5 h-3.5 text-sky-400" />
              <span>{t('tabChildren', 'Child Immunization (UIP)')} ({totalChildren})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('growth')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${
                activeSubTab === 'growth'
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900 border border-emerald-600/40'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('tabGrowth', 'WHO Growth & Nutrition')}</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 bottom-0 -mb-10 -mr-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Registered Mothers (ANC)"
          value={totalMothers}
          subtitle="Prenatal tracking active"
          icon={Heart}
          color="rose"
        />
        <StatCard
          title="High-Risk Pregnancy Alerts"
          value={highRiskMothers}
          subtitle="Specialist doctor monitoring"
          icon={HeartHandshake}
          color="amber"
        />
        <StatCard
          title="Immunized Children (UIP)"
          value={totalChildren}
          subtitle="Universal vaccination cards"
          icon={Baby}
          color="sky"
        />
        <StatCard
          title="Overdue Vaccine Alerts"
          value={overdueVaccinesCount}
          subtitle="Immediate reminder needed"
          icon={ShieldCheck}
          color={overdueVaccinesCount > 0 ? 'rose' : 'emerald'}
        />
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'mothers' && (
        <PregnancyTracker
          onOpenReminder={(mother) => setActiveReminderModal(mother)}
        />
      )}

      {activeSubTab === 'children' && (
        <ChildVaccineScheduler
          onOpenReminder={(child) => setActiveReminderModal(child)}
        />
      )}

      {activeSubTab === 'growth' && <GrowthMonitor />}

      {/* Reminder Simulator Modal */}
      {activeReminderModal && (
        <ReminderSimulatorModal
          recipient={activeReminderModal}
          isOpen={Boolean(activeReminderModal)}
          onClose={() => setActiveReminderModal(null)}
        />
      )}
    </div>
  );
};
