// import React from 'react';
// import { Calendar, Award, Trophy, Truck, ArrowRight, Star, Clock } from 'lucide-react';

// export default function Event({ setPage }) {
//   const activeEvent = {
//     title: 'Run for India\'s Glory 2026',
//     fee: '₹499',
//     // originalFee: '₹799',
//     timeline: 'Jan 01, 2026 - Dec 31, 2026',
//     location: 'Run Anywhere (Self-Paced)',
//     inclusions: [
//       'Premium Theme-Based Acrylic Trophy',
//       'Downloadable High-Res Digital Finisher Certificate',
//       'Free Shipping and Tracking Across India',
//       'Proud Finisher Recognition',
//     ],
//     summary: 'Challenge yourself to run, walk, or jog at your own pace, anywhere, anytime. Achieve your fitness milestones and earn exclusive finisher rewards that celebrate your dedication and achievement.',
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
//       {/* Page Header */}
//       <div className="text-center space-y-4">
//         <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
//           Featured Challenges
//         </span>
//         <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
//           Active Virtual Running Events
//         </h1>
//         <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
//           Sign up for the current season, complete your run, submit your GPS activity, and claim your physical trophy.
//         </p>
//       </div>

//       {/* Main Premium Event Card */}
//       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">
        
//         {/* main Column */}
//         <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[460px] bg-slate-950">
//           <img 
//             src="/runner_hero.png" 
//             alt="Virtual Run Challenge 2026 main" 
//             className="w-full h-full object-cover opacity-60 absolute inset-0"
//           />
//           {/* Accent Gold overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary-navy/40"></div>
          
//           {/* Inside main Info overlays */}
//           <div className="absolute top-4 left-4 bg-[#081B3A] border border-accent-gold/40 text-accent-gold text-xs font-display font-bold px-3 py-1 rounded-full uppercase">
//             Popular Challenge
//           </div>
          
//           <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-2">
//             <h3 className="font-display font-black text-2xl tracking-tight leading-tight">
//               PaceUp Run 2026 Series
//             </h3>
//             <p className="text-slate-300 text-xs flex items-center font-light">
//               <Clock className="h-4.5 w-4.5 mr-1.5 text-accent-gold" />
//               Complete anytime in 2026
//             </p>
//           </div>
//         </div>

//         {/* Content Column */}
//         <div className="lg:col-span-7 p-6 sm:p-10 text-left flex flex-col justify-between space-y-8">
          
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
//               <h2 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
//                 {activeEvent.title}
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <span className="font-display font-black text-2xl text-accent-gold">{activeEvent.fee}</span>
//                 <span className="text-sm text-slate-400 line-through">{activeEvent.originalFee}</span>
//               </div>
//             </div>

//             <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
//               {activeEvent.summary}
//             </p>

//             {/* Quick Details grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
//               <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400 text-xs">
//                 <Calendar className="h-5 w-5 text-primary-blue shrink-0" />
//                 <span><strong>Timeline:</strong> {activeEvent.timeline}</span>
//               </div>
//               <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400 text-xs">
//                 <Clock className="h-5 w-5 text-primary-blue shrink-0" />
//                 <span><strong>Format:</strong> Any running application</span>
//               </div>
//             </div>

//             {/* Inclusions checklist */}
//             <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//               <h4 className="font-display font-bold text-sm text-primary-navy dark:text-white uppercase tracking-wider">
//                 Registration Inclusions:
//               </h4>
//               <ul className="space-y-2">
//                 {activeEvent.inclusions.map((inclusion, idx) => (
//                   <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
//                     <span className="p-0.5 rounded-full bg-green-500/10 text-green-500 dark:text-green-400 shrink-0 mt-0.5">
//                       <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                       </svg>
//                     </span>
//                     <span>{inclusion}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Card action buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <button
//               onClick={() => setPage('register')}
//               className="flex-1 font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/10 transition-all duration-200 cursor-pointer"
//             >
//               Register for ₹499
//             </button>
//             <button
//               onClick={() => setPage('details')}
//               className="flex-1 font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary-navy dark:text-white transition-all duration-200 cursor-pointer border border-transparent dark:border-slate-700"
//             >
//               Learn More Details
//             </button>
//           </div>

//         </div>

//       </div>

//       {/* Info Notice */}
//       {/* <div className="max-w-4xl mx-auto p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-left flex items-start space-x-4">
//         <div className="p-2 rounded-lg bg-primary-royal/10 text-primary-royal dark:bg-accent-gold/10 dark:text-accent-gold shrink-0">
//           <Award className="h-6 w-6" />
//         </div>
//         <div className="space-y-1">
//           <h4 className="font-display font-bold text-sm text-primary-navy dark:text-white">
//             How does validation work?
//           </h4>
//           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
//             Run, walk, or hike anywhere using popular apps like Strava, Garmin Connect, Nike Run Club, or Samsung Health. Take a screenshot showing your active distance and upload it to the runner portal. We inspect the screenshot, customize your acrylic trophy plaque, and send it with tracking detail within 7-14 days.
//           </p>
//         </div>
//       </div> */}

//     </div>
//   );
// }



























import React, { useState, useEffect } from 'react';
import { Calendar, Award, Trophy, Truck, ArrowRight, Star, Clock, MapPin, Footprints, Shield, CheckCircle, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL  = import.meta.env.VITE_API_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function Event({ registrationOpen = true }) {
  const navigate = useNavigate();
  const [submissionOpen, setSubmissionOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/get-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({}),
    })
      .then(r => r.json())
      .then(data => {
        if (data.submission_open === 'true') setSubmissionOpen(true);
      })
      .catch(() => {});
  }, []);

  const activeEvent = {
    title: 'The Forever Athlete Run 2026',
    fee: '₹499',
    timeline: '31 August - 06 September 2026',
    registrationCloses: '30 Augut 2026 at 11:59 PM IST',
    location: 'Run Anywhere (Self-Paced)',
    inclusions: [
      'Premium Theme-Based Acrylic Trophy',
      'Downloadable High-Res Digital Finisher Certificate',
      'Free Shipping and Tracking Across India',
      'Proud Finisher Recognition',
    ],
    summary:
      'Challenge yourself to run, walk, or jog at your own pace, anywhere, anytime. Achieve your fitness milestones and earn exclusive finisher rewards that celebrate your dedication and achievement.',
  };

  const distances = [
    { label: '1600m', desc: 'Perfect for beginners and warm-up runners', color: 'bg-green-500' },
    { label: '3 KM', desc: 'A solid start for casual joggers', color: 'bg-blue-500' },
    { label: '5 KM', desc: 'The classic distance for fitness enthusiasts', color: 'bg-indigo-500' },
    { label: '10 KM', desc: 'Push your limits and test your endurance', color: 'bg-violet-500' },
    { label: '21 KM', desc: 'Half marathon - for the dedicated runners', color: 'bg-amber-500' },
  ];

  return (
    <div className="animate-fade-in">

      {/* Hero main */}
      <div className="relative h-[320px] sm:h-[420px] overflow-hidden">
        <img
          src="/main.png"
          alt="The Forever Athlete Run 2026"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040D1D] via-[#040D1D]/60 to-transparent" />
        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 text-center px-4">
          <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-accent-gold border border-accent-gold/30 px-4 py-1.5 rounded-full mb-4">
            Featured Challenge
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
           The Forever Athlete Run 2026
          </h1>
          <p className="text-white/50 max-w-xl mx-auto mt-3 text-sm sm:text-base">
            A nationwide virtual running challenge celebrating endurance, fitness, and the spirit of the athlete.
          </p>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-[#060e1f] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
            <Calendar className="h-4 w-4 text-accent-gold" />
            <span>31st August - 6th September 2026</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
            <MapPin className="h-4 w-4 text-accent-gold" />
            <span>Run Anywhere</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
            <Footprints className="h-4 w-4 text-accent-gold" />
            <span>1600m to 21 KM</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs sm:text-sm">
            <Trophy className="h-4 w-4 text-accent-gold" />
            <span>Trophy + Certificate + Stickers</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16">

        {/* Section 1: Upcoming Event Card */}
        <div className="relative">
          <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-green-400 border border-green-400/30 bg-green-400/10 px-4 py-1.5 rounded-full mb-4">
            Upcoming Event
          </span>
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-[420px]">
              <img
                src="/event-card.png"
                alt="Run for India's Glory main"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040D1D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#040D1D]/50" />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                    {activeEvent.title}
                  </h2>
                  <span className="font-display font-black text-2xl text-accent-gold">{activeEvent.fee}</span>
                </div>

                <p className="text-white/40 text-sm leading-relaxed">{activeEvent.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Calendar className="h-4 w-4 text-red-400 shrink-0" />
                    <span><strong className="text-white/60">Registration Closes:</strong> {activeEvent.registrationCloses}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                    <span><strong className="text-white/60">Timeline:</strong> {activeEvent.timeline}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  <h4 className="font-display font-bold text-xs text-white/60 uppercase tracking-wider">Inclusions:</h4>
                  <ul className="space-y-1.5">
                    {activeEvent.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white/40">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-col sm:flex-row gap-3">
                  {registrationOpen ? (
                    <button
                      onClick={() => navigate('/register')}
                      className="flex-1 font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] transition-colors duration-300 cursor-pointer"
                    >
                      Register for ₹499
                    </button>
                  ) : (
                    <div className="flex-1 text-center py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-gray-800">
                      <span className="font-display font-bold text-sm uppercase tracking-wider text-white">Registrations are closed</span>
                    </div>
                  )}
                  <button
                    onClick={() => navigate('/details')}
                    className="flex-1 font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl border border-white/[0.1] hover:border-white/[0.2] text-white transition-colors duration-300 cursor-pointer"
                  >
                    Learn More
                  </button>
                </div>
                {submissionOpen && (
                  <button
                    onClick={() => navigate('/submit-record')}
                    className="w-full font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Trophy className="h-5 w-5" />
                    Submit Your Record
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1b: Previous Event Card */}
        <div className="relative">
          <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-white/50 border border-white/20 bg-white/5 px-4 py-1.5 rounded-full mb-4">
            Previous Event
          </span>
          <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-[420px]">
              <img
                src="/event-card.png"
                alt="Previous Event main"
                className="w-full h-full object-cover absolute inset-0 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040D1D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#040D1D]/50" />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                    Run For India's Glory 2026
                  </h2>
                  <span className="font-display font-black text-2xl text-accent-gold">₹399</span>
                </div>

                <p className="text-white/40 text-sm leading-relaxed">{activeEvent.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Calendar className="h-4 w-4 text-red-400 shrink-0" />
                    <span><strong className="text-white/60">Registration Closes:</strong> 12 July 2026 at 11:59 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                    <span><strong className="text-white/60">Timeline:</strong> 12 July - 18 July 2026</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  <h4 className="font-display font-bold text-xs text-white/60 uppercase tracking-wider">Inclusions:</h4>
                  <ul className="space-y-1.5">
                    {activeEvent.inclusions.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white/40">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-center py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-white/40">Registration Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Distance Categories */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-accent-gold/80 border border-accent-gold/20 px-4 py-1.5 rounded-full">
              Choose Your Distance
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              Five Categories, One Goal
            </h2>
            <p className="text-white/35 max-w-lg mx-auto text-sm">
              Pick the distance that matches your fitness level. Every finisher gets the same premium rewards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {distances.map((d, i) => (
              <div key={i} className="group bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 text-center hover:border-white/[0.15] transition-all duration-300">
                <div className={`w-12 h-12 ${d.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Footprints className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display font-black text-xl text-white mb-1">{d.label}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Finisher Rewards — commented out */}
        {/*
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-accent-gold/80 border border-accent-gold/20 px-4 py-1.5 rounded-full">
              Finisher Rewards
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              What You Get
            </h2>
            <p className="text-white/35 max-w-lg mx-auto text-sm">
              Every registered participant who completes the challenge receives these rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="h-[250px] sm:h-[300px] flex items-center justify-center bg-white/[0.01] p-6">
                <img src="/acrylic_trophy.png" alt="Acrylic Trophy" className="max-h-full object-contain" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-white">Premium Acrylic Trophy</h3>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-accent-gold/70 px-2 py-1 rounded-full border border-accent-gold/15">Physical</span>
                </div>
                <p className="text-white/35 text-sm leading-relaxed">
                  A stunning theme-based acrylic trophy with wooden veneer base. 6.5 inches tall, laser-cut finish, delivered free to your doorstep.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="flex items-center gap-1.5 text-white/30 text-xs"><Package className="h-3.5 w-3.5 text-accent-gold/60" /> Free Delivery</span>
                  <span className="flex items-center gap-1.5 text-white/30 text-xs"><Shield className="h-3.5 w-3.5 text-accent-gold/60" /> Premium Acrylic</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="h-[250px] sm:h-[300px] flex items-center justify-center bg-white/[0.01] p-6">
                <img src="/e_certificate.png" alt="E-Certificate" className="max-h-full object-contain" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-white">Finisher E-Certificate</h3>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400/70 px-2 py-1 rounded-full border border-blue-400/15">Digital</span>
                </div>
                <p className="text-white/35 text-sm leading-relaxed">
                  A high-resolution personalized PDF certificate with your name, distance, and completion date. Delivered instantly via email after verification.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="flex items-center gap-1.5 text-white/30 text-xs"><Award className="h-3.5 w-3.5 text-blue-400/60" /> Personalized</span>
                  <span className="flex items-center gap-1.5 text-white/30 text-xs"><Clock className="h-3.5 w-3.5 text-blue-400/60" /> Instant Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Section 4: Why Join */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-block font-display font-bold text-[10px] tracking-[0.25em] uppercase text-accent-gold/80 border border-accent-gold/20 px-4 py-1.5 rounded-full">
              Why Participate
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
              More Than Just a Run
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Star className="h-5 w-5 text-accent-gold" />, title: 'Stay Motivated', desc: 'A real challenge with real rewards keeps you consistent and focused on your fitness journey.' },
              { icon: <Shield className="h-5 w-5 text-blue-400" />, title: 'Completely Flexible', desc: 'No fixed venue, no crowd. Run at your pace, your place, your time - indoors or outdoors.' },
              { icon: <Trophy className="h-5 w-5 text-amber-400" />, title: 'Earn Real Trophies', desc: 'Not a cheap medal - a premium acrylic trophy that looks stunning on your shelf.' },
              { icon: <Award className="h-5 w-5 text-violet-400" />, title: 'Social Bragging Rights', desc: 'Share your certificate on social media and inspire others to join the movement.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.07] rounded-xl p-6 hover:border-white/[0.14] transition-all duration-300">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-base text-white mb-2">{item.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA — commented out */}
        {/*
        <div className="border border-white/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Ready to run for glory?
            </h3>
            <p className="text-white/35 text-sm leading-relaxed max-w-lg">
              Register now for just ₹499. Complete your run, submit proof, and receive your premium trophy at your doorstep - free delivery across India.
            </p>
          </div>
          <button
            onClick={() => navigate('/register')}
            className="shrink-0 group font-display font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] cursor-pointer transition-colors duration-300 flex items-center gap-2"
          >
            Register for ₹499
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
