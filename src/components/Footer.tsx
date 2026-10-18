import React from 'react';
import { PageId } from './Header';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenWhatsApp }) => {
  return (
    <footer className="bg-black border-t border-[var(--line)] pt-16 pb-12 text-[var(--silver)]">
      <div className="container">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[var(--line)]">
          {/* Column 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/images/primeco-logo.jpeg"
                alt="Primeco Supplies Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-sm mt-2">
              Your one-stop panel shop supply partner. Delivering OEM automotive collision parts, certified vehicle glass, 2K paint systems, and industrial workshop consumables across Alberton, Johannesburg South, and Greater Gauteng.
            </p>

            <div className="flex items-center gap-2 text-xs text-[var(--silver)] font-medium mt-2">
              <MapPin size={15} className="text-[var(--blue)] shrink-0" />
              <span>Depot & Logistics: Alberton, Gauteng, South Africa</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-400 mt-1">
              <ShieldCheck size={15} className="shrink-0" />
              <span>Certified Level 1 B-BBEE Contributor</span>
            </div>
          </div>

          {/* Column 2: Explore Links (2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--bright)] mb-2">
              Explore Range
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[var(--muted)]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-[var(--blue)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  Full Catalogue <ArrowUpRight size={11} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('parts-sourcing')}
                  className="hover:text-[var(--blue)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  Parts Sourcing Service <ArrowUpRight size={11} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quick-order')}
                  className="hover:text-[var(--blue)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  Quick CSV Upload <ArrowUpRight size={11} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brands')}
                  className="hover:text-[var(--blue)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  Authorized Brands <ArrowUpRight size={11} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('valet-services')}
                  className="hover:text-[var(--blue)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  Valet & Detailing Packages <ArrowUpRight size={11} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quote')}
                  className="hover:text-[var(--blue)] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  Request Workshop Quote <ArrowUpRight size={11} />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Operations & Sales (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--bright)] mb-2">
              Operations & Sales
            </h4>
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-md)] p-3.5 flex flex-col gap-2.5">
              <div>
                <p className="text-xs font-bold text-white">Dean Strydom</p>
                <p className="text-[10px] text-[var(--blue)] font-semibold uppercase">
                  Director / Sales
                </p>
                <a
                  href="tel:+27799011544"
                  className="flex items-center gap-1.5 text-xs text-[var(--silver)] hover:text-white"
                >
                  <Phone size={12} className="text-[var(--blue)]" />
                  <span>079 901 1544</span>
                </a>
              </div>

              <div className="pt-2 border-t border-[var(--line)]">
                <p className="text-xs font-bold text-white">Jacky Schutte</p>
                <p className="text-[10px] text-[var(--blue)] font-semibold uppercase">
                  Sales Manager
                </p>
                <a
                  href="tel:+27768140493"
                  className="flex items-center gap-1.5 text-xs text-[var(--silver)] hover:text-white"
                >
                  <Phone size={12} className="text-[var(--blue)]" />
                  <span>076 814 0493</span>
                </a>
              </div>

              <div className="pt-2 border-t border-[var(--line)]">
                <p className="text-xs font-bold text-white">Kyle Batchelor</p>
                <p className="text-[10px] text-[var(--blue)] font-semibold uppercase">
                  Sales Consultant
                </p>
                <a
                  href="tel:+27736410557"
                  className="flex items-center gap-1.5 text-xs text-[var(--silver)] hover:text-white"
                >
                  <Phone size={12} className="text-[var(--blue)]" />
                  <span>073 641 0557</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer text-left pt-1"
              >
                <MessageSquare size={13} />
                <span>Quick WhatsApp Dispatch</span>
              </button>
            </div>
          </div>

          {/* Column 4: Accounts (Lente Kemp) (2.5 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--bright)] mb-2">
              Accounts & Invoicing
            </h4>
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-md)] p-3.5 flex flex-col gap-2.5">
              <div>
                <p className="text-xs font-bold text-white">Lente Kemp</p>
                <p className="text-[10px] text-[var(--muted)]">Accounts Manager</p>
                <a
                  href="tel:+27612954224"
                  className="flex items-center gap-1.5 text-xs text-[var(--silver)] hover:text-white mt-1"
                >
                  <Phone size={12} className="text-[var(--blue)]" />
                  <span>061 295 4224</span>
                </a>
                <a
                  href="mailto:accounts@primeco.co.za"
                  className="text-xs text-[var(--blue)] hover:underline mt-0.5 block"
                >
                  accounts@primeco.co.za
                </a>
              </div>

              <p className="text-[10px] text-[var(--muted)] leading-tight pt-2 border-t border-[var(--line)]">
                Direct panel shop billing & quotation support.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, privacy, and credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Primeco Supplies (Pty) Ltd. Reg: 2021/892401/07. All Rights Reserved.</span>
            <span className="hidden sm:inline text-[var(--line)]">•</span>
            <span className="text-[var(--silver)]">Behind every repair, a dependable supply partner.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="text-[var(--silver)] hover:text-[var(--blue)] transition-colors cursor-pointer underline underline-offset-2"
            >
              POPIA & Privacy Policy
            </button>
            <span className="text-[var(--line)]">•</span>
            <button
              type="button"
              onClick={() => onNavigate('company-profile')}
              className="text-[var(--silver)] hover:text-[var(--blue)] transition-colors cursor-pointer underline underline-offset-2"
            >
              Company Profile
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
