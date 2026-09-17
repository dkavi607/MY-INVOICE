import React, { useRef } from 'react';
import { CompanyInfo } from '../../types';
import { Building2, Upload, Trash2, Globe, Mail, Phone, MapPin, Hash, Image as ImageIcon } from 'lucide-react';

interface CompanyCardProps {
  company: CompanyInfo;
  onChange: (updated: Partial<CompanyInfo>) => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ logoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ logoUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id="company-info-card" className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-blue-200 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Your Company Information</h2>
            <p className="text-xs text-gray-500">The sender details that will appear at the top of the invoice</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
          Step 1
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Logo Upload Dropzone */}
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
            Company Logo (Optional)
          </label>
          
          {company.logoUrl ? (
            <div className="relative group rounded-xl border border-gray-200 p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px]">
              <img
                src={company.logoUrl}
                alt="Company Logo Preview"
                className="max-h-20 max-w-full object-contain rounded"
              />
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 bg-white border border-gray-200 rounded-md shadow-2xs hover:border-blue-300"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ logoUrl: '' })}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 bg-white border border-gray-200 rounded-md shadow-2xs hover:border-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 text-gray-400 group-hover:text-blue-600 flex items-center justify-center mb-2 transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-gray-700 group-hover:text-blue-600">Click or Drag Logo</p>
              <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, SVG up to 2MB</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Company Details Fields */}
        <div className="md:col-span-8 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Company / Freelancer Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="company-name-input"
                type="text"
                value={company.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder="e.g. Acme Studio LLC or John Doe"
                className="w-full text-sm font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="company-email-input"
                type="email"
                value={company.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="billing@yourdomain.com"
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                Phone Number
              </label>
              <input
                id="company-phone-input"
                type="tel"
                value={company.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              Street Address
            </label>
            <input
              id="company-address-input"
              type="text"
              value={company.address}
              onChange={(e) => onChange({ address: e.target.value })}
              placeholder="123 Business Way, Suite 100"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                City, State, ZIP / Country
              </label>
              <input
                id="company-city-input"
                type="text"
                value={company.cityStateZip}
                onChange={(e) => onChange({ cityStateZip: e.target.value })}
                placeholder="New York, NY 10001, USA"
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                Tax ID / VAT / GST Number
              </label>
              <input
                id="company-taxid-input"
                type="text"
                value={company.taxId}
                onChange={(e) => onChange({ taxId: e.target.value })}
                placeholder="e.g. EU123456789 or EIN"
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
