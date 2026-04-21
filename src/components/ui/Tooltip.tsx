import { useState, type ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);

  const isTop = position === 'top';

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <span
        className={`absolute z-50 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg pointer-events-none transition-all duration-200 ease-out ${
          isTop ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : 'top-full left-1/2 -translate-x-1/2 mt-2'
        } ${
          show
            ? 'opacity-100 scale-100 translate-y-0'
            : `opacity-0 scale-95 ${isTop ? 'translate-y-1' : '-translate-y-1'} pointer-events-none`
        }`}
      >
        {content}
        <span className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
          isTop
            ? 'top-full border-t-gray-900 dark:border-t-gray-100'
            : 'bottom-full border-b-gray-900 dark:border-b-gray-100'
        }`} />
      </span>
    </span>
  );
}
