export function KoinXLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="25" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="28" fill="#0052FE">
        Koin
      </text>
      <text x="72" y="25" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="28" fill="url(#xGradient)">
        X
      </text>
      <defs>
        <linearGradient id="xGradient" x1="72" y1="0" x2="95" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7931A" />
          <stop offset="1" stopColor="#F2A93B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
