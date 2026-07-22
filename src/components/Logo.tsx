interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  /** Muestra la tagline + subrayado naranja (lockup completo). */
  tagline?: boolean;
}

/**
 * Logo NUXORB. En fondos claros usa el lockup completo (logo-full.png);
 * en fondos oscuros el wordmark "NUXORB" (azul marino) casi no se lee,
 * así que se usa solo el ícono de la esfera (logo-orb.png).
 */
export default function Logo({ variant = "light", className = "", tagline = false }: LogoProps) {
  const src = variant === "dark" ? "/images/logo-orb.png" : "/images/logo-full.png";
  const heightClass = variant === "dark" ? "h-8" : "h-9";

  return (
    <span className={`inline-flex flex-col ${className}`}>
      <img src={src} alt="Nuxorb" className={`${heightClass} w-auto object-contain`} />
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
