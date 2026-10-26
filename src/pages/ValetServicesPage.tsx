import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { PageHero } from '../components/PageHero';
import { Sparkles, Droplets, SprayCan, Car, CheckCircle2, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface ValetServicesPageProps {
  onNavigate: (page: PageId, extra?: any) => void;
}

export const ValetServicesPage: React.FC<ValetServicesPageProps> = ({ onNavigate }) => {
  const valetPackages = [
    {
      title: 'Pre-Delivery Wash',
      desc: 'Professional hand wash and foam treatment to remove overspray dust, fingerprints, and solvent marks before customer handover.',
      icon: <Droplets size={24} className="text-[var(--blue)]" />,
      price: 'From R450'
    },
    {
      title: 'Final Finish Polish',
      desc: 'Micro-fine cutting compound and swirl removal to eliminate sanding marks and hologram trails for a showroom shine.',
      icon: <Sparkles size={24} className="text-[var(--blue)]" />,
      price: 'From R850'
    },
    {
      title: 'Interior Deep Clean',
      desc: 'Enzymatic upholstery cleaning, odor neutralization, and plastic/vinyl restoration for interior surfaces.',
      icon: <SprayCan size={24} className="text-[var(--blue)]" />,
      price: 'From R650'
    }
  ];

  const additionalServices = [
    {
      title: 'Express Valet',
      desc: 'Quick turnaround for trade-in vehicles or customer collection day.',
      icon: <Clock size={20} className="text-[var(--blue)]" />
    },
    {
      title: 'Ceramic Coating',
      desc: 'Long-term protective sealant application for new or freshly repaired vehicles.',
      icon: <ShieldCheck size={20} className="text-[var(--blue)]" />
    },
    {
      title: 'Paint Correction',
      desc: 'Multi-stage paint correction for deep scratches, orange peel, and refinish blending.',
      icon: <Car size={20} className="text-[var(--blue)]" />
    }
  ];

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="ON-SITE VALET & DETAILING"
        title="Valet Services"
        description="Let our trained technicians prepare your repaired vehicles for delivery. Professional wash, polish, and interior detailing at our Alberton workshop."
      />

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
                <p className="text-xs text-[var(--silver)] leading-relaxed mb-4">
                  {pkg.desc}
                </p>
                <div className="text-2xl font-extrabold text-[var(--blue)] mb-2">
                  {pkg.price}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-end text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('quote')}
                  className="text-[var(--blue)] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Quote</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <SectionHead eyebrow="ADDITIONAL SERVICES" title="More Ways We Can Help" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {additionalServices.map((svc, idx) => (
            <div key={idx} className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--blue-dark)]/20 border border-[var(--blue)]/40 flex items-center justify-center flex-shrink-0">
                {svc.icon}
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{svc.title}</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-8 max-w-3xl mx-auto text-center flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Schedule a Valet Service
          </h3>
          <p className="text-xs text-[var(--muted)] leading-relaxed mb-6 max-w-lg">
            Drop off your vehicles at our Alberton workshop or arrange a collection. We work on your schedule and provide a completion certificate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate('quote')}
              className="button text-xs"
            >
              <span>Request Service Quote</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="button-secondary text-xs"
            >
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
