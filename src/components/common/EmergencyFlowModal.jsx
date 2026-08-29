import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Shield,
  Clock,
  Navigation,
  MapPin,
  Ambulance,
  ChevronRight,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const EmergencyFlowModal = ({ isOpen, onClose }) => {
  const { t, translateText } = useLanguage();
  const [step, setStep] = useState(1);
  const [callingState, setCallingState] = useState('dialing'); // dialing, connected, speaking
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [transportConfirmed, setTransportConfirmed] = useState(false);

  // Auto-progress connection simulation when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCallingState('dialing');
      
      const t1 = setTimeout(() => {
        setCallingState('connected');
      }, 1800);

      const t2 = setTimeout(() => {
        setCallingState('speaking');
      }, 3500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hospitals = [
    {
      id: 1,
      name: 'Rampur Sub-District Hospital',
      distance: '4.2 km',
      icuStatus: '2 ' + t('bedsAvailable', 'Beds Available'),
      icuConfirmed: t('confirmedAgo', 'Confirmed') + ' 4 min ago',
      icuClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      confidence: 'high',
      oxygen: 'Stable (Cylinder + Pipeline)',
      badge: t('govtLinked', 'Government-linked'),
      verified: true
    },
    {
      id: 2,
      name: 'Kalyanpur Community Health Centre (CHC)',
      distance: '8.5 km',
      icuStatus: '1 ' + t('bedsAvailable', 'Bed Available'),
      icuConfirmed: t('confirmedAgo', 'Confirmed') + ' 22 min ago',
      icuClass: 'text-amber-700 bg-amber-50 border-amber-200',
      confidence: 'medium',
      oxygen: 'Cylinder Only (Limited)',
      badge: t('sahayChecked', 'Sahay Checked'),
      verified: true
    },
    {
      id: 3,
      name: 'MGM Central Hospital',
      distance: '15.1 km',
      icuStatus: '4 ' + t('bedsAvailable', 'Beds Available'),
      icuConfirmed: t('confirmedAgo', 'Updated') + ' 2 hours ago',
      icuClass: 'text-stone-700 bg-stone-50 border-stone-200',
      confidence: 'stale',
      oxygen: 'Liquid Oxygen Plant',
      badge: t('communityVerified', 'Community Verified'),
      verified: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-cream-bg rounded-3xl border border-cream-border w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-brand-deep text-white p-5 flex items-center justify-between border-b border-rose-950">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-brand-primary text-white">
              <Ambulance className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">{t('emergencyDeskTitle', 'Sahay Care Desk')}</h2>
              <p className="text-[11px] text-rose-200 font-medium">{t('emergencyDeskSubtitle', 'Emergency Coordination Journey')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-rose-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Coordination Step Tracker */}
        <div className="bg-cream-panel px-5 py-3 border-b border-cream-border flex items-center justify-between text-[11px] text-stone-500 overflow-x-auto scrollbar-none gap-4">
          <div className="flex items-center gap-6 w-full justify-between shrink-0">
            <span className={`font-bold flex items-center gap-1 ${step >= 1 ? 'text-brand-primary' : ''}`}>
              {step > 1 ? '✓' : '1.'} {t('step1Title', 'Call Desk')}
            </span>
            <span className={`font-bold flex items-center gap-1 ${step >= 2 ? 'text-brand-primary' : ''}`}>
              {step > 2 ? '✓' : '2.'} {t('step3Title', 'Facility')}
            </span>
            <span className={`font-bold flex items-center gap-1 ${step >= 3 ? 'text-brand-primary' : ''}`}>
              {step > 3 ? '✓' : '3.'} {t('confirm', 'Reserve')}
            </span>
            <span className={`font-bold flex items-center gap-1 ${step >= 4 ? 'text-brand-primary' : ''}`}>
              {step > 4 ? '✓' : '4.'} {t('step2Title', 'Transport')}
            </span>
            <span className={`font-bold flex items-center gap-1 ${step >= 5 ? 'text-brand-primary' : ''}`}>
              {step > 5 ? '✓' : '5.'} {t('tabSchemes', 'Scheme')}
            </span>
            <span className={`font-bold flex items-center gap-1 ${step >= 6 ? 'text-brand-primary' : ''}`}>
              {step >= 6 ? '✓' : '6.'} {t('followUpLabel', 'Summary')}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Calling Care Desk */}
          {step === 1 && (
            <div className="py-8 text-center space-y-6">
              {callingState === 'dialing' && (
                <div className="space-y-4">
                  <div className="mx-auto w-20 h-20 bg-rose-50 border-2 border-brand-primary/20 rounded-full flex items-center justify-center animate-pulse">
                    <Phone className="w-8 h-8 text-brand-primary animate-bounce" />
                  </div>
                  <h3 className="text-lg font-extrabold text-text-dark">{t('dialingOperator', 'Connecting to Sahay Care Desk...')}</h3>
                  <p className="text-xs text-text-muted max-w-sm mx-auto">
                    {t('operatorNote', 'Directing your emergency request to an active operator. Our network matches you with a live assistant immediately.')}
                  </p>
                </div>
              )}

              {callingState === 'connected' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="mx-auto w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-extrabold text-emerald-950">{t('connectedOperator', 'Operator Connected')}</h3>
                  <p className="text-xs text-emerald-800 bg-emerald-50 max-w-sm mx-auto py-2 px-3 rounded-lg border border-emerald-100 font-semibold">
                    📞 {t('speakingOperator', 'Operator Rajesh Kumar is now coordinating your emergency case.')}
                  </p>
                </div>
              )}

              {callingState === 'speaking' && (
                <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
                  <div className="p-4 bg-white rounded-2xl border border-cream-border text-left space-y-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <strong className="text-xs text-stone-700">{t('speakingOperator', 'Operator Coordination Note:')}</strong>
                    </div>
                    <blockquote className="italic text-text-dark font-medium border-l-2 border-brand-primary pl-3 py-1 bg-cream-bg text-sm">
                      {t('operatorNote', 'We are checking ICU bed availability and oxygen levels at nearby verified hospitals right now. Let us guide you to the safest option.')}
                    </blockquote>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>{t('selectHospital', 'View Nearest Verified Facilities')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Hospital Verified Search */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-extrabold text-text-dark">{t('liveCapacityTitle', 'Nearest Verified ICU & Emergency Capacity')}</h3>
                <p className="text-[11px] text-text-muted">
                  {t('liveCapacitySubtitle', 'Sahay Care Desk has verified the live status of the following facilities.')}
                </p>
              </div>

              <div className="space-y-3">
                {hospitals.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHospital(h)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2.5 ${
                      selectedHospital?.id === h.id
                        ? 'border-brand-primary bg-brand-light shadow-md'
                        : 'border-cream-border bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-extrabold text-text-dark">{translateText(h.name)}</strong>
                          <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold tracking-wide uppercase ${
                            h.verified ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-stone-100 text-stone-700'
                          }`}>
                            {h.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-text-muted mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{h.distance}</span>
                        </div>
                      </div>

                      {/* Live confidence dot */}
                      <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border ${h.icuClass}`}>
                        <span className={`w-2 h-2 rounded-full ${
                          h.confidence === 'high' ? 'bg-emerald-500' : h.confidence === 'medium' ? 'bg-amber-500' : 'bg-stone-400'
                        }`}></span>
                        <span>{h.icuStatus}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-cream-border/60 text-text-muted">
                      <span>{t('oxygenLabel', 'Oxygen')}: <strong>{translateText(h.oxygen)}</strong></span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded-md">
                        <Clock className="w-3 h-3 text-rose-600" />
                        {h.icuConfirmed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedHospital ? (
                <div className="pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>{t('confirm', 'Reserve Emergency Bed at')} {translateText(selectedHospital.name)}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-rose-50 text-brand-primary border border-rose-100 rounded-xl p-3 text-[11px] text-center font-bold">
                  ⚠️ {t('selectHospital', 'Select a verified hospital above to proceed with the reservation.')}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Confirm Capacity Reservation */}
          {step === 3 && (
            <div className="py-4 space-y-6 text-center">
              <div className="mx-auto w-16 h-16 bg-brand-light border-2 border-brand-primary/20 rounded-full flex items-center justify-center">
                <Shield className="w-7 h-7 text-brand-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-text-dark">{t('confirm', 'Reserving 1 ICU Bed')}</h3>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  {t('operatorNote', 'Holding capacity at')} <strong>{translateText(selectedHospital?.name)}</strong> {t('operatorNote', 'before patient travels.')}
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-left space-y-2.5 max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <strong className="text-xs text-emerald-950">{t('connectedOperator', 'Operator Confirmation')}</strong>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed font-semibold">
                  {t('operatorNote', '1 ICU Bed is reserved for patient arriving shortly. Reservation Code:')} <span className="bg-white px-2 py-0.5 border border-emerald-200 rounded font-black text-rose-700">SAHAY-701</span>.
                </p>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <span>{t('dispatchAmbulance', 'Arrange Emergency Transport')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 4: Transport Coordination */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-extrabold text-text-dark">{t('step2Title', 'Ambulance & Local Transport Options')}</h3>
                <p className="text-[11px] text-text-muted">
                  {t('step2Desc', 'Select a dispatched ambulance or allocate local volunteer transport to rush the patient.')}
                </p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setTransportConfirmed(true)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex items-start gap-4 ${
                    transportConfirmed
                      ? 'border-brand-primary bg-brand-light shadow-md'
                      : 'border-cream-border bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-rose-50 text-brand-primary shrink-0">
                    <Ambulance className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-text-dark">108 Government Emergency Ambulance</strong>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">{t('ambulanceDispatched', 'Dispatched')}</span>
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Driver: <strong>Mohan Soren (+91 94312 88201)</strong>
                    </p>
                    <p className="text-[10px] text-brand-primary font-bold">
                      ⏱️ {t('ambulanceDispatched', 'Dispatched from PHC (ETA: 12 minutes to your location)')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-cream-border bg-white/60 text-left flex items-start gap-4 opacity-75">
                  <div className="p-2.5 rounded-xl bg-stone-100 text-stone-500 shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-xs text-stone-700">{t('coordL1Title', 'Local Sahay Mitra Auto-Volunteer')}</strong>
                    <p className="text-[11px] text-stone-500">
                      Mitra: <strong>Ramesh Mahto (3 Wheeler - 1.5 km)</strong>
                    </p>
                    <p className="text-[10px] text-stone-500 font-medium">
                      {t('coordL1Desc', 'Backup option. Available instantly if ambulance gets blocked.')}
                    </p>
                  </div>
                </div>
              </div>

              {transportConfirmed ? (
                <div className="pt-2">
                  <button
                    onClick={() => setStep(5)}
                    className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>{t('tabSchemes', 'Check Financial/Scheme Eligibility')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-rose-50 text-brand-primary border border-rose-100 rounded-xl p-3 text-[11px] text-center font-bold">
                  ⚠️ {t('dispatchAmbulance', 'Tap the Ambulance block above to confirm transport assignment.')}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Government Schemes / Finance Help */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-extrabold text-text-dark">{t('financialHubTitle', 'Government Scheme & Financial Assistance')}</h3>
                <p className="text-[11px] text-text-muted">
                  {t('financialHubSubtitle', 'Check eligibility for cash-free treatment at')} {translateText(selectedHospital?.name)}.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-cream-border p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-rose-50 text-brand-primary rounded-lg shrink-0 mt-0.5">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-dark">Ayushman Bharat (PM-JAY) Eligibility</h4>
                    <p className="text-[11px] text-text-muted">
                      {t('eligibleStatus', 'Provides cash-free secondary and tertiary hospitalization up to ₹5 Lakhs per family per year.')}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-cream-border/60">
                  <span className="text-xs font-bold text-stone-700">{t('villageLabel', 'Village Family Status')}:</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    🟢 {t('verified', 'Active Beneficiary Card Found')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 border border-cream-border rounded-xl text-[10px] text-text-muted">
                <strong>{t('details', 'Notice')}:</strong> {t('ayushmanAligned', 'Sahay coordinates claims under Ayushman Bharat and State schemes with verified PHCs and hospitals.')}
              </div>

              <button
                onClick={() => setStep(6)}
                className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1.5"
              >
                <span>{t('vitalsTransmitted', 'Activate Emergency Coordination Summary')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 6: Coordination Follow-up Summary */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="mx-auto w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-sm font-extrabold text-emerald-950">{t('vitalsTransmitted', 'Emergency Pathway Activated')}</h3>
                <p className="text-xs text-emerald-800 font-medium">
                  {t('operatorNote', 'Coordination ticket is live. Operator Rajesh remains on standby.')}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-cream-border p-4 space-y-3.5 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-dark border-b border-cream-border pb-1.5">
                  {t('emergencyDeskSubtitle', 'Live Coordination Ticket Summary')}
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-text-muted block">{t('step1Title', 'Care Desk Operator')}</span>
                    <strong className="text-stone-800">Rajesh Kumar (ID-409)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted block">{t('step3Title', 'Reserved Facility')}</span>
                    <strong className="text-stone-800">{translateText(selectedHospital?.name)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted block">{t('step2Title', 'Transport Status')}</span>
                    <strong className="text-stone-800">{t('ambulanceDispatched', 'Govt Ambulance (10 min away)')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted block">{t('tabSchemes', 'Financial Aid Status')}</span>
                    <strong className="text-stone-800">PM-JAY Pre-Authorized</strong>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setStep(1);
                    setCallingState('dialing');
                    setSelectedHospital(null);
                    setTransportConfirmed(false);
                  }}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-3 rounded-xl transition-colors text-xs"
                >
                  {t('retry', 'Restart Flow Simulation')}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl shadow-md transition-colors text-xs"
                >
                  {t('close', 'Return to Dashboard')}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
