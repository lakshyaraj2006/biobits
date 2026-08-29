import React, { useState } from 'react';
import {
  Heart,
  Baby,
  Scale,
  Sparkles,
  ShieldCheck,
  HeartHandshake
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep via-[#9f1239] to-[#4c0519] text-white p-6 sm:p-9 shadow-xl border border-brand-deep">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-rose-100 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-rose-200" />
            <span>{t('jananiUipBanner', 'Janani & Shishu Suraksha • National Universal Immunization (UIP)')}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('maternalHeader', 'Maternal & Child Health Module')}
            </h2>
            <AudioVoiceButton
              text={`${t('maternalHeader')}. ${t('maternalSubheader')}.`}
              size="lg"
              className="!bg-white !text-brand-deep !border-white shrink-0 shadow-sm"
            />
          </div>

          <p className="text-xs sm:text-base text-rose-100 leading-relaxed font-medium">
            {t(
              'maternalSubheader',
              'Sends automated reminders for vaccines and pregnancy checkups so mothers and babies don’t miss life-saving care.'
            )}
          </p>

          {/* Sub-tab buttons */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setActiveSubTab('mothers')}
              className={`px-3.5 py-2 rounded-xl font-extrabold flex items-center gap-2 transition-all text-xs border ${
                activeSubTab === 'mothers'
                  ? 'bg-white text-brand-deep border-white shadow-md'
                  : 'bg-[#4c0519]/70 text-rose-100 hover:bg-[#4c0519] border-rose-300/30'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>{t('tabMothers', 'Pregnant Mothers (ANC)')} ({totalMothers})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('children')}
              className={`px-3.5 py-2 rounded-xl font-extrabold flex items-center gap-2 transition-all text-xs border ${
                activeSubTab === 'children'
                  ? 'bg-white text-brand-deep border-white shadow-md'
                  : 'bg-[#4c0519]/70 text-rose-100 hover:bg-[#4c0519] border-rose-300/30'
              }`}
            >
              <Baby className="w-3.5 h-3.5 text-sky-400" />
              <span>{t('tabChildren', 'Child Immunization (UIP)')} ({totalChildren})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('growth')}
              className={`px-3.5 py-2 rounded-xl font-extrabold flex items-center gap-2 transition-all text-xs border ${
                activeSubTab === 'growth'
                  ? 'bg-white text-brand-deep border-white shadow-md'
                  : 'bg-[#4c0519]/70 text-rose-100 hover:bg-[#4c0519] border-rose-300/30'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('tabGrowth', 'WHO Growth & Nutrition')}</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 bottom-0 -mb-10 -mr-10 w-72 h-72 bg-rose-400/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title={t('registeredMothers', 'Registered Mothers (ANC)')}
          value={totalMothers}
          subtitle={t('ancTrackingActive', 'Prenatal tracking active')}
          icon={Heart}
          color="rose"
        />
        <StatCard
          title={t('highRiskMothers', 'High-Risk Pregnancy Alerts')}
          value={highRiskMothers}
          subtitle={t('highRiskFlag', 'Specialist doctor monitoring')}
          icon={HeartHandshake}
          color="amber"
        />
        <StatCard
          title={t('immunizedChildren', 'Immunized Children (UIP)')}
          value={totalChildren}
          subtitle={t('vaccinationCard', 'Universal vaccination cards')}
          icon={Baby}
          color="sky"
        />
        <StatCard
          title={t('overdueVaccines', 'Overdue Vaccine Alerts')}
          value={overdueVaccinesCount}
          subtitle={t('immediateReminder', 'Immediate reminder needed')}
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
