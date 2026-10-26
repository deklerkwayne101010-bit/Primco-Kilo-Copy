import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types/catalogue';
import { RANGES, CATEGORIES, PRODUCTS } from '../../data/catalogue';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    sku: '',
    name: '',
    category: '',
    categoryCode: '',
    categoryName: '',
    subcategory: '',
    subcategoryCode: '',
    subcategoryName: '',
    range: 'automotive-parts',
    rangeName: '',
    unit: '',
    description: '',
    brand: '',
    inStock: true,
    demo: false,
    featured: false,
    specs: {},
    imageUrl: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    if (!supabase) {
      setProducts(PRODUCTS as any);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sku');
    
    if (error) {
      console.error('Error fetching products:', error);
      // Fallback to static data
      setProducts(PRODUCTS as any);
    } else {
      setProducts(data && data.length > 0 ? data : (PRODUCTS as any));
    }
    setLoading(false);
  };

  const handleCategoryChange = (categorySlug: string) => {
    const category = CATEGORIES.find(c => c.slug === categorySlug);
    if (category) {
      setFormData({
        ...formData,
        category: categorySlug,
        categoryCode: category.code,
        categoryName: category.name,
        range: category.range,
        rangeName: RANGES.find(r => r.id === category.range)?.name || '',
        subcategory: '',
        subcategoryCode: '',
        subcategoryName: ''
      });
    }
  };

  const handleSubcategoryChange = (subcategorySlug: string) => {
    const category = CATEGORIES.find(c => c.slug === formData.category);
    const subcategory = category?.subcategories.find(s => s.slug === subcategorySlug);
    if (subcategory) {
      setFormData({
        ...formData,
        subcategory: subcategorySlug,
        subcategoryCode: subcategory.code,
        subcategoryName: subcategory.name
      });
    }
  };


  const handleImageUpload = async (file: File) => {
    if (!supabase) return;
    const fileExt = file.name.split('.').pop();
    const fileName = `${formData.sku || 'product'}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);
    
    if (uploadError) {
      alert('Error uploading image');
      console.error(uploadError);
      return;
    }
    
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);
    
    setFormData({ ...formData, imageUrl: data.publicUrl });
  };

  const handleSave = async () => {
    if (!supabase) return;
    
    if (isCreating) {
      const { error } = await supabase
        .from('products')
        .insert([formData]);
      
      if (error) {
        console.error('Error creating product:', error);
        alert('Error creating product');
      } else {
        alert('Product created successfully');
        setIsCreating(false);
        setFormData({
          sku: '', name: '', category: '', categoryCode: '', categoryName: '',
          subcategory: '', subcategoryCode: '', subcategoryName: '',
          range: 'automotive-parts', rangeName: '', unit: '', description: '',
          brand: '', inStock: true, demo: false, featured: false, specs: {}
        });
        fetchProducts();
      }
    } else if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(formData)
        .eq('sku', editingProduct.sku);
      
      if (error) {
        console.error('Error updating product:', error);
        alert('Error updating product');
      } else {
        alert('Product updated successfully');
        setEditingProduct(null);
        fetchProducts();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('sku', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } else {
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p =>
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Products</h2>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingProduct(null);
            setFormData({
              sku: '', name: '', category: '', categoryCode: '', categoryName: '',
              subcategory: '', subcategoryCode: '', subcategoryName: '',
              range: 'automotive-parts', rangeName: '', unit: '', description: '',
              brand: '', inStock: true, demo: false, featured: false, specs: {}
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--grad-brand)] text-white rounded-lg hover:shadow-[var(--glow-md)] transition-all"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
        <input
          type="text"
          placeholder="Search by SKU, name, or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#0b0e12] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
        />
      </div>

      {/* Form Modal */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[var(--line)]">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="text-[var(--muted)] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">SKU *</label>
                <input
                  type="text"
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Product Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Category *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.code} - {cat.name} ({cat.range})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Subcategory</label>
                <select
                  value={formData.subcategory || ''}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  disabled={!formData.category}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)] disabled:opacity-50"
                >
                  <option value="">Select Subcategory</option>
                  {CATEGORIES.find(c => c.slug === formData.category)?.subcategories.map(sub => (
                    <option key={sub.slug} value={sub.slug}>
                      {sub.code} - {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Brand</label>
                <input
                  type="text"
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Unit</label>
                <input
                  type="text"
                  value={formData.unit || ''}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="e.g., Per pack of 100, Each, Per box of 50"
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Product Image</label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Product" className="w-20 h-20 object-cover rounded-lg border border-[var(--line)]" />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-[#111418] border border-[var(--line)] text-white rounded-lg hover:bg-[#141920] cursor-pointer">
                    <Upload size={16} />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </label>
                  {formData.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, imageUrl: ''})}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="md:col-span-2 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-[var(--silver)]">
                  <input
                    type="checkbox"
                    checked={formData.inStock || false}
                    onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    className="rounded"
                  />
                  In Stock
                </label>
                <label className="flex items-center gap-2 text-sm text-[var(--silver)]">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-[var(--silver)]">
                  <input
                    type="checkbox"
                    checked={formData.demo || false}
                    onChange={(e) => setFormData({...formData, demo: e.target.checked})}
                    className="rounded"
                  />
                  Demo Item
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--line)]">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 bg-[#111418] border border-[var(--line)] text-white rounded-lg hover:bg-[#141920]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--grad-brand)] text-white rounded-lg hover:shadow-[var(--glow-md)]"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">SKU</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Category</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Brand</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Unit</th>
                <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Stock</th>
                <th className="text-right p-4 text-sm font-semibold text-[var(--silver)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[var(--muted)]">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[var(--muted)]">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[var(--line)]/50 hover:bg-[#111418]/50">
                    <td className="p-4 font-mono text-sm text-[var(--blue)]">{product.sku}</td>
                    <td className="p-4 text-sm text-white max-w-xs truncate">{product.name}</td>
                    <td className="p-4 text-sm text-[var(--silver)]">{product.categoryName}</td>
                    <td className="p-4 text-sm text-[var(--silver)]">{product.brand}</td>
                    <td className="p-4 text-sm text-[var(--muted)]">{product.unit}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.inStock 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsCreating(false);
                            setFormData({ ...product, id: product.id || product.sku });
                          }}
                          className="p-1.5 text-[var(--muted)] hover:text-[var(--blue)] hover:bg-[var(--blue)]/10 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => product.sku && handleDelete(product.sku)}
                          className="p-1.5 text-[var(--muted)] hover:text-red-400 hover:bg-red-400/10 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
