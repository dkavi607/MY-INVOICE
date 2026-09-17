import React from 'react';
import { X, Shield, FileText, DollarSign, Cloud } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'adsense' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              {type === 'privacy' && <Shield className="w-5 h-5" />}
              {type === 'terms' && <FileText className="w-5 h-5" />}
              {type === 'adsense' && <DollarSign className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 font-display">
                {type === 'privacy' && 'Privacy Policy & Data Security'}
                {type === 'terms' && 'Terms of Service'}
                {type === 'adsense' && 'Google AdSense & Monetization Setup Guide'}
              </h3>
              <p className="text-xs text-gray-500">
                {type === 'privacy' && 'Last updated: 2026 • 100% Client-side protection'}
                {type === 'terms' && 'Standard terms for MY INVOICE generator'}
                {type === 'adsense' && 'Integration reference and AdSense policy checklist'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-gray-600 space-y-4 leading-relaxed">
          {type === 'privacy' && (
            <>
              <h4 className="font-bold text-sm text-gray-900">1. Client-Side Only Architecture</h4>
              <p>
                MY INVOICE is built with a strict client-side architecture. All information entered—including company details, client names, invoice items, amounts, bank accounts, and uploaded logos—remains exclusively in your local web browser session. We do not transmit or store your invoices on any central server.
              </p>

              <h4 className="font-bold text-sm text-gray-900">2. Local Storage & Drafts</h4>
              <p>
                When you click "Save Draft", data is stored in your browser's local HTML5 storage (`localStorage`). You have complete control to delete drafts individually or clear your entire invoice history at any time.
              </p>

              <h4 className="font-bold text-sm text-gray-900">3. Google AdSense & Third-Party Advertising</h4>
              <p>
                We use Google AdSense to serve advertisements when you visit our website. Google and its partner advertising networks may use cookies to serve ads based on your prior visits to this or other websites. You may opt out of personalized advertising by visiting Google Ads Settings.
              </p>

              <h4 className="font-bold text-sm text-gray-900">4. Data Deletion</h4>
              <p>
                Closing your browser tab or clicking "Reset Form" instantly purges unsaved data from memory. No residual financial traces remain.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold text-sm text-gray-900">1. Acceptance of Terms</h4>
              <p>
                By accessing and using the MY INVOICE web application, you agree to comply with and be bound by these Terms of Service.
              </p>

              <h4 className="font-bold text-sm text-gray-900">2. Use License</h4>
              <p>
                MY INVOICE is provided free of charge for both personal and commercial billing. You are free to create, print, export, and distribute invoices created with this tool to your clients worldwide.
              </p>

              <h4 className="font-bold text-sm text-gray-900">3. Disclaimer of Warranty</h4>
              <p>
                While our software implements standard mathematical precision and ISO-compliant date formatting, users are solely responsible for ensuring the tax compliance, legal validity, and accuracy of the invoices they issue within their jurisdiction.
              </p>
            </>
          )}

          {type === 'adsense' && (
            <>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-blue-600" /> Google AdSense Production Activation
                </h4>
                <p>
                  To connect your approved Google AdSense publisher account in production, follow the standard 3-step checklist:
                </p>
              </div>

              <h4 className="font-bold text-sm text-gray-900">Step 1: Insert Your AdSense Publisher Script in `index.html`</h4>
              <div className="bg-gray-900 text-emerald-400 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
                {`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>`}
              </div>

              <h4 className="font-bold text-sm text-gray-900">Step 2: Ad Units Configured in this Application</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Top Leaderboard (728x90):</strong> Situated above navigation with safe spacing.</li>
                <li><strong>Sidebar Medium Rectangle (300x250):</strong> Placed alongside invoice preview.</li>
                <li><strong>In-Content Native Banner:</strong> Placed between Form step sections.</li>
                <li><strong>Bottom Responsive Banner:</strong> Situated before the website footer.</li>
                <li><strong>Mobile Anchor Ad:</strong> Fixed bottom non-intrusive container on mobile devices.</li>
              </ul>

              <h4 className="font-bold text-sm text-gray-900">Step 3: AdSense Policy Compliance Checklist</h4>
              <p className="text-emerald-700 font-semibold">
                ✓ 30%+ high content-to-ad ratio maintained<br />
                ✓ Clear separation between generator tools and advertisement boxes<br />
                ✓ AdChoices and sponsored labels clearly marked<br />
                ✓ No intrusive popups or deceptive click triggers
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
