import { useState, useMemo } from 'react';
import type { Holding } from '../types';
import { useHarvesting } from '../context/HarvestingContext';
import { useWatchlist } from '../context/WatchlistContext';
import { HoldingRow } from './HoldingRow';
import { Checkbox } from './ui/Checkbox';

type TermFilter = 'all' | 'short' | 'long';
type SortKey = 'coin' | 'holding' | 'price' | 'stcg' | 'ltcg';
type SortDir = 'asc' | 'desc';

interface Props {
  holdings: Holding[];
}

const INITIAL_VISIBLE = 5;

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className={`inline-block ml-1 transition-colors ${active ? 'text-koinx-blue' : 'text-gray-400 dark:text-gray-600'}`}>
      {active ? (dir === 'asc' ? '▲' : '▼') : '⇅'}
    </span>
  );
}

export function HoldingsTable({ holdings }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [termFilter, setTermFilter] = useState<TermFilter>('all');
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [search, setSearch] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { selectedHoldings, toggleHolding, toggleAll } = useHarvesting();
  const { watchlist } = useWatchlist();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filteredHoldings = holdings.filter((h) => {
    if (search) {
      const q = search.toLowerCase();
      if (!h.coin.toLowerCase().includes(q) && !h.coinName.toLowerCase().includes(q)) return false;
    }
    if (watchlistOnly && !watchlist.has(h.id)) return false;
    if (termFilter === 'short') return h.stcg.gain !== 0 || h.stcg.balance > 0;
    if (termFilter === 'long') return h.ltcg.gain !== 0 || h.ltcg.balance > 0;
    return true;
  });

  const sortedHoldings = useMemo(() => {
    if (!sortKey) return filteredHoldings;
    const sorted = [...filteredHoldings].sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;
      switch (sortKey) {
        case 'coin': va = a.coin.toLowerCase(); vb = b.coin.toLowerCase(); break;
        case 'holding': va = a.totalHolding * a.currentPrice; vb = b.totalHolding * b.currentPrice; break;
        case 'price': va = a.currentPrice; vb = b.currentPrice; break;
        case 'stcg': va = a.stcg.gain; vb = b.stcg.gain; break;
        case 'ltcg': va = a.ltcg.gain; vb = b.ltcg.gain; break;
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredHoldings, sortKey, sortDir]);

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, INITIAL_VISIBLE);
  const allSelected = holdings.length > 0 && selectedHoldings.size === holdings.length;
  const someSelected = selectedHoldings.size > 0 && !allSelected;

  const tabs: { key: TermFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'short', label: 'Short Term' },
    { key: 'long', label: 'Long Term' },
  ];

  const thClass = "py-3 px-3 text-right cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors";

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
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
        <button
          onClick={() => { setWatchlistOnly(!watchlistOnly); setShowAll(false); }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
            watchlistOnly
              ? 'bg-amber-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <span>★</span>
          <span>Watchlist{watchlist.size > 0 ? ` (${watchlist.size})` : ''}</span>
        </button>
        <div className="ml-auto flex items-center">
          <div
            className="flex items-center"
            onMouseEnter={() => setSearchExpanded(true)}
            onMouseLeave={() => { if (!search && !searchFocused) setSearchExpanded(false); }}
          >
            <div className={`flex items-center rounded-lg border transition-all duration-300 overflow-hidden ${
              searchExpanded
                ? 'w-52 border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1F36]'
                : 'w-8 border-transparent'
            }`}>
              <div className="shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500 dark:text-gray-400 hover:text-koinx-blue transition-colors"
                onClick={() => setSearchExpanded(true)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowAll(false); }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => { setSearchFocused(false); if (!search) setSearchExpanded(false); }}
                placeholder="Search for your assets"
                className={`bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all duration-300 ${
                  searchExpanded ? 'w-full pr-3 py-1.5' : 'w-0 p-0'
                }`}
              />
            </div>
          </div>
        </div>
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
              <th className="py-3 px-3 text-left cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors" onClick={() => handleSort('coin')}>
                Asset<SortIcon active={sortKey === 'coin'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('holding')}>
                Holdings<SortIcon active={sortKey === 'holding'} dir={sortDir} />
              </th>
              <th className={thClass} onClick={() => handleSort('price')}>
                Current Price<SortIcon active={sortKey === 'price'} dir={sortDir} />
              </th>
              {(termFilter === 'all' || termFilter === 'short') && (
                <th className={thClass} onClick={() => handleSort('stcg')}>
                  Short Term<SortIcon active={sortKey === 'stcg'} dir={sortDir} />
                </th>
              )}
              {(termFilter === 'all' || termFilter === 'long') && (
                <th className={thClass} onClick={() => handleSort('ltcg')}>
                  Long Term<SortIcon active={sortKey === 'ltcg'} dir={sortDir} />
                </th>
              )}
              <th className="py-3 px-3 text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                  {watchlistOnly ? 'No watchlisted holdings. Star some assets to see them here.' : 'No holdings match this filter.'}
                </td>
              </tr>
            ) : (
              visibleHoldings.map((holding, i) => (
                <HoldingRow
                  key={holding.id}
                  holding={holding}
                  selected={selectedHoldings.has(holding.id)}
                  onToggle={() => toggleHolding(holding.id)}
                  termFilter={termFilter}
                  animationDelay={i * 0.04}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {sortedHoldings.length > INITIAL_VISIBLE && (
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-koinx-blue text-sm font-medium hover:underline cursor-pointer"
          >
            {showAll ? 'View Less' : `View All (${sortedHoldings.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
