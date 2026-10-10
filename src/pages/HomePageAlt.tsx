import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { ProductCard } from '../components/ProductCard';
import { RANGES, CATEGORIES, PRODUCTS, TESTIMONIALS, Product } from '../data/catalogue';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Star,
  Layers,
  Wrench,
  Paintbrush,
  Disc,
  Sparkles,
} from 'lucide-react';

interface HomePageAltProps {
  onNavigate: (page: PageId, extra?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePageAlt: React.FC<HomePageAltProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('catalogue', { query: searchQuery });
  };

  const getRangeIcon = (rangeId: string) => {
    switch (rangeId) {
      case 'automotive-parts':
        return <Wrench className="text-[var(--blue)]" size={26} />;
      case 'vehicle-glass':
        return <Layers className="text-[var(--blue)]" size={26} />;
      case 'paint-solutions':
        return <Paintbrush className="text-[var(--blue)]" size={26} />;
      default:
        return <Disc className="text-[var(--blue)]" size={26} />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* ============================================================
          CATALOGUE-FIRST HERO — the catalogue is the first thing seen
          ============================================================ */}
      <section className="relative border-b border-[var(--line)] bg-[var(--grad-surface)] overflow-hidden">
        {/* soft brand wash + blueprint dot grid */}
        <div className="absolute inset-0 bg-[var(--grad-brand-wash)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(var(--blue)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container relative py-14 lg:py-20">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-line" />
              <span>BROWSE THE CATALOGUE</span>
              <span className="eyebrow-line" />
            </div>

            <h1 className="mb-4">
              Your workshop parts,{' '}
              <span className="text-[var(--blue)]">front and centre.</span>
            </h1>

            <p className="text-[var(--muted)] text-base md:text-lg max-w-[560px] mb-9 leading-relaxed">
              2,300+ certified collision parts, laminated glass, refinish coatings
              and consumables — dispatched same-day across Gauteng.
            </p>

            {/* Large catalogue search */}
            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by SKU (e.g. PRM-BRK-019), part name, brand, or category…"
                  className="w-full h-[64px] pl-13 pr-32 bg-[#0d1015] border border-[var(--line)] rounded-[var(--radius-lg)] text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--blue)] focus:outline-none focus:shadow-[var(--glow-md)] transition-all"
                />
                <button
                  type="submit"
                  className="button absolute right-2 top-1/2 -translate-y-1/2 h-12 px-5 text-sm"
                >
                  <span className="hidden sm:inline">Search</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Division tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => onNavigate('catalogue')}
                className="button-secondary text-xs py-2 px-4 h-9"
              >
                <span>All Divisions</span>
              </button>
              {RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onNavigate('catalogue', { range: r.id })}
                  className="button-secondary text-xs py-2 px-4 h-9"
                >
                  <span>{r.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category quick-jump chips */}
      <Section size="sm" background="none" borderBlock>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mr-1">
            Shop by category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onNavigate('catalogue', { category: cat.slug })}
              className="px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold bg-[#101419] text-[var(--silver)] border border-[var(--line)] hover:border-[var(--blue)] hover:text-white transition-all cursor-pointer"
            >
              {cat.name.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </Section>

      {/* Featured stock — catalogue is the hero content */}
      <Section size="md" background="wash" borderBlock>
        <SectionHead
          eyebrow="FEATURED STOCK"
          title="Workshop essentials in demand"
          description="High-demand OEM-approved components in continuous stock at our Alberton depot."
          align="between"
          action={
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="button-secondary"
            >
              <span>View full catalogue</span>
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

      {/* Divisions strip */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="PRODUCT DIVISIONS"
          title={
            <>
              Four supply{' '}
              <span className="text-[var(--blue)]">divisions</span>
            </>
          }
          description="Dedicated ranges keeping panel shops, glass fitters, and commercial workshops equipped."
          align="start"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RANGES.map((range, idx) => (
            <div
              key={range.id}
              onClick={() => onNavigate('catalogue', { range: range.id })}
              className="card-interactive overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="relative h-40 w-full bg-[#07090c] overflow-hidden border-b border-[var(--line)]">
                <img
                  src={range.image}
                  alt={range.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] via-[#0e1216]/40 to-transparent" />
                <span className="absolute top-3 right-3 text-[11px] font-mono font-bold text-white bg-black/75 px-2.5 py-0.5 rounded border border-[var(--line)]">
                  0{idx + 1}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {getRangeIcon(range.id)}
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--blue)] transition-colors">
                      {range.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {range.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-bold text-[var(--bright)] group-hover:text-[var(--blue)] transition-colors">
                  <span>{range.itemCount}+ items</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1.5 transition-transform text-[var(--blue)]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Value pillars */}
      <Section size="sm" background="wash" borderBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-[var(--radius-lg)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--blue)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--blue-dark)]/25 border border-[var(--blue)]/50 rounded-[var(--radius-md)] text-[var(--blue)]">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                Gauteng Rapid Delivery
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Dedicated direct dispatch fleet serving Alberton, Alrode, City
                Deep, and East Rand panel shops daily.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[var(--radius-lg)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--blue)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--blue-dark)]/25 border border-[var(--blue)]/50 rounded-[var(--radius-md)] text-[var(--blue)]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                OEM & SABS Certified
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Shatterprufe, 3M, Wurth, and Spies Hecker compliant
                formulations meeting strict insurance repair audits.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[var(--radius-lg)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--blue)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--blue-dark)]/25 border border-[var(--blue)]/50 rounded-[var(--radius-md)] text-[var(--blue)]">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                30-Day Trade Facility
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Seamless monthly accounts with dedicated account specialists to
                keep high-volume job cards moving.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="CLIENT VOICES"
          title={
            <>
              Trusted by South Africa's{' '}
              <span className="text-[var(--blue)]">Leading Body Shops</span>
            </>
          }
          description="Read how Primeco keeps busy Gauteng panel shops operating on schedule."
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
                <p className="text-[11px] text-[var(--muted)] font-medium">
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section size="sm" background="wash">
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
              Compile your quote list now or upload your regular workshop
              consumables CSV order. Dean and our team are on standby.
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
