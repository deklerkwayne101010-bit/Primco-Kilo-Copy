import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { Building2, Truck, ShieldCheck, FileCheck2, MapPin, Users } from 'lucide-react';

interface CompanyProfilePageProps {
  onNavigate: (page: PageId) => void;
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ onNavigate }) => {
  const profilePillars = [
    {
      eyebrow: 'FACILITY & WAREHOUSE',
      name: 'Alberton Distribution Depot',
      desc: 'Centralized warehousing in the heart of Gauteng industrial corridor with over 1,200 active SKUs of collision repair parts, laminated glass racks, and temperature-controlled paint storage.',
      badge: 'Alberton, Gauteng'
    },
    {
      eyebrow: 'LOGISTICS INFRASTRUCTURE',
      name: 'Dedicated Gauteng Delivery Fleet',
      desc: 'Equipped with custom glass fitment racks, securing fragile curved windscreens and bulk drums directly to customer panel shop receiving bays within guaranteed route windows.',
      badge: 'Daily Dispatch'
    },
    {
      eyebrow: 'REGULATORY COMPLIANCE',
      name: 'Level 2 B-BBEE & SABS Certified',
      desc: 'Full compliance with South African procurement statutes, enterprise development credits, and rigorous product batch traceability for insurance assessor audits.',
      badge: 'Certified Contributor'
    }
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>ENTERPRISE OVERVIEW</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Primeco Supplies Company Profile
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xl">
            Established to provide automotive body repair centres, insurance restoration shops, and transport fleets with seamless consumable procurement and rapid turnaround times.
          </p>
        </div>
      </section>

      <Section size="md" background="none" borderBlock>
        {/* Real Warehouse Facility Banner from primeco.co.za */}
        <div className="relative h-64 md:h-80 w-full rounded-[var(--radius-xl)] overflow-hidden border border-[var(--line)] mb-12 shadow-[var(--glow-sm)]">
          <img
            src="/assets/images/company-profile-warehouse.png"
            alt="Primeco Supplies warehouse and distribution depot"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--blue)] bg-black/80 px-2.5 py-1 rounded border border-[var(--line)]">
                ALBERTON DISTRIBUTION HUB
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-2">
                Central Logistics & Collision Supply Depot
              </h2>
            </div>
            <span className="hidden sm:inline text-xs text-[var(--muted)] font-mono bg-black/70 px-3 py-1 rounded border border-[var(--line)]">
              GAUTENG · ALRODE · SOUTH AFRICA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {profilePillars.map((p, idx) => (
            <div
              key={idx}
              className="card-base p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all"
            >
              <div>
                <span className="text-[10px] font-extrabold tracking-wider text-[var(--blue)] uppercase mb-2 block">
                  {p.eyebrow}
                </span>
                <h3 className="text-lg font-bold text-white mb-3">{p.name}</h3>
                <p className="text-xs text-[var(--silver)] leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">Status:</span>
                <span className="font-bold text-[var(--blue)]">{p.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Detail Cards */}
        <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">
            Legal & Registration Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--silver)]">
            <div className="p-3 bg-[#111418] border border-[var(--line)] rounded">
              <span className="text-[var(--muted)] block mb-1">Registered Entity:</span>
              <strong className="text-white text-sm">Primeco Supplies (Pty) Ltd</strong>
            </div>
            <div className="p-3 bg-[#111418] border border-[var(--line)] rounded">
              <span className="text-[var(--muted)] block mb-1">Company Registration:</span>
              <strong className="text-white text-sm">2021/892401/07</strong>
            </div>
            <div className="p-3 bg-[#111418] border border-[var(--line)] rounded">
              <span className="text-[var(--muted)] block mb-1">Tax / VAT Jurisdiction:</span>
              <strong className="text-white text-sm">SARS Registered VAT Vendor</strong>
            </div>
            <div className="p-3 bg-[#111418] border border-[var(--line)] rounded">
              <span className="text-[var(--muted)] block mb-1">B-BBEE Recognition:</span>
              <strong className="text-white text-sm">125% Procurement Recognition (Level 2)</strong>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="button text-xs"
            >
              <span>Contact Executive Team</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
