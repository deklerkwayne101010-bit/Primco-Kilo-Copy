import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { TEAM_MEMBERS } from '../data/catalogue';
import { ShieldCheck, Truck, Clock, Award, Phone, Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenWhatsApp }) => {
  return (
    <div className="flex flex-col">
      {/* Intro Header */}
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-14">
        <div className="container">
          <div className="max-w-3xl">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <span>ABOUT PRIMECO</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Behind every repair, a dependable supply partner.
            </h1>
            <p className="text-base text-[var(--silver)] leading-relaxed">
              Primeco Supplies (Pty) Ltd was established with a singular focus: eliminating the supply headaches that stall collision repair shops and commercial fleet workshops across Gauteng. From our Alberton hub, we deliver high-grade components with trade accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Our Approach (Split layout - 2-col desktop, stacked mobile) */}
      <Section size="md" background="none" borderBlock>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Rich Copy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <span>OUR OPERATIONAL PROMISE</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              We understand the cost of a vehicle sitting idle in a panel shop bay.
            </h2>
            <p className="text-sm text-[var(--silver)] leading-relaxed">
              When an insurance repair turnaround time is tracked in hours, waiting two days for primer hardener or an acoustic windscreen damages your shop's profitability. At Primeco, we don't just supply boxes; we act as an extended logistics wing of your workshop.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              With deep local warehouse stock in Alberton, a mobile parts sourcing unit headed by Director Dean Strydom, and streamlined 30-day trade account facilities managed by Lente Kemp, we provide the dependable foundation your technicians count on.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="button-secondary mt-2"
            >
              <span>Explore Catalogue</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right: Panel card "Who we serve" (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--glow-sm)]">
            <div className="h-44 w-full relative overflow-hidden border-b border-[var(--line)]">
              <img
                src="/assets/images/about-workshop-15.png"
                alt="Primeco automotive repair workshop environment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e12] via-transparent to-transparent" />
            </div>

            <div className="p-7">
              <div className="eyebrow mb-2">
                <span className="eyebrow-line" />
                <span>WHO WE SERVE</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Dedicated Trade Sectors
              </h3>
              <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-[var(--silver)] mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[var(--blue)] shrink-0 mt-0.5" />
                  <span><strong>Major Structural Collision Repairers:</strong> Body shops certified by SAMBRA, CRA, and vehicle OEMs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[var(--blue)] shrink-0 mt-0.5" />
                  <span><strong>Automotive Glass Replacement Centers:</strong> Mobile and fitment centre operators demanding OE urethane & glass.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[var(--blue)] shrink-0 mt-0.5" />
                  <span><strong>Commercial Fleets & Heavy Workshops:</strong> Bus, truck, and logistics fleet maintenance depots.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[var(--blue)] shrink-0 mt-0.5" />
                  <span><strong>Independent Spray Painters & Detailers:</strong> Custom refinishers requiring premium Mirka & Spies Hecker supplies.</span>
                </li>
              </ul>
              <p className="text-[11px] text-[var(--muted)] pt-4 border-t border-[var(--line)]">
                Daily delivery routes cover Alberton, Alrode, City Deep, Germiston, Bedfordview, Boksburg, and Johannesburg South.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 2: Meet the Team (3-col grid) */}
      <Section size="md" background="wash" borderBlock>
        <SectionHead
          eyebrow="LEADERSHIP & OPERATIONS"
          title="Meet the Primeco Team"
          description="Experienced panel shop professionals dedicated to keeping your job cards moving forward without delays."
          align="start"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="card-base p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all group overflow-hidden"
            >
              <div>
                {/* Real Team Photo from primeco.co.za */}
                <div className="w-full h-56 rounded-[var(--radius-lg)] bg-[#07090c] border border-[var(--line)] group-hover:border-[var(--blue)] overflow-hidden mb-4 transition-colors relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at Primeco Supplies`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-2xl text-[var(--blue)]">
                      {member.initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1216] via-transparent to-transparent opacity-80" />
                </div>

                <h3 className="text-lg font-bold text-white mb-0.5">
                  {member.name}
                </h3>
                <p className="text-[11px] font-extrabold text-[var(--blue)] tracking-wider uppercase mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-[var(--silver)] leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Contact links */}
              <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-2 text-xs">
                <a
                  href={`tel:${member.cell.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 text-[var(--muted)] hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-[var(--blue)]" />
                  <span>Cell: {member.cell}</span>
                </a>

                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer text-left"
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp: {member.cell}</span>
                </button>

                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-[var(--muted)] hover:text-white transition-colors truncate"
                >
                  <Mail size={13} className="text-[var(--blue)]" />
                  <span className="truncate">{member.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3: Our Values (3-col grid) */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="CORE PRINCIPLES"
          title="The Values That Guide Our Supply"
          description="Built on real trade ethics, product authenticity, and fast responsive customer care."
          align="start"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-base p-6 flex flex-col gap-4 group hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <div className="w-14 h-14 rounded-full bg-[var(--blue-dark)]/20 border border-[var(--blue)]/40 flex items-center justify-center text-[var(--blue)] group-hover:bg-[var(--grad-brand)] group-hover:text-white transition-all">
              <Award size={26} />
            </div>
            <h3 className="text-base font-bold text-white">Guaranteed Authenticity</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              We never supply grey-market or compromised abrasives, fasteners, or structural adhesives. Every item meets vehicle manufacturer specifications.
            </p>
          </div>

          <div className="card-base p-6 flex flex-col gap-4 group hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <div className="w-14 h-14 rounded-full bg-[var(--blue-dark)]/20 border border-[var(--blue)]/40 flex items-center justify-center text-[var(--blue)] group-hover:bg-[var(--grad-brand)] group-hover:text-white transition-all">
              <Truck size={26} />
            </div>
            <h3 className="text-base font-bold text-white">Punctual Workshop Dispatch</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              When we commit to a 2-hour delivery window in Alberton or Alrode, our delivery vehicle is at your receiving gate on time.
            </p>
          </div>

          <div className="card-base p-6 flex flex-col gap-4 group hover:-translate-y-1 hover:border-[var(--blue)] transition-all">
            <div className="w-14 h-14 rounded-full bg-[var(--blue-dark)]/20 border border-[var(--blue)]/40 flex items-center justify-center text-[var(--blue)] group-hover:bg-[var(--grad-brand)] group-hover:text-white transition-all">
              <ShieldCheck size={26} />
            </div>
            <h3 className="text-base font-bold text-white">Transparent 30-Day Credit</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              We structure our credit lines and trade invoicing to synchronize with insurance settlement and panel beating billing cycles.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section size="sm" background="wash">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 py-6">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
            A better supply conversation starts here.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
            Get in touch with Dean today or submit your current workshop shopping list for a direct commercial discount review.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => onNavigate('quote')}
              className="button"
            >
              <span>Request a Quote</span>
              <ArrowRight size={15} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="button-secondary"
            >
              <span>Contact Our Team</span>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
