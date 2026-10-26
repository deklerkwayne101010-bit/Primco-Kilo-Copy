import React from 'react';
import { Product } from '../data/catalogue';
import { useQuote } from '../context/QuoteContext';
import { ProductGraphic } from './ProductGraphic';
import { Plus, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToQuote, items } = useQuote();
  const isAlreadyInQuote = items.some(item => item.sku === product.sku);

  return (
    <article className="group bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden flex flex-col transition-all duration-[var(--dur)] ease-[var(--lift)] hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)]">
      {/* Product Image Area */}
      <div 
        onClick={() => onSelectProduct?.(product)}
        className="relative h-48 w-full bg-[#0a0d11] cursor-pointer overflow-hidden border-b border-[var(--line)] flex items-center justify-center"
      >
        <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-[#111418]/90 text-[var(--blue)] border border-[var(--line)] px-2.5 py-0.5 rounded-[var(--radius-sm)] backdrop-blur-xs">
          {product.subcategoryName || product.categoryName}
        </span>

        {product.demo && (
          <span className="absolute top-3 right-3 z-10 text-[9px] font-bold tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-[var(--radius-sm)] uppercase">
            SAMPLE
          </span>
        )}

        <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-105">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.graphic')) {
                  const graphic = document.createElement('div');
                  graphic.className = 'graphic w-full h-full';
                  parent.appendChild(graphic);
                }
              }}
            />
          ) : (
            <ProductGraphic sku={product.sku} category={product.category} name={product.name} />
          )}
        </div>

        {/* Hover preview eye button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[var(--ink)]/80 border border-[var(--line)] px-3 py-1.5 rounded-full shadow-lg">
            <Eye size={13} /> View Details
          </span>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[11px] font-bold tracking-wider text-[var(--muted)] font-mono">
              {product.sku}
            </p>
            <span className="text-[11px] text-[var(--blue)] font-medium">
              {product.brand}
            </span>
          </div>

          <h3 
            onClick={() => onSelectProduct?.(product)}
            className="text-[0.95rem] font-bold text-[var(--bright)] line-clamp-2 cursor-pointer hover:text-[var(--blue)] transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Add to Quote Button */}
        <div className="pt-2 border-t border-[var(--line)]/50">
          <button
            type="button"
            onClick={() => addToQuote(product.sku, 1)}
            className={`w-full py-2.5 px-3 rounded-[var(--radius-md)] text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-[var(--dur)] cursor-pointer ${
              isAlreadyInQuote
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/50'
                : 'bg-[#161c22] text-[var(--bright)] border border-[var(--line)] hover:border-[var(--blue)] hover:text-white hover:bg-[var(--grad-brand)] hover:shadow-[var(--glow-sm)]'
            }`}
          >
            {isAlreadyInQuote ? (
              <>
                <Check size={14} className="text-emerald-400" /> In Quote (+1)
              </>
            ) : (
              <>
                <Plus size={14} className="text-[var(--blue)] group-hover:text-white" /> + Add to Quote
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
