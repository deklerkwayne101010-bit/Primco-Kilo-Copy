export interface Product {
  sku: string;
  name: string;
  category: string;
  categoryCode: string;
  categoryName: string;
  subcategory: string;
  subcategoryCode: string;
  subcategoryName: string;
  range: 'automotive-parts' | 'vehicle-glass' | 'paint-solutions' | 'tools-supplies';
  rangeName: string;
  unit: string;
  description: string;
  brand: string;
  demo?: boolean;
  featured?: boolean;
  inStock?: boolean;
  specs?: Record<string, string>;
  imageAlt?: string;
  badge?: string;
}

export interface RangeInfo {
  id: 'automotive-parts' | 'vehicle-glass' | 'paint-solutions' | 'tools-supplies';
  name: string;
  description: string;
  itemCount: number;
  highlight: string;
  image: string;
}

export interface SubcategoryInfo {
  slug: string;
  code: string;
  name: string;
  count: number;
}

export interface CategoryInfo {
  slug: string;
  code: string;
  name: string;
  range: 'automotive-parts' | 'vehicle-glass' | 'paint-solutions' | 'tools-supplies';
  description: string;
  productCount: number;
  iconName: string;
  subcategories: SubcategoryInfo[];
}

export const RANGES: RangeInfo[] = [
  {
    id: 'automotive-parts',
    name: 'Automotive Parts',
    description: 'Precision mechanical components, OEM-grade braking, air & oil filtration, batteries and workshop components.',
    itemCount: 420,
    highlight: 'Braking, Filtration & Wiper Systems',
    image: '/assets/images/automotive-parts-primeco.png'
  },
  {
    id: 'vehicle-glass',
    name: 'Vehicle Glass',
    description: 'Shatterprufe laminated windscreens, toughened side and rear glass, and OE polyurethane fitting compounds.',
    itemCount: 310,
    highlight: 'Laminated Glass & High-Modulus Adhesives',
    image: '/assets/images/vehicle-glass-primeco.png'
  },
  {
    id: 'paint-solutions',
    name: 'Paint Solutions',
    description: 'Professional refinishing coatings, high-build epoxy primers, HS clearcoats, spray guns and fine line masking.',
    itemCount: 560,
    highlight: 'Primers, Basecoats, Clearcoats & Masking',
    image: '/assets/images/paint-solutions-primeco.png'
  },
  {
    id: 'tools-supplies',
    name: 'Tools & Supplies',
    description: 'Dust-free abrasives, workshop hand tools, structural rivets, fasteners, PPE and pneumatic equipment.',
    itemCount: 890,
    highlight: 'Abrasives, Hand Tools, Fasteners & Safety',
    image: '/assets/images/tools-supplies-primeco.png'
  }
];

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'abrasives',
    code: 'A',
    name: 'Abrasives & Sanding Systems',
    range: 'tools-supplies',
    description: 'Hook & loop multihole discs, ceramic sanding sheets, ultra-thin cutting discs, and scuffing rolls.',
    productCount: 165,
    iconName: 'Disc',
    subcategories: [
      { slug: 'sanding-discs', code: 'A-1', name: 'Sanding Discs (Hook & Loop)', count: 68 },
      { slug: 'sanding-sheets', code: 'A-2', name: 'Sanding Sheets & Rolls', count: 34 },
      { slug: 'cutting-discs', code: 'A-3', name: 'Cutting & Grinding Discs', count: 42 },
      { slug: 'surface-prep', code: 'A-4', name: 'Surface Preparation & Scotch-Brite', count: 21 }
    ]
  },
  {
    slug: 'workshop-supplies',
    code: 'B',
    name: 'Cleaning & Workshop Consumables',
    range: 'tools-supplies',
    description: 'Industrial gun cleaners, paint mixing cups, lint-free wiping rolls, and fluid handling dispensers.',
    productCount: 154,
    iconName: 'ShieldAlert',
    subcategories: [
      { slug: 'gun-wash', code: 'B-1', name: 'Gun Wash & Solvents', count: 45 },
      { slug: 'mixing-supplies', code: 'B-2', name: 'Mixing Cups & Strainers', count: 48 },
      { slug: 'rags-wipes', code: 'B-3', name: 'Lint-Free Workshop Wipes', count: 32 },
      { slug: 'fluid-handling', code: 'B-4', name: 'Fluid Handling & Pumps', count: 29 }
    ]
  },
  {
    slug: 'hand-tools',
    code: 'C',
    name: 'Cutting & Workshop Hand Tools',
    range: 'tools-supplies',
    description: 'Chrome vanadium spanners, impact socket sets, door skin crimpers, locking grip pliers, and drivers.',
    productCount: 112,
    iconName: 'Hammer',
    subcategories: [
      { slug: 'sockets', code: 'C-1', name: 'Sockets & Ratchets', count: 38 },
      { slug: 'spanners', code: 'C-2', name: 'Combination Spanners', count: 28 },
      { slug: 'pliers', code: 'C-3', name: 'Grip & Locking Pliers', count: 24 },
      { slug: 'drivers', code: 'C-4', name: 'Torx & Hex Drivers', count: 22 }
    ]
  },
  {
    slug: 'paint-solutions',
    code: 'D',
    name: 'Paint Solutions & Refinishing',
    range: 'paint-solutions',
    description: 'Automotive primers, 2K rapid clearcoats, spectral basecoats, and heat-resistant crepe masking.',
    productCount: 184,
    iconName: 'Paintbrush',
    subcategories: [
      { slug: 'primers', code: 'D-1', name: '2K DTM Primers & Surfacers', count: 52 },
      { slug: 'clearcoats', code: 'D-2', name: 'HS Rapid Clearcoats', count: 44 },
      { slug: 'masking', code: 'D-3', name: 'Precision Masking Tape & Film', count: 56 },
      { slug: 'spray-guns', code: 'D-4', name: 'Refinish Spray Guns & Nozzles', count: 32 }
    ]
  },
  {
    slug: 'electrical',
    code: 'E',
    name: 'Automotive Electrical & Fusing',
    range: 'tools-supplies',
    description: 'Midi/Mega fuses, heatshrink terminals, flame-retardant conduit, and battery harness leads.',
    productCount: 88,
    iconName: 'Zap',
    subcategories: [
      { slug: 'fuses', code: 'E-1', name: 'Blade & Midi Fuses', count: 36 },
      { slug: 'terminals', code: 'E-2', name: 'Adhesive Heatshrink Terminals', count: 28 },
      { slug: 'insulation', code: 'E-3', name: 'High-Temp Harness Cloth Tape', count: 24 }
    ]
  },
  {
    slug: 'fasteners',
    code: 'F',
    name: 'Fasteners & Structural Rivets',
    range: 'tools-supplies',
    description: 'Grade 8.8 bolts, flange nuts, panel clips, and structural Magna-Lok blind rivets.',
    productCount: 230,
    iconName: 'Box',
    subcategories: [
      { slug: 'rivets', code: 'F-1', name: 'Structural Blind Monobolts', count: 72 },
      { slug: 'bolts-nuts', code: 'F-2', name: 'High-Tensile Flange Bolts & Nuts', count: 88 },
      { slug: 'clips', code: 'F-3', name: 'OEM Retainer & Trim Clips', count: 70 }
    ]
  },
  {
    slug: 'vehicle-glass',
    code: 'G',
    name: 'Vehicle Glass & Bonding Systems',
    range: 'vehicle-glass',
    description: 'Laminated windscreens, quarter glass, rear heated panels, primerless glass polyurethane sealants.',
    productCount: 98,
    iconName: 'Layers',
    subcategories: [
      { slug: 'windscreens', code: 'G-1', name: 'Acoustic Laminated Windscreens', count: 42 },
      { slug: 'side-glass', code: 'G-2', name: 'Toughened Side Glass', count: 26 },
      { slug: 'fitting-supplies', code: 'G-3', name: 'Polyurethane Adhesives & Primers', count: 30 }
    ]
  },
  {
    slug: 'automotive-parts',
    code: 'H',
    name: 'Mechanical & Braking Parts',
    range: 'automotive-parts',
    description: 'Heavy duty ceramic pads, OE grooved discs, cabin air filters, and heavy vehicle wiper assemblies.',
    productCount: 142,
    iconName: 'Wrench',
    subcategories: [
      { slug: 'braking', code: 'H-1', name: 'Ceramic Brake Pads & Discs', count: 68 },
      { slug: 'filters', code: 'H-2', name: 'Engine & Cabin Filters', count: 44 },
      { slug: 'wipers', code: 'H-3', name: 'Flat Wiper Blade Assemblies', count: 30 }
    ]
  },
  {
    slug: 'safety-ppe',
    code: 'S',
    name: 'Safety Equipment & PPE',
    range: 'tools-supplies',
    description: 'Half-mask twin respirators, A2P3 cartridges, eye protection, and spray technician overalls.',
    productCount: 92,
    iconName: 'ShieldAlert',
    subcategories: [
      { slug: 'respirators', code: 'S-1', name: 'Spray Booth Respirators & Filters', count: 38 },
      { slug: 'gloves', code: 'S-2', name: 'Heavy Nitrile & Work Gloves', count: 32 },
      { slug: 'overalls', code: 'S-3', name: 'Anti-Static Spray Overalls', count: 22 }
    ]
  },
  {
    slug: 'chemicals-adhesives',
    code: 'CH',
    name: 'Chemicals, Adhesives & Sealants',
    range: 'tools-supplies',
    description: 'Polyurethane windscreen bonding, 2K structural panel bond, seam sealers, industrial degreasers, and brake clean.',
    productCount: 118,
    iconName: 'ShieldCheck',
    subcategories: [
      { slug: 'windscreen-bonding', code: 'CH-1', name: 'Polyurethane Windscreen Adhesives', count: 34 },
      { slug: 'structural-bonding', code: 'CH-2', name: '2K Structural Panel Bonding', count: 26 },
      { slug: 'seam-sealers', code: 'CH-3', name: 'Brushable & Sprayable Seam Sealers', count: 28 },
      { slug: 'degreasers-cleaners', code: 'CH-4', name: 'Brake Clean & Industrial Degreasers', count: 30 }
    ]
  },
  {
    slug: 'power-tools',
    code: 'PT',
    name: 'Power Tools & Air Equipment',
    range: 'tools-supplies',
    description: 'Pneumatic random orbital sanders, air belt sanders, HVLP spray guns, and dust extraction turbines.',
    productCount: 64,
    iconName: 'Wrench',
    subcategories: [
      { slug: 'orbital-sanders', code: 'PT-1', name: 'Air Random Orbital Sanders 150mm', count: 22 },
      { slug: 'spray-guns', code: 'PT-2', name: 'HVLP & Trans-Tech Spray Guns', count: 24 },
      { slug: 'air-tools', code: 'PT-3', name: 'Pneumatic Die Grinders & Blow Guns', count: 18 }
    ]
  },
  {
    slug: 'fittings',
    code: 'FT',
    name: 'Fittings & Pneumatic Hardware',
    range: 'tools-supplies',
    description: 'Nitto/Euro high-flow pneumatic quick couplers, brass hose barbs, braided air hoses, and stainless hose clamps.',
    productCount: 76,
    iconName: 'Box',
    subcategories: [
      { slug: 'air-couplers', code: 'FT-1', name: 'High-Flow Air Couplers & Plugs', count: 28 },
      { slug: 'hose-clamps', code: 'FT-2', name: 'Stainless Steel Band Hose Clamps', count: 26 },
      { slug: 'air-lines', code: 'FT-3', name: 'Braided Anti-Static Air Hoses', count: 22 }
    ]
  }
];

export const PRODUCTS: Product[] = [
  // A - Abrasives
  {
    sku: 'PRM-SND-400',
    name: 'Mirka Abranet Net Mesh Sanding Discs 150mm (Grit P320)',
    category: 'abrasives',
    categoryCode: 'A',
    categoryName: 'Abrasives & Sanding Systems',
    subcategory: 'sanding-discs',
    subcategoryCode: 'A-1',
    subcategoryName: 'Sanding Discs (Hook & Loop)',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 50',
    brand: 'Mirka',
    description: 'Patented open polyamide mesh abrasive for virtually dustless sanding. Prevents clogging, cooler sanding temperature, and outlasts standard paper discs by up to 3x.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Diameter': '150mm (6")',
      'Grit': 'P320 Ultra-Fine Finish',
      'Attachment': 'Grip (Hook and Loop)',
      'Dust Extraction': 'Full surface vacuum airflow'
    }
  },
  {
    sku: 'PRM-SND-120',
    name: '3M Cubitron II Clean Sanding Hookit Disc 737U (Grit P120+)',
    category: 'abrasives',
    categoryCode: 'A',
    categoryName: 'Abrasives & Sanding Systems',
    subcategory: 'sanding-discs',
    subcategoryCode: 'A-1',
    subcategoryName: 'Sanding Discs (Hook & Loop)',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 50',
    brand: '3M Automotive',
    description: 'Precision Shaped Grain (PSG) technology that slices cleanly through hard primer and body filler with minimal heat buildup.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Grit': 'P120+',
      'Grain': 'Electrostatic Triangle Ceramic',
      'Diameter': '150mm multi-hole'
    }
  },
  {
    sku: 'PRM-SND-080',
    name: 'Mirka Golden Finish Sanding Discs 150mm P80 Rough Stripping',
    category: 'abrasives',
    categoryCode: 'A',
    categoryName: 'Abrasives & Sanding Systems',
    subcategory: 'sanding-discs',
    subcategoryCode: 'A-1',
    subcategoryName: 'Sanding Discs (Hook & Loop)',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 100',
    brand: 'Mirka',
    description: 'Aggressive aluminum oxide discs on D-weight paper backing for fast paint stripping, filler leveling, and seam smoothing.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Grit': 'P80 Coarse',
      'Hole Pattern': 'Multi-hole 15-hole standard',
      'Bonding': 'Resin over resin'
    }
  },
  {
    sku: 'PRM-CUT-115',
    name: 'Wurth Zebra Ultra-Thin Stainless Steel Cutting Disc 115x1.0mm',
    category: 'abrasives',
    categoryCode: 'A',
    categoryName: 'Abrasives & Sanding Systems',
    subcategory: 'cutting-discs',
    subcategoryCode: 'A-3',
    subcategoryName: 'Cutting & Grinding Discs',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per tub of 25',
    brand: 'Wurth',
    description: 'Fast, burr-free cuts on high-strength automotive body steel, door sills, and quarter panels with reduced material loss.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Dimensions': '115mm x 1.0mm x 22.23mm bore',
      'Max RPM': '13,300 RPM (80 m/s)',
      'Composition': 'Iron, sulphur, chlorine-free (<0.1%)'
    }
  },
  {
    sku: 'PRM-PAD-001',
    name: 'Scotch-Brite General Purpose Hand Pad (Maroon / Very Fine)',
    category: 'abrasives',
    categoryCode: 'A',
    categoryName: 'Abrasives & Sanding Systems',
    subcategory: 'surface-prep',
    subcategoryCode: 'A-4',
    subcategoryName: 'Surface Preparation & Scotch-Brite',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 20 pads',
    brand: '3M Automotive',
    description: 'Conformable nylon non-woven web pad for keying paintwork in door shuts, handles, and swage lines prior to blend application.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Grade': 'Very Fine (320-400 equivalent)',
      'Dimensions': '158mm x 224mm',
      'Washable': 'Yes, water & solvent resistant'
    }
  },

  // B - Cleaning & Workshop Consumables
  {
    sku: 'PRM-CLN-200',
    name: 'Primeco Professional Gun Wash & Degreasing Thinner (25L Drum)',
    category: 'workshop-supplies',
    categoryCode: 'B',
    categoryName: 'Cleaning & Workshop Consumables',
    subcategory: 'gun-wash',
    subcategoryCode: 'B-1',
    subcategoryName: 'Gun Wash & Solvents',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per 25L drum',
    brand: 'Primeco',
    description: 'Fast-flushing virgin solvent blend designed for rapid breakdown of 2K clearcoats, epoxy primers, and basecoats in gravity guns and wash tanks.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Flash Point': '<21°C',
      'Evaporation Rate': 'Fast flushing',
      'Packaging': 'Heavy gauge UN certified steel drum'
    }
  },
  {
    sku: 'PRM-MIX-100',
    name: 'Calibrated Paint Mixing Cups with Lids 650ml (Box of 200)',
    category: 'workshop-supplies',
    categoryCode: 'B',
    categoryName: 'Cleaning & Workshop Consumables',
    subcategory: 'mixing-supplies',
    subcategoryCode: 'B-2',
    subcategoryName: 'Mixing Cups & Strainers',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per carton of 200',
    brand: 'DeVilbiss',
    description: 'Solvent-resistant transparent polypropylene cups with clearly printed mix ratio scales (2:1, 3:1, 4:1, 5:1, 6:1) and volume graduations.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Capacity': '650ml',
      'Scale Ratios': '2:1, 3:1, 4:1, 5:1, 10% / 20% thinners',
      'Lids Included': 'Yes, leak-tight snap lock'
    }
  },
  {
    sku: 'PRM-VLT-110',
    name: 'Primeco Detailer Pro Car Wash & Carnauba Wax Shampoo (25L)',
    category: 'workshop-supplies',
    categoryCode: 'B',
    categoryName: 'Cleaning & Workshop Consumables',
    subcategory: 'gun-wash',
    subcategoryCode: 'B-1',
    subcategoryName: 'Gun Wash & Solvents',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per 25L drum',
    brand: 'Primeco',
    description: 'Concentrated pH-neutral pre-delivery car wash with pure Brazilian carnauba wax for spotless delivery shine that will not strip fresh finishes.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Dilution Ratio': '1:100 with water',
      'pH': '7.2 Neutral',
      'Silicone Free': 'Yes (Body shop safe)'
    }
  },

  // C - Hand Tools
  {
    sku: 'PRM-TOL-320',
    name: 'Stanley Expert 150-Piece Mechanical & Panel Shop Tool Master Set',
    category: 'hand-tools',
    categoryCode: 'C',
    categoryName: 'Cutting & Workshop Hand Tools',
    subcategory: 'sockets',
    subcategoryCode: 'C-1',
    subcategoryName: 'Sockets & Ratchets',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per complete chest',
    brand: 'Stanley Expert',
    description: 'Comprehensive chrome vanadium 1/4", 3/8", and 1/2" drive socket sets with 72-tooth micro ratchets, flex heads, and Torx/Spline drivers specifically configured for modern vehicle chassis disassembly.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Material': 'Drop-Forged High Polish Chrome Vanadium',
      'Ratchets': '72-tooth quick release (5° arc swing)',
      'Case': 'Heavy-gauge steel modular toolbox',
      'Warranty': 'Lifetime Hand Tool Replacement'
    }
  },
  {
    sku: 'PRM-SPN-012',
    name: 'Wurth Metric Combination Spanner Set (8mm to 24mm, 14-Piece)',
    category: 'hand-tools',
    categoryCode: 'C',
    categoryName: 'Cutting & Workshop Hand Tools',
    subcategory: 'spanners',
    subcategoryCode: 'C-2',
    subcategoryName: 'Combination Spanners',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per roll-up canvas pouch',
    brand: 'Wurth',
    description: 'Slimline ring end with 15° offset for tight engine bays and panel gaps. Satin matte chrome finish prevents slippage.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Sizes': '8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 24 mm',
      'Standard': 'DIN 3113A / ISO 7738',
      'Profile': 'MaxiDrive round flank protection'
    }
  },
  {
    sku: 'PRM-PLR-004',
    name: 'Knipex Panel Beater Grip Locking Pliers 250mm',
    category: 'hand-tools',
    categoryCode: 'C',
    categoryName: 'Cutting & Workshop Hand Tools',
    subcategory: 'pliers',
    subcategoryCode: 'C-3',
    subcategoryName: 'Grip & Locking Pliers',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per each',
    brand: 'Stanley Expert',
    description: 'High clamping pressure with toggle lever action. Wide flat jaws hold sheet metal panels firmly in place during tack welding.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Clamping Span': '0 - 45mm',
      'Jaw Shape': 'Flat duckbill panel grip',
      'Mechanism': 'Adjustment screw & quick release lever'
    }
  },

  // D - Paint Solutions & Refinishing
  {
    sku: 'PRM-PNT-104',
    name: 'Spies Hecker Permafleet 2K High-Build DTM Primer (Grey 5L)',
    category: 'paint-solutions',
    categoryCode: 'D',
    categoryName: 'Paint Solutions & Refinishing',
    subcategory: 'primers',
    subcategoryCode: 'D-1',
    subcategoryName: '2K DTM Primers & Surfacers',
    range: 'paint-solutions',
    rangeName: 'Paint Solutions',
    unit: 'Per 5L drum',
    brand: 'Spies Hecker',
    description: 'Direct-to-metal (DTM) two-pack acrylic primer filler with active anti-corrosive pigments. Provides extraordinary film build, feather-edge holdout, and silky wet-on-wet or sandable capabilities.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Volume': '5 Litres',
      'Mixing Ratio': '4:1 with VHS Hardener',
      'Dry Film Build': 'Up to 240 microns (3 coats)',
      'Substrates': 'Bare steel, galvanised steel, OEM e-coat, sanded GRP'
    }
  },
  {
    sku: 'PRM-CLR-550',
    name: 'PPG Nexa Autocolor P190-7000 Express Clearcoat (5L + 2.5L)',
    category: 'paint-solutions',
    categoryCode: 'D',
    categoryName: 'Paint Solutions & Refinishing',
    subcategory: 'clearcoats',
    subcategoryCode: 'D-2',
    subcategoryName: 'HS Rapid Clearcoats',
    range: 'paint-solutions',
    rangeName: 'Paint Solutions',
    unit: 'Per kit (7.5L total)',
    brand: 'PPG Refinish',
    description: 'Ultra-fast curing premium polyurethane clearcoat. Cures to extreme gloss in 15 minutes at 60°C bake, dramatically boosting panel shop spray booth cycle times.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Bake Cycle': '15 mins @ 60°C or 20 mins air dry',
      'Finish': 'Deep mirror gloss >95 units @ 20°',
      'UV Absorbers': 'High-density twin UV stabilizers'
    }
  },
  {
    sku: 'PRM-MSK-075',
    name: '3M Scotch 233+ High-Performance Green Masking Tape 48mm',
    category: 'paint-solutions',
    categoryCode: 'D',
    categoryName: 'Paint Solutions & Refinishing',
    subcategory: 'masking',
    subcategoryCode: 'D-3',
    subcategoryName: 'Precision Masking Tape & Film',
    range: 'paint-solutions',
    rangeName: 'Paint Solutions',
    unit: 'Per box of 24 rolls',
    brand: '3M Automotive',
    description: 'Industry benchmark automotive masking tape designed for sharpest paint lines, moisture resistance with waterborne bases, and clean peeling without glue residue.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Width': '48mm (2")',
      'Length': '55m per roll',
      'Heat Resistance': '121°C for 30 minutes'
    }
  },
  {
    sku: 'PRM-PNT-990',
    name: 'DeVilbiss DV1 Clearcoat Spray Gun Digital Gauge Edition',
    category: 'paint-solutions',
    categoryCode: 'D',
    categoryName: 'Paint Solutions & Refinishing',
    subcategory: 'spray-guns',
    subcategoryCode: 'D-4',
    subcategoryName: 'Refinish Spray Guns & Nozzles',
    range: 'paint-solutions',
    rangeName: 'Paint Solutions',
    unit: 'Per boxed kit',
    brand: 'DeVilbiss',
    description: 'Advanced atomization DV1-C1 PLUS air cap with fluid tip engineered for high-solid clearcoats with zero orange-peel ripple.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Tip Size': '1.3mm',
      'Air Pressure': '1.5 bar (22 psi)',
      'Air Consumption': '285 l/min'
    }
  },

  // E - Electrical
  {
    sku: 'PRM-ELC-042',
    name: 'Automotive Mini & Standard Blade Fuse Assortment Kit (300-Piece)',
    category: 'electrical',
    categoryCode: 'E',
    categoryName: 'Automotive Electrical & Fusing',
    subcategory: 'fuses',
    subcategoryCode: 'E-1',
    subcategoryName: 'Blade & Midi Fuses',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per sorted organizer tray',
    brand: 'Bosch',
    description: 'Color-coded zinc alloy blade fuses (5A to 35A) with transparent housings and fast-acting fuse element for wire harness overload protection.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Volt Rating': '32V DC',
      'Ratings': '5A, 7.5A, 10A, 15A, 20A, 25A, 30A, 35A',
      'Standards': 'SAE J1284 / ISO 8820-3'
    }
  },
  {
    sku: 'PRM-ELC-901',
    name: 'Heatshrink Crimp Terminals Waterproof Assortment (250-Piece)',
    category: 'electrical',
    categoryCode: 'E',
    categoryName: 'Automotive Electrical & Fusing',
    subcategory: 'terminals',
    subcategoryCode: 'E-2',
    subcategoryName: 'Adhesive Heatshrink Terminals',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per case of 250',
    brand: 'Wurth',
    description: 'Dual-wall adhesive-lined heatshrink butt connectors and ring terminals that seal tight against moisture and road salt ingress.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Wire Range': '0.5mm² - 6.0mm² (AWG 22-10)',
      'Shrink Ratio': '3:1 with hot-melt glue lining',
      'Insulation': 'Cross-linked polyolefin'
    }
  },
  {
    sku: 'PRM-ELC-330',
    name: 'Coroplast High-Temp Engine Harness Cloth Tape 19mm x 25m',
    category: 'electrical',
    categoryCode: 'E',
    categoryName: 'Automotive Electrical & Fusing',
    subcategory: 'insulation',
    subcategoryCode: 'E-3',
    subcategoryName: 'High-Temp Harness Cloth Tape',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per sleeve of 10 rolls',
    brand: 'Wurth',
    description: 'OEM polyester fleece tape providing superior noise vibration dampening, abrasion protection, and 150°C continuous thermal rating.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Temp Range': '-40°C to +150°C (3000h)',
      'Substrate': 'PET fleece with synthetic rubber adhesive',
      'Abrasion Class': 'Class D (LV 312)'
    }
  },

  // F - Fasteners & Rivets
  {
    sku: 'PRM-FST-890',
    name: 'Huck Magna-Lok 6.4mm Structural Blind Monobolt Rivets',
    category: 'fasteners',
    categoryCode: 'F',
    categoryName: 'Fasteners & Structural Rivets',
    subcategory: 'rivets',
    subcategoryCode: 'F-1',
    subcategoryName: 'Structural Blind Monobolts',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 250',
    brand: 'Wurth',
    description: 'OEM approved structural breakstem fasteners providing high shear and tensile strength for aluminum and high-strength steel collision repairs. Internal mechanical lock ensures 100% pin retention and waterproof seal.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Diameter': '6.4mm (1/4")',
      'Material': 'Steel body with zinc trivalent coating',
      'Grip Range': '2.1mm - 9.5mm',
      'Shear Strength': '14.2 kN'
    }
  },
  {
    sku: 'PRM-BLT-880',
    name: 'High-Tensile Flange Bolt & Nut Assortment Box (M6-M10, Grade 8.8)',
    category: 'fasteners',
    categoryCode: 'F',
    categoryName: 'Fasteners & Structural Rivets',
    subcategory: 'bolts-nuts',
    subcategoryCode: 'F-2',
    subcategoryName: 'High-Tensile Flange Bolts & Nuts',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per 600-piece organizer box',
    brand: 'Wurth',
    description: 'Serrated flange metric bolts and locknuts common across German, Japanese, and domestic vehicle chassis assemblies.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Grade': '8.8 Metric High Tensile',
      'Finishing': 'Yellow Passivated Zinc',
      'Organizer': '24-compartment shatterproof storage'
    }
  },
  {
    sku: 'PRM-CLP-500',
    name: 'Universal Automotive Door Trim & Bumper Retainer Clips (500-Piece)',
    category: 'fasteners',
    categoryCode: 'F',
    categoryName: 'Fasteners & Structural Rivets',
    subcategory: 'clips',
    subcategoryCode: 'F-3',
    subcategoryName: 'OEM Retainer & Trim Clips',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 500 assorted',
    brand: 'Wurth',
    description: 'Heavy duty nylon body panel fasteners covering Toyota, VW, Ford, BMW, and Mercedes-Benz splash guards and bumpers.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Material': 'High-density impact nylon',
      'Varieties': '18 distinct OEM vehicle profiles'
    }
  },

  // G - Vehicle Glass
  {
    sku: 'PRM-GLS-882',
    name: 'Shatterprufe Solar-Control Acoustic Laminated Windscreen',
    category: 'vehicle-glass',
    categoryCode: 'G',
    categoryName: 'Vehicle Glass & Bonding Systems',
    subcategory: 'windscreens',
    subcategoryCode: 'G-1',
    subcategoryName: 'Acoustic Laminated Windscreens',
    range: 'vehicle-glass',
    rangeName: 'Vehicle Glass',
    unit: 'Per each',
    brand: 'Shatterprufe',
    description: 'OEM-specification double-laminated windscreen featuring high-impact acoustic PVB interlayer and green solar tint. Compatible with forward-facing ADAS camera mounting brackets.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Glass Spec': '4.96mm Acoustic Solar Green',
      'Certification': 'SABS 1191 & ECE R43',
      'ADAS Ready': 'Yes with optical sensor bracket',
      'Shade Band': 'Blue Top Shade'
    }
  },
  {
    sku: 'PRM-GLS-119',
    name: 'Toughened Curved Driver Door Glass (Green Tint)',
    category: 'vehicle-glass',
    categoryCode: 'G',
    categoryName: 'Vehicle Glass & Bonding Systems',
    subcategory: 'side-glass',
    subcategoryCode: 'G-2',
    subcategoryName: 'Toughened Side Glass',
    range: 'vehicle-glass',
    rangeName: 'Vehicle Glass',
    unit: 'Per each',
    brand: 'Shatterprufe',
    description: 'Precision tempered side door safety glass manufactured to OEM curve radius with diamond arrissed safety edges.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Thickness': '3.5mm Toughened',
      'Safety Standard': 'SABS Approved',
      'Location': 'Front Right / Driver Side'
    }
  },
  {
    sku: 'PRM-ADH-310',
    name: 'SikaTack MOVE Fast 1-Hour Drive-Away Polyurethane Adhesive',
    category: 'vehicle-glass',
    categoryCode: 'G',
    categoryName: 'Vehicle Glass & Bonding Systems',
    subcategory: 'fitting-supplies',
    subcategoryCode: 'G-3',
    subcategoryName: 'Polyurethane Adhesives & Primers',
    range: 'vehicle-glass',
    rangeName: 'Vehicle Glass',
    unit: 'Per 310ml cartridge',
    brand: 'Sikaflex',
    description: 'High-modulus, non-conductive primerless windscreen adhesive. Safe drive-away time of 60 minutes with twin airbags at temperatures from -10°C to 40°C.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Drive-Away Time': '60 minutes (FMVSS 212/208)',
      'Volume': '310ml sausage / cartridge',
      'Resistivity': 'Non-conductive (integrated antenna safe)'
    }
  },

  // H - Mechanical & Braking
  {
    sku: 'PRM-BRK-019',
    name: 'Ferodo Premier High-Friction Brake Pad Set (Front)',
    category: 'automotive-parts',
    categoryCode: 'H',
    categoryName: 'Mechanical & Braking Parts',
    subcategory: 'braking',
    subcategoryCode: 'H-1',
    subcategoryName: 'Ceramic Brake Pads & Discs',
    range: 'automotive-parts',
    rangeName: 'Automotive Parts',
    unit: 'Per axle set',
    brand: 'Ferodo',
    description: 'Premium low-metallic compound brake pads with anti-squeal shims and chamfered edges. Engineered for rapid bed-in and consistent stopping power across South African commercial and passenger fleets.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Position': 'Front Axle',
      'Compound': 'Low-Metallic Ceramic Hybrid',
      'Sensor': 'Integrated Acoustic Wear Indicator',
      'Approval': 'ECE R90 Certified'
    }
  },
  {
    sku: 'PRM-BRK-339',
    name: 'Brembo Coated High Carbon Brake Discs (Pair)',
    category: 'automotive-parts',
    categoryCode: 'H',
    categoryName: 'Mechanical & Braking Parts',
    subcategory: 'braking',
    subcategoryCode: 'H-1',
    subcategoryName: 'Ceramic Brake Pads & Discs',
    range: 'automotive-parts',
    rangeName: 'Automotive Parts',
    unit: 'Per boxed pair',
    brand: 'Bosch',
    description: 'UV coated anti-corrosion ventilated brake rotor discs. Ready to fit straight from the box with no anti-rust oil cleaning required.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Diameter': '312mm Vented',
      'Coating': 'Solvent-free UV protection',
      'Balance': 'Dynamic computer checked'
    }
  },
  {
    sku: 'PRM-FLT-204',
    name: 'GUD Heavy Duty Air Filter Element (Commercial Fleet)',
    category: 'automotive-parts',
    categoryCode: 'H',
    categoryName: 'Mechanical & Braking Parts',
    subcategory: 'filters',
    subcategoryCode: 'H-2',
    subcategoryName: 'Engine & Cabin Filters',
    range: 'automotive-parts',
    rangeName: 'Automotive Parts',
    unit: 'Per unit',
    brand: 'Bosch',
    description: 'High-capacity pleated cellulose air filter element with polyurethane end seals. Traps 99.8% of micro-particles in dusty highveld conditions.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Efficiency': '99.8% at 10 microns',
      'Housing Type': 'Cylindrical Radial Seal',
      'Service Interval': '30,000 km'
    }
  },
  {
    sku: 'PRM-WPR-480',
    name: 'Bosch Aerotwin Flat Wiper Blade Set 650mm / 450mm',
    category: 'automotive-parts',
    categoryCode: 'H',
    categoryName: 'Mechanical & Braking Parts',
    subcategory: 'wipers',
    subcategoryCode: 'H-3',
    subcategoryName: 'Flat Wiper Blade Assemblies',
    range: 'automotive-parts',
    rangeName: 'Automotive Parts',
    unit: 'Per twin pack',
    brand: 'Bosch',
    description: 'Aerodynamic frameless wiper blades with Power Protection Plus coating for streak-free wiping even at high highway speeds.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Length': '650mm (26") / 450mm (18")',
      'Adapter': 'Multi-Clip Universal OE fitment',
      'Rubber': 'Synthetic Dual-Rubber Graphite'
    }
  },

  // S - Safety & PPE
  {
    sku: 'PRM-WRK-705',
    name: '3M 6000-Series Reusable Respirator Half-Mask Kit with A2P3 Filters',
    category: 'safety-ppe',
    categoryCode: 'S',
    categoryName: 'Safety Equipment & PPE',
    subcategory: 'respirators',
    subcategoryCode: 'S-1',
    subcategoryName: 'Spray Booth Respirators & Filters',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per kit with spare filters',
    brand: '3M Automotive',
    description: 'Complete spray booth respiratory protection kit. Certified against isocyanates, organic vapours, paint mists, and toxic sanding particulates. Soft hypoallergenic silicone facepiece with cradle head harness.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Protection Rating': 'EN140:1998 / CE 0086 / SABS Approved',
      'Cartridges': 'Twin A2 Organic Vapour + P3 Particulate Traps',
      'Size': 'Medium universal fit',
      'Replacement Cartridges': '3M 6055 bayonet type'
    }
  },
  {
    sku: 'PRM-PPE-GLV',
    name: 'Semperguard Nitrile Heavy Duty Textured Gloves (Black)',
    category: 'safety-ppe',
    categoryCode: 'S',
    categoryName: 'Safety Equipment & PPE',
    subcategory: 'gloves',
    subcategoryCode: 'S-2',
    subcategoryName: 'Heavy Nitrile & Work Gloves',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 100',
    brand: 'Wurth',
    description: 'Thick 6.0 mil chemical and solvent resistant nitrile disposable gloves with diamond grip texture for handling oily parts and wet paint.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Thickness': '6.0 mil (0.15mm)',
      'Material': '100% Powder-Free Nitrile',
      'Sizes': 'M / L / XL Available',
      'Resistance': 'Hydrocarbons, Thinners & Degreasers'
    }
  },
  {
    sku: 'PRM-PPE-OVR',
    name: '3M 50425 Anti-Static Breathable Spray Technician Overalls (Large)',
    category: 'safety-ppe',
    categoryCode: 'S',
    categoryName: 'Safety Equipment & PPE',
    subcategory: 'overalls',
    subcategoryCode: 'S-3',
    subcategoryName: 'Anti-Static Spray Overalls',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each',
    brand: '3M Automotive',
    description: 'Lint-free polyester fabric meeting EN 1149 anti-static standards. Breathable back panel prevents heat buildup inside spray booths.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Size': 'Large (Universal)',
      'Standard': 'EN 1149-5 Anti-Static Certification',
      'Hood': 'Two-panel hood with elastic ankle and cuffs',
      'Lint Rating': 'Zero lint shed for flawless clearcoat'
    }
  },

  // CH - Chemicals, Adhesives & Sealants
  {
    sku: 'PRM-CHM-256',
    name: 'Sikaflex 256 High-Modulus Primerless Windscreen Adhesive (310ml)',
    category: 'chemicals-adhesives',
    categoryCode: 'CH',
    categoryName: 'Chemicals, Adhesives & Sealants',
    subcategory: 'windscreen-bonding',
    subcategoryCode: 'CH-1',
    subcategoryName: 'Polyurethane Windscreen Adhesives',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: '310ml Cartridge',
    brand: 'Sikaflex',
    description: 'Cold-applied OEM polyurethane adhesive for direct windscreen glazing. 2-hour Safe Drive-Away Time with twin airbags.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Volume': '310ml cartridge with V-nozzle',
      'Drive-Away Time': '2 Hours (FMVSS 212 compliant)',
      'Conductivity': 'Non-conductive, suitable for integrated antennas',
      'Modulus': 'High modulus formulation'
    }
  },
  {
    sku: 'PRM-CHM-8115',
    name: '3M 08115 Panel Bonding Adhesive 2-Part Epoxy (200ml Duo-Pack)',
    category: 'chemicals-adhesives',
    categoryCode: 'CH',
    categoryName: 'Chemicals, Adhesives & Sealants',
    subcategory: 'structural-bonding',
    subcategoryCode: 'CH-2',
    subcategoryName: '2K Structural Panel Bonding',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: '200ml Dual Cartridge',
    brand: '3M Automotive',
    description: 'OEM approved two-part structural epoxy for bonding steel, aluminum, and SMC quarter panels, roof skins, and bedside panels. Contains glass beads for bond-line control.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Ratio': '2:1 mixing ratio',
      'Work Time': '90 minutes at 21°C',
      'Clamp Time': '4 hours (heat curable in 30 min)',
      'Corrosion Protection': 'Contains rust-inhibiting epoxy matrix'
    }
  },
  {
    sku: 'PRM-CHM-BRK',
    name: 'Wurth Sabesto Fast Brake Cleaner & Industrial Degreaser (500ml)',
    category: 'chemicals-adhesives',
    categoryCode: 'CH',
    categoryName: 'Chemicals, Adhesives & Sealants',
    subcategory: 'degreasers-cleaners',
    subcategoryCode: 'CH-4',
    subcategoryName: 'Brake Clean & Industrial Degreasers',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 12 (500ml cans)',
    brand: 'Wurth',
    description: 'Ultra fast evaporating degreasing solvent. Flushes away brake dust, hydraulic fluid, heavy grease, and stubborn road grime with zero residue.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Volume': '500ml pressurized spray can',
      'Residue': 'Zero residue rapid dry',
      'Propellant': 'CO2 propellant for 360-degree spray',
      'Acetone Content': 'Acetone-free formulation'
    }
  },

  // PT - Power Tools & Air Equipment
  {
    sku: 'PRM-PWR-650',
    name: 'Mirka PROS 650CV Pneumatic Random Orbital Sander 150mm (5.0mm Orbit)',
    category: 'power-tools',
    categoryCode: 'PT',
    categoryName: 'Power Tools & Air Equipment',
    subcategory: 'orbital-sanders',
    subcategoryCode: 'PT-1',
    subcategoryName: 'Air Random Orbital Sanders 150mm',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each in protective case',
    brand: 'Mirka',
    description: 'Ergonomic central vacuum air sander developed specifically for automotive collision workshops. Maximum dust suction even on low air power.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Orbit': '5.0 mm (3/16")',
      'Pad Size': '150mm (6") Multihole Grip Pad',
      'Air Pressure': '6.2 bar (90 PSI)',
      'Weight': '930 grams ultra lightweight'
    }
  },
  {
    sku: 'PRM-PWR-DV1',
    name: 'DeVilbiss DV1 Clearcoat Gravity Feed Spray Gun with C1+ Air Cap',
    category: 'power-tools',
    categoryCode: 'PT',
    categoryName: 'Power Tools & Air Equipment',
    subcategory: 'spray-guns',
    subcategoryCode: 'PT-2',
    subcategoryName: 'HVLP & Trans-Tech Spray Guns',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Complete kit with gauge & cup',
    brand: 'DeVilbiss',
    description: 'Precision engineered spray gun dedicated to modern high-solids clearcoats. Superior atomization with consistent droplet size reduces orange peel effect.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Tip Size': '1.3 mm fluid tip',
      'Air Cap': 'DV1-C1+ PLUS Clearcoat Cap',
      'Inlet Pressure': '1.5 to 2.0 bar',
      'Cup Capacity': '560ml Acetal gravity cup'
    }
  },

  // FT - Fittings & Pneumatic Hardware
  {
    sku: 'PRM-FIT-NIT',
    name: 'High-Flow Nitto Type 1/4" BSP Male Quick Release Pneumatic Coupler',
    category: 'fittings',
    categoryCode: 'FT',
    categoryName: 'Fittings & Pneumatic Hardware',
    subcategory: 'air-couplers',
    subcategoryCode: 'FT-1',
    subcategoryName: 'High-Flow Air Couplers & Plugs',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per pack of 5',
    brand: 'Wurth',
    description: 'Hardened steel industrial air couplings. High-flow internal orifice delivers up to 30% higher air volume to sanders and impact wrenches compared to standard fittings.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Thread': '1/4" BSP Male thread',
      'Profile': 'Nitto High-Flow interchange',
      'Material': 'Hardened chrome-plated steel',
      'Max Working Pressure': '16 bar (230 PSI)'
    }
  },
  {
    sku: 'PRM-FIT-CLM',
    name: 'Wurth Stainless Steel 9mm Band Hose Clamps Assortment (16mm to 40mm)',
    category: 'fittings',
    categoryCode: 'FT',
    categoryName: 'Fittings & Pneumatic Hardware',
    subcategory: 'hose-clamps',
    subcategoryCode: 'FT-2',
    subcategoryName: 'Stainless Steel Band Hose Clamps',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Box of 50 assorted clamps',
    brand: 'Wurth',
    description: 'W3 grade stainless steel worm drive clamps with embossed band edges that prevent damage to silicone radiator hoses and air lines.',
    featured: false,
    inStock: true,
    demo: false,
    specs: {
      'Band Width': '9.0 mm',
      'Material': 'AISI 430 Stainless steel band & housing',
      'Screw': '7mm hex head with slotted drive',
      'Sizes in Box': '16-27mm (20x), 20-32mm (20x), 25-40mm (10x)'
    }
  },

  // Additional Fasteners
  {
    sku: 'PRM-FST-MNB',
    name: 'Huck Magna-Lok Structural Blind Monobolts 6.4mm Steel (Grip 1.6-15.9mm)',
    category: 'fasteners',
    categoryCode: 'F',
    categoryName: 'Fasteners & Structural Rivets',
    subcategory: 'rivets',
    subcategoryCode: 'F-1',
    subcategoryName: 'Structural Blind Monobolts',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Per box of 250',
    brand: 'Wurth',
    description: 'Heavy structural blind fasteners engineered for automotive chassis rails, truck body builders, and replacement B-pillar structural joints. 360-degree mechanical internal lock.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Diameter': '6.4 mm (1/4")',
      'Grip Range': '1.6 mm - 15.9 mm wide grip',
      'Shear Strength': '14.2 kN',
      'Tensile Strength': '10.5 kN'
    }
  },
  {
    sku: 'PRM-FST-KIT',
    name: 'OEM Automotive Bumper & Wheel Arch Trim Clip Master Assortment (350 Pcs)',
    category: 'fasteners',
    categoryCode: 'F',
    categoryName: 'Fasteners & Structural Rivets',
    subcategory: 'clips',
    subcategoryCode: 'F-3',
    subcategoryName: 'OEM Retainer & Trim Clips',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Storage case with 350 clips',
    brand: 'Stanley Expert',
    description: '12 most popular automotive body panel retainer push-pins covering Toyota, Volkswagen, Ford, BMW, and Hyundai fender liners, bumpers, and side skirts.',
    featured: true,
    inStock: true,
    demo: false,
    specs: {
      'Quantity': '350 assorted clips in 12 divided compartments',
      'Material': 'High-density impact nylon 66',
      'Applications': 'Bumper covers, fender liners, grille clips, weatherstrips'
    }
  }
];

export const BRANDS = [
  { name: '3M Automotive', tag: 'Abrasives, PPE, Masking & Sealants', count: 84 },
  { name: 'Shatterprufe', tag: 'Laminated Windscreens & Automotive Glass', count: 120 },
  { name: 'Sikaflex', tag: 'Polyurethane Windscreen Adhesives', count: 32 },
  { name: 'PPG Refinish', tag: 'Automotive Coatings & Clearcoats', count: 96 },
  { name: 'Spies Hecker', tag: '2K Primers & Commercial Coatings', count: 74 },
  { name: 'Mirka', tag: 'Dust-Free Abranet Mesh Abrasives', count: 52 },
  { name: 'Wurth', tag: 'Fasteners, Chemical Sealants & Hand Tools', count: 140 },
  { name: 'Bosch', tag: 'Braking Systems, Electrical & Wipers', count: 68 },
  { name: 'Ferodo', tag: 'Brake Pads & Heavy Fleet Friction', count: 45 },
  { name: 'DeVilbiss', tag: 'Professional Refinish Spray Guns', count: 28 },
  { name: 'Festool Automotive', tag: 'Random Orbital Sanders & Dust Extractors', count: 34 },
  { name: 'Stanley Expert', tag: 'Sockets, Spanners & Chassis Tools', count: 62 }
];

export const TEAM_MEMBERS = [
  {
    name: 'Dean Strydom',
    role: 'DIRECTOR / SALES',
    bio: 'Over 18 years in automotive panel beating and collision repair supply across Gauteng. Dean oversees strategic procurement, direct panel shop trade relationships, and urgent turnaround logistics.',
    phone: '+27 (0)79 901 1544',
    cell: '079 901 1544',
    whatsapp: '+27799011544',
    email: 'dean@primeco.co.za',
    image: '/assets/images/team-dean-strydom.png',
    initials: 'DS'
  },
  {
    name: 'Chucky Buys',
    role: 'SALES MANAGER',
    bio: 'The friendly face behind PRIMECO client service and sales support. Known for his approachable personality, strong communication skills, and commitment to helping clients find the right automotive workshop solutions.',
    phone: '+27 (0)76 721 1286',
    cell: '076 721 1286',
    whatsapp: '+27767211286',
    email: 'sales@primeco.co.za',
    image: '/assets/images/team-chucky-buys.png',
    initials: 'CB'
  },
  {
    name: 'Lente Kemp',
    role: 'ACCOUNTS MANAGER',
    bio: 'Manages merchant facilities, monthly trade invoicing, 30-day terms reconciliations, and vendor credit applications for approved body repair centres.',
    phone: '+27 (0)61 295 4224',
    cell: '061 295 4224',
    whatsapp: '+27612954224',
    email: 'accounts@primeco.co.za',
    image: '/assets/images/team-lente-kemp.png',
    initials: 'LK'
  }
];

export const TESTIMONIALS = [
  {
    quote: "When a customer's BMW or Hilux is stuck on the chassis bench waiting for windscreen adhesives or 3M abrasives, Primeco gets the delivery van to our workshop in Alrode within hours. Dean understands panel shop urgency.",
    name: "Marthinus van der Merwe",
    role: "Workshop Foreman",
    company: "Alberton Auto Body & Collision Repair",
    rating: 5
  },
  {
    quote: "Their trade account terms and reliable supply of Spies Hecker primer and genuine structural rivets have made Primeco our primary consumable partner. No chasing backorders.",
    name: "Sipho Dlamini",
    role: "Procurement Director",
    company: "Apex Coachworks Gauteng",
    rating: 5
  },
  {
    quote: "The parts sourcing service is unmatched. If an odd quarter glass or imported clip isn't in their standard list, Dean sources it before lunch. Essential partner for any serious repairer.",
    name: "Clive Hendricks",
    role: "General Manager",
    company: "East Rand Panelbeaters",
    rating: 5
  }
];
