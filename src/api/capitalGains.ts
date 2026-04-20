import type { CapitalGains } from '../types';

const mockCapitalGains: CapitalGains = {
  stcg: {
    profits: 948000,
    losses: 139000,
  },
  ltcg: {
    profits: 1409000,
    losses: 120000,
  },
};

export function fetchCapitalGains(): Promise<CapitalGains> {
  return new Promise((resolve) => {
    const delay = 500 + Math.random() * 300;
    setTimeout(() => resolve(mockCapitalGains), delay);
  });
}
