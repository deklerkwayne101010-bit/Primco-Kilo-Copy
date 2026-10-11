import React, { useState, useMemo, useEffect } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { useQuote } from '../context/QuoteContext';
import { ProductGraphic } from '../components/ProductGraphic';
import { PRODUCTS, RANGES, CATEGORIES, BRANDS, Product } from '../data/catalogue';
import {
  Search,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Copy,
  Check,
  ShoppingBag,
  Eye,
  Package,
  Wrench,
  Layers,
  Paintbrush,
  Disc,
  Hammer,
  Zap,
  Box,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface CataloguePageCProps {
  initialRange?: string;
  initialCategory?: string;
  initialQuery?: string;
  onNavigate: (page: PageId, extra?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const CataloguePageC: React.FC<CataloguePageCProps> = ({
  initialRange = 'all',
  initialCategory = 'all',
  initialQuery = '',
  onNavigate,
  onSelectProduct,
}) => {
  const { addToQuote, items, showToast } = useQuote();

  // Filter & view state (grid-first by default for the premium feel)
  const [search, setSearch] = useState(initialQuery);
  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'sku-asc' | 'sku-desc' | 'name-asc' | 'name-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  // Sync when incoming props change
  useEffect(() => {
    if (initialRange && initialRange !== 'all') setSelectedRange(initialRange);
    if (initialCategory && initialCategory !== 'all') setSelectedCategory(initialCategory);
    if (initialQuery) setSearch(initialQuery);
  }, [initialRange, initialCategory, initialQuery]);

  const handleSelectCategory = (slug: string) => {
    if (slug === 'all' || selectedCategory === slug) {
      setSelectedCategory('all');
      setSelectedSubcategory('all');
    } else {
      setSelectedCategory(slug);
      // Drill-down: a subcategory must be chosen before products show
      setSelectedSubcategory('');
    }
    setCurrentPage(1);
  };

  const handleSelectSubcategory = (categorySlug: string, subSlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedSubcategory(subSlug);
    setCurrentPage(1);
  };

  const handleCopySku = (sku: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(sku);
    setCopiedSku(sku);
    showToast(`Copied SKU ${sku} to clipboard`, 'info');
    setTimeout(() => setCopiedSku(null), 2000);
  };

  const handleQtyChange = (sku: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[sku] || 1;
      const next = Math.max(1, Math.min(999, current + delta));
      return { ...prev, [sku]: next };
    });
  };

  const handleAddProductToQuote = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const qty = quantities[product.sku] || 1;
    addToQuote(product.sku, qty);
  };

  // A main category is selected but no subcategory chosen yet (main -> sub -> product)
  const awaitingSubcategory = selectedCategory !== 'all' && selectedSubcategory === '';

  // Filtering + sorting (identical matching to the standard catalogue)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedRange !== 'all' && item.range !== selectedRange) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Within a main category, a subcategory drives the product list
      if (selectedCategory !== 'all' && selectedSubcategory === '') return false;
      if (selectedSubcategory !== 'all' && item.subcategory !== selectedSubcategory) return false;
      if (selectedBrand !== 'all' && item.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      if (inStockOnly && !item.inStock) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchSku = item.sku.toLowerCase().includes(q);
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchCategory = item.categoryName.toLowerCase().includes(q);
        const matchSub = item.subcategoryName.toLowerCase().includes(q);
        const matchSpecs = item.specs ? Object.values(item.specs).some(v => v.toLowerCase().includes(q)) : false;
        return matchSku || matchName || matchDesc || matchBrand || matchCategory || matchSub || matchSpecs;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'sku-asc') return a.sku.localeCompare(b.sku);
      if (sortBy === 'sku-desc') return b.sku.localeCompare(a.sku);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedRange, selectedCategory, selectedSubcategory, selectedBrand, inStockOnly, search, sortBy]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedRange('all');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedBrand('all');
    setInStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedRange !== 'all' ||
    selectedCategory !== 'all' ||
    selectedSubcategory !== 'all' ||
    selectedBrand !== 'all' ||
    inStockOnly;

  const currentCategoryObj = CATEGORIES.find(c => c.slug === selectedCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Disc': return <Disc size={14} />;
      case 'Hammer': return <Hammer size={14} />;
      case 'Paintbrush': return <Paintbrush size={14} />;
      case 'Zap': return <Zap size={14} />;
      case 'Box': return <Box size={14} />;
      case 'Layers': return <Layers size={14} />;
      case 'Wrench': return <Wrench size={14} />;
      case 'ShieldAlert': return <ShieldAlert size={14} />;
      case 'ShieldCheck': return <ShieldCheck size={14} />;
      default: return <Package size={14} />;
    }
  };

  // Page numbers window for pagination
  const pageNumbers = useMemo(() => {
    const pages: (number | '…')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('…');
      const lo = Math.max(2, currentPage - 1);
      const hi = Math.min(totalPages - 1, currentPage + 1);
      for (let i = lo; i <= hi; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('…');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  const inQuoteCount = items.length;

  return (
    <div className="catalogue-page-c flex flex-col bg-[var(--ink)]">
      {/* ============================================================
          PREMIUM HERO WITH PROMINENT SEARCH
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="aurora" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(17,152,232,.16), transparent 60%)',
          }}
        />
        <div className="container relative py-14 lg:py-16">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
            <span className="metallic-badge text-[10px] font-extrabold tracking-[0.2em] uppercase text-[var(--gold)] px-3.5 py-1.5 rounded-full mb-5">
              Engineering &amp; Workshop Supply
            </span>
            <h1 className="premium-text text-3xl lg:text-4xl font-extrabold mb-4">
              Product Catalogue
            </h1>
            <p className="text-sm text-[var(--muted)] max-w-xl leading-relaxed mb-8">
              Certified collision fasteners, abrasives, vehicle glass, mechanical
              parts, and refinish systems stocked at our Alberton depot.
            </p>

            {/* Big premium search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-2xl"
            >
              <div className="glass-panel relative rounded-[var(--radius-xl)] p-2 shadow-[var(--glow-premium)]">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by SKU (e.g. ABS198-P180), name, category, or brand…"
                    className="catalogue-search w-full h-[56px] pl-13 pr-12 bg-transparent border border-transparent focus:border-[var(--gold)] rounded-[var(--radius-lg)] text-sm text-white placeholder:text-[var(--muted)] focus:outline-none focus:shadow-[var(--glow-gold)] transition-all"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setCurrentPage(1);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white p-1"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================
          STICKY PREMIUM FILTER BAR
          ============================================================ */}
      <div className="catalogue-toolbar sticky top-24 z-30 border-b border-[var(--line)] bg-[rgba(11,14,18,0.85)] backdrop-blur-xl">
        <div className="container py-3.5 flex flex-col gap-3">
          {/* Row 1: category pills + controls */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            {/* Main categories now live in the left-hand rail */}
            <div className="flex-1" />

            {/* Controls: view + sort */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* View toggle */}
              <div className="catalogue-viewtoggle flex items-center bg-[#111418] border border-[var(--line)] rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  title="Grid Card View"
                  className={`p-1.5 rounded-full text-xs flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[var(--grad-premium)] text-white shadow-[var(--glow-premium)]'
                      : 'text-[var(--muted)] hover:text-white'
                  }`}
                >
                  <LayoutGrid size={15} />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  title="Table View"
                  className={`p-1.5 rounded-full text-xs flex items-center gap-1.5 font-bold transition-all cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-[var(--grad-premium)] text-white shadow-[var(--glow-premium)]'
                      : 'text-[var(--muted)] hover:text-white'
                  }`}
                >
                  <List size={15} />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-[#111418] border border-[var(--line)] rounded-full text-xs text-white px-3.5 py-2 outline-none cursor-pointer focus:border-[var(--gold)]"
                aria-label="Sort products"
              >
                <option value="featured">Featured First</option>
                <option value="sku-asc">SKU (A to Z)</option>
                <option value="sku-desc">SKU (Z to A)</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
              </select>
            </div>
          </div>

          {/* Subcategories now open in the side ladder */}

          {/* Row 3: brand + stock + per-page + result count */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Brand filter */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <span className="hidden sm:inline">Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#111418] border border-[var(--line)] rounded-full text-xs text-white px-3 py-1.5 outline-none cursor-pointer focus:border-[var(--gold)]"
                aria-label="Filter by brand"
              >
                <option value="all">All Brands</option>
                {BRANDS.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Range filter */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <span className="hidden sm:inline">Division:</span>
              <select
                value={selectedRange}
                onChange={(e) => {
                  setSelectedRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#111418] border border-[var(--line)] rounded-full text-xs text-white px-3 py-1.5 outline-none cursor-pointer focus:border-[var(--gold)]"
                aria-label="Filter by division"
              >
                <option value="all">All Divisions</option>
                {RANGES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs text-[var(--silver)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 rounded border-[var(--line)] accent-[var(--gold)] cursor-pointer"
              />
              <span>In Stock (Alberton)</span>
            </label>

            {/* Items per page */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <span className="hidden sm:inline">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#111418] border border-[var(--line)] rounded-full text-xs text-white px-3 py-1.5 outline-none cursor-pointer focus:border-[var(--gold)]"
                aria-label="Items per page"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>

            {/* Result count */}
            <div className="ml-auto flex items-center gap-2 text-xs">
              <span className="text-[var(--muted)]">
                <span className="font-bold text-white">{totalItems}</span> product{totalItems === 1 ? '' : 's'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111418] border border-[var(--line)] text-[var(--silver)] hover:border-[var(--gold)] hover:text-white transition-all cursor-pointer"
                >
                  <X size={12} />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          RESULTS
          ============================================================ */}
      <Section size="md" background="wash" borderBlock>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* -------- LEFT: MAIN CATEGORIES RAIL -------- */}
          <aside className="w-full md:w-56 shrink-0 md:sticky md:top-24">
            <div className="glass-panel rounded-[var(--radius-xl)] p-4 flex flex-col gap-1 border border-[var(--line)]">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted)] px-1 pb-2">
                Main Categories
              </h3>

              {/* All Products rung */}
              <button
                type="button"
                onClick={() => handleSelectCategory('all')}
                className={`main-rung w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[var(--grad-premium)] text-white shadow-[var(--glow-premium)]'
                    : 'text-[var(--silver)] hover:bg-[#161c22] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Package size={14} className={selectedCategory === 'all' ? 'text-white' : 'text-[var(--gold)]'} />
                  All Products
                </span>
                <span className="text-[10px] font-mono opacity-70">{PRODUCTS.length}</span>
              </button>

              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`main-rung w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--grad-premium)] text-white shadow-[var(--glow-premium)]'
                        : 'text-[var(--silver)] hover:bg-[#161c22] hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className={active ? 'text-white' : 'text-[var(--gold)]'}>
                        {getCategoryIcon(cat.iconName)}
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className={`text-[10px] font-mono shrink-0 ${active ? 'opacity-80' : 'text-[var(--muted)]'}`}>
                      {cat.productCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* -------- MIDDLE: SUBCATEGORIES RAIL (drill-down) -------- */}
          {selectedCategory !== 'all' && currentCategoryObj && (
            <aside className="sub-rail w-full md:w-60 shrink-0 md:sticky md:top-24">
              <div className="glass-panel rounded-[var(--radius-xl)] p-4 flex flex-col gap-1.5 border border-[var(--gold)]/30 shadow-[var(--glow-premium)]">
                <div className="flex items-center gap-2 pb-2 mb-1 border-b border-[var(--line)]">
                  <span className="text-[var(--gold)]">
                    {getCategoryIcon(currentCategoryObj.iconName)}
                  </span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {currentCategoryObj.name}
                  </h3>
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--muted)] px-1 pb-1">
                  Subcategories
                </span>

                {/* All <Category> rung */}
                <button
                  type="button"
                  onClick={() => handleSelectSubcategory(currentCategoryObj.slug, 'all')}
                  className={`sub-rung w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    selectedSubcategory === 'all'
                      ? 'bg-[var(--grad-premium)] text-white shadow-[var(--glow-premium)]'
                      : 'text-[var(--silver)] hover:bg-[#161c22] hover:text-white'
                  }`}
                >
                  <span>All {currentCategoryObj.name}</span>
                  <span className="text-[10px] font-mono opacity-70">
                    {currentCategoryObj.productCount}
                  </span>
                </button>

                {currentCategoryObj.subcategories.map((sub) => {
                  const active = selectedSubcategory === sub.slug;
                  return (
                    <button
                      key={sub.slug}
                      type="button"
                      onClick={() => handleSelectSubcategory(currentCategoryObj.slug, sub.slug)}
                      className={`sub-rung w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        active
                          ? 'bg-[var(--blue)] text-white shadow-[var(--glow-sm)]'
                          : 'text-[var(--silver)] hover:bg-[#161c22] hover:text-white'
                      }`}
                    >
                      <span className="truncate">{sub.name}</span>
                      <span className={`text-[10px] font-mono shrink-0 ${active ? 'opacity-80' : 'text-[var(--muted)]'}`}>
                        {sub.count}
                      </span>
                    </button>
                  );
                })}

                <div className="mt-3 pt-3 border-t border-[var(--line)] text-[10px] text-[var(--muted)] leading-relaxed">
                  Pick a subcategory to view its products.
                </div>
              </div>
            </aside>
          )}

          {/* -------- RIGHT: PRODUCTS -------- */}
          <div className="flex-1 min-w-0">
            {awaitingSubcategory ? (
              <div className="glass-panel max-w-lg mx-auto text-center py-16 px-8 rounded-[var(--radius-xl)]">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shadow-[var(--glow-gold)]">
                  <ChevronDown size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Browse {currentCategoryObj?.name}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-1">
                  {currentCategoryObj?.productCount} products across {currentCategoryObj?.subcategories.length} subcategories.
                </p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Choose a subcategory from the middle column to view its products, or pick "All {currentCategoryObj?.name}" to see everything.
                </p>
              </div>
            ) : totalItems === 0 ? (
              <div className="glass-panel max-w-xl mx-auto text-center py-16 px-8 rounded-[var(--radius-xl)]">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shadow-[var(--glow-gold)]">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No products match</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                  Try a different keyword, or clear your filters to browse the full
                  catalogue. You can also request a hard-to-find part via our sourcing
                  desk.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="button-secondary"
                  >
                    <span>Clear all filters</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('parts-sourcing')}
                    className="button"
                  >
                    <span>Request Custom Sourcing</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              /* -------- GRID VIEW (premium cards) -------- */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => {
              const inQuote = items.some(i => i.sku === product.sku);
              const itemQty = quantities[product.sku] || 1;
              const specs = Object.entries(product.specs || {}).slice(0, 3);

              return (
                <article
                  key={product.sku}
                  className="catalogue-card group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)]"
                >
                  {/* Graphic */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative h-48 w-full cursor-pointer overflow-hidden border-b border-[var(--line)]"
                  >
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <ProductGraphic
                        sku={product.sku}
                        category={product.category}
                        name={product.name}
                      />
                    </div>
                    <span className="metallic-badge absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] px-2.5 py-1 rounded-full">
                      {product.subcategoryName}
                    </span>
                    {product.featured && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0b0e12] bg-[var(--grad-gold)] px-2.5 py-1 rounded-full">
                        <Sparkles size={10} />
                        Featured
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 border border-[var(--line)] text-[var(--silver)] hover:text-white hover:border-[var(--gold)] backdrop-blur transition-all cursor-pointer"
                      aria-label={`View ${product.name}`}
                    >
                      <Eye size={15} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopySku(product.sku)}
                          className="font-mono text-[11px] font-bold text-[var(--gold)] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy SKU"
                        >
                          <span>{product.sku}</span>
                          {copiedSku === product.sku ? (
                            <Check size={11} />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                        <span className="text-[10px] font-semibold text-[var(--muted)] uppercase tracking-wider">
                          {product.brand}
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-base font-bold text-white group-hover:text-[var(--gold)] transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      {specs.length > 0 && (
                        <div className="flex flex-col gap-1 pt-1">
                          {specs.map(([k, v]) => (
                            <div
                              key={k}
                              className="flex items-center justify-between gap-3 text-[11px]"
                            >
                              <span className="text-[var(--muted)]">{k}</span>
                              <span className="text-[var(--silver)] font-semibold text-right">
                                {v}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer: availability + order */}
                    <div className="pt-4 border-t border-[var(--line)]/60 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            product.inStock
                              ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                              : 'text-amber-400 bg-amber-950/40 border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.inStock ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          {product.inStock ? 'In Stock' : 'On Request'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity stepper */}
                        <div className="inline-flex items-center border border-[var(--line)] rounded-full bg-[#101418] overflow-hidden shrink-0">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product.sku, -1)}
                            className="px-2.5 py-1.5 text-[var(--muted)] hover:text-white hover:bg-[#192027] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={999}
                            value={itemQty}
                            onChange={(e) => {
                              const num = parseInt(e.target.value, 10);
                              if (!isNaN(num) && num > 0) {
                                setQuantities(prev => ({
                                  ...prev,
                                  [product.sku]: Math.min(999, num),
                                }));
                              }
                            }}
                            className="w-10 bg-transparent text-center text-xs font-bold text-white outline-none"
                            aria-label="Quantity"
                          />
                          <button
                            type="button"
                            onClick={() => handleQtyChange(product.sku, 1)}
                            className="px-2.5 py-1.5 text-[var(--muted)] hover:text-white hover:bg-[#192027] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Add to quote */}
                        <button
                          type="button"
                          onClick={(e) => handleAddProductToQuote(product, e)}
                          className={`flex-1 h-9 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            inQuote
                              ? 'bg-[var(--grad-gold)] text-[#0b0e12] shadow-[var(--glow-gold)]'
                              : 'button'
                          }`}
                        >
                          <ShoppingBag size={14} />
                          <span>{inQuote ? 'In Quote' : 'Add to Quote'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* -------- TABLE VIEW (premium list) -------- */
          <div className="catalogue-table overflow-hidden rounded-[var(--radius-xl)] w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--muted)] text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Part / SKU</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Brand</th>
                    <th className="py-3.5 px-4 text-center">Availability</th>
                    <th className="py-3.5 px-4 text-right">Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/50 text-[var(--silver)]">
                  {paginatedProducts.map((product) => {
                    const inQuote = items.some(i => i.sku === product.sku);
                    const itemQty = quantities[product.sku] || 1;
                    return (
                      <tr
                        key={product.sku}
                        className="hover:bg-[rgba(17,152,232,0.06)] transition-colors group"
                      >
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleCopySku(product.sku)}
                              className="font-mono text-[11px] font-bold text-[var(--gold)] hover:text-white flex items-center gap-1 cursor-pointer"
                              title="Copy SKU"
                            >
                              <span>{product.sku}</span>
                              {copiedSku === product.sku ? (
                                <Check size={11} />
                              ) : (
                                <Copy size={11} />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 align-middle">
                          <h4
                            onClick={() => onSelectProduct(product)}
                            className="font-bold text-white group-hover:text-[var(--gold)] transition-colors cursor-pointer leading-snug line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                            {product.subcategoryName}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 align-middle hidden md:table-cell text-[var(--muted)]">
                          {product.brand}
                        </td>
                        <td className="py-3.5 px-4 text-center align-middle whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              product.inStock
                                ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                                : 'text-amber-400 bg-amber-950/40 border border-amber-500/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                product.inStock ? 'bg-emerald-400' : 'bg-amber-400'
                              }`}
                            />
                            {product.inStock ? 'In Stock' : 'On Request'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right align-middle whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <div className="inline-flex items-center border border-[var(--line)] rounded-full bg-[#101418] overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleQtyChange(product.sku, -1)}
                                className="px-2 py-1 text-[var(--muted)] hover:text-white hover:bg-[#192027] cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-white">
                                {itemQty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(product.sku, 1)}
                                className="px-2 py-1 text-[var(--muted)] hover:text-white hover:bg-[#192027] cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => handleAddProductToQuote(product, e)}
                              className={`h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                                inQuote
                                  ? 'bg-[var(--grad-gold)] text-[#0b0e12] shadow-[var(--glow-gold)]'
                                  : 'bg-[var(--blue)] text-white hover:bg-[var(--blue-light)]'
                              }`}
                            >
                              <ShoppingBag size={13} />
                              <span>{inQuote ? 'In Quote' : 'Add'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
                )}
          </div>
        </div>

        {/* ============================================================
            PAGINATION
            ============================================================ */}
        {!awaitingSubcategory && totalItems > 0 && totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--muted)]">
              Showing{' '}
              <span className="font-bold text-white">
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}–
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{' '}
              of <span className="font-bold text-white">{totalItems}</span> products
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-[var(--line)] text-[var(--silver)] hover:border-[var(--gold)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Previous page"
              >
                <ArrowLeft size={14} />
              </button>

              {pageNumbers.map((p, idx) =>
                p === '…' ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-[var(--muted)] text-xs"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p as number)}
                    className={`min-w-[36px] h-9 px-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentPage === p
                        ? 'bg-[var(--grad-premium)] text-white shadow-[var(--glow-premium)]'
                        : 'border border-[var(--line)] text-[var(--silver)] hover:border-[var(--gold)] hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-[var(--line)] text-[var(--silver)] hover:border-[var(--gold)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Next page"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* ============================================================
          SOURCING CTA
          ============================================================ */}
      <Section size="sm" background="wash">
        <div className="card-interactive relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gold)]/40 bg-gradient-to-r from-[var(--blue-dark)]/40 via-[#111418] to-[var(--violet)]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[var(--glow-premium)]">
          <div className="absolute inset-0 aurora" />
          <div className="relative max-w-xl">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Direct Dispatch
            </span>
            <h2 className="premium-text text-xl lg:text-2xl font-extrabold mb-1.5">
              Can't find the exact OEM part?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Dean sources discontinued panels, imported glass, and custom
              refinish formulations daily — with same-day Gauteng dispatch.
            </p>
          </div>
          <div className="relative flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('parts-sourcing')}
              className="button"
            >
              <span>Source a Rare Part</span>
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('quick-order')}
              className="button-secondary"
            >
              <span>Bulk CSV Order</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
