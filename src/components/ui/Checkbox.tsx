interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}

export function Checkbox({ checked, indeterminate, onChange }: CheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
        checked || indeterminate
          ? 'bg-koinx-blue border-koinx-blue animate-checkbox-pop'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-koinx-blue hover:scale-110'
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && !checked && (
        <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
          <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
