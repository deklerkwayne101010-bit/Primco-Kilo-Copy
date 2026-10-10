import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { Sparkles, Shield, Droplets, SprayCan, CheckCircle2, ArrowRight } from 'lucide-react';

interface ValetServicesPageProps {
  onNavigate: (page: PageId, extra?: any) => void;
}

export const ValetServicesPage: React.FC<ValetServicesPageProps> = ({ onNavigate }) => {
  const valetPackages = [
    {
      title: 'Body Shop Safe Pre-Delivery Wash',
      desc: '100% silicone-free high foaming shampoos engineered not to cause fish-eyes or surface contamination in neighboring spray booth zones.',
      unit: 'Supplied in 5L & 25L drums',
      icon: <Droplets size={24} className="text-[var(--blue)]" />
    },
    {
      title: 'Final Finish Polish & Swirl Removers',
      desc: 'Micro-fine ceramic cutting compounds that quickly eliminate 2000-grit sanding marks and hologram trails without greasy fillers.',
      unit: 'Supplied in 1L flasks',
      icon: <Sparkles size={24} className="text-[var(--blue)]" />
    },
    {
      title: 'Interior Deep Clean & Odor Neutralizer',
      desc: 'Enzymatic upholstery cleaners that lift overspray dust, grease prints from technician gloves, and interior solvent odors prior to customer handover.',
      unit: 'Supplied in 5L concentrate',
      icon: <SprayCan size={24} className="text-[var(--blue)]" />
    }
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>FINAL PRE-DELIVERY DETAILING</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Panel Shop Valet & Detailing Supplies
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xl">
            Ensure your repaired vehicles leave your workshop in immaculate showroom condition with our specialized bodyshop-safe valet chemicals.
          </p>
        </div>
      </section>

      <Section size="md" background="none" borderBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {valetPackages.map((pkg, idx) => (
            <div
              key={idx}
              className="card-base p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--blue-dark)]/20 border border-[var(--blue)]/40 flex items-center justify-center mb-4">
                  {pkg.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-xs text-[var(--silver)] leading-relaxed mb-6">
                  {pkg.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">{pkg.unit}</span>
                <button
                  type="button"
                  onClick={() => onNavigate('catalogue', { query: 'Detailer' })}
                  className="text-[var(--blue)] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Order Batch</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-8 max-w-3xl mx-auto text-center flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Equip Your Workshop Valet Bay
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-6 max-w-lg">
            We provide full detailing bay setups including high-pressure hose reels, dual-action orbital polishers, microfibre bulk packs, and dilution pumps.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="button text-xs"
          >
            <span>Request Detailing Package Quote</span>
          </button>
        </div>
      </Section>
    </div>
  );
};
