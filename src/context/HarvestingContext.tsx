import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { Holding, CapitalGains } from '../types';
import { calculateAfterHarvesting, getRealisedGains } from '../utils/calculations';

interface HarvestingContextType {
  selectedHoldings: Set<string>;
  toggleHolding: (id: string) => void;
  toggleAll: (holdings: Holding[]) => void;
  afterHarvesting: CapitalGains | null;
  preRealisedGains: number;
  postRealisedGains: number;
  savings: number;
}

const HarvestingContext = createContext<HarvestingContextType | null>(null);

export function HarvestingProvider({
  children,
  preHarvesting,
  holdings,
}: {
  children: ReactNode;
  preHarvesting: CapitalGains | null;
  holdings: Holding[];
}) {
  const [selectedHoldings, setSelectedHoldings] = useState<Set<string>>(new Set());

  const toggleHolding = (id: string) => {
    setSelectedHoldings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = (allHoldings: Holding[]) => {
    setSelectedHoldings((prev) => {
      if (prev.size === allHoldings.length) {
        return new Set();
      }
      return new Set(allHoldings.map((h) => h.id));
    });
  };

  const selectedHoldingsList = useMemo(
    () => holdings.filter((h) => selectedHoldings.has(h.id)),
    [holdings, selectedHoldings]
  );

  const afterHarvesting = useMemo(() => {
    if (!preHarvesting) return null;
    if (selectedHoldings.size === 0) return preHarvesting;
    return calculateAfterHarvesting(preHarvesting, selectedHoldingsList);
  }, [preHarvesting, selectedHoldings, selectedHoldingsList]);

  const preRealisedGains = preHarvesting ? getRealisedGains(preHarvesting) : 0;
  const postRealisedGains = afterHarvesting ? getRealisedGains(afterHarvesting) : 0;
  const savings = preRealisedGains - postRealisedGains;

  return (
    <HarvestingContext.Provider
      value={{
        selectedHoldings,
        toggleHolding,
        toggleAll,
        afterHarvesting,
        preRealisedGains,
        postRealisedGains,
        savings,
      }}
    >
      {children}
    </HarvestingContext.Provider>
  );
}

export function useHarvesting() {
  const context = useContext(HarvestingContext);
  if (!context) throw new Error('useHarvesting must be used within HarvestingProvider');
  return context;
}
