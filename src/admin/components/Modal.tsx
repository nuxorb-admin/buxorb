import type { ReactNode } from "react";

const SIZE_CLASS = {
  md: "max-w-lg",
  lg: "max-w-3xl",
};

export default function Modal({
  title,
  onClose,
  children,
  size = "md",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: keyof typeof SIZE_CLASS;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8"
      onClick={onClose}
    >
      <div
        className={`w-full ${SIZE_CLASS[size]} border border-ink/10 bg-white p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase text-ink">{title}</h2>
          <button onClick={onClose} className="font-mono text-xs text-muted hover:text-ink">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
