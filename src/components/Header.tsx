import React, { useState, useEffect, useRef } from 'react';
import { useQuote } from '../context/QuoteContext';
import { ShoppingBag, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

export type PageId =
  | 'home'
  | 'about'
  | 'catalogue'
  | 'parts-sourcing'
  | 'quick-order'
  | 'brands'
  | 'valet-services'
  | 'company-profile'
  | 'contact'
  | 'quote'
  | 'privacy'
  | 'admin';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId, extra?: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { totalCount } = useQuote();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems: Array<{ id: PageId; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'parts-sourcing', label: 'Source' },
    { id: 'quick-order', label: 'Quick Order' },
    { id: 'brands', label: 'Brands' },
    { id: 'valet-services', label: 'Valet' },
    { id: 'company-profile', label: 'Profile' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[var(--line)] min-h-[76px] lg:min-h-[90px] flex items-center">
      <div className="container flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none py-1"
        >
          {/* Official Logo from primeco.co.za */}
          <div className="h-[46px] lg:h-[54px] flex items-center">
            <img
              src="/assets/images/primeco-logo.png"
              alt="Primeco Supplies Logo"
              className="h-full w-auto object-contain max-w-[210px] filter drop-shadow-[0_2px_10px_rgba(17,152,232,0.2)]"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-3 text-sm font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-[var(--bright)]' : 'text-[var(--muted)] hover:text-[var(--bright)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[17px] h-[2px] bg-gradient-to-r from-[var(--blue-dark)] to-[var(--blue)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Quote Request Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('quote')}
            className={`relative min-h-[44px] px-4 rounded-[var(--radius-md)] flex items-center gap-2.5 font-bold text-xs uppercase tracking-wider transition-all duration-[var(--dur)] cursor-pointer ${
              activePage === 'quote'
                ? 'bg-[var(--grad-active)] text-white shadow-[var(--glow-sm)] border border-[var(--blue)]'
                : 'bg-[var(--grad-brand)] text-white hover:shadow-[var(--glow-md)] hover:brightness-110 border border-transparent'
            }`}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Request Quote</span>
            <span className="sm:hidden">Quote</span>

            {/* Badge Count */}
            <span className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-extrabold flex items-center justify-center transition-transform ${
              totalCount > 0 ? 'bg-white text-black scale-100 shadow-sm' : 'bg-white/20 text-white/90 scale-95'
            }`}>
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-11 h-11 rounded-[var(--radius-md)] border border-[var(--line)] bg-[#111418] flex items-center justify-center text-[var(--silver)] hover:text-white hover:border-[var(--blue)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="xl:hidden absolute top-full left-0 w-full bg-[#090c0f]/98 backdrop-blur-xl border-b border-[var(--line)] shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-[var(--radius-md)] text-sm font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[var(--blue-dark)]/30 border border-[var(--blue)] text-white'
                      : 'bg-[#111418] border border-[var(--line)] text-[var(--silver)] hover:border-[#3a4652] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={14} className={isActive ? 'text-[var(--blue)]' : 'text-[var(--muted)]'} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-2.5 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-2 text-[var(--silver)]">
              <ShieldCheck size={14} className="text-[var(--blue)]" />
              <span>Direct dispatch to Alberton, Alrode & Greater Gauteng</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span>Alberton Trade Direct:</span>
              <a href="tel:+27799011544" className="text-[var(--blue)] font-bold underline">
                079 901 1544
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
