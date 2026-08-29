import React, { useState } from 'react';
import { X, Search, FileText, CheckCircle2, AlertCircle, Info, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FinancialHelpHub = ({ isOpen, onClose }) => {
  const { t, translateText } = useLanguage();
  const [activeTab, setActiveTab] = useState('schemes'); // schemes, loans
  const [searchQuery, setSearchQuery] = useState('');
  const [income, setIncome] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState(null);

  if (!isOpen) return null;

  const schemes = [
    {
      id: 'PMJAY',
      name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      description: t('eligibleStatus', 'Provides ₹5 Lakh free health cover per family per year for secondary and tertiary care hospitalization.'),
      eligibility: 'Identified rural households under SECC & NFSA criteria.',
      documents: ['Aadhaar Card', 'Ration Card (NFSA)', 'PM-JAY Card', 'Income Certificate'],
      coverage: 'Pre-existing conditions, surgery, ICU beds, diagnostics & post-hospitalization costs.'
    },
    {
      id: 'JSY',
      name: 'Janani Suraksha Yojana (JSY)',
      description: t('maternalSubheader', 'Safe motherhood cash assistance for institutional deliveries to reduce maternal mortality.'),
      eligibility: 'All pregnant women delivering in government health facilities or accredited hospitals.',
      documents: ['ASHA registered MCP Card', 'Bank Account details', 'Aadhaar Card'],
      coverage: 'Cash incentive of ₹1,400 to rural mothers and ₹600 to ASHA workers.'
    },
    {
      id: 'ABHA',
      name: 'Ayushman Bharat Digital Account (ABHA / ABDM)',
      description: 'Creates digital health identity, storing medical prescriptions, lab reports, and vaccination logs securely.',
      eligibility: 'All citizens (open registration via Aadhaar).',
      documents: ['Aadhaar Card', 'Mobile linked to Aadhaar'],
      coverage: 'Consent-based sharing of health records across verified clinical networks.'
    }
  ];

  const loans = [
    {
      lender: 'State Bank of India (SBI) Medical Care',
      interest: '8.5% p.a.',
      processingFee: '0.5% (Max ₹500)',
      tenure: '24 ' + t('weeks', 'Months'),
      emi: '₹4,546 / month',
      totalRepayment: '₹1,09,104',
      amount: '₹1,00,000',
      badge: 'Low Interest Rate'
    },
    {
      lender: 'Arogya Finance (Rural Health Partner)',
      interest: '9.0% p.a.',
      processingFee: 'Nil',
      tenure: '12 ' + t('weeks', 'Months'),
      emi: '₹8,745 / month',
      totalRepayment: '₹1,04,940',
      amount: '₹1,00,000',
      badge: 'Zero Processing Fees'
    },
    {
      lender: 'HDFC Bank HealthEasy Loan',
      interest: '10.2% p.a.',
      processingFee: '1.0% (₹1,000)',
      tenure: '36 ' + t('weeks', 'Months'),
      emi: '₹3,236 / month',
      totalRepayment: '₹1,16,496',
      amount: '₹1,00,000',
      badge: 'Longer Tenure Available'
    }
  ];

  const checkEligibility = (e) => {
    e.preventDefault();
    const parsedIncome = parseFloat(income);
    if (!parsedIncome || isNaN(parsedIncome)) return;

    if (parsedIncome < 120000) {
      setEligibilityResult({
        status: 'eligible',
        message: t('eligibleStatus', 'High probability of eligibility under PM-JAY & State Food Security schemes.'),
        schemes: ['PMJAY', 'JSY']
      });
    } else {
      setEligibilityResult({
        status: 'partial',
        message: 'May qualify for secondary state schemes or maternity grants (JSY). Recommend ABDM registration.',
        schemes: ['JSY', 'ABHA']
      });
    }
  };

  const filteredSchemes = schemes.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-cream-bg rounded-3xl border border-cream-border w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-brand-deep text-white p-5 flex items-center justify-between border-b border-rose-950">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-primary text-white">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">{t('financialHubTitle', 'Financial Help Coordination')}</h2>
              <p className="text-[11px] text-rose-200 font-medium">{t('financialHubSubtitle', 'Sahay Rural Assistance Desk')}</p>
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

        {/* Navigation Tabs */}
        <div className="bg-cream-panel p-2.5 border-b border-cream-border flex gap-2">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'schemes'
                ? 'bg-white text-brand-primary shadow-xs border border-cream-border'
                : 'text-text-muted hover:text-text-dark'
            }`}
          >
            {t('tabSchemes', 'Government Schemes & Assistance')}
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'loans'
                ? 'bg-white text-brand-primary shadow-xs border border-cream-border'
                : 'text-text-muted hover:text-text-dark'
            }`}
          >
            {t('tabLoans', 'Emergency Medical Loans')}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          
          {/* TAB 1: Government Schemes */}
          {activeTab === 'schemes' && (
            <div className="space-y-6">
              
              {/* Eligibility Calculator */}
              <div className="p-4 bg-white rounded-2xl border border-cream-border space-y-3 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-dark flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-brand-primary" />
                  {t('checkEligibilityTitle', 'Quick Scheme Eligibility Check')}
                </h3>

                <form onSubmit={checkEligibility} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-text-muted font-bold block mb-1">{t('annualIncomeLabel', 'Annual Family Income (₹)')}</label>
                    <input
                      type="number"
                      placeholder="e.g. 75000"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full bg-cream-bg text-text-dark text-xs border border-cream-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-text-muted font-bold block mb-1">{t('familySizeLabel', 'Family Members Count')}</label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      value={familySize}
                      onChange={(e) => setFamilySize(e.target.value)}
                      className="w-full bg-cream-bg text-text-dark text-xs border border-cream-border rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-primary"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-brand-deep text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                    >
                      {t('checkBtn', 'Check Eligibility')}
                    </button>
                  </div>
                </form>

                {eligibilityResult && (
                  <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 animate-in slide-in-from-top duration-200 ${
                    eligibilityResult.status === 'eligible' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                      : 'bg-amber-50 border-amber-100 text-amber-800'
                  }`}>
                    {eligibilityResult.status === 'eligible' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="block text-xs">{eligibilityResult.status === 'eligible' ? t('success', 'Highly Eligible') : t('status', 'Conditionally Eligible')}</strong>
                      <p className="text-[11px] mt-0.5">{eligibilityResult.message}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder={t('searchSchemesPlaceholder', 'Search government health schemes (e.g. maternity, PMJAY)...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-text-dark text-xs border border-cream-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-primary shadow-xs"
                />
              </div>

              {/* Schemes List */}
              <div className="space-y-4">
                {filteredSchemes.map((s) => (
                  <div key={s.id} className="p-4 bg-white rounded-2xl border border-cream-border space-y-3 text-left">
                    <div>
                      <h4 className="text-xs font-extrabold text-text-dark">{s.name}</h4>
                      <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{s.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] bg-cream-bg/60 p-3 rounded-xl border border-cream-border/50">
                      <div>
                        <span className="font-bold text-text-dark block">{t('details', 'Who Can Benefit?')}</span>
                        <span className="text-text-muted block mt-0.5">{s.eligibility}</span>
                      </div>
                      <div>
                        <span className="font-bold text-text-dark block">{t('status', 'Scope of Coverage:')}</span>
                        <span className="text-text-muted block mt-0.5">{s.coverage}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-text-dark block">{t('details', 'Required Verification Documents:')}</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {s.documents.map((doc, idx) => (
                          <span key={idx} className="bg-stone-100 text-text-muted text-[10px] px-2 py-0.5 rounded border border-cream-border font-semibold">
                            ✓ {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Emergency Medical Loans */}
          {activeTab === 'loans' && (
            <div className="space-y-6">
              
              {/* Important Referral Fee Disclaimer Box */}
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl flex gap-3 text-left">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-xs text-amber-900">{t('loanTitle', 'Referral & Credit Assistance Disclosure')}</strong>
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    {t('loanSubtitle', 'Sahay partners with verified banking entities to provide emergency loans for sudden hospital bills.')}
                  </p>
                </div>
              </div>

              {/* Loans List */}
              <div className="space-y-4">
                {loans.map((l, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-cream-border space-y-3 text-left">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-extrabold text-text-dark">{l.lender}</h4>
                        <span className="bg-brand-light text-brand-primary text-[9px] font-bold px-1.5 py-0.2 rounded border border-brand-primary/10">
                          {l.badge}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-text-muted block">{t('emiPerMonth', 'EMI (for loan)')}</span>
                        <strong className="text-sm font-black text-brand-primary">{l.emi}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-cream-border/60 text-xs">
                      <div>
                        <span className="text-[10px] text-text-muted block">{t('interestRate', 'Interest Rate')}</span>
                        <strong className="text-stone-800 font-semibold">{l.interest}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block">{t('zeroProcessing', 'Processing Fee')}</span>
                        <strong className="text-stone-800 font-semibold">{l.processingFee}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block">{t('tenure', 'Tenure Period')}</span>
                        <strong className="text-stone-800 font-semibold">{l.tenure}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block">{t('details', 'Total Repayment')}</span>
                        <strong className="text-brand-deep font-bold">{l.totalRepayment}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center text-xs text-rose-900 font-semibold max-w-md mx-auto">
                ❗ {t('applyLoan', 'Speak to Sahay Care Desk or ASHA worker for application support.')}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
