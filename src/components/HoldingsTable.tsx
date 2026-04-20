import { useState } from 'react';
import type { Holding } from '../types';
import { useHarvesting } from '../context/HarvestingContext';
import { HoldingRow } from './HoldingRow';
import { Checkbox } from './ui/Checkbox';

type TermFilter = 'all' | 'short' | 'long';

interface Props {
  holdings: Holding[];
}

const INITIAL_VISIBLE = 5;

export function HoldingsTable({ holdings }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [termFilter, setTermFilter] = useState<TermFilter>('all');
  const { selectedHoldings, toggleHolding, toggleAll } = useHarvesting();

  const filteredHoldings = holdings.filter((h) => {
    if (termFilter === 'short') return h.stcg.gain !== 0 || h.stcg.balance > 0;
    if (termFilter === 'long') return h.ltcg.gain !== 0 || h.ltcg.balance > 0;
    return true;
  });

  const visibleHoldings = showAll ? filteredHoldings : filteredHoldings.slice(0, INITIAL_VISIBLE);
  const allSelected = holdings.length > 0 && selectedHoldings.size === holdings.length;
  const someSelected = selectedHoldings.size > 0 && !allSelected;

  const tabs: { key: TermFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'short', label: 'Short Term' },
    { key: 'long', label: 'Long Term' },
  ];

  return (
    <div className="bg-white dark:bg-[#131829] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">
      <div className="flex items-center gap-1 px-3 sm:px-4 pt-3 sm:pt-4 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setTermFilter(tab.key); setShowAll(false); }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              termFilter === tab.key
                ? 'bg-koinx-blue text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-[#1A1F36] text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="py-3 px-3 text-left w-10">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={() => toggleAll(holdings)}
                />
              </th>
              <th className="py-3 px-3 text-left">Asset</th>
              <th className="py-3 px-3 text-right">Holdings</th>
              <th className="py-3 px-3 text-right">Current Price</th>
              {(termFilter === 'all' || termFilter === 'short') && (
                <th className="py-3 px-3 text-right">Short Term</th>
              )}
              {(termFilter === 'all' || termFilter === 'long') && (
                <th className="py-3 px-3 text-right">Long Term</th>
              )}
              <th className="py-3 px-3 text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => (
              <HoldingRow
                key={holding.coin}
                holding={holding}
                selected={selectedHoldings.has(holding.coin)}
                onToggle={() => toggleHolding(holding.coin)}
                termFilter={termFilter}
              />
            ))}
          </tbody>
        </table>
      </div>
      {filteredHoldings.length > INITIAL_VISIBLE && (
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-koinx-blue text-sm font-medium hover:underline cursor-pointer"
          >
            {showAll ? 'View Less' : `View All (${filteredHoldings.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
