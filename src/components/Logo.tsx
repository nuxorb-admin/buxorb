interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  /** Muestra la tagline + subrayado naranja (lockup completo). */
  tagline?: boolean;
}

/** Logo NUXORB — wordmark (NUX teal · ORB carbón). */
export default function Logo({ variant = "light", className = "", tagline = false }: LogoProps) {
  const orb = variant === "light" ? "text-ink" : "text-white";
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="font-brand text-[1.35rem] font-medium leading-none tracking-[0.18em]">
        <span className="text-teal">NUX</span>
        <span className={orb}>ORB</span>
      </span>
      {tagline && (
        <>
          <span
            className={`mt-2 font-brand text-[0.58rem] font-medium uppercase tracking-[0.22em] ${
              variant === "light" ? "text-ink/75" : "text-white/65"
            }`}
          >
            El núcleo inteligente de tu operación.
          </span>
          <span className="mt-2.5 h-[3px] w-10 bg-orange" />
        </>
      )}
    </span>
  );
}
