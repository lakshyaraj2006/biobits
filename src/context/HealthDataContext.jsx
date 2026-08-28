import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CASES,
  INITIAL_EPIDEMIC_CLUSTERS,
  INITIAL_PREGNANT_MOTHERS,
  INITIAL_CHILD_VACCINATIONS,
} from '../data/mockData';
import { useOffline } from './OfflineContext';
import confetti from 'canvas-confetti';

const HealthDataContext = createContext();

export const HealthDataProvider = ({ children }) => {
  const { isOffline, addToOfflineQueue } = useOffline();

  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('biobits_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [epidemicClusters, setEpidemicClusters] = useState(() => {
    const saved = localStorage.getItem('biobits_epidemics');
    return saved ? JSON.parse(saved) : INITIAL_EPIDEMIC_CLUSTERS;
  });

  const [pregnantMothers, setPregnantMothers] = useState(() => {
    const saved = localStorage.getItem('biobits_mothers');
    return saved ? JSON.parse(saved) : INITIAL_PREGNANT_MOTHERS;
  });

  const [childVaccinations, setChildVaccinations] = useState(() => {
    const saved = localStorage.getItem('biobits_children');
    return saved ? JSON.parse(saved) : INITIAL_CHILD_VACCINATIONS;
  });

  const [activeTab, setActiveTab] = useState('teleconsult'); // 'teleconsult' | 'epidemic' | 'maternal' | 'chatbot'
  const [userRole, setUserRole] = useState('citizen'); // 'citizen' | 'asha' | 'doctor' | 'admin'
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [selectedCaseForRx, setSelectedCaseForRx] = useState(null);
  const [selectedClusterDetail, setSelectedClusterDetail] = useState(null);
  const [activeReminderModal, setActiveReminderModal] = useState(null);

  useEffect(() => {
    localStorage.setItem('biobits_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('biobits_epidemics', JSON.stringify(epidemicClusters));
  }, [epidemicClusters]);

  useEffect(() => {
    localStorage.setItem('biobits_mothers', JSON.stringify(pregnantMothers));
  }, [pregnantMothers]);

  useEffect(() => {
    localStorage.setItem('biobits_children', JSON.stringify(childVaccinations));
  }, [childVaccinations]);

  // Add new case file
  const addCase = (casePayload) => {
    const newCase = {
      id: `CASE-2026-${String(cases.length + 82).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      prescription: null,
      ...casePayload,
    };

    setCases((prev) => [newCase, ...prev]);

    if (isOffline) {
      addToOfflineQueue({
        type: 'NEW_TELECONSULT_CASE',
        caseId: newCase.id,
        patientName: newCase.patientName,
        village: newCase.village,
      });
    }

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch (e) {}

    return newCase;
  };

  // Doctor submits digital prescription
  const addPrescription = (caseId, rxData) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: 'reviewed',
            prescription: {
              issuedAt: new Date().toISOString(),
              ...rxData,
            },
          };
        }
        return c;
      })
    );

    if (isOffline) {
      addToOfflineQueue({
        type: 'PRESCRIPTION_ISSUED',
        caseId,
        doctor: rxData.doctorName,
      });
    }
  };

  // Update Child Immunization Vaccine status
  const updateVaccineStatus = (childId, vaccineId, newStatus) => {
    setChildVaccinations((prev) =>
      prev.map((child) => {
        if (child.id === childId) {
          const updatedVaccines = child.vaccines.map((v) => {
            if (v.id === vaccineId) {
              return {
                ...v,
                status: newStatus,
                date: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : v.date,
              };
            }
            return v;
          });
          return { ...child, vaccines: updatedVaccines };
        }
        return child;
      })
    );

    if (isOffline) {
      addToOfflineQueue({
        type: 'VACCINE_STATUS_UPDATE',
        childId,
        vaccineId,
        newStatus,
      });
    }

    if (newStatus === 'completed') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  // Update mother ANC checkup
  const updateMotherANC = (motherId, visitIndex, visitData) => {
    setPregnantMothers((prev) =>
      prev.map((mom) => {
        if (mom.id === motherId) {
          const updatedVisits = [...mom.ancVisits];
          updatedVisits[visitIndex] = {
            ...updatedVisits[visitIndex],
            ...visitData,
            status: 'completed',
            date: new Date().toISOString().split('T')[0],
          };
          return { ...mom, ancVisits: updatedVisits };
        }
        return mom;
      })
    );
  };

  // Trigger outbreak response action
  const triggerOutbreakAction = (clusterId, actionName) => {
    setEpidemicClusters((prev) =>
      prev.map((cluster) => {
        if (cluster.id === clusterId) {
          return {
            ...cluster,
            activeTeams: (cluster.activeTeams || 0) + 1,
            lastAction: actionName,
          };
        }
        return cluster;
      })
    );
  };

  return (
    <HealthDataContext.Provider
      value={{
        cases,
        epidemicClusters,
        pregnantMothers,
        childVaccinations,
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        addCase,
        addPrescription,
        updateVaccineStatus,
        updateMotherANC,
        triggerOutbreakAction,
        isNewCaseModalOpen,
        setIsNewCaseModalOpen,
        selectedCaseForRx,
        setSelectedCaseForRx,
        selectedClusterDetail,
        setSelectedClusterDetail,
        activeReminderModal,
        setActiveReminderModal,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
