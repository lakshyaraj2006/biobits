import React, { useState } from 'react';
import { X, Heart, ShieldAlert, CheckCircle2, Search, Info, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BloodSupportHub = ({ isOpen, onClose }) => {
  const { t, translateText } = useLanguage();
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [stage, setStage] = useState('input'); // input, searching, results, requested
  const [selectedDonor, setSelectedDonor] = useState(null);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setStage('searching');
    setTimeout(() => {
      setStage('results');
    }, 1500);
  };

  const verifyEraktKosh = [
    {
      bankName: 'Rampur Sub-District Blood Bank',
      status: 'Available',
      units: '4 ' + t('unitsAvailable', 'Units Available'),
      lastUpdated: t('confirmedAgo', 'Confirmed') + ' 10 min ago (e-RaktKosh Direct API)',
      type: 'Government Bank',
      style: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      bankName: 'Kalyanpur CHC Storage Facility',
      status: 'Out of Stock',
      units: '0 ' + t('unitsAvailable', 'Units Available'),
      lastUpdated: t('confirmedAgo', 'Checked') + ' 1 hour ago',
      type: 'CHC Cabinet',
      style: 'text-rose-700 bg-rose-50 border-rose-200'
    }
  ];

  const communityDonors = [
    {
      id: 'DONOR-882',
      group: 'O+',
      distance: '2.4 km (Rampur Village)',
      availability: t('availableNow', 'Available Now'),
      verified: true,
      reason: 'Regular donor, verified history'
    },
    {
      id: 'DONOR-104',
      group: 'O+',
      distance: '5.8 km (Balanagar)',
      availability: t('availableEvening', 'Available (Evening Only)'),
      verified: true,
      reason: 'Last donated 6 months ago'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-cream-bg rounded-3xl border border-cream-border w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-brand-deep text-white p-5 flex items-center justify-between border-b border-rose-950">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-primary text-white">
              <Heart className="w-5 h-5 fill-white text-brand-primary" />
            </span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">{t('bloodHubTitle', 'Blood Coordination')}</h2>
              <p className="text-[11px] text-rose-200 font-medium">{t('bloodHubSubtitle', 'Sahay Integrated Blood Network')}</p>
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

        {/* Content Body */}
        <div className="p-6">
          
          {stage === 'input' && (
            <form onSubmit={handleSearch} className="space-y-4 text-center">
              <div className="mx-auto w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-brand-primary fill-brand-primary" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-text-dark">{t('searchBloodTitle', 'Search Verified Blood Bank Inventories')}</h3>
                <p className="text-xs text-text-muted max-w-md mx-auto">
                  {t('searchBloodDesc', 'Sahay queries the national e-RaktKosh platform and coordinates with verified local repositories first.')}
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <div>
                  <label className="text-[10px] text-text-muted font-bold block mb-1">{t('bloodGroupLabel', 'Required Blood Group')}</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-white text-text-dark text-xs border border-cream-border rounded-xl px-3 py-3 focus:outline-none focus:border-brand-primary font-bold shadow-xs cursor-pointer"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-3 rounded-xl text-xs transition-colors shadow-md"
                >
                  {t('searchInventories', 'Search & Coordinate Blood')}
                </button>
              </div>
            </form>
          )}

          {stage === 'searching' && (
            <div className="py-8 text-center space-y-4 animate-pulse">
              <div className="mx-auto w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-sm font-bold text-text-dark">{t('searchingEraktkosh', 'Checking e-RaktKosh Registry...')}</h3>
              <p className="text-[11px] text-text-muted">{t('searchBloodDesc', 'Fetching live stocks from government banks & local PHC fridges.')}</p>
            </div>
          )}

          {stage === 'results' && (
            <div className="space-y-5 text-left">
              
              {/* Stage 1: Official Blood Banks */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-dark">1. {t('resultsFound', 'Official inventories (e-RaktKosh)')}</h3>
                  <p className="text-[10px] text-text-muted">{t('eraktkoshLive', 'Always request official inventory first to safeguard clinical quality.')}</p>
                </div>

                {verifyEraktKosh.map((b, idx) => (
                  <div key={idx} className="p-3 bg-white border border-cream-border rounded-2xl flex justify-between items-center gap-3">
                    <div>
                      <strong className="text-xs text-text-dark block">{translateText(b.bankName)}</strong>
                      <span className="text-[10px] text-text-muted block mt-0.5">{b.lastUpdated}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full border shrink-0 ${b.style}`}>
                      {b.units}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stage 2: Community Donors Fallback */}
              <div className="space-y-3 pt-3 border-t border-cream-border">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-rose-50 text-brand-primary rounded-lg shrink-0">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-dark">2. {t('communityVerified', 'Community donor network fallback')}</h3>
                    <p className="text-[10px] text-text-muted">{t('coordL1Desc', 'Use this community fallback pool if official stocks are unavailable.')}</p>
                  </div>
                </div>

                {/* Privacy Safeguard Advisory */}
                <div className="p-3 bg-stone-100 rounded-xl border border-cream-border flex gap-2">
                  <ShieldAlert className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <p className="text-[9px] text-text-muted leading-normal">
                    <strong>{t('privacySecurity', 'Donor Privacy Protected')}:</strong> {t('privacySecurity', 'In compliance with data minimization guidelines, donors names and phone numbers are protected.')}
                  </p>
                </div>

                <div className="space-y-2">
                  {communityDonors.map((d) => (
                    <div key={d.id} className="p-3 bg-white border border-cream-border rounded-2xl flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs text-stone-800">{t('verified', 'Verified')} {d.group} {t('roleCitizen', 'Donor')} ({d.id})</strong>
                          <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-100">
                            {d.availability}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-muted flex items-center gap-0.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {d.distance}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedDonor(d);
                          setStage('requested');
                        }}
                        className="bg-brand-primary hover:bg-brand-deep text-white font-bold py-1.5 px-3 rounded-xl text-[10px] transition-colors shadow-xs"
                      >
                        {t('requestBlood', 'Request Match')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {stage === 'requested' && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-emerald-950">{t('matchRequested', 'Match Requested Successfully')}</h3>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-semibold mt-2">
                  {t('operatorNote', 'Our Care Desk Operator is requesting authorization from donor.')} Once accepted, transport alignment will begin automatically.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStage('input')}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
                >
                  {t('search', 'New Search')}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
