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
  ShieldCheck,
  Menu,
  X,
  Volume2,
  Database
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
    { to: '/', label: 'Home', icon: Home, badge: null },
    { to: '/teleconsult', label: t('navTeleconsult', 'Teleconsultation'), icon: Stethoscope, badge: null },
    { to: '/epidemic', label: t('navEpidemic', 'Epidemic Radar'), icon: Activity, badge: 'ALERT' },
    { to: '/maternal-child', label: t('navMaternal', 'Maternal & Child'), icon: HeartHandshake, badge: null },
    { to: '/chatbot', label: t('navChatbot', 'AI Health Saathi'), icon: Bot, badge: 'AI' },
  ];

  const roles = [
    { id: 'citizen', label: t('roleCitizen', 'Rural Citizen'), icon: '👤' },
    { id: 'asha', label: t('roleAsha', 'ASHA Worker'), icon: '👩‍⚕️' },
    { id: 'doctor', label: t('roleDoctor', 'PHC Doctor'), icon: '🩺' },
    { id: 'admin', label: t('roleAdmin', 'Health Officer'), icon: '🏛️' },
  ];

  const handleVoiceHelp = () => {
    speak(`${t('appTitle')}. ${t('appSubtitle')}. Select Teleconsultation to send symptoms to doctor, Epidemic Radar to check village outbreaks, Maternal and Child for baby vaccines, or AI Saathi for emergency guidance.`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro banner for SIH & Team BioBits */}
      <div className="bg-gradient-to-r from-brand-deep via-brand-primary to-brand-deep text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="bg-white/20 text-rose-100 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-white/10">
            SIH 2026 • PS 133
          </span>
          <span className="hidden sm:inline text-rose-100">Theme: MedTech | Rural Healthcare Access</span>
          <span className="text-rose-200 font-semibold">• Team BioBits</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={handleVoiceHelp}
            className="flex items-center gap-1 text-rose-200 hover:text-white transition-colors bg-white/10 px-2 py-0.5 rounded-full"
            title="Audio guidance"
          >
            <Volume2 className="w-3 h-3" />
            <span className="hidden md:inline">{t('audioHelp', 'Listen Guide')}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-300 animate-pulse"></span>
            <span className="text-rose-200 font-medium">Ayushman Bharat & NHM Aligned</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm ring-1 ring-rose-400/40">
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black text-text-dark tracking-tight">
                  Sahay
                </span>
                <span className="text-[10px] font-extrabold text-brand-primary bg-brand-light border border-brand-primary/20 px-1.5 py-0.5 rounded">
                  Coordination
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Tabs - Using React Router NavLinks */}
          <nav className="hidden lg:flex items-center gap-1 bg-cream-panel p-1 rounded-xl border border-cream-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 relative ${
                      isActive
                        ? 'bg-white text-brand-primary shadow-xs font-bold border border-cream-border'
                        : 'text-text-muted hover:text-text-dark hover:bg-white/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-primary' : 'text-text-muted'}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 text-[9px] font-extrabold rounded-full bg-brand-primary text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-cream-panel hover:bg-cream-border/40 px-2 py-1.2 rounded-lg border border-cream-border text-xs font-medium text-text-dark transition-colors">
              <Globe className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold text-text-dark focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="text-text-dark bg-cream-panel">
                    {l.flag} {l.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Switcher */}
            <div className="hidden sm:flex items-center">
              <div className="flex items-center gap-1 bg-brand-light hover:bg-brand-light/60 px-2 py-1.2 rounded-lg border border-brand-primary/20 text-xs text-brand-deep transition-colors">
                <UserCheck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold text-brand-deep focus:outline-none cursor-pointer"
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

            {/* Offline Simulation Toggle Button (In-Place, No Page Redirection) */}
            <button
              type="button"
              onClick={toggleOfflineSimulation}
              className={`flex items-center gap-1.5 px-2.5 py-1.2 rounded-lg text-xs font-bold transition-all duration-150 border ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-400'
                  : 'bg-cream-panel text-text-dark border-cream-border hover:bg-cream-border/40'
              }`}
              title="Click to toggle offline mode directly on this page"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden md:inline text-[11px]">Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="hidden md:inline text-[11px]">Online</span>
                </>
              )}

              {pendingSyncQueue.length > 0 && (
                <span className="bg-amber-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse">
                  {pendingSyncQueue.length}
                </span>
              )}
            </button>

            {/* Sync Now Button if offline changes pending */}
            {pendingSyncQueue.length > 0 && (
              <button
                onClick={syncOfflineQueue}
                disabled={isSyncing}
                className="hidden md:flex items-center gap-1 bg-brand-primary hover:bg-brand-deep text-white px-2.5 py-1.2 rounded-lg text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-[11px]">{isSyncing ? 'Syncing...' : 'Sync'}</span>
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
        <div className="lg:hidden bg-cream-bg border-b border-cream-border px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                        : 'bg-cream-panel text-text-dark hover:bg-cream-border/40 border border-cream-border'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text-muted'}`} />
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-2 border-t border-cream-border flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-muted">Role:</span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-brand-light text-brand-deep border border-brand-primary/20 text-xs font-bold rounded-lg px-2 py-1"
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
                <span>Sync {pendingSyncQueue.length} items</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
