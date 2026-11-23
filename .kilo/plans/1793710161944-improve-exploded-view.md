# Plan: Major Improve Parts Exploded View Page

**Goal:** Replace the schematic SVG "car outline" with a realistic, photographic side-profile car that users can explore part-by-part, with sleek professional exploded-view animations when hovering/clicking parts.

## Context

- Current page: `src/pages/PartsExplodedViewPage.tsx` — draws a side-profile car using inline SVG paths with colored shapes for parts (windscreen, bonnet, bumpers, headlamps, grille, mirrors, doors, quarter panels, wheels, roof, etc.).
- Hovering a part shows an isolated callout panel with SKU, description, "Add to quote", "Browse category".
- 15 parts defined in `PARTS` array (key, name, description, category, sku).
- Page is already wired into Header nav (`parts-exploded`), Footer ("Car Parts Explorer"), and App.tsx route.
- Existing public assets: `public/assets/images/` contains `primeco-hero-cars.jpg`, `automotive-parts-primeco.png`, `vehicle-glass-primeco.png`, brand/category images.
- App is React 19 + Vite 8 + Tailwind v4 + TypeScript; no animation library (framer-motion/motion not installed) — CSS transitions only.
- `ProductImage` component exists (`src/components/ProductImage.tsx`) — renders real `` with SVG fallback.

## Decisions Needed (ask user)

### 1. Base car image source (RECOMMENDED: user uploads an AI-generated car image)

The current SVG does not look like a real car. To make it look like an actual car, we need a photographic side-profile car image.

**Recommended approach:** You generate a clean side-profile car image (e.g., sedan/hatchback, studio lighting, transparent or light-grey background) using your image model, upload it here, and I save it to `public/assets/images/car-exploded/car-base.png|jpg`. Parts are then overlaid as hotspots on top.

**Alternative:** Keep a refined SVG but style it to look more photorealistic (gradients, shadows, wheel detail). Less convincing than a real photo.

**Question:** Will you upload a realistic car base image? If yes, I'll build the hotspot system around your image dimensions. If no, I'll refine the SVG to look more car-like (still schematic, not photographic).

### 2. Part images for explosion animation (RECOMMENDED: transparent PNGs per part)

For a true "exploded" effect, each part needs its own cutout image (transparent PNG) that slides out from its position on hover.

**Recommended:** You generate per-part transparent PNGs (bonnet, bumper, headlamp, door, wheel, mirror, windscreen, grille, roof, quarter panel, taillamp, fuel cap, side skirt, handle) and upload them. I save to `public/assets/images/car-exploded/parts/<part-key>.png` and animate them with CSS transforms.

**Fallback:** If per-part images aren't available, use colored highlight overlays (semi-transparent divs) that pulse/grow on hover — no actual "explosion", just isolation highlight.

**Question:** Will you provide per-part transparent PNG images? If no, I'll implement highlight-only hotspots (no physical explosion animation).

### 3. Car model / angle

A side profile (90°) is easiest for hotspot coordinates and explosion animation (parts slide left/right/up/down cleanly). A 3/4 front-quarter angle looks more dynamic but hotspot math is harder.

**Recommended:** Side profile.

**Question:** Side profile OK, or do you want a 3/4 angle? (Side profile recommended for implementability.)

## Design (once images confirmed)

### Base layout
- Page hero (existing, unchanged)
- "EXPLODED VIEW" section:
  - Left: car image container (relative, constrained max-width ~720px, centered)
  - Right (desktop): isolated part callout panel; below on mobile
- Bottom: part category chips (Body Panels, Glazing, Lighting, Trim & Fasteners) → filtered catalogue
- Bottom CTA: "Can't see the part?" → Parts Sourcing page

### Hotspot system
- Each part = absolutely positioned `<div>` (or `<img>` if transparent PNG available) over the base car image, with `data-part` key.
- Default state: subtle border/ring, low-opacity fill.
- Hover state:
  - If part image available: part image scales up and translates outward from center (exploded), with a connecting line back to its origin; callout panel opens.
  - If no part image: semi-transparent highlight overlay pulses; callout panel opens.
- Click/tap on mobile opens callout (hover doesn't exist on touch).

### Callout panel
- Glass/morphism panel (existing design tokens: `bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] shadow-[var(--glow-lg)]`)
- Part name, SKU, description, category badge, stock status, "Add to quote", "Browse category" buttons.
- Close by clicking backdrop or selecting another part.

### Animation
- Pure CSS transitions (no framer-motion installed; adding it would require npm install).
- Exploded: `transition-transform duration-300 ease-out`, `group-hover:scale-110` + translate on the part wrapper.
- Connecting line: CSS-drawn line from hotspot to exploded part position.

### Responsive
- Desktop: car image left, callout panel right (or overlay).
- Mobile: car image full width, callout panel bottom sheet or modal overlay.
- Hotspot coordinates must scale with the image (use percentage-based positioning or a fixed viewBox with `object-contain`).

## Assets to create / receive

| Path | Purpose | Provided by |
|------|---------|-------------|
| `public/assets/images/car-exploded/car-base.<ext>` | Photographic side-profile car base | User upload |
| `public/assets/images/car-exploded/parts/<key>.png` | Transparent cutout per part (optional) | User upload (optional) |

Part keys: `windscreen`, `bonnet`, `front-bumper`, `headlight`, `grille`, `mirror`, `door-handle`, `door-panel`, `side-skirt`, `quarter-panel`, `rear-bumper`, `taillight`, `fuel-cap`, `wheel`, `roof`.

## Tasks (ordered)

1. **Confirm image approach** with user (base image + optional per-part images).
2. **Receive & place assets** into `public/assets/images/car-exploded/`.
3. **Rewrite `PartsExplodedViewPage.tsx`**:
   - Import base car image as `<img>` with `object-contain` inside a relative container sized to the image aspect ratio.
   - Build `<CarHotspot>` component: absolutely positioned part overlay with hover explosion + callout trigger.
   - Replace SVG drawing with image + hotspots.
   - Keep PARTS data (name, description, category, sku) for callout content.
   - Keep quote integration (`addToQuote`, `showToast`).
   - Keep category chips + sourcing CTA.
4. **Typecheck** (`npx tsc --noEmit`) and **build** (`npm run build`).
5. **Validate visually** via dev server.

## Risks

- Hotspot coordinates are image-specific; if user changes the base image, coordinates must be re-tuned. I'll use percentage-based positioning relative to the container so it scales.
- Without per-part images, "explosion" is just a highlight — manage user expectations.
- Large base image could impact LCP; recommend optimized webp/jpg under ~200KB.

## Validation

- `npx tsc --noEmit` passes.
- `npm run build` passes.
- Dev server loads page; hovering parts highlights/isolates them; callout panel shows correct SKU/description; Add to Quote works; category chips filter catalogue.
