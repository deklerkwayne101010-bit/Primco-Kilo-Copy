import React from 'react';

interface ProductGraphicProps {
  sku: string;
  category: string;
  name: string;
  className?: string;
}

export const ProductGraphic: React.FC<ProductGraphicProps> = ({ sku, category, name, className = '' }) => {
  const cat = (category || '').toLowerCase();
  const code = (sku || '').toUpperCase();

  // Studio Lighting & Metallic Mesh Backdrop
  const baseBg = "w-full h-full bg-gradient-to-b from-[#141920] via-[#0b0e12] to-[#06080a] flex flex-col items-center justify-center p-3 relative overflow-hidden select-none";

  // 1. Braking & Friction (Heavy Ventilated Disc + Dual-Piston Caliper)
  if (cat.includes('braking') || code.includes('BRK')) {
    return (
      <div className={`${baseBg} ${className}`}>
        {/* Soft studio rim lighting & grid glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(17,152,232,0.22),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        <svg viewBox="0 0 160 120" className="w-28 h-22 text-[#1198e8] drop-shadow-[0_8px_20px_rgba(17,152,232,0.35)]" fill="none">
          <defs>
            <radialGradient id="discGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#252e3b" />
              <stop offset="70%" stopColor="#12161d" />
              <stop offset="100%" stopColor="#080b0f" />
            </radialGradient>
            <linearGradient id="metalRim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#1198e8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#075eaf" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="caliperGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#075eaf" />
              <stop offset="60%" stopColor="#1198e8" />
              <stop offset="100%" stopColor="#2aa3f0" />
            </linearGradient>
          </defs>

          {/* Rotor Disc Outer */}
          <circle cx="80" cy="62" r="46" fill="url(#discGrad)" stroke="url(#metalRim)" strokeWidth="2.5" />
          <circle cx="80" cy="62" r="33" stroke="#2a3038" strokeWidth="1" strokeDasharray="4 3" />
          
          {/* Vented disc slots */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 80 + 34 * Math.cos(rad);
            const y1 = 62 + 34 * Math.sin(rad);
            const x2 = 80 + 44 * Math.cos(rad);
            const y2 = 62 + 44 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3b4754" strokeWidth="1.5" strokeLinecap="round" />;
          })}

          {/* Wheel Hub Center with 5 Studs */}
          <circle cx="80" cy="62" r="16" fill="#0d1116" stroke="#485666" strokeWidth="2" />
          <circle cx="80" cy="62" r="6" fill="#1198e8" opacity="0.8" />
          {[0, 72, 144, 216, 288].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 80 + 11 * Math.cos(rad);
            const cy = 62 + 11 * Math.sin(rad);
            return <circle key={i} cx={cx} cy={cy} r="2.2" fill="#d8dde3" stroke="#12161d" strokeWidth="0.8" />;
          })}

          {/* High-Performance Red/Blue Caliper */}
          <path d="M42 34 C 54 18, 106 18, 118 34 L124 48 C 108 40, 52 40, 36 48 Z" fill="url(#caliperGrad)" stroke="#57b5ee" strokeWidth="1.5" />
          <rect x="52" y="27" width="22" height="7" rx="3" fill="#08223d" stroke="#57b5ee" strokeWidth="1" />
          <rect x="86" y="27" width="22" height="7" rx="3" fill="#08223d" stroke="#57b5ee" strokeWidth="1" />
        </svg>

        <div className="flex items-center gap-1.5 mt-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">OE CERAMIC ROTOR & PAD</span>
        </div>
      </div>
    );
  }

  // 2. Vehicle Glass & Windscreens (Laminated Acoustic Curve with Sensor Boss)
  if (cat.includes('glass') || code.includes('GLS') || cat.includes('windscreens')) {
    return (
      <div className={`${baseBg} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(17,152,232,0.25),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#57b5ee_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        <svg viewBox="0 0 160 120" className="w-32 h-22 text-[#1198e8]" fill="none">
          <defs>
            <linearGradient id="glassSweep" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1198e8" stopOpacity="0.4" />
              <stop offset="45%" stopColor="#075eaf" stopOpacity="0.1" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1198e8" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Laminated Glass Contour */}
          <path d="M22 84 L38 30 C 72 23, 88 23, 122 30 L138 84 C 98 92, 62 92, 22 84 Z" 
                fill="url(#glassSweep)" stroke="#1198e8" strokeWidth="2.5" />
          
          {/* Top UV Sunband Gradient */}
          <path d="M37 32 C 72 25, 88 25, 123 32 L120 42 C 88 36, 72 36, 40 42 Z" fill="#075eaf" opacity="0.65" />
          
          {/* High-Spec ADAS Rain Sensor & Mirror Mounting Plate */}
          <circle cx="80" cy="46" r="6.5" fill="#0b0e12" stroke="#57b5ee" strokeWidth="1.5" />
          <circle cx="80" cy="46" r="3" fill="#1198e8" />
          
          {/* Edge Ceramic Frit Band (Dot Matrix) */}
          <path d="M30 78 L42 36 C 74 30, 86 30, 118 36 L130 78" stroke="#374553" strokeWidth="1" strokeDasharray="2 3" />
          
          {/* Diagonal Specular Reflection Line */}
          <line x1="44" y1="74" x2="108" y2="34" stroke="white" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        </svg>

        <div className="flex items-center gap-1.5 mt-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] shadow-[0_0_6px_#1198e8]" />
          <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">SHATTERPRUFE® OE LAMINATED</span>
        </div>
      </div>
    );
  }

  // 3. Paint Solutions & Refinishing (2K High Solid Clearcoat & Spray Gun)
  if (cat.includes('paint') || cat.includes('mask') || cat.includes('polish') || cat.includes('spray') || code.includes('PNT') || code.includes('CLR') || code.includes('MSK')) {
    return (
      <div className={`${baseBg} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(17,152,232,0.22),transparent_70%)] pointer-events-none" />
        
        <svg viewBox="0 0 160 120" className="w-28 h-22 text-[#1198e8]" fill="none">
          <defs>
            <linearGradient id="canMetal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a222c" />
              <stop offset="35%" stopColor="#3b4959" />
              <stop offset="50%" stopColor="#d8dde3" />
              <stop offset="70%" stopColor="#25303d" />
              <stop offset="100%" stopColor="#121820" />
            </linearGradient>
            <linearGradient id="labelGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#075eaf" />
              <stop offset="100%" stopColor="#1198e8" />
            </linearGradient>
          </defs>

          {/* Precision 5L Industrial Tin Can */}
          <rect x="54" y="32" width="52" height="66" rx="4" fill="url(#canMetal)" stroke="#1198e8" strokeWidth="2" />
          
          {/* Top Lid & Seam Rim */}
          <path d="M60 26 L100 26 L96 32 L64 32 Z" fill="#25303d" stroke="#57b5ee" strokeWidth="1.5" />
          <rect x="74" y="22" width="12" height="5" rx="1.5" fill="#1198e8" />

          {/* Premium Body Label with Metallic Sheen */}
          <rect x="54" y="52" width="52" height="34" fill="url(#labelGrad)" opacity="0.9" />
          <line x1="60" y1="62" x2="100" y2="62" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="60" y1="68" x2="88" y2="68" stroke="#e0e8f0" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          <circle cx="94" cy="74" r="5" fill="#ffffff" />
          <text x="94" y="76.5" fontSize="5" fontWeight="bold" fill="#075eaf" textAnchor="middle">2K</text>

          {/* Metallic Can Chime bottom */}
          <line x1="54" y1="92" x2="106" y2="92" stroke="#2a3644" strokeWidth="2" />
        </svg>

        <div className="flex items-center gap-1.5 mt-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">2K VOC COMPLIANT SYSTEM</span>
        </div>
      </div>
    );
  }

  // 4. Abrasives & Sanding Systems (Multi-Hole Mesh Ceramic Disc)
  if (cat.includes('abrasive') || cat.includes('sanding') || code.includes('SND') || code.includes('CUT')) {
    return (
      <div className={`${baseBg} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(17,152,232,0.2),transparent_70%)] pointer-events-none" />

        <svg viewBox="0 0 160 120" className="w-28 h-22 text-[#1198e8]" fill="none">
          <defs>
            <radialGradient id="meshDisc" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#222b35" />
              <stop offset="85%" stopColor="#141a21" />
              <stop offset="100%" stopColor="#080b0f" />
            </radialGradient>
          </defs>

          {/* Outer Multi-Hole Disc */}
          <circle cx="80" cy="60" r="45" fill="url(#meshDisc)" stroke="#1198e8" strokeWidth="2.5" />
          <circle cx="80" cy="60" r="41" stroke="#2a3542" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Center Hook & Loop Arbor */}
          <circle cx="80" cy="60" r="11" fill="#075eaf" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="80" cy="60" r="4" fill="#0d1116" />

          {/* Precision Mirka/3M Multi-hole Flow Extraction Pattern (Inner Ring) */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 80 + 19 * Math.cos(rad);
            const cy = 60 + 19 * Math.sin(rad);
            return <circle key={`in-${i}`} cx={cx} cy={cy} r="2.6" fill="#1198e8" stroke="#080b0f" strokeWidth="0.8" />;
          })}

          {/* Outer Ring 12 Vacuum Holes */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 80 + 31 * Math.cos(rad);
            const cy = 60 + 31 * Math.sin(rad);
            return <circle key={`out-${i}`} cx={cx} cy={cy} r="2.2" fill="#57b5ee" stroke="#080b0f" strokeWidth="0.8" />;
          })}
        </svg>

        <div className="flex items-center gap-1.5 mt-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
          <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">AUTONET MESH VACUUM DISC</span>
        </div>
      </div>
    );
  }

  // 5. Fasteners & Structural Rivets (Aerospace Grade Monobolt Fastener)
  if (cat.includes('fastener') || cat.includes('rivet') || cat.includes('clip') || cat.includes('screw') || code.includes('FST') || code.includes('BLT') || code.includes('CLP') || code.includes('RVT')) {
    return (
      <div className={`${baseBg} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(17,152,232,0.2),transparent_70%)] pointer-events-none" />

        <svg viewBox="0 0 160 120" className="w-28 h-22 text-[#1198e8]" fill="none">
          <defs>
            <linearGradient id="boltSteel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#252f3c" />
              <stop offset="40%" stopColor="#d8dde3" />
              <stop offset="60%" stopColor="#8c99a8" />
              <stop offset="100%" stopColor="#1e2630" />
            </linearGradient>
          </defs>

          {/* Flanged Hex Head / Structural Rivet Dome */}
          <path d="M64 30 L96 30 L92 42 L68 42 Z" fill="#075eaf" stroke="#1198e8" strokeWidth="2" />
          <ellipse cx="80" cy="30" rx="16" ry="4" fill="#57b5ee" />

          {/* Hardened Steel Shaft */}
          <rect x="74" y="42" width="12" height="52" fill="url(#boltSteel)" stroke="#2a3542" strokeWidth="1.5" />
          
          {/* Precision Metric Threads */}
          {[48, 55, 62, 69, 76, 83].map((y, i) => (
            <line key={i} x1="71" y1={y} x2="89" y2={y + 3} stroke="#1198e8" strokeWidth="2" strokeLinecap="round" />
          ))}

          {/* Chamfered Pilot Tip */}
          <path d="M74 94 L86 94 L80 102 Z" fill="#1198e8" />
        </svg>

        <div className="flex items-center gap-1.5 mt-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
          <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">10.9 HIGH-TENSILE ALLOY</span>
        </div>
      </div>
    );
  }

  // 6. Chemicals, Adhesives & Sealants (Polyurethane Cartridge & Precision Nozzle)
  if (cat.includes('chemical') || cat.includes('adhesive') || cat.includes('sealant') || cat.includes('clean') || code.includes('ADH') || code.includes('CHM')) {
    return (
      <div className={`${baseBg} ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(17,152,232,0.22),transparent_70%)] pointer-events-none" />

        <svg viewBox="0 0 160 120" className="w-28 h-22 text-[#1198e8]" fill="none">
          <defs>
            <linearGradient id="tubeAlu" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e2632" />
              <stop offset="50%" stopColor="#c5ced8" />
              <stop offset="100%" stopColor="#121820" />
            </linearGradient>
          </defs>

          {/* 310ml Aluminum Cartridge Cylinder */}
          <rect x="64" y="40" width="32" height="58" rx="2" fill="url(#tubeAlu)" stroke="#1198e8" strokeWidth="2" />
          
          {/* Threaded Collar & Pre-cut V-Nozzle */}
          <rect x="74" y="32" width="12" height="8" fill="#075eaf" stroke="#57b5ee" strokeWidth="1.5" />
          <path d="M76 32 L80 16 L84 32 Z" fill="#d8dde3" stroke="#2a3542" strokeWidth="1.2" />
          <line x1="80" y1="18" x2="80" y2="28" stroke="#1198e8" strokeWidth="1.5" />

          {/* Cartridge Technical Band */}
          <rect x="64" y="60" width="32" height="22" fill="#075eaf" opacity="0.85" />
          <line x1="68" y1="67" x2="92" y2="67" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="68" y1="73" x2="84" y2="73" stroke="#e0e8f0" strokeWidth="1.2" opacity="0.8" />
        </svg>

        <div className="flex items-center gap-1.5 mt-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">1-HR DRIVE-AWAY BOND</span>
        </div>
      </div>
    );
  }

  // 7. Safety, Power Tools & Workshop Equipment Default
  return (
    <div className={`${baseBg} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(17,152,232,0.18),transparent_70%)] pointer-events-none" />

      <svg viewBox="0 0 160 120" className="w-28 h-22 text-[#1198e8]" fill="none">
        <defs>
          <linearGradient id="toolSteel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#25303d" />
            <stop offset="50%" stopColor="#aab8c8" />
            <stop offset="100%" stopColor="#141a21" />
          </linearGradient>
        </defs>

        <rect x="44" y="32" width="72" height="56" rx="8" fill="#0e1318" stroke="#1198e8" strokeWidth="2.5" />
        <path d="M64 32 L64 22 L96 22 L96 32" stroke="#d8dde3" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Quality Seal Micro-Crest */}
        <circle cx="80" cy="60" r="15" fill="rgba(17,152,232,0.15)" stroke="#57b5ee" strokeWidth="1.5" />
        <path d="M80 50 L80 70 M70 60 L90 60" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className="flex items-center gap-1.5 mt-2 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] shadow-[0_0_6px_#1198e8]" />
        <span className="text-[10px] tracking-widest text-[#d8dde3] uppercase font-bold font-mono">CERTIFIED WORKSHOP SPEC</span>
      </div>
    </div>
  );
};

