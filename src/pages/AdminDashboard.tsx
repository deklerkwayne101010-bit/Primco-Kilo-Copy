import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { LogOut } from 'lucide-react';
import { LayoutDashboard, Package, FolderTree, Settings, Upload, Download, Plus } from 'lucide-react';
import { ProductManager } from '../components/admin/ProductManager';
import { CategoryManager } from '../components/admin/CategoryManager';
import { BulkUpload } from '../components/admin/BulkUpload';
import { isSupabaseConfigured } from '../lib/supabase';

type TabId = 'overview' | 'products' | 'categories' | 'bulk-upload';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const configured = isSupabaseConfigured();


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    setIsAuthenticated(auth === 'true');
    setChecking(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    window.location.hash = '';
  };

  if (checking) return <div className="min-h-screen bg-[var(--ink)] flex items-center justify-center text-white">Loading...</div>;
  if (!isAuthenticated) return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;


  if (!configured) {
    return (
      <div className="min-h-screen bg-[var(--ink)] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0b0e12] border border-red-500/40 rounded-[var(--radius-xl)] p-8 text-center">
          <Settings className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Supabase Not Configured</h1>
          <p className="text-[var(--muted)] text-sm mb-4">
            Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.
          </p>
          <div className="text-left bg-[#080b0e] rounded-lg p-4 text-xs font-mono text-[var(--silver)]">
            <div>VITE_SUPABASE_URL=your-project-url</div>
            <div>VITE_SUPABASE_ANON_KEY=your-anon-key</div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as TabId, label: 'Overview', icon: LayoutDashboard },
    { id: 'products' as TabId, label: 'Products', icon: Package },
    { id: 'categories' as TabId, label: 'Categories & Ranges', icon: FolderTree },
    { id: 'bulk-upload' as TabId, label: 'Bulk Upload', icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--silver)]">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-md border-b border-[var(--line)] sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Primeco Admin Dashboard</h1>
              <p className="text-sm text-[var(--muted)]">Catalogue Management System</p>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="#/" 
                className="px-4 py-2 bg-[#111418] border border-[var(--line)] rounded-lg text-sm hover:bg-[#141920] transition-colors"
              >
                Back to Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-[#111418] border border-red-500/40 text-red-400 rounded-lg text-sm hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[var(--line)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-[var(--blue)]'
                    : 'text-[var(--muted)] hover:text-[var(--silver)]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--blue)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-[var(--blue)]" size={20} />
                  <h3 className="font-semibold text-white">Products</h3>
                </div>
                <p className="text-2xl font-bold text-white">Manage</p>
                <p className="text-sm text-[var(--muted)]">Add, edit, remove products</p>
              </div>
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FolderTree className="text-[var(--blue)]" size={20} />
                  <h3 className="font-semibold text-white">Categories</h3>
                </div>
                <p className="text-2xl font-bold text-white">Organize</p>
                <p className="text-sm text-[var(--muted)]">Manage ranges & categories</p>
              </div>
              <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Upload className="text-[var(--blue)]" size={20} />
                  <h3 className="font-semibold text-white">Bulk Upload</h3>
                </div>
                <p className="text-2xl font-bold text-white">Import</p>
                <p className="text-sm text-[var(--muted)]">CSV/JSON bulk import</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'bulk-upload' && <BulkUpload />}
      </div>
    </div>
  );
};

export default AdminDashboard;
