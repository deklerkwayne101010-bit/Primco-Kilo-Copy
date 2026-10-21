import React, { useState } from 'react';
import { Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CATEGORIES, RANGES } from '../../data/catalogue';

export const BulkUpload: React.FC = () => {
  const [csvData, setCsvData] = useState('');
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null);

  const generateTemplate = () => {
    const headers = [
      'sku', 'name', 'category_slug', 'subcategory_slug', 'brand', 'unit', 
      'description', 'in_stock', 'featured', 'demo', 'specs'
    ].join(',');
    
    const example = [
      'EXAMPLE-001', 'Example Product', 'paints-coatings', 'primers-sealers', 
      'BrandName', 'Each', 'Product description here', 'true', 'false', 'false', '{"Key":"Value"}'
    ].join(',');
    
    const csv = headers + '\n' + example;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'primeco-products-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!supabase) return;
    setUploading(true);
    setResults(null);
    
    try {
      const lines = csvData.split(/\r?\n/).filter(line => line.trim());
      if (lines.length === 0) {
        setResults({ success: 0, errors: ['No data to upload'] });
        setUploading(false);
        return;
      }
      
      const headers = lines[0].split(',').map(h => h.trim());
      const products: any[] = [];
      const errors: string[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',').map(v => v.trim().replace(/^"(.*)"$/, '$1'));
          const product: any = {};
          
          headers.forEach((header, index) => {
            const value = values[index] || '';
            if (header === 'in_stock') {
              product.inStock = value.toLowerCase() === 'true';
            } else if (header === 'featured') {
              product.featured = value.toLowerCase() === 'true';
            } else if (header === 'demo') {
              product.demo = value.toLowerCase() === 'true';
            } else if (header === 'specs') {
              try {
                product.specs = value ? JSON.parse(value) : {};
              } catch {
                product.specs = {};
              }
            } else if (header === 'category_slug') {
              const category = CATEGORIES.find(c => c.slug === value);
              if (category) {
                product.category = value;
                product.categoryCode = category.code;
                product.categoryName = category.name;
                product.range = category.range;
                product.rangeName = RANGES.find(r => r.id === category.range)?.name || '';
              }
            } else if (header === 'subcategory_slug') {
              const category = CATEGORIES.find(c => c.slug === product.category);
              const subcategory = category?.subcategories.find(s => s.slug === value);
              if (subcategory) {
                product.subcategory = value;
                product.subcategoryCode = subcategory.code;
                product.subcategoryName = subcategory.name;
              }
            } else {
              product[header] = value;
            }
          });
          
          if (!product.sku || !product.name) {
            errors.push(`Row ${i + 1}: Missing SKU or name`);
            continue;
          }
          
          products.push(product);
        } catch (err) {
          errors.push(`Row ${i + 1}: Parse error`);
        }
      }
      
      if (products.length > 0 && supabase) {
        const { error } = await supabase
          .from('products')
          .upsert(products, { onConflict: 'sku' });
        
        if (error) {
          errors.push(`Database error: ${error.message}`);
        }
      }
      
      setResults({ success: products.length, errors });
    } catch (err) {
      setResults({ success: 0, errors: ['Upload failed'] });
    }
    
    setUploading(false);
  };

  const importFromCatalogue = async () => {
    if (!supabase) return;
    setUploading(true);
    setResults(null);
    try {
      const { PRODUCTS } = await import('../../data/catalogue');
      const products = PRODUCTS.map(p => ({
        sku: p.sku,
        name: p.name,
        category: p.category,
        categoryCode: p.categoryCode,
        categoryName: p.categoryName,
        subcategory: p.subcategory,
        subcategoryCode: p.subcategoryCode,
        subcategoryName: p.subcategoryName,
        range: p.range,
        rangeName: p.rangeName,
        unit: p.unit,
        description: p.description,
        brand: p.brand,
        demo: p.demo || false,
        featured: p.featured || false,
        inStock: p.inStock !== false,
        specs: p.specs || {},
        imageAlt: p.imageAlt || '',
        badge: p.badge || ''
      }));
      const { error } = await supabase.from('products').upsert(products, { onConflict: 'sku' });
      if (error) {
        setResults({ success: 0, errors: [error.message] });
      } else {
        setResults({ success: products.length, errors: [] });
      }
    } catch (err) {
      setResults({ success: 0, errors: ['Import failed'] });
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Bulk Upload Products</h2>
        <button
          onClick={generateTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-[#111418] border border-[var(--line)] text-white rounded-lg hover:bg-[#141920]"
        >
          <Download size={16} />
          Download Template
        </button>
      </div>

      <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
        <h3 className="font-semibold text-white mb-2">Instructions</h3>
        <ul className="text-sm text-[var(--silver)] space-y-1">
          <li>• Download the CSV template and fill in your product data</li>
          <li>• Use category_slug and subcategory_slug to match existing categories</li>
          <li>• SKU must be unique - existing SKUs will be updated</li>
          <li>• Boolean fields (in_stock, featured, demo) should be true/false</li>
          <li>• Specs can be JSON format</li>
        </ul>
      </div>

      <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
        <label className="block text-sm font-medium text-[var(--silver)] mb-2">
          Paste CSV Data
        </label>
        <textarea
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder="Paste your CSV content here..."
          rows={12}
          className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white font-mono text-sm focus:outline-none focus:border-[var(--blue)]"
        />
        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading || !csvData.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--grad-brand)] text-white rounded-lg hover:shadow-[var(--glow-md)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Upload size={16} />
            {uploading ? 'Uploading...' : 'Upload Products'}
          </button>
        </div>
      </div>

      <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
        <h3 className="font-semibold text-white mb-2">Import from Current Catalogue</h3>
        <p className="text-sm text-[var(--silver)] mb-4">
          Import all products from the existing static catalogue.ts file into Supabase
        </p>
        <button
          onClick={importFromCatalogue}
          disabled={uploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[var(--grad-brand)] text-white rounded-lg hover:shadow-[var(--glow-md)] disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? 'Importing...' : 'Import All from Catalogue'}
        </button>
      </div>

      {results && (
        <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
          <h3 className="font-semibold text-white mb-4">Upload Results</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle size={18} />
              <span>{results.success} products uploaded/updated</span>
            </div>
            {results.errors.length > 0 && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={18} />
                <span>{results.errors.length} errors</span>
              </div>
            )}
          </div>
          {results.errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 max-h-60 overflow-y-auto">
              <ul className="text-sm text-red-400 space-y-1">
                {results.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
