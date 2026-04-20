import { useState, useRef, useEffect } from 'react';

export function HowItWorks() {
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
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-koinx-blue text-sm font-medium hover:underline cursor-pointer"
      >
        How it works?
      </button>
      <div
        className={`absolute left-0 top-full mt-2 w-80 bg-white dark:bg-[#1A1F36] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 p-4 text-sm text-gray-700 dark:text-gray-300 origin-top-left transition-all duration-200 ease-out ${
          open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        <ul className="space-y-2 list-disc pl-4">
          <li>See your capital gains for FY 2024-25 in the left card</li>
          <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
          <li>Instantly see your updated tax liability in the right card</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-200">Pro tip:</span> Experiment with different combinations of your holdings to optimize your tax liability
        </p>
        <span className="absolute bottom-full left-6 border-8 border-transparent border-b-white dark:border-b-[#1A1F36]" />
      </div>
    </div>
  );
}
