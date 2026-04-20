import type { CapitalGains } from '../types';
import { Card } from './ui/Card';
import { AnimatedCurrency } from './ui/AnimatedCurrency';
import { formatCurrency } from '../utils/formatters';
import { getRealisedGains } from '../utils/calculations';
import { useCurrency } from '../context/CurrencyContext';

interface Props {
  capitalGains: CapitalGains;
}

export function PreHarvestingCard({ capitalGains }: Props) {
  const { currency } = useCurrency();
  const netStcg = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netLtcg = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realisedGains = getRealisedGains(capitalGains);

  return (
    <Card className="bg-koinx-dark text-white flex-1">
      <h3 className="text-lg font-semibold mb-6">Pre Harvesting</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="text-left pb-3 font-medium"></th>
            <th className="text-right pb-3 font-medium">Short Term</th>
            <th className="text-right pb-3 font-medium">Long Term</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-700">
            <td className="py-3 text-gray-300">Profits</td>
            <td className="py-3 text-right">{formatCurrency(capitalGains.stcg.profits, currency)}</td>
            <td className="py-3 text-right">{formatCurrency(capitalGains.ltcg.profits, currency)}</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="py-3 text-gray-300">Losses</td>
            <td className="py-3 text-right">{formatCurrency(capitalGains.stcg.losses, currency)}</td>
            <td className="py-3 text-right">{formatCurrency(capitalGains.ltcg.losses, currency)}</td>
          </tr>
          <tr className="border-t border-gray-700">
            <td className="py-3 text-gray-300 font-medium">Net Capital Gains</td>
            <td className={`py-3 text-right font-medium ${netStcg >= 0 ? 'text-koinx-green' : 'text-koinx-red'}`}>
              {formatCurrency(netStcg, currency)}
            </td>
            <td className={`py-3 text-right font-medium ${netLtcg >= 0 ? 'text-koinx-green' : 'text-koinx-red'}`}>
              {formatCurrency(netLtcg, currency)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Realised Capital Gains</span>
          <AnimatedCurrency
            value={realisedGains}
            className={`text-xl font-bold ${realisedGains >= 0 ? 'text-koinx-green' : 'text-koinx-red'}`}
          />
        </div>
      </div>
    </Card>
  );
}
