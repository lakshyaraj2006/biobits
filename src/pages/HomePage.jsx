import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Activity,
  HeartHandshake,
  Bot,
  Radio,
  ArrowRight,
  Flame,
  PhoneCall,
  Wifi,
  WifiOff,
  Database,
  Phone,
  Heart,
  X,
  Sparkles
} from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';
import { useLanguage } from '../context/LanguageContext';
import { useOffline } from '../context/OfflineContext';
import { StatCard } from '../components/common/StatCard';
import { AudioVoiceButton } from '../components/common/AudioVoiceButton';
import { EmergencyFlowModal } from '../components/common/EmergencyFlowModal';
import { FinancialHelpHub } from '../components/common/FinancialHelpHub';
import { BloodSupportHub } from '../components/common/BloodSupportHub';
import { TrustBadge } from '../components/common/TrustBadge';
import { LiveStatusIndicator } from '../components/common/LiveStatusIndicator';

export const HomePage = () => {
  const { cases, epidemicClusters, pregnantMothers, childVaccinations, setIsNewCaseModalOpen } = useHealthData();
  const { t, translateText } = useLanguage();
  const { isOffline, toggleOfflineSimulation, pendingSyncQueue } = useOffline();
  const navigate = useNavigate();

  // Dialog / Modal States
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  const [isBloodOpen, setIsBloodOpen] = useState(false);
  const [isCallingMitra, setIsCallingMitra] = useState(false);
  const [mitraCallStatus, setMitraCallStatus] = useState('connecting'); // connecting, talking

  const totalCases = cases.length;
  const reviewedCases = cases.filter((c) => c.status === 'reviewed').length;
  const emergencyHotspot = epidemicClusters.find((c) => c.riskLevel === 'Emergency');

  const voiceWelcome = `${t('appTitle')}, ${t('appSubtitle')}. ${t('heroHeading')}`;

  // Start simulated call to Mitra
  const triggerMitraCall = () => {
    setIsCallingMitra(true);
    setMitraCallStatus('connecting');
    const timer = setTimeout(() => {
      setMitraCallStatus('talking');
    }, 2000);
    return () => clearTimeout(timer);
  };

  // Simulated Live Hospital Capacity List for homepage
  const homepageFacilities = [
    { name: 'Rampur Sub-District Hospital', icu: '2 Beds', level: 'high', time: '8:42 PM', type: 'government' },
    { name: 'Kalyanpur Community Health Centre (CHC)', icu: '1 Bed', level: 'medium', time: '8:15 PM', type: 'sahay_checked' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">

      {/* Live Outbreak Alert Ticker */}
      {emergencyHotspot && (
        <div className="bg-brand-primary text-white px-4 py-3 rounded-2xl shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold animate-pulse border border-brand-deep">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-200 shrink-0" />
            <span>
              <strong>{t('outbreakWatch', 'OUTBREAK WATCH')}:</strong> {t('anomalySpikeIn', 'Anomaly spike in')} {translateText(emergencyHotspot.primarySymptom)} {t('reportedAt', 'reported at')} {emergencyHotspot.villageName}. {t('coordinatesKitsWith', 'Sahay coordinates response kits with local Mitras.')}
            </span>
          </div>
          <Link
            to="/epidemic"
            className="bg-white text-brand-primary hover:bg-rose-50 px-3 py-1 rounded-xl text-xs font-black shrink-0 transition-colors"
          >
            {t('openRadar', 'Open Radar →')}
          </Link>
        </div>
      )}

      {/* Hero Banner with Layman Friendly Visual Launchpad */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep via-[#5c0d24] to-stone-950 text-white p-6 sm:p-12 shadow-2xl border border-rose-900/40">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-rose-200 text-xs font-bold border border-brand-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>{t('heroTagline', 'Coordination')}</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {t('heroHeading', 'When healthcare gets complicated, Sahay helps you find the next step.')}
            </h1>
            <AudioVoiceButton
              text={voiceWelcome}
              size="lg"
              className="bg-white/20 text-white border-white/30 shrink-0"
            />
          </div>

          <p className="text-sm sm:text-lg text-rose-100/90 leading-relaxed font-medium">
            {t('heroSubheading', 'We are not a hospital or doctor, but the coordination bridge for rural families. Connecting you with verified ambulance transport, official blood inventory lookup, local volunteer Mitras, and cashless government schemes.')}
          </p>

          {/* Layman 1-Tap Quick Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="flex items-center gap-2 bg-white text-brand-deep hover:bg-rose-50 font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PhoneCall className="w-4 h-4 text-brand-primary" />
              <span>{t('getHelpNow', 'Get Help Now')}</span>
            </button>

            <a
              href="#services-section"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-all"
            >
              <span>{t('exploreServices', 'Explore Services')}</span>
            </a>

            <button
              type="button"
              onClick={toggleOfflineSimulation}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-3.5 rounded-xl border transition-all ${isOffline
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/40 hover:bg-amber-500/30'
                  : 'bg-stone-900/60 hover:bg-stone-900 text-stone-200 border border-stone-800'
                }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-rose-400" />}
              <span>{isOffline ? t('offlineMode', 'Offline Mode active') : t('simOffline', 'Simulate Offline')}</span>
            </button>
          </div>

          {/* Urgent Desk Banner Callout */}
          <div
            onClick={() => setIsEmergencyOpen(true)}
            className="pt-2 flex items-center gap-2 text-rose-300 text-xs font-bold hover:text-white cursor-pointer transition-colors"
          >
            <span>{t('urgentHelpPrompt', '🆘 Need urgent help?')}</span>
            <span className="underline">{t('talkToOperator', 'Talk directly to Sahay Care Desk Operator →')}</span>
          </div>
        </div>

        {/* Ambient background blur blobs */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 bottom-0 -mb-10 w-72 h-72 bg-brand-deep/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* CORE LAUNCHPAD: "What help do you need?" */}
      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-text-dark">
            {t('needHelpQuestion', 'What do you need help with?')}
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            {t('needHelpSubtitle', 'Select one of the emergency pathways below. Sahay coordinates the entire journey.')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">

          {/* Pathway 1: Emergency */}
          <div
            onClick={() => setIsEmergencyOpen(true)}
            className="p-5 rounded-2xl bg-white border border-rose-100 hover:border-brand-primary shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-brand-primary border border-rose-100 flex items-center justify-center font-bold text-xl">
              🟥
            </div>
            <strong className="text-xs font-black text-text-dark">{t('pathwayEmergency', 'Emergency')}</strong>
            <p className="text-[10px] text-text-muted leading-tight">{t('pathwayEmergencyDesc', 'Operator Desk & Live Routing')}</p>
          </div>

          {/* Pathway 2: Blood */}
          <div
            onClick={() => setIsBloodOpen(true)}
            className="p-5 rounded-2xl bg-white border border-rose-50 hover:border-brand-primary shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-brand-primary border border-rose-100 flex items-center justify-center font-bold text-xl">
              🩸
            </div>
            <strong className="text-xs font-black text-text-dark">{t('pathwayBlood', 'Blood Drop')}</strong>
            <p className="text-[10px] text-text-muted leading-tight">{t('pathwayBloodDesc', 'e-RaktKosh Stock Verification')}</p>
          </div>

          {/* Pathway 3: Hospital Capacity */}
          <div
            onClick={() => {
              navigate('/teleconsult');
            }}
            className="p-5 rounded-2xl bg-white border border-cream-border hover:border-brand-primary shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fdfbf7] text-brand-primary border border-cream-border flex items-center justify-center font-bold text-xl">
              🏥
            </div>
            <strong className="text-xs font-black text-text-dark">{t('pathwayHospitals', 'Hospitals')}</strong>
            <p className="text-[10px] text-text-muted leading-tight">{t('pathwayHospitalsDesc', 'ICU Bed & Oxygen Confidence')}</p>
          </div>

          {/* Pathway 4: Consultation */}
          <div
            onClick={() => {
              navigate('/teleconsult');
              setIsNewCaseModalOpen(true);
            }}
            className="p-5 rounded-2xl bg-white border border-cream-border hover:border-brand-primary shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fdfbf7] text-brand-primary border border-cream-border flex items-center justify-center font-bold text-xl">
              👩‍⚕️
            </div>
            <strong className="text-xs font-black text-text-dark">{t('pathwayDoctor', 'PHC Doctor')}</strong>
            <p className="text-[10px] text-text-muted leading-tight">{t('pathwayDoctorDesc', 'Log Case file for doctor review')}</p>
          </div>

          {/* Pathway 5: Medicines */}
          <div
            onClick={() => setIsFinancialOpen(true)}
            className="p-5 rounded-2xl bg-white border border-cream-border hover:border-brand-primary shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fdfbf7] text-brand-primary border border-cream-border flex items-center justify-center font-bold text-xl">
              💊
            </div>
            <strong className="text-xs font-black text-text-dark">{t('pathwayMedicines', 'Medicine Help')}</strong>
            <p className="text-[10px] text-text-muted leading-tight">{t('pathwayMedicinesDesc', 'Match pharmacy stock inventories')}</p>
          </div>

          {/* Pathway 6: Financial Schemes */}
          <div
            onClick={() => setIsFinancialOpen(true)}
            className="p-5 rounded-2xl bg-white border border-cream-border hover:border-brand-primary shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center space-y-3 hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fdfbf7] text-brand-primary border border-cream-border flex items-center justify-center font-bold text-xl">
              💰
            </div>
            <strong className="text-xs font-black text-text-dark">{t('pathwayFinancial', 'Financial Help')}</strong>
            <p className="text-[10px] text-text-muted leading-tight">{t('pathwayFinancialDesc', 'PM-JAY check & medical loans')}</p>
          </div>

        </div>
      </div>

      {/* THREE-LEVEL COORDINATION MODEL VISUAL SECTION */}
      <div className="bg-cream-panel rounded-3xl border border-cream-border p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block">
            {t('coordModelTitle', 'HOW SAHAY WORKS')}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-text-dark">
            {t('coordModelTitle', 'Our Three-Level Coordination Model')}
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            {t('coordModelSubtitle', 'Sahay coordinates the existing healthcare systems to bridge rural information and support gaps.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Level 1: Sahay Mitra */}
          <div className="bg-white rounded-2xl p-5 border border-cream-border space-y-3 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-rose-50 text-brand-primary flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <strong className="text-xs sm:text-sm font-black text-text-dark block">{t('coordL1Title', 'Level 1 — Community Grassroots')}</strong>
                <span className="text-[9px] font-bold text-brand-primary">{t('roleAsha', 'ASHA Workers & Mitras')}</span>
              </div>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {t('coordL1Desc', 'Village ASHA workers and volunteers triage patients, log vitals, and coordinate first-aid offline.')}
            </p>
          </div>

          {/* Level 2: Care Desk */}
          <div className="bg-white rounded-2xl p-5 border border-cream-border space-y-3 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-rose-50 text-brand-primary flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <strong className="text-xs sm:text-sm font-black text-text-dark block">{t('coordL2Title', 'Level 2 — PHC Store & Forward')}</strong>
                <span className="text-[9px] font-bold text-brand-primary">{t('roleDoctor', 'PHC Medical Officers')}</span>
              </div>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {t('coordL2Desc', 'Asynchronous clinical queues allow PHC doctors to review structured case files, photos, and voice notes.')}
            </p>
          </div>

          {/* Level 3: Clinical network */}
          <div className="bg-white rounded-2xl p-5 border border-cream-border space-y-3 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-rose-50 text-brand-primary flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <strong className="text-xs sm:text-sm font-black text-text-dark block">{t('coordL3Title', 'Level 3 — Emergency & Registries')}</strong>
                <span className="text-[9px] font-bold text-brand-primary">{t('pathwayEmergency', '108 & Tertiary Care')}</span>
              </div>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {t('coordL3Desc', 'Real-time outbreak surveillance, e-RaktKosh blood verification, cashless scheme navigation, and ambulance dispatch.')}
            </p>
          </div>
        </div>
      </div>

      {/* SAHAY MITRA: Local face panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

        {/* Left: Call your Sahay Mitra Helper */}
        <div className="bg-white rounded-3xl border border-cream-border p-6 flex flex-col justify-between space-y-4 text-left">
          <div className="space-y-2">
            <span className="bg-rose-50 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded border border-rose-100 uppercase tracking-wider">
              {t('coordL1Title', 'Accessible Care')}
            </span>
            <h3 className="text-lg font-black text-text-dark">{t('roleAsha', 'Call your local village Mitra / ASHA Worker')}</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              {t('recordVoiceDesc', 'If you find it difficult to operate the app or read forms, tap to call your designated village Sahay Mitra. They are trained to log cases for you.')}
            </p>
          </div>

          <div className="p-4 bg-cream-bg rounded-2xl border border-cream-border flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-black">
                SD
              </div>
              <div>
                <strong className="text-xs font-extrabold text-text-dark block">Sunita Devi ({t('roleAsha', 'ASHA Worker')})</strong>
                <span className="text-[10px] text-text-muted block">Rampur Cluster</span>
              </div>
            </div>
            <button
              onClick={triggerMitraCall}
              className="bg-brand-primary hover:bg-brand-deep text-white p-2.5 rounded-xl shadow-md transition-colors"
              title="Call Mitra"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Live Capacity Confidence Box */}
        <div className="bg-white rounded-3xl border border-cream-border p-6 space-y-4 text-left flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-text-dark">{t('liveCapacityTitle', 'Verified Local Facility Capacity')}</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {t('liveCapacitySubtitle', 'We verify availability timestamps before travel. Live ICU oxygen status.')}
            </p>
          </div>

          <div className="space-y-3">
            {homepageFacilities.map((f, idx) => (
              <div key={idx} className="p-3 bg-cream-bg/40 border border-cream-border/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="font-extrabold text-stone-800">{translateText(f.name)}</strong>
                  <TrustBadge type={f.type} />
                </div>
                <LiveStatusIndicator level={f.level} time={f.time} />
              </div>
            ))}
          </div>

          <p className="text-[10px] text-text-muted italic">
            *{t('operatorNote', 'Care Desk verifies bed reservation before travel.')}
          </p>
        </div>

      </div>

      {/* CORE PUBLIC HEALTH MODULES (Explore Services) */}
      <div id="services-section" className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-text-dark">
            {t('exploreServices', 'Explore Health Services Network')}
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            {t('appSubtitle', 'Secondary services are available below to log teleconsultations, check outbreak radars, or consult the AI assistant.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

          {/* Service 1: Teleconsultation */}
          <Link
            to="/teleconsult"
            className="group bg-white rounded-3xl border border-cream-border p-5 shadow-xs hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-primary border border-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-text-dark group-hover:text-brand-primary transition-colors">
                {t('navTeleconsult', 'Asynchronous Teleconsultation')}
              </h3>
              <p className="text-[11px] text-text-muted mt-1.5 leading-relaxed">
                {t('teleSubheader', 'Log cases with vitals & photos. Doctors review offline and issue signed e-prescriptions anytime.')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-border/60 flex items-center justify-between text-[11px] font-bold text-brand-primary">
              <span>{cases.length} {t('pendingReview', 'Registered Cases')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 2: Epidemic Early-Warning */}
          <Link
            to="/epidemic"
            className="group bg-white rounded-3xl border border-cream-border p-5 shadow-xs hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-primary border border-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-text-dark group-hover:text-brand-primary transition-colors">
                  {t('navEpidemic', 'Epidemic Radar')}
                </h3>
                <span className="bg-brand-primary text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                  {t('clusterAlert', 'ALERT')}
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-1.5 leading-relaxed">
                {t('epidemicSubheader', 'Syndromic anomaly detector flags disease clusters across villages to stop outbreaks before they spread.')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-border/60 flex items-center justify-between text-[11px] font-bold text-brand-primary">
              <span>{epidemicClusters.length} {t('villageLabel', 'Village Clusters')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 3: Maternal & Child */}
          <Link
            to="/maternal-child"
            className="group bg-white rounded-3xl border border-cream-border p-5 shadow-xs hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-primary border border-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-text-dark group-hover:text-brand-primary transition-colors">
                {t('navMaternal', 'Maternal & Child Health')}
              </h3>
              <p className="text-[11px] text-text-muted mt-1.5 leading-relaxed">
                {t('maternalSubheader', 'Janani 4-stage ANC tracking, Universal Child Immunization schedule (UIP), and automated reminders.')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-border/60 flex items-center justify-between text-[11px] font-bold text-brand-primary">
              <span>{pregnantMothers.length} {t('tabMothers', 'Mothers')} • {childVaccinations.length} {t('tabChildren', 'Babies')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Service 4: AI Health Saathi */}
          <Link
            to="/chatbot"
            className="group bg-white rounded-3xl border border-cream-border p-5 shadow-xs hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-primary border border-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-text-dark group-hover:text-brand-primary transition-colors">
                  {t('navChatbot', 'Sahay Saathi AI')}
                </h3>
                <span className="bg-brand-primary text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {t('offlineActive', 'OFFLINE')}
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-1.5 leading-relaxed">
                {t('botGreetingContent', 'Offline triage decision trees for snakebites, ORS recipes, high fever, dog bites, and baby care.')}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cream-border/60 flex items-center justify-between text-[11px] font-bold text-brand-primary">
              <span>24/7 {t('audioHelp', 'Vernacular Guide')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Operational Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <StatCard
          title={t('navTeleconsult', 'Teleconsult Cases')}
          value={totalCases}
          subtitle={`${reviewedCases} ${t('rxIssued', 'prescriptions ready')}`}
          icon={Stethoscope}
          color="rose"
        />
        <StatCard
          title={t('navEpidemic', 'Monitored Clusters')}
          value={epidemicClusters.length}
          subtitle={t('surveillanceTagline', 'Real-time geo-surveillance')}
          icon={Radio}
          color="rose"
        />
        <StatCard
          title={t('navMaternal', 'Maternal Records')}
          value={pregnantMothers.length + childVaccinations.length}
          subtitle={t('tabMothers', 'Janani & Shishu Care')}
          icon={Heart}
          color="rose"
        />
        <StatCard
          title={t('pendingSyncList', 'Offline Sync Queue')}
          value={pendingSyncQueue.length}
          subtitle={isOffline ? t('offlineMode', 'Offline Mode Active') : t('onlineMode', 'Synced with PHC Server')}
          icon={Database}
          color={pendingSyncQueue.length > 0 ? 'amber' : 'rose'}
        />
      </div>

      {/* Two Column Section: Recent Cases & Maternal Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Recent Cases */}
        <div className="bg-white rounded-3xl border border-cream-border p-5 sm:p-6 space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-brand-primary">
                <Stethoscope className="w-4 h-4" />
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold text-text-dark">
                {t('myCases', 'Recent Teleconsultation Cases')}
              </h3>
            </div>
            <Link
              to="/teleconsult"
              className="text-xs font-bold text-brand-primary hover:text-brand-deep"
            >
              {t('view', 'View All')} ({cases.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {cases.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl bg-cream-panel border border-cream-border flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-extrabold text-text-dark">{c.patientName}</strong>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${c.triageLevel === 'Emergency'
                        ? 'bg-rose-100 text-rose-800'
                        : c.triageLevel === 'Urgent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                      {translateText(c.triageLevel)}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {c.village} • {t('symptomsTitle', 'Symptoms')}: {c.symptoms.slice(0, 2).map(s => translateText(s)).join(', ')}
                  </p>
                </div>

                <Link
                  to="/teleconsult"
                  className="px-3 py-1.5 rounded-xl bg-white border border-cream-border text-text-dark text-xs font-bold hover:bg-rose-50 hover:text-brand-primary transition-colors shrink-0"
                >
                  {c.status === 'reviewed' ? `✓ ${t('viewRx', 'View Rx')}` : `${t('view', 'Review')} →`}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Maternal Care */}
        <div className="bg-white rounded-3xl border border-cream-border p-5 sm:p-6 space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-cream-border pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-brand-primary">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <h3 className="text-xs sm:text-sm font-extrabold text-text-dark">
                {t('maternalHeader', 'Upcoming Maternal & Child Milestones')}
              </h3>
            </div>
            <Link
              to="/maternal-child"
              className="text-xs font-bold text-brand-primary hover:text-brand-deep"
            >
              {t('tabMothers', 'Open Janani Hub')} →
            </Link>
          </div>

          <div className="space-y-3">
            {pregnantMothers.slice(0, 2).map((mom) => (
              <div
                key={mom.id}
                className="p-3 rounded-2xl bg-rose-50/20 border border-rose-100 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-extrabold text-text-dark">{mom.name}</strong>
                    <span className="text-[9px] font-bold text-brand-primary bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      {translateText(mom.trimester)} ({mom.gestationalWeeks} {t('weeks', 'w')})
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {mom.highRisk ? `⚠️ ${t('highRiskFlag', 'High Risk')}: ${translateText(mom.riskReason)}` : t('pregnancyProgress', 'Healthy pregnancy progress')}
                  </p>
                </div>

                <Link
                  to="/maternal-child"
                  className="px-3 py-1.5 rounded-xl bg-white border border-rose-100 text-brand-primary text-xs font-bold hover:bg-rose-50 transition-colors shrink-0"
                >
                  {t('tabMothers', 'ANC Plan')} →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MITRA CALL SIMULATOR DIALOG */}
      {isCallingMitra && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream-bg rounded-3xl border border-cream-border w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="bg-brand-deep text-white p-5 flex items-center justify-between">
              <span className="text-xs font-bold tracking-tight">{t('coordL1Title', 'Outgoing Call Coordinator')}</span>
              <button
                onClick={() => setIsCallingMitra(false)}
                className="p-1 rounded bg-white/10 text-white hover:bg-white/20"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center animate-pulse border border-brand-primary/20">
                <Phone className="w-6 h-6 text-brand-primary animate-bounce" />
              </div>

              <div className="space-y-1">
                <strong className="text-sm text-text-dark block">Sunita Devi</strong>
                <span className="text-[10px] text-text-muted block">Rampur {t('roleAsha', 'ASHA Worker')}</span>
              </div>

              {mitraCallStatus === 'connecting' ? (
                <div className="space-y-2">
                  <span className="text-xs text-brand-primary font-bold">{t('dialingOperator', 'Calling...')}</span>
                  <div className="flex justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce delay-100"></span>
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce delay-200"></span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    🟢 {t('connectedOperator', 'Connection Established')}
                  </span>
                  <blockquote className="italic text-[11px] text-text-dark font-medium border-l-2 border-brand-primary pl-2 text-left bg-stone-50 py-1">
                    "{t('botGreetingContent', 'Namaste. I am your local Sahay Mitra. I can log your teleconsultation details or contact the Care Desk for you.')}"
                  </blockquote>
                </div>
              )}

              <button
                onClick={() => setIsCallingMitra(false)}
                className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-2.5 rounded-xl text-xs"
              >
                {t('close', 'End Call')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <EmergencyFlowModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <FinancialHelpHub
        isOpen={isFinancialOpen}
        onClose={() => setIsFinancialOpen(false)}
      />

      <BloodSupportHub
        isOpen={isBloodOpen}
        onClose={() => setIsBloodOpen(false)}
      />

    </div>
  );
};
