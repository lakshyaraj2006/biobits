import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { useOffline } from '../context/OfflineContext';
import { useLanguage } from '../context/LanguageContext';
import { AudioVoiceButton } from '../components/common/AudioVoiceButton';

export const OfflineSyncManager = () => {
  const { isOffline, toggleOfflineSimulation, pendingSyncQueue, syncOfflineQueue, isSyncing } = useOffline();
  const { t, translateText } = useLanguage();

  const audioSummary = `${t('offlineManagerTitle', 'Offline Storage & Server Sync Manager')}. ${t('offlineManagerSubtitle', 'Local storage cache active.')} ${pendingSyncQueue.length} ${t('syncPending', 'records pending synchronization.')}`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-800/40">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold border border-indigo-400/30">
            <Database className="w-3.5 h-3.5 text-indigo-300" />
            <span>{t('offlineManagerSubtitle', 'Rural Offline-First Resilience • IndexedDB & Local Storage Cache')}</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t('offlineManagerTitle', 'Offline Storage & Server Sync Manager')}
            </h1>
            <AudioVoiceButton text={audioSummary} size="md" className="bg-white/20 text-white border-white/30" />
          </div>

          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium">
            {t('heroSubheading', 'Engineered specifically for remote tribal hamlets and hilly rural pockets with zero/intermittent cellular network. All case entries, vitals, and vaccine marks remain 100% accessible and operable offline.')}
          </p>
        </div>
      </div>

      {/* Network Simulator & Synchronization Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Connection Mode Controller */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('networkStatus', 'Network Status Simulator')}
            </span>
            {isOffline ? (
              <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                {t('offlineActive', 'OFFLINE')}
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                {t('onlineSynced', 'ONLINE (4G/WiFi)')}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {t('heroSubheading', 'Toggle offline simulation to test how ASHA field workers can record cases, take photos, and track vaccines in remote zero-network villages.')}
          </p>

          <button
            type="button"
            onClick={toggleOfflineSimulation}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              isOffline
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30'
            }`}
          >
            {isOffline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{isOffline ? t('onlineSynced', 'Switch to Online Mode') : t('simOffline', 'Simulate Offline Village Mode')}</span>
          </button>
        </div>

        {/* Sync Queue Metrics */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('syncPending', 'Pending Sync Queue')}
            </span>
            <span className="text-2xl font-black text-slate-900">
              {pendingSyncQueue.length}
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {pendingSyncQueue.length === 0
              ? t('onlineSynced', 'All local records are synchronized with the PHC District Central Server.')
              : `${pendingSyncQueue.length} ${t('syncPending', 'offline case file(s) and vaccine updates are waiting in device storage for cloud sync.')}`}
          </p>

          <button
            type="button"
            onClick={syncOfflineQueue}
            disabled={isSyncing || pendingSyncQueue.length === 0}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t('syncing', 'Synchronizing Data...') : t('syncNow', 'Sync to Central Server Now')}</span>
          </button>
        </div>

        {/* Local Storage Engine */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('localStorageEngine', 'Local Storage Cache')}
            </span>
            <HardDrive className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-1.5 text-xs text-slate-700 font-medium">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>{t('navTeleconsult', 'Patient Case Files')}:</span>
              <strong className="text-slate-900 font-bold">{t('offlineActive', 'Stored Locally')}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>{t('navEpidemic', 'Epidemic Anomaly Logs')}:</span>
              <strong className="text-slate-900 font-bold">{t('offlineActive', 'Persistent Cache')}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>{t('navMaternal', 'UIP Immunization Cards')}:</span>
              <strong className="text-slate-900 font-bold">{t('offlineActive', 'Zero-Loss Local DB')}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Transactions Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              {t('pendingSyncList', 'Local Offline Transactions Log')} ({pendingSyncQueue.length})
            </h3>
            <p className="text-xs text-slate-500">
              {t('offlineManagerSubtitle', 'Transactions queued while offline; automatically uploaded once internet connectivity resumes.')}
            </p>
          </div>

          {pendingSyncQueue.length > 0 && (
            <button
              onClick={syncOfflineQueue}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              {t('syncNow', 'Sync All')} ({pendingSyncQueue.length})
            </button>
          )}
        </div>

        {pendingSyncQueue.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-800">
              {t('onlineSynced', 'Everything is Fully Synchronized')}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t('syncSuccess', 'No offline transactions are waiting. You can create new case files or mark vaccines offline, and they will appear here.')}
            </p>
            <div className="pt-2">
              <Link
                to="/teleconsult"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
              >
                {t('logNewCase', 'Log a test case in Teleconsultation')} →
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">{t('details', 'Action Type')}</th>
                  <th className="py-2.5 px-3">{t('details', 'Details')}</th>
                  <th className="py-2.5 px-3">{t('time', 'Local Timestamp')}</th>
                  <th className="py-2.5 px-3 text-right">{t('status', 'Status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pendingSyncQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{item.id}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {item.patientName ? `${t('patientName', 'Patient')}: ${item.patientName} (${item.village})` : JSON.stringify(item)}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-amber-700 font-bold text-xs">{t('pendingSyncList', 'Queued locally')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
