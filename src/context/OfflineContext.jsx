import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const OfflineContext = createContext();

export const OfflineProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(() => {
    const saved = localStorage.getItem('biobits_sim_offline');
    return saved !== null ? JSON.parse(saved) : !navigator.onLine;
  });

  const [pendingSyncQueue, setPendingSyncQueue] = useState(() => {
    const saved = localStorage.getItem('biobits_offline_queue');
    return saved ? JSON.parse(saved) : [];
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('biobits_sim_offline', JSON.stringify(isOffline));
  }, [isOffline]);

  useEffect(() => {
    localStorage.setItem('biobits_offline_queue', JSON.stringify(pendingSyncQueue));
  }, [pendingSyncQueue]);

  // Listen to browser network changes if not manually forced
  useEffect(() => {
    const handleOnline = () => {
      // only switch if not manually locked
      if (localStorage.getItem('biobits_sim_offline') === null) {
        setIsOffline(false);
      }
    };
    const handleOffline = () => {
      if (localStorage.getItem('biobits_sim_offline') === null) {
        setIsOffline(true);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleOfflineSimulation = () => {
    setIsOffline((prev) => !prev);
  };

  const addToOfflineQueue = (item) => {
    const queueItem = {
      id: 'QUEUE-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...item,
    };
    setPendingSyncQueue((prev) => [queueItem, ...prev]);
    return queueItem;
  };

  const syncOfflineQueue = async () => {
    if (pendingSyncQueue.length === 0) {
      setSyncToast({
        type: 'info',
        message: 'All local records are already synchronized with the PHC Central Server.',
      });
      setTimeout(() => setSyncToast(null), 4000);
      return;
    }

    setIsSyncing(true);
    // Simulate server upload delay
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const count = pendingSyncQueue.length;
    setPendingSyncQueue([]);
    setIsSyncing(false);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      // graceful fallback if canvas confetti fails
    }

    setSyncToast({
      type: 'success',
      message: `Successfully synchronized ${count} offline case(s) & records to PHC Central Server!`,
    });

    setTimeout(() => setSyncToast(null), 5000);
  };

  return (
    <OfflineContext.Provider
      value={{
        isOffline,
        setIsOffline,
        toggleOfflineSimulation,
        pendingSyncQueue,
        addToOfflineQueue,
        syncOfflineQueue,
        isSyncing,
        syncToast,
        clearSyncToast: () => setSyncToast(null),
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
