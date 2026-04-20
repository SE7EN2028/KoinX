import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1F36] text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="text-base">{currency.flag}</span>
        <span>{currency.code}</span>
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-[#1A1F36] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 py-1 max-h-72 overflow-y-auto">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${
                currency.code === c.code ? 'bg-blue-50 dark:bg-blue-900/20 text-koinx-blue' : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{c.code}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{c.name}</div>
              </div>
              <span className="text-xs text-gray-400">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
