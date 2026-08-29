import React, { useState } from 'react';
import {
  X,
  Thermometer,
  Camera,
  Mic,
  MicOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { SAMPLE_MEDICAL_PHOTOS } from '../../data/mockData';

const COMMON_SYMPTOMS = [
  'High Fever',
  'Loose Stools / Diarrhea',
  'Vomiting',
  'Skin Rash / Redness',
  'Severe Joint Pain',
  'Cough & Cold',
  'Shortness of Breath',
  'Severe Headache',
  'Abdominal Cramps',
  'Eye Redness / Itching',
  'Foot / Hand Swelling',
  'Extreme Weakness'
];

const BODY_AREAS = [
  { id: 'whole_body', label: 'Whole Body / Fever', icon: '🌡️' },
  { id: 'stomach', label: 'Stomach & Gut', icon: '🥣' },
  { id: 'skin', label: 'Skin & Limbs', icon: '🦵' },
  { id: 'chest', label: 'Chest & Breathing', icon: '🫁' },
  { id: 'head_eye', label: 'Head, Eyes, Throat', icon: '👁️' },
  { id: 'maternal', label: 'Maternal / Pregnancy', icon: '🤰' },
];

export const NewCaseModal = ({ isOpen, onClose }) => {
  const { addCase } = useHealthData();
  const { t, translateText } = useLanguage();

  const [step, setStep] = useState(1); // 1: Patient & Symptoms, 2: Vitals, 3: Photo & Voice

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Female',
    village: 'Rampur Cluster',
    phone: '',
    bodyArea: 'Whole Body / Fever',
    selectedSymptoms: [],
    customSymptom: '',
    temperature: 98.6,
    bpSys: 120,
    bpDia: 80,
    pulse: 78,
    glucose: 100,
    spO2: 98,
    photoUrl: '',
    photoLabel: '',
    isRecordingVoice: false,
    hasVoiceNote: false,
    voiceDuration: '0:32',
  });

  if (!isOpen) return null;

  const toggleSymptom = (sym) => {
    setFormData((prev) => {
      const exists = prev.selectedSymptoms.includes(sym);
      return {
        ...prev,
        selectedSymptoms: exists
          ? prev.selectedSymptoms.filter((s) => s !== sym)
          : [...prev.selectedSymptoms, sym],
      };
    });
  };

  const handleAddCustomSymptom = () => {
    if (formData.customSymptom.trim()) {
      toggleSymptom(formData.customSymptom.trim());
      setFormData((prev) => ({ ...prev, customSymptom: '' }));
    }
  };

  // Compute calculated triage severity based on symptoms & vitals
  const calculateTriage = () => {
    const { temperature, bpSys, bpDia, spO2, pulse, selectedSymptoms } = formData;
    let isEmergency = false;
    let isUrgent = false;

    if (spO2 < 92 || temperature >= 103.5 || bpSys >= 160 || bpDia >= 100 || pulse > 125) {
      isEmergency = true;
    } else if (
      temperature >= 101.5 ||
      bpSys >= 140 ||
      bpDia >= 90 ||
      spO2 < 95 ||
      selectedSymptoms.some((s) => s.includes('Breath') || s.includes('Chest') || s.includes('Vomiting'))
    ) {
      isUrgent = true;
    }

    if (isEmergency) return 'Emergency';
    if (isUrgent) return 'Urgent';
    return 'Routine';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const triage = calculateTriage();

    addCase({
      patientName: formData.patientName || 'Rural Citizen',
      age: parseInt(formData.age) || 28,
      gender: formData.gender,
      village: formData.village,
      phone: formData.phone || '+91 98000 12345',
      triageLevel: triage,
      symptoms: formData.selectedSymptoms.length > 0 ? formData.selectedSymptoms : ['General Unwellness'],
      bodyArea: formData.bodyArea,
      vitals: {
        temperature: parseFloat(formData.temperature),
        bpSys: parseInt(formData.bpSys),
        bpDia: parseInt(formData.bpDia),
        pulse: parseInt(formData.pulse),
        glucose: parseInt(formData.glucose),
        spO2: parseInt(formData.spO2),
      },
      photoUrl: formData.photoUrl || null,
      photoLabel: formData.photoLabel || (formData.photoUrl ? 'Medical condition image' : null),
      voiceNoteDuration: formData.hasVoiceNote ? formData.voiceDuration : null,
      voiceNoteSummary: formData.hasVoiceNote ? 'Patient voice symptom summary recorded by ASHA worker.' : null,
      ashaWorker: 'Community Health Assistant',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {t('newCaseTitle', 'Log New Patient Case File')}
                </h3>
                <AudioVoiceButton
                  text={`${t('newCaseTitle')}. ${t('patientName')}, ${t('symptomsTitle')}, ${t('vitalsTitle')}.`}
                  size="sm"
                  className="bg-white/20 text-white border-white/30"
                />
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                {t('step', 'Step')} {step} / 3 • {t('storeAndForward', 'Asynchronous Doctor Store & Forward')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <div className={`flex-1 py-3 text-center border-b-2 transition-all ${step === 1 ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent'}`}>
            1. {t('step1Patient', 'Patient & Symptoms')}
          </div>
          <div className={`flex-1 py-3 text-center border-b-2 transition-all ${step === 2 ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent'}`}>
            2. {t('step2Vitals', 'Vitals & Measurements')}
          </div>
          <div className={`flex-1 py-3 text-center border-b-2 transition-all ${step === 3 ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent'}`}>
            3. {t('step3Media', 'Photo & Voice Note')}
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Patient Info & Symptoms */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('patientName', 'Patient Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="e.g. Rameshwar Kumar / Sunita Devi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t('age', 'Age')} *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 35"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t('gender', 'Gender')}
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-2 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Female">{translateText('Female')}</option>
                      <option value="Male">{translateText('Male')}</option>
                      <option value="Child/Infant">{translateText('Child')}</option>
                      <option value="Other">{translateText('Other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('villageLabel', 'Village / Gram Panchayat')} *
                  </label>
                  <select
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Rampur Cluster">Rampur Cluster</option>
                    <option value="Balanagar West">Balanagar West</option>
                    <option value="Devigarh Tribal Hamlet">Devigarh Tribal Hamlet</option>
                    <option value="Shivpuri Gram">Shivpuri Gram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('phone', 'Mobile Number (for SMS Rx)')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Body Area Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('bodyArea', 'Select Primary Affected Body Area')}:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BODY_AREAS.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, bodyArea: area.label })}
                      className={`p-2.5 rounded-xl text-left border flex items-center gap-2 text-xs font-bold transition-all ${
                        formData.bodyArea === area.label
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-base">{area.icon}</span>
                      <span className="truncate">{translateText(area.label)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Chips Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('selectSymptoms', 'Tap All Reported Symptoms')} ({formData.selectedSymptoms.length} {t('selected', 'selected')}):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SYMPTOMS.map((sym) => {
                    const isSelected = formData.selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {translateText(sym)}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={formData.customSymptom}
                    onChange={(e) => setFormData({ ...formData, customSymptom: e.target.value })}
                    placeholder={t('otherSymptom', 'Type other symptom and press Add...')}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSymptom}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900"
                  >
                    {t('add', 'Add')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Vitals & Measurements */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-emerald-600" />
                  <span>{t('vitalsNote', 'Vitals recorded help AI triage and assist PHC Doctor with diagnostic accuracy.')}</span>
                </div>
                <AudioVoiceButton
                  text={`${t('vitalsTitle')}. ${t('temp')}, ${t('bp')}, ${t('pulse')}, ${t('spO2')}.`}
                  size="sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Temperature */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase">
                      🌡️ {t('temp', 'Body Temp (°F)')}
                    </label>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      formData.temperature >= 102
                        ? 'bg-rose-100 text-rose-700'
                        : formData.temperature >= 100
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {formData.temperature}°F ({formData.temperature >= 100.4 ? translateText('Fever') : translateText('Normal')})
                    </span>
                  </div>
                  <input
                    type="range"
                    min="96"
                    max="106"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>96°F ({translateText('Normal')})</span>
                    <span>100.4°F ({translateText('Fever')})</span>
                    <span>104°F+ (Danger)</span>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase">
                      🩺 {t('bp', 'Blood Pressure (Sys / Dia)')}
                    </label>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      formData.bpSys >= 140 || formData.bpDia >= 90
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {formData.bpSys}/{formData.bpDia} mmHg
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">{t('systolic', 'Systolic (Top)')}</span>
                      <input
                        type="number"
                        value={formData.bpSys}
                        onChange={(e) => setFormData({ ...formData, bpSys: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">{t('diastolic', 'Diastolic (Bottom)')}</span>
                      <input
                        type="number"
                        value={formData.bpDia}
                        onChange={(e) => setFormData({ ...formData, bpDia: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Pulse Rate */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase">
                      💓 {t('pulse', 'Pulse Rate (BPM)')}
                    </label>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {formData.pulse} {t('bpm', 'bpm')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="160"
                    value={formData.pulse}
                    onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>60 {translateText('Normal')}</span>
                    <span>100 Fast</span>
                    <span>140+ Tachycardia</span>
                  </div>
                </div>

                {/* Oxygen SpO2 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase">
                      🫁 {t('spO2', 'Oxygen Saturation (SpO2)')}
                    </label>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      formData.spO2 < 94 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {formData.spO2}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="100"
                    value={formData.spO2}
                    onChange={(e) => setFormData({ ...formData, spO2: e.target.value })}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>&lt;92% (Danger)</span>
                    <span>95-100% ({translateText('Normal')})</span>
                  </div>
                </div>
              </div>

              {/* Calculated Triage Preview */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase">{t('triageCalculation', 'Automated AI Triage Assessment')}:</span>
                  <p className="text-xs text-slate-600">{t('vitalsNote', 'Based on submitted vitals & symptom criteria.')}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-xl font-extrabold text-xs uppercase tracking-wider ${
                  calculateTriage() === 'Emergency'
                    ? 'bg-rose-600 text-white animate-pulse'
                    : calculateTriage() === 'Urgent'
                    ? 'bg-amber-500 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {translateText(calculateTriage())}
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Photo & Voice Note */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Photo Upload / Selection */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      📷 {t('attachPhoto', 'Medical Photo Attachment (Rash, Throat, Wound, Eye)')}
                    </label>
                    <p className="text-xs text-slate-500">
                      {t('photoDesc', 'Take a photo with phone camera or pick a sample demonstration photo below.')}
                    </p>
                  </div>
                  <Camera className="w-5 h-5 text-emerald-600" />
                </div>

                {/* Preset quick test images */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        photoUrl: SAMPLE_MEDICAL_PHOTOS.skin_rash,
                        photoLabel: 'Skin Rash & Erythema',
                      })
                    }
                    className={`p-2 rounded-xl border text-center transition-all ${
                      formData.photoUrl === SAMPLE_MEDICAL_PHOTOS.skin_rash
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={SAMPLE_MEDICAL_PHOTOS.skin_rash}
                      alt="Rash"
                      className="w-full h-16 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-700">{translateText('Skin Rash')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        photoUrl: SAMPLE_MEDICAL_PHOTOS.foot_swelling,
                        photoLabel: 'Foot / Leg Swelling (Edema)',
                      })
                    }
                    className={`p-2 rounded-xl border text-center transition-all ${
                      formData.photoUrl === SAMPLE_MEDICAL_PHOTOS.foot_swelling
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={SAMPLE_MEDICAL_PHOTOS.foot_swelling}
                      alt="Foot Swelling"
                      className="w-full h-16 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-700">{translateText('Foot / Hand Swelling')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        photoUrl: SAMPLE_MEDICAL_PHOTOS.red_eye,
                        photoLabel: 'Eye Redness / Conjunctivitis',
                      })
                    }
                    className={`p-2 rounded-xl border text-center transition-all ${
                      formData.photoUrl === SAMPLE_MEDICAL_PHOTOS.red_eye
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={SAMPLE_MEDICAL_PHOTOS.red_eye}
                      alt="Red Eye"
                      className="w-full h-16 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-700">{translateText('Eye Redness')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        photoUrl: SAMPLE_MEDICAL_PHOTOS.throat_swelling,
                        photoLabel: 'Throat / Oral Lesion',
                      })
                    }
                    className={`p-2 rounded-xl border text-center transition-all ${
                      formData.photoUrl === SAMPLE_MEDICAL_PHOTOS.throat_swelling
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <img
                      src={SAMPLE_MEDICAL_PHOTOS.throat_swelling}
                      alt="Throat Swelling"
                      className="w-full h-16 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-700">Throat Lesion</span>
                  </button>
                </div>

                {formData.photoUrl && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs text-emerald-900">
                    <span className="font-semibold">{t('selected', 'Selected')}: {translateText(formData.photoLabel)}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: '', photoLabel: '' })}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      {t('remove', 'Remove')}
                    </button>
                  </div>
                )}
              </div>

              {/* Voice Note Recording Simulator for Illiterate / Layman Patients */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      🎙️ {t('recordVoice', 'Vernacular Voice Recording')}
                    </label>
                    <p className="text-xs text-slate-500">
                      {t('recordVoiceDesc', 'Record symptoms in mother tongue — doctor can listen to the audio playback.')}
                    </p>
                  </div>
                  <Mic className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          hasVoiceNote: true,
                          isRecordingVoice: !prev.isRecordingVoice,
                        }))
                      }
                      className={`p-3.5 rounded-full font-bold transition-all ${
                        formData.isRecordingVoice
                          ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-500/40'
                          : formData.hasVoiceNote
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {formData.isRecordingVoice ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {formData.isRecordingVoice
                          ? '🔴 ' + t('recordingVoice', 'Recording Audio in Progress...')
                          : formData.hasVoiceNote
                          ? '✅ ' + t('voiceSaved', 'Audio Symptom Note Saved (0:32)')
                          : t('recordVoicePrompt', 'Tap mic button to record voice explanation')}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {t('offlineAudioNote', 'Works completely offline in remote tribal areas.')}
                      </p>
                    </div>
                  </div>

                  {formData.hasVoiceNote && (
                    <AudioVoiceButton
                      text="Patient voice note: Sudden fever with severe joint pain and redness after village harvest."
                      label={t('playRecording', 'Play Recording')}
                      size="sm"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('previousStep', 'Previous Step')}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100"
              >
                {t('cancel', 'Cancel')}
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !formData.patientName) {
                    alert('Please enter patient name to proceed.');
                    return;
                  }
                  setStep(step + 1);
                }}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-600/30"
              >
                {t('nextStep', 'Next Step')}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-lg shadow-emerald-600/40"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t('submitCase', 'Submit Case File to Doctor')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
