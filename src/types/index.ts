export interface StcgLtcg {
  gain: number;
  balance: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: StcgLtcg;
  ltcg: StcgLtcg;
}

export interface CapitalGainsBreakdown {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: CapitalGainsBreakdown;
  ltcg: CapitalGainsBreakdown;
}
