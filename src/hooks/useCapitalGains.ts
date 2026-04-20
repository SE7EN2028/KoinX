import { useState, useEffect } from 'react';
import type { CapitalGains } from '../types';
import { fetchCapitalGains } from '../api/capitalGains';

export function useCapitalGains() {
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchCapitalGains()
      .then(setCapitalGains)
      .catch((err) => setError(err.message || 'Failed to load capital gains'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return { capitalGains, loading, error, retry: load };
}
