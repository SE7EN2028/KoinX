import { useState, useRef, useEffect } from 'react';

const notes = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations for crypto assets. This tool is for educational and illustrative purposes only.',
  'Tax harvesting involves selling assets at a loss to offset capital gains, reducing your overall tax liability.',
  'The calculations shown are simplified and do not account for wash sale rules, transaction fees, or other factors that may affect your actual tax situation.',
  'Short-term capital gains (STCG) are taxed at 30% under Section 115BBH, while long-term capital gains may have different rates depending on the holding period.',
  'Always consult with a qualified tax professional before making investment decisions based on tax considerations.',
];

export function ImportantNotes() {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl overflow-hidden transition-colors duration-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-amber-600 dark:text-amber-400 text-lg">&#9888;</span>
          <span className="font-semibold text-gray-900 dark:text-white">Important Notes & Disclaimers</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight: expanded ? `${height}px` : '0px', opacity: expanded ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-6 pb-4">
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                style={{
                  animation: expanded ? `fade-slide-in 0.3s ease-out ${i * 0.06}s both` : 'none',
                }}
              >
                <span className="text-amber-500 dark:text-amber-400 mt-0.5 shrink-0">&#8226;</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
