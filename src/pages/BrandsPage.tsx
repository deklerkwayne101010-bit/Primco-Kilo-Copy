import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { BRANDS } from '../data/catalogue';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface BrandsPageProps {
  onNavigate: (page: PageId, extra?: any) => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>OEM PARTNER MANUFACTURERS</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Authorized Brands & Manufacturers
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xl">
            Primeco distributes exclusively authenticated, genuine brands compliant with South African insurance guarantees and OEM collision repair standards.
          </p>
        </div>
      </section>

      <Section size="md" background="none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              onClick={() => onNavigate('catalogue', { brand: brand.name })}
              className="card-interactive min-h-[140px] p-6 flex flex-col items-center justify-center text-center group"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-extrabold text-white group-hover:text-[var(--blue)] transition-colors tracking-tight">
                  {brand.name}
                </span>
                <p className="text-[11px] text-[var(--muted)] line-clamp-1">
                  {brand.tag}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-[var(--blue)] font-bold uppercase tracking-wider mt-2 opacity-80 group-hover:opacity-100">
                  <span>View {brand.count}+ Products</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
