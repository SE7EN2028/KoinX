import type { CapitalGains } from '../types';

const mockCapitalGains: CapitalGains = {
  stcg: {
    profits: 70200.88,
    losses: 1548.53,
  },
  ltcg: {
    profits: 5020,
    losses: 3050,
  },
};

export function fetchCapitalGains(): Promise<CapitalGains> {
  return new Promise((resolve) => {
    const delay = 500 + Math.random() * 300;
    setTimeout(() => resolve(mockCapitalGains), delay);
  });
}
