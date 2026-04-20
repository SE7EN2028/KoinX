import type { CurrencyInfo } from '../context/CurrencyContext';

export function formatCurrency(value: number, currency?: CurrencyInfo): string {
  const rate = currency?.rate ?? 1;
  const symbol = currency?.symbol ?? '₹';
  const converted = value * rate;
  const absValue = Math.abs(converted);
  const sign = converted < 0 ? '-' : '';

  if (absValue === 0) return `${symbol}0.00`;
  if (absValue < 0.01) {
    return `${sign}${symbol}${absValue.toFixed(6)}`;
  }
  if (absValue >= 10000000) {
    return `${sign}${symbol}${(absValue / 10000000).toFixed(2)}Cr`;
  }
  if (absValue >= 100000) {
    return `${sign}${symbol}${(absValue / 100000).toFixed(2)}L`;
  }

  return `${sign}${symbol}${absValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatCurrencyFull(value: number, currency?: CurrencyInfo): string {
  const rate = currency?.rate ?? 1;
  const symbol = currency?.symbol ?? '₹';
  const converted = value * rate;
  const absValue = Math.abs(converted);
  const sign = converted < 0 ? '-' : '';

  if (absValue === 0) return `${symbol}0`;
  return `${sign}${symbol}${absValue.toLocaleString('en-US', { maximumFractionDigits: 10 })}`;
}

export function formatCryptoAmount(value: number): string {
  if (value === 0) return '0';
  const absValue = Math.abs(value);
  if (absValue < 1e-6) return '~0';
  if (absValue >= 1000000000) {
    return `${(absValue / 1000000000).toFixed(2)}B`;
  }
  if (absValue >= 1000000) {
    return `${(absValue / 1000000).toFixed(2)}M`;
  }
  if (absValue >= 1000) {
    return `${(absValue / 1000).toFixed(2)}K`;
  }
  if (absValue < 0.0001) return absValue.toFixed(6);
  if (absValue < 1) return absValue.toFixed(4);
  return absValue.toFixed(2);
}

export function formatCryptoAmountFull(value: number): string {
  if (value === 0) return '0';
  const absValue = Math.abs(value);
  if (absValue < 1e-15) return '~0';
  return absValue.toLocaleString('en-US', { maximumFractionDigits: 18 });
}

export function formatGain(value: number, currency?: CurrencyInfo): string {
  const formatted = formatCurrency(Math.abs(value), currency);
  if (value > 0) return formatted;
  if (value < 0) return `-${formatted}`;
  return formatted;
}
