// Auto-generated / seeded by scripts/import-bulldog-products.ts
// Source: https://bulldogabrasives.co.za/product-sitemap.xml
//
// NOTE: This file is normally populated by running the scraper, which downloads
// each product's real photo from bulldogabrasives.co.za into
// public/assets/images/products/<sku>/ and writes BULLDOG_PRODUCTS here with
// `image` set to the self-hosted photo path.
//
// The sandbox this project runs in blocks direct requests to
// bulldogabrasives.co.za (WAF 403), so the scraper could not complete here.
// The seed entries below use verified product names/brands/categories from the
// Bulldog site but no photo yet (they render the studio SVG graphic). Re-run
// `npx tsx scripts/import-bulldog-products.ts` from a network that can reach
// bulldogabrasives.co.za to import all ~800 products with real photos.

import { Product } from './catalogue';

export const BULLDOG_PRODUCTS: Product[] = [
  {
    sku: 'G03003',
    name: 'Avalanche Extreme Snow Foam, Concentrated Tough Dirt / Grime Remover',
    category: 'car-care-products',
    categoryCode: 'C',
    categoryName: 'Car Care Products',
    subcategory: 'detailing',
    subcategoryCode: 'C-1',
    subcategoryName: 'Detailing',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each',
    brand: 'Glanzlab',
    description:
      'Extreme Snow Foam is a high-foaming car wash solution engineered to break down heavy dirt, grime, and road film with ease. Its thick, luxurious foam clings to the surface, softening and lifting contaminants for safe, swirl-free washing. The pH-balanced formula is gentle on paintwork and protective coatings, preserving waxes and sealants. Suitable for foam cannons or hand washing.',
    inStock: true,
    specs: {
      '473ML': 'Concentrated',
      '3.78L': 'Concentrated',
      'Pneumatic pot (air compressor)': '1:1800',
      'PA pot (pressure washer)': '1:30–1:9',
    },
    imageAlt: 'Avalanche Extreme Snow Foam',
  },
  {
    sku: 'BDG-jet-x-digital-pro-spray-gun-rp',
    name: 'jet X, Digital Pro Spray Gun, RP',
    category: 'spray-guns-equipment',
    categoryCode: 'S',
    categoryName: 'Spray Guns & Equipment',
    subcategory: 'spray-guns',
    subcategoryCode: 'S-1',
    subcategoryName: 'Spray Guns',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each',
    brand: 'SATA',
    description: 'SATA jet X digital Pro spray gun with ADAM X Pro display, RP version.',
    inStock: true,
    imageAlt: 'jet X Digital Pro Spray Gun RP',
  },
  {
    sku: 'BDG-hss-annular-broach-cutter',
    name: 'HSS Annular/Broach Cutter with Pin, Weldon Shank',
    category: 'cutting-grinding',
    categoryCode: 'C',
    categoryName: 'Cutting & Grinding',
    subcategory: 'annular-cutters',
    subcategoryCode: 'C-1',
    subcategoryName: 'Annular Cutters',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each',
    brand: 'Bulldog Industrial',
    description: 'HSS annular/broach cutter with pilot pin and Weldon shank.',
    inStock: true,
    imageAlt: 'HSS Annular Broach Cutter Weldon Shank',
  },
  {
    sku: 'BDG-bdx-3010-auto-soft-body-filler',
    name: 'BDX 3010 Auto Soft Body Filler',
    category: 'body-filler-accessories',
    categoryCode: 'B',
    categoryName: 'Body Filler & Accessories',
    subcategory: 'body-filler',
    subcategoryCode: 'B-1',
    subcategoryName: 'Body Filler',
    range: 'paint-solutions',
    rangeName: 'Paint Solutions',
    unit: 'Each',
    brand: 'BDX Refinish',
    description: 'BDX 3010 auto soft body filler for panel shop bodywork repairs.',
    inStock: true,
    imageAlt: 'BDX 3010 Auto Soft Body Filler',
  },
  {
    sku: 'BDG-polarshine-20-polishing-compound',
    name: 'Polarshine® 20 Polishing Compound (Medium/Coarse)',
    category: 'polishing-products',
    categoryCode: 'P',
    categoryName: 'Polishing Products',
    subcategory: 'compounds',
    subcategoryCode: 'P-1',
    subcategoryName: 'Compounds',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each',
    brand: 'Mirka',
    description: 'Mirka Polarshine 20 polishing compound, medium/coarse, 1 litre.',
    inStock: true,
    imageAlt: 'Polarshine 20 Polishing Compound',
  },
  {
    sku: 'BDG-wire-brush-knotted-steel-wire',
    name: 'Wire Brush, Knotted, Steel Wire',
    category: 'wire-brushes',
    categoryCode: 'W',
    categoryName: 'Wire Brushes',
    subcategory: 'knotted-wire',
    subcategoryCode: 'W-1',
    subcategoryName: 'Knotted Wire',
    range: 'tools-supplies',
    rangeName: 'Tools & Supplies',
    unit: 'Each',
    brand: 'Bulldog Industrial',
    description: 'Knotted steel wire wheel brush for weld cleaning and deburring.',
    inStock: true,
    imageAlt: 'Wire Brush Knotted Steel Wire',
  },
];
