import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Printer,
  Volume2,
  Calendar,
  AlertTriangle,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Pill
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

const PRESET_MEDS = [
  { name: 'Paracetamol 650mg', timing: '3 Times Daily (After food)', duration: '3 Days', instruction: 'For fever and body ache' },
  { name: 'Oral Rehydration Salts (ORS)', timing: 'Frequent sips after loose stool', duration: '3 Days', instruction: '1 packet dissolved in 1L clean water' },
  { name: 'Zinc Sulphate 20mg', timing: 'Once Daily (After food)', duration: '14 Days', instruction: 'Restores gut lining' },
  { name: 'Amoxicillin 500mg', timing: 'Twice Daily (Morning & Night)', duration: '5 Days', instruction: 'Complete full course' },
  { name: 'Cetirizine 10mg', timing: 'Once at Night before bed', duration: '5 Days', instruction: 'For allergic rash and itching' },
  { name: 'Iron-Folic Acid (IFA Red)', timing: 'Once Daily after dinner', duration: '90 Days', instruction: 'With lemon water; not with tea/milk' },
];

export const PrescriptionModal = ({ caseData, isOpen, onClose }) => {
  const { addPrescription } = useHealthData();
  const { t, currentLang } = useLanguage();

  const isAlreadyReviewed = caseData?.status === 'reviewed' && caseData?.prescription;

  const [doctorName, setDoctorName] = useState(
    caseData?.prescription?.doctorName || 'Dr. Alok Verma, MBBS (PHC Rampur Medical Officer)'
  );
  const [medicines, setMedicines] = useState(
    caseData?.prescription?.medicines || [
      { name: 'Paracetamol 650mg', timing: '3 Times Daily (After food)', duration: '3 Days', instruction: 'Take after food for fever' },
      { name: 'Oral Rehydration Salts (ORS)', timing: 'Sip throughout the day', duration: '3 Days', instruction: '1 sachet in 1 liter clean boiled water' }
    ]
  );
  const [dietAdvice, setDietAdvice] = useState(
    caseData?.prescription?.dietAdvice || 'Drink plenty of boiled water, rice kanji, light khichdi. Avoid raw/unwashed street food.'
  );
  const [warningSigns, setWarningSigns] = useState(
    caseData?.prescription?.warningSigns || 'If patient develops high fever >103°F, severe dehydration, or difficulty breathing, bring to PHC immediately.'
  );
  const [followUp, setFollowUp] = useState(
    caseData?.prescription?.followUp || 'Follow-up with village ASHA worker after 48 hours.'
  );

  if (!isOpen || !caseData) return null;

  const handleAddMedicine = (preset = null) => {
    if (preset) {
      setMedicines([...medicines, { ...preset }]);
    } else {
      setMedicines([
        ...medicines,
        { name: '', timing: 'Twice Daily (Morning & Night)', duration: '3 Days', instruction: 'Take with clean water' },
      ]);
    }
  };

  const handleUpdateMedicine = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleSubmitRx = (e) => {
    e.preventDefault();
    addPrescription(caseData.id, {
      doctorName,
      medicines,
      dietAdvice,
      warningSigns,
      followUp,
    });
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  // Construct vernacular spoken summary for illiterate users
  const buildAudioSummary = () => {
    const medList = (caseData.prescription?.medicines || medicines)
      .map((m, i) => `Medicine ${i + 1}: ${m.name}, timing: ${m.timing}, duration: ${m.duration}. ${m.instruction}.`)
      .join(' ');
    return `Doctor Prescription for patient ${caseData.patientName}. Doctor Advice: ${caseData.prescription?.dietAdvice || dietAdvice}. Medicines prescribed: ${medList}. Warning signs: ${caseData.prescription?.warningSigns || warningSigns}.`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
              <Stethoscope className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {isAlreadyReviewed ? 'Digital E-Prescription Slip' : 'Write Digital Prescription'}
                </h3>
                <AudioVoiceButton
                  text={buildAudioSummary()}
                  label="Audio Prescription"
                  size="sm"
                  className="bg-white/20 text-white border-white/30"
                />
              </div>
              <p className="text-xs text-teal-200 mt-0.5">
                Case ID: {caseData.id} • Patient: {caseData.patientName} ({caseData.age}y / {caseData.gender})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAlreadyReviewed && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                title="Print Prescription Slip"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Slip</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Viewable Prescription Body */}
        <div id="printable-prescription" className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* PHC Header for Print Slip */}
          <div className="border-b-2 border-slate-800 pb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  Bio<span className="text-emerald-600">Bits</span> SWASTHYA TELECLINIC
                </span>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
                  Govt. PHC Network
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700 mt-1">
                Primary Health Centre (PHC) Telemedicine Portal • Asynchronous Store-and-Forward
              </p>
              <p className="text-[11px] text-slate-500">
                Authorized under National Telemedicine Guidelines & Ayushman Bharat Digital Mission (ABDM)
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase">Case ID</span>
              <p className="text-sm font-extrabold text-slate-900">{caseData.id}</p>
              <p className="text-[11px] text-slate-500">
                {new Date(caseData.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Patient Details & Vitals Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">Patient Name</span>
              <strong className="text-slate-900 text-sm">{caseData.patientName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Age / Gender</span>
              <strong className="text-slate-800">{caseData.age} Years • {caseData.gender}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Village / Hamlet</span>
              <strong className="text-slate-800">{caseData.village}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Triage Priority</span>
              <span className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                caseData.triageLevel === 'Emergency'
                  ? 'bg-rose-100 text-rose-800'
                  : caseData.triageLevel === 'Urgent'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {caseData.triageLevel}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-200 flex flex-wrap gap-3 text-[11px] text-slate-700 font-medium">
              <span>🌡️ <strong>Temp:</strong> {caseData.vitals?.temperature}°F</span>
              <span>🩺 <strong>BP:</strong> {caseData.vitals?.bpSys}/{caseData.vitals?.bpDia} mmHg</span>
              <span>💓 <strong>Pulse:</strong> {caseData.vitals?.pulse} bpm</span>
              <span>🫁 <strong>SpO2:</strong> {caseData.vitals?.spO2}%</span>
              <span>🩸 <strong>Sugar:</strong> {caseData.vitals?.glucose} mg/dL</span>
            </div>
          </div>

          {/* Reported Symptoms */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Chief Complaints & Reported Symptoms:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {caseData.symptoms?.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                  • {s}
                </span>
              ))}
            </div>
          </div>

          {/* Medicines List / Prescription Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-black text-emerald-700">℞</span>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Prescribed Medicines & Dosage Schedule:
                </span>
              </div>

              {!isAlreadyReviewed && (
                <div className="no-print flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">Quick Add:</span>
                  <select
                    onChange={(e) => {
                      const found = PRESET_MEDS.find((m) => m.name === e.target.value);
                      if (found) handleAddMedicine(found);
                    }}
                    className="text-xs bg-slate-100 text-slate-800 border border-slate-300 rounded-lg px-2 py-1"
                    defaultValue=""
                  >
                    <option value="" disabled>+ Pick Standard Medicine</option>
                    {PRESET_MEDS.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Medicines List */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
              {medicines.map((med, index) => (
                <div key={index} className="p-3.5 bg-white hover:bg-slate-50/80 transition-colors">
                  {isAlreadyReviewed ? (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {index + 1}. {med.name}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {med.duration}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-teal-800 mt-1">
                          ⏰ Timing: {med.timing}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          💡 Instructions: {med.instruction}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <Pill className="w-4 h-4 text-emerald-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => handleUpdateMedicine(index, 'name', e.target.value)}
                          placeholder="Medicine name & strength (e.g. Paracetamol 650mg)"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={med.duration}
                          onChange={(e) => handleUpdateMedicine(index, 'duration', e.target.value)}
                          placeholder="Duration (e.g. 5 Days)"
                          className="w-28 px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(index)}
                          className="text-rose-500 hover:text-rose-700 p-1.5 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={med.timing}
                          onChange={(e) => handleUpdateMedicine(index, 'timing', e.target.value)}
                          placeholder="Timing (e.g. ☀️ Morning & 🌙 Night after food)"
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                        />
                        <input
                          type="text"
                          value={med.instruction}
                          onChange={(e) => handleUpdateMedicine(index, 'instruction', e.target.value)}
                          placeholder="Special instructions (e.g. Take with warm water)"
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isAlreadyReviewed && (
              <button
                type="button"
                onClick={() => handleAddMedicine()}
                className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-emerald-500 text-slate-600 hover:text-emerald-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors no-print"
              >
                <Plus className="w-4 h-4" />
                Add Another Medicine
              </button>
            )}
          </div>

          {/* Doctor Dietary Advice & Red Flag Warnings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-xs font-bold text-amber-900 uppercase block mb-1">
                🥣 Diet & Home Care Advice:
              </span>
              {isAlreadyReviewed ? (
                <p className="text-xs text-amber-950 font-medium leading-relaxed">{dietAdvice}</p>
              ) : (
                <textarea
                  rows="2"
                  value={dietAdvice}
                  onChange={(e) => setDietAdvice(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-amber-300 bg-white"
                />
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200">
              <span className="text-xs font-bold text-rose-900 uppercase block mb-1">
                ⚠️ Danger Alarm Signs:
              </span>
              {isAlreadyReviewed ? (
                <p className="text-xs text-rose-950 font-medium leading-relaxed">{warningSigns}</p>
              ) : (
                <textarea
                  rows="2"
                  value={warningSigns}
                  onChange={(e) => setWarningSigns(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-rose-300 bg-white"
                />
              )}
            </div>
          </div>

          {/* Doctor Signature Block */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Authorized Medical Officer</span>
              <p className="text-xs font-extrabold text-slate-900">{doctorName}</p>
              <p className="text-[10px] text-slate-500">Reg. No: MCI-2018-94102 • PHC Rural Telehealth</p>
              <p className="text-[10px] text-emerald-700 font-bold mt-0.5">
                ✓ Digitally signed & verified for dispensing at local village Jan Aushadhi Kendra
              </p>
            </div>

            <div className="text-right">
              <div className="w-32 h-10 border-b border-slate-400 flex items-center justify-center text-slate-400 font-serif italic text-sm">
                Dr. Alok Verma
              </div>
              <span className="text-[10px] text-slate-500 font-bold">Digital Signature</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            {t('close', 'Close')}
          </button>

          {!isAlreadyReviewed && (
            <button
              onClick={handleSubmitRx}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Sign & Issue Prescription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
