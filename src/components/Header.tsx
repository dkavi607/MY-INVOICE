import React, { useState } from 'react';
import { FileText, Sparkles, History, Menu, X, PlusCircle, Download, Printer } from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onOpenHistory: () => void;
  onNewInvoice: () => void;
  onDownloadPDF?: () => void;
  onPrint?: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadSample,
  onOpenHistory,
  onNewInvoice,
  onDownloadPDF,
  onPrint,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-gray-950 flex items-center gap-1">
                MY <span className="text-blue-600">INVOICE</span>
              </span>
              <span className="hidden sm:block text-[10px] text-gray-400 font-medium tracking-wide -mt-1">
                Free Online Generator
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <button
              type="button"
              onClick={() => scrollToSection('tool-section')}
              className="hover:text-blue-600 transition-colors"
            >
              Generator
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features-section')}
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works-section')}
              className="hover:text-blue-600 transition-colors"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-blue-600 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onPrint && (
              <button
                type="button"
                onClick={onPrint}
                className="hidden xl:flex text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition-colors items-center gap-1.5"
                title="Print Invoice (Ctrl+P)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            )}

            {onDownloadPDF && (
              <button
                type="button"
                onClick={onDownloadPDF}
                className="hidden sm:flex text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-xl shadow-2xs hover:shadow-xs transition-all items-center gap-1.5"
                title="Download PDF Invoice"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenHistory}
              className="relative text-xs font-semibold text-gray-700 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              title="Saved Invoices History"
            >
              <History className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Saved Drafts</span>
              {savedCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onLoadSample}
              className="hidden lg:flex text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl transition-colors items-center gap-1.5 border border-indigo-100"
              title="Load realistic sample invoice data"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sample Demo</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNewInvoice();
                scrollToSection('tool-section');
              }}
              className="bg-gray-900 hover:bg-black text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {onDownloadPDF && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onDownloadPDF();
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF Invoice
            </button>
          )}

          {onPrint && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onPrint();
              }}
              className="w-full text-left py-2 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-gray-500" />
              Print Invoice
            </button>
          )}

          <button
            type="button"
            onClick={() => scrollToSection('tool-section')}
            className="w-full text-left py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Invoice Generator
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('features-section')}
            className="w-full text-left py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works-section')}
            className="w-full text-left py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('faq-section')}
            className="w-full text-left py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Frequently Asked Questions
          </button>
          <button
            type="button"
            onClick={() => {
              onLoadSample();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-medium text-indigo-700 bg-indigo-50/70 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Load Sample Invoice Data
          </button>
        </div>
      )}
    </header>
  );
};
