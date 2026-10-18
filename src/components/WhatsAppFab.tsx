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
            <svg
              viewBox="0 0 448 512"
              className="w-10 h-10 text-black group-hover:rotate-6 transition-transform fill-black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};
