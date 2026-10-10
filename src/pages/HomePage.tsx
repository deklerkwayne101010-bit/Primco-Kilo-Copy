import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { ProductCard } from '../components/ProductCard';
import { RANGES, CATEGORIES, PRODUCTS, TESTIMONIALS, Product } from '../data/catalogue';
import { useVariant } from '../context/VariantContext';
import { HomePageAlt } from './HomePageAlt';
import { HomePageC } from './HomePageC';
import { Search, ArrowRight, ShieldCheck, Truck, Clock, Star, Wrench, Layers, Paintbrush, Disc, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, extra?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { variant } = useVariant();

  // Version B: catalogue-first homepage
  if (variant === 'B') {
    return <HomePageAlt onNavigate={onNavigate} onSelectProduct={onSelectProduct} />;
  }

  // Version C: premium catalogue-first homepage
  if (variant === 'C') {
    return <HomePageC onNavigate={onNavigate} onSelectProduct={onSelectProduct} />;
  }

  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('catalogue', { query: searchQuery });
  };

  const getRangeIcon = (rangeId: string) => {
    switch (rangeId) {
      case 'automotive-parts': return <Wrench className="text-[var(--blue)]" size={28} />;
      case 'vehicle-glass': return <Layers className="text-[var(--blue)]" size={28} />;
      case 'paint-solutions': return <Paintbrush className="text-[var(--blue)]" size={28} />;
      default: return <Disc className="text-[var(--blue)]" size={28} />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* 3.1 Hero Section (Custom, not componentized) */}
      <section className="relative min-h-[580px] h-[min(640px,72vw)] flex items-center justify-center overflow-hidden border-b border-[var(--line)]">
        {/* Background dark gradients & real hero image from primeco.co.za */}
        <div className="absolute inset-0 bg-[#050607]">
          <img
            src="/assets/images/primeco-hero-cars.jpg"
            alt="Primeco automotive repair workshop vehicles"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity filter contrast-125"
          />
        </div>
        
        {/* Radial brand overlay per spec: radial-gradient(120% 90% at 18% 55%, rgba(17,152,232,.22), transparent 62%) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(120% 90% at 18% 55%, rgba(17,152,232,0.28), transparent 62%)'
          }}
        />

        {/* Dark linear gradient overlays per spec */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.82) 42%, rgba(0,0,0,0.45) 80%), linear-gradient(0deg, rgba(0,0,0,0.65), transparent 50%)'
          }}
        />

        {/* Blueprint geometric automotive line grid */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(var(--blue)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Hero Content container */}
        <div className="container relative z-10 py-12">
          <div className="max-w-[720px] flex flex-col items-start">
            {/* Eyebrow */}
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <span>YOUR ONE-STOP PANEL SHOP SUPPLY PARTNER</span>
            </div>

            {/* H1 Title: "Primeco helps keep your workshop moving." */}
            <h1 className="mb-4">
              <span className="text-[var(--blue)]">Primeco</span> helps keep your workshop moving.
            </h1>

            {/* Description: 1 line, muted, max 480px */}
            <p className="text-[var(--muted)] text-base md:text-lg max-w-[480px] mb-8 leading-relaxed">
              Fast, dependable replacement parts, OE windscreens, and premium refinish supplies dispatched daily across Gauteng.
            </p>

            {/* Actions row: 4 buttons */}
            <div className="flex flex-wrap gap-3 items-center mb-8">
              <button
                type="button"
                onClick={() => onNavigate('catalogue')}
                className="button"
              >
                <span>Browse Products</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('parts-sourcing')}
                className="button-secondary"
              >
                <span>Source a Part</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('quick-order')}
                className="button-secondary"
              >
                <span>Upload Order</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="button-secondary"
              >
                <span>Request Quote</span>
              </button>
            </div>

            {/* Caption: Status dot + PRIMECO SUPPLIES · ALBERTON, GAUTENG + Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2.5 text-[var(--silver)] font-bold tracking-wider">
                <span className="status-dot" />
                <span className="font-mono text-[11px]">PRIMECO SUPPLIES · ALBERTON, GAUTENG</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10 text-[11px] text-[var(--muted)]">
                <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
                  <ShieldCheck size={13} /> SABS 1191 Glass
                </span>
                <span className="text-white/20">•</span>
                <span className="inline-flex items-center gap-1 text-[var(--blue)] font-mono">
                  <Sparkles size={13} /> 100% OE Fitment
                </span>
                <span className="text-white/20">•</span>
                <span className="font-mono text-white/80">
                  Level 2 B-BBEE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Spec Box (bottom-right) */}
        <div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-3 text-xs tracking-wider text-[var(--silver)] bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg shadow-2xl">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-[var(--muted)] font-mono">DISPATCH STATUS</span>
            <span className="text-xs font-bold text-white flex items-center justify-end gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> ACTIVE · SAME-DAY GAUTENG
            </span>
          </div>
        </div>
      </section>

      {/* Search Section (size="md" background="none") */}
      <Section size="sm" background="none" className="border-b border-[var(--line)]">
        <div className="max-w-4xl mx-auto">
          <SectionHead
            eyebrow="KNOW WHAT YOU NEED?"
            title="Find your next workshop essential."
            description="Search by OEM part number, Mirka/3M grit, paint formulation, or component category."
            align="start"
          />

          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter part SKU (e.g. PRM-BRK-019), windscreen code, or item..."
                  className="w-full h-[59px] pl-12 pr-4 bg-[#0d1015] border border-[var(--line)] rounded-[var(--radius-md)] text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:outline-none focus:shadow-[var(--glow-sm)] transition-all"
                />
              </div>

              <button
                type="submit"
                className="button h-[59px] px-8 text-sm"
              >
                <span>Search Catalogue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </Section>

      {/* Range Section (size="lg" background="wash" borderBlock) */}
      <Section size="md" background="wash" borderBlock>
        <SectionHead
          eyebrow="PRODUCT DIVISIONS"
          title={<>Engineered for <span className="text-[var(--blue)]">Collision Repairers</span></>}
          description="Four dedicated supply categories keeping panel shops, glass fitters, and commercial workshops equipped."
          align="between"
          action={
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="button-secondary"
            >
              <span>Explore All Divisions</span>
              <ArrowRight size={15} />
            </button>
          }
        />

        {/* 4-column grid (desktop), 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RANGES.map((range, idx) => (
            <div
              key={range.id}
              onClick={() => onNavigate('catalogue', { range: range.id })}
              className="card-interactive overflow-hidden flex flex-col justify-between group rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--grad-surface)] hover:border-[var(--blue)] hover:shadow-[var(--glow-lg)] transition-all"
            >
              {/* Full-bleed range image from primeco.co.za */}
              <div className="relative h-48 w-full bg-[#07090c] overflow-hidden border-b border-[var(--line)]">
                <img
                  src={range.image}
                  alt={`Primeco ${range.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] via-[#0e1216]/40 to-transparent" />
                
                <span className="absolute top-3 right-3 text-[11px] font-mono font-bold text-white bg-black/75 px-2.5 py-0.5 rounded border border-[var(--line)] backdrop-blur-xs">
                  0{idx + 1}
                </span>

                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--blue)] block">
                    {range.highlight}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[var(--blue)] transition-colors mb-2">
                    {range.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">
                    {range.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-bold text-[var(--bright)] group-hover:text-[var(--blue)] transition-colors">
                  <span>Browse {range.itemCount}+ Items</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-[var(--blue)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Category Section (8 Categories Grid) */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="EXPANSIVE WORKSHOP INVENTORY"
          title="Browse by Workshop Category"
          description="Everything from structural monobolt fasteners to 2K clearcoats and spray booth respiratory kits."
          align="start"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onNavigate('catalogue', { category: cat.slug })}
              className="card-interactive p-5 min-h-[160px] flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--blue)] tracking-wider">
                  {cat.productCount}+ Listed Items
                </span>
                <h3 className="text-base font-bold text-white mt-1 group-hover:text-[var(--blue)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-[var(--silver)] group-hover:text-[var(--blue)] pt-2 border-t border-[var(--line)]">
                <span>View category</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Section (8 featured products) */}
      <Section size="md" background="wash" borderBlock>
        <SectionHead
          eyebrow="WORKSHOP SPECIALTIES"
          title="Featured Workshop Essentials"
          description="High-demand OEM-approved components in continuous stock at our Alberton distribution depot."
          align="between"
          action={
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="button-secondary"
            >
              <span>View all products</span>
              <ArrowRight size={15} />
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </Section>

      {/* Value Pillars Banner */}
      <Section size="sm" background="none" className="border-b border-[var(--line)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-[var(--radius-lg)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--blue)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--blue-dark)]/25 border border-[var(--blue)]/50 rounded-[var(--radius-md)] text-[var(--blue)] shadow-[0_0_15px_rgba(17,152,232,0.2)]">
              <Truck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-white text-sm">Gauteng Rapid Delivery</h4>
                <span className="text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                  &lt; 2HR FLEET
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Dedicated direct dispatch fleet serving Alberton, Alrode, City Deep, and East Rand panel shops daily.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[var(--radius-lg)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--blue)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--blue-dark)]/25 border border-[var(--blue)]/50 rounded-[var(--radius-md)] text-[var(--blue)] shadow-[0_0_15px_rgba(17,152,232,0.2)]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-white text-sm">OEM & SABS Certified</h4>
                <span className="text-[10px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-500/30 px-1.5 py-0.2 rounded">
                  AUDIT READY
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Shatterprufe, 3M, Wurth, and Spies Hecker compliant formulations meeting strict insurance repair audits.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[var(--radius-lg)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--blue)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--blue-dark)]/25 border border-[var(--blue)]/50 rounded-[var(--radius-md)] text-[var(--blue)] shadow-[0_0_15px_rgba(17,152,232,0.2)]">
              <Clock size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-white text-sm">30-Day Trade Facility</h4>
                <span className="text-[10px] font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded">
                  B2B COMMERCIAL
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Seamless monthly accounts with dedicated account specialists to keep high-volume job cards moving.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section size="md" background="wash" borderBlock>
        <SectionHead
          eyebrow="CLIENT VOICES"
          title={<>Trusted by South Africa's <span className="text-[var(--blue)]">Leading Body Shops</span></>}
          description="Read how Primeco keeps busy Gauteng panel shops operating on schedule without supply bottlenecks."
          align="start"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="card-base p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-xs sm:text-sm text-[var(--silver)] leading-relaxed italic mb-6">
                  "{t.quote}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[11px] text-[var(--blue)]">{t.role}</p>
                <p className="text-[11px] text-[var(--muted)] font-medium">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA Banner */}
      <Section size="sm" background="none">
        <div className="bg-gradient-to-r from-[var(--blue-dark)]/40 via-[#111418] to-[var(--blue-dark)]/20 border border-[var(--blue)]/40 rounded-[var(--radius-xl)] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[var(--glow-sm)]">
          <div className="max-w-xl">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              DIRECT DISPATCH
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
              Ready to streamline your workshop procurement?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Compile your quote list now or upload your regular workshop consumables CSV order. Dean and our team are on standby.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('quote')}
              className="button"
            >
              <span>Request Quote Now</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('parts-sourcing')}
              className="button-secondary"
            >
              <span>Source a Rare Part</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
