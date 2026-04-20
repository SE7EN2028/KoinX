export function formatCurrency(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 10000000) {
    return `${sign}₹${(absValue / 10000000).toFixed(2)}Cr`;
  }
  if (absValue >= 100000) {
    return `${sign}₹${(absValue / 100000).toFixed(2)}L`;
  }

  return `${sign}₹${absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function formatCryptoAmount(value: number): string {
  if (value === 0) return '0';

  const absValue = Math.abs(value);

  if (absValue < 1e-6) return '~0';
  if (absValue < 0.001) return absValue.toFixed(6);
  if (absValue < 1) return absValue.toFixed(4);
  if (absValue >= 1000000) {
    return absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  }
  return absValue.toLocaleString('en-IN', { maximumFractionDigits: 4 });
}

export function formatGain(value: number): string {
  const formatted = formatCurrency(Math.abs(value));
  if (value > 0) return formatted;
  if (value < 0) return `-${formatted}`;
  return formatted;
}
