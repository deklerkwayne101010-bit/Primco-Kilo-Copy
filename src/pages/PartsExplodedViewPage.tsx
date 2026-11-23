import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { PageHero } from '../components/PageHero';
import { useQuote } from '../context/QuoteContext';
import { ShoppingBag, ArrowRight, Car, Wrench, Search, ShieldCheck } from 'lucide-react';

interface PartDef {
  key: string;
  name: string;
  description: string;
  category: string;
  sku: string;
}

interface PartsExplodedViewPageProps {
  onNavigate: (page: PageId, extraParams?: any) => void;
}

const PARTS: PartDef[] = [
  {
    key: 'windscreen',
    name: 'Windscreen / Laminated Glass',
    description: 'OE laminated acoustic windscreens with ADAS sensor boss and ceramic frit, fitted to panel shop specification.',
    category: 'vehicle-glass',
    sku: 'CAR-GLS-001',
  },
  {
    key: 'bonnet',
    name: 'Bonnet / Hood Panel',
    description: 'Pressed steel bonnet panels with sound-deadening and hinge reinforcement, primed and ready for paint.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-002',
  },
  {
    key: 'front-bumper',
    name: 'Front Bumper Cover',
    description: 'Impact-absorbing front bumper fascias with fog-lamp cutouts and parking-sensor provisions.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-003',
  },
  {
    key: 'headlight',
    name: 'Headlamp Assembly',
    description: 'Sealed beam and LED headlamp units with adjustment motors and UV-hardened lenses.',
    category: 'automotive-parts',
    sku: 'CAR-LTG-004',
  },
  {
    key: 'grille',
    name: 'Front Grille',
    description: 'Mesh and slatted front grilles with badge mounts and surround trims.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-005',
  },
  {
    key: 'mirror',
    name: 'Side Mirror / Wing Mirror',
    description: 'Heated, power-fold wing mirrors with integral indicators and blind-spot glass.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-006',
  },
  {
    key: 'door-handle',
    name: 'Door Handle',
    description: 'Body-colour and chrome exterior door handles with lock barrels and keyless provisions.',
    category: 'automotive-parts',
    sku: 'CAR-TRM-007',
  },
  {
    key: 'door-panel',
    name: 'Door Skin / Panel',
    description: 'Replacement door skins with window apertures and hinge/brace reinforcements.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-008',
  },
  {
    key: 'side-skirt',
    name: 'Side Skirt / Rocker Panel',
    description: 'Lower side skirts and rocker panel trims with clip fixings and edge seals.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-009',
  },
  {
    key: 'quarter-panel',
    name: 'Rear Quarter Panel',
    description: 'Rear quarter panels with wheel-arch pressings and lamp/reinforcement mounts.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-010',
  },
  {
    key: 'rear-bumper',
    name: 'Rear Bumper Cover',
    description: 'Rear bumper fascias with parking-sensor holes, reflector recesses and tow provisions.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-011',
  },
  {
    key: 'taillight',
    name: 'Tail Lamp Assembly',
    description: 'LED and incandescent tail lamp clusters with gaskets and wiring pigtails.',
    category: 'automotive-parts',
    sku: 'CAR-LTG-012',
  },
  {
    key: 'fuel-cap',
    name: 'Fuel Filler Cap',
    description: 'Locking and non-locking fuel filler caps with tether and gasket seal.',
    category: 'automotive-parts',
    sku: 'CAR-TRM-013',
  },
  {
    key: 'wheel',
    name: 'Wheel & Tyre',
    description: 'Steel and alloy wheels with OEM fitments, tyre valves and centre caps.',
    category: 'automotive-parts',
    sku: 'CAR-WHL-014',
  },
  {
    key: 'roof',
    name: 'Roof Panel',
    description: 'Roof skins and roof-rail reinforcements with antenna and sunroof apertures.',
    category: 'automotive-parts',
    sku: 'CAR-BOD-015',
  },
];

export const PartsExplodedViewPage: React.FC<PartsExplodedViewPageProps> = ({ onNavigate }) => {
  const { addToQuote, showToast } = useQuote();
  const [active, setActive] = useState<PartDef | null>(null);

  const handlePartEnter = (p: PartDef) => setActive(p);
  const handlePartLeave = () => setActive(null);

  const handleAddToQuote = (p: PartDef) => {
    addToQuote(p.sku, 1);
    showToast(`${p.name} added to quote request`);
  };

  const handleBrowseCategory = (category: string) => {
    onNavigate('catalogue', { category });
  };

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="CAR PARTS SUPPLY"
        title={<>Every part. <span className="text-[var(--blue)]">Every car.</span> We supply it.</>}
        description="Exploded-view car diagram. Click or hover any part to see what we can supply — body panels, glass, lights, trim and fasteners for panel shops and workshops across Gauteng."
      />

      {/* Exploded View Section */}
      <Section size="lg" background="surface" borderBlock id="exploded-view">
        <SectionHead
          eyebrow="EXPLODED VIEW"
          title="Vehicle Parts Breakdown"
          description="Hover any part to explode it from the chassis and view supply details. We can source any part for any vehicle."
          align="center"
        />

        <div className="relative">
          {/* Left: diagram */}
          <div className="flex-1 max-w-[720px] mx-auto lg:mx-0 lg:max-w-none">
            <svg
              viewBox="0 0 800 460"
              className="w-full h-[520px] lg:h-[640px] block drop-shadow-[var(--glow-lg)]"
              aria-label="Exploded view of vehicle with supplyable parts"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#141920" />
                  <stop offset="50%" stopColor="#0b0e12" />
                  <stop offset="100%" stopColor="#06080a" />
                </linearGradient>
                <linearGradient id="partGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a3542" />
                  <stop offset="100%" stopColor="#111418" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Chassis shadow */}
              <ellipse cx="400" cy="340" rx="260" ry="40" fill="#000" opacity="0.35" />

              {/* ============ BODY (base) ============ */}
              <g id="chassis" className="part-group" data-part="chassis">
                <path
                  d="M120 290 C 120 250, 200 210, 260 210 L 300 210 L 340 170 C 360 130, 440 130, 460 170 L 500 170 L 540 210 L 620 210 C 680 210, 720 250, 720 290 L 700 310 L 140 310 Z"
                  fill="url(#bodyGrad)"
                  stroke="#1f2a36"
                  strokeWidth="2"
                />
                {/* belt line */}
                <path d="M150 285 Q 280 225, 520 225 Q 660 225, 690 280" fill="none" stroke="#2a3542" strokeWidth="2" />
              </g>

              {/* ============ WINDSCREEN ============ */}
              <g
                id="part-windscreen"
                className={`part-group ${active?.key === 'windscreen' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[0])}
                onMouseLeave={handlePartLeave}
                data-part="windscreen"
              >
                <path
                  d="M250 215 C 270 165, 360 150, 420 155 C 470 158, 500 165, 515 200 L 505 220 L 255 220 Z"
                  fill="#0a0f14"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
                <path d="M260 218 C 290 180, 380 172, 460 178 C 490 180, 505 190, 510 210 L 500 215 L 265 215 Z" fill="none" stroke="#2a3542" strokeWidth="1.5" />
              </g>

              {/* ============ BONNET ============ */}
              <g
                id="part-bonnet"
                className={`part-group ${active?.key === 'bonnet' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[1])}
                onMouseLeave={handlePartLeave}
                data-part="bonnet"
              >
                <path
                  d="M265 218 C 295 178, 380 168, 455 175 C 500 180, 510 200, 515 212 L 505 220 L 255 220 Z"
                  fill="#0f161e"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
              </g>

              {/* ============ FRONT BUMPER ============ */}
              <g
                id="part-front-bumper"
                className={`part-group ${active?.key === 'front-bumper' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[2])}
                onMouseLeave={handlePartLeave}
                data-part="front-bumper"
              >
                <path
                  d="M140 305 C 140 280, 190 265, 240 265 L 260 265 L 265 290 L 140 310 Z"
                  fill="#0b0e12"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
              </g>

              {/* ============ HEADLIGHT ============ */}
              <g
                id="part-headlight"
                className={`part-group ${active?.key === 'headlight' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[3])}
                onMouseLeave={handlePartLeave}
                data-part="headlight"
              >
                <path
                  d="M170 275 C 170 262, 190 255, 205 258 L 200 268 C 185 272, 170 270, 170 275 Z"
                  fill="#0a0e13"
                  stroke="#1198e8"
                  strokeWidth="2"
                />
                <ellipse cx="185" cy="262" rx="12" ry="6" fill="#1198e8" opacity="active?.key === 'headlight' ? 1 : 0.6" />
              </g>

              {/* ============ GRILLE ============ */}
              <g
                id="part-grille"
                className={`part-group ${active?.key === 'grille' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[4])}
                onMouseLeave={handlePartLeave}
                data-part="grille"
              >
                <path
                  d="M200 268 C 200 260, 225 255, 245 258 L 240 268 Z"
                  fill="#0a0e13"
                  stroke="#1198e8"
                  strokeWidth="2"
                />
                <path d="M205 262 L 220 262 M205 266 L 220 266 M205 270 L 220 270" stroke="#374553" strokeWidth="1.5" />
              </g>

              {/* ============ SIDE MIRROR ============ */}
              <g
                id="part-mirror"
                className={`part-group ${active?.key === 'mirror' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[5])}
                onMouseLeave={handlePartLeave}
                data-part="mirror"
              >
                <path d="M420 230 Q 445 220, 465 235 L 460 245 Q 435 250, 420 240 Z" fill="#0f161e" stroke="#1198e8" strokeWidth="2" />
                <ellipse cx="455" cy="236" rx="14" ry="9" fill="#0a0e13" stroke="#2a3542" strokeWidth="1" />
              </g>

              {/* ============ DOOR HANDLE ============ */}
              <g
                id="part-door-handle"
                className={`part-group ${active?.key === 'door-handle' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[6])}
                onMouseLeave={handlePartLeave}
                data-part="door-handle"
              >
                <path d="M330 275 L 365 275 L 365 285 L 330 285 Z" fill="#0a0e13" stroke="#1198e8" strokeWidth="2" />
                <path d="M330 275 Q 347 262, 365 275" fill="none" stroke="#2a3542" strokeWidth="1.5" />
              </g>

              {/* ============ DOOR PANEL ============ */}
              <g
                id="part-door-panel"
                className={`part-group ${active?.key === 'door-panel' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[7])}
                onMouseLeave={handlePartLeave}
                data-part="door-panel"
              >
                <path
                  d="M275 230 Q 300 220, 330 230 L 365 275 L 365 300 L 275 300 Z"
                  fill="#0f161e"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
                <path d="M285 240 L 285 295 M320 245 L 320 290 M355 255 L 355 290" stroke="#2a3542" strokeWidth="1.5" opacity="0.6" />
              </g>

              {/* ============ SIDE SKIRT ============ */}
              <g
                id="part-side-skirt"
                className={`part-group ${active?.key === 'side-skirt' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[8])}
                onMouseLeave={handlePartLeave}
                data-part="side-skirt"
              >
                <path d="M275 300 Q 320 305, 365 300 L 365 312 L 275 312 Z" fill="#0b0e12" stroke="#1198e8" strokeWidth="2" />
              </g>

              {/* ============ QUARTER PANEL ============ */}
              <g
                id="part-quarter-panel"
                className={`part-group ${active?.key === 'quarter-panel' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[9])}
                onMouseLeave={handlePartLeave}
                data-part="quarter-panel"
              >
                <path
                  d="M500 170 L 540 210 L 540 260 Q 500 275, 460 265 L 460 210 Z"
                  fill="#0f161e"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
              </g>

              {/* ============ REAR BUMPER ============ */}
              <g
                id="part-rear-bumper"
                className={`part-group ${active?.key === 'rear-bumper' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[10])}
                onMouseLeave={handlePartLeave}
                data-part="rear-bumper"
              >
                <path
                  d="M540 260 Q 565 275, 585 265 L 585 300 L 540 310 Q 520 305, 540 295 Z"
                  fill="#0b0e12"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
              </g>

              {/* ============ TAILLIGHT ============ */}
              <g
                id="part-taillight"
                className={`part-group ${active?.key === 'taillight' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[11])}
                onMouseLeave={handlePartLeave}
                data-part="taillight"
              >
                <path d="M580 270 L 590 280 L 585 290 L 575 285 Z" fill="#0a0e13" stroke="#1198e8" strokeWidth="2" />
                <rect x="581" y="276" width="5" height="12" fill="#1198e8" opacity={active?.key === 'taillight' ? 1 : 0.6} />
              </g>

              {/* ============ FUEL CAP ============ */}
              <g
                id="part-fuel-cap"
                className={`part-group ${active?.key === 'fuel-cap' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[12])}
                onMouseLeave={handlePartLeave}
                data-part="fuel-cap"
              >
                <circle cx="475" cy="270" r="9" fill="#0a0e13" stroke="#1198e8" strokeWidth="2" />
                <circle cx="475" cy="270" r="4" fill="#2a3542" />
              </g>

              {/* ============ WHEEL (front) ============ */}
              <g
                id="part-wheel"
                className={`part-group ${active?.key === 'wheel' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[13])}
                onMouseLeave={handlePartLeave}
                data-part="wheel"
              >
                <circle cx="250" cy="310" r="34" fill="#050607" stroke="#1198e8" strokeWidth="3" />
                <circle cx="250" cy="310" r="10" fill="#0b0e12" stroke="#1198e8" strokeWidth="1.5" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={deg}
                      x1={250 + 14 * Math.cos(rad)}
                      y1={310 + 14 * Math.sin(rad)}
                      x2={250 + 26 * Math.cos(rad)}
                      y2={310 + 26 * Math.sin(rad)}
                      stroke="#1198e8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* ============ ROOF ============ */}
              <g
                id="part-roof"
                className={`part-group ${active?.key === 'roof' ? 'active' : ''}`}
                onMouseEnter={() => handlePartEnter(PARTS[14])}
                onMouseLeave={handlePartLeave}
                data-part="roof"
              >
                <path
                  d="M280 210 L 300 170 C 320 150, 400 150, 420 170 L 440 170 L 420 210 Z"
                  fill="#0f161e"
                  stroke="#1198e8"
                  strokeWidth="2.5"
                />
              </g>

              {/* Labels (subtle) */}
              <g fill="#1198e8" fontFamily="monospace" fontSize="9" opacity="0.55" pointerEvents="none">
                <text x="250" y="205" textAnchor="middle">WINDSCREEN</text>
                <text x="390" y="200" textAnchor="middle">BONNET</text>
                <text x="200" y="295" textAnchor="middle">FRONT BUMPER</text>
                <text x="185" y="260" textAnchor="middle">HEADLAMP</text>
                <text x="222" y="260" textAnchor="middle">GRILLE</text>
                <text x="445" y="225" textAnchor="middle">MIRROR</text>
                <text x="347" y="272" textAnchor="middle">HANDLE</text>
                <text x="320" y="248" textAnchor="middle">DOOR PANEL</text>
                <text x="320" y="306" textAnchor="middle">SIDE SKIRT</text>
                <text x="500" y="240" textAnchor="middle">QUARTER PANEL</text>
                <text x="562" y="295" textAnchor="middle">REAR BUMPER</text>
                <text x="582" y="265" textAnchor="middle">TAILLAMP</text>
                <text x="475" y="283" textAnchor="middle">FUEL</text>
                <text x="250" y="348" textAnchor="middle">WHEEL</text>
                <text x="350" y="166" textAnchor="middle">ROOF</text>
              </g>
            </svg>

            <p className="mt-6 text-xs text-[var(--muted)] text-center max-w-md mx-auto">
              Exploded-view illustration — hover any component to isolate it. All listed parts are stocked or sourced by Primeco.
            </p>
          </div>

          {/* Right: callout panel */}
          {active && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              <div
                onClick={handlePartLeave}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity"
                aria-label="Close part detail"
              />
              <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[420px] lg:left-[56%] lg:-translate-x-0 lg:top-1/6 w-[340px] z-10 pointer-events-auto bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-6 shadow-[var(--glow-lg)] animate-in zoom-in duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-[var(--blue)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">PART ISOLATED</span>
                  </div>
                  <button
                    onClick={handlePartLeave}
                    className="w-7 h-7 rounded-full border border-[var(--line)] bg-[#111418] flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-[var(--blue)] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <Xmark size={12} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-[var(--bright)] mb-1">{active.name}</h3>
                <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">{active.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--muted)]">SKU</span>
                    <span className="font-mono text-[var(--blue)]">{active.sku}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--muted)]">Category</span>
                    <span className="font-semibold text-[var(--silver)]">{active.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--line)]/40">
                    <span className="text-[var(--muted)]">Availability</span>
                    <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> In stock / sourced
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-2">
                  <button
                    onClick={() => { handleAddToQuote(active); handlePartLeave(); }}
                    className="flex-1 button w-full h-[44px] text-sm font-semibold"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to quote</span>
                  </button>
                  <button
                    onClick={() => { handleBrowseCategory(active.category); handlePartLeave(); }}
                    className="flex-1 button-secondary w-full h-[44px] text-sm font-semibold border border-[var(--line)] bg-transparent text-[var(--silver)] hover:text-white hover:border-[var(--blue)]"
                  >
                    <ArrowRight size={14} />
                    <span>Browse {active.category.replace('-', ' ')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Categories grid */}
      <Section size="md" background="none" borderBlock>
        <SectionHead
          eyebrow="PART RANGES WE SUPPLY"
          title="Complete Vehicle Coverage"
          description="From body panels to glazing, lighting and trim — we supply any part for any vehicle. Trade pricing and dispatch from Alberton."
          align="center"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Body Panels', icon: Wrench, desc: 'Bonnet, doors, bumpers, quarters, skirts' },
            { label: 'Glazing', icon: Car, desc: 'Windscreens, side & rear glass' },
            { label: 'Lighting', icon: Search, desc: 'Headlamps, tail lamps, fog lamps' },
            { label: 'Trim & Fasteners', icon: ShieldCheck, desc: 'Handles, mirrors, caps, clips' },
          ].map((cat, i) => (
            <div
              key={cat.label}
              className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-5 hover:border-[var(--blue)] hover:shadow-[var(--glow-sm)] transition-all cursor-pointer group"
              onClick={() => {
                const map: Record<string, string> = {
                  'Body Panels': 'automotive-parts',
                  Glazing: 'vehicle-glass',
                  Lighting: 'automotive-parts',
                  'Trim & Fasteners': 'automotive-parts',
                };
                onNavigate('catalogue', { category: map[cat.label] });
              }}
            >
              <div className="w-10 h-10 rounded bg-[#111418] border border-[var(--line)] flex items-center justify-center text-[var(--blue)] mb-3 group-hover:bg-[var(--blue)] group-hover:text-white transition-colors">
                <cat.icon size={16} />
              </div>
              <h4 className="font-bold text-[var(--bright)] mb-1">{cat.label}</h4>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#0a0d11] border-t border-[var(--line)] py-12">
        <div className="container flex flex-col items-center gap-4 text-center">
          <h3 className="text-xl font-bold text-[var(--bright)]">Can't see the part you need?</h3>
          <p className="text-sm text-[var(--muted)] max-w-xl">
            We supply any part for any vehicle — even discontinued or imported lines. Send us the part details and we'll source it.
          </p>
          <button
            onClick={() => onNavigate('parts-sourcing')}
            className="button h-[46px] text-sm font-semibold"
          >
            <Wrench size={15} />
            <span>Submit Parts Sourcing Request</span>
          </button>
        </div>
      </section>
    </div>
  );
};

function Xmark(props: { size: number }) {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
