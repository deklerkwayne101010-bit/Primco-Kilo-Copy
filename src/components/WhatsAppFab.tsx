import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldAlert } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

interface WhatsAppFabProps {
  isOpenModal?: boolean;
  onToggleModal?: () => void;
}

export const WhatsAppFab: React.FC<WhatsAppFabProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Hi Dean, I am requesting stock availability for our panel shop in Gauteng.');
  const { totalCount } = useQuote();

  const handleSend = () => {
    const encoded = encodeURIComponent(message + (totalCount > 0 ? ` (Currently reviewing ${totalCount} items in my quote request).` : ''));
    window.open(`https://wa.me/27799011544?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end">
        {/* Chat Dialog Popover */}
        {isOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-[#0e1216] border border-[var(--line)] rounded-[var(--radius-xl)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 bg-emerald-950 shrink-0">
                  <img
                    src="/assets/images/team-dean-strydom.png"
                    alt="Dean Strydom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Dean Strydom</h4>
                  <p className="text-[11px] text-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Director / Sales · Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-emerald-200 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#0a0d10] flex flex-col gap-3 max-h-72 overflow-y-auto">
              <div className="bg-[#151c23] border border-[var(--line)] p-3 rounded-[var(--radius-md)] text-xs text-[var(--silver)]">
                <p className="font-bold text-white mb-1">Primeco Supplies Rapid Dispatch</p>
                <p className="text-[11px] text-[var(--muted)]">
                  Need an urgent quote, windscreen delivery, or special refinish formulation? Message us directly for 15-minute turnaround during business hours.
                </p>
              </div>

              {totalCount > 0 && (
                <div className="bg-blue-950/40 border border-blue-500/40 p-2.5 rounded text-xs text-blue-200 flex items-center gap-2">
                  <ShieldAlert size={14} className="text-[var(--blue)] shrink-0" />
                  <span>You have {totalCount} items in your quote list ready for Dean.</span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-[var(--muted)] tracking-wider">
                  Your WhatsApp Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-[#111418] border border-[var(--line)] focus:border-[var(--blue)] text-xs text-[var(--bright)] p-2.5 rounded-[var(--radius-sm)] resize-none outline-none"
                  placeholder="Type your message or part number..."
                />
              </div>
            </div>

            {/* Chat Footer */}
            <div className="p-3 bg-[#0e1216] border-t border-[var(--line)] flex justify-end">
              <button
                type="button"
                onClick={handleSend}
                className="w-full py-2.5 px-4 bg-[#25d366] hover:bg-[#20ba5a] text-black font-extrabold rounded-[var(--radius-md)] text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Send size={14} />
                <span>Open WhatsApp Chat (+27 79 901 1544)</span>
              </button>
            </div>
          </div>
        )}

        {/* The 64px circular FAB */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Chat with Dean Strydom"
          className="w-16 h-16 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer whatsapp-fab group"
        >
          {isOpen ? (
            <X size={28} className="text-black" />
          ) : (
            <MessageCircle size={32} className="text-black group-hover:rotate-6 transition-transform fill-black" />
          )}
        </button>
      </div>
    </>
  );
};
