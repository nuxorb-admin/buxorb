import type { ReactNode } from "react";

const colorClass = {
  ink: "bg-ink text-white",
  teal: "bg-teal text-white",
  orange: "bg-orange text-white",
  muted: "bg-ink/10 text-ink/70",
};

export default function Badge({
  children,
  color = "ink",
}: {
  children: ReactNode;
  color?: keyof typeof colorClass;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em] ${colorClass[color]}`}
    >
      {children}
    </span>
  );
}
