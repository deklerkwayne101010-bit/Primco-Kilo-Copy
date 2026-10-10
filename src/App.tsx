/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QuoteProvider, useQuote } from './context/QuoteContext';
import { VariantProvider, useVariant } from './context/VariantContext';
import { TopBar } from './components/TopBar';
import { Header, PageId } from './components/Header';
import { DemoBar } from './components/DemoBar';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { VariantToggle } from './components/VariantToggle';
import { Toast } from './components/Toast';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Product } from './data/catalogue';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CataloguePage } from './pages/CataloguePage';
import { QuickOrderPage } from './pages/QuickOrderPage';
import { PartsSourcingPage } from './pages/PartsSourcingPage';
import { BrandsPage } from './pages/BrandsPage';
import { ValetServicesPage } from './pages/ValetServicesPage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { PrivacyPage } from './pages/PrivacyPage';

function AppContent() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [pageParams, setPageParams] = useState<any>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const { variant } = useVariant();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavigate = (page: PageId, extraParams?: any) => {
    setActivePage(page);
    setPageParams(extraParams || {});
  };

  const handleOpenWhatsApp = () => {
    window.open('https://wa.me/27799011544?text=Hi%20Dean%2C%20I%20am%20enquiring%20about%20Primeco%20workshop%20supplies', '_blank');
  };

  return (
    <div data-variant={variant} className="min-h-screen flex flex-col bg-[var(--ink)] text-[var(--silver)] font-sans antialiased selection:bg-[var(--blue)] selection:text-white relative">
      {/* 1. Top Bar (37px) - Black, sticky contact info */}
      <TopBar onOpenWhatsApp={handleOpenWhatsApp} />

      {/* 2. Header (90px) - Sticky, backdrop blur, z-index 40 */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* 3. Demo Bar (conditional) - Blue tint, warning text */}
      <DemoBar onGoToQuickOrder={() => handleNavigate('quick-order')} />

      {/* 4. Main Content Slot */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activePage === 'catalogue' && (
          <CataloguePage
            initialRange={pageParams.range || 'all'}
            initialCategory={pageParams.category || 'all'}
            initialQuery={pageParams.query || ''}
            onNavigate={handleNavigate}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activePage === 'quick-order' && (
          <QuickOrderPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'parts-sourcing' && (
          <PartsSourcingPage
            initialQuery={pageParams.query || ''}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'brands' && (
          <BrandsPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'valet-services' && (
          <ValetServicesPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'company-profile' && (
          <CompanyProfilePage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenWhatsApp={handleOpenWhatsApp}
          />
        )}

        {activePage === 'quote' && (
          <QuotePage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'privacy' && (
          <PrivacyPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 5. Footer - Black background, 4-column grid */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* 6. Fixed WhatsApp FAB (bottom-right 24px, 64px circle, #25d366) */}
      <WhatsAppFab />

      {/* 6b. Design A/B version toggle (bottom-left) */}
      <VariantToggle />

      {/* 7. Toast (bottom-center, brand gradient) */}
      <Toast />

      {/* 8. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={setSelectedProduct}
      />
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Primeco Applet Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080b0e] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mb-6 text-blue-400">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Primeco Supplies Preview</h1>
          <p className="text-[var(--muted)] text-sm max-w-md mb-6">
            An unexpected error occurred while loading this view. You can reload the catalogue or refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-[var(--blue)] hover:bg-[var(--blue-light)] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Reload Preview
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <VariantProvider>
        <QuoteProvider>
          <AppContent />
        </QuoteProvider>
      </VariantProvider>
    </ErrorBoundary>
  );
}
