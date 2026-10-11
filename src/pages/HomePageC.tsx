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

interface HomePageCProps {
  onNavigate: (page: PageId, extra?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePageC: React.FC<HomePageCProps> = ({
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
        return <Wrench className="text-[var(--gold)]" size={26} />;
      case 'vehicle-glass':
        return <Layers className="text-[var(--violet)]" size={26} />;
      case 'paint-solutions':
        return <Paintbrush className="text-[var(--cyan)]" size={26} />;
      default:
        return <Disc className="text-[var(--gold)]" size={26} />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* ============================================================
          PREMIUM CATALOGUE-FIRST HERO
          ============================================================ */}
      <section className="relative border-b border-[var(--line)] overflow-hidden">
        {/* aurora + radial glow */}
        <div className="aurora" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(17,152,232,.18), transparent 62%)',
          }}
        />

        <div className="container relative py-16 lg:py-24">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <span className="metallic-badge text-[10px] font-extrabold tracking-[0.22em] uppercase text-[var(--gold)] px-4 py-1.5 rounded-full mb-6">
              Browse the Catalogue
            </span>

            <h1 className="premium-text text-4xl lg:text-5xl font-extrabold mb-5">
              Your workshop parts, front and centre.
            </h1>

            <p className="text-[var(--muted)] text-base md:text-lg max-w-[580px] mb-10 leading-relaxed">
              2,300+ certified collision parts, laminated glass, refinish
              coatings and consumables — dispatched same-day across Gauteng.
            </p>

            {/* Premium glass search */}
            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl">
              <div className="glass-panel relative rounded-[var(--radius-xl)] p-2 shadow-[var(--glow-premium)]">
                <div className="relative">
                  <Search
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by SKU, part name, brand, or category…"
                    className="w-full h-[60px] pl-13 pr-32 bg-transparent border border-transparent focus:border-[var(--gold)] rounded-[var(--radius-lg)] text-sm text-white placeholder:text-[var(--muted)] focus:outline-none focus:shadow-[var(--glow-gold)] transition-all"
                  />
                  <button
                    type="submit"
                    className="button absolute right-2 top-1/2 -translate-y-1/2 h-12 px-5 text-sm"
                  >
                    <span className="hidden sm:inline">Search</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </form>

            {/* Division tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-7">
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

      {/* Category quick-jump — metallic chips */}
      <Section size="sm" background="none" borderBlock>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)] mr-1">
            Shop by category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onNavigate('catalogue', { category: cat.slug })}
              className="metallic-badge px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-semibold text-[var(--silver)] hover:text-white transition-all cursor-pointer"
            >
              {cat.name.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </Section>

      {/* Featured stock — catalogue is the hero content */}
      <Section size="md" background="wash" borderBlock>
        <SectionHead
          eyebrow="Featured Stock"
          title={
            <span className="premium-text">
              Workshop essentials in demand
            </span>
          }
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
            <div key={product.sku} className="float-y">
              <ProductCard
                product={product}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Divisions strip — premium gradient cards */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="Product Divisions"
          title={
            <>
              Three supply{' '}
              <span className="premium-text">divisions</span>
            </>
          }
          description="Dedicated ranges keeping panel shops and commercial workshops equipped."
          align="start"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RANGES.map((range, idx) => (
            <div
              key={range.id}
              onClick={() => onNavigate('catalogue', { range: range.id })}
              className="card-interactive overflow-hidden flex flex-col group cursor-pointer float-y"
            >
              <div className="relative h-40 w-full bg-[#07090c] overflow-hidden border-b border-[var(--line)]">
                <img
                  src={range.image}
                  alt={range.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] via-[#0e1216]/40 to-transparent" />
                <span className="metallic-badge absolute top-3 right-3 text-[11px] font-mono font-bold text-white px-2.5 py-0.5 rounded">
                  0{idx + 1}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {getRangeIcon(range.id)}
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--gold)] transition-colors">
                      {range.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">
                    {range.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-bold text-[var(--bright)] group-hover:text-[var(--gold)] transition-colors">
                  <span>{range.itemCount}+ items</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1.5 transition-transform text-[var(--gold)]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Value pillars — glass panels */}
      <Section size="sm" background="wash" borderBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-[var(--radius-xl)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--gold)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--gold)]/15 border border-[var(--gold)]/40 rounded-[var(--radius-md)] text-[var(--gold)] shadow-[var(--glow-gold)]">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                Gauteng Rapid Delivery
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Dedicated direct dispatch fleet serving Alberton, Alrode,
                City Deep, and East Rand panel shops daily.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[var(--radius-xl)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--violet)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--violet)]/15 border border-[var(--violet)]/40 rounded-[var(--radius-md)] text-[var(--violet)]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                OEM &amp; SABS Certified
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Shatterprufe, 3M, Wurth, and Spies Hecker compliant
                formulations meeting strict insurance repair audits.
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[var(--radius-xl)] flex items-start gap-4 transition-all duration-300 hover:border-[var(--cyan)]/60 hover:-translate-y-1">
            <div className="p-3 bg-[var(--cyan)]/15 border border-[var(--cyan)]/40 rounded-[var(--radius-md)] text-[var(--cyan)]">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                30-Day Trade Facility
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Seamless monthly accounts with dedicated account specialists
                to keep high-volume job cards moving.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="Client Voices"
          title={
            <>
              Trusted by South Africa's{' '}
              <span className="premium-text">Leading Body Shops</span>
            </>
          }
          description="Read how Primeco keeps busy Gauteng panel shops operating on schedule."
          align="start"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[var(--glow-premium)] transition-all rounded-[var(--radius-xl)]"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[var(--gold)]">
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
                <p className="text-[11px] text-[var(--gold)]">{t.role}</p>
                <p className="text-[11px] text-[var(--muted)] font-medium">
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Premium CTA */}
      <Section size="sm" background="wash">
        <div className="card-interactive relative overflow-hidden bg-gradient-to-r from-[var(--blue-dark)]/40 via-[#111418] to-[var(--violet)]/30 border border-[var(--gold)]/40 rounded-[var(--radius-xl)] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[var(--glow-premium)]">
          <div className="absolute inset-0 aurora" />
          <div className="relative max-w-xl">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              Direct Dispatch
            </span>
            <h2 className="premium-text text-2xl lg:text-3xl font-extrabold mb-2">
              Ready to streamline your workshop procurement?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Compile your quote list now or upload your regular workshop
              consumables CSV order. Dean and our team are on standby.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-3 shrink-0">
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
