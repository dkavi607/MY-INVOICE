import React from 'react';
import { InvoiceData } from '../../types';
import { CURRENCIES } from '../../utils/currencies';
import { generateInvoiceNumber, calculateDueDate } from '../../utils/formatters';
import { FileText, RefreshCw, Calendar, DollarSign, Percent, Truck } from 'lucide-react';

interface InvoiceDetailsCardProps {
  invoice: InvoiceData;
  onChange: (updated: Partial<InvoiceData>) => void;
}

export const InvoiceDetailsCard: React.FC<InvoiceDetailsCardProps> = ({ invoice, onChange }) => {
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = CURRENCIES.find((c) => c.code === e.target.value);
    if (selected) {
      onChange({
        currency: selected.code,
        currencySymbol: selected.symbol,
      });
    }
  };

  const handleQuickDueDate = (days: number) => {
    const newDueDate = calculateDueDate(invoice.invoiceDate, days);
    onChange({ dueDate: newDueDate });
  };

  return (
    <div id="invoice-details-card" className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-blue-200 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Invoice Details & Terms</h2>
            <p className="text-xs text-gray-500">Dates, currency, tax rates, and discount settings</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Step 2
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Invoice Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
            <span>Invoice Number <span className="text-rose-500">*</span></span>
            <button
              type="button"
              onClick={() => onChange({ invoiceNumber: generateInvoiceNumber() })}
              className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
              title="Generate new invoice number"
            >
              <RefreshCw className="w-3 h-3" /> Auto
            </button>
          </label>
          <input
            id="invoice-number-input"
            type="text"
            value={invoice.invoiceNumber}
            onChange={(e) => onChange({ invoiceNumber: e.target.value })}
            className="w-full text-sm font-mono font-medium px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
            required
          />
        </div>

        {/* Invoice Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            Invoice Date
          </label>
          <input
            id="invoice-date-input"
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) => {
              const newDate = e.target.value;
              onChange({ invoiceDate: newDate });
            }}
            className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        {/* Due Date & Quick Selectors */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            Due Date
          </label>
          <input
            id="invoice-duedate-input"
            type="date"
            value={invoice.dueDate}
            onChange={(e) => onChange({ dueDate: e.target.value })}
            className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
          />
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[10px] text-gray-400 font-medium">Quick:</span>
            {[
              { label: 'Today', days: 0 },
              { label: '+7d', days: 7 },
              { label: '+15d', days: 15 },
              { label: '+30d', days: 30 },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleQuickDueDate(opt.days)}
                className="text-[10px] font-semibold text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 px-2 py-0.5 rounded transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selector */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-gray-400" />
              Currency
            </label>
            <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
              {invoice.currency} ({invoice.currencySymbol.trim()})
            </span>
          </div>
          <select
            id="invoice-currency-select"
            value={invoice.currency}
            onChange={handleCurrencyChange}
            className="w-full text-sm font-medium px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all bg-white cursor-pointer"
          >
            {CURRENCIES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name}
              </option>
            ))}
          </select>

          {/* Popular Currencies Quick Chips */}
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            <span className="text-[10px] text-gray-400 font-medium">Quick:</span>
            {[
              { code: 'LKR', symbol: 'Rs. ', label: '🇱🇰 LKR (Rs.)' },
              { code: 'USD', symbol: '$', label: '🇺🇸 USD ($)' },
              { code: 'EUR', symbol: '€', label: '🇪🇺 EUR (€)' },
              { code: 'GBP', symbol: '£', label: '🇬🇧 GBP (£)' },
              { code: 'INR', symbol: '₹', label: '🇮🇳 INR (₹)' },
            ].map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => onChange({ currency: c.code, currencySymbol: c.symbol })}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded transition-all ${
                  invoice.currency === c.code
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tax Configuration */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-gray-400" />
              Tax / VAT Rate
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={invoice.taxEnabled}
                onChange={(e) => onChange({ taxEnabled: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span className="text-[11px] font-medium text-gray-500">Enable</span>
            </label>
          </div>
          {invoice.taxEnabled ? (
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={invoice.taxRate}
                onChange={(e) => onChange({ taxRate: parseFloat(e.target.value) || 0 })}
                placeholder="Rate %"
                className="w-1/2 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none font-mono"
              />
              <input
                type="text"
                value={invoice.taxLabel}
                onChange={(e) => onChange({ taxLabel: e.target.value })}
                placeholder="Label (e.g. VAT, GST)"
                className="w-1/2 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
              />
            </div>
          ) : (
            <div className="text-xs text-gray-400 bg-gray-50 px-3.5 py-2 rounded-xl border border-dashed border-gray-200">
              Tax is currently disabled
            </div>
          )}
        </div>

        {/* Discount Configuration */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-700">
              Discount
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={invoice.discountEnabled}
                onChange={(e) => onChange({ discountEnabled: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span className="text-[11px] font-medium text-gray-500">Enable</span>
            </label>
          </div>
          {invoice.discountEnabled ? (
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="any"
                value={invoice.discountValue}
                onChange={(e) => onChange({ discountValue: parseFloat(e.target.value) || 0 })}
                placeholder="0"
                className="w-2/3 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none font-mono"
              />
              <select
                value={invoice.discountType}
                onChange={(e) => onChange({ discountType: e.target.value as 'percentage' | 'fixed' })}
                className="w-1/3 text-xs font-semibold px-2 py-2 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white"
              >
                <option value="percentage">%</option>
                <option value="fixed">{invoice.currencySymbol}</option>
              </select>
            </div>
          ) : (
            <div className="text-xs text-gray-400 bg-gray-50 px-3.5 py-2 rounded-xl border border-dashed border-gray-200">
              No discount applied
            </div>
          )}
        </div>

        {/* Shipping / Extra fees */}
        <div className="sm:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">Shipping / Handling / Additional Fee</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={invoice.shippingEnabled}
                  onChange={(e) => onChange({ shippingEnabled: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span className="text-xs font-medium text-gray-600">Add Fee</span>
              </label>
              {invoice.shippingEnabled && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-500">{invoice.currencySymbol}</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={invoice.shippingFee}
                    onChange={(e) => onChange({ shippingFee: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-28 text-sm px-3 py-1.5 rounded-lg border border-gray-200 bg-white focus:border-blue-500 outline-none font-mono"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
