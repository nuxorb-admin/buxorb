interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showMark?: boolean;
}

/** Marca NUXORB: círculos superpuestos + wordmark (NUX teal · ORB carbón). */
export default function Logo({ variant = "light", className = "", showMark = true }: LogoProps) {
  const orb = variant === "light" ? "#16302b" : "#ffffff";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark && (
        <svg
          viewBox="0 0 96 56"
          className="h-7 w-12 flex-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="26" fill="#159b8a" />
          <circle cx="48" cy="28" r="22" fill="#16302b" />
          <circle cx="62" cy="28" r="18" fill="#ffffff" />
          <circle cx="72" cy="28" r="15" fill="#d9d9d9" />
          <circle cx="80" cy="28" r="12" fill="#ff5c00" />
        </svg>
      )}
      <span
        className="font-brand text-xl font-semibold tracking-[0.12em]"
        style={{ letterSpacing: "0.12em" }}
      >
        <span className="text-teal">NUX</span>
        <span style={{ color: orb }}>ORB</span>
      </span>
    </span>
  );
}
