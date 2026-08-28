// Offline Rule-Based AI Knowledge Base & Decision Trees for Rural Health & First-Aid

export const QUICK_PROMPTS = [
  { label: '🔥 High Fever & Body Pain', query: 'High fever and severe body pain for 2 days' },
  { label: '💧 Loose Stool / Diarrhea', query: 'How to make ORS at home for loose motions?' },
  { label: '🐍 Snakebite Emergency', query: 'Someone got bitten by a snake, what to do?' },
  { label: '🐕 Dog / Animal Bite', query: 'Dog bit on leg, what immediate first aid?' },
  { label: '🤰 Pregnancy Danger Signs', query: 'What are the red flag danger signs in pregnancy?' },
  { label: '👶 Baby Vaccine Schedule', query: 'Which vaccines are given at 14 weeks?' },
  { label: '📱 How to consult doctor?', query: 'How to log a new case file for doctor consultation?' },
  { label: '⚠️ Check Village Epidemic Alerts', query: 'Show me village outbreak alerts and water safety' },
];

export const INTENTS = [
  {
    id: 'snakebite',
    keywords: ['snake', 'snakebite', 'saap', 'bite', 'dansa', 'serpent'],
    title: '🚨 Snakebite Emergency First-Aid Protocol (DOs and DONTs)',
    severity: 'EMERGENCY - Call 108 immediately',
    content: `**CRITICAL FIRST-AID FOR SNAKEBITE:**

✅ **DO IMMEDIATELY:**
1. **Keep patient calm & completely still** — movement spreads venom faster through lymph nodes.
2. **Immobilize the bitten limb** with a splint or stick (like a fractured bone) at or slightly below heart level.
3. Remove tight rings, bangles, anklets, and shoes before swelling starts.
4. Rush immediately to nearest Primary Health Centre (PHC) / Sub-District Hospital with Anti-Snake Venom (ASV).

❌ **DO NOT DO (STRICTLY FORBIDDEN):**
- ❌ Do NOT cut the wound or try to suck out venom.
- ❌ Do NOT tie a tight tourniquet (rope/cloth) that cuts arterial blood flow — it causes gangrene & amputation!
- ❌ Do NOT apply ice, herbs, cow dung, or electrical shocks.
- ❌ Do NOT waste time visiting faith healers or quacks.

📞 **Call 108 Ambulance right away.**`,
    action: {
      label: '🚑 Emergency Dial 108',
      type: 'call',
      value: '108'
    }
  },
  {
    id: 'diarrhea_ors',
    keywords: ['diarrhea', 'loose motion', 'dast', 'ors', 'watery stool', 'dehydration', 'pet kharab', 'vomiting', 'jhada'],
    title: '💧 Acute Diarrhea & Homemade Life-Saving ORS Recipe',
    severity: 'Urgent Care - Prevent Dehydration',
    content: `**HOW TO PREVENT DANGEROUS DEHYDRATION:**

1. **Standard Govt ORS Sachet:**
   - Dissolve entire 1 sachet (20.5g) in **1 Liter clean boiled & cooled water**.
   - Drink small sips after every loose stool. Use within 24 hours.

2. **Homemade Sugar-Salt Solution (If ORS not available):**
   - Take **1 Liter clean boiled water**.
   - Add **6 level teaspoons sugar** (Chini) + **1/2 level teaspoon salt** (Namak).
   - Stir until dissolved. Taste should be no saltier than tears!

3. **Zinc Supplementation:**
   - 20mg Zinc tablet daily for 14 days for children >6 months (10mg for <6 months) to rebuild intestinal lining.

⚠️ **Danger Signs requiring immediate PHC visit:**
- Sunken eyes, skin pinch goes back very slowly (>2 seconds), extreme drowsiness, blood in stool, or inability to drink.`,
    action: {
      label: '📝 Log Case for Doctor Review',
      type: 'navigate',
      value: 'teleconsult_new'
    }
  },
  {
    id: 'fever_chills',
    keywords: ['fever', 'bukhar', 'jwar', 'tapa', 'high temperature', 'chills', 'thand', 'body pain', 'joint pain'],
    title: '🔥 High Fever & Vector-Borne Screening Advice',
    severity: 'Moderate to High Attention',
    content: `**FEVER MANAGEMENT & CARE INSTRUCTIONS:**

1. **Immediate Comfort:**
   - **Tepid water sponging** on forehead, neck, and armpits (use normal tap/lukewarm water, never ice water).
   - Keep patient in a well-ventilated room wearing light cotton clothes.
   - Paracetamol 500mg/650mg for adults (or age-appropriate pediatric syrup for children) every 6-8 hours after food.

2. **Hydration & Fluids:**
   - Drink plenty of clean boiled water, coconut water, lemon water, and thin dal/kanji to prevent dehydration.

3. **When to Suspect Outbreak / Dengue / Malaria:**
   - High fever with severe joint/bone pain ("breakbone") or red rashes -> Suspect Dengue/Chikungunya.
   - Shivering chills every alternate day -> Suspect Malaria.
   - Check our **Epidemic Radar** to see if your village has an active fever cluster!`,
    action: {
      label: '📡 View Village Outbreak Radar',
      type: 'navigate',
      value: 'epidemic'
    }
  },
  {
    id: 'dog_bite',
    keywords: ['dog', 'kutta', 'bite', 'rabies', 'animal bite', 'cat bite', 'monkey'],
    title: '🐕 Animal / Dog Bite Rabies Prevention Protocol',
    severity: 'URGENT - Rabies is 100% Fatal but 100% Preventable',
    content: `**IMMEDIATE 15-MINUTE FIRST AID:**

1. **Wash thoroughly with running tap water and soap for AT LEAST 15 MINUTES.**
   - Soap actively dissolves the lipid envelope of the rabies virus!
2. Apply antiseptic (Povidone Iodine or Betadine) if available.
3. ❌ **NEVER apply red chilli powder, lime, turmeric, or oil to the wound.**
4. ❌ Do NOT stitch the wound immediately.

**VACCINATION SCHEDULE (At PHC/District Hospital):**
- Receive Anti-Rabies Vaccine (ARV) on **Day 0 (today), Day 3, Day 7, and Day 28**.
- For deep bleeding bites (Category III), Rabies Immunoglobulin (RIG) is mandatory!`,
    action: {
      label: '📍 Find Nearest PHC / Call 104',
      type: 'call',
      value: '104'
    }
  },
  {
    id: 'pregnancy_danger',
    keywords: ['pregnant', 'pregnancy', 'garbhavastha', 'garbh', 'danger signs', 'bleeding', 'swelling', 'anc', 'trimester'],
    title: '🤰 High-Risk Pregnancy Alarm Signs (Janani Suraksha)',
    severity: 'High Priority Maternal Care',
    content: `**CRITICAL PREGNANCY ALARM SIGNS:**

If an expectant mother experiences ANY of these, do not wait — go to the nearest First Referral Unit (FRU) or Hospital:
- 🔴 **Vaginal Bleeding** or sudden fluid leakage at any stage.
- 🔴 **Severe headache with blurred vision** or epigastric pain (signs of severe pre-eclampsia/high BP).
- 🔴 **Sudden extreme swelling** of face, hands, and feet.
- 🔴 **High fever with foul-smelling vaginal discharge**.
- 🔴 **Decreased or absent fetal movements** (<10 kicks in 12 hours during 3rd trimester).
- 🔴 **Convulsions / Fits**.

✅ **Every mother needs at least 4 ANC visits, 180 IFA tablets, and 2 Td vaccine injections!**`,
    action: {
      label: '🤰 Open Janani ANC Tracker',
      type: 'navigate',
      value: 'maternal_mom'
    }
  },
  {
    id: 'child_vaccines',
    keywords: ['vaccine', 'tika', 'immunization', 'baby', 'shishu', 'polio', 'bcg', 'pentavalent', 'measles'],
    title: '👶 Universal Child Immunization Schedule Guide',
    severity: 'Routine Essential Healthcare',
    content: `**INDIA NATIONAL IMMUNIZATION SCHEDULE (Key Milestones):**

- 🌟 **At Birth:** BCG (TB protection), OPV-0 (Polio drops), Hepatitis B birth dose (within 24 hours).
- 🌟 **6 Weeks:** Pentavalent-1 (5 deadly diseases in 1 shot), OPV-1, Rotavirus-1 (Diarrhea), fIPV-1 & PCV-1.
- 🌟 **10 Weeks:** Pentavalent-2, OPV-2, Rotavirus-2.
- 🌟 **14 Weeks:** Pentavalent-3, OPV-3, Rotavirus-3, fIPV-2 & PCV-2.
- 🌟 **9-12 Months:** Measles-Rubella-1 (MR-1), Vitamin A Dose 1, PCV Booster.
- 🌟 **16-24 Months:** DPT Booster-1, MR-2, OPV Booster.
- 🌟 **5 Years:** DPT Booster-2.

*Vaccines protect your child from lifelong paralysis, blindness, and fatal infections!*`,
    action: {
      label: '📋 View Child Vaccine Card',
      type: 'navigate',
      value: 'maternal_child'
    }
  },
  {
    id: 'app_navigation_teleconsult',
    keywords: ['consult', 'doctor', 'case', 'prescription', 'how to use', 'book', 'teleconsult'],
    title: '📱 How Teleconsultation Works in BioBits',
    severity: 'Platform Guide',
    content: `**STORE & FORWARD ASYNCHRONOUS TELECONSULTATION:**

1. Tap **"+ Log New Case File"** on the Teleconsultation tab.
2. Select body area & check symptoms (Fever, Rash, Pain, Cough, etc.).
3. Record basic vitals (Temp, BP, Pulse, Blood Sugar) — our app automatically colors normal vs danger values.
4. Attach a photo (skin rash, eye redness, wound) or record a quick audio voice note.
5. Submit! Even without internet, your case is saved locally in the **Offline Queue**.
6. When connectivity returns, it syncs to the PHC Doctor who reviews it and issues a digital prescription with visual medicine schedules!`,
    action: {
      label: '➕ Create New Case File Now',
      type: 'navigate',
      value: 'teleconsult_new'
    }
  },
  {
    id: 'app_navigation_epidemic',
    keywords: ['epidemic', 'radar', 'outbreak', 'cluster', 'water', 'warning', 'spike'],
    title: '📡 About BioBits Syndromic Epidemic Early-Warning',
    severity: 'Platform Guide',
    content: `**HOW EPIDEMIC RADAR CATCHES OUTBREAKS EARLY:**

- Health workers & citizens log cases across villages.
- BioBits algorithms analyze 7-day symptom clusters and statistical anomalies.
- If acute diarrhea cases surge by >400% in Rampur, an instant **Emergency Alert** is triggered.
- PHC health officers can dispatch water testing kits, seal contaminated handpumps, and send bulk SMS warnings before the disease spreads to neighboring hamlets!`,
    action: {
      label: '🗺️ Open Epidemic Outbreak Radar',
      type: 'navigate',
      value: 'epidemic'
    }
  }
];

export const findBotResponse = (query) => {
  if (!query || query.trim() === '') {
    return {
      title: '👋 Welcome to BioBits Swasthya Saathi!',
      content: 'I am your offline rural health assistant. You can ask me about common symptoms, first-aid emergencies (snakebite, dog bite, ORS), child vaccination dates, pregnancy danger signs, or how to use this app.',
      action: null,
      matched: false,
    };
  }

  const cleanQuery = query.toLowerCase();

  for (const intent of INTENTS) {
    for (const kw of intent.keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        return {
          title: intent.title,
          severity: intent.severity,
          content: intent.content,
          action: intent.action,
          matched: true,
        };
      }
    }
  }

  // Generic intelligent triage response
  return {
    title: '🩺 General Health & Symptom Guidance',
    severity: 'General Advisory',
    content: `Thank you for sharing your symptom query: *"${query}"*.

**Recommended Steps:**
1. If the patient has severe chest pain, breathing difficulty, severe bleeding, or loss of consciousness, please call **108 Ambulance** immediately.
2. For ongoing illness, we recommend logging a **New Case File** under Teleconsultation with vitals (temperature, blood pressure) and photos for a PHC Doctor to review.
3. Check the **Epidemic Radar** tab to see if similar symptoms have been flagged in your village.

*You can also tap any of the quick emergency topic chips above for immediate first-aid guidance.*`,
    action: {
      label: '📝 Log Case for Doctor Review',
      type: 'navigate',
      value: 'teleconsult_new'
    },
    matched: false,
  };
};
