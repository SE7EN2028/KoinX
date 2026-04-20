import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rate: number;
}

const currencies: CurrencyInfo[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 0.012 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.011 },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.0095 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rate: 1.79 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', rate: 0.087 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷', rate: 16.2 },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺', rate: 1.03 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rate: 0.018 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 0.016 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 0.016 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', rate: 0.044 },
];

interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrency: (c: CurrencyInfo) => void;
  currencies: CurrencyInfo[];
  convert: (inrValue: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyInfo>(currencies[0]);

  const convert = (inrValue: number) => inrValue * currency.rate;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
