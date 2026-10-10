import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Variant = 'A' | 'B' | 'C';

interface VariantContextType {
  variant: Variant;
  setVariant: (v: Variant) => void;
}

const STORAGE_KEY = 'primeco-variant';

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export const VariantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variant, setVariantState] = useState<Variant>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'B' || stored === 'C' ? (stored as Variant) : 'A';
    } catch {
      return 'A';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, variant);
    } catch {
      // storage unavailable (private mode) — ignore
    }
  }, [variant]);

  const setVariant = (v: Variant) => setVariantState(v);

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariant = () => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error('useVariant must be used within a VariantProvider');
  }
  return context;
};
