import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useQuote } from '../context/QuoteContext';

interface DemoBarProps {
  onGoToQuickOrder?: () => void;
}

export const DemoBar: React.FC<DemoBarProps> = ({ onGoToQuickOrder }) => {
  const { hasDemoItems } = useQuote();

  return (
    <div className="bg-[#075eaf]/20 border-b border-[#1198e8]/30 py-2 px-4 text-xs text-[#d8dde3]">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <AlertCircle size={15} className="text-[#1198e8] shrink-0" />
          <span>
            <strong className="text-white font-bold">TRADE ESTIMATION SYSTEM:</strong> Panel shops in Gauteng enjoy same-day delivery on in-stock catalogue items.
            {hasDemoItems && (
              <span className="text-amber-300 font-semibold ml-1">
                Notice: Your quote contains sample demonstration items.
              </span>
            )}
          </span>
        </div>

        {onGoToQuickOrder && (
          <button
            type="button"
            onClick={onGoToQuickOrder}
            className="flex items-center gap-1 text-[#1198e8] hover:text-white font-bold transition-colors cursor-pointer shrink-0"
          >
            <span>Bulk CSV Order Tool</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
};
