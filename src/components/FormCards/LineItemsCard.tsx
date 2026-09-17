import React from 'react';
import { LineItem } from '../../types';
import { ShoppingCart, Plus, Trash2, Sparkles, Layers } from 'lucide-react';

interface LineItemsCardProps {
  items: LineItem[];
  currencySymbol: string;
  onChange: (items: LineItem[]) => void;
}

export const LineItemsCard: React.FC<LineItemsCardProps> = ({
  items,
  currencySymbol,
  onChange,
}) => {
  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange(updated);
  };

  const handleAddItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    onChange([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) {
      // Keep at least one blank item
      onChange([
        {
          id: `item-${Date.now()}`,
          description: '',
          quantity: 1,
          unitPrice: 0,
        },
      ]);
      return;
    }
    onChange(items.filter((item) => item.id !== id));
  };

  const addPreset = (desc: string, qty: number, price: number) => {
    const newItem: LineItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      description: desc,
      quantity: qty,
      unitPrice: price,
    };
    // If the only item is blank, replace it
    if (items.length === 1 && !items[0].description && items[0].unitPrice === 0) {
      onChange([newItem]);
    } else {
      onChange([...items, newItem]);
    }
  };

  return (
    <div id="line-items-card" className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-blue-200 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 mb-5 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Line Items & Services</h2>
            <p className="text-xs text-gray-500">Add products, billable hours, deliverables, or services</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full self-start sm:self-auto">
          Step 3
        </span>
      </div>

      {/* Preset Suggestions */}
      <div className="mb-4 bg-gray-50/80 p-3 rounded-xl border border-gray-100 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Quick Add Presets:
        </span>
        {[
          { label: '+ Design Sprint', desc: 'UI/UX Design & Prototyping Phase', qty: 1, price: 1200 },
          { label: '+ Dev Hours (10h)', desc: 'Full-Stack Software Engineering (10 hrs)', qty: 10, price: 85 },
          { label: '+ Monthly Retainer', desc: 'Monthly Maintenance & Support Retainer', qty: 1, price: 950 },
          { label: '+ SEO Audit', desc: 'Technical SEO & Performance Audit', qty: 1, price: 500 },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => addPreset(preset.desc, preset.qty, preset.price)}
            className="text-xs bg-white text-gray-700 hover:text-blue-700 hover:border-blue-300 font-medium px-2.5 py-1 rounded-lg border border-gray-200 transition-colors shadow-2xs"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Dynamic Item Table */}
      <div className="space-y-3">
        {/* Table Header on Desktop */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-3 py-2 bg-gray-100/70 rounded-xl text-xs font-bold text-gray-600 uppercase tracking-wider">
          <div className="col-span-6">Item Description</div>
          <div className="col-span-2 text-right">Qty / Hrs</div>
          <div className="col-span-2 text-right">Unit Price</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>

        {items.map((item, index) => {
          const qty = Number(item.quantity) || 0;
          const price = Number(item.unitPrice) || 0;
          const rowTotal = qty * price;

          return (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-xl border border-gray-200/90 bg-white hover:border-blue-200 transition-all shadow-2xs group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Description */}
                <div className="md:col-span-6">
                  <div className="flex items-center justify-between md:hidden mb-1">
                    <span className="text-xs font-bold text-gray-600">Item #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-400 hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Item or service description..."
                    className="w-full text-sm font-medium px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                {/* Quantity */}
                <div className="grid grid-cols-2 gap-2 md:contents">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase md:hidden block mb-0.5">Quantity</label>
                    <input
                      type="number"
                      min="0.01"
                      step="any"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      placeholder="1"
                      className="w-full text-sm font-mono text-left md:text-right px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase md:hidden block mb-0.5">Unit Price</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-full text-sm font-mono text-left md:text-right px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row Total & Actions */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 md:hidden">Amount:</span>
                  <div className="text-sm font-bold font-mono text-gray-900">
                    {currencySymbol}{rowTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="hidden md:flex text-gray-300 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Button */}
      <div className="mt-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleAddItem}
          className="w-full sm:w-auto bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-blue-200 shadow-2xs hover:shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Add Line Item
        </button>

        <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-gray-400" />
          <span>{items.length} {items.length === 1 ? 'item' : 'items'} in invoice</span>
        </div>
      </div>
    </div>
  );
};
