# Plan: Import Bulldog Abrasives products into Primeco Supplies catalogue

**Goal:** Copy all product photos and descriptions from bulldogabrasives.co.za into the Primeco Supplies app catalogue, rendering each product image exactly as it appears on the source site.

## Context

- App: React 19 + Vite 8 + Tailwind v4 + TypeScript, single-page SPA
- Product data lives in `src/data/catalogue.ts`: `PRODUCTS` array typed by `Product` interface, plus `RANGES`, `CATEGORIES`, `BRANDS`
- `Product` interface currently has **no `image` field**; catalogue cards render SVG-only graphics via `ProductGraphic` (`src/components/ProductGraphic.tsx`)
- `CataloguePage` filters by range/category/subcategory/brand/search; item cards use `ProductGraphic` for the card image area
- Source site: WooCommerce WordPress at bulldogabrasives.co.za; product pages at `/product/<slug>/`, category pages at `/product-category/<slug>/`, images under `wp-content/uploads/YYYY/MM/`
- Confirmed via live recon: one product page exposes SKU, description, brand, category breadcrumbs, images, and a "Technical Specifications" table (e.g. Avalanche Extreme Snow Foam)

## Decisions

1. **Real product photos as `<img>`**: Add an optional `image?: string` field to `Product`. Download each product's primary image from bulldogabrasives.co.za into `public/assets/images/products/<sku>/primary.webp|jpg|png` (keep original extension). Render `<img src={product.image} ... />` in the catalogue card image area when present, falling back to the existing `ProductGraphic` SVG otherwise.
2. **Map into existing ranges**: Do not add new ranges. Map Bulldog WooCommerce categories into Primeco's 3 existing ranges (`tools-supplies` default; `paint-solutions` for primers/paints/clearcoats; `automotive-parts` for body-repair/fasteners). Use category/subcategory names verbatim from source where they fit; subcategoryCode auto-generated.
3. **Single primary image per product**: Import the first/main product image only (source galleries vary). Additional gallery images out of scope.
4. **Generated SKU**: Source SKUs are sometimes `N/A`. Generate deterministic SKUs like `BDG-<slug-kebab>` when missing to keep catalogue keys unique.
5. **Data file**: Write imported products to a new file `src/data/bulldog-products.ts` exporting `BULLDOG_PRODUCTS: Product[]`; merge into `PRODUCTS` in `catalogue.ts` (or keep separate and concat in CataloguePage). Keep Primeco's original products intact.
6. **No pricing**: Do not import prices (trade quoting, no public pricing). Skip price fields entirely.
7. **Stock**: mark `inStock: true` unless the source page indicates out of stock.

## Tasks (in order)

1. **Interface change**: Add `image?: string` to the `Product` interface in `src/data/catalogue.ts`.
2. **Scraper script**: Create `scripts/import-bulldog-products.ts` (run with `tsx`):
   - Fetch `https://bulldogabrasives.co.za/products-all/` to discover product links
   - For each product page: fetch HTML, parse title, description, SKU, brand, category breadcrumb, first image URL, specs table
   - Download the first image to `public/assets/images/products/<sku>/<ext>`
   - Emit `src/data/bulldog-products.ts` with `BULLDOG_PRODUCTS`
3. **Merge into catalogue**: Import `BULLDOG_PRODUCTS` into `PRODUCTS` (or concat in CataloguePage); append `Bulldog` to `BRANDS` with an accurate count; bump `CATEGORIES`/`RANGES` item counts where mapped.
4. **CataloguePage image rendering**: In the card image area (`viewMode === 'grid'` and table view), render `<img src={product.image} alt={product.imageAlt || product.name} loading="lazy" />` when `product.image` exists, else existing `ProductGraphic` fallback. Keep subcategory badge, SKU, brand, name, qty stepper unchanged.
5. **Validate**: Run `npm run lint` (`tsc --noEmit`), then `npm run dev` and visually confirm images load on catalogue cards and table rows.
6. **Cleanup**: Remove the scraper script after the data file is generated (it is a one-off import tool; do not commit runtime scraping into the app bundle).

## Risks / Open items

- Source HTML structure may change per product; scraper must be defensive (fallbacks for missing SKU/brand/image) and log skips.
- Image hotlinking vs self-hosting: self-hosting chosen per "exactly as they are" requirement; respects `public/` asset boundary.
- WooCommerce pagination on `/products-all/` — verify all products are listed; if paginated, follow pagination links.
- Some products may be variations/simple products; scrape the parent page's main image and base description.
- CORS: scraper runs in Node (`tsx`), not the browser, so no CORS issues.

## Validation plan

- `npm run lint` passes (no TS errors)
- `npm run dev` starts on port 3000; navigate to Catalogue page; imported Bulldog products appear with real `` images, category filters include mapped Bulldog categories, SKU copy and Add to Quote still work
- At least one imported product visible end-to-end with its source image
