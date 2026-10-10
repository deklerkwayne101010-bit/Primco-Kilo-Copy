import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { FormField, FieldGrid } from '../components/FormField';
import { useQuote } from '../context/QuoteContext';
import { Search, Send, CheckCircle2, ShieldCheck, Car, FileText, Camera, Clock } from 'lucide-react';

interface PartsSourcingPageProps {
  initialQuery?: string;
  onNavigate: (page: PageId) => void;
}

export const PartsSourcingPage: React.FC<PartsSourcingPageProps> = ({ initialQuery = '', onNavigate }) => {
  const { showToast } = useQuote();

  const [form, setForm] = useState({
    partDescription: initialQuery ? `Looking for: ${initialQuery}` : '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vinNumber: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    workshopName: '',
    urgency: 'Standard (24-48h)'
  });

  const [submitted, setSubmitted] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.partDescription || !form.contactName || !form.contactPhone) {
      showToast('Please fill in the required part and contact fields', 'warning');
      return;
    }

    setSubmitted(true);
    showToast('Parts sourcing request transmitted to Dean Strydom!');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>SPECIALIST AUTOMOTIVE PROCUREMENT</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Can't find it? <span className="text-[var(--blue)]">We'll source it.</span>
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xl">
            Hard-to-find structural clips, imported vehicle windscreens, discontinued model panels, or specialized refinish formulas — our direct distributor network tracks it down.
          </p>
        </div>
      </section>

      {/* 3-Step Process Cards */}
      <Section size="sm" background="wash" borderBlock>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-base p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[var(--blue)] text-white font-black text-xs flex items-center justify-center">
                1
              </span>
              <FileText size={18} className="text-[var(--muted)]" />
            </div>
            <h3 className="text-base font-bold text-white">1. Submit Request</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Provide vehicle details, part descriptions, VIN number, or broken sample photos.
            </p>
          </div>

          <div className="card-base p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[var(--blue)] text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <Search size={18} className="text-[var(--muted)]" />
            </div>
            <h3 className="text-base font-bold text-white">2. We Search & Verify</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Dean cross-references OEM microfiches, glass importers, and factory stockists nationwide.
            </p>
          </div>

          <div className="card-base p-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[var(--blue)] text-white font-black text-xs flex items-center justify-center">
                3
              </span>
              <CheckCircle2 size={18} className="text-[var(--muted)]" />
            </div>
            <h3 className="text-base font-bold text-white">3. You Decide</h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              We send price options, availability windows, and dispatch immediately to your shop upon sign-off.
            </p>
          </div>
        </div>
      </Section>

      {/* Sourcing Form */}
      <Section size="sm" background="none">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="bg-[#0b0e12] border border-emerald-500/40 rounded-[var(--radius-xl)] p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Sourcing Ticket Logged
              </h2>
              <p className="text-xs sm:text-sm text-[var(--silver)] leading-relaxed max-w-md mb-6">
                Dean Strydom has received your vehicle specifications and is running an inventory search through our supplier network. We will contact <strong>{form.contactPhone}</strong> with pricing and delivery ETA.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="button text-xs"
              >
                <span>Submit Another Part</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-6 lg:p-8 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Parts Sourcing Enquiry Form
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  Fill in whatever details you have. Even a photo or partial VIN allows us to trace the exact part.
                </p>
              </div>

              {/* Part specifications */}
              <div className="flex flex-col gap-4">
                <FormField
                  label="Part Description & Requirements"
                  name="partDescription"
                  as="textarea"
                  required
                  full
                  value={form.partDescription}
                  onChange={(e) => setForm({ ...form, partDescription: e.target.value })}
                  placeholder="e.g. Left rear quarter vent glass for 2022 Toyota Hilux Legend 50, dark privacy tint, or structural door skin clips."
                />

                <FieldGrid>
                  <FormField
                    label="Vehicle Make"
                    name="vehicleMake"
                    value={form.vehicleMake}
                    onChange={(e) => setForm({ ...form, vehicleMake: e.target.value })}
                    placeholder="e.g. Volkswagen / Toyota / Ford"
                  />
                  <FormField
                    label="Model & Variant"
                    name="vehicleModel"
                    value={form.vehicleModel}
                    onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                    placeholder="e.g. Golf 8 GTI / Ranger 2.0"
                  />
                  <FormField
                    label="Year of Manufacture"
                    name="vehicleYear"
                    value={form.vehicleYear}
                    onChange={(e) => setForm({ ...form, vehicleYear: e.target.value })}
                    placeholder="e.g. 2023"
                  />
                  <FormField
                    label="VIN / Chassis Number (Highly Recommended)"
                    name="vinNumber"
                    value={form.vinNumber}
                    onChange={(e) => setForm({ ...form, vinNumber: e.target.value })}
                    placeholder="17-digit VIN from license disc"
                  />
                </FieldGrid>
              </div>

              {/* Photo upload simulator */}
              <div className="p-4 bg-[#11151a] border border-[var(--line)] rounded-[var(--radius-md)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera size={20} className="text-[var(--blue)]" />
                  <div>
                    <p className="text-xs font-bold text-white">Attach Damaged Part Photo or License Disc</p>
                    <p className="text-[11px] text-[var(--muted)]">Optional JPG/PNG image upload for visual confirmation</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoUploaded(true);
                    showToast('Sample image attached to request');
                  }}
                  className="button-secondary text-xs"
                >
                  {photoUploaded ? 'Photo Attached (1)' : 'Upload Photo'}
                </button>
              </div>

              {/* Workshop & Contact */}
              <div className="pt-4 border-t border-[var(--line)]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--silver)] mb-3">
                  Your Workshop Contact Info
                </h4>
                <FieldGrid>
                  <FormField
                    label="Your Name"
                    name="contactName"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="e.g. Dean / Marthinus"
                  />
                  <FormField
                    label="Workshop / Business Name"
                    name="workshopName"
                    value={form.workshopName}
                    onChange={(e) => setForm({ ...form, workshopName: e.target.value })}
                    placeholder="e.g. Alberton Coachworks"
                  />
                  <FormField
                    label="Contact Telephone / WhatsApp"
                    name="contactPhone"
                    required
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    placeholder="082 555 1234"
                  />
                  <FormField
                    label="Email Address"
                    name="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    placeholder="panel@workshop.co.za"
                  />
                </FieldGrid>
              </div>

              <button
                type="submit"
                className="button w-full h-[50px] text-sm mt-2"
              >
                <Send size={15} />
                <span>Submit Sourcing Request</span>
              </button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
};
