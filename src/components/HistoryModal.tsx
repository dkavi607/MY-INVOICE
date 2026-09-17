import React from 'react';
import { InvoiceData } from '../types';
import { calculateTotals, formatMoney } from '../utils/formatters';
import { X, History, Trash2, ArrowUpRight, Copy, PlusCircle } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedInvoices: InvoiceData[];
  onLoadInvoice: (invoice: InvoiceData) => void;
  onDeleteInvoice: (id: string) => void;
  onClearAll: () => void;
  onNewInvoice: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedInvoices,
  onLoadInvoice,
  onDeleteInvoice,
  onClearAll,
  onNewInvoice,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 font-display">
                Saved Invoices & Drafts
              </h3>
              <p className="text-xs text-gray-500">
                Invoices saved locally in your browser cache ({savedInvoices.length})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoices List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedInvoices.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <History className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800">No saved invoices yet</p>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Click "Save Draft" in the editor preview toolbar to store invoices for quick access anytime.
              </p>
              <button
                type="button"
                onClick={() => {
                  onNewInvoice();
                  onClose();
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Create New Invoice
              </button>
            </div>
          ) : (
            savedInvoices.map((inv) => {
              const totals = calculateTotals(inv);
              return (
                <div
                  key={inv.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xs bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-gray-900">
                        {inv.invoiceNumber || 'Untitled Draft'}
                      </span>
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase">
                        {inv.currency}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600">
                      <strong>Client:</strong> {inv.client.name || 'Not specified'}
                    </div>

                    <div className="text-[11px] text-gray-400 flex items-center gap-3">
                      <span>Date: {inv.invoiceDate || '—'}</span>
                      <span>•</span>
                      <span>Due: {inv.dueDate || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-gray-400 font-medium">Total</div>
                      <div className="font-mono font-bold text-sm text-blue-600">
                        {formatMoney(totals.grandTotal, inv.currencySymbol, inv.currency)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          onLoadInvoice(inv);
                          onClose();
                        }}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Load <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteInvoice(inv.id)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete saved draft"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        {savedInvoices.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All History
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
