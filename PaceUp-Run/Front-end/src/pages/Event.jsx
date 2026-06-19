// import React from 'react';
// import { Calendar, Award, Trophy, Truck, ArrowRight, Star, Clock } from 'lucide-react';

// export default function Event({ setPage }) {
//   const activeEvent = {
//     title: 'Run for India\'s Glory 2026',
//     fee: '₹399',
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
        
//         {/* Banner Column */}
//         <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[460px] bg-slate-950">
//           <img 
//             src="/runner_hero.png" 
//             alt="Virtual Run Challenge 2026 Banner" 
//             className="w-full h-full object-cover opacity-60 absolute inset-0"
//           />
//           {/* Accent Gold overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary-navy/40"></div>
          
//           {/* Inside Banner Info overlays */}
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
//               Register for ₹399
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



























import React from 'react';
import { Calendar, Award, Trophy, Truck, ArrowRight, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Event() {
  const navigate = useNavigate();

  const activeEvent = {
  title: 'Run for India\'s Glory 2026',
  fee: '₹399',
  timeline: '12 July 2026 – 18 July 2026',
  registrationCloses: '11 July 2026 at 11:59 PM IS',
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
      
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">

      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
          Featured Challenges
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
          Active Virtual Running Events
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Sign up for the current season, complete your run, submit your GPS activity, and claim your physical trophy.
        </p>
      </div>

      {/* Main Premium Event Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">

        {/* Banner Column */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[460px] bg-slate-950">
          <img
            src="/event-card.png"
            alt="Run for India's glory Banner"
            className="w-full h-full object-cover opacity-60 absolute inset-0"
          />
          {/* Accent Gold overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary-navy/40"></div>

          {/* Inside Banner Info overlays */}
          {/* <div className="absolute top-4 left-4 bg-[#081B3A] border border-accent-gold/40 text-accent-gold text-xs font-display font-bold px-3 py-1 rounded-full uppercase">
            Popular Challenge
          </div> */}

          <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-2">
            {/* <h3 className="font-display font-black text-2xl tracking-tight leading-tight">
              PaceUp Run 2026 Series
            </h3> */}
            {/* <p className="text-slate-300 text-xs flex items-center font-light">
              <Clock className="h-4.5 w-4.5 mr-1.5 text-accent-gold" />
              Complete anytime in 2026
            </p> */}
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 p-6 sm:p-10 text-left flex flex-col justify-between space-y-8">

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
                {activeEvent.title}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="font-display font-black text-2xl text-accent-gold">{activeEvent.fee}</span>
                <span className="text-sm text-slate-400 line-through">{activeEvent.originalFee}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
              {activeEvent.summary}
            </p>

    {/* Quick Details grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
         <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400 text-xs">
    <Calendar className="h-5 w-5 text-red-500 shrink-0" />
    <span>
      <strong>Registration Closes:</strong> {activeEvent.registrationCloses}
    </span>
  </div> 
      
  <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400 text-xs">
    <Calendar className="h-5 w-5 text-primary-blue shrink-0" />
    <span><strong>Timeline:</strong> {activeEvent.timeline}</span>
  </div>


</div>
            {/* Inclusions checklist */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="font-display font-bold text-sm text-primary-navy dark:text-white uppercase tracking-wider">
                Registration Inclusions:
              </h4>
              <ul className="space-y-2">
                {activeEvent.inclusions.map((inclusion, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="p-0.5 rounded-full bg-green-500/10 text-green-500 dark:text-green-400 shrink-0 mt-0.5">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{inclusion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => navigate('/register')}
              className="flex-1 font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/10 transition-all duration-200 cursor-pointer"
            >
              Register for ₹399
            </button>
            <button
              onClick={() => navigate('/details')}
              className="flex-1 font-display font-bold text-center uppercase tracking-wider py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-primary-navy dark:text-white transition-all duration-200 cursor-pointer border border-transparent dark:border-slate-700"
            >
              Learn More Details
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
