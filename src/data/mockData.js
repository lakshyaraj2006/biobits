// Seed data for BioBits Rural Health OS

export const SAMPLE_MEDICAL_PHOTOS = {
  skin_rash: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
  red_eye: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
  throat_swelling: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80',
  foot_swelling: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80',
};

export const INITIAL_CASES = [
  {
    id: 'CASE-2026-081',
    patientName: 'Rameshwar Kumar',
    age: 42,
    gender: 'Male',
    village: 'Rampur Cluster',
    phone: '+91 98351 24901',
    createdAt: '2026-08-28T09:30:00Z',
    triageLevel: 'Emergency', // Emergency | Urgent | Routine
    symptoms: ['High Fever (3 Days)', 'Joint Pain', 'Red Skin Rashes', 'Extreme Weakness'],
    bodyArea: 'Whole Body & Skin',
    vitals: {
      temperature: 103.2,
      bpSys: 110,
      bpDia: 74,
      pulse: 104,
      glucose: 118,
      spO2: 95,
    },
    photoUrl: SAMPLE_MEDICAL_PHOTOS.skin_rash,
    photoLabel: 'Maculopapular rash on forearm & trunk',
    voiceNoteDuration: '0:42',
    voiceNoteSummary: 'Patient reports severe joint agony with sudden onset rash following village harvest.',
    status: 'pending', // pending | reviewed
    ashaWorker: 'Sunita Devi (ASHA-402)',
    prescription: null,
  },
  {
    id: 'CASE-2026-079',
    patientName: 'Kaveri Soren',
    age: 26,
    gender: 'Female',
    village: 'Balanagar West',
    phone: '+91 89201 55678',
    createdAt: '2026-08-28T07:15:00Z',
    triageLevel: 'Urgent',
    symptoms: ['Severe Watery Diarrhea (6 episodes)', 'Vomiting', 'Dry Tongue', 'Mild Cramps'],
    bodyArea: 'Abdomen & GI',
    vitals: {
      temperature: 99.4,
      bpSys: 98,
      bpDia: 62,
      pulse: 112,
      glucose: 92,
      spO2: 97,
    },
    photoUrl: null,
    voiceNoteDuration: '0:28',
    voiceNoteSummary: 'Watery stool started early morning after drinking from communal borewell.',
    status: 'reviewed',
    ashaWorker: 'Meenakshi Roy (ASHA-109)',
    prescription: {
      doctorName: 'Dr. Alok Verma, MBBS (PHC Rampur)',
      issuedAt: '2026-08-28T10:45:00Z',
      medicines: [
        { name: 'Oral Rehydration Salts (ORS)', timing: 'Frequent sips', duration: '3 Days', instruction: '1 sachet dissolved in 1 liter clean boiled water' },
        { name: 'Zinc Sulphate 20mg', timing: 'Once Daily (After food)', duration: '14 Days', instruction: 'Prevents recurrence and gut lining recovery' },
        { name: 'Ofloxacin + Ornidazole 200/500mg', timing: 'Twice Daily (Morning & Night)', duration: '3 Days', instruction: 'Take with food' }
      ],
      dietAdvice: 'Boiled water only, rice kanji, banana, tender coconut water. Avoid oily spices.',
      warningSigns: 'If urine stops for >6 hours or sunken eyes develop, rush to PHC ambulance.',
      followUp: 'Review after 48 hours or if diarrhea persists.',
    },
  },
  {
    id: 'CASE-2026-074',
    patientName: 'Sunita Devi (Pregnant - 32 wks)',
    age: 24,
    gender: 'Female',
    village: 'Rampur Cluster',
    phone: '+91 94312 88231',
    createdAt: '2026-08-27T16:00:00Z',
    triageLevel: 'Urgent',
    symptoms: ['Bilateral Pedal Edema (Foot swelling)', 'Morning Headache', 'Fatigue'],
    bodyArea: 'Maternal / Obstetrics',
    vitals: {
      temperature: 98.6,
      bpSys: 146,
      bpDia: 96,
      pulse: 88,
      glucose: 135,
      spO2: 98,
    },
    photoUrl: SAMPLE_MEDICAL_PHOTOS.foot_swelling,
    photoLabel: 'Pitting pedal edema on ankles',
    voiceNoteDuration: '0:35',
    voiceNoteSummary: 'Swelling increased over 4 days; mild visual blurriness on waking.',
    status: 'reviewed',
    ashaWorker: 'Sunita Devi (Self-logged)',
    prescription: {
      doctorName: 'Dr. Priya Sharma, MD (Gynecologist, Sub-District Hospital)',
      issuedAt: '2026-08-27T18:20:00Z',
      medicines: [
        { name: 'Tab Labetalol 100mg', timing: 'Twice Daily (Morning 8 AM & Night 8 PM)', duration: 'Until delivery', instruction: 'Safe antihypertensive for pregnancy' },
        { name: 'Calcium + Vit D3 500mg', timing: 'Once Daily (Noon after lunch)', duration: 'Continuous', instruction: 'Keep 2 hours gap from Iron tablet' },
        { name: 'Iron & Folic Acid (IFA Red)', timing: 'Once Daily (Night after dinner)', duration: 'Continuous', instruction: 'Take with lemon water, do not take with milk/tea' }
      ],
      dietAdvice: 'Low salt diet, left lateral resting position for 2 hours daily, strict BP log.',
      warningSigns: 'Immediate hospital visit if epigastric pain, seizures, or vaginal bleeding occur.',
      followUp: 'Check BP every alternate day with ASHA worker. Next hospital ANC in 1 week.',
    },
  },
  {
    id: 'CASE-2026-071',
    patientName: 'Baby Aarav (8 Months)',
    age: 1,
    gender: 'Male',
    village: 'Devigarh',
    phone: '+91 97712 34109',
    createdAt: '2026-08-27T11:20:00Z',
    triageLevel: 'Routine',
    symptoms: ['Mild Runny Nose', 'Teething Irritability', 'Mild Cough'],
    bodyArea: 'Pediatric / Throat',
    vitals: {
      temperature: 99.1,
      bpSys: 90,
      bpDia: 55,
      pulse: 120,
      glucose: 100,
      spO2: 99,
    },
    photoUrl: null,
    voiceNoteDuration: '0:19',
    voiceNoteSummary: 'Baby feeding well, active, mild nasal congestion.',
    status: 'pending',
    ashaWorker: 'Radha Mondal (ASHA-304)',
    prescription: null,
  }
];

export const INITIAL_EPIDEMIC_CLUSTERS = [
  {
    id: 'CLUSTER-01',
    villageName: 'Rampur Cluster',
    block: 'Kalyanpur Block',
    population: 4850,
    riskLevel: 'Emergency', // Safe | Watch | Alert | Emergency
    anomalyScore: 88, // 0 to 100
    primarySymptom: 'Acute Watery Diarrhea & Vomiting',
    suspectedDisease: 'Gastroenteritis / Vibrio Outbreak',
    casesThisWeek: 42,
    baselineCases: 4,
    spikePercentage: '+950%',
    waterSourceStatus: 'Contaminated (Handpump #4 coliform detected)',
    lastSurveyDate: 'Today, 08:00 AM',
    activeTeams: 2,
    recommendedAction: 'Seal Handpump #4, distribute chlorine tablets & 500 ORS packets, set up temporary hydration camp.',
    trendData: [
      { day: 'Mon', cases: 3, baseline: 4 },
      { day: 'Tue', cases: 6, baseline: 4 },
      { day: 'Wed', cases: 14, baseline: 4 },
      { day: 'Thu', cases: 28, baseline: 4 },
      { day: 'Fri', cases: 42, baseline: 4 },
    ]
  },
  {
    id: 'CLUSTER-02',
    villageName: 'Balanagar Ward 3-5',
    block: 'East Balanagar',
    population: 6200,
    riskLevel: 'Alert',
    anomalyScore: 74,
    primarySymptom: 'High Fever + Severe Joint Pain + Rash',
    suspectedDisease: 'Vector-Borne (Chikungunya / Dengue)',
    casesThisWeek: 27,
    baselineCases: 5,
    spikePercentage: '+440%',
    waterSourceStatus: 'Stagnant water near canal culvert',
    lastSurveyDate: 'Yesterday, 04:30 PM',
    activeTeams: 1,
    recommendedAction: 'Anti-larval fogging, NS1 antigen screening camps, distribute paracetamol & mosquito nets.',
    trendData: [
      { day: 'Mon', cases: 4, baseline: 5 },
      { day: 'Tue', cases: 8, baseline: 5 },
      { day: 'Wed', cases: 15, baseline: 5 },
      { day: 'Thu', cases: 21, baseline: 5 },
      { day: 'Fri', cases: 27, baseline: 5 },
    ]
  },
  {
    id: 'CLUSTER-03',
    villageName: 'Devigarh Tribal Hamlet',
    block: 'North Hills',
    population: 2900,
    riskLevel: 'Watch',
    anomalyScore: 45,
    primarySymptom: 'Persistent Cough with Low Fever',
    suspectedDisease: 'Upper Respiratory Viral Wave',
    casesThisWeek: 12,
    baselineCases: 7,
    spikePercentage: '+71%',
    waterSourceStatus: 'Clean stream water',
    lastSurveyDate: '2 Days ago',
    activeTeams: 1,
    recommendedAction: 'ASHA home visits for sputum collection of cough >2 weeks (TB screening), pediatric steam inhalation advisory.',
    trendData: [
      { day: 'Mon', cases: 6, baseline: 7 },
      { day: 'Tue', cases: 7, baseline: 7 },
      { day: 'Wed', cases: 9, baseline: 7 },
      { day: 'Thu', cases: 10, baseline: 7 },
      { day: 'Fri', cases: 12, baseline: 7 },
    ]
  },
  {
    id: 'CLUSTER-04',
    villageName: 'Shivpuri Gram',
    block: 'Kalyanpur Block',
    population: 5100,
    riskLevel: 'Safe',
    anomalyScore: 12,
    primarySymptom: 'Isolated minor ailments',
    suspectedDisease: 'None (Stable Baseline)',
    casesThisWeek: 3,
    baselineCases: 4,
    spikePercentage: '-25%',
    waterSourceStatus: 'Purified community RO plant operational',
    lastSurveyDate: 'Today, 11:00 AM',
    activeTeams: 1,
    recommendedAction: 'Maintain regular syndromic surveillance and monthly immunization camp.',
    trendData: [
      { day: 'Mon', cases: 4, baseline: 4 },
      { day: 'Tue', cases: 3, baseline: 4 },
      { day: 'Wed', cases: 4, baseline: 4 },
      { day: 'Thu', cases: 2, baseline: 4 },
      { day: 'Fri', cases: 3, baseline: 4 },
    ]
  }
];

export const INITIAL_PREGNANT_MOTHERS = [
  {
    id: 'MOM-101',
    name: 'Anita Devi',
    husbandName: 'Santosh Kumar',
    age: 23,
    village: 'Rampur Cluster',
    phone: '+91 98765 43210',
    lmpDate: '2026-02-10',
    eddDate: '2026-11-17',
    gestationalWeeks: 28,
    trimester: '3rd Trimester',
    highRisk: true,
    riskReason: 'Moderate Anemia (Hb 9.2 g/dL) & Low Weight Gain',
    ifaTabletsConsumed: 62,
    ifaTabletsTarget: 180,
    ancVisits: [
      { visit: 'ANC 1 (Within 12 wks)', date: '2026-04-15', status: 'completed', weight: 44, bp: '110/70', hb: 10.4 },
      { visit: 'ANC 2 (14-26 wks)', date: '2026-07-05', status: 'completed', weight: 46.5, bp: '114/72', hb: 9.2 },
      { visit: 'ANC 3 (28-34 wks)', date: '2026-08-30', status: 'due', weight: null, bp: null, hb: null },
      { visit: 'ANC 4 (36 wks to Delivery)', date: '2026-10-25', status: 'upcoming', weight: null, bp: null, hb: null },
    ],
    vaccines: [
      { name: 'TT-1 / Td-1', status: 'completed', date: '2026-04-15' },
      { name: 'TT-2 / Td-2', status: 'completed', date: '2026-05-18' },
    ]
  },
  {
    id: 'MOM-102',
    name: 'Pooja Soren',
    husbandName: 'Birsa Soren',
    age: 21,
    village: 'Balanagar West',
    phone: '+91 94311 99012',
    lmpDate: '2026-06-01',
    eddDate: '2027-03-08',
    gestationalWeeks: 12,
    trimester: '1st Trimester',
    highRisk: false,
    riskReason: 'None (Healthy Baseline)',
    ifaTabletsConsumed: 15,
    ifaTabletsTarget: 180,
    ancVisits: [
      { visit: 'ANC 1 (Within 12 wks)', date: '2026-08-20', status: 'completed', weight: 49, bp: '118/76', hb: 11.8 },
      { visit: 'ANC 2 (14-26 wks)', date: '2026-11-10', status: 'upcoming', weight: null, bp: null, hb: null },
      { visit: 'ANC 3 (28-34 wks)', date: '2027-01-15', status: 'upcoming', weight: null, bp: null, hb: null },
      { visit: 'ANC 4 (36 wks to Delivery)', date: '2027-02-20', status: 'upcoming', weight: null, bp: null, hb: null },
    ],
    vaccines: [
      { name: 'TT-1 / Td-1', status: 'completed', date: '2026-08-20' },
      { name: 'TT-2 / Td-2', status: 'due', date: '2026-09-20' },
    ]
  }
];

export const INITIAL_CHILD_VACCINATIONS = [
  {
    id: 'CHILD-201',
    name: 'Baby Aarav',
    motherName: 'Anita Devi',
    gender: 'Male',
    dob: '2026-05-15', // ~15 weeks old
    village: 'Rampur Cluster',
    phone: '+91 98765 43210',
    weightKg: 6.4,
    heightCm: 63,
    growthStatus: 'Normal (Green)',
    vaccines: [
      { id: 'v1', name: 'BCG', timing: 'At Birth', prevents: 'Tuberculosis (TB)', status: 'completed', date: '2026-05-16' },
      { id: 'v2', name: 'OPV-0', timing: 'At Birth', prevents: 'Polio', status: 'completed', date: '2026-05-16' },
      { id: 'v3', name: 'Hepatitis B (Birth Dose)', timing: 'At Birth (within 24h)', prevents: 'Hepatitis B liver infection', status: 'completed', date: '2026-05-16' },
      { id: 'v4', name: 'OPV-1', timing: '6 Weeks', prevents: 'Polio', status: 'completed', date: '2026-06-28' },
      { id: 'v5', name: 'Pentavalent-1 (DPT+HepB+Hib)', timing: '6 Weeks', prevents: 'Diphtheria, Pertussis, Tetanus, HepB, Meningitis', status: 'completed', date: '2026-06-28' },
      { id: 'v6', name: 'Rotavirus-1', timing: '6 Weeks', prevents: 'Severe Infant Diarrhea', status: 'completed', date: '2026-06-28' },
      { id: 'v7', name: 'fIPV-1 & PCV-1', timing: '6 Weeks', prevents: 'Polio & Pneumonia', status: 'completed', date: '2026-06-28' },
      { id: 'v8', name: 'Pentavalent-2', timing: '10 Weeks', prevents: '5 deadly infections', status: 'completed', date: '2026-07-26' },
      { id: 'v9', name: 'OPV-2 & Rotavirus-2', timing: '10 Weeks', prevents: 'Polio & Rotavirus Diarrhea', status: 'completed', date: '2026-07-26' },
      { id: 'v10', name: 'Pentavalent-3 & Rotavirus-3', timing: '14 Weeks', prevents: '5 infections + Diarrhea', status: 'due', date: '2026-08-28' }, // Due today
      { id: 'v11', name: 'fIPV-2 & PCV-2', timing: '14 Weeks', prevents: 'Polio & Pneumonia booster', status: 'due', date: '2026-08-28' },
      { id: 'v12', name: 'MR-1 (Measles-Rubella) + Vit A', timing: '9-12 Months', prevents: 'Measles, Rubella, Night Blindness', status: 'upcoming', date: '2027-02-15' },
      { id: 'v13', name: 'DPT Booster-1 & MR-2', timing: '16-24 Months', prevents: 'Booster immunity', status: 'upcoming', date: '2027-10-15' },
    ]
  },
  {
    id: 'CHILD-202',
    name: 'Baby Diya',
    motherName: 'Sunita Majhi',
    gender: 'Female',
    dob: '2025-11-10', // ~9.5 months old
    village: 'Balanagar West',
    phone: '+91 91234 56789',
    weightKg: 7.1,
    heightCm: 68,
    growthStatus: 'Moderate Underweight (Yellow - MAM)',
    vaccines: [
      { id: 'v1', name: 'BCG', timing: 'At Birth', prevents: 'TB', status: 'completed', date: '2025-11-11' },
      { id: 'v2', name: 'Pentavalent 1, 2, 3', timing: '6, 10, 14 Weeks', prevents: '5 infections', status: 'completed', date: '2026-02-20' },
      { id: 'v3', name: 'Rotavirus 1, 2, 3', timing: '6, 10, 14 Weeks', prevents: 'Diarrhea', status: 'completed', date: '2026-02-20' },
      { id: 'v4', name: 'MR-1 (Measles-Rubella) + Vitamin A', timing: '9 Months', prevents: 'Measles, Rubella & Blindness', status: 'overdue', date: '2026-08-10' }, // Overdue!
      { id: 'v5', name: 'JE-1 (Japanese Encephalitis)', timing: '9-12 Months', prevents: 'Brain fever', status: 'due', date: '2026-08-28' },
      { id: 'v6', name: 'DPT Booster-1 & MR-2', timing: '16-24 Months', prevents: 'Booster immunity', status: 'upcoming', date: '2027-04-10' },
    ]
  }
];

export const WHO_GROWTH_PERCENTILES = [
  { ageMonths: 0, boyMedian: 3.3, boyUnderweight: 2.5, girlMedian: 3.2, girlUnderweight: 2.4 },
  { ageMonths: 2, boyMedian: 5.6, boyUnderweight: 4.3, girlMedian: 5.1, girlUnderweight: 3.9 },
  { ageMonths: 4, boyMedian: 7.0, boyUnderweight: 5.6, girlMedian: 6.4, girlUnderweight: 5.0 },
  { ageMonths: 6, boyMedian: 7.9, boyUnderweight: 6.4, girlMedian: 7.3, girlUnderweight: 5.7 },
  { ageMonths: 9, boyMedian: 8.9, boyUnderweight: 7.2, girlMedian: 8.2, girlUnderweight: 6.5 },
  { ageMonths: 12, boyMedian: 9.6, boyUnderweight: 7.8, girlMedian: 8.9, girlUnderweight: 7.1 },
  { ageMonths: 18, boyMedian: 10.9, boyUnderweight: 8.9, girlMedian: 10.2, girlUnderweight: 8.2 },
  { ageMonths: 24, boyMedian: 12.2, boyUnderweight: 9.7, girlMedian: 11.5, girlUnderweight: 9.0 },
];
