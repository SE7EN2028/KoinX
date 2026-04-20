import type { Holding, CapitalGains } from '../types';

export function calculateAfterHarvesting(
  preHarvesting: CapitalGains,
  selectedHoldings: Holding[]
): CapitalGains {
  let stcgProfitsDelta = 0;
  let stcgLossesDelta = 0;
  let ltcgProfitsDelta = 0;
  let ltcgLossesDelta = 0;

  for (const holding of selectedHoldings) {
    if (holding.stcg.gain > 0) {
      stcgProfitsDelta += holding.stcg.gain;
    } else {
      stcgLossesDelta += Math.abs(holding.stcg.gain);
    }

    if (holding.ltcg.gain > 0) {
      ltcgProfitsDelta += holding.ltcg.gain;
    } else {
      ltcgLossesDelta += Math.abs(holding.ltcg.gain);
    }
  }

  return {
    stcg: {
      profits: preHarvesting.stcg.profits + stcgProfitsDelta,
      losses: preHarvesting.stcg.losses + stcgLossesDelta,
    },
    ltcg: {
      profits: preHarvesting.ltcg.profits + ltcgProfitsDelta,
      losses: preHarvesting.ltcg.losses + ltcgLossesDelta,
    },
  };
}

export function getRealisedGains(gains: CapitalGains): number {
  const netStcg = gains.stcg.profits - gains.stcg.losses;
  const netLtcg = gains.ltcg.profits - gains.ltcg.losses;
  return netStcg + netLtcg;
}
