import React, { useState, useEffect, useCallback } from 'react';
import { InvoiceData, TemplateStyle } from './types';
import { getDefaultInvoiceData, getBlankInvoiceData, calculateTotals, formatMoney } from './utils/formatters';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AdBanner } from './components/AdBanner';
import { CompanyCard } from './components/FormCards/CompanyCard';
import { ClientCard } from './components/FormCards/ClientCard';
import { InvoiceDetailsCard } from './components/FormCards/InvoiceDetailsCard';
import { LineItemsCard } from './components/FormCards/LineItemsCard';
import { AdditionalOptionsCard } from './components/FormCards/AdditionalOptionsCard';
import { InvoicePreview } from './components/Preview/InvoicePreview';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { HistoryModal } from './components/HistoryModal';
import { EmailModal } from './components/EmailModal';
import { CookieBanner } from './components/CookieBanner';
import { LegalModal } from './components/LegalModals';
import { Sparkles, ArrowDown, Check, Save, Eye, Download, FileText } from 'lucide-react';

const STORAGE_KEY_CURRENT = 'my_invoice_current_draft_v1';
const STORAGE_KEY_HISTORY = 'my_invoice_history_list_v1';

export default function App() {
  // Primary invoice state
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return getDefaultInvoiceData();
  });

  // History state
  const [savedInvoices, setSavedInvoices] = useState<InvoiceData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Modal states
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'adsense' | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);

  // Auto-save current draft
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(invoice));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [invoice]);

  // Save history to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(savedInvoices));
    } catch (e) {
      console.error('Failed to sync history', e);
    }
  }, [savedInvoices]);

  // Handle explicit save to history
  const handleSaveToHistory = useCallback(() => {
    const itemToSave = {
      ...invoice,
      updatedAt: new Date().toISOString(),
    };

    setSavedInvoices((prev) => {
      const filtered = prev.filter((i) => i.id !== itemToSave.id);
      return [itemToSave, ...filtered].slice(0, 30); // keep up to 30 items
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  }, [invoice]);

  // Keyboard shortcuts (Ctrl+S to save, Ctrl+P to print)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveToHistory();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        // let standard browser print handle it, our print CSS will format the invoice
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveToHistory]);

  const handleUpdateInvoice = (updated: Partial<InvoiceData>) => {
    setInvoice((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all invoice fields?')) {
      const blank = getBlankInvoiceData();
      setInvoice(blank);
    }
  };

  const handleLoadSample = () => {
    const sample = getDefaultInvoiceData();
    setInvoice(sample);
  };

  const handleNewInvoice = () => {
    const blank = getBlankInvoiceData();
    setInvoice(blank);
  };

  const handleLoadHistoryInvoice = (loaded: InvoiceData) => {
    setInvoice(loaded);
  };

  const handleDeleteHistoryInvoice = (id: string) => {
    setSavedInvoices((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved invoice history?')) {
      setSavedInvoices([]);
    }
  };

  const totals = calculateTotals(invoice);

  const scrollToPreview = () => {
    const el = document.getElementById('printable-invoice');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerDownload = () => {
    const btn = document.getElementById('download-pdf-btn');
    if (btn) {
      btn.click();
    } else {
      window.print();
    }
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50/80 flex flex-col font-sans text-gray-800 selection:bg-blue-600 selection:text-white pb-20 lg:pb-0">
      {/* Top Google AdSense Banner (728x90) */}
      <AdBanner slot="top-banner" />

      {/* Header Bar */}
      <Header
        onLoadSample={handleLoadSample}
        onOpenHistory={() => setHistoryModalOpen(true)}
        onNewInvoice={handleNewInvoice}
        onDownloadPDF={handleTriggerDownload}
        onPrint={handleTriggerPrint}
        savedCount={savedInvoices.length}
      />

      {/* Hero Presentation Section */}
      <HeroSection />

      {/* Main Tool Application Section */}
      <main id="tool-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Quick notification banner if saved */}
        {savedNotice && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              Invoice "{invoice.invoiceNumber}" saved to local draft history!
            </span>
            <button
              type="button"
              onClick={() => setHistoryModalOpen(true)}
              className="text-emerald-900 underline hover:no-underline"
            >
              View Saved Drafts ({savedInvoices.length})
            </button>
          </div>
        )}

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Input Form (approx 58-60% width) */}
          <div id="input-form-column" className="lg:col-span-7 space-y-6">
            {/* Step 1: Company Information Card */}
            <CompanyCard
              company={invoice.company}
              onChange={(updated) =>
                handleUpdateInvoice({
                  company: { ...invoice.company, ...updated },
                })
              }
            />

            {/* Step 2: Client Information Card */}
            <ClientCard
              client={invoice.client}
              company={invoice.company}
              onChange={(updated) =>
                handleUpdateInvoice({
                  client: { ...invoice.client, ...updated },
                })
              }
            />

            {/* In-Content Native Ad Placement (Between cards as per AdSense specs) */}
            <AdBanner slot="in-content" />

            {/* Step 3: Invoice Details, Currency & Taxes Card */}
            <InvoiceDetailsCard
              invoice={invoice}
              onChange={handleUpdateInvoice}
            />

            {/* Step 4: Line Items Table Card */}
            <LineItemsCard
              items={invoice.items}
              currencySymbol={invoice.currencySymbol}
              onChange={(items) => handleUpdateInvoice({ items })}
            />

            {/* Step 5: Additional Options, Payment & Notes Card */}
            <AdditionalOptionsCard
              invoice={invoice}
              onChange={handleUpdateInvoice}
            />
          </div>

          {/* Right Column - Live Preview (approx 40-42% width, sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <InvoicePreview
              invoice={invoice}
              onTemplateChange={(style: TemplateStyle) => handleUpdateInvoice({ templateStyle: style })}
              onReset={handleReset}
              onSaveToHistory={handleSaveToHistory}
              onOpenEmailModal={() => setEmailModalOpen(true)}
            />

            {/* Sidebar Ad Placement (300x250) */}
            <AdBanner slot="sidebar" />
          </div>
        </div>
      </main>

      {/* Floating Mobile Summary & Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-xl flex items-center justify-between no-print">
        <div>
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Total Due ({invoice.currency})</span>
          <span className="text-base font-extrabold text-blue-600 font-mono">
            {formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToPreview}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const btn = document.getElementById('download-pdf-btn');
              if (btn) btn.click();
            }}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Features Overview Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Bottom Responsive Ad Banner (Before Footer) */}
      <AdBanner slot="bottom-banner" />

      {/* Footer */}
      <Footer onOpenLegal={(type) => setLegalModalType(type)} />

      {/* Mobile Anchor Fixed Ad */}
      <AdBanner slot="mobile-anchor" />

      {/* GDPR Cookie Consent */}
      <CookieBanner />

      {/* History Management Modal */}
      <HistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        savedInvoices={savedInvoices}
        onLoadInvoice={handleLoadHistoryInvoice}
        onDeleteInvoice={handleDeleteHistoryInvoice}
        onClearAll={handleClearAllHistory}
        onNewInvoice={handleNewInvoice}
      />

      {/* Email Invoice Modal */}
      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        invoice={invoice}
      />

      {/* Legal & AdSense Documentation Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
