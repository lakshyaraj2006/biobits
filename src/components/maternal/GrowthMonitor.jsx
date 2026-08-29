import React from 'react';
import {
  AlertTriangle,
  Scale
} from 'lucide-react';
import { WHO_GROWTH_PERCENTILES } from '../../data/mockData';
import { AudioVoiceButton } from '../common/AudioVoiceButton';
import { useLanguage } from '../../context/LanguageContext';

export const GrowthMonitor = () => {
  const { t, translateText } = useLanguage();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-brand-primary border border-rose-200">
              <Scale className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              {t('whoGrowthTitle', 'WHO Child Growth & Malnutrition Early-Warning')}
            </h3>
            <AudioVoiceButton
              text={`${t('whoGrowthTitle')}. ${t('whoGrowthSubtitle')}`}
              size="sm"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t('whoGrowthSubtitle', 'Tracking Weight-for-Age (WFA) against World Health Organization (WHO) standards to prevent stunting & Severe Acute Malnutrition (SAM).')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-xl border border-emerald-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {t('greenNormal', 'Green: Normal')}
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-xl border border-amber-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {t('yellowMAM', 'Yellow: Moderate (MAM)')}
          </span>
          <span className="flex items-center gap-1.5 bg-rose-50 text-rose-800 px-2.5 py-1 rounded-xl border border-rose-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            {t('redSAM', 'Red: Severe (SAM)')}
          </span>
        </div>
      </div>

      {/* WHO Benchmark Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <th className="py-3 px-4">{t('ageMonths', 'Age (Months)')}</th>
              <th className="py-3 px-4">{t('boyMedianWeight', 'Boy Median Weight (kg)')}</th>
              <th className="py-3 px-4">{t('boyUnderweightThreshold', 'Boy Underweight Threshold (<kg)')}</th>
              <th className="py-3 px-4">{t('girlMedianWeight', 'Girl Median Weight (kg)')}</th>
              <th className="py-3 px-4">{t('girlUnderweightThreshold', 'Girl Underweight Threshold (<kg)')}</th>
              <th className="py-3 px-4">{t('nutritionAction', 'Nutrition Action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {WHO_GROWTH_PERCENTILES.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">{row.ageMonths} {t('months', 'Months')}</td>
                <td className="py-3 px-4 font-bold text-emerald-700">{row.boyMedian} kg</td>
                <td className="py-3 px-4 font-bold text-rose-600">&lt; {row.boyUnderweight} kg</td>
                <td className="py-3 px-4 font-bold text-emerald-700">{row.girlMedian} kg</td>
                <td className="py-3 px-4 font-bold text-rose-600">&lt; {row.girlUnderweight} kg</td>
                <td className="py-3 px-4 text-slate-500 text-[11px]">
                  {row.ageMonths < 6 ? t('breastfeeding', 'Exclusive Breastfeeding') : t('energyDensity', 'Complementary Feeding + Energy Density')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Field Nutrition Guidance Box */}
      <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-amber-900">{t('ashaNutritionProtocol', 'ASHA Nutrition & Poshan Abhiyaan Protocol')}:</strong>
            <span>{t('ashaNutritionDesc', 'If an infant falls below the underweight threshold, provide Ready-to-Use Supplementary Food (RUSF) and refer to the nearest Malnutrition Treatment Centre (MTC).')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
