import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { PageHero } from '../components/PageHero';
import { FormField, FieldGrid } from '../components/FormField';
import { useQuote } from '../context/QuoteContext';
import { ProductGraphic } from '../components/ProductGraphic';
import { Trash2, Plus, Minus, Send, CheckCircle2, AlertTriangle, ArrowRight, ShoppingBag, FileText, Printer } from 'lucide-react';

interface QuotePageProps {
  onNavigate: (page: PageId) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ onNavigate }) => {
  const { items, updateQuantity, removeFromQuote, clearQuote, showToast, hasDemoItems } = useQuote();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    vatNumber: '',
    websiteHoneypot: '' // Anti-bot honeypot
  });

  const [delivery, setDelivery] = useState({
    address: '',
    suburb: 'Alberton',
    province: 'Gauteng',
    postalCode: '1449',
    notes: 'Please dispatch urgently for workshop bay 3.'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<{
    reference: string;
    date: string;
    itemCount: number;
  } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!customer.name.trim()) newErrors.name = 'Contact person name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) {
      newErrors.email = 'Valid trade email address is required';
    }
    if (!customer.phone.trim() || customer.phone.length < 8) {
      newErrors.phone = 'Contact phone number is required';
    }
    if (!delivery.address.trim()) newErrors.address = 'Street address is required';
    if (!delivery.suburb.trim()) newErrors.suburb = 'Suburb / City is required';
    if (!delivery.province.trim()) newErrors.province = 'Province is required';
    if (!delivery.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    if (items.length === 0) {
      newErrors.items = 'Your quote request contains no items.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (customer.websiteHoneypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    if (!validate()) {
      showToast('Please fix the errors in your quote form', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ref = `PRM-Q${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedQuote({
        reference: ref,
        date: new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' }),
        itemCount: items.reduce((a, b) => a + b.quantity, 0)
      });
      clearQuote();
      showToast(`Quote request #${ref} successfully submitted to Primeco!`);
    }, 850);
  };

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="TRADE PRICING & DISPATCH"
        title="Panel Shop Quote Builder"
        description="Compile your workshop order, specify delivery requirements, and receive official trade credit terms or immediate EFT proforma invoicing from our Alberton desk."
      />

      {/* Main Quote Content */}
      <Section size="sm" background="none">
        {submittedQuote ? (
          /* Submission Success View */
          <div className="max-w-2xl mx-auto bg-[#0b0e12] border border-emerald-500/40 rounded-[var(--radius-xl)] p-8 text-center flex flex-col items-center shadow-[var(--glow-md)]">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Quote Request Transmitted
            </h2>
            <div className="bg-[#11151a] border border-[var(--line)] rounded-[var(--radius-md)] px-6 py-3 my-4">
              <p className="text-xs uppercase font-mono text-[var(--muted)]">Reference Number</p>
              <p className="text-xl font-mono font-black text-[var(--blue)]">{submittedQuote.reference}</p>
            </div>
            <p className="text-xs sm:text-sm text-[var(--silver)] leading-relaxed mb-6 max-w-md">
              Thank you. Dean Strydom and our Alberton accounts department have received your request for <strong>{submittedQuote.itemCount} units</strong>. A formal PDF estimate with current trade discounts and delivery slot ETA has been dispatched to your email.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="button-secondary text-xs"
              >
                <Printer size={14} />
                <span>Print Confirmation</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmittedQuote(null);
                  onNavigate('catalogue');
                }}
                className="button text-xs"
              >
                <span>Return to Catalogue</span>
              </button>
            </div>
          </div>
        ) : (
          /* Quote Request Form Layout */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Customer Details Box */}
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-5">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    1. Customer & Workshop Contact
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Who should our dispatch and accounts team liaise with?
                  </p>
                </div>

                <FieldGrid>
                  <FormField
                    label="Contact Full Name"
                    name="name"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    error={errors.name}
                    placeholder="e.g. Johan van Zyl"
                  />
                  <FormField
                    label="Company / Workshop Name"
                    name="company"
                    value={customer.company}
                    onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                    placeholder="e.g. Alrode Auto Repair (Pty) Ltd"
                  />
                  <FormField
                    label="Work Email Address"
                    name="email"
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    error={errors.email}
                    placeholder="johan@alrodeautorepair.co.za"
                  />
                  <FormField
                    label="Mobile / WhatsApp Phone"
                    name="phone"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    error={errors.phone}
                    placeholder="082 123 4567"
                  />
                  <FormField
                    label="VAT Registration Number"
                    name="vatNumber"
                    full
                    value={customer.vatNumber}
                    onChange={(e) => setCustomer({ ...customer, vatNumber: e.target.value })}
                    placeholder="e.g. 4010293847 (Optional for trade invoice)"
                  />
                </FieldGrid>

                {/* Hidden Honeypot */}
                <input
                  type="text"
                  name="websiteHoneypot"
                  value={customer.websiteHoneypot}
                  onChange={(e) => setCustomer({ ...customer, websiteHoneypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Delivery Details Box */}
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-5">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    2. Workshop Delivery Address (Gauteng)
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Direct drop-off to your workshop receiving bay or paint booth area.
                  </p>
                </div>

                <FieldGrid>
                  <FormField
                    label="Street Address / Industrial Park"
                    name="address"
                    required
                    full
                    value={delivery.address}
                    onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    error={errors.address}
                    placeholder="e.g. 14 Bosworth Street, Alrode South"
                  />
                  <FormField
                    label="Suburb / City"
                    name="suburb"
                    required
                    value={delivery.suburb}
                    onChange={(e) => setDelivery({ ...delivery, suburb: e.target.value })}
                    error={errors.suburb}
                  />
                  <FormField
                    label="Province"
                    name="province"
                    required
                    value={delivery.province}
                    onChange={(e) => setDelivery({ ...delivery, province: e.target.value })}
                    error={errors.province}
                  />
                  <FormField
                    label="Postal Code"
                    name="postalCode"
                    required
                    value={delivery.postalCode}
                    onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                    error={errors.postalCode}
                  />
                  <FormField
                    label="Workshop Bay Delivery Instructions"
                    name="notes"
                    as="textarea"
                    full
                    value={delivery.notes}
                    onChange={(e) => setDelivery({ ...delivery, notes: e.target.value })}
                    placeholder="Special receiving instructions, urgent vehicle reg, gate access code..."
                  />
                </FieldGrid>
              </div>
            </div>

            {/* Right Column: Quote Items & Order Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-4 sticky top-28">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Quote Items ({items.length})
                    </h3>
                    <p className="text-xs text-[var(--muted)]">
                      Deduplicated by SKU (max 50 lines)
                    </p>
                  </div>
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearQuote}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {hasDemoItems && (
                  <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded text-xs text-amber-300 flex items-start gap-2">
                    <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                    <span>
                      Notice: Your quote contains demonstration samples. These will be priced as representative market estimates.
                    </span>
                  </div>
                )}

                {/* Items List */}
                {items.length === 0 ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <ShoppingBag size={36} className="text-[var(--muted)] mb-3" />
                    <p className="text-sm font-bold text-white mb-1">Your quote list is empty</p>
                    <p className="text-xs text-[var(--muted)] mb-4 max-w-xs">
                      Browse our workshop catalogue to add required abrasives, glass, or parts.
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate('catalogue')}
                      className="button-secondary text-xs"
                    >
                      <span>Open Catalogue</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.sku}
                        className="bg-[#111418] border border-[var(--line)] rounded-[var(--radius-md)] p-3 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-mono text-[10px] text-[var(--blue)] font-bold">
                            {item.sku}
                          </span>
                          <p className="font-bold text-white truncate">
                            {item.product?.name || item.sku}
                          </p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1 bg-[#090c0f] border border-[var(--line)] rounded px-1.5 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.sku, Math.max(1, item.quantity - 1))}
                            className="text-[var(--muted)] hover:text-white p-0.5 cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-bold text-white text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.sku, Math.min(999, item.quantity + 1))}
                            className="text-[var(--muted)] hover:text-white p-0.5 cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          type="button"
                          onClick={() => removeFromQuote(item.sku)}
                          className="text-[var(--muted)] hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={items.length === 0 || isSubmitting}
                    className="button w-full h-[50px] text-sm"
                  >
                    {isSubmitting ? (
                      <span>Sending to Dean & Accounts...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Quote Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[var(--muted)] text-center">
                    Trade verification handled during standard business hours (07:30 - 17:00).
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </Section>
    </div>
  );
};
