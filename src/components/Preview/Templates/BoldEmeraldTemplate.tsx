import React from 'react';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatMoney, numberToWords } from '../../../utils/formatters';
import { QRCodeDisplay } from '../QRCodeDisplay';

interface TemplateProps {
  invoice: InvoiceData;
}

export const BoldEmeraldTemplate: React.FC<TemplateProps> = ({ invoice }) => {
  const totals = calculateTotals(invoice);
  const words = numberToWords(totals.grandTotal, invoice.currency);

  return (
    <div className="bg-white text-gray-800 p-8 sm:p-10 font-sans leading-relaxed text-xs">
      {/* Emerald Top Accent */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b-2 border-emerald-600">
        <div className="space-y-2">
          {invoice.company.logoUrl ? (
            <img
              src={invoice.company.logoUrl}
              alt="Logo"
              className="max-h-16 max-w-[190px] object-contain rounded"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                ✦
              </div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 font-display">
                {invoice.company.name || 'CREATIVE AGENCY'}
              </h1>
            </div>
          )}
          <div className="text-gray-500 text-[11px] space-y-0.5">
            {invoice.company.address && <div>{invoice.company.address}</div>}
            {invoice.company.cityStateZip && <div>{invoice.company.cityStateZip}</div>}
            {invoice.company.email && <div>{invoice.company.email}</div>}
            {invoice.company.phone && <div>{invoice.company.phone}</div>}
            {invoice.company.taxId && <div>Tax ID: {invoice.company.taxId}</div>}
          </div>
        </div>

        <div className="sm:text-right">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Tax Invoice
          </span>
          <div className="text-2xl font-bold font-mono text-gray-900">{invoice.invoiceNumber}</div>
          <div className="text-[11px] text-gray-600 mt-2 space-y-0.5">
            <div>Date: <span className="font-semibold text-gray-900">{invoice.invoiceDate}</span></div>
            <div>Due: <span className="font-semibold text-emerald-700">{invoice.dueDate}</span></div>
          </div>
        </div>
      </div>

      {/* Client & Amount Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6">
        <div className="sm:col-span-7 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">Invoice For</span>
          <div className="text-sm font-bold text-gray-900 font-display">{invoice.client.name || 'Client Name'}</div>
          <div className="text-gray-600 text-xs mt-1 space-y-0.5">
            {invoice.client.address && <div>{invoice.client.address}</div>}
            {invoice.client.cityStateZip && <div>{invoice.client.cityStateZip}</div>}
            {invoice.client.email && <div>{invoice.client.email}</div>}
            {invoice.client.taxId && <div>Tax: {invoice.client.taxId}</div>}
          </div>
        </div>

        <div className="sm:col-span-5 bg-gray-900 text-white p-4 rounded-xl flex flex-col justify-between">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Total Payable</span>
          <div className="text-2xl font-black font-display text-white mt-1">
            {formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
          </div>
          <span className="text-[10px] text-gray-400 mt-1">All amounts in {invoice.currency}</span>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 my-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-900 text-white text-[11px] font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3 w-10 text-center">#</th>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3 text-right w-16">Qty</th>
              <th className="py-2.5 px-3 text-right w-24">Price</th>
              <th className="py-2.5 px-3 text-right w-28">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx} className="hover:bg-emerald-50/20">
                <td className="py-3 px-3 text-center text-gray-400 font-mono text-[11px]">{idx + 1}</td>
                <td className="py-3 px-3 font-medium text-gray-800">{item.description || '—'}</td>
                <td className="py-3 px-3 text-right font-mono text-gray-600">{item.quantity}</td>
                <td className="py-3 px-3 text-right font-mono text-gray-600">
                  {formatMoney(item.unitPrice, invoice.currencySymbol, invoice.currency)}
                </td>
                <td className="py-3 px-3 text-right font-bold font-mono text-gray-900">
                  {formatMoney((item.quantity || 0) * (item.unitPrice || 0), invoice.currencySymbol, invoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6">
        <div className="sm:col-span-7 space-y-3">
          {words && (
            <div className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">In Words:</span>
              <p className="italic font-medium text-gray-800">{words}</p>
            </div>
          )}
          {invoice.notes && (
            <div className="text-xs text-gray-600">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">Notes</span>
              <p>{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div className="text-[11px] text-gray-500">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Terms</span>
              <p>{invoice.terms}</p>
            </div>
          )}
        </div>

        <div className="sm:col-span-5 bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span className="font-mono">{formatMoney(totals.subtotal, invoice.currencySymbol, invoice.currency)}</span>
          </div>
          {invoice.discountEnabled && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount:</span>
              <span className="font-mono">-{formatMoney(totals.discountAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}
          {invoice.taxEnabled && (
            <div className="flex justify-between text-gray-600">
              <span>{invoice.taxLabel} ({invoice.taxRate}%):</span>
              <span className="font-mono">+{formatMoney(totals.taxAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}
          {invoice.shippingEnabled && (
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span className="font-mono">+{formatMoney(totals.shippingAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-gray-900">
            <span>Grand Total:</span>
            <span className="font-mono text-emerald-700">{formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}</span>
          </div>
        </div>
      </div>

      {/* Payment & Sign */}
      {(invoice.paymentDetails.bankName || invoice.paymentDetails.accountNumber || (invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr) || invoice.signatoryName) && (
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-emerald-50/30 p-3.5 rounded-xl border border-emerald-100">
          <div className="text-xs text-gray-600 space-y-0.5">
            {invoice.paymentDetails.bankName && <div>Bank: <strong>{invoice.paymentDetails.bankName}</strong></div>}
            {invoice.paymentDetails.accountNumber && <div>Account: <span className="font-mono">{invoice.paymentDetails.accountNumber}</span></div>}
            {invoice.paymentDetails.routingNumber && <div>Routing: <span className="font-mono">{invoice.paymentDetails.routingNumber}</span></div>}
            {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && !invoice.paymentDetails.bankName && (
              <div className="text-[11px] text-emerald-800">Scan QR code for direct payment via UPI, PayPal, or Crypto.</div>
            )}
          </div>

          {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && (
            <div className="shrink-0">
              <QRCodeDisplay value={invoice.paymentDetails.paymentLinkOrQr} size={70} />
            </div>
          )}

          {invoice.signatoryName && (
            <div className="text-right border-t border-gray-300 pt-1 min-w-[120px]">
              <div className="font-bold text-gray-900">{invoice.signatoryName}</div>
              <div className="text-[10px] text-gray-500">{invoice.signatoryTitle}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
