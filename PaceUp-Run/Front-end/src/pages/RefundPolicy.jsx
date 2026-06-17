import React from 'react';
import { RefreshCcw } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <RefreshCcw className="h-8 w-8 text-accent-gold" />
          <h1 className="font-display font-black text-3xl md:text-4xl text-primary-navy dark:text-white">
            Refund & Cancellation Policy
          </h1>
        </div>

        <div className="bg-white dark:bg-[#081B3A] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-lg space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-primary-navy dark:text-white text-lg border-b border-slate-200 dark:border-slate-700/50 pb-4">
            Please review our refund terms carefully before registering.
          </p>

          <div className="space-y-6 mt-6">
            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">
                1. Registration Fees
              </h3>
              <p>Once registration is completed for a challenge, the fee is generally non-refundable.</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">
                2. Event Cancellation
              </h3>
              <p>Refunds may be issued only if a challenge is cancelled by PaceUp Run due to unavoidable circumstances.</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">
                3. Incorrect Information
              </h3>
              <p>PaceUp Run is not responsible for losses due to incorrect personal or payment details provided during registration.</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">
                4. Refund Requests
              </h3>
              <p>Any refund request must be made via email with proper details within 7 days of registration.</p>
              
              <div className="mt-4 inline-flex items-center space-x-3 bg-slate-50 dark:bg-slate-900/50 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xl">📧</span>
                <a 
                  href="mailto:paceuprunofficial@gmail.com" 
                  className="text-accent-gold hover:underline font-medium"
                >
                  paceuprunofficial@gmail.com
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}