import { useState } from 'react';
import type { Holding } from '../types';
import { useHarvesting } from '../context/HarvestingContext';
import { HoldingRow } from './HoldingRow';
import { Checkbox } from './ui/Checkbox';

interface Props {
  holdings: Holding[];
}

const INITIAL_VISIBLE = 5;

export function HoldingsTable({ holdings }: Props) {
  const [showAll, setShowAll] = useState(false);
  const { selectedHoldings, toggleHolding, toggleAll } = useHarvesting();

  const visibleHoldings = showAll ? holdings : holdings.slice(0, INITIAL_VISIBLE);
  const allSelected = holdings.length > 0 && selectedHoldings.size === holdings.length;
  const someSelected = selectedHoldings.size > 0 && !allSelected;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
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
              <th className="py-3 px-3 text-right">Short Term</th>
              <th className="py-3 px-3 text-right">Long Term</th>
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
              />
            ))}
          </tbody>
        </table>
      </div>
      {holdings.length > INITIAL_VISIBLE && (
        <div className="border-t border-gray-200 px-4 py-3 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-koinx-blue text-sm font-medium hover:underline cursor-pointer"
          >
            {showAll ? 'View Less' : `View All (${holdings.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
