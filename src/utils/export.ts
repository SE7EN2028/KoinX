import type { Holding, CapitalGains } from '../types';
import type { CurrencyInfo } from '../context/CurrencyContext';

function convertValue(inr: number, currency: CurrencyInfo): string {
  return (inr * currency.rate).toFixed(2);
}

export function exportToCSV(
  holdings: Holding[],
  preGains: CapitalGains,
  postGains: CapitalGains | null,
  selectedCoins: Set<string>,
  currency: CurrencyInfo
) {
  const sym = currency.symbol;
  const lines: string[] = [];

  lines.push('Tax Loss Harvesting Report');
  lines.push(`Currency: ${currency.code} (${currency.name})`);
  lines.push('');

  lines.push('=== Capital Gains Summary ===');
  lines.push(',Pre Harvesting,,After Harvesting,');
  lines.push(',Short Term,Long Term,Short Term,Long Term');
  lines.push(`Profits,${sym}${convertValue(preGains.stcg.profits, currency)},${sym}${convertValue(preGains.ltcg.profits, currency)},${sym}${convertValue(postGains?.stcg.profits ?? preGains.stcg.profits, currency)},${sym}${convertValue(postGains?.ltcg.profits ?? preGains.ltcg.profits, currency)}`);
  lines.push(`Losses,${sym}${convertValue(preGains.stcg.losses, currency)},${sym}${convertValue(preGains.ltcg.losses, currency)},${sym}${convertValue(postGains?.stcg.losses ?? preGains.stcg.losses, currency)},${sym}${convertValue(postGains?.ltcg.losses ?? preGains.ltcg.losses, currency)}`);

  const preNet = (preGains.stcg.profits - preGains.stcg.losses) + (preGains.ltcg.profits - preGains.ltcg.losses);
  const postNet = postGains
    ? (postGains.stcg.profits - postGains.stcg.losses) + (postGains.ltcg.profits - postGains.ltcg.losses)
    : preNet;
  lines.push('');
  lines.push(`Pre-Harvesting Realised Gains,${sym}${convertValue(preNet, currency)}`);
  lines.push(`Post-Harvesting Realised Gains,${sym}${convertValue(postNet, currency)}`);
  if (preNet > postNet) {
    lines.push(`Estimated Savings,${sym}${convertValue(preNet - postNet, currency)}`);
  }

  lines.push('');
  lines.push('=== Holdings ===');
  lines.push('Coin,Name,Total Holding,Avg Buy Price,Current Price,STCG Gain,LTCG Gain,Selected');
  for (const h of holdings) {
    lines.push(`${h.coin},${h.coinName},${h.totalHolding},${sym}${convertValue(h.averageBuyPrice, currency)},${sym}${convertValue(h.currentPrice, currency)},${sym}${convertValue(h.stcg.gain, currency)},${sym}${convertValue(h.ltcg.gain, currency)},${selectedCoins.has(h.id) ? 'Yes' : 'No'}`);
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `koinx-harvesting-report-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToPDF(
  holdings: Holding[],
  preGains: CapitalGains,
  postGains: CapitalGains | null,
  selectedCoins: Set<string>,
  currency: CurrencyInfo
) {
  const sym = currency.symbol;
  const cv = (v: number) => `${sym}${convertValue(v, currency)}`;

  const preNet = (preGains.stcg.profits - preGains.stcg.losses) + (preGains.ltcg.profits - preGains.ltcg.losses);
  const postNet = postGains
    ? (postGains.stcg.profits - postGains.stcg.losses) + (postGains.ltcg.profits - postGains.ltcg.losses)
    : preNet;

  const selectedHoldings = holdings.filter((h) => selectedCoins.has(h.id));

  const html = `
    <html><head><title>KoinX Tax Harvesting Report</title>
    <style>
      body { font-family: Inter, system-ui, sans-serif; padding: 40px; color: #1a1a2e; }
      h1 { color: #0052FE; margin-bottom: 4px; }
      h2 { color: #333; margin-top: 32px; border-bottom: 2px solid #0052FE; padding-bottom: 8px; }
      table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
      th { background: #0F1629; color: white; padding: 10px 12px; text-align: left; }
      td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
      tr:nth-child(even) { background: #f9fafb; }
      .green { color: #17B26A; } .red { color: #F04438; }
      .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0; }
      .summary-box { padding: 16px; border-radius: 8px; }
      .pre { background: #0F1629; color: white; }
      .post { background: #0052FE; color: white; }
      .savings { background: #ECFDF3; color: #17B26A; padding: 12px 16px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 16px 0; }
      .meta { color: #6b7280; font-size: 13px; }
    </style></head><body>
    <h1>KoinX Tax Loss Harvesting Report</h1>
    <p class="meta">Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} | Currency: ${currency.code}</p>

    <div class="summary-grid">
      <div class="summary-box pre">
        <strong>Pre Harvesting</strong><br/>
        STCG Net: ${cv(preGains.stcg.profits - preGains.stcg.losses)}<br/>
        LTCG Net: ${cv(preGains.ltcg.profits - preGains.ltcg.losses)}<br/>
        <strong>Realised: ${cv(preNet)}</strong>
      </div>
      <div class="summary-box post">
        <strong>After Harvesting</strong><br/>
        STCG Net: ${cv((postGains?.stcg.profits ?? preGains.stcg.profits) - (postGains?.stcg.losses ?? preGains.stcg.losses))}<br/>
        LTCG Net: ${cv((postGains?.ltcg.profits ?? preGains.ltcg.profits) - (postGains?.ltcg.losses ?? preGains.ltcg.losses))}<br/>
        <strong>Realised: ${cv(postNet)}</strong>
      </div>
    </div>

    ${preNet > postNet ? `<div class="savings">Estimated Savings: ${cv(preNet - postNet)}</div>` : ''}

    ${selectedHoldings.length > 0 ? `
    <h2>Selected for Harvesting (${selectedHoldings.length})</h2>
    <table>
      <tr><th>Coin</th><th>Holding</th><th>Current Price</th><th>STCG</th><th>LTCG</th></tr>
      ${selectedHoldings.map((h) => `
        <tr>
          <td><strong>${h.coin}</strong><br/><small>${h.coinName}</small></td>
          <td>${h.totalHolding}</td>
          <td>${cv(h.currentPrice)}</td>
          <td class="${h.stcg.gain >= 0 ? 'green' : 'red'}">${cv(h.stcg.gain)}</td>
          <td class="${h.ltcg.gain >= 0 ? 'green' : 'red'}">${cv(h.ltcg.gain)}</td>
        </tr>
      `).join('')}
    </table>` : ''}

    <h2>All Holdings</h2>
    <table>
      <tr><th>Coin</th><th>Holding</th><th>Avg Buy</th><th>Current</th><th>STCG</th><th>LTCG</th></tr>
      ${holdings.map((h) => `
        <tr>
          <td><strong>${h.coin}</strong></td>
          <td>${h.totalHolding < 0.001 ? '~0' : h.totalHolding.toFixed(4)}</td>
          <td>${cv(h.averageBuyPrice)}</td>
          <td>${cv(h.currentPrice)}</td>
          <td class="${h.stcg.gain >= 0 ? 'green' : 'red'}">${cv(h.stcg.gain)}</td>
          <td class="${h.ltcg.gain >= 0 ? 'green' : 'red'}">${cv(h.ltcg.gain)}</td>
        </tr>
      `).join('')}
    </table>
    </body></html>
  `;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 500);
  }
}
