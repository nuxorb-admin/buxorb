interface AsteriskProps {
  className?: string;
  color?: string;
}

/** Asterisco / estrella de 6 puntas — sello de marca de nUXorb. */
export default function Asterisk({ className = "", color = "#ff5c00" }: AsteriskProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="11" strokeLinecap="round">
        <line x1="50" y1="14" x2="50" y2="86" />
        <line x1="19" y1="32" x2="81" y2="68" />
        <line x1="81" y1="32" x2="19" y2="68" />
      </g>
    </svg>
  );
}
