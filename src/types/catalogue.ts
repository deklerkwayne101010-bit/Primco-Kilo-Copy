export interface Product {
  id?: string;
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
  created_at?: string;
  updated_at?: string;
}

export interface RangeInfo {
  id: string;
  range_id: 'automotive-parts' | 'vehicle-glass' | 'paint-solutions' | 'tools-supplies';
  name: string;
  description: string;
  itemCount?: number;
  highlight: string;
  image: string;
}

export interface SubcategoryInfo {
  id?: string;
  slug: string;
  code: string;
  name: string;
  count?: number;
  category_slug?: string;
}

export interface CategoryInfo {
  id?: string;
  slug: string;
  code: string;
  name: string;
  range: 'automotive-parts' | 'vehicle-glass' | 'paint-solutions' | 'tools-supplies';
  description: string;
  productCount?: number;
  iconName: string;
  subcategories: SubcategoryInfo[];
}
