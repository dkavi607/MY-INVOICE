import React, { useState } from 'react';
import { InvoiceData, TemplateStyle } from '../../types';
import { ModernBlueTemplate } from './Templates/ModernBlueTemplate';
import { MinimalSlateTemplate } from './Templates/MinimalSlateTemplate';
import { ClassicCorporateTemplate } from './Templates/ClassicCorporateTemplate';
import { BoldEmeraldTemplate } from './Templates/BoldEmeraldTemplate';
import { generateInvoicePDF } from '../../utils/pdfGenerator';
import { exportToCSV } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import {
  Download,
  Printer,
  Mail,
  RotateCcw,
  FileSpreadsheet,
  BookmarkPlus,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Palette,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  onTemplateChange: (style: TemplateStyle) => void;
  onReset: () => void;
  onSaveToHistory: () => void;
  onOpenEmailModal: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  onTemplateChange,
  onReset,
  onSaveToHistory,
  onOpenEmailModal,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      setProgressMsg('Initializing PDF export...');
      const filename = `${invoice.invoiceNumber || 'invoice'}.pdf`;

      await generateInvoicePDF('printable-invoice-paper', filename, (status) => {
        setProgressMsg(status);
      });

      setDownloadSuccess(true);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.log(e);
      }

      setTimeout(() => {
        setDownloadSuccess(false);
      }, 4000);
    } catch (err: any) {
      console.warn('PDF Generator encountered notice:', err);
      // If canvas generation fails or is blocked by an iframe sandbox, prompt print fallback
      const usePrintFallback = window.confirm(
        'Direct canvas PDF download is processing or blocked by browser settings. Would you like to use the Print Dialog to Save as PDF instead?'
      );
      if (usePrintFallback) {
        window.print();
      }
    } finally {
      setDownloading(false);
      setProgressMsg('');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const templates: { id: TemplateStyle; name: string; color: string }[] = [
    { id: 'modern-blue', name: 'Modern Blue', color: 'bg-blue-600' },
    { id: 'minimal-slate', name: 'Minimal Slate', color: 'bg-zinc-800' },
    { id: 'classic-corporate', name: 'Corporate', color: 'bg-slate-900' },
    { id: 'bold-emerald', name: 'Tech Emerald', color: 'bg-emerald-600' },
  ];

  const renderTemplate = () => {
    switch (invoice.templateStyle) {
      case 'minimal-slate':
        return <MinimalSlateTemplate invoice={invoice} />;
      case 'classic-corporate':
        return <ClassicCorporateTemplate invoice={invoice} />;
      case 'bold-emerald':
        return <BoldEmeraldTemplate invoice={invoice} />;
      case 'modern-blue':
      default:
        return <ModernBlueTemplate invoice={invoice} />;
    }
  };

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900/90 p-4 md:p-8 backdrop-blur-sm overflow-y-auto' : ''}`}>
      {/* Top Action Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs mb-4 no-print">
        {/* Template Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-gray-700">Template Style:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onTemplateChange(tpl.id)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  invoice.templateStyle === tpl.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${tpl.color}`} />
                {tpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
          {/* Primary Download Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="download-pdf-btn"
              type="button"
              disabled={downloading}
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{progressMsg || 'Generating PDF...'}</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              id="print-invoice-btn"
              type="button"
              onClick={handlePrint}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onOpenEmailModal}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-2.5 py-2 rounded-lg border border-gray-200 transition-colors flex items-center gap-1.5"
              title="Send via Email"
            >
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden md:inline">Email</span>
            </button>

            <button
              type="button"
              onClick={onSaveToHistory}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-2.5 py-2 rounded-lg border border-gray-200 transition-colors flex items-center gap-1.5"
              title="Save to Drafts / History"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden md:inline">Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => exportToCSV(invoice)}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-2.5 py-2 rounded-lg border border-gray-200 transition-colors flex items-center gap-1.5"
              title="Export as CSV / Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">CSV</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="text-xs text-rose-600 hover:bg-rose-50 font-medium px-2.5 py-2 rounded-lg border border-rose-100 transition-colors flex items-center gap-1"
              title="Reset form"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Zoom / Fullscreen */}
            <div className="flex items-center border-l border-gray-200 pl-1.5 ml-1 gap-1">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-gray-500 w-8 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded ml-1"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 text-blue-600" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Paper Container */}
      <div
        id="invoice-preview-container"
        className="flex-1 overflow-x-auto overflow-y-auto bg-gray-200/70 p-3 sm:p-6 rounded-2xl border border-gray-300/80 flex justify-center items-start shadow-inner min-h-[500px]"
      >
        <div
          id="printable-invoice"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease',
          }}
          className="w-full max-w-[794px] transition-all"
        >
          <div
            id="printable-invoice-paper"
            className="w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/80"
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
