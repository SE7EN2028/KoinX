import { useState } from 'react';

const notes = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations for crypto assets. This tool is for educational and illustrative purposes only.',
  'Tax harvesting involves selling assets at a loss to offset capital gains, reducing your overall tax liability.',
  'The calculations shown are simplified and do not account for wash sale rules, transaction fees, or other factors that may affect your actual tax situation.',
  'Short-term capital gains (STCG) are taxed at 30% under Section 115BBH, while long-term capital gains may have different rates depending on the holding period.',
  'Always consult with a qualified tax professional before making investment decisions based on tax considerations.',
];

export function ImportantNotes() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-amber-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-amber-600 text-lg">&#9888;</span>
          <span className="font-semibold text-gray-900">Important Notes & Disclaimers</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-6 pb-4">
          <ul className="space-y-2">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-amber-500 mt-0.5 shrink-0">&#8226;</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
