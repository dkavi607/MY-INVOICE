import React from 'react';
import { InvoiceData, PaymentDetails } from '../../types';
import { CreditCard, QrCode, HelpCircle, Sparkles } from 'lucide-react';
import { QRCodeDisplay } from '../Preview/QRCodeDisplay';

interface AdditionalOptionsCardProps {
  invoice: InvoiceData;
  onChange: (updated: Partial<InvoiceData>) => void;
}

export const AdditionalOptionsCard: React.FC<AdditionalOptionsCardProps> = ({
  invoice,
  onChange,
}) => {
  const handlePaymentChange = (field: keyof PaymentDetails, value: any) => {
    onChange({
      paymentDetails: {
        ...invoice.paymentDetails,
        [field]: value,
      },
    });
  };

  const setQrPreset = (type: 'upi' | 'paypal' | 'bitcoin' | 'url') => {
    let presetValue = '';
    if (type === 'upi') {
      presetValue = 'upi://pay?pa=yourname@bank&pn=' + encodeURIComponent(invoice.company.name || 'Merchant');
    } else if (type === 'paypal') {
      presetValue = 'https://paypal.me/yourusername';
    } else if (type === 'bitcoin') {
      presetValue = 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    } else if (type === 'url') {
      presetValue = 'https://buy.stripe.com/example';
    }

    onChange({
      paymentDetails: {
        ...invoice.paymentDetails,
        qrCodeEnabled: true,
        paymentLinkOrQr: presetValue,
      },
    });
  };

  return (
    <div id="additional-options-card" className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-blue-200 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Payment Methods, QR Code & Notes</h2>
            <p className="text-xs text-gray-500">Bank transfer info, instant QR payment (UPI, PayPal, Bitcoin), and terms</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Step 4
        </span>
      </div>

      <div className="space-y-5">
        {/* Payment QR Code Generator Section */}
        <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-blue-50/30 p-4.5 rounded-xl border border-blue-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                <QrCode className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Instant Payment QR Code (UPI, PayPal, Bitcoin, Crypto, URL)
              </h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
              <input
                id="enable-qr-checkbox"
                type="checkbox"
                checked={invoice.paymentDetails.qrCodeEnabled}
                onChange={(e) => handlePaymentChange('qrCodeEnabled', e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
              />
              <span className="text-xs font-bold text-blue-700">
                {invoice.paymentDetails.qrCodeEnabled ? 'QR Code Active' : 'Enable QR Code'}
              </span>
            </label>
          </div>

          <p className="text-xs text-gray-600 mb-3">
            Generate a scan-to-pay QR code on the invoice for effortless payments via UPI, PayPal, Bitcoin, crypto wallet address, or payment link.
          </p>

          {invoice.paymentDetails.qrCodeEnabled && (
            <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-3">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                  <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    <span>Payment Address / Link / URI</span>
                    <span title="Enter a UPI ID (user@upi or upi://pay?pa=...), PayPal.me link, Bitcoin address (bitcoin:addr), or Stripe/payment gateway URL">
                      <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </label>
                  
                  {/* Quick Format Presets */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Quick Template:
                    </span>
                    <button
                      type="button"
                      onClick={() => setQrPreset('upi')}
                      className="text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors"
                    >
                      UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrPreset('paypal')}
                      className="text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors"
                    >
                      PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrPreset('bitcoin')}
                      className="text-[10px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors"
                    >
                      Bitcoin
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrPreset('url')}
                      className="text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors"
                    >
                      URL
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    id="payment-qr-input"
                    type="text"
                    value={invoice.paymentDetails.paymentLinkOrQr}
                    onChange={(e) => handlePaymentChange('paymentLinkOrQr', e.target.value)}
                    placeholder="e.g. yourname@upi, https://paypal.me/yourname, or bitcoin:1A1zP1eP..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-mono"
                  />
                  {invoice.paymentDetails.paymentLinkOrQr && (
                    <div className="flex items-center gap-2 self-center bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
                      <QRCodeDisplay value={invoice.paymentDetails.paymentLinkOrQr} size={48} />
                      <span className="text-[10px] font-medium text-gray-500 max-w-[90px] leading-tight">
                        Live Preview on Invoice
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 bg-gray-50/80 p-2 rounded-lg">
                <span className="font-semibold text-gray-700">Supported formats:</span>
                <span>• <strong>UPI:</strong> username@okhdfcbank or upi://pay?pa=...</span>
                <span>• <strong>PayPal:</strong> https://paypal.me/username</span>
                <span>• <strong>Bitcoin:</strong> bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</span>
              </div>
            </div>
          )}
        </div>

        {/* Bank Details */}
        <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200/80">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-gray-600" />
            Direct Bank Wire / ACH Transfer Details (Optional)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Bank / Institution Name</label>
              <input
                type="text"
                value={invoice.paymentDetails.bankName}
                onChange={(e) => handlePaymentChange('bankName', e.target.value)}
                placeholder="e.g. JPMorgan Chase or Silicon Valley Bank"
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={invoice.paymentDetails.accountName}
                onChange={(e) => handlePaymentChange('accountName', e.target.value)}
                placeholder="e.g. Acme Innovations LLC"
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Account / IBAN Number</label>
              <input
                type="text"
                value={invoice.paymentDetails.accountNumber}
                onChange={(e) => handlePaymentChange('accountNumber', e.target.value)}
                placeholder="e.g. 1234567890 or GB29NWBK..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Routing Number / Sort Code</label>
              <input
                type="text"
                value={invoice.paymentDetails.routingNumber}
                onChange={(e) => handlePaymentChange('routingNumber', e.target.value)}
                placeholder="e.g. 021000021 or 60-16-13"
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">SWIFT / BIC Code</label>
              <input
                type="text"
                value={invoice.paymentDetails.swiftIban}
                onChange={(e) => handlePaymentChange('swiftIban', e.target.value)}
                placeholder="e.g. CHASUS33XXX"
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Method Label</label>
              <input
                type="text"
                value={invoice.paymentDetails.paymentMethod || ''}
                onChange={(e) => handlePaymentChange('paymentMethod', e.target.value)}
                placeholder="e.g. Wire Transfer / ACH"
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notes & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Customer Notes / Instructions
            </label>
            <textarea
              rows={3}
              value={invoice.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="e.g. Thank you for your business. Please reference invoice number when initiating wire transfer."
              className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Terms & Conditions
            </label>
            <textarea
              rows={3}
              value={invoice.terms}
              onChange={(e) => onChange({ terms: e.target.value })}
              placeholder="e.g. Net 15 days. A 1.5% interest penalty per month applies to overdue balances."
              className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer message & Authorized signatory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Signatory / Authorized By
            </label>
            <input
              type="text"
              value={invoice.signatoryName || ''}
              onChange={(e) => onChange({ signatoryName: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Signatory Designation
            </label>
            <input
              type="text"
              value={invoice.signatoryTitle || ''}
              onChange={(e) => onChange({ signatoryTitle: e.target.value })}
              placeholder="e.g. Managing Partner"
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Bottom Footer Slogan
            </label>
            <input
              type="text"
              value={invoice.footerMessage}
              onChange={(e) => onChange({ footerMessage: e.target.value })}
              placeholder="Thank you for your business!"
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
