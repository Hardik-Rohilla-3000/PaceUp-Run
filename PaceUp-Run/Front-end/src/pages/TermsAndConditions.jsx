import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <FileText className="h-8 w-8 text-accent-gold" />
          <h1 className="font-display font-black text-3xl md:text-4xl text-primary-navy dark:text-white">
            Terms & Conditions
          </h1>
        </div>

        <div className="bg-white dark:bg-[#081B3A] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-lg space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-primary-navy dark:text-white text-lg border-b border-slate-200 dark:border-slate-700/50 pb-4">
            Please read the runner guidelines carefully before registering.
          </p>

          <div className="space-y-6 mt-6">
            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">Registration Fee</h3>
              <p>The challenge entry fee of ₹399 is inclusive of taxes, trophy engraving, e-certificate generation, and delivery across India. Once paid, the fee is non-refundable.</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">Run Tracking</h3>
              <p>You can complete your run in a single session or multiple sessions using any GPS-enabled running application (e.g., Strava, Nike Run Club, Garmin, MapMyRun, Fitbit, Apple Health, Google Fit).</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">Submission of Proof</h3>
              <p>A screenshot of your tracking dashboard showing elapsed time, date, and covered distance must be uploaded through our validation portal. Activity proof must be submitted within the dates specified by the organizers for the challenge.</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">Delivery Timeline</h3>
              <p>Upon successful validation of your submitted workout screenshot, the premium acrylic finisher trophy is personalized with your name and dispatched within 7–14 working days. E-certificates are available for immediate download in the user dashboard.</p>
            </section>

            <section>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white mb-2">Shipping</h3>
              <p>Free shipping is provided across all pin codes in India. PaceUp Run is not liable for shipping delays caused by courier service limitations or incorrect delivery addresses supplied during checkout.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}