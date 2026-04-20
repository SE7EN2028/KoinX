import type { Holding } from '../types';
import type { CurrencyInfo } from '../context/CurrencyContext';
import { Checkbox } from './ui/Checkbox';
import { formatCurrency, formatCryptoAmount } from '../utils/formatters';
import { useCurrency } from '../context/CurrencyContext';
import { useWatchlist } from '../context/WatchlistContext';

interface Props {
  holding: Holding;
  selected: boolean;
  onToggle: () => void;
  termFilter: 'all' | 'short' | 'long';
}

function GainCell({ gain, balance, currency }: { gain: number; balance: number; currency: CurrencyInfo }) {
  return (
    <td className="py-4 px-3 text-right">
      <div className={`font-medium ${gain > 0 ? 'text-koinx-green' : gain < 0 ? 'text-koinx-red' : 'text-gray-900 dark:text-gray-100'}`}>
        {formatCurrency(gain, currency)}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{formatCryptoAmount(balance)}</div>
    </td>
  );
}

export function HoldingRow({ holding, selected, onToggle, termFilter }: Props) {
  const { currency } = useCurrency();
  const { isWatched, toggleWatchlist } = useWatchlist();
  const watched = isWatched(holding.coin);

  return (
    <tr className={`border-t border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${selected ? 'bg-blue-50/50 dark:bg-blue-900/15' : ''}`}>
      <td className="py-4 px-3">
        <Checkbox checked={selected} onChange={onToggle} />
      </td>
      <td className="py-4 px-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWatchlist(holding.coin)}
            className="text-lg cursor-pointer hover:scale-110 transition-transform shrink-0"
            title={watched ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {watched ? '★' : '☆'}
          </button>
          <img
            src={holding.logo}
            alt={holding.coin}
            className="w-8 h-8 rounded-full shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${holding.coin}&background=random&size=32`;
            }}
          />
          <div className="min-w-0">
            <div className="font-medium text-gray-900 dark:text-white">{holding.coin}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 max-w-[120px] truncate">{holding.coinName}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-3 text-right">
        <div className="font-medium text-gray-900 dark:text-white">{formatCryptoAmount(holding.totalHolding)}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(holding.averageBuyPrice, currency)}</div>
      </td>
      <td className="py-4 px-3 text-right font-medium text-gray-900 dark:text-white">
        {formatCurrency(holding.currentPrice, currency)}
      </td>
      {(termFilter === 'all' || termFilter === 'short') && (
        <GainCell gain={holding.stcg.gain} balance={holding.stcg.balance} currency={currency} />
      )}
      {(termFilter === 'all' || termFilter === 'long') && (
        <GainCell gain={holding.ltcg.gain} balance={holding.ltcg.balance} currency={currency} />
      )}
      <td className="py-4 px-3 text-right font-medium text-gray-900 dark:text-white">
        {selected ? formatCryptoAmount(holding.totalHolding) : '-'}
      </td>
    </tr>
  );
}
