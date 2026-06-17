import React from 'react';

export default function AboutUs() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-black text-3xl md:text-4xl mb-8 text-primary-navy dark:text-white">
          About PaceUp Run
        </h1>
        
        <div className="bg-white dark:bg-[#081B3A] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-lg space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            PaceUp Run is a community-driven fitness platform dedicated to inspiring people to stay active, challenge themselves, and celebrate every milestone. We bring together runners, walkers, and cyclists through engaging virtual events that can be completed anytime, anywhere.
          </p>
          <p>
            Our goal is to make fitness accessible, enjoyable, and rewarding for everyone. Whether you're taking your first step toward a healthier lifestyle or pushing your limits as an experienced athlete, PaceUp Run provides the motivation and support to keep you moving forward.
          </p>
          <p>
            Through our virtual challenges, participants can track their progress, earn recognition for their achievements, and become part of a growing community that values consistency, determination, and self-improvement.
          </p>
          <p>
            Every event is designed to encourage personal growth while making fitness exciting. Participants receive a finisher certificate, exclusive rewards, and the satisfaction of accomplishing meaningful fitness goals.
          </p>
          <p>
            At PaceUp Run, we believe that every step counts. Our mission is to create a platform where individuals across the country can embrace an active lifestyle, challenge themselves, and celebrate their journey—one step at a time.
          </p>
          
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-700/50">
            <p className="font-display font-bold text-xl text-primary-navy dark:text-accent-gold space-y-1">
              <span className="block">Pace Up Your Passion.</span>
              <span className="block">Pace Up Your Progress.</span>
              <span className="block">Pace Up Your Life.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}