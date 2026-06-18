// import React from 'react';
// import { Calendar, Shield, Award, Trophy, MapPin, Truck, ChevronRight, FileText, CheckCircle2, Info } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';

// export default function EventDetails({ setPage }) {
//   const rules = [
//     'The run must be completed within the official challenge period. Dates will be announced separately.',
//     'There is no minimum pace requirement. You can run, walk, or jog at your comfort level.',
//     'Workouts can be finished in a single session or divided across multiple days.',
//     'Any GPS running application (Strava, Garmin, NRC, Google Fit, etc.) or treadmill panel counts.',
//     'Workout screenshots must show: distance, date (if possible), time elapsed, and other activity details.',
//     'Only registration names provided during checkout will be engraved on the trophy.',
//   ];

//   const benefits = [
//     { title: 'Keep Motivated', desc: 'A tangible fitness challenge to push your boundaries and stay consistent with healthy habits.' },
//     { title: 'Physical Trophy Cabinet', desc: 'No cheap metal medals. Receive a stunning 5-inch themed acrylic trophy that catches the light.' },
//     { title: 'Social Bragging Rights', desc: 'Download a personalized certificate and showcase your achievement to friends and family.' },
//     { title: 'Completely Safe & Flexible', desc: 'Zero crowd risk. Run on your timeline, on your favorite local track, or right in your gym.' },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-left">
      
//       {/* 1. Page Header & Large Banner */}
//       <div className="space-y-6">
//         <button 
//           onClick={() => setPage('event')}
//           className="text-sm font-semibold text-primary-royal dark:text-accent-gold hover:underline cursor-pointer flex items-center"
//         >
//           &larr; Back to Events List
//         </button>

//         <div className="relative rounded-3xl overflow-hidden h-[250px] sm:h-[400px] bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
//           <img 
//             src="/runner_hero.png" 
//             alt="Virtual Run Challenge 2026 Detailed Banner" 
//             className="w-full h-full object-cover opacity-50"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/40 to-transparent"></div>
          
//           <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white space-y-3 max-w-3xl">
//             <span className="px-3 py-1 bg-accent-gold/20 border border-accent-gold/40 text-accent-gold text-xs font-bold rounded-full uppercase tracking-wider">
//               Event Details
//             </span>
//             <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
//               Virtual Run Challenge 2026
//             </h1>
//             <p className="text-slate-350 text-xs sm:text-sm max-w-2xl font-light">
//               A nationwide virtual running challenge that brings together people to celebrate endurance, fitness, and health.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 2. Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
//         {/* Left column - details, rules, benefits */}
//         <div className="lg:col-span-8 space-y-12">
          
//           {/* Event description */}
//           <div className="space-y-4">
//             <h2 className="font-display font-black text-2xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
//               Challenge Description
//             </h2>
//             <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
//               Run for India's Glory 2026 is a nationwide virtual running challenge that brings together fitness enthusiasts, passionate runners, and proud citizens in a celebration of endurance, determination, and national spirit. Designed for participants of all fitness levels, the event offers multiple distance categories including 1600m, 3K, 5K, 10K, and 21K, allowing everyone to take part and challenge themselves.
//             </p>
//             <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
//               More than just a run, this event is an opportunity to embrace a healthier lifestyle while running for a cause greater than yourself—the glory of India. Whether you're a beginner taking your first steps or an experienced runner pursuing a new milestone, every kilometer completed reflects dedication, perseverance, and pride. Join runners from across the country and be part of a movement that celebrates fitness, achievement, and the spirit of the nation.
//             </p>
//           </div>

//           {/* Rules and Guidelines */}
//           <div className="space-y-4">
//             <h2 className="font-display font-black text-2xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
//               Official Challenge Rules
//             </h2>
//             <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
//               <ul className="space-y-3">
//                 {rules.map((rule, idx) => (
//                   <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
//                     <Info className="h-5 w-5 text-primary-blue dark:text-accent-gold shrink-0 mt-0.5" />
//                     <span>{rule}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Benefits Grid */}
//           <div className="space-y-6">
//             <h2 className="font-display font-black text-2xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
//               Benefits of Participating
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {benefits.map((b, idx) => (
//                 <div key={idx} className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-200">
//                   <h3 className="font-display font-bold text-base text-primary-navy dark:text-white flex items-center space-x-2">
//                     <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
//                     <span>{b.title}</span>
//                   </h3>
//                   <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
//                     {b.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Right column - Pricing details, registration CTA */}
//         <div className="lg:col-span-4 space-y-8">
          
//           {/* Price Box */}
//           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-6 shadow-md text-center">
//             <div className="space-y-2">
//               <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-400">Registration fees</h3>
//               <div className="flex items-center justify-center space-x-3">
//                 <span className="font-display font-black text-4xl text-primary-navy dark:text-white">₹399</span>
//                 {/* <span className="text-lg text-slate-450 line-through">₹799</span> */}
//                 {/* <span className="text-xs font-bold px-2 py-0.5 bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 rounded">50% OFF</span> */}
//               </div>
//               <p className="text-xs text-slate-500 dark:text-slate-400 font-light">All-inclusive registration price. No hidden shipping charges.</p>
//             </div>

//             <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3 text-left text-xs text-slate-600 dark:text-slate-350">
//               <div className="flex items-center space-x-2">
//                 <Trophy className="h-4 w-4 text-accent-gold" />
//                 <span>Acrylic Trophy included</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Award className="h-4 w-4 text-primary-blue" />
//                 <span>E-Certificate included</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Truck className="h-4 w-4 text-green-500" />
//                 <span>Free delivery across India</span>
//               </div>
//             </div>

//             <button 
//               onClick={() => setPage('register')}
//               className="w-full font-display font-bold uppercase tracking-wider py-4 rounded-xl bg-gradient-to-r
//                from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 cursor-pointer"
//             >
//               Register Now (₹399)
//             </button>
//           </div>

//           {/* Quick Help box */}
//           <div className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3">
//             <h4 className="font-display font-bold text-sm text-primary-navy dark:text-white">Questions?</h4>
//             <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
//               Read our extensive <button onClick={() => setPage('faq')} className="text-primary-royal dark:text-accent-gold hover:underline font-semibold cursor-pointer">FAQs</button> section to understand run validations, shipping delivery timelines, and standard virtual running questions.
//             </p>
//           </div>

//         </div>

//       </div>

//       {/* 3. Trophy & E-Certificate Showcase Section */}
//       <section className="bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200/50 dark:border-slate-800/50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto space-y-12">
          
//           <div className="text-center space-y-4">
//             <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-850 px-3 py-1 rounded-full">
//               Rewards In Detail
//             </span>
//             <h2 className="font-display font-black text-3xl text-primary-navy dark:text-white">
//               Trophy & Certificate Showcase
//             </h2>
//             <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
//               Take a closer look at the exclusive premium rewards included with your ₹399 registration fee.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
//             {/* Trophy Showcase Card */}
//             <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md">
//               <div className="relative group overflow-hidden rounded-2xl w-full h-[240px] sm:h-[300px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
//                 <img 
//                   src="/acrylic_trophy.png" 
//                   alt="Premium Acrylic Trophy Mockup Details" 
//                   className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-all duration-300"
//                 />
//               </div>
//               <div className="space-y-3">
//                 <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center justify-between">
//                   <span>Acrylic Trophy Specifications</span>
//                   <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded font-sans">Physical Reward</span>
//                 </h3>
//                 <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 leading-relaxed font-light">
//                  Our themed trophies are crafted from durable, thick clear acrylic. They feature a vibrant event-themed design showcasing the challenge name and distance completed. Made entirely from premium acrylic with a stylish wooden veneer finish, they create a striking keepsake to celebrate your achievement.

//                 </p>
//                 <ul className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-450 pt-2 border-t border-slate-100 dark:border-slate-800">
//                   <li>📐 Height: 5 inches</li>
//                   <li>🪵 Base: Wood veneer</li>
//                   <li>✍️ Inscription: Event Label</li>
//                   <li>🛡️ Material: Clear acrylic plate</li>
//                 </ul>
//               </div>
//             </div>

//             {/* Certificate Showcase Card */}
//             <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md">
//               <div className="relative group overflow-hidden rounded-2xl w-full h-[240px] sm:h-[300px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
//                 <img 
//                   src="/e_certificate.png" 
//                   alt="Premium Finisher E-Certificate Details" 
//                   className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-all duration-300"
//                 />
//               </div>
//               <div className="space-y-3">
//                 <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center justify-between">
//                   <span>E-Certificate Specifications</span>
//                   <span className="text-xs bg-primary-blue/20 text-primary-blue px-2 py-0.5 rounded font-sans">Digital Reward</span>
//                 </h3>
//                 <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 leading-relaxed font-light">
//                   A high-resolution downloadable PDF certificate personalized with the runner's name and achievement details. Displays the completion date and distance achieved. Instantly generated upon activity validation.
//                 </p>
//                 <ul className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-450 pt-2 border-t border-slate-100 dark:border-slate-800">
//                   <li>🖨️ Format: High-Res PDF</li>
//                   <li>⚡ Delivery: Delivered via Email</li>
//                 </ul>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* 4. Bottom CTAs */}
//       <div className="text-center pt-4 space-y-4">
//         <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
//           Join the Virtual Challenge Today for ₹399
//         </h3>
//         <button 
//           onClick={() => setPage('register')}
//           className="font-display font-bold uppercase tracking-wider px-12 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
//         >
//           Register Now - ₹399
//         </button>
//       </div>

//     </div>
//   );
// }




















import React from 'react';
import { Calendar, Shield, Award, Trophy, MapPin, Truck, ChevronRight, FileText, CheckCircle2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EventDetails() {
  const navigate = useNavigate();

  const rules = [
    'The run must be completed within the official challenge period. Dates will be announced separately.',
    'There is no minimum pace requirement. You can run, walk, or jog at your comfort level.',
    'Any GPS running application (Strava, Garmin, NRC, Google Fit, etc.) or treadmill panel counts.',
    'Workout screenshots must show: distance, date (if possible), time elapsed, and other activity details.',
    
  ];

  const benefits = [
    { title: 'Keep Motivated', desc: 'A tangible fitness challenge to push your boundaries and stay consistent with healthy habits.' },
    { title: 'Physical Trophy Cabinet', desc: 'No cheap metal medals. Receive a stunning 5-inch themed acrylic trophy that catches the light.' },
    { title: 'Social Bragging Rights', desc: 'Download a personalized certificate and showcase your achievement to friends and family.' },
    { title: 'Completely Safe & Flexible', desc: 'Zero crowd risk. Run on your timeline, on your favorite local track, or right in your gym.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-left">
      
      {/* 1. Page Header & Large Banner */}
      <div className="space-y-6">
        <button 
          onClick={() => navigate('/event')}
          className="text-sm font-semibold text-primary-royal dark:text-accent-gold hover:underline cursor-pointer flex items-center"
        >
          &larr; Back to Events List
        </button>

        <div className="relative rounded-3xl overflow-hidden h-[250px] sm:h-[400px] bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <img 
            src="/banner.png" 
            alt="Virtual Run Challenge 2026 Detailed Banner" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white space-y-3 max-w-3xl">
            <span className="px-3 py-1 bg-accent-gold/20 border border-accent-gold/40 text-accent-gold text-xs font-bold rounded-full uppercase tracking-wider">
              Event Details
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Run for India's Glory 2026
            </h1>
            <p className="text-slate-350 text-xs sm:text-sm max-w-2xl font-light">
              A nationwide virtual running challenge that brings together people to celebrate endurance, fitness, and health.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column - details, rules, benefits */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Event description */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-2xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Challenge Description
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Run for India's Glory 2026 is a nationwide virtual running challenge that brings together fitness enthusiasts, passionate runners, and proud citizens in a celebration of endurance, determination, and national spirit. Designed for participants of all fitness levels, the event offers multiple distance categories including 1600m, 3K, 5K, 10K, and 21K, allowing everyone to take part and challenge themselves.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              More than just a run, this event is an opportunity to embrace a healthier lifestyle while running for a cause greater than yourself—the glory of India. Whether you're a beginner taking your first steps or an experienced runner pursuing a new milestone, every kilometer completed reflects dedication, perseverance, and pride. Join runners from across the country and be part of a movement that celebrates fitness, achievement, and the spirit of the nation.
            </p>
          </div>

          {/* Rules and Guidelines */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-2xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Official Challenge Rules
            </h2>
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
              <ul className="space-y-3">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <Info className="h-5 w-5 text-primary-blue dark:text-accent-gold shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-6">
            <h2 className="font-display font-black text-2xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Benefits of Participating
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-200">
                  <h3 className="font-display font-bold text-base text-primary-navy dark:text-white flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>{b.title}</span>
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column - Pricing details, registration CTA */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Price Box */}
          <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-6 shadow-md text-center">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-400">Registration fees</h3>
              <div className="flex items-center justify-center space-x-3">
                <span className="font-display font-black text-4xl text-primary-navy dark:text-white">₹399</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">All-inclusive registration price. No hidden shipping charges.</p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3 text-left text-xs text-slate-600 dark:text-slate-350">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-accent-gold" />
                <span>Acrylic Trophy included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-primary-blue" />
                <span>E-Certificate included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-green-500" />
                <span>Free delivery across India</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/register')}
              className="w-full font-display font-bold uppercase tracking-wider py-4 rounded-xl bg-gradient-to-r
               from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 cursor-pointer"
            >
              Register Now (₹399)
            </button>
          </div>

          {/* Quick Help box */}
          <div className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3">
            <h4 className="font-display font-bold text-sm text-primary-navy dark:text-white">Questions?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Read our extensive <button onClick={() => navigate('/faq')} className="text-primary-royal dark:text-accent-gold hover:underline font-semibold cursor-pointer">FAQs</button> section to understand run validations, shipping delivery timelines, and standard virtual running questions.
            </p>
          </div>

        </div>

      </div>

      {/* 3. Trophy & E-Certificate Showcase Section */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200/50 dark:border-slate-800/50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-850 px-3 py-1 rounded-full">
              Rewards In Detail
            </span>
            <h2 className="font-display font-black text-3xl text-primary-navy dark:text-white">
              Trophy & Certificate Showcase
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Take a closer look at the exclusive premium rewards included with your ₹399 registration fee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Trophy Showcase Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md">
              <div className="relative group overflow-hidden rounded-2xl w-full h-[240px] sm:h-[300px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
                <img 
                  src="/acrylic_trophy.png" 
                  alt="Premium Acrylic Trophy Mockup Details" 
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center justify-between">
                  <span>Acrylic Trophy Specifications</span>
                  <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-0.5 rounded font-sans">Physical Reward</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 leading-relaxed font-light">
                  Our themed trophies are crafted from durable, thick clear acrylic. They feature a vibrant event-themed design showcasing the challenge name and distance completed. Made entirely from premium acrylic with a stylish wooden veneer finish, they create a striking keepsake to celebrate your achievement.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-450 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li>📐 Height: 6.5 inches</li>
                  <li>🪵 Base: Wood veneer</li>
                  <li>✍️ Inscription: Event Label</li>
                  <li>🛡️ Material: Clear acrylic plate</li>
                </ul>
              </div>
            </div>

            {/* Certificate Showcase Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-md">
              <div className="relative group overflow-hidden rounded-2xl w-full h-[240px] sm:h-[300px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
                <img 
                  src="/e_certificate.png" 
                  alt="Premium Finisher E-Certificate Details" 
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center justify-between">
                  <span>E-Certificate Specifications</span>
                  <span className="text-xs bg-primary-blue/20 text-primary-blue px-2 py-0.5 rounded font-sans">Digital Reward</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 leading-relaxed font-light">
                  A high-resolution downloadable PDF certificate personalized with the runner's name and achievement details. Displays the completion date and distance achieved. Instantly generated upon activity validation.
                </p>
                <ul className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-450 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li>🖨️ Format: High-Res PDF</li>
                  <li>⚡ Delivery: Delivered via Email</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Bottom CTAs */}
      <div className="text-center pt-4 space-y-4">
        <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
          Join the Virtual Challenge Today for ₹399
        </h3>
        <button 
          onClick={() => navigate('/register')}
          className="font-display font-bold uppercase tracking-wider px-12 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          Register Now - ₹399
        </button>
      </div>

    </div>
  );
}
