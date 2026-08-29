import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Radio,
  ShieldCheck,
  Search,
  Flame
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { StatCard } from '../common/StatCard';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { VillageClusterCard } from './VillageClusterCard';
import { OutbreakDetailModal } from './OutbreakDetailModal';

export const EpidemicRadar = () => {
  const {
    epidemicClusters,
    selectedClusterDetail,
    setSelectedClusterDetail,
  } = useHealthData();
  const { t, translateText } = useLanguage();

  const [filterRisk, setFilterRisk] = useState('all'); // all | Emergency | Alert | Watch | Safe
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClusters = epidemicClusters.filter((c) => {
    const matchesRisk = filterRisk === 'all' || c.riskLevel === filterRisk;
    const matchesSearch =
      c.villageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primarySymptom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.suspectedDisease.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const totalVillages = epidemicClusters.length;
  const emergencyVillages = epidemicClusters.filter((c) => c.riskLevel === 'Emergency').length;
  const activeAlerts = epidemicClusters.filter((c) => c.riskLevel === 'Alert' || c.riskLevel === 'Emergency').length;
  const safeVillages = epidemicClusters.filter((c) => c.riskLevel === 'Safe').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Epidemic Radar Hero Banner with Radar Sweep Animation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-9 shadow-xl border border-rose-900/50">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-bold border border-rose-400/30">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span>{t('surveillanceTagline', 'Real-Time Syndromic Outbreak Surveillance • AI Anomaly Detection')}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t('epidemicHeader', 'Epidemic Early-Warning Radar')}
            </h2>
            <AudioVoiceButton
              text={`${t('epidemicHeader')}. ${t('epidemicSubheader')}.`}
              size="lg"
              className="bg-white/20 text-white border-white/30"
            />
          </div>

          <p className="text-xs sm:text-base text-rose-100/90 leading-relaxed font-medium">
            {t(
              'epidemicSubheader',
              'Looks for unusual spikes in symptoms across villages (like sudden fever cases or severe diarrhea) to catch disease outbreaks early before they become deadly epidemics.'
            )}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-rose-900/60 backdrop-blur-md border border-rose-500/40 px-3.5 py-2 rounded-2xl flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
              <span><strong>{t('hotspot', 'Hotspot')}:</strong> Rampur Cluster (+950% {translateText('Diarrhea')} {t('spike', 'Spike')})</span>
            </div>
            <div className="bg-orange-900/60 backdrop-blur-md border border-orange-500/40 px-3.5 py-2 rounded-2xl flex items-center gap-2">
              <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
              <span><strong>{t('warning', 'Warning')}:</strong> Balanagar (+440% {translateText('High Fever')} {t('spike', 'Spike')})</span>
            </div>
          </div>
        </div>

        {/* Decorative Radar Sweep Graphic in background */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border-4 border-rose-500/20 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-56 h-56 rounded-full border-2 border-rose-500/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-rose-500/40 animate-ping"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-rose-500/20 to-transparent animate-radar rounded-full"></div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title={t('monitoredClusters', 'Monitored Village Clusters')}
          value={totalVillages}
          subtitle={t('villageLabel', 'Real-time geo-tagged health surveillance')}
          icon={Radio}
          color="indigo"
        />
        <StatCard
          title={t('activeHazards', 'Active Outbreak Hazards')}
          value={emergencyVillages}
          subtitle={t('immediatePriority', 'Immediate containment protocols active')}
          icon={AlertTriangle}
          color="rose"
        />
        <StatCard
          title={t('underWatch', 'Clusters Under Watch')}
          value={activeAlerts}
          subtitle={t('anomalySpikeIn', 'Symptom anomaly detected')}
          icon={Activity}
          color="amber"
        />
        <StatCard
          title={t('safeBaseline', 'Normal Baseline Hamlets')}
          value={safeVillages}
          subtitle={t('verified', 'Routine epidemiological baseline')}
          icon={ShieldCheck}
          color="emerald"
        />
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
            {t('villageSyndromic', 'Village Syndromic Clusters')} ({filteredClusters.length})
          </h3>
          <AudioVoiceButton
            text={`${t('villageSyndromic')}. ${t('viewDossier', 'Tap on any village cluster card to inspect the full anomaly trend curve.')}`}
            size="sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchVillagePlaceholder', 'Search village or disease...')}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/70"
            />
          </div>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="all">{t('allRiskLevels', 'All Risk Levels')}</option>
            <option value="Emergency">🔴 {translateText('Emergency')} {t('hazardOnly', 'Hazard Only')}</option>
            <option value="Alert">🟠 {translateText('Alert')} {t('only', 'Only')}</option>
            <option value="Watch">🟡 {t('underWatch', 'Under Watch')}</option>
            <option value="Safe">🟢 {t('safeBaseline', 'Safe Baseline')}</option>
          </select>
        </div>
      </div>

      {/* Village Cluster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredClusters.map((cluster) => (
          <VillageClusterCard
            key={cluster.id}
            cluster={cluster}
            onSelect={(item) => setSelectedClusterDetail(item)}
          />
        ))}
      </div>

      {/* Outbreak Detail Modal */}
      {selectedClusterDetail && (
        <OutbreakDetailModal
          cluster={selectedClusterDetail}
          isOpen={Boolean(selectedClusterDetail)}
          onClose={() => setSelectedClusterDetail(null)}
        />
      )}
    </div>
  );
};
