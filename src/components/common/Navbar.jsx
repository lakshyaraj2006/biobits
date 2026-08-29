import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Stethoscope,
  Activity,
  HeartHandshake,
  Bot,
  Wifi,
  WifiOff,
  Globe,
  UserCheck,
  RefreshCw,
  Sparkles,
  Menu,
  X,
  Volume2,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useOffline } from '../../context/OfflineContext';
import { useHealthData } from '../../context/HealthDataContext';

export const Navbar = () => {
  const { currentLang, setLanguage, languages, t, speak } = useLanguage();
  const { isOffline, toggleOfflineSimulation, pendingSyncQueue, syncOfflineQueue, isSyncing } = useOffline();
  const { userRole, setUserRole } = useHealthData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('navHome', 'Home'), icon: Home, badge: null },
    { to: '/teleconsult', label: t('navTeleconsult', 'Teleconsult'), icon: Stethoscope, badge: null },
    { to: '/epidemic', label: t('navEpidemic', 'Epidemic Radar'), icon: Activity, badge: 'ALERT' },
    { to: '/maternal-child', label: t('navMaternal', 'Maternal & Child'), icon: HeartHandshake, badge: null },
    { to: '/chatbot', label: t('navChatbot', 'Sahay Saathi'), icon: Bot, badge: 'AI' },
  ];

  const roles = [
    { id: 'citizen', label: t('roleCitizen', 'Rural Citizen'), icon: '👤' },
    { id: 'asha', label: t('roleAsha', 'ASHA Worker'), icon: '👩‍⚕️' },
    { id: 'doctor', label: t('roleDoctor', 'PHC Doctor'), icon: '🩺' },
    { id: 'admin', label: t('roleAdmin', 'Health Officer'), icon: '🏛️' },
  ];

  const handleVoiceHelp = () => {
    speak(`${t('appTitle')}. ${t('appSubtitle')}.`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top micro banner for SIH & Team BioBits */}
      <div className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-deep text-white text-[11px] px-4 py-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-white/20 text-rose-100 px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider uppercase border border-white/10">
            SIH 2026 • PS 133
          </span>
          <span className="hidden sm:inline text-rose-100">{t('medtechTheme', 'Theme: MedTech | Rural Healthcare Access')}</span>
          <span className="text-rose-200 font-semibold">• {t('teamName', 'Team BioBits')}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={handleVoiceHelp}
            className="flex items-center gap-1 text-rose-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-full text-[10px]"
            title="Audio guidance"
          >
            <Volume2 className="w-3 h-3" />
            <span className="hidden md:inline">{t('audioHelp', 'Listen Guide')}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300 animate-pulse"></span>
            <span className="text-rose-200 font-medium text-[10px]">{t('ayushmanAligned', 'Ayushman Bharat & NHM Aligned')}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer shrink-0 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-deep flex items-center justify-center text-white shadow-sm ring-1 ring-rose-400/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-200" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {t('appTitle', 'Sahay')}
              </span>
              <span className="text-[9px] font-extrabold text-brand-primary bg-rose-50 border border-rose-200/80 px-1.5 py-0.5 rounded">
                {t('heroTagline', 'Coordination')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Tabs — Slim segmented pill container with single-line items */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                      isActive
                        ? 'bg-white text-brand-primary shadow-xs font-bold border border-slate-200/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`} />
                      <span className="leading-none">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 text-[8px] font-black rounded-full bg-brand-primary text-white shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Controls — Sleek compact pills */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 h-8 px-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 text-xs font-semibold text-slate-700 shadow-2xs transition-colors">
              <Globe className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-[11px] font-semibold text-slate-700 focus:outline-none cursor-pointer pr-0.5"
                aria-label="Select Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="text-slate-800 bg-white">
                    {l.flag} {l.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Switcher */}
            <div className="hidden sm:flex items-center">
              <div className="flex items-center gap-1 h-8 px-2 rounded-lg border border-rose-200 bg-rose-50/70 hover:bg-rose-100/70 text-xs font-semibold text-brand-deep shadow-2xs transition-colors">
                <UserCheck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="bg-transparent border-none text-[11px] font-semibold text-brand-deep focus:outline-none cursor-pointer"
                  aria-label="Select Role"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.icon} {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Offline Simulation Toggle Button */}
            <button
              type="button"
              onClick={toggleOfflineSimulation}
              className={`flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-bold transition-all duration-150 border shadow-2xs ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-400'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70'
              }`}
              title="Toggle offline mode"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden md:inline text-[11px]">{t('offlineActive', 'Offline')}</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline text-[11px]">{t('onlineSynced', 'Online')}</span>
                </>
              )}

              {pendingSyncQueue.length > 0 && (
                <span className="bg-amber-600 text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                  {pendingSyncQueue.length}
                </span>
              )}
            </button>

            {/* Sync Now Button if offline changes pending */}
            {pendingSyncQueue.length > 0 && (
              <button
                onClick={syncOfflineQueue}
                disabled={isSyncing}
                className="hidden md:flex items-center gap-1 h-8 px-2.5 rounded-lg bg-brand-primary hover:bg-brand-deep text-white text-[11px] font-bold shadow-xs transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? t('syncing', 'Syncing...') : t('syncNow', 'Sync')}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'bg-rose-50 text-brand-primary border border-rose-200'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className="px-1.5 py-0.2 text-[8px] font-extrabold rounded-full bg-brand-primary text-white">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">{t('roleLabel', 'Role')}:</span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-rose-50 text-brand-deep border border-rose-200 text-xs font-bold rounded-lg px-2.5 py-1"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.icon} {r.label}
                  </option>
                ))}
              </select>
            </div>

            {pendingSyncQueue.length > 0 && (
              <button
                onClick={syncOfflineQueue}
                disabled={isSyncing}
                className="flex items-center gap-1.5 bg-brand-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? t('syncing', 'Syncing...') : `${t('syncNow', 'Sync')} ${pendingSyncQueue.length}`}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
