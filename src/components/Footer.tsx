import React from 'react';
import { FileText, Heart, Shield, HelpCircle, Code, DollarSign } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'adsense') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 text-xs pt-12 pb-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                MY <span className="text-blue-500">INVOICE</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              The free, professional invoice generator for modern freelancers, businesses, and contractors worldwide.
            </p>
            <div className="text-[11px] text-gray-400">
              © {new Date().getFullYear()} MY INVOICE. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-display">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Invoice Maker
                </button>
              </li>
              <li>
                <a href="#features-section" className="hover:text-white transition-colors">
                  Key Features
                </a>
              </li>
              <li>
                <a href="#how-it-works-section" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-display">Legal & Trust</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('adsense')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-blue-400"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  AdSense Integration Guide
                </button>
              </li>
            </ul>
          </div>

          {/* AdSense Monetization Info */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-display">AdSense Compliance</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Built in accordance with Google AdSense webmaster guidelines. High quality, non-intrusive ad placement standard.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AdSense Ready • High Speed
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>
            Designed with precision for seamless client invoicing and rapid PDF downloads.
          </p>
          <div className="flex items-center gap-1">
            <span>Built with React 19, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
