import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Zap, Download } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToTool = () => {
    const el = document.getElementById('tool-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-blue-50/70 via-white to-gray-50/50 border-b border-gray-200/60">
      {/* Subtle background decoration */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            <span>Fast, Free & 100% Client-Side Private</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 font-display tracking-tight leading-[1.15]">
            Create Professional Invoices in <span className="text-blue-600">Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Free, fast, and easy-to-use invoice generator with instant PDF download. No account required, auto-calculating taxes, discount options, and print-ready formats.
          </p>

          {/* Primary CTA & Quick Action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={scrollToTool}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Generate Invoice Now</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> 10,000+ Generated
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-blue-600">
                <ShieldCheck className="w-4 h-4" /> 100% Client-Side
              </span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-gray-200/60 grid grid-cols-3 gap-2 max-w-lg mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="font-bold text-gray-900 text-xs sm:text-sm">100% Free</div>
              <div className="text-[11px] text-gray-500">No hidden fees</div>
            </div>
            <div className="flex flex-col items-center border-x border-gray-200">
              <div className="font-bold text-gray-900 text-xs sm:text-sm">No Signup</div>
              <div className="text-[11px] text-gray-500">Instant access</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-gray-900 text-xs sm:text-sm">Instant PDF</div>
              <div className="text-[11px] text-gray-500">High-res download</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
