import type { Holding } from '../types';
import { Checkbox } from './ui/Checkbox';
import { formatCurrency, formatCryptoAmount } from '../utils/formatters';

interface Props {
  holding: Holding;
  selected: boolean;
  onToggle: () => void;
}

function GainCell({ gain, balance }: { gain: number; balance: number }) {
  return (
    <td className="py-4 px-3 text-right">
      <div className={`font-medium ${gain > 0 ? 'text-koinx-green' : gain < 0 ? 'text-koinx-red' : 'text-gray-900'}`}>
        {formatCurrency(gain)}
      </div>
      <div className="text-xs text-gray-500">{formatCryptoAmount(balance)}</div>
    </td>
  );
}

export function HoldingRow({ holding, selected, onToggle }: Props) {
  return (
    <tr className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${selected ? 'bg-blue-50/50' : ''}`}>
      <td className="py-4 px-3">
        <Checkbox checked={selected} onChange={onToggle} />
      </td>
      <td className="py-4 px-3">
        <div className="flex items-center gap-3">
          <img
            src={holding.logo}
            alt={holding.coin}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${holding.coin}&background=random&size=32`;
            }}
          />
          <div>
            <div className="font-medium text-gray-900">{holding.coin}</div>
            <div className="text-xs text-gray-500">{holding.coinName}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-right">
        <div className="font-medium text-gray-900">{formatCryptoAmount(holding.totalHolding)}</div>
        <div className="text-xs text-gray-500">{formatCurrency(holding.avgBuyPrice)}</div>
      </td>
      <td className="py-4 px-3 text-right font-medium text-gray-900">
        {formatCurrency(holding.currentPrice)}
      </td>
      <GainCell gain={holding.stcg.gain} balance={holding.stcg.balance} />
      <GainCell gain={holding.ltcg.gain} balance={holding.ltcg.balance} />
      <td className="py-4 px-3 text-right font-medium text-gray-900">
        {selected ? formatCryptoAmount(holding.totalHolding) : '-'}
      </td>
    </tr>
  );
}
