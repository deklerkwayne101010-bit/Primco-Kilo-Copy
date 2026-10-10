import React, { useState, useRef } from 'react';
import { PageId } from '../components/Header';
import { Section } from '../components/Section';
import { SectionHead } from '../components/SectionHead';
import { PRODUCTS, Product } from '../data/catalogue';
import { useQuote } from '../context/QuoteContext';
import { Upload, FileText, CheckCircle2, AlertTriangle, ArrowRight, Download, Plus } from 'lucide-react';

interface ParsedLine {
  sku: string;
  quantity: number;
  product?: Product;
  valid: boolean;
  error?: string;
}

interface QuickOrderPageProps {
  onNavigate: (page: PageId) => void;
}

export const QuickOrderPage: React.FC<QuickOrderPageProps> = ({ onNavigate }) => {
  const { addToQuote, showToast } = useQuote();
  const [csvText, setCsvText] = useState('');
  const [parsedItems, setParsedItems] = useState<ParsedLine[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse CSV text: SKU, Quantity
  const parseCSV = (content: string) => {
    const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const results: ParsedLine[] = [];

    // Skip header line if it contains "sku"
    const startIndex = lines[0]?.toLowerCase().includes('sku') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      const parts = line.split(/[;,,\t]/).map(p => p.trim());
      if (parts.length >= 1 && parts[0]) {
        const rawSku = parts[0].toUpperCase();
        const rawQty = parts.length > 1 ? parseInt(parts[1], 10) : 1;
        const qty = isNaN(rawQty) || rawQty <= 0 ? 1 : Math.min(999, rawQty);

        const foundProduct = PRODUCTS.find(p => p.sku.toUpperCase() === rawSku);

        if (foundProduct) {
          results.push({
            sku: foundProduct.sku,
            quantity: qty,
            product: foundProduct,
            valid: true
          });
        } else {
          results.push({
            sku: rawSku,
            quantity: qty,
            valid: false,
            error: 'SKU not found in active catalogue (can still be sourced)'
          });
        }
      }
    }

    setParsedItems(results);
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text);
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSampleDownload = () => {
    const sample = `SKU,Quantity\nPRM-BRK-019,4\nPRM-GLS-882,2\nPRM-PNT-104,5\nPRM-SND-400,10\nPRM-TOL-320,1\nPRM-FST-890,6`;
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'primeco-order-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadSampleData = () => {
    const sample = `PRM-BRK-019,4\nPRM-GLS-882,2\nPRM-PNT-104,5\nPRM-SND-400,10\nPRM-FST-890,8`;
    setCsvText(sample);
    parseCSV(sample);
  };

  const handleAddAllToQuote = () => {
    let addedCount = 0;
    parsedItems.forEach(item => {
      addToQuote(item.sku, item.quantity);
      addedCount += item.quantity;
    });
    showToast(`Added ${parsedItems.length} order lines (${addedCount} total units) to your quote!`);
    onNavigate('quote');
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
        <div className="container">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>BATCH ORDER PROCUREMENT</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Quick CSV Order Import
          </h1>
          <p className="text-sm text-[var(--muted)] max-w-xl">
            Upload your shop inventory replenishment file or paste your spreadsheet columns (SKU, Quantity) to rapidly assemble a multi-line quote in seconds.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <Section size="sm" background="none">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* File Drag-and-Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-[var(--radius-xl)] p-8 text-center transition-all flex flex-col items-center justify-center gap-4 ${
              dragActive
                ? 'border-[var(--blue)] bg-[var(--blue-dark)]/20 shadow-[var(--glow-md)]'
                : 'border-[var(--line)] bg-[#0b0e12] hover:border-[#3d4652]'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[#111418] border border-[var(--line)] flex items-center justify-center text-[var(--blue)]">
              <Upload size={28} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Drag and drop your .CSV order file here
              </h3>
              <p className="text-xs text-[var(--muted)] max-w-md">
                Format required: 2 columns with <strong>SKU</strong> and <strong>Quantity</strong> (e.g. PRM-BRK-019, 4)
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,text/csv,text/plain"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="button text-xs"
              >
                <span>Select CSV File</span>
              </button>

              <button
                type="button"
                onClick={handleSampleDownload}
                className="button-secondary text-xs"
              >
                <Download size={13} />
                <span>Download Sample Template</span>
              </button>

              <button
                type="button"
                onClick={handleLoadSampleData}
                className="text-xs text-[var(--blue)] hover:underline font-semibold ml-2 cursor-pointer"
              >
                Load Sample Demonstration
              </button>
            </div>
          </div>

          {/* Manual Text Paste Option */}
          <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--silver)] mb-2 flex items-center gap-2">
              <FileText size={14} className="text-[var(--blue)]" />
              <span>Or Paste Direct Spreadsheet Data</span>
            </h4>
            <textarea
              value={csvText}
              onChange={(e) => {
                setCsvText(e.target.value);
                parseCSV(e.target.value);
              }}
              rows={4}
              placeholder="PRM-BRK-019, 5&#10;PRM-PNT-104, 2&#10;PRM-SND-400, 10"
              className="w-full bg-[#111418] border border-[var(--line)] rounded p-3 text-xs font-mono text-white placeholder:text-[var(--muted)] focus:border-[var(--blue)] outline-none"
            />
          </div>

          {/* Parsed Preview Table */}
          {parsedItems.length > 0 && (
            <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-lg)] p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Parsed Order Lines ({parsedItems.length})
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Review and validate against Primeco catalogue before compiling to quote.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddAllToQuote}
                  className="button text-xs"
                >
                  <Plus size={14} />
                  <span>Add All Valid Lines to Quote</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] text-[var(--muted)] uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">SKU</th>
                      <th className="py-2.5 px-3">Item Name</th>
                      <th className="py-2.5 px-3">Unit Packaging</th>
                      <th className="py-2.5 px-3 text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-[var(--line)]/50 hover:bg-[#11151a]">
                        <td className="py-2.5 px-3">
                          {item.valid ? (
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                              <CheckCircle2 size={13} /> Ready
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-400 font-semibold">
                              <AlertTriangle size={13} /> Sourcing Required
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-white">
                          {item.sku}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--silver)] font-medium">
                          {item.product?.name || item.error || 'Custom Part Entry'}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--muted)]">
                          {item.product?.unit || 'Custom Order'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-white font-mono">
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};
