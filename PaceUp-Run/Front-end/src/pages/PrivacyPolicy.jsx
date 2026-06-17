import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <ShieldCheck className="h-8 w-8 text-accent-gold" />
          <h1 className="font-display font-black text-3xl md:text-4xl text-primary-navy dark:text-white">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-white dark:bg-[#081B3A] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-lg space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p className="text-lg">
            At PaceUp Run, we prioritize the confidentiality and protection of our participant data.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white mb-3">
                1. Information We Collect
              </h2>
              <p className="pl-4 border-l-2 border-accent-gold/50">
                We collect full names, email addresses, telephone numbers, and physical shipping addresses during registration to execute the personalized engraving and courier fulfillment process.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white mb-3">
                2. Run Submission Data
              </h2>
              <p className="pl-4 border-l-2 border-accent-gold/50">
                Workout screenshots uploaded for distance confirmation are utilized solely for verification. These screenshots are deleted immediately upon validation of the trophy reward dispatch.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white mb-3">
                3. Third Party Integrations
              </h2>
              <p className="pl-4 border-l-2 border-accent-gold/50">
                We do not sell, rent, or distribute candidate shipping addresses or telephone numbers to advertising firms. Data is securely relayed to certified logistics agencies exclusively for shipping execution.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}