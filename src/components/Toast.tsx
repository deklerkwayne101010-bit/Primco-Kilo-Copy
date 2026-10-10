import React from 'react';
import { useQuote } from '../context/QuoteContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useQuote();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />,
    warning: <AlertTriangle size={16} className="text-amber-400 shrink-0" />,
    info: <Info size={16} className="text-[var(--blue)] shrink-0" />
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      <div className="bg-[var(--grad-brand)] border border-[var(--blue)] text-white px-5 py-3 rounded-[var(--radius-lg)] shadow-[var(--glow-md)] flex items-center gap-3 backdrop-blur-md max-w-md text-xs sm:text-sm font-semibold">
        {icons[toast.type || 'success']}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
