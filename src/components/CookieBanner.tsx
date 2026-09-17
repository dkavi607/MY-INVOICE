import React, { useState, useEffect } from 'react';
import { Cookie, Check, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('my_invoice_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('my_invoice_cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('my_invoice_cookie_consent', 'essential_only');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 bg-white rounded-2xl p-5 shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 font-display">Cookie & Privacy Notice</h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            We use essential local storage cookies to remember your invoice preferences, auto-save drafts, and display non-intrusive AdSense advertisements. No financial data is ever sent to our servers.
          </p>
          <div className="mt-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Accept All
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
