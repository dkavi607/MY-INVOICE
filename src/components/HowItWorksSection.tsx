import React from 'react';
import { Edit3, Sliders, Send, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Enter Your Details',
      desc: 'Fill in your company name, upload your custom logo, and input your client contact information.',
      icon: Edit3,
      badge: 'Step 1',
    },
    {
      num: '02',
      title: 'Add Items & Customize',
      desc: 'List your products or billable hours, configure taxes and discounts, and choose your favorite template.',
      icon: Sliders,
      badge: 'Step 2',
    },
    {
      num: '03',
      title: 'Download & Send',
      desc: 'Preview the real-time invoice, download the crystal-clear PDF, print directly, or email to your customer.',
      icon: Send,
      badge: 'Step 3',
    },
  ];

  const scrollToTool = () => {
    const el = document.getElementById('tool-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works-section" className="py-16 bg-gray-50/70 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-950 font-display mt-3">
            How It Works in 60 Seconds
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Streamlined workflow designed to get you paid faster without bloated software setups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-xs relative flex flex-col justify-between hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-gray-300">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 font-display mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-blue-600">
                  <span>{step.badge}</span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-300 hidden md:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={scrollToTool}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Building Your Invoice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
