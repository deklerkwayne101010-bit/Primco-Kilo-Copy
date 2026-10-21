import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { CategoryInfo, RangeInfo } from '../../types/catalogue';
import { RANGES } from '../../data/catalogue';

export const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    code: '',
    name: '',
    range: 'automotive-parts',
    description: '',
    icon_name: 'Package'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('code');
    
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!supabase) return;
    
    if (isCreating) {
      const { error } = await supabase
        .from('categories')
        .insert([formData]);
      
      if (error) {
        console.error('Error creating category:', error);
        alert('Error creating category');
      } else {
        alert('Category created successfully');
        setIsCreating(false);
        setFormData({ slug: '', code: '', name: '', range: 'automotive-parts', description: '', icon_name: 'Package' });
        fetchCategories();
      }
    } else if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(formData)
        .eq('id', editingCategory.id);
      
      if (error) {
        console.error('Error updating category:', error);
        alert('Error updating category');
      } else {
        alert('Category updated successfully');
        setEditingCategory(null);
        fetchCategories();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    } else {
      fetchCategories();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Categories & Ranges</h2>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingCategory(null);
            setFormData({ slug: '', code: '', name: '', range: 'automotive-parts', description: '', icon_name: 'Package' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--grad-brand)] text-white rounded-lg hover:shadow-[var(--glow-md)] transition-all"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Ranges Overview */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Product Ranges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RANGES.map((range) => (
            <div key={range.id} className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-4">
              <h4 className="font-semibold text-white mb-1">{range.name}</h4>
              <p className="text-sm text-[var(--muted)] mb-2">{range.itemCount} items</p>
              <p className="text-xs text-[var(--silver)]">{range.highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {(isCreating || editingCategory) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-[var(--line)]">
              <h3 className="text-lg font-bold text-white">
                {isCreating ? 'Add New Category' : 'Edit Category'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingCategory(null);
                }}
                className="text-[var(--muted)] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Code *</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  placeholder="e.g., A, B, C"
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Slug *</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  placeholder="e.g., paints-coatings"
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Category Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Range *</label>
                <select
                  value={formData.range || ''}
                  onChange={(e) => setFormData({...formData, range: e.target.value})}
                  className="w-full px-3 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                >
                  {RANGES.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Icon Name</label>
                <input
                  type="text"
                  value={formData.icon_name || ''}
                  onChange={(e) => setFormData({...formData, icon_name: e.target.value})}
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
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--line)]">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingCategory(null);
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

      {/* Categories Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
        <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Code</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Slug</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--silver)]">Range</th>
                  <th className="text-right p-4 text-sm font-semibold text-[var(--silver)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--muted)]">
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--muted)]">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="border-b border-[var(--line)]/50 hover:bg-[#111418]/50">
                      <td className="p-4 font-mono text-sm text-[var(--blue)]">{category.code}</td>
                      <td className="p-4 text-sm text-white">{category.name}</td>
                      <td className="p-4 text-sm text-[var(--muted)]">{category.slug}</td>
                      <td className="p-4 text-sm text-[var(--silver)]">{category.range}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingCategory(category);
                              setIsCreating(false);
                              setFormData(category);
                            }}
                            className="p-1.5 text-[var(--muted)] hover:text-[var(--blue)] hover:bg-[var(--blue)]/10 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => category.id && handleDelete(category.id)}
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
    </div>
  );
};
