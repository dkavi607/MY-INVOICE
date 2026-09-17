import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is MY INVOICE really 100% free to use?',
      a: 'Yes, absolutely! MY INVOICE is completely free with no limits on the number of invoices you can create, download, or print. There are no subscriptions, paywalls, or hidden fees.',
    },
    {
      q: 'Do I need to create an account or sign up?',
      a: 'No account is needed. You can immediately jump in, enter your billing details, add line items, customize templates, and generate a downloadable PDF in under 60 seconds.',
    },
    {
      q: 'Is my business and financial data secure?',
      a: 'Yes, 100%. All processing and calculations happen directly on your device (client-side in your browser). We never store, transmit, or sell your customer lists, invoices, or financial data on external servers.',
    },
    {
      q: 'Can I add my own company logo and payment QR code?',
      a: 'Yes! You can upload PNG, JPG, or SVG logos with drag-and-drop support. You can also enable a payment QR code that links directly to your PayPal, Stripe, Bank UPI, or custom checkout page.',
    },
    {
      q: 'How does the PDF download and print feature work?',
      a: 'We use high-resolution vector rendering algorithms to generate standard A4/Letter size documents. The output is print-ready and formatted to look crisp across all standard PDF readers, email inboxes, and printers.',
    },
    {
      q: 'Does it support multiple currencies and international taxes?',
      a: 'Yes! We support over 20 major world currencies (USD, EUR, GBP, INR, CAD, AUD, JPY, CHF, etc.) along with flexible tax labels (Sales Tax, VAT, GST) and customizable percentage or fixed discounts.',
    },
    {
      q: 'Can I save my invoice drafts and access them later?',
      a: 'Yes. You can click "Save Draft" to store your invoice in your browser local storage. When you return, you can view your draft history, duplicate existing invoices, or edit them anytime.',
    },
  ];

  return (
    <section id="faq-section" className="py-16 bg-white border-b border-gray-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 font-display mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Everything you need to know about our invoice maker and PDF generation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors hover:border-blue-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-display">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
