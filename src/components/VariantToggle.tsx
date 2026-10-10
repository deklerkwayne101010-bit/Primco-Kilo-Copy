import React from 'react';
import { useVariant, Variant } from '../context/VariantContext';

export const VariantToggle: React.FC = () => {
  const { variant, setVariant } = useVariant();

  return (
    <div
      role="group"
      aria-label="Design version switcher"
      className="fixed bottom-6 left-6 z-[1000] flex items-center gap-1.5 bg-[#0b0e12]/90 backdrop-blur-md border border-[var(--line)] rounded-full p-1.5 shadow-2xl select-none"
    >
      <span className="text-[9px] font-extrabold tracking-widest text-[var(--muted)] px-1.5 hidden sm:block">
        DESIGN
      </span>
      {(['A', 'B', 'C'] as Variant[]).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => setVariant(v)}
          aria-pressed={variant === v}
          title={`Switch to design version ${v}`}
          className={`w-8 h-8 rounded-full text-xs font-extrabold transition-all duration-[var(--dur)] cursor-pointer ${
            variant === v
              ? 'bg-[var(--grad-brand)] text-white shadow-[var(--glow-sm)] scale-105'
              : 'text-[var(--muted)] hover:text-white hover:bg-[#161c22]'
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
};
