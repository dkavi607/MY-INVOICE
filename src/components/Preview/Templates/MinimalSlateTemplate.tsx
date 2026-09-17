import React from 'react';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatMoney, numberToWords } from '../../../utils/formatters';
import { QRCodeDisplay } from '../QRCodeDisplay';

interface TemplateProps {
  invoice: InvoiceData;
}

export const MinimalSlateTemplate: React.FC<TemplateProps> = ({ invoice }) => {
  const totals = calculateTotals(invoice);
  const words = numberToWords(totals.grandTotal, invoice.currency);

  return (
    <div className="bg-white text-zinc-900 p-8 sm:p-10 font-sans leading-relaxed text-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b-2 border-zinc-900">
        <div>
          {invoice.company.logoUrl ? (
            <img
              src={invoice.company.logoUrl}
              alt="Logo"
              className="max-h-14 max-w-[180px] object-contain rounded mb-2"
            />
          ) : (
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 font-display">
              {invoice.company.name || 'COMPANY NAME'}
            </h1>
          )}
          <div className="text-zinc-500 text-[11px] mt-1 space-y-0.5">
            {invoice.company.address && <div>{invoice.company.address}</div>}
            {invoice.company.cityStateZip && <div>{invoice.company.cityStateZip}</div>}
            {invoice.company.email && <div>{invoice.company.email}</div>}
            {invoice.company.taxId && <div>Tax ID: {invoice.company.taxId}</div>}
          </div>
        </div>

        <div className="sm:text-right">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">INVOICE SPECIFICATION</div>
          <div className="text-xl font-bold font-mono text-zinc-900 mt-1">{invoice.invoiceNumber}</div>
          <div className="text-[11px] text-zinc-600 mt-2 space-y-0.5">
            <div>Issued: <span className="font-medium text-zinc-900">{invoice.invoiceDate}</span></div>
            <div>Due: <span className="font-bold text-zinc-900">{invoice.dueDate}</span></div>
          </div>
        </div>
      </div>

      {/* Bill To & Total Due Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
            INVOICE TO
          </span>
          <div className="text-sm font-bold text-zinc-900">{invoice.client.name || 'Recipient'}</div>
          <div className="text-zinc-600 text-xs mt-1 space-y-0.5">
            {invoice.client.address && <div>{invoice.client.address}</div>}
            {invoice.client.cityStateZip && <div>{invoice.client.cityStateZip}</div>}
            {invoice.client.email && <div>{invoice.client.email}</div>}
          </div>
        </div>

        <div className="sm:text-right flex flex-col justify-end">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
            AMOUNT PAYABLE ({invoice.currency})
          </span>
          <div className="text-3xl font-light font-display text-zinc-900">
            {formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-left my-6 border-collapse">
        <thead>
          <tr className="border-b border-zinc-300 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            <th className="py-2.5 px-2">Description</th>
            <th className="py-2.5 px-2 text-right">Qty</th>
            <th className="py-2.5 px-2 text-right">Price</th>
            <th className="py-2.5 px-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-xs">
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx}>
              <td className="py-3 px-2 font-medium text-zinc-800">{item.description || '—'}</td>
              <td className="py-3 px-2 text-right font-mono text-zinc-600">{item.quantity}</td>
              <td className="py-3 px-2 text-right font-mono text-zinc-600">
                {formatMoney(item.unitPrice, invoice.currencySymbol, invoice.currency)}
              </td>
              <td className="py-3 px-2 text-right font-mono font-semibold text-zinc-900">
                {formatMoney((item.quantity || 0) * (item.unitPrice || 0), invoice.currencySymbol, invoice.currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Calculations & Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 my-8 pt-4 border-t border-zinc-200">
        <div className="sm:col-span-7 space-y-4">
          {words && (
            <div className="text-[11px] text-zinc-600">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Total in Words:</span>
              <span className="font-serif italic">{words}</span>
            </div>
          )}

          {invoice.notes && (
            <div className="text-xs text-zinc-600">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">Notes</span>
              <p className="whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}

          {invoice.terms && (
            <div className="text-[11px] text-zinc-500">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">Terms</span>
              <p className="whitespace-pre-line">{invoice.terms}</p>
            </div>
          )}
        </div>

        <div className="sm:col-span-5 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-600">
            <span>Subtotal</span>
            <span className="font-mono">{formatMoney(totals.subtotal, invoice.currencySymbol, invoice.currency)}</span>
          </div>

          {invoice.discountEnabled && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span className="font-mono">-{formatMoney(totals.discountAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}

          {invoice.taxEnabled && (
            <div className="flex justify-between text-zinc-600">
              <span>{invoice.taxLabel || 'Tax'} ({invoice.taxRate}%)</span>
              <span className="font-mono">+{formatMoney(totals.taxAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}

          {invoice.shippingEnabled && (
            <div className="flex justify-between text-zinc-600">
              <span>Shipping</span>
              <span className="font-mono">+{formatMoney(totals.shippingAmount, invoice.currencySymbol, invoice.currency)}</span>
            </div>
          )}

          <div className="border-t-2 border-zinc-900 pt-2 flex justify-between font-bold text-sm text-zinc-900">
            <span>Total</span>
            <span className="font-mono">{formatMoney(totals.grandTotal, invoice.currencySymbol, invoice.currency)}</span>
          </div>
        </div>
      </div>

      {/* Payment Instructions & QR */}
      {(invoice.paymentDetails.bankName || invoice.paymentDetails.accountNumber || (invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr)) && (
        <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="text-zinc-600 text-xs space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
              Payment Information {invoice.paymentDetails.paymentMethod ? `— ${invoice.paymentDetails.paymentMethod}` : ''}
            </span>
            {invoice.paymentDetails.bankName && <div>Bank: <strong>{invoice.paymentDetails.bankName}</strong></div>}
            {invoice.paymentDetails.accountName && <div>Beneficiary: <strong>{invoice.paymentDetails.accountName}</strong></div>}
            {invoice.paymentDetails.accountNumber && <div>Account: <span className="font-mono">{invoice.paymentDetails.accountNumber}</span></div>}
            {invoice.paymentDetails.swiftIban && <div>IBAN / SWIFT: <span className="font-mono">{invoice.paymentDetails.swiftIban}</span></div>}
            {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && !invoice.paymentDetails.bankName && (
              <div className="text-[11px] text-zinc-500">Scan the QR code to process payment directly via UPI, PayPal, or Crypto.</div>
            )}
          </div>

          {invoice.paymentDetails.qrCodeEnabled && invoice.paymentDetails.paymentLinkOrQr && (
            <div className="shrink-0">
              <QRCodeDisplay value={invoice.paymentDetails.paymentLinkOrQr} size={70} />
            </div>
          )}
        </div>
      )}

      {/* Signatory */}
      {invoice.signatoryName && (
        <div className="mt-8 text-right">
          <div className="font-bold text-zinc-900">{invoice.signatoryName}</div>
          <div className="text-[10px] text-zinc-500">{invoice.signatoryTitle}</div>
        </div>
      )}
    </div>
  );
};
