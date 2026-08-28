import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Activity,
  HeartHandshake,
  Bot,
  PlusCircle,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Radio,
  Clock,
  CheckCircle2,
  FileText,
  Heart,
  Baby,
  ArrowRight,
  TrendingUp,
  MapPin,
  Flame,
  Volume2,
  Users,
  Wifi,
  WifiOff,
  Database
} from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { StatCard } from '../components/common/StatCard';
import { AudioVoiceButton } from '../components/common/AudioVoiceButton';

export const HomePage = () => {
  const { cases, epidemicClusters, pregnantMothers, childVaccinations, setIsNewCaseModalOpen } = useHealthData();
  const { t } = useLanguage();
  const { isOffline, toggleOfflineSimulation, pendingSyncQueue, syncOfflineQueue, isSyncing } = useOffline();
  const navigate = useNavigate();

  const totalCases = cases.length;
  const reviewedCases = cases.filter((c) => c.status === 'reviewed').length;
  const pendingCases = cases.filter((c) => c.status === 'pending').length;
  const emergencyHotspot = epidemicClusters.find((c) => c.riskLevel === 'Emergency');

  const voiceWelcome = `Welcome to BioBits Swasthya, offline rural health operating system for Smart India Hackathon Problem Statement 133. Select Teleconsultation to consult a doctor, Epidemic Radar for village disease tracking, Maternal and Child for baby vaccines, or talk to our AI assistant.`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Live Outbreak Alert Ticker */}
      {emergencyHotspot && (
        <div className="bg-rose-600 text-white px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold animate-pulse">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-200 shrink-0" />
            <span>
              <strong>EPIDEMIC ALERT:</strong> Unusual spike in {emergencyHotspot.primarySymptom} detected in {emergencyHotspot.villageName} ({emergencyHotspot.spikePercentage}). Water contamination reported.
            </span>
          </div>
          <Link
            to="/epidemic"
            className="bg-white text-rose-700 hover:bg-rose-50 px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-colors"
          >
            View Outbreak Radar →
          </Link>
        </div>
      )}

      {/* Hero Banner with Layman Friendly Visual Launchpad */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-700/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Smart India Hackathon 2026 • Problem Statement 133 (MedTech)</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Bio<span className="text-emerald-400">Bits</span> Swasthya
            </h1>
            <AudioVoiceButton
              text={voiceWelcome}
              size="lg"
              className="bg-white/20 text-white border-white/30"
            />
          </div>

          <p className="text-sm sm:text-lg text-emerald-100/90 leading-relaxed font-medium">
            Bridging rural healthcare disparities with zero-connectivity asynchronous teleconsultations, real-time syndromic epidemic outbreak surveillance, and automated maternal-child immunization reminders.
          </p>

          {/* Layman 1-Tap Quick Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                navigate('/teleconsult');
                setIsNewCaseModalOpen(true);
              }}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>{t('btnNewCase', '+ Log New Case for Doctor')}</span>
            </button>

            <Link
              to="/chatbot"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-300" />
              <span>Talk to AI Health Saathi</span>
            </Link>

            <button
              type="button"
              onClick={toggleOfflineSimulation}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-3 rounded-xl border transition-all ${
                isOffline
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/40 hover:bg-amber-500/30'
                  : 'bg-emerald-950/80 hover:bg-emerald-950 text-emerald-200 border border-emerald-600/30'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isOffline ? 'Offline Mode Active (Tap to switch)' : 'Online Mode (Tap to simulate offline)'}</span>
            </button>
          </div>
        </div>

        {/* Ambient background blur blobs */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 bottom-0 -mb-10 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* 4 Core Module Route Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Core Public Health Modules
            </h2>
            <p className="text-xs text-slate-500">
              Select a specialized module to access clinical tools, surveillance radar, and patient management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Teleconsultation */}
          <Link
            to="/teleconsult"
            className="group bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Asynchronous Teleconsultation
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Log cases with vitals & photos. Doctors review offline and issue signed e-prescriptions anytime.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{cases.length} Registered Cases</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Epidemic Early-Warning */}
          <Link
            to="/epidemic"
            className="group bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-rose-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-rose-700 transition-colors">
                  Epidemic Early-Warning
                </h3>
                <span className="bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                  HOTSPOT
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Syndromic anomaly detector flags disease clusters across villages to stop outbreaks before they spread.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>{epidemicClusters.length} Village Clusters</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Maternal & Child */}
          <Link
            to="/maternal-child"
            className="group bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">
                Maternal & Child Health
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Janani 4-stage ANC tracking, Universal Child Immunization schedule (UIP), and automated reminders.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{pregnantMothers.length} Mothers • {childVaccinations.length} Babies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: AI Health Saathi */}
          <Link
            to="/chatbot"
            className="group bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:border-sky-500/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                  BioBits AI Saathi
                </h3>
                <span className="bg-sky-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  OFFLINE
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Offline triage decision trees for snakebites, ORS recipes, high fever, dog bites, and baby care.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
              <span>24/7 Vernacular Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Operational Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title="Teleconsult Cases"
          value={totalCases}
          subtitle={`${reviewedCases} prescriptions ready`}
          icon={Stethoscope}
          color="emerald"
        />
        <StatCard
          title="Monitored Clusters"
          value={epidemicClusters.length}
          subtitle="Real-time geo-surveillance"
          icon={Radio}
          color="rose"
        />
        <StatCard
          title="Maternal Care Records"
          value={pregnantMothers.length + childVaccinations.length}
          subtitle="Janani & Shishu immunization"
          icon={Heart}
          color="sky"
        />
        <StatCard
          title="Offline Sync Queue"
          value={pendingSyncQueue.length}
          subtitle={isOffline ? 'Offline Mode Active' : 'Synced with PHC Server'}
          icon={Database}
          color={pendingSyncQueue.length > 0 ? 'amber' : 'indigo'}
        />
      </div>

      {/* Two Column Section: Recent Teleconsult Cases Feed & Maternal Reminders Ticker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Recent Teleconsultations */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Stethoscope className="w-4 h-4" />
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Recent Teleconsultation Cases
              </h3>
            </div>
            <Link
              to="/teleconsult"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              View All ({cases.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {cases.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-extrabold text-slate-900">{c.patientName}</strong>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      c.triageLevel === 'Emergency'
                        ? 'bg-rose-100 text-rose-800'
                        : c.triageLevel === 'Urgent'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {c.triageLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {c.village} • Symptoms: {c.symptoms.slice(0, 2).join(', ')}
                  </p>
                </div>

                <Link
                  to="/teleconsult"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-emerald-50 hover:text-emerald-800 transition-colors shrink-0"
                >
                  {c.status === 'reviewed' ? '✓ View Rx' : 'Review →'}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Maternal Care & Vaccines Scheduled */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Upcoming Maternal & Child Milestones
              </h3>
            </div>
            <Link
              to="/maternal-child"
              className="text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              Open Janani Hub →
            </Link>
          </div>

          <div className="space-y-3">
            {pregnantMothers.slice(0, 2).map((mom) => (
              <div
                key={mom.id}
                className="p-3 rounded-2xl bg-rose-50/50 border border-rose-200/60 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-extrabold text-slate-900">{mom.name}</strong>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.2 rounded-full">
                      {mom.trimester} ({mom.gestationalWeeks}w)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {mom.highRisk ? `⚠️ Alert: ${mom.riskReason}` : 'Healthy baseline progress'}
                  </p>
                </div>

                <Link
                  to="/maternal-child"
                  className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors shrink-0"
                >
                  ANC Plan →
                </Link>
              </div>
            ))}

            {childVaccinations.slice(0, 1).map((ch) => (
              <div
                key={ch.id}
                className="p-3 rounded-2xl bg-sky-50/50 border border-sky-200/60 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-extrabold text-slate-900">{ch.name}</strong>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.2 rounded-full">
                      Immunization Card
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Mother: {ch.motherName} • {ch.weightKg} kg • Due: Pentavalent-3
                  </p>
                </div>

                <Link
                  to="/maternal-child"
                  className="px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-sky-800 text-xs font-bold hover:bg-sky-100 transition-colors shrink-0"
                >
                  Vaccine Card →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
