import type { Holding, CapitalGains } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useHarvesting } from '../context/HarvestingContext';
import { exportToCSV, exportToPDF } from '../utils/export';
import { showToast } from './ui/Toast';

interface Props {
  holdings: Holding[];
  preGains: CapitalGains;
}

export function ExportButtons({ holdings, preGains }: Props) {
  const { currency } = useCurrency();
  const { afterHarvesting, selectedHoldings } = useHarvesting();

  const handleCSV = () => {
    exportToCSV(holdings, preGains, afterHarvesting, selectedHoldings, currency);
    showToast('CSV report downloaded', 'info');
  };

  const handlePDF = () => {
    exportToPDF(holdings, preGains, afterHarvesting, selectedHoldings, currency);
    showToast('PDF report opened for printing', 'info');
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCSV}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1F36] text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        CSV
      </button>
      <button
        onClick={handlePDF}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1F36] text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        PDF
      </button>
    </div>
  );
}
