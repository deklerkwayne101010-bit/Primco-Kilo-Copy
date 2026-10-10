import React, { useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/catalogue';
import { useQuote } from '../context/QuoteContext';
import { ProductGraphic } from './ProductGraphic';
import { X, Plus, Minus, ShoppingBag, Check, ShieldCheck, Truck, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addToQuote, items } = useQuote();

  useEffect(() => {
    setQuantity(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const existingQuoteItem = items.find(i => i.sku === product.sku);

  const relatedProducts = PRODUCTS.filter(
    p => p.sku !== product.sku && (p.category === product.category || p.range === product.range)
  ).slice(0, 3);

  const handleAdd = () => {
    addToQuote(product.sku, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0e1216] border border-[var(--line)] rounded-[var(--radius-xl)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Close */}
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#111418] border border-[var(--line)] text-[var(--muted)] hover:text-white hover:border-[var(--blue)] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 lg:p-8 flex flex-col gap-8">
          {/* Main Product Split: Graphic Left, Details Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Image / Graphic (5 cols) */}
            <div className="md:col-span-5 bg-[#07090c] border border-[var(--line)] rounded-[var(--radius-lg)] p-4 flex flex-col items-center justify-center relative overflow-hidden aspect-4/3">
              {product.demo && (
                <span className="absolute top-3 left-3 z-10 text-[10px] font-bold tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2.5 py-0.5 rounded uppercase">
                  DEMO ITEM
                </span>
              )}

              <div className="w-full h-full flex items-center justify-center">
                <ProductGraphic sku={product.sku} category={product.category} name={product.name} />
              </div>
            </div>

            {/* Product Details (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--blue)] bg-[var(--blue-dark)]/20 border border-[var(--blue)]/40 px-2.5 py-0.5 rounded">
                    {product.subcategoryName || product.categoryName}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    SKU: {product.sku}
                  </span>
                </div>

                <h1 className="text-xl lg:text-2xl font-extrabold text-[var(--bright)] leading-snug">
                  {product.name}
                </h1>

                <p className="text-xs text-[var(--muted)] mt-1">
                  Brand: <strong className="text-[var(--silver)] font-bold">{product.brand}</strong> · Packaging: <strong className="text-[var(--silver)] font-bold">{product.unit}</strong>
                </p>
              </div>

              <p className="text-sm text-[var(--silver)] leading-relaxed">
                {product.description}
              </p>

              {/* Delivery / Guarantee tags */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[var(--line)] text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[var(--blue)] shrink-0" />
                  <span>Gauteng Same-Day Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Trade Warranty Guaranteed</span>
                </div>
              </div>

              {/* Add to Quote Section */}
              <div className="bg-[#11151a] border border-[var(--line)] rounded-[var(--radius-lg)] p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center border border-[var(--line)] rounded-[var(--radius-md)] bg-[#090c0f] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-[var(--muted)] hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
                    className="w-14 text-center bg-transparent text-sm font-bold text-white focus:outline-none"
                    min={1}
                    max={999}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(999, quantity + 1))}
                    className="p-2.5 text-[var(--muted)] hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full sm:flex-1 py-3 px-5 rounded-[var(--radius-md)] bg-[var(--grad-brand)] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[var(--glow-sm)]"
                >
                  <ShoppingBag size={16} />
                  <span>Add {quantity} to Quote Request</span>
                </button>
              </div>

              {existingQuoteItem && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <Check size={14} />
                  <span>Already in current quote: <strong>{existingQuoteItem.quantity} units</strong></span>
                </p>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-4 border-t border-[var(--line)]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--bright)] mb-4">
                Complementary Workshop Items
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.sku}
                    onClick={() => onSelectProduct(rel)}
                    className="bg-[#111418] border border-[var(--line)] hover:border-[var(--blue)] p-3 rounded-[var(--radius-md)] flex flex-col gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <p className="text-[10px] text-[var(--muted)] font-mono">{rel.sku}</p>
                    <p className="text-xs font-bold text-white line-clamp-2">{rel.name}</p>
                    <p className="text-[11px] text-[var(--blue)]">{rel.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
