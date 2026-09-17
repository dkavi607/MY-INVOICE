import React from 'react';
import { ClientInfo, CompanyInfo } from '../../types';
import { UserCheck, Mail, Phone, MapPin, Copy, Hash } from 'lucide-react';

interface ClientCardProps {
  client: ClientInfo;
  company: CompanyInfo;
  onChange: (updated: Partial<ClientInfo>) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, company, onChange }) => {
  const handleCopyFromCompany = (checked: boolean) => {
    if (checked) {
      onChange({
        name: company.name ? `${company.name} (Client Unit)` : 'Client Entity',
        email: company.email,
        phone: company.phone,
        address: company.address,
        cityStateZip: company.cityStateZip,
        taxId: company.taxId,
      });
    }
  };

  return (
    <div id="client-info-card" className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:border-blue-200 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 mb-5 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Bill To (Client Information)</h2>
            <p className="text-xs text-gray-500">The recipient entity or individual being invoiced</p>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => handleCopyFromCompany(true)}
          className="text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Copy className="w-3.5 h-3.5" />
          Quick Copy from Company
        </button>
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Client / Business Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="client-name-input"
            type="text"
            value={client.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. Global Horizon Enterprises or Sarah Jenkins"
            className="w-full text-sm font-medium px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              Client Email Address
            </label>
            <input
              id="client-email-input"
              type="email"
              value={client.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="accounts@clientdomain.com"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              Client Phone
            </label>
            <input
              id="client-phone-input"
              type="tel"
              value={client.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 (555) 987-6543"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            Client Street Address
          </label>
          <input
            id="client-address-input"
            type="text"
            value={client.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="456 Market Street, Suite 900"
            className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              City, State, ZIP / Country
            </label>
            <input
              id="client-city-input"
              type="text"
              value={client.cityStateZip}
              onChange={(e) => onChange({ cityStateZip: e.target.value })}
              placeholder="San Francisco, CA 94105, USA"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-gray-400" />
              Client Tax / VAT Number (Optional)
            </label>
            <input
              id="client-taxid-input"
              type="text"
              value={client.taxId || ''}
              onChange={(e) => onChange({ taxId: e.target.value })}
              placeholder="e.g. GB987654321"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
