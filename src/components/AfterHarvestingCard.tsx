import { useEffect, useRef } from 'react';
import { Card } from './ui/Card';
import { AnimatedCurrency } from './ui/AnimatedCurrency';
import { formatCurrency } from '../utils/formatters';
import { useHarvesting } from '../context/HarvestingContext';
import { getRealisedGains } from '../utils/calculations';
import { useCurrency } from '../context/CurrencyContext';
import { showToast } from './ui/Toast';

export function AfterHarvestingCard() {
  const { afterHarvesting, savings } = useHarvesting();
  const { currency } = useCurrency();

  const prevSavingsRef = useRef(0);

  useEffect(() => {
    const prev = prevSavingsRef.current;
    const thresholds = [50000, 25000, 10000, 1000];
    for (const t of thresholds) {
      if (savings >= t && prev < t) {
        showToast(`You're saving over ${formatCurrency(t, currency)}!`);
        break;
      }
    }
    if (savings > 0 && prev === 0) {
      showToast('Tax savings activated!', 'info');
    }
    prevSavingsRef.current = savings;
  }, [savings, currency]);

  if (!afterHarvesting) return null;

  const netStcg = afterHarvesting.stcg.profits - afterHarvesting.stcg.losses;
  const netLtcg = afterHarvesting.ltcg.profits - afterHarvesting.ltcg.losses;
  const realisedGains = getRealisedGains(afterHarvesting);

  return (
    <Card className="bg-gradient-to-br from-koinx-blue to-blue-700 text-white flex-1">
      <h3 className="text-lg font-semibold mb-6">After Harvesting</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-blue-200">
            <th className="text-left pb-3 font-medium"></th>
            <th className="text-right pb-3 font-medium">Short Term</th>
            <th className="text-right pb-3 font-medium">Long Term</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-blue-400/30">
            <td className="py-3 text-blue-100">Profits</td>
            <td className="py-3 text-right">
              <AnimatedCurrency value={afterHarvesting.stcg.profits} />
            </td>
            <td className="py-3 text-right">
              <AnimatedCurrency value={afterHarvesting.ltcg.profits} />
            </td>
          </tr>
          <tr className="border-t border-blue-400/30">
            <td className="py-3 text-blue-100">Losses</td>
            <td className="py-3 text-right">
              <AnimatedCurrency value={afterHarvesting.stcg.losses} />
            </td>
            <td className="py-3 text-right">
              <AnimatedCurrency value={afterHarvesting.ltcg.losses} />
            </td>
          </tr>
          <tr className="border-t border-blue-400/30">
            <td className="py-3 text-blue-100 font-medium">Net Capital Gains</td>
            <td className="py-3 text-right font-medium">
              <AnimatedCurrency value={netStcg} />
            </td>
            <td className="py-3 text-right font-medium">
              <AnimatedCurrency value={netLtcg} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 pt-4 border-t border-blue-400/30">
        <div className="flex justify-between items-center">
          <span className="text-blue-100">Effective Capital Gains</span>
          <AnimatedCurrency value={realisedGains} className="text-xl font-bold" />
        </div>
        {savings > 0 && (
          <div className="mt-3 bg-white/15 rounded-lg px-4 py-2.5 text-sm flex items-center gap-2 animate-savings-pulse">
            <span>&#127881;</span>
            <span>You're going to save <AnimatedCurrency value={savings} className="font-bold" /></span>
          </div>
        )}
      </div>
    </Card>
  );
}
