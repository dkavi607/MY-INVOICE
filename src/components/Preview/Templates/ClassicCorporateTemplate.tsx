import React from 'react';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatMoney, numberToWords } from '../../../utils/formatters';
import { QRCodeDisplay } from '../QRCodeDisplay';

interface TemplateProps {
  invoice: InvoiceData;
}

export const ClassicCorporateTemplate: React.FC<TemplateProps> = ({ invoice }) => {
  const totals = calculateTotals(invoice);
  const words = numberToWords(totals.grandTotal, invoice.currency);

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-10 font-sans leading-relaxed text-xs border border-slate-200">
      {/* Formal Header */}
      <div className="bg-slate-900 text-white -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          {invoice.company.logoUrl ? (
            <img
              src={invoice.company.logoUrl}
              alt="Logo"
              className="max-h-12 max-w-[180px] object-contain rounded bg-white p-1 mb-2"
            />
          ) : (
            <h1 className="text-2xl font-bold tracking-wider uppercase font-display text-white">
              {invoice.company.name || 'COMMERCIAL ENTERPRISE'}
            </h1>
          )}
          <div className="text-slate-300 text-[11px] space-y-0.5 mt-2">
            {invoice.company.address && <div>{invoice.company.address}, {invoice.company.cityStateZip}</div>}
            {invoice.company.email && <div>Email: {invoice.company.email} | Phone: {invoice.company.phone}</div>}
            {invoice.company.taxId && <div>Tax / VAT ID: {invoice.company.taxId}</div>}
          </div>
        </div>

        <div className="sm:text-right bg-slate-800/80 p-4 rounded-lg border border-slate-700 min-w-[200px]">
          <div className="text-lg font-black text-amber-400 font-display uppercase tracking-widest">
            OFFICIAL INVOICE
          </div>
          <div className="text-xs text-slate-200 mt-2 space-y-1">
            <div className="flex justify-between sm:justify-end gap-3">
              <span className="text-slate-400">Invoice Ref:</span>
              <span className="font-mono font-bold text-white">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between sm:justify-end gap-3">
              <span className="text-slate-400">Date:</span>
              <span>{invoice.invoiceDate}</span>
            </div>
            <div className="flex justify-between sm:justify-end gap-3">
              <span className="text-slate-400">Due Date:</span>
              <span className="font-bold text-amber-300">{invoice.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To & Summary */}
      <div className="border border-slate-300 rounded-lg p-4 mb-6 bg-slate-50/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Customer / Client Information
            </span>
            <div className="text-sm font-bold text-slate-900">{invoice.client.name || 'Client Name'}</div>
            <div className="text-slate-600 text-xs mt-1 space-y-0.5">
              {invoice.client.address && <div>{invoice.client.address}</div>}
              {invoice.client.cityStateZip && <div>{invoice.client.cityStateZip}</div>}
              {invoice.client.email && <div>Email: {invoice.client.email}</div>}
              {invoice.client.taxId && <div>Client VAT: {invoice.client.taxId}</div>}
            </div>
          </div>

          <div className="sm:border-l sm:border-slate-300 sm:pl-4 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Payment Summary
            </span>
            <div className="text-xs text-slate-700">Currency: <strong>{invoice.currency}</strong></div>
            <div className="text-lg font-black text-slate-900 font-mono mt-1">
              Total: {formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="border border-slate-300 rounded-lg overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-200 text-slate-800 text-[11px] font-bold uppercase tracking-wider">
              <th className="py-2.5 px-3 w-10 text-center border-r border-slate-300">#</th>
              <th className="py-2.5 px-3 border-r border-slate-300">Item Description</th>
              <th className="py-2.5 px-3 text-right w-16 border-r border-slate-300">Qty</th>
              <th className="py-2.5 px-3 text-right w-24 border-r border-slate-300">Rate</th>
              <th className="py-2.5 px-3 text-right w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-2.5 px-3 text-center text-slate-400 font-mono border-r border-slate-200">{idx + 1}</td>
                <td className="py-2.5 px-3 font-medium text-slate-800 border-r border-slate-200">{item.description || '—'}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-600 border-r border-slate-200">{item.quantity}</td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-600 border-r border-slate-200">
                  {formatMoney(item.unitPrice, invoice.currencySymbol, invoice.currency)}
                </td>
                <td className="py-2.5 px-3 text-right font-bold font-mono text-slate-900">
                  {formatMoney((item.quantity || 0) * (item.unitPrice || 0), invoice.currencySymbol, invoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6">
        <div className="sm:col-span-7 space-y-3">
          {words && (
            <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200">
              <strong>In Words:</strong> {words}
            </div>
          )}
          {invoice.notes && (
            <div className="text-xs text-slate-600">
              <strong>Notes:</strong> {invoice.notes}
            </div>
          )}
          {invoice.terms && (
            <div className="text-[11px] text-slate-500">
              <strong>Terms & Conditions:</strong> {invoice.terms}
            </div>
          )}
        </div>

        <div className="sm:col-span-5 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal:</span>
            <span className="font-mono font-semibold">{formatMoney(totals.subtotal, invoice.currencySymbol, invoice.currency)}</span>
          </div>
          {invoice.discountEnabled && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount:</span>
              <span className="font-mono">-{formatMoney(totals.discountAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}
          {invoice.taxEnabled && (
            <div className="flex justify-between text-slate-600">
              <span>{invoice.taxLabel} ({invoice.taxRate}%):</span>
              <span className="font-mono">+{formatMoney(totals.taxAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}
          {invoice.shippingEnabled && (
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee:</span>
              <span className="font-mono">+{formatMoney(totals.shippingAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}
          <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-sm text-slate-900">
            <span>Balance Due:</span>
            <span className="font-mono text-blue-900">{formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}</span>
          </div>
        </div>
      </div>

      {/* Payment & Signatory */}
      {(invoice.paymentDetails.bankName || invoice.paymentDetails.accountNumber || (invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr) || invoice.signatoryName) && (
        <div className="mt-8 pt-4 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-600 space-y-0.5">
            {invoice.paymentDetails.bankName && <div>Bank: <strong>{invoice.paymentDetails.bankName}</strong></div>}
            {invoice.paymentDetails.accountNumber && <div>A/C: <span className="font-mono">{invoice.paymentDetails.accountNumber}</span></div>}
            {invoice.paymentDetails.swiftIban && <div>SWIFT: <span className="font-mono">{invoice.paymentDetails.swiftIban}</span></div>}
            {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && !invoice.paymentDetails.bankName && (
              <div className="text-[11px] text-slate-600">Scan QR code for instant payment (UPI, PayPal, or Crypto).</div>
            )}
          </div>

          {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && (
            <div className="shrink-0">
              <QRCodeDisplay value={invoice.paymentDetails.paymentLinkOrQr} size={70} />
            </div>
          )}

          {invoice.signatoryName && (
            <div className="text-right border-t border-slate-400 pt-2 min-w-[120px]">
              <div className="font-bold text-slate-900">{invoice.signatoryName}</div>
              <div className="text-[10px] text-slate-500">{invoice.signatoryTitle}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
