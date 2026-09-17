import React from 'react';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatMoney, numberToWords } from '../../../utils/formatters';
import { QRCodeDisplay } from '../QRCodeDisplay';
import { Building2, Calendar, FileText } from 'lucide-react';

interface TemplateProps {
  invoice: InvoiceData;
}

export const ModernBlueTemplate: React.FC<TemplateProps> = ({ invoice }) => {
  const totals = calculateTotals(invoice);
  const words = numberToWords(totals.grandTotal, invoice.currency);

  return (
    <div className="bg-white text-gray-800 p-8 sm:p-10 font-sans leading-relaxed text-xs">
      {/* Top Banner Accent */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 mb-8" />

      {/* Header: Company & Invoice Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-gray-100">
        <div className="space-y-3 max-w-sm">
          {invoice.company.logoUrl ? (
            <img
              src={invoice.company.logoUrl}
              alt={invoice.company.name || 'Company Logo'}
              className="max-h-16 max-w-[200px] object-contain rounded"
            />
          ) : (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                {invoice.company.name ? invoice.company.name.charAt(0).toUpperCase() : 'M'}
              </div>
              <span className="font-bold text-lg text-gray-900 font-display">
                {invoice.company.name || 'MY COMPANY'}
              </span>
            </div>
          )}

          <div className="text-gray-600 text-[11px] space-y-0.5">
            {invoice.company.name && <div className="font-bold text-gray-800 text-xs">{invoice.company.name}</div>}
            {invoice.company.address && <div>{invoice.company.address}</div>}
            {invoice.company.cityStateZip && <div>{invoice.company.cityStateZip}</div>}
            {invoice.company.email && <div>Email: {invoice.company.email}</div>}
            {invoice.company.phone && <div>Tel: {invoice.company.phone}</div>}
            {invoice.company.taxId && <div className="font-mono text-[10px] text-gray-500">Tax ID: {invoice.company.taxId}</div>}
          </div>
        </div>

        <div className="sm:text-right space-y-2">
          <div className="inline-block bg-blue-50 text-blue-700 font-extrabold text-2xl sm:text-3xl tracking-tight px-4 py-1.5 rounded-xl font-display">
            INVOICE
          </div>
          <div className="space-y-1 text-gray-600 text-[11px]">
            <div className="flex sm:justify-end gap-2">
              <span className="text-gray-400 font-medium">Invoice No:</span>
              <span className="font-bold text-gray-900 font-mono">{invoice.invoiceNumber || 'INV-0001'}</span>
            </div>
            <div className="flex sm:justify-end gap-2">
              <span className="text-gray-400 font-medium">Invoice Date:</span>
              <span className="font-semibold text-gray-800">{invoice.invoiceDate || '—'}</span>
            </div>
            <div className="flex sm:justify-end gap-2">
              <span className="text-gray-400 font-medium">Payment Due:</span>
              <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[11px]">{invoice.dueDate || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To & Quick Summary Box */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-8">
        <div className="sm:col-span-7 bg-gray-50/70 rounded-xl p-5 border border-gray-100">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-2">
            Billed To
          </span>
          <div className="text-sm font-bold text-gray-900 font-display">
            {invoice.client.name || 'Client / Recipient Name'}
          </div>
          <div className="text-gray-600 text-xs mt-1.5 space-y-0.5">
            {invoice.client.address && <div>{invoice.client.address}</div>}
            {invoice.client.cityStateZip && <div>{invoice.client.cityStateZip}</div>}
            {invoice.client.email && <div>Email: {invoice.client.email}</div>}
            {invoice.client.phone && <div>Tel: {invoice.client.phone}</div>}
            {invoice.client.taxId && <div className="font-mono text-[10px] text-gray-400 mt-1">Tax ID: {invoice.client.taxId}</div>}
          </div>
        </div>

        <div className="sm:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block mb-1">
              Total Balance Due
            </span>
            <div className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              {formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
            </div>
          </div>
          <div className="text-[10px] text-blue-100/90 pt-3 border-t border-blue-500/40 flex justify-between items-center">
            <span>Currency: {invoice.currency}</span>
            <span>Due: {invoice.dueDate}</span>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 my-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider border-b border-gray-200">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right w-20">Qty</th>
              <th className="py-3 px-4 text-right w-28">Unit Price</th>
              <th className="py-3 px-4 text-right w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {invoice.items.map((item, idx) => {
              const qty = Number(item.quantity) || 0;
              const price = Number(item.unitPrice) || 0;
              return (
                <tr key={item.id || idx} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3 px-4 text-center text-gray-400 font-mono text-[11px]">{idx + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{item.description || '—'}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-600">{qty}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-600">
                    {formatMoney(price, invoice.currencySymbol, invoice.currency)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold font-mono text-gray-900">
                    {formatMoney(qty * price, invoice.currencySymbol, invoice.currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary & Calculations Section */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 pt-2">
        {/* Left: Notes & Words */}
        <div className="sm:col-span-7 space-y-4">
          {words && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Amount in Words</span>
              <p className="text-xs font-semibold text-gray-700 italic">{words}</p>
            </div>
          )}

          {invoice.notes && (
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Notes / Instructions</span>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}

          {invoice.terms && (
            <div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Terms & Conditions</span>
              <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-line">{invoice.terms}</p>
            </div>
          )}
        </div>

        {/* Right: Calculations */}
        <div className="sm:col-span-5 bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span className="font-mono font-semibold text-gray-800">
              {formatMoney(totals.subtotal, invoice.currencySymbol, invoice.currency)}
            </span>
          </div>

          {invoice.discountEnabled && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount {invoice.discountType === 'percentage' ? `(${invoice.discountValue}%)` : ''}:</span>
              <span className="font-mono font-semibold">
                -{formatMoney(totals.discountAmount, invoice.currencySymbol, invoice.currency)}
              </span>
            </div>
          )}

          {invoice.taxEnabled && (
            <div className="flex justify-between text-gray-600">
              <span>{invoice.taxLabel || 'Tax'} ({invoice.taxRate}%):</span>
              <span className="font-mono font-semibold text-gray-800">
                +{formatMoney(totals.taxAmount, invoice.currencySymbol, invoice.currency)}
              </span>
            </div>
          )}

          {invoice.shippingEnabled && (
            <div className="flex justify-between text-gray-600">
              <span>Shipping & Handling:</span>
              <span className="font-mono font-semibold text-gray-800">
                +{formatMoney(totals.shippingAmount, invoice.currencySymbol, invoice.currency)}
              </span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2.5 mt-2 flex justify-between items-center text-sm font-bold text-gray-900">
            <span className="text-base font-display">Grand Total:</span>
            <span className="text-lg font-mono text-blue-600">
              {formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Details & QR Code Bar */}
      {(invoice.paymentDetails.bankName || invoice.paymentDetails.accountNumber || (invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr)) && (
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50/40 p-4.5 rounded-xl border border-blue-100">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
              Payment Instructions {invoice.paymentDetails.paymentMethod ? `(${invoice.paymentDetails.paymentMethod})` : ''}
            </span>
            <div className="text-xs text-gray-700 space-y-0.5">
              {invoice.paymentDetails.bankName && <div><strong>Bank:</strong> {invoice.paymentDetails.bankName}</div>}
              {invoice.paymentDetails.accountName && <div><strong>Account Name:</strong> {invoice.paymentDetails.accountName}</div>}
              {invoice.paymentDetails.accountNumber && <div><strong>Account No:</strong> <span className="font-mono font-semibold">{invoice.paymentDetails.accountNumber}</span></div>}
              {invoice.paymentDetails.routingNumber && <div><strong>Routing:</strong> <span className="font-mono">{invoice.paymentDetails.routingNumber}</span></div>}
              {invoice.paymentDetails.swiftIban && <div><strong>SWIFT / IBAN:</strong> <span className="font-mono">{invoice.paymentDetails.swiftIban}</span></div>}
              {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && !invoice.paymentDetails.bankName && (
                <div className="text-gray-600 text-[11px]">
                  Scan the QR code to complete payment instantly via UPI, PayPal, or Crypto.
                </div>
              )}
            </div>
          </div>

          {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && (
            <div className="shrink-0 flex flex-col items-center">
              <QRCodeDisplay value={invoice.paymentDetails.paymentLinkOrQr} size={75} />
            </div>
          )}
        </div>
      )}

      {/* Signatory & Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
        <div>
          {invoice.footerMessage && (
            <p className="font-medium text-gray-600">{invoice.footerMessage}</p>
          )}
        </div>
        {invoice.signatoryName && (
          <div className="text-center sm:text-right border-t border-gray-300 pt-2 min-w-[140px]">
            <div className="font-bold text-gray-800">{invoice.signatoryName}</div>
            {invoice.signatoryTitle && <div className="text-[10px] text-gray-500">{invoice.signatoryTitle}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
