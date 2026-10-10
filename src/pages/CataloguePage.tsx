import React, { useState, useMemo, useEffect } from 'react';
import { PageId } from '../components/Header';
import { useQuote } from '../context/QuoteContext';
import { ProductGraphic } from '../components/ProductGraphic';
import { PRODUCTS, RANGES, CATEGORIES, BRANDS, Product } from '../data/catalogue';
import { PageHero } from '../components/PageHero';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw,
  LayoutGrid,
  List,
  Copy,
  Check,
  ShoppingBag,
  Eye,
  Plus,
  Minus,
  ArrowRight,
  Layers,
  Wrench,
  Disc,
  Paintbrush,
  ShieldCheck,
  ShieldAlert,
  Box,
  Zap,
  CheckCircle2,
  Package
} from 'lucide-react';

interface CataloguePageProps {
  initialRange?: string;
  initialCategory?: string;
  initialQuery?: string;
  onNavigate: (page: PageId, extra?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  initialRange = 'all',
  initialCategory = 'all',
  initialQuery = '',
  onNavigate,
  onSelectProduct
}) => {
  const { addToQuote, items, totalCount, showToast } = useQuote();

  // Filters & State
  const [search, setSearch] = useState(initialQuery);
  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table'); // EIS style default is dense table/list
  const [sortBy, setSortBy] = useState<'featured' | 'sku-asc' | 'sku-desc' | 'name-asc' | 'name-desc'>('featured');
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);
  const [currentPage, setCurrentPage] = useState(1);

  // Accordion state for category tree
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    CATEGORIES.forEach(c => {
      init[c.slug] = c.slug === initialCategory;
    });
    return init;
  });

  // Mobile sidebar drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Per-item quantity steppers (defaults to 1)
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  // Copied SKU feedback
  const [copiedSku, setCopiedSku] = useState<string | null>(null);

  // Synchronize when initial props change
  useEffect(() => {
    if (initialRange && initialRange !== 'all') setSelectedRange(initialRange);
    if (initialCategory && initialCategory !== 'all') {
      setSelectedCategory(initialCategory);
      setExpandedCategories(prev => ({ ...prev, [initialCategory]: true }));
    }
    if (initialQuery) setSearch(initialQuery);
  }, [initialRange, initialCategory, initialQuery]);

  const toggleCategoryExpand = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const handleSelectCategory = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      // Toggle off or keep
      setSelectedCategory('all');
      setSelectedSubcategory('all');
    } else {
      setSelectedCategory(categorySlug);
      setSelectedSubcategory('all');
      setExpandedCategories(prev => ({ ...prev, [categorySlug]: true }));
    }
    setCurrentPage(1);
  };

  const handleSelectSubcategory = (categorySlug: string, subcategorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedSubcategory(subcategorySlug);
    setExpandedCategories(prev => ({ ...prev, [categorySlug]: true }));
    setCurrentPage(1);
    setMobileFilterOpen(false);
  };

  const handleCopySku = (sku: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(sku);
    setCopiedSku(sku);
    showToast(`Copied SKU ${sku} to clipboard`, 'info');
    setTimeout(() => {
      setCopiedSku(null);
    }, 2000);
  };

  const handleQtyChange = (sku: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[sku] || 1;
      const next = Math.max(1, Math.min(999, current + delta));
      return { ...prev, [sku]: next };
    });
  };

  const handleDirectQtyInput = (sku: string, val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setQuantities(prev => ({ ...prev, [sku]: Math.min(999, num) }));
    }
  };

  const handleAddProductToQuote = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const qty = quantities[product.sku] || 1;
    addToQuote(product.sku, qty);
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Range filter
      if (selectedRange !== 'all' && item.range !== selectedRange) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'all' && item.subcategory !== selectedSubcategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && item.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // Stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }
      // Search filter
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
      // featured default
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedRange, selectedCategory, selectedSubcategory, selectedBrand, inStockOnly, search, sortBy]);

  // Pagination calculation
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

  // Active category & subcategory info for banner/breadcrumbs
  const currentCategoryObj = CATEGORIES.find(c => c.slug === selectedCategory);
  const currentSubcategoryObj = currentCategoryObj?.subcategories.find(s => s.slug === selectedSubcategory);

  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Disc': return <Disc size={15} className="text-[var(--blue)] shrink-0" />;
      case 'Hammer': return <Wrench size={15} className="text-[var(--blue)] shrink-0" />;
      case 'Paintbrush': return <Paintbrush size={15} className="text-[var(--blue)] shrink-0" />;
      case 'Zap': return <Zap size={15} className="text-[var(--blue)] shrink-0" />;
      case 'Box': return <Box size={15} className="text-[var(--blue)] shrink-0" />;
      case 'Layers': return <Layers size={15} className="text-[var(--blue)] shrink-0" />;
      case 'Wrench': return <Wrench size={15} className="text-[var(--blue)] shrink-0" />;
      case 'ShieldAlert': return <ShieldAlert size={15} className="text-[var(--blue)] shrink-0" />;
      case 'ShieldCheck': return <ShieldCheck size={15} className="text-[var(--blue)] shrink-0" />;
      default: return <Package size={15} className="text-[var(--blue)] shrink-0" />;
    }
  };

  // Render Category Navigation Tree (Used on desktop sidebar & mobile drawer)
  const renderCategoryTree = () => (
    <div className="flex flex-col gap-1">
      {/* All Products Option */}
      <button
        type="button"
        onClick={() => {
          setSelectedCategory('all');
          setSelectedSubcategory('all');
          setCurrentPage(1);
          setMobileFilterOpen(false);
        }}
        className={`w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
          selectedCategory === 'all'
            ? 'bg-[var(--blue)] text-white shadow-[var(--glow-sm)]'
            : 'text-[var(--silver)] hover:bg-[#161c22] hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <Package size={15} />
          <span>All Products Directory</span>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
          selectedCategory === 'all' ? 'bg-black/30 text-white' : 'bg-[#1b222a] text-[var(--muted)]'
        }`}>
          {PRODUCTS.length}
        </span>
      </button>

      {/* Category Accordion Items */}
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.slug;
        const isExpanded = !!expandedCategories[cat.slug];
        // Calculate count of matching products currently in DB
        const catProductCount = PRODUCTS.filter(p => p.category === cat.slug).length;

        return (
          <div key={cat.slug} className="flex flex-col border-b border-[var(--line)]/50 pb-1">
            <div
              onClick={() => handleSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-[var(--radius-md)] text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer group ${
                isSelected && selectedSubcategory === 'all'
                  ? 'bg-[var(--blue-dark)]/30 text-[var(--bright)] border border-[var(--blue)]/40 font-bold'
                  : 'text-[var(--silver)] hover:bg-[#14191f] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {getCategoryIcon(cat.iconName)}
                <span className="truncate group-hover:text-white">{cat.name}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-[#111418] border border-[var(--line)] text-[var(--muted)]">
                  {catProductCount}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleCategoryExpand(cat.slug, e)}
                  className="p-1 text-[var(--muted)] hover:text-white"
                  aria-label={`Toggle ${cat.name} subcategories`}
                >
                  {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </button>
              </div>
            </div>

            {/* Subcategories (Expanded) */}
            {isExpanded && (
              <div className="pl-6 pr-2 py-1 flex flex-col gap-0.5 animate-in slide-in-from-top-1 duration-150">
                {cat.subcategories.map((sub) => {
                  const isSubSelected = selectedCategory === cat.slug && selectedSubcategory === sub.slug;
                  const subProductCount = PRODUCTS.filter(p => p.subcategory === sub.slug).length;

                  return (
                    <button
                      key={sub.slug}
                      type="button"
                      onClick={() => handleSelectSubcategory(cat.slug, sub.slug)}
                      className={`text-left px-2.5 py-1.5 rounded-[var(--radius-sm)] text-[11px] flex items-center justify-between transition-colors cursor-pointer ${
                        isSubSelected
                          ? 'bg-[var(--blue)] text-white font-bold'
                          : 'text-[var(--muted)] hover:text-white hover:bg-[#161c22]'
                      }`}
                    >
                      <span className="truncate flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                        {sub.name}
                      </span>
                      <span className="text-[10px] font-mono opacity-80 shrink-0">
                        {subProductCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col bg-[var(--ink)]">
      {/* Variant-aware page hero (A/B/C) */}
      <PageHero
        eyebrow="ENGINEERING & WORKSHOP SUPPLY"
        title="Product Catalogue"
        description="Certified collision fasteners, abrasives, vehicle glass, mechanical parts, and refinish systems stocked at our Alberton distribution depot."
      />

      {/* Top Banner (EIS Industrial Header) */}
      <section className="bg-gradient-to-b from-[#0a0d11] to-[var(--panel)] border-b border-[var(--line)] pt-8 pb-6">
        <div className="container">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            {/* Breadcrumb Navigation */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted)]">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <ChevronRight size={12} className="text-[var(--line)] shrink-0" />
              <button
                type="button"
                onClick={clearAllFilters}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === 'all' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                Catalogue
              </button>
              {currentCategoryObj && (
                <>
                  <ChevronRight size={12} className="text-[var(--line)] shrink-0" />
                  <button
                    type="button"
                    onClick={() => { setSelectedSubcategory('all'); setCurrentPage(1); }}
                    className={`cursor-pointer transition-colors ${
                      selectedSubcategory === 'all' ? 'text-[var(--blue)] font-bold' : 'hover:text-white'
                    }`}
                  >
                    {currentCategoryObj.name}
                  </button>
                </>
              )}
              {currentSubcategoryObj && (
                <>
                  <ChevronRight size={12} className="text-[var(--line)] shrink-0" />
                  <span className="text-white font-bold">
                    {currentSubcategoryObj.name}
                  </span>
                </>
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('quick-order')}
                className="button-secondary text-xs py-1.5 px-3 h-8"
              >
                <span>Bulk CSV Order</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('parts-sourcing')}
                className="button text-xs py-1.5 px-3 h-8"
              >
                <span>Parts Sourcing</span>
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {currentSubcategoryObj ? currentSubcategoryObj.name : currentCategoryObj ? currentCategoryObj.name : 'Engineering & Workshop Supply Catalogue'}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 max-w-2xl">
                Browse our full inventory of certified collision fasteners, abrasives, vehicle glass, mechanical parts, and refinish systems stocked at our Alberton distribution depot.
              </p>
            </div>

            {/* Quick in-stock badge */}
            <div className="flex items-center gap-2 bg-[#090c0f] border border-[var(--line)] px-3 py-1.5 rounded-[var(--radius-md)] text-xs text-[var(--silver)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gauteng Same-Day Dispatch Active</span>
            </div>
          </div>

          {/* Category Ribbon (Wrapping chips that fit on the main page without side scrolling) */}
          <div className="mt-6 pt-4 border-t border-[var(--line)]/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mr-1">
                Quick Category Jump:
              </span>
              {CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[var(--blue)] text-white border-[var(--blue)] shadow-[var(--glow-sm)]'
                        : 'bg-[#101419] text-[var(--silver)] border-[var(--line)] hover:border-[var(--blue)] hover:text-white'
                    }`}
                  >
                    {getCategoryIcon(cat.iconName)}
                    <span>{cat.name.split('&')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Left Category & Filter Sidebar + Right Product Listing */}
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* DESKTOP LEFT SIDEBAR: CATEGORY TREE & FACET FILTERS (3 cols) */}
          {/* ======================================================== */}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-24 max-h-[calc(100vh-110px)] overflow-y-auto pr-1">
            
            {/* 1. Category Tree Card */}
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-[var(--blue)]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Product Categories
                  </h3>
                </div>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }}
                    className="text-[10px] text-[var(--blue)] hover:underline font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {renderCategoryTree()}
            </div>

            {/* 2. Facet Filters (Brand, Stock, Range) */}
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-[var(--blue)]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Filter Facets
                  </h3>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                  >
                    <RefreshCw size={10} /> Clear
                  </button>
                )}
              </div>

              {/* Brand Filter Dropdown */}
              <div>
                <label className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider block mb-1.5">
                  Manufacturer / Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] text-xs text-white p-2 outline-none focus:border-[var(--blue)]"
                >
                  <option value="all">All Authorized Brands</option>
                  {BRANDS.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Range Filter */}
              <div>
                <label className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-wider block mb-1.5">
                  Supply Division
                </label>
                <select
                  value={selectedRange}
                  onChange={(e) => { setSelectedRange(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] text-xs text-white p-2 outline-none focus:border-[var(--blue)]"
                >
                  <option value="all">All Divisions</option>
                  {RANGES.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-[var(--line)]">
                <label className="flex items-center gap-2.5 text-xs text-[var(--silver)] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
                    className="w-4 h-4 rounded border-[var(--line)] text-[var(--blue)] focus:ring-[var(--blue)] accent-[var(--blue)]"
                  />
                  <span>In Stock Only (Alberton Depot)</span>
                </label>
              </div>
            </div>

            {/* Alberton Depot Logistics Support Widget */}
            <div className="bg-gradient-to-br from-[var(--blue-dark)]/20 to-[#111418] border border-[var(--blue)]/30 rounded-[var(--radius-lg)] p-4 text-xs">
              <p className="font-bold text-white mb-1">Direct Sourcing Help?</p>
              <p className="text-[var(--muted)] text-[11px] leading-relaxed mb-3">
                Cannot find a specific OEM part number or high-build formulation? Dean Strydom sources custom requirements daily.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('parts-sourcing')}
                className="w-full button text-xs py-1.5"
              >
                <span>Request Custom Sourcing</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* MAIN COLUMN: TOOLBAR & LISTINGS (9 cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-9 flex flex-col gap-4">
            
            {/* EIS Industrial Control Toolbar */}
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* Search Input with Clear Button */}
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by SKU (e.g. PRM-FST), name, category, or brand..."
                    className="w-full bg-[#111418] border border-[var(--line)] rounded-[var(--radius-md)] pl-10 pr-9 py-2 text-xs text-white placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:shadow-[var(--glow-sm)] outline-none transition-all"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white"
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Mobile Filter Button (Toggle Drawer) */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center justify-center gap-2 py-2 px-3 rounded-[var(--radius-md)] bg-[#141a21] border border-[var(--line)] text-xs text-white hover:border-[var(--blue)] cursor-pointer"
                >
                  <Filter size={14} className="text-[var(--blue)]" />
                  <span>Category Directory & Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-[var(--blue)]" />
                  )}
                </button>

                {/* Controls Right: View Mode Toggle & Sort */}
                <div className="flex items-center gap-3 justify-between md:justify-end">
                  
                  {/* View Mode Toggle: Table (List) vs Grid */}
                  <div className="flex items-center bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] p-0.5">
                    <button
                      type="button"
                      onClick={() => setViewMode('table')}
                      title="EIS Table View"
                      className={`p-1.5 rounded-[var(--radius-sm)] text-xs flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                        viewMode === 'table'
                          ? 'bg-[var(--blue)] text-white shadow-xs'
                          : 'text-[var(--muted)] hover:text-white'
                      }`}
                    >
                      <List size={15} />
                      <span className="hidden sm:inline">Table</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      title="Grid Card View"
                      className={`p-1.5 rounded-[var(--radius-sm)] text-xs flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-[var(--blue)] text-white shadow-xs'
                          : 'text-[var(--muted)] hover:text-white'
                      }`}
                    >
                      <LayoutGrid size={15} />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                  </div>

                  {/* Sort Selector */}
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                    <span className="hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] text-xs text-white px-2.5 py-1.5 outline-none focus:border-[var(--blue)] cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="sku-asc">SKU (A to Z)</option>
                      <option value="sku-desc">SKU (Z to A)</option>
                      <option value="name-asc">Name (A to Z)</option>
                      <option value="name-desc">Name (Z to A)</option>
                    </select>
                  </div>

                  {/* Items per page */}
                  <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--muted)]">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                      className="bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] text-xs text-white px-2 py-1.5 outline-none cursor-pointer"
                    >
                      <option value={12}>12 / page</option>
                      <option value={24}>24 / page</option>
                      <option value={48}>48 / page</option>
                      <option value={120}>All items</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips Row */}
              {hasActiveFilters && (
                <div className="pt-2 border-t border-[var(--line)]/60 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[var(--muted)] text-[11px] font-bold">Active Filters:</span>
                  
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--blue-dark)]/40 border border-[var(--blue)]/60 text-white text-[11px]">
                      Category: {currentCategoryObj?.name.split('&')[0]}
                      <button
                        type="button"
                        onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }}
                        className="hover:text-red-300 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedSubcategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--blue-dark)]/40 border border-[var(--blue)]/60 text-white text-[11px]">
                      Sub: {currentSubcategoryObj?.name}
                      <button
                        type="button"
                        onClick={() => setSelectedSubcategory('all')}
                        className="hover:text-red-300 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedBrand !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1b222a] border border-[var(--line)] text-white text-[11px]">
                      Brand: {selectedBrand}
                      <button
                        type="button"
                        onClick={() => setSelectedBrand('all')}
                        className="hover:text-red-300 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {selectedRange !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1b222a] border border-[var(--line)] text-white text-[11px]">
                      Division: {RANGES.find(r => r.id === selectedRange)?.name}
                      <button
                        type="button"
                        onClick={() => setSelectedRange('all')}
                        className="hover:text-red-300 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {inStockOnly && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-[11px]">
                      In Stock Only
                      <button
                        type="button"
                        onClick={() => setInStockOnly(false)}
                        className="hover:text-red-300 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {search.trim() && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1b222a] border border-[var(--line)] text-white text-[11px]">
                      "{search}"
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="hover:text-red-300 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="ml-auto text-[11px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Status Bar: Count of items matching */}
              <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-1">
                <span>
                  Showing <strong className="text-white">{paginatedProducts.length}</strong> of{' '}
                  <strong className="text-white">{totalItems}</strong> matching parts
                </span>
                <span className="text-[11px] font-mono text-[var(--blue)]">
                  Alberton Logistics Depot
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* VIEW MODE: 1. INDUSTRIAL TABLE / LIST VIEW                */}
            {/* Fits 100% within the main page without side scrolling     */}
            {/* ======================================================== */}
            {viewMode === 'table' && paginatedProducts.length > 0 && (
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] shadow-sm w-full overflow-hidden">
                {/* Desktop & Tablet Table (sm:block) - Zero horizontal scroll */}
                <div className="hidden sm:block w-full">
                  <table className="w-full text-left border-collapse text-xs table-auto">
                    <thead>
                      <tr className="bg-[#111418] border-b border-[var(--line)] text-[var(--muted)] text-[11px] font-bold uppercase tracking-wider">
                        <th className="py-3 px-3.5 w-44">Part / SKU</th>
                        <th className="py-3 px-3.5">Product Description</th>
                        <th className="py-3 px-3.5 w-28 text-center">Availability</th>
                        <th className="py-3 px-3.5 w-60 text-right">Order</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--line)]/60 text-[var(--silver)]">
                      {paginatedProducts.map((product) => {
                        const inQuote = items.some(i => i.sku === product.sku);
                        const itemQty = quantities[product.sku] || 1;

                        return (
                          <tr
                            key={product.sku}
                            className="hover:bg-[#12161c] transition-colors group"
                          >
                            {/* SKU Column & Preview Thumbnail */}
                            <td className="py-3 px-3.5 align-middle">
                              <div className="flex items-center gap-2">
                                <div
                                  onClick={() => onSelectProduct(product)}
                                  className="w-10 h-9 rounded bg-[#07090c] border border-[var(--line)] overflow-hidden flex items-center justify-center shrink-0 cursor-pointer hover:border-[var(--blue)] transition-colors"
                                  title="View product"
                                >
                                  <ProductGraphic
                                    sku={product.sku}
                                    category={product.category}
                                    name={product.name}
                                    className="scale-75"
                                  />
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="font-mono font-bold text-white bg-[#141920] border border-[var(--line)] px-2 py-0.5 rounded text-[11px] text-[var(--blue)]">
                                    {product.sku}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopySku(product.sku, e)}
                                    className="text-[var(--muted)] hover:text-white p-1 rounded hover:bg-[#1a2028] transition-colors cursor-pointer"
                                    title="Copy SKU code"
                                  >
                                    {copiedSku === product.sku ? (
                                      <Check size={12} className="text-emerald-400" />
                                    ) : (
                                      <Copy size={12} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </td>

                            {/* Product Description (NO Technical Specs) */}
                            <td className="py-3 px-3.5 align-middle">
                              <div>
                                <h4
                                  onClick={() => onSelectProduct(product)}
                                  className="font-bold text-white hover:text-[var(--blue)] transition-colors cursor-pointer leading-snug line-clamp-2"
                                >
                                  {product.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px]">
                                  <span className="text-[var(--blue)] font-medium">
                                    {product.subcategoryName || product.categoryName}
                                  </span>
                                  <span className="text-[var(--muted)]">·</span>
                                  <span className="text-[var(--bright)] font-semibold bg-[#141920] px-1.5 py-0.2 rounded border border-[var(--line)] text-[10px]">
                                    {product.brand}
                                  </span>
                                  <span className="text-[var(--muted)]">·</span>
                                  <span className="text-[var(--silver)] text-[11px]">
                                    {product.unit}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Availability */}
                            <td className="py-3 px-3.5 text-center align-middle whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                In Stock
                              </span>
                            </td>

                            {/* Order Stepper + Add to Quote */}
                            <td className="py-3 px-3.5 text-right align-middle whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <div className="inline-flex items-center border border-[var(--line)] rounded-[var(--radius-sm)] bg-[#101418] overflow-hidden shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleQtyChange(product.sku, -1)}
                                    className="px-2 py-1 text-[var(--muted)] hover:text-white hover:bg-[#192027] cursor-pointer"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={11} />
                                  </button>
                                  <input
                                    type="text"
                                    value={itemQty}
                                    onChange={(e) => handleDirectQtyInput(product.sku, e.target.value)}
                                    className="w-7 text-center text-xs font-bold text-white bg-transparent outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleQtyChange(product.sku, 1)}
                                    className="px-2 py-1 text-[var(--muted)] hover:text-white hover:bg-[#192027] cursor-pointer"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => handleAddProductToQuote(product, e)}
                                  className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                                    inQuote
                                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/60'
                                      : 'bg-[var(--blue)] text-white hover:bg-[var(--blue-dark)] hover:shadow-[var(--glow-sm)]'
                                  }`}
                                >
                                  {inQuote ? (
                                    <>
                                      <Check size={13} /> In Quote
                                    </>
                                  ) : (
                                    <>
                                      <Plus size={13} /> Add to Quote
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View (< 640px) - Stacked cards fitting 100% width with zero side scroll */}
                <div className="block sm:hidden divide-y divide-[var(--line)]/60">
                  {paginatedProducts.map((product) => {
                    const inQuote = items.some(i => i.sku === product.sku);
                    const itemQty = quantities[product.sku] || 1;

                    return (
                      <div key={product.sku} className="p-3.5 flex flex-col gap-2.5 bg-[#0b0e12]">
                        {/* Top: SKU, Brand, Stock */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[var(--blue)] bg-[#141920] border border-[var(--line)] px-2 py-0.5 rounded text-[11px]">
                              {product.sku}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleCopySku(product.sku, e)}
                              className="text-[var(--muted)] hover:text-white p-1"
                            >
                              {copiedSku === product.sku ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-[var(--bright)] bg-[#141920] px-1.5 py-0.5 rounded border border-[var(--line)]">
                              {product.brand}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              In Stock
                            </span>
                          </div>
                        </div>

                        {/* Middle: Thumbnail + Title + Unit */}
                        <div className="flex items-start gap-3">
                          <div
                            onClick={() => onSelectProduct(product)}
                            className="w-11 h-10 rounded bg-[#07090c] border border-[var(--line)] overflow-hidden flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            <ProductGraphic
                              sku={product.sku}
                              category={product.category}
                              name={product.name}
                              className="scale-75"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              onClick={() => onSelectProduct(product)}
                              className="font-bold text-white text-xs leading-snug line-clamp-2 cursor-pointer hover:text-[var(--blue)]"
                            >
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-[var(--muted)] mt-0.5">
                              Unit: <span className="text-[var(--silver)] font-medium">{product.unit}</span>
                            </p>
                          </div>
                        </div>

                        {/* Bottom: Stepper + Add to Quote */}
                        <div className="flex items-center justify-between gap-3 pt-1 border-t border-[var(--line)]/40">
                          <div className="inline-flex items-center border border-[var(--line)] rounded-[var(--radius-sm)] bg-[#101418] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.sku, -1)}
                              className="px-2 py-1 text-[var(--muted)] hover:text-white"
                            >
                              <Minus size={11} />
                            </button>
                            <input
                              type="text"
                              value={itemQty}
                              onChange={(e) => handleDirectQtyInput(product.sku, e.target.value)}
                              className="w-7 text-center text-xs font-bold text-white bg-transparent outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.sku, 1)}
                              className="px-2 py-1 text-[var(--muted)] hover:text-white"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleAddProductToQuote(product, e)}
                            className={`flex-1 py-1.5 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                              inQuote
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50'
                                : 'bg-[var(--blue)] text-white hover:bg-[var(--blue-dark)]'
                            }`}
                          >
                            {inQuote ? (
                              <>
                                <Check size={13} /> In Quote (+{itemQty})
                              </>
                            ) : (
                              <>
                                <Plus size={13} /> Add to Quote
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* VIEW MODE: 2. GRID CARDS VIEW                           */}
            {/* Fits 100% within the main page without side scrolling     */}
            {/* ======================================================== */}
            {viewMode === 'grid' && paginatedProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {paginatedProducts.map((product) => {
                  const inQuote = items.some(i => i.sku === product.sku);
                  const itemQty = quantities[product.sku] || 1;

                  return (
                    <article
                      key={product.sku}
                      className="group bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden flex flex-col justify-between transition-all duration-[var(--dur)] hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)]"
                    >
                      {/* Card Image Area */}
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="relative h-44 w-full bg-[#07090c] cursor-pointer overflow-hidden border-b border-[var(--line)] flex items-center justify-center"
                      >
                        <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold uppercase tracking-wider bg-[#111418]/90 text-[var(--blue)] border border-[var(--line)] px-2 py-0.5 rounded-[var(--radius-sm)] backdrop-blur-xs">
                          {product.subcategoryName || product.categoryName}
                        </span>

                        <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-105">
                          <ProductGraphic
                            sku={product.sku}
                            category={product.category}
                            name={product.name}
                          />
                        </div>
                      </div>

                      {/* Card Content (NO Technical Specs) */}
                      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-mono font-bold text-[var(--blue)] bg-[#111418] px-2 py-0.5 rounded border border-[var(--line)]">
                                {product.sku}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleCopySku(product.sku, e)}
                                className="text-[var(--muted)] hover:text-white p-0.5"
                                title="Copy SKU"
                              >
                                {copiedSku === product.sku ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                              </button>
                            </div>

                            <span className="text-[11px] font-semibold text-white">
                              {product.brand}
                            </span>
                          </div>

                          <h3
                            onClick={() => onSelectProduct(product)}
                            className="text-sm font-bold text-[var(--bright)] line-clamp-2 cursor-pointer hover:text-[var(--blue)] transition-colors leading-snug"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs text-[var(--muted)] mt-1">
                            Pack: <span className="text-[var(--silver)] font-medium">{product.unit}</span>
                          </p>
                        </div>

                        {/* Card Footer: Quantity + Add to Quote */}
                        <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between gap-2">
                          <div className="inline-flex items-center border border-[var(--line)] rounded-[var(--radius-sm)] bg-[#101418] overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.sku, -1)}
                              className="px-1.5 py-1 text-[var(--muted)] hover:text-white"
                            >
                              <Minus size={11} />
                            </button>
                            <input
                              type="text"
                              value={itemQty}
                              onChange={(e) => handleDirectQtyInput(product.sku, e.target.value)}
                              className="w-7 text-center text-xs font-bold text-white bg-transparent outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleQtyChange(product.sku, 1)}
                              className="px-1.5 py-1 text-[var(--muted)] hover:text-white"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleAddProductToQuote(product, e)}
                            className={`flex-1 py-2 px-3 rounded-[var(--radius-sm)] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              inQuote
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50'
                                : 'bg-[var(--blue)] text-white hover:bg-[var(--blue-dark)] hover:shadow-[var(--glow-sm)]'
                            }`}
                          >
                            {inQuote ? (
                              <>
                                <Check size={13} /> In Quote (+{itemQty})
                              </>
                            ) : (
                              <>
                                <Plus size={13} /> Add to Quote
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {paginatedProducts.length === 0 && (
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#111418] border border-[var(--line)] flex items-center justify-center text-[var(--muted)]">
                  <Package size={28} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  No parts found matching your criteria
                </h3>
                <p className="text-xs text-[var(--muted)] max-w-md">
                  We might still stock this component at our Alberton depot or be able to source it via Dean's procurement network.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="button-secondary text-xs"
                  >
                    <span>Reset All Filters</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('parts-sourcing', { query: search })}
                    className="button text-xs"
                  >
                    <span>Source This Part</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[var(--muted)]">
                  Page <strong className="text-white">{currentPage}</strong> of{' '}
                  <strong className="text-white">{totalPages}</strong> ({totalItems} items total)
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold bg-[#111418] border border-[var(--line)] text-white hover:border-[var(--blue)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                    }
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-[var(--radius-sm)] text-xs font-bold transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[var(--blue)] text-white shadow-[var(--glow-sm)]'
                            : 'bg-[#111418] border border-[var(--line)] text-[var(--muted)] hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold bg-[#111418] border border-[var(--line)] text-white hover:border-[var(--blue)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE CATEGORY & FILTER DRAWER                         */}
      {/* ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#0b0e12] border-r border-[var(--line)] h-full overflow-y-auto p-5 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[var(--blue)]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Categories & Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-[#111418] border border-[var(--line)] text-[var(--muted)] hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Category Directory */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                Categories
              </h4>
              {renderCategoryTree()}
            </div>

            {/* Facet Filters */}
            <div className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
              <div>
                <label className="text-xs font-bold text-[var(--muted)] block mb-1">
                  Brand / Manufacturer
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] text-xs text-white p-2"
                >
                  <option value="all">All Brands</option>
                  {BRANDS.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[var(--muted)] block mb-1">
                  Supply Division
                </label>
                <select
                  value={selectedRange}
                  onChange={(e) => { setSelectedRange(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#111418] border border-[var(--line)] rounded-[var(--radius-sm)] text-xs text-white p-2"
                >
                  <option value="all">All Divisions</option>
                  {RANGES.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs text-[var(--silver)]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded border-[var(--line)] text-[var(--blue)] accent-[var(--blue)]"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-4 border-t border-[var(--line)] flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-1/2 button-secondary text-xs py-2"
              >
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 button text-xs py-2"
              >
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FLOATING QUICK QUOTE SUMMARY BAR (Appears when items > 0) */}
      {/* ======================================================== */}
      {totalCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl bg-[#0b0e12]/95 backdrop-blur-md border border-[var(--blue)] rounded-[var(--radius-xl)] p-3 sm:p-4 shadow-[var(--glow-lg)] flex items-center justify-between gap-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--blue)] text-white flex items-center justify-center font-extrabold text-sm shadow-[var(--glow-sm)]">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-white">
                Quote Request Active: <span className="text-[var(--blue)]">{totalCount} item{totalCount > 1 ? 's' : ''}</span>
              </p>
              <p className="text-[11px] text-[var(--muted)]">
                Direct dispatch from Alberton depot · 30-day terms available
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="button text-xs py-2 px-4 shadow-[var(--glow-md)] shrink-0 cursor-pointer"
          >
            <span>Review & Submit</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
