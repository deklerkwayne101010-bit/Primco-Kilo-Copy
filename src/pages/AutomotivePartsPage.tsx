import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { PageHero } from '../components/PageHero';
import { ArrowRight, Car } from 'lucide-react';

interface AutomotivePartsPageProps {
  onNavigate: (page: PageId, extra?: any) => void;
}

export const AutomotivePartsPage: React.FC<AutomotivePartsPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="AUTOMOTIVE PARTS & COMPONENTS"
        title={
          <>
            We don&apos;t just supply workshops.{' '}
            <span className="text-[var(--blue)]">We do automotive parts.</span>
          </>
        }
        description="From a single fastener to a complete assembly, Primeco supplies the components that keep passenger and commercial vehicles on the road."
      />

      {/* Exploded view showcase */}
      <Section size="md" background="none" borderBlock>
        <div className="relative rounded-[var(--radius-xl)] border border-[var(--line)] bg-[#07090c] overflow-hidden shadow-[var(--glow-lg)]">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/70 border border-[var(--line)] text-[var(--blue)] px-3 py-1.5 rounded-full backdrop-blur">
            <Car size={13} />
            Exploded Component View
          </div>
          <img
            src="/assets/images/exploded-sedan.png"
            alt="Exploded technical view of a modern sedan showing automotive components"
            className="w-full h-auto object-contain"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090c] to-transparent pointer-events-none" />
          <p className="absolute bottom-4 left-4 right-4 z-10 text-xs text-[var(--muted)]">
            Every major system — engine, drivetrain, suspension, brakes, body and interior — is a part we can supply or source.
          </p>
        </div>
      </Section>

      {/* Source parts CTA */}
      <Section size="md" background="wash">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--blue)]">
            Source Parts
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mt-2">
            Need a specific part? We&apos;ll source it.
          </h2>
          <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">
            Send us the vehicle details, part number or a photo and our sourcing team will track it down through our distributor network.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('parts-sourcing')}
              className="button"
            >
              <span>Source a Part</span>
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="button-secondary"
            >
              <span>Browse Catalogue</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};