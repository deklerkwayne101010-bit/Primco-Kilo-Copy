/**
 * One-off scraper: imports Bulldog Abrasives products from
 * https://bulldogabrasives.co.za into Primeco's catalogue.
 *
 * Source of truth: https://bulldogabrasives.co.za/product-sitemap.xml
 *   (lists every product URL + its primary image via image:sitemap)
 *
 * Runs in Node (tsx). Resumable: completed product URLs are recorded in
 * scripts/.import-state.json so a killed run can be re-run to finish.
 * Downloads each product's primary image into public/assets/images/products/<sku>/
 * and emits src/data/bulldog-products.ts exporting BULLDOG_PRODUCTS.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'public', 'assets', 'images', 'products');
const OUT_FILE = path.join(ROOT, 'src', 'data', 'bulldog-products.ts');
const STATE_FILE = path.join(__dirname, '.import-state.json');
const BASE = 'https://bulldogabrasives.co.za';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const HEADERS = {
  'User-Agent': UA,
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': BASE + '/',
};

const TIMEOUT_MS = 20000;
const CONCURRENCY = 20;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout | null = null;
  const p2 = Promise.race([
    p,
    new Promise<never>((_, rej) => {
      timer = setTimeout(() => rej(new Error(`timeout ${ms}ms`)), ms);
    }),
  ]);
  return (p2 as Promise<T>).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const txt = await withTimeout(res.text(), TIMEOUT_MS);
  return txt;
}

async function fetchBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await withTimeout(res.arrayBuffer(), TIMEOUT_MS);
  return Buffer.from(ab);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function clean(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)))
    .trim();
}

function stripTags(html: string): string {
  return clean(
    html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
  );
}

function between(html: string, startTag: string, endTag: string): string | null {
  const si = html.indexOf(startTag);
  if (si === -1) return null;
  const after = si + startTag.length;
  const ei = html.indexOf(endTag, after);
  if (ei === -1) return null;
  return html.slice(after, ei);
}

function extractImageUrl(html: string): string | null {
  const galleryImg = html.match(/<img[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*src=["']([^"']+)["']/i);
  if (galleryImg) return galleryImg[1];
  const firstImg = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (firstImg) return firstImg[1];
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (og) return og[1];
  return null;
}

function extractDescription(html: string): string | null {
  let desc =
    between(html, '<div itemprop="description">', '</div>') ||
    between(html, '<div class="woocommerce-product-details__short-description">', '</div>') ||
    between(html, '<div class="entry-content">', '</div>');
  if (!desc) return null;
  return stripTags(desc) || null;
}

function extractSku(html: string): string | null {
  const m = html.match(/<span class="sku">([^<]*)<\/span>/i);
  if (m) return m[1].trim() || null;
  const skuLabel = html.match(/SKU:\s*([^\s<]+)/i);
  if (skuLabel) return skuLabel[1].trim() || null;
  return null;
}

function extractBrand(html: string): string | null {
  const m = html.match(/<a[^>]+href=["'][^"]*\/brand\/([^/"']+)["'][^>]*>([^<]*)<\/a>/i);
  if (m) return clean(m[2]) || null;
  return null;
}

function extractCategories(html: string): string[] {
  const cats: string[] = [];
  const breadcrumb = between(html, '<nav class="woocommerce-breadcrumb">', '</nav>');
  if (breadcrumb) {
    const parts = breadcrumb.split('/').map((p) => clean(stripTags(p))).filter(Boolean);
    for (let i = 1; i < parts.length - 1; i++) cats.push(parts[i]);
  }
  if (cats.length === 0) {
    const catMatches = html.matchAll(/<a[^>]+href=["'][^"]*\/product-category\/([^/"']+)["'][^>]*>([^<]*)<\/a>/gi);
    for (const m of catMatches) cats.push(clean(m[2]));
  }
  return cats;
}

function extractSpecs(html: string): Record<string, string> | null {
  const specs: Record<string, string> = {};
  const tableSection = between(html, '<h2>Technical Specifications', '</table>');
  if (!tableSection) return null;
  const rows = tableSection.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
  if (!rows) return null;
  for (const row of rows) {
    const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi);
    if (!cells || cells.length < 2) continue;
    const key = clean(stripTags(cells[0]));
    const val = clean(stripTags(cells[1]));
    if (key && val) specs[key] = val;
  }
  return Object.keys(specs).length ? specs : null;
}

function extractProductName(html: string): string | null {
  const h1 = between(html, '<h1', '</h1>');
  if (!h1) return null;
  return clean(stripTags(h1)) || null;
}

function mapRange(categories: string[]): 'automotive-parts' | 'paint-solutions' | 'tools-supplies' {
  const joined = categories.map((c) => c.toLowerCase()).join(' ');
  if (
    joined.includes('primer') ||
    joined.includes('paint') ||
    joined.includes('clear') ||
    joined.includes('coating') ||
    joined.includes('refinish') ||
    joined.includes('filler') ||
    joined.includes('body filler') ||
    joined.includes('hardener') ||
    joined.includes('thinner')
  ) {
    return 'paint-solutions';
  }
  return 'tools-supplies';
}

function mapCategory(categories: string[]): {
  category: string;
  categoryName: string;
  subcategory: string;
  subcategoryName: string;
} {
  let category = 'uncategorized';
  let categoryName = 'Uncategorized';
  let subcategory = 'general';
  let subcategoryName = 'General';

  if (categories.length >= 2) {
    categoryName = categories[categories.length - 1];
    category = slugify(categoryName);
    subcategoryName = categories[categories.length - 2];
    subcategory = slugify(subcategoryName);
  } else if (categories.length === 1) {
    categoryName = categories[0];
    category = slugify(categoryName);
  }
  return { category, categoryName, subcategory, subcategoryName };
}

async function downloadImage(url: string, sku: string): Promise<string | null> {
  try {
    const buf = await fetchBuffer(url);
    const ext = path.extname(url.split('?')[0]) || '.jpg';
    const dir = path.join(ASSETS_DIR, sku);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `primary${ext}`);
    fs.writeFileSync(file, buf);
    return `/assets/images/products/${sku}/primary${ext}`;
  } catch (e) {
    return null;
  }
}

function parseSitemap(xml: string): { url: string; image: string | null }[] {
  const out: { url: string; image: string | null }[] = [];
  const blocks = xml.split(/<\/url>/);
  for (const block of blocks) {
    const locM = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locM) continue;
    let url = locM[1];
    if (url === BASE + '/products/' || url === BASE + '/products') continue;
    const imgM = block.match(/<image:loc>([^<]+)<\/image:loc>/);
    out.push({ url, image: imgM ? imgM[1] : null });
  }
  return out;
}

function loadState(): { doneUrls: Set<string>; products: any[] } {
  try {
    const raw = fs.readFileSync(STATE_FILE, 'utf8');
    const data = JSON.parse(raw);
    return {
      doneUrls: new Set(data.doneUrls || []),
      products: data.products || [],
    };
  } catch {
    return { doneUrls: new Set(), products: [] };
  }
}

function saveState(doneUrls: Set<string>, products: any[]) {
  fs.writeFileSync(
    STATE_FILE,
    JSON.stringify({ doneUrls: [...doneUrls], products })
  );
}

async function processProduct({ url, image: sitemapImage }: { url: string; image: string | null }) {
  const html = await fetchText(url);

  const name = extractProductName(html) || slugify(path.basename(url));
  const skuRaw = extractSku(html) || '';
  const sku = skuRaw && skuRaw.toLowerCase() !== 'n/a' ? skuRaw : `BDG-${slugify(name)}`;
  const brandRaw = extractBrand(html) || 'Bulldog Abrasives';
  const brand = clean(brandRaw) || 'Bulldog Abrasives';
  const categories = extractCategories(html);
  const { category, categoryName, subcategory, subcategoryName } = mapCategory(categories);
  const range = mapRange(categories);
  const description = extractDescription(html) || `${name} from ${brand}.`;

  let imageUrl = sitemapImage || extractImageUrl(html);
  const image = imageUrl ? await downloadImage(imageUrl, sku) : undefined;
  if (!image) {
    console.warn(`  [no image] ${name}`);
  }

  const specs = extractSpecs(html);

  return {
    sku,
    name,
    category,
    categoryCode: category.charAt(0).toUpperCase(),
    categoryName,
    subcategory,
    subcategoryCode: `${category.charAt(0).toUpperCase()}-1`,
    subcategoryName,
    range,
    rangeName:
      range === 'automotive-parts'
        ? 'Automotive Parts'
        : range === 'paint-solutions'
          ? 'Paint Solutions'
          : 'Tools & Supplies',
    unit: 'Each',
    description,
    brand,
    inStock: true,
    specs,
    image,
    imageAlt: name,
    doneUrl: url,
  };
}

async function writeOutput(products: any[]) {
  products.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));

  // Strip internal doneUrl field
  const cleanProducts = products.map(({ doneUrl, ...rest }) => rest);

  const header = `// Auto-generated by scripts/import-bulldog-products.ts
// Source: https://bulldogabrasives.co.za/product-sitemap.xml
// Do not edit by hand; re-run the scraper to refresh.

import { Product } from './catalogue';

export const BULLDOG_PRODUCTS: Product[] = [`;

  const footer = `];
`;

  const rows = cleanProducts.map((p) => {
    const specsStr = p.specs ? `specs: ${JSON.stringify(p.specs)},` : '';
    const imageStr = p.image ? `image: '${p.image}',` : '';
    return `  {
    sku: ${JSON.stringify(p.sku)},
    name: ${JSON.stringify(p.name)},
    category: ${JSON.stringify(p.category)},
    categoryCode: ${JSON.stringify(p.categoryCode)},
    categoryName: ${JSON.stringify(p.categoryName)},
    subcategory: ${JSON.stringify(p.subcategory)},
    subcategoryCode: ${JSON.stringify(p.subcategoryCode)},
    subcategoryName: ${JSON.stringify(p.subcategoryName)},
    range: ${JSON.stringify(p.range)},
    rangeName: ${JSON.stringify(p.rangeName)},
    unit: ${JSON.stringify(p.unit)},
    description: ${JSON.stringify(p.description)},
    brand: ${JSON.stringify(p.brand)},
    inStock: ${p.inStock},
    ${specsStr}
    ${imageStr}
    imageAlt: ${JSON.stringify(p.imageAlt)},
  },`;
  });

  fs.writeFileSync(OUT_FILE, header + '\n' + rows.join('\n') + '\n' + footer);
  console.log(`\nWrote ${cleanProducts.length} products to ${OUT_FILE}`);
}

async function main() {
  console.log('Fetching product sitemap...');
  const sitemapXml = await fetchText(`${BASE}/product-sitemap.xml`);
  const sitemap = parseSitemap(sitemapXml);
  console.log(`Found ${sitemap.length} products in sitemap`);

  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const state = loadState();
  const doneUrls = state.doneUrls;
  const products: any[] = [...state.products];
  let skipped = 0;

  const pending = sitemap.filter((p) => !doneUrls.has(p.url));
  console.log(`Already done: ${doneUrls.size}, pending: ${pending.length}, products in state: ${products.length}`);
  if (pending.length === 0) {
    console.log('Nothing pending. Writing final output...');
    await writeOutput(products);
    return;
  }

  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const batch = pending.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(batch.map(processProduct));

    for (const r of results) {
      if (r.status === 'rejected') {
        skipped++;
        console.warn(`  [skip] ${(r.reason as Error).message}`);
      } else {
        products.push(r.value);
        doneUrls.add(r.value.doneUrl);
      }
    }

    saveState(doneUrls, products);
    const doneCount = doneUrls.size;
    console.log(`[progress] ${doneCount}/${sitemap.length} completed (batch ${Math.floor(i / CONCURRENCY) + 1})`);

    if (i + CONCURRENCY < pending.length) {
      await new Promise((res) => setTimeout(res, 100));
    }
  }

  await writeOutput(products);
  console.log(`Skipped ${skipped} products`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
