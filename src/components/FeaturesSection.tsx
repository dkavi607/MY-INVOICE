import React from 'react';
import {
  Sparkles,
  Shield,
  Download,
  Calculator,
  Smartphone,
  Globe2,
  Palette,
  Lock,
  FileCheck,
  Zap,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Free Forever',
      desc: 'No trial periods, no watermarks, and no surprise charges. Create unlimited invoices whenever you need.',
      color: 'text-amber-500 bg-amber-50',
    },
    {
      icon: Lock,
      title: 'No Registration',
      desc: 'Start typing and export immediately. No usernames, passwords, or credit cards required.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Download,
      title: 'Instant PDF Download',
      desc: 'One-click high-resolution PDF generation optimized for crisp vector print and email attachments.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Palette,
      title: 'Professional Templates',
      desc: 'Switch between Modern Blue, Minimalist Slate, Corporate Classic, and Tech Emerald styles on the fly.',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: Calculator,
      title: 'Automatic Calculations',
      desc: 'Live recalculation of line item totals, percentage/fixed discounts, taxes, and amount in words.',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      desc: 'Designed mobile-first so you can issue, customize, and send invoices from your phone or tablet on the go.',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      desc: '100% client-side execution. Your customer data and financial information never leave your local browser.',
      color: 'text-teal-600 bg-teal-50',
    },
    {
      icon: Globe2,
      title: 'Multiple Currencies',
      desc: 'Supports USD, EUR, GBP, INR, CAD, AUD, JPY, and over 20 global currency symbols with formatting.',
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <section id="features-section" className="py-16 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Powerful Features
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 font-display mt-3">
            Everything You Need to Bill Clients Professionally
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Designed specifically for freelancers, consultants, contractors, small business owners, and creative agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl border border-gray-200/80 bg-gray-50/40 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2 font-display">{feat.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
