import { Card } from './ui/Card';
import { formatCurrency } from '../utils/formatters';
import { useHarvesting } from '../context/HarvestingContext';
import { getRealisedGains } from '../utils/calculations';

export function AfterHarvestingCard() {
  const { afterHarvesting, savings } = useHarvesting();

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
            <td className="py-3 text-right">{formatCurrency(afterHarvesting.stcg.profits)}</td>
            <td className="py-3 text-right">{formatCurrency(afterHarvesting.ltcg.profits)}</td>
          </tr>
          <tr className="border-t border-blue-400/30">
            <td className="py-3 text-blue-100">Losses</td>
            <td className="py-3 text-right">{formatCurrency(afterHarvesting.stcg.losses)}</td>
            <td className="py-3 text-right">{formatCurrency(afterHarvesting.ltcg.losses)}</td>
          </tr>
          <tr className="border-t border-blue-400/30">
            <td className="py-3 text-blue-100 font-medium">Net Capital Gains</td>
            <td className="py-3 text-right font-medium">{formatCurrency(netStcg)}</td>
            <td className="py-3 text-right font-medium">{formatCurrency(netLtcg)}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 pt-4 border-t border-blue-400/30">
        <div className="flex justify-between items-center">
          <span className="text-blue-100">Effective Capital Gains</span>
          <span className="text-xl font-bold">{formatCurrency(realisedGains)}</span>
        </div>
        {savings > 0 && (
          <div className="mt-3 bg-white/15 rounded-lg px-4 py-2 text-sm">
            You're going to save <span className="font-bold">{formatCurrency(savings)}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
