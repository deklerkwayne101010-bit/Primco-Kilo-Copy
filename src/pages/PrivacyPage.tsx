import React from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { PageHero } from '../components/PageHero';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC<{ onNavigate: (page: PageId) => void }> = () => {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="LEGAL & REGULATORY"
        title="POPIA Privacy Policy & Data Protection"
        description="Protection of Personal Information Act (Act 4 of 2013) compliance and trade data governance for Primeco Supplies (Pty) Ltd."
      />

      <Section size="md" background="none">
        <div className="max-w-3xl mx-auto bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-8 lg:p-12 flex flex-col gap-8 text-xs sm:text-sm text-[var(--silver)] leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Introduction and Scope
            </h2>
            <p>
              Primeco Supplies (Pty) Ltd ("Primeco", "we", "us", or "our") is dedicated to protecting the privacy and personal data of our panel shop clients, directors, procurement agents, and supply partners in accordance with the Protection of Personal Information Act, No 4 of 2013 (POPIA).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Personal and Trade Information Collected
            </h2>
            <p className="mb-2">
              In order to provide trade quotation, warehouse dispatch, parts sourcing, and 30-day merchant credit assessments, we collect and process the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--muted)]">
              <li>Company registration numbers, CIPC documents, and VAT identifiers.</li>
              <li>Director and workshop representative contact details (full names, direct phone numbers, email addresses).</li>
              <li>Physical delivery addresses, gate access codes, and receiving bay coordinates in Gauteng.</li>
              <li>Vehicle identification numbers (VIN), chassis numbers, and damaged part images provided specifically for parts sourcing requests.</li>
              <li>Trade credit payment history, banking details for debit/EFT verification, and trade credit bureau references.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Purpose of Information Processing
            </h2>
            <p className="mb-2">We process personal information strictly to:</p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--muted)]">
              <li>Fulfill product orders, coordinate delivery vans, and issue tax invoices.</li>
              <li>Verify creditworthiness for 30-day revolving supply accounts.</li>
              <li>Source specialized automotive components and verify exact OEM match through VIN cross-referencing.</li>
              <li>Comply with South African Revenue Service (SARS) accounting records obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Security Measures & Retention
            </h2>
            <p>
              We enforce appropriate technical, administrative, and physical security safeguards to prevent loss, unauthorized disclosure, or unlawful destruction of your trade data. Quotation records stored in your browser cache (via local storage) remain on your local device and can be cleared at any time.
            </p>
          </div>

          <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
            <span className="text-xs text-[var(--muted)]">
              Information Officer: Dean Strydom · Alberton, Gauteng
            </span>
            <span className="text-xs font-bold text-[var(--blue)]">
              Last Updated: October 2026
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
};
