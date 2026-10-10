import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

interface TopBarProps {
  onOpenWhatsApp: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenWhatsApp }) => {
  return (
    <div className="h-[38px] bg-[#050709] border-b border-white/[0.07] text-[11px] text-[var(--muted)] flex items-center z-50 relative backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[var(--bright)] font-semibold tracking-tight">Alberton Logistics Hub</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-xs text-[var(--silver)]/90 font-medium">Same-Day Workshop Fleet Dispatch Across Gauteng</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[var(--muted)] font-mono text-[10px]">
            <Clock size={11} className="text-[var(--blue)]" />
            <span>07:30 – 17:00 (SAST)</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="tel:+27799011544"
            className="flex items-center gap-1.5 text-[var(--silver)] hover:text-white transition-colors"
          >
            <Phone size={11} className="text-[var(--blue)]" />
            <span className="font-semibold font-mono text-[10px]">079 901 1544</span>
          </a>

          <a
            href="tel:+27767211286"
            className="hidden lg:flex items-center gap-1.5 text-[var(--silver)] hover:text-white transition-colors"
          >
            <Phone size={11} className="text-[var(--blue)]" />
            <span className="font-semibold font-mono text-[10px]">076 721 1286</span>
          </a>

          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-[10px] tracking-wide uppercase"
          >
            <MessageSquare size={11} />
            <span>Parts Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
