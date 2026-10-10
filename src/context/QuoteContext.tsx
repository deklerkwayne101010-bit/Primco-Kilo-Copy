import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, PRODUCTS } from '../data/catalogue';

export interface QuoteItem {
  sku: string;
  quantity: number;
  product?: Product;
  addedAt: number;
}

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface QuoteContextType {
  items: QuoteItem[];
  addToQuote: (sku: string, quantity?: number) => void;
  removeFromQuote: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearQuote: () => void;
  totalCount: number;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: () => void;
  hasDemoItems: boolean;
}

const STORAGE_KEY = 'primeco-quote';
const MAX_ITEMS = 50;

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed: Array<{ sku: string; quantity: number; addedAt?: number }> = JSON.parse(stored);
      return parsed.slice(0, MAX_ITEMS).map(item => ({
        sku: item.sku,
        quantity: Math.min(999, Math.max(1, item.quantity || 1)),
        product: PRODUCTS.find(p => p.sku === item.sku),
        addedAt: item.addedAt || Date.now()
      }));
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      const simplified = items.map(i => ({
        sku: i.sku,
        quantity: i.quantity,
        addedAt: i.addedAt
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(simplified));
    } catch (e) {
      console.warn('Failed to save quote items to localStorage', e);
    }
  }, [items]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(curr => (curr && curr.id === id ? null : curr));
    }, 3800);
  };

  const dismissToast = () => setToast(null);

  const addToQuote = (sku: string, quantity: number = 1) => {
    const product = PRODUCTS.find(p => p.sku.toUpperCase() === sku.toUpperCase());
    const validQty = Math.min(999, Math.max(1, quantity));

    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.sku.toUpperCase() === sku.toUpperCase());
      if (existingIndex >= 0) {
        const next = [...prev];
        const newQty = Math.min(999, next[existingIndex].quantity + validQty);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty
        };
        showToast(`Updated quantity for ${product ? product.name : sku} (${newQty})`);
        return next;
      } else {
        if (prev.length >= MAX_ITEMS) {
          showToast(`Quote list maximum reached (${MAX_ITEMS} items)`, 'warning');
          return prev;
        }
        const newItem: QuoteItem = {
          sku: product ? product.sku : sku,
          quantity: validQty,
          product,
          addedAt: Date.now()
        };
        showToast(`Added ${product ? product.name : sku} to quote`);
        return [...prev, newItem];
      }
    });
  };

  const removeFromQuote = (sku: string) => {
    setItems(prev => {
      const filtered = prev.filter(item => item.sku.toUpperCase() !== sku.toUpperCase());
      showToast(`Removed item ${sku} from quote`, 'info');
      return filtered;
    });
  };

  const updateQuantity = (sku: string, quantity: number) => {
    const bounded = Math.min(999, Math.max(1, quantity));
    setItems(prev =>
      prev.map(item =>
        item.sku.toUpperCase() === sku.toUpperCase() ? { ...item, quantity: bounded } : item
      )
    );
  };

  const clearQuote = () => {
    setItems([]);
    showToast('Quote list cleared', 'info');
  };

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const hasDemoItems = items.some(item => item.product?.demo === true);

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        totalCount,
        toast,
        showToast,
        dismissToast,
        hasDemoItems
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
