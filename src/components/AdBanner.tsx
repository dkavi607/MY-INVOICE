import React, { useState } from 'react';
import { Sparkles, X, Info, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  slot: 'top-banner' | 'sidebar' | 'in-content' | 'bottom-banner' | 'mobile-anchor';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  if (slot === 'top-banner') {
    return (
      <div className={`ad-container w-full bg-gray-100 border-b border-gray-200 py-2 px-4 flex flex-col items-center justify-center ${className}`}>
        <div className="flex items-center justify-between w-full max-w-4xl mb-1 text-[10px] text-gray-600 uppercase tracking-widest font-mono">
          <span>Advertisement • Google AdSense 728x90</span>
          <span className="flex items-center gap-1 hover:text-gray-600 cursor-pointer">
            <Info className="w-3 h-3" /> AdChoices
          </span>
        </div>
        <div className="w-full max-w-[728px] h-[90px] bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-dashed border-blue-200 rounded-lg flex items-center justify-between px-6 py-2 shadow-xs hover:border-blue-400 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm md:text-base flex items-center gap-2">
                Business Cloud Accounting Suite
                <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">Sponsored</span>
              </div>
              <p className="text-xs text-gray-500 hidden sm:block">Automate payroll, track expenses, and accept multi-currency payments with zero transaction fees.</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition-all shadow-xs flex items-center gap-1 shrink-0">
            Start Free <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (slot === 'sidebar') {
    return (
      <div className={`ad-container w-full bg-white rounded-xl border border-gray-200 p-4 shadow-xs mt-6 ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-2">
          <span>Advertisement • 300x250</span>
          <span className="flex items-center gap-1 text-gray-600">
            <Info className="w-3 h-3" /> Ads
          </span>
        </div>
        <div className="w-full min-h-[250px] bg-gradient-to-b from-gray-50 to-blue-50/40 border border-dashed border-blue-200 rounded-lg p-5 flex flex-col justify-between text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-100 rounded-full blur-xl opacity-60"></div>
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3">
              Special Small Business Offer
            </div>
            <h4 className="font-bold text-gray-900 text-base leading-snug mb-2">
              Accept Credit Cards at 0% Merchant Fees
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Integrate instant one-click payment checkout links right onto your PDF invoices today.
            </p>
          </div>
          <div className="pt-4">
            <button className="w-full bg-gray-900 hover:bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5">
              Claim $50 Free Credit <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </button>
            <div className="text-[10px] text-gray-600 mt-2 font-mono">No contract required • Cancel anytime</div>
          </div>
        </div>
      </div>
    );
  }

  if (slot === 'in-content') {
    return (
      <div className={`ad-container w-full my-6 p-3 bg-gradient-to-r from-gray-50 via-slate-50 to-gray-50 border border-dashed border-gray-300 rounded-xl ${className}`}>
        <div className="flex items-center justify-between text-[9px] text-gray-600 uppercase tracking-wider font-mono mb-1.5">
          <span>Sponsored Recommendation</span>
          <span>Google AdSense</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
              ⚡
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-900">Need High-Speed Business Banking?</div>
              <div className="text-[11px] text-gray-500">Open an FDIC-insured business account in 5 minutes with zero fees.</div>
            </div>
          </div>
          <button className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold px-3 py-1.5 rounded-md transition-colors shrink-0 whitespace-nowrap">
            Learn More →
          </button>
        </div>
      </div>
    );
  }

  if (slot === 'bottom-banner') {
    return (
      <div className={`ad-container w-full max-w-6xl mx-auto my-12 px-4 ${className}`}>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-3">
            <span>Advertisement • Responsive Unit</span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" /> AdChoices
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                💼
              </div>
              <div>
                <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mb-1">
                  Enterprise Partner
                </span>
                <h3 className="text-lg font-bold text-gray-900">Legal Contracts & Automated E-Signatures</h3>
                <p className="text-sm text-gray-600 max-w-xl mt-1">
                  Send legally binding contracts alongside your invoices. Free 30-day trial for freelancers and growing agencies.
                </p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all shrink-0">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (slot === 'mobile-anchor') {
    return (
      <div className="ad-container lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-1.5 px-3 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Ad</span>
          <span className="text-xs font-medium text-gray-800 truncate">
            QuickBooks Online: 50% Off First 3 Months
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="text-xs bg-blue-600 text-white font-semibold px-2.5 py-1 rounded-md">
            View
          </button>
          <button
            onClick={() => setClosed(true)}
            className="text-gray-600 hover:text-gray-600 p-1"
            title="Dismiss ad"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
