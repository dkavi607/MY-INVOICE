import React, { useState } from 'react';
import { InvoiceData } from '../types';
import { calculateTotals, formatMoney } from '../utils/formatters';
import { X, Mail, Copy, Check, Send, Sparkles } from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceData;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, invoice }) => {
  const totals = calculateTotals(invoice);
  const [recipient, setRecipient] = useState(invoice.client.email || '');
  const [subject, setSubject] = useState(`Invoice ${invoice.invoiceNumber} from ${invoice.company.name || 'Our Company'}`);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const defaultBody = `Hi ${invoice.client.name || 'there'},

Please find invoice ${invoice.invoiceNumber} for your review.

Invoice Summary:
• Amount Due: ${formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
• Due Date: ${invoice.dueDate}

Payment Instructions:
${invoice.paymentDetails.bankName ? `• Bank: ${invoice.paymentDetails.bankName}` : ''}
${invoice.paymentDetails.accountNumber ? `• Account: ${invoice.paymentDetails.accountNumber}` : ''}
${invoice.paymentDetails.paymentLinkOrQr ? `• Payment Link: ${invoice.paymentDetails.paymentLinkOrQr}` : ''}

Please let us know if you have any questions. Thank you for your business!

Best regards,
${invoice.company.name || 'Billing Team'}`;

  const handleSendViaClient = () => {
    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(defaultBody)}`;
    window.location.href = mailto;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(defaultBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 font-display">Email Invoice</h3>
              <p className="text-xs text-gray-500">Send directly to your client via your default mail client</p>
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

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">To Email</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="client@company.com"
              className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-gray-700">Email Body Preview</label>
              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Message
                  </>
                )}
              </button>
            </div>
            <textarea
              rows={8}
              readOnly
              value={defaultBody}
              className="w-full text-[11px] font-mono p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex items-start gap-2.5 text-[11px] text-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Tip:</strong> Download the PDF first, then click "Open Email App" below to attach the downloaded PDF invoice file to your email client.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSendViaClient}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Open in Email App
          </button>
        </div>
      </div>
    </div>
  );
};
