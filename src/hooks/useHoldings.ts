import { useState, useEffect } from 'react';
import type { Holding } from '../types';
import { fetchHoldings } from '../api/holdings';

export function useHoldings() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchHoldings()
      .then(setHoldings)
      .catch((err) => setError(err.message || 'Failed to load holdings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return { holdings, loading, error, retry: load };
}
