import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useOffline } from '../../context/OfflineContext';
import { useLanguage } from '../../context/LanguageContext';

export const OfflineStatusBar = () => {
  const { isOffline, pendingSyncQueue, syncOfflineQueue, isSyncing, syncToast, clearSyncToast } = useOffline();
  const { t } = useLanguage();

  return (
    <>
      {/* Toast Notification */}
      {syncToast && (
        <div className="fixed top-20 right-4 z-50 max-w-md w-full animate-bounce sm:animate-none">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 ${
            syncToast.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-700 shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-100 border-slate-700 shadow-slate-900/30'
          }`}>
            {syncToast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs sm:text-sm font-medium">
              {syncToast.message}
            </div>
            <button
              onClick={clearSyncToast}
              className="text-slate-400 hover:text-white text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {isOffline && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs sm:text-sm text-amber-900 flex flex-wrap items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2 font-semibold text-left">
            <span className="p-1 rounded-md bg-amber-200 text-amber-950 shrink-0">
              <WifiOff className="w-4 h-4" />
            </span>
            <div>
              <span className="font-extrabold text-amber-950 block sm:inline">
                You're offline.
              </span>
              <span className="text-amber-800 font-medium sm:ml-1 text-xs">
                Saved family information and emergency guidance remain available. We'll reconnect automatically when the network returns.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingSyncQueue.length > 0 && (
              <div className="flex items-center gap-2 bg-amber-200/80 px-2.5 py-1 rounded-lg border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
                <span className="font-bold text-xs text-amber-950">
                  {pendingSyncQueue.length} {t('syncPending', 'Records Pending Sync')}
                </span>
              </div>
            )}

            <button
              onClick={syncOfflineQueue}
              disabled={isSyncing || pendingSyncQueue.length === 0}
              className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : t('syncNow', 'Sync to PHC Server')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
