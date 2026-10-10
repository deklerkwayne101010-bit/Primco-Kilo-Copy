import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { PageHero } from '../components/PageHero';
import { FormField, FieldGrid } from '../components/FormField';
import { useQuote } from '../context/QuoteContext';
import { Phone, Mail, MessageSquare, MapPin, Clock, Send, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenWhatsApp }) => {
  const { showToast } = useQuote();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in required fields', 'warning');
      return;
    }
    setSent(true);
    showToast('Your message has been sent to our Alberton office!');
  };

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="DIRECT PANEL SHOP CONTACT"
        title="Get in touch with Primeco Supplies"
        description="Whether you need urgent windscreen delivery, custom refinish formulations, or trade credit terms, our team is accessible by phone, WhatsApp, or email."
      />

      {/* 3-Column Contact Cards */}
      <Section size="sm" background="none" borderBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Dean Strydom */}
          <div className="card-base p-6 flex flex-col justify-between hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all">
            <div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--blue)] mb-4 bg-[#0a0d11]">
                <img
                  src="/assets/images/team-dean-strydom.png"
                  alt="Dean Strydom, Director at Primeco Supplies"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">Dean Strydom</h3>
              <p className="text-xs font-bold text-[var(--blue)] uppercase tracking-wider mb-2">
                Director / Sales
              </p>
              <p className="text-xs text-[var(--muted)] mb-6 leading-relaxed">
                Direct point of contact for parts sourcing, major panel shop trade contracts, and urgent fleet deliveries.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--line)] text-xs">
              <a
                href="tel:+27799011544"
                className="flex items-center gap-2 text-[var(--silver)] hover:text-white"
              >
                <Phone size={14} className="text-[var(--blue)]" />
                <span>Cell: 079 901 1544</span>
              </a>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer text-left"
              >
                <MessageSquare size={14} />
                <span>WhatsApp: 079 901 1544</span>
              </button>
              <a
                href="mailto:dean@primeco.co.za"
                className="flex items-center gap-2 text-[var(--silver)] hover:text-white truncate"
              >
                <Mail size={14} className="text-[var(--blue)]" />
                <span className="truncate">dean@primeco.co.za</span>
              </a>
            </div>
          </div>

          {/* Card 2: Chucky Buys */}
          <div className="card-base p-6 flex flex-col justify-between hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all">
            <div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--blue)] mb-4 bg-[#0a0d11]">
                <img
                  src="/assets/images/team-chucky-buys.png"
                  alt="Chucky Buys, Sales Manager at Primeco Supplies"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">Chucky Buys</h3>
              <p className="text-xs font-bold text-[var(--blue)] uppercase tracking-wider mb-2">
                Sales Manager
              </p>
              <p className="text-xs text-[var(--muted)] mb-6 leading-relaxed">
                Client service, daily order confirmations, quote assistance, and product availability support.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--line)] text-xs">
              <a
                href="tel:+27767211286"
                className="flex items-center gap-2 text-[var(--silver)] hover:text-white"
              >
                <Phone size={14} className="text-[var(--blue)]" />
                <span>Cell: 076 721 1286</span>
              </a>
              <a
                href="https://wa.me/27767211286"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer text-left"
              >
                <MessageSquare size={14} />
                <span>WhatsApp: 076 721 1286</span>
              </a>
              <a
                href="mailto:sales@primeco.co.za"
                className="flex items-center gap-2 text-[var(--silver)] hover:text-white truncate"
              >
                <Mail size={14} className="text-[var(--blue)]" />
                <span className="truncate">sales@primeco.co.za</span>
              </a>
            </div>
          </div>

          {/* Card 3: Lente Kemp */}
          <div className="card-base p-6 flex flex-col justify-between hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] transition-all">
            <div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--blue)] mb-4 bg-[#0a0d11]">
                <img
                  src="/assets/images/team-lente-kemp.png"
                  alt="Lente Kemp, Accounts Manager at Primeco Supplies"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">Lente Kemp</h3>
              <p className="text-xs font-bold text-[var(--blue)] uppercase tracking-wider mb-2">
                Accounts Manager
              </p>
              <p className="text-xs text-[var(--muted)] mb-6 leading-relaxed">
                Trade accounts, monthly statements, billing reconciliation, and tax invoice processing.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--line)] text-xs">
              <a
                href="tel:+27612954224"
                className="flex items-center gap-2 text-[var(--silver)] hover:text-white"
              >
                <Phone size={14} className="text-[var(--blue)]" />
                <span>Cell: 061 295 4224</span>
              </a>
              <a
                href="mailto:accounts@primeco.co.za"
                className="flex items-center gap-2 text-[var(--silver)] hover:text-white truncate"
              >
                <Mail size={14} className="text-[var(--blue)]" />
                <span className="truncate">accounts@primeco.co.za</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Split: Direct Message Form & Location Card */}
      <Section size="md" background="wash">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-6 lg:p-8">
            <h2 className="text-xl font-bold text-white mb-1">
              Start a Conversation
            </h2>
            <p className="text-xs text-[var(--muted)] mb-6">
              Have a general inquiry or workshop question? Leave your message below and we will respond within standard business hours.
            </p>

            {sent ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500/50 rounded-[var(--radius-md)] text-center text-xs text-emerald-300">
                <p className="font-bold text-sm mb-1">Thank you for your message!</p>
                <p>Dean or our accounts support team will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FieldGrid>
                  <FormField
                    label="Full Name"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Mike Botha"
                  />
                  <FormField
                    label="Company / Panel Shop"
                    name="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. East Rand Coachworks"
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="mike@eastrand.co.za"
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="083 456 7890"
                  />
                  <FormField
                    label="Message or Enquiry Details"
                    name="message"
                    as="textarea"
                    required
                    full
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you are looking for..."
                  />
                </FieldGrid>

                <button
                  type="submit"
                  className="button w-full sm:w-auto h-[46px] text-xs self-start mt-2"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Depot Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin size={18} className="text-[var(--blue)]" />
                <span>Central Distribution Hub</span>
              </h3>

              <div className="text-xs text-[var(--silver)] flex flex-col gap-1">
                <p className="font-bold text-white">Primeco Supplies (Pty) Ltd</p>
                <p>Alberton / Alrode Industrial Hub</p>
                <p>Gauteng, South Africa</p>
              </div>

              <div className="pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[var(--blue)]" />
                  <span><strong>Trade Hours:</strong> Monday – Friday: 07:30 – 17:00</span>
                </div>
                <p className="text-[11px]">
                  Closed on South African public holidays & weekends. Urgent emergency out-of-hours windscreen orders by prior director arrangement.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--blue-dark)]/20 to-transparent border border-[var(--blue)]/30 rounded-[var(--radius-xl)] p-6">
              <h4 className="text-sm font-bold text-white mb-2">Ready to order immediately?</h4>
              <p className="text-xs text-[var(--muted)] mb-4">
                Jump straight into our interactive quote builder or upload your inventory spreadsheet.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="button w-full text-xs"
              >
                <span>Open Quote Builder</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
