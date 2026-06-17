// import React from 'react';
// import { Shield, Award, MapPin, Truck, ChevronRight, Users, Calendar, DollarSign, Star, Trophy, Heart } from 'lucide-react';

// export default function Home({ setPage }) {
//   const testimonials = [
//     {
//       name: 'Rohan Sharma',
//       role: 'Marathon Enthusiast, Delhi',
//       comment: 'The acrylic trophy is extremely premium! It occupies a proud spot on my study table. Logging the run was seamless on Strava, and shipping was quick.',
//       distance: '21K Half Marathon',
//       rating: 5,
//     },
//     {
//       name: 'Priyanka Patel',
//       role: 'Casual Runner, Ahmedabad',
//       comment: 'For just ₹399, getting a customized engraved trophy and an e-certificate delivered to my home is an unbelievable value. Highly recommend PaceUp Run!',
//       distance: '10K Finisher',
//       rating: 5,
//     },
//     {
//       name: 'Amit Verma',
//       role: 'Fitness Coach, Bangalore',
//       comment: 'Great initiative. It kept me motivated to complete my daily goal. The virtual format meant I could run on my local track at 5 AM. Super easy dashboard.',
//       distance: '5K Sprint',
//       rating: 5,
//     },
//   ];

//   return (
//     <div className="space-y-20 pb-20 animate-fade-in">
      
//       {/* 1. Hero Section */}
//       <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
//         {/* Background Image with Navy Overlay */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="/runner_hero.png" 
//             alt="PaceUp Run Hero background" 
//             className="w-full h-full object-cover opacity-35 scale-105 animate-pulse-slow"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#040D1D] via-[#081B3A]/90 to-transparent"></div>
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* Hero Content */}
//           <div className="lg:col-span-7 space-y-6 text-left">
//             <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30">
//               <Award className="h-4 w-4 text-accent-gold animate-bounce" />
//               <span className="text-xs font-display font-semibold tracking-wider text-accent-gold uppercase">
//                 Active Event - Registration Open
//               </span>
//             </div>
            
//             <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
//               Run Anywhere.<br />
//               <span className="bg-gradient-to-r from-accent-gold to-yellow-500 bg-clip-text text-transparent glow-gold">Finish Strong.</span><br />
//               Earn Your Trophy.
//             </h1>
            
//             <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
//               Join our virtual running challenge, complete your run at your own pace, and receive an exclusive 
//               <span className="text-white font-semibold"> Acrylic Trophy</span>, 
//               <span className="text-white font-semibold"> E-Certificate</span>, and 
//               <span className="text-white font-semibold"> Free Shipping</span> — all for just 
//               <span className="text-accent-gold font-bold text-xl ml-1">₹399</span>.
//             </p>

//             {/* Inclusions badging */}
//             <div className="flex flex-wrap gap-3 pt-2">
//               <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">🏆 Acrylic Trophy</span>
//               <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">📄 E-Certificate</span>
//               <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">🚚 Free Delivery across India</span>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 onClick={() => setPage('register')}
//                 className="font-display font-bold uppercase tracking-wider text-center px-8 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
//               >
//                 Join Challenge
//               </button>
//               <button
//                 onClick={() => setPage('event')}
//                 className="font-display font-bold uppercase tracking-wider text-center px-8 py-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
//               >
//                 View Event
//               </button>
//             </div>
//           </div>

//           {/* Hero Right: Stats overlay Card */}
//           <div className="lg:col-span-5 flex justify-center">
//             <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden animate-float">
//               {/* Background gradient shape */}
//               <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary-royal/30 rounded-full filter blur-xl"></div>
              
//               <h3 className="font-display font-bold text-xl text-white border-b border-white/10 pb-3 flex items-center justify-between">
//                 <span>Challenge Insights</span>
//                 <span className="text-xs bg-primary-blue/30 text-primary-blue px-2 py-0.5 rounded-full font-sans">2026</span>
//               </h3>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
//                   <Users className="h-6 w-6 text-primary-blue mx-auto mb-2" />
//                   <div className="font-display font-bold text-2xl text-white">Flexible challenge</div>
//                   <div className="text-xs text-slate-400">Your Route, Your Time</div>
//                 </div>
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
//                   <Trophy className="h-6 w-6 text-accent-gold mx-auto mb-2 animate-bounce" />
//                   <div className="font-display font-bold text-2xl text-white">Premium Trophy</div>
//                   <div className="text-xs text-slate-400">Delivered to finishers</div>
//                 </div>
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
//                   <MapPin className="h-6 w-6 text-green-400 mx-auto mb-2" />
//                   <div className="font-display font-bold text-2xl text-white">Pan-India</div>
//                   <div className="text-xs text-slate-400">Track Anywhere</div>
//                 </div>
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
//                   <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
//                   <div className="font-display font-bold text-2xl text-white">₹399</div>
//                   <div className="text-xs text-slate-400">All-Inclusive</div>
//                 </div>
//               </div>

//               <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/5 italic">
//                 Connects with Strava, NRC, Garmin, and all fitness apps
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2. Why Choose PaceUp Run */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
//         <div className="text-center space-y-4">
//           <h2 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
//             Why Choose <span className="text-primary-royal dark:text-accent-gold">PaceUp Run</span>?
//           </h2>
//           <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
//             We provide a complete package that rewards your dedication, keeps you fit, and gives you a tangible memory of your achievement.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {[
//             {
//               icon: <Trophy className="h-8 w-8 text-accent-gold" />,
//               title: 'Premium Acrylic Trophy',
//               desc: 'Every finisher will receive a premium event-themed acrylic trophy, celebrating their achievement and successful completion of the challenge.',
//             },
//             {
//               icon: <Award className="h-8 w-8 text-primary-blue" />,
//               title: 'E-Certificate',
//               desc: 'Downloadable digital certificate featuring your name, date, and completed mileage to share on social media.',
//             },
//             {
//               icon: <MapPin className="h-8 w-8 text-red-400" />,
//               title: 'Complete Anywhere',
//               desc: 'No crowd, no set time. Run inside your housing community, on a treadmill, or in local parks at your convenience.',
//             },
//             {
//               icon: <Truck className="h-8 w-8 text-green-400" />,
//               title: 'Free Delivery',
//               desc: 'Zero shipping fees! We dispatch your physical acrylic trophy directly to your address anywhere in India.',
//             },
//           ].map((feature, idx) => (
//             <div 
//               key={idx} 
//               className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left space-y-4"
//             >
//               <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl inline-block">
//                 {feature.icon}
//               </div>
//               <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white">
//                 {feature.title}
//               </h3>
//               <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. Rewards Showcase Section */}
//       <section className="bg-slate-100 dark:bg-slate-900/50 py-16 transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
//           <div className="text-center space-y-4">
//             <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
//               What You Receive
//             </span>
//             <h2 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
//               Rewards Showcase
//             </h2>
//             <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
//               Every registered participant who completes the distance receives physical and digital honors.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left: Trophy Display */}
//             <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
//               <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
//                 Physical Acrylic Trophy
//               </h3>
//               <div className="relative group overflow-hidden rounded-2xl w-full h-[280px] sm:h-[340px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
//                 <img 
//                   src="/acrylic_trophy.png" 
//                   alt="Premium Acrylic Trophy Mockup" 
//                   className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute bottom-4 left-4 right-4 glass-panel text-white py-2 px-4 rounded-xl text-center text-xs">
//                   Run for India's Glory Acrylic Trophy
//                 </div>
//               </div>
//               <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
//                 More than a trophy, it honors your dedication and running spirit. Its exclusive theme-based design celebrates your achievement.
//               </p>
//             </div>

//             {/* Right: Certificate Display */}
//             <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
//               <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
//                 Digital Finisher Certificate
//               </h3>
//               <div className="relative group overflow-hidden rounded-2xl w-full h-[280px] sm:h-[340px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
//                 <img 
//                   src="/e_certificate.png" 
//                   alt="Digital E-Certificate Preview" 
//                   className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute bottom-4 left-4 right-4 glass-panel text-white py-2 px-4 rounded-xl text-center text-xs">
//                   Available for High-Res PDF Download
//                 </div>
//               </div>
//               <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
//                 A symbol of your achievement, this exclusive "Run for India's Glory" E-Certificate is a proud digital keepsake.
//               </p>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* 4. How It Works Preview */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
//         <div className="text-center space-y-4">
//           <h2 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
//             Simple 4-Step Process
//           </h2>
//           <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
//             Participating in a virtual run is as simple as registering, running, submitting, and receiving your rewards.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
//           {/* Connector lines (Desktop) */}
//           <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>

//           {[
//             { step: '1', title: 'Register', desc: 'Secure your slot online for just ₹399.' },
//             { step: '2', title: 'Run Anywhere', desc: 'Cover the challenge distance wherever you are.' },
//             { step: '3', title: 'Submit Proof', desc: 'Upload a screenshot of your distance app dashboard.' },
//             { step: '4', title: 'Receive Rewards', desc: 'Get your physical trophy and certificate.' },
//           ].map((item, idx) => (
//             <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl relative text-center flex flex-col items-center space-y-3 shadow-sm">
//               <div className="w-12 h-12 rounded-full bg-primary-royal text-white dark:bg-accent-gold dark:text-primary-navy font-display font-black text-xl flex items-center justify-center border-4 border-slate-50 dark:border-[#040D1D]">
//                 {item.step}
//               </div>
//               <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white pt-2">
//                 {item.title}
//               </h3>
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <button 
//             onClick={() => setPage('how-it-works')}
//             className="inline-flex items-center space-x-2 font-display font-bold text-primary-royal dark:text-accent-gold hover:underline cursor-pointer group"
//           >
//             <span>Read Step-by-Step Directions</span>
//             <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </section>

//       {/* 5. Testimonials Section */}
      

//       {/* 6. Final CTA Section */}
//       <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-gradient-to-r from-primary-navy to-[#040D1D] rounded-3xl p-8 md:p-16 border border-slate-800/80 shadow-2xl relative overflow-hidden text-center space-y-6">
//           {/* Background element */}
//           <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary-royal/20 rounded-full filter blur-3xl -z-10"></div>
          
//           <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
//             Ready to Earn Your <span className="bg-gradient-to-r from-accent-gold to-yellow-500 bg-clip-text text-transparent glow-gold">Trophy</span>?
//           </h2>
//           <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
//             Challenge yourself today. Join many of runners across the country who are achieving fitness milestones and celebrating victory with physical honors.
//           </p>

//           <div className="text-2xl font-display font-extrabold text-white flex items-center justify-center space-x-2">
//             <span>Registration Fee:</span>
//             <span className="text-accent-gold">₹399</span>
//             {/* <span className="text-sm text-slate-400 line-through">₹799</span> */}
//             {/* <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">50% OFF</span> */}
//           </div>

//           <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={() => setPage('register')}
//               className="font-display font-bold uppercase tracking-wider px-10 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-xl shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
//             >
//               Register Now - ₹399
//             </button>
//             <button
//               onClick={() => setPage('event')}
//               className="font-display font-bold uppercase tracking-wider px-10 py-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-white border border-slate-700 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
//             >
//               Learn More
//             </button>
//           </div>

//           <div className="pt-6 text-xs text-slate-400 flex items-center justify-center space-x-4">
//             <span className="flex items-center"><Truck className="h-4 w-4 mr-1 text-accent-gold" /> Free Shipping</span>
//             <span>•</span>
//             <span className="flex items-center"><Award className="h-4 w-4 mr-1 text-accent-gold" /> 100% Verified Finisher Trophy</span>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }























import React from 'react';
import { Shield, Award, MapPin, Truck, ChevronRight, Users, Calendar, DollarSign, Star, Trophy, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Marathon Enthusiast, Delhi',
      comment: 'The acrylic trophy is extremely premium! It occupies a proud spot on my study table. Logging the run was seamless on Strava, and shipping was quick.',
      distance: '21K Half Marathon',
      rating: 5,
    },
    {
      name: 'Priyanka Patel',
      role: 'Casual Runner, Ahmedabad',
      comment: 'For just ₹399, getting a customized engraved trophy and an e-certificate delivered to my home is an unbelievable value. Highly recommend PaceUp Run!',
      distance: '10K Finisher',
      rating: 5,
    },
    {
      name: 'Amit Verma',
      role: 'Fitness Coach, Bangalore',
      comment: 'Great initiative. It kept me motivated to complete my daily goal. The virtual format meant I could run on my local track at 5 AM. Super easy dashboard.',
      distance: '5K Sprint',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-20 pb-20 animate-fade-in">

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
        {/* Background Image with Navy Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/runner_hero.png"
            alt="PaceUp Run Hero background"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040D1D] via-[#081B3A]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/30">
              <Award className="h-4 w-4 text-accent-gold animate-bounce" />
              <span className="text-xs font-display font-semibold tracking-wider text-accent-gold uppercase">
                Active Event - Registration Open
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
              Run Anywhere.<br />
              <span className="bg-gradient-to-r from-accent-gold to-yellow-500 bg-clip-text text-transparent glow-gold">Finish Strong.</span><br />
              Earn Your Trophy.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              Join our virtual running challenge, complete your run at your own pace, and receive an exclusive
              <span className="text-white font-semibold"> Acrylic Trophy</span>,
              <span className="text-white font-semibold"> E-Certificate</span>, and
              <span className="text-white font-semibold"> Free Shipping</span> — all for just
              <span className="text-accent-gold font-bold text-xl ml-1">₹399</span>.
            </p>

            {/* Inclusions badging */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">🏆 Acrylic Trophy</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">📄 E-Certificate</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">🚚 Free Delivery across India</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/register')}
                className="font-display font-bold uppercase tracking-wider text-center px-8 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                Join Challenge
              </button>
              <button
                onClick={() => navigate('/event')}
                className="font-display font-bold uppercase tracking-wider text-center px-8 py-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                View Event
              </button>
            </div>
          </div>

          {/* Hero Right: Stats overlay Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden animate-float">
              {/* Background gradient shape */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary-royal/30 rounded-full filter blur-xl"></div>

              <h3 className="font-display font-bold text-xl text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Challenge Insights</span>
                <span className="text-xs bg-primary-blue/30 text-primary-blue px-2 py-0.5 rounded-full font-sans">2026</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <Users className="h-6 w-6 text-primary-blue mx-auto mb-2" />
                  <div className="font-display font-bold text-2xl text-white">Flexible challenge</div>
                  <div className="text-xs text-slate-400">Your Route, Your Time</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <Trophy className="h-6 w-6 text-accent-gold mx-auto mb-2 animate-bounce" />
                  <div className="font-display font-bold text-2xl text-white">Premium Trophy</div>
                  <div className="text-xs text-slate-400">Delivered to finishers</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <MapPin className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="font-display font-bold text-2xl text-white">Pan-India</div>
                  <div className="text-xs text-slate-400">Track Anywhere</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="font-display font-bold text-2xl text-white">₹399</div>
                  <div className="text-xs text-slate-400">All-Inclusive</div>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-slate-400 border-t border-white/5 italic">
                Connects with Strava, NRC, Garmin, and all fitness apps
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose PaceUp Run */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
            Why Choose <span className="text-primary-royal dark:text-accent-gold">PaceUp Run</span>?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
            We provide a complete package that rewards your dedication, keeps you fit, and gives you a tangible memory of your achievement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Trophy className="h-8 w-8 text-accent-gold" />,
              title: 'Premium Acrylic Trophy',
              desc: 'Every finisher will receive a premium event-themed acrylic trophy, celebrating their achievement and successful completion of the challenge.',
            },
            {
              icon: <Award className="h-8 w-8 text-primary-blue" />,
              title: 'E-Certificate',
              desc: 'Downloadable digital certificate featuring your name, date, and completed mileage to share on social media.',
            },
            {
              icon: <MapPin className="h-8 w-8 text-red-400" />,
              title: 'Complete Anywhere',
              desc: 'No crowd, no set time. Run inside your housing community, on a treadmill, or in local parks at your convenience.',
            },
            {
              icon: <Truck className="h-8 w-8 text-green-400" />,
              title: 'Free Delivery',
              desc: 'Zero shipping fees! We dispatch your physical acrylic trophy directly to your address anywhere in India.',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-left space-y-4"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl inline-block">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rewards Showcase Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-4">
            <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
              What You Receive
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
              Rewards Showcase
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
              Every registered participant who completes the distance receives physical and digital honors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Trophy Display */}
            <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
                Physical Acrylic Trophy
              </h3>
              <div className="relative group overflow-hidden rounded-2xl w-full h-[280px] sm:h-[340px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
                <img
                  src="/acrylic_trophy.png"
                  alt="Premium Acrylic Trophy Mockup"
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 right-4 glass-panel text-white py-2 px-4 rounded-xl text-center text-xs">
                  Run for India's Glory Acrylic Trophy
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
                More than a trophy, it honors your dedication and running spirit. Its exclusive theme-based design celebrates your achievement.
              </p>
            </div>

            {/* Right: Certificate Display */}
            <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
                Digital Finisher Certificate
              </h3>
              <div className="relative group overflow-hidden rounded-2xl w-full h-[280px] sm:h-[340px] flex items-center justify-center bg-slate-50 dark:bg-[#040D1D]">
                <img
                  src="/e_certificate.png"
                  alt="Digital E-Certificate Preview"
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 right-4 glass-panel text-white py-2 px-4 rounded-xl text-center text-xs">
                  Available for High-Res PDF Download
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
                A symbol of your achievement, this exclusive "Run for India's Glory" E-Certificate is a proud digital keepsake.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How It Works Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
            Simple 4-Step Process
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
            Participating in a virtual run is as simple as registering, running, submitting, and receiving your rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Connector lines (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10"></div>

          {[
            { step: '1', title: 'Register', desc: 'Secure your slot online for just ₹399.' },
            { step: '2', title: 'Run Anywhere', desc: 'Cover the challenge distance wherever you are.' },
            { step: '3', title: 'Submit Proof', desc: 'Upload a screenshot of your distance app dashboard.' },
            { step: '4', title: 'Receive Rewards', desc: 'Get your physical trophy and certificate.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl relative text-center flex flex-col items-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-royal text-white dark:bg-accent-gold dark:text-primary-navy font-display font-black text-xl flex items-center justify-center border-4 border-slate-50 dark:border-[#040D1D]">
                {item.step}
              </div>
              <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white pt-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/how-it-works')}
            className="inline-flex items-center space-x-2 font-display font-bold text-primary-royal dark:text-accent-gold hover:underline cursor-pointer group"
          >
            <span>Read Step-by-Step Directions</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 5. Testimonials Section (preserved, empty) */}

      {/* 6. Final CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-navy to-[#040D1D] rounded-3xl p-8 md:p-16 border border-slate-800/80 shadow-2xl relative overflow-hidden text-center space-y-6">
          {/* Background element */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary-royal/20 rounded-full filter blur-3xl -z-10"></div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Ready to Earn Your <span className="bg-gradient-to-r from-accent-gold to-yellow-500 bg-clip-text text-transparent glow-gold">Trophy</span>?
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Challenge yourself today. Join many of runners across the country who are achieving fitness milestones and celebrating victory with physical honors.
          </p>

          <div className="text-2xl font-display font-extrabold text-white flex items-center justify-center space-x-2">
            <span>Registration Fee:</span>
            <span className="text-accent-gold">₹399</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="font-display font-bold uppercase tracking-wider px-10 py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-xl shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Register Now - ₹399
            </button>
            <button
              onClick={() => navigate('/event')}
              className="font-display font-bold uppercase tracking-wider px-10 py-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-white border border-slate-700 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Learn More
            </button>
          </div>

          <div className="pt-6 text-xs text-slate-400 flex items-center justify-center space-x-4">
            <span className="flex items-center"><Truck className="h-4 w-4 mr-1 text-accent-gold" /> Free Shipping</span>
            <span>•</span>
            <span className="flex items-center"><Award className="h-4 w-4 mr-1 text-accent-gold" /> 100% Verified Finisher Trophy</span>
          </div>
        </div>
      </section>

    </div>
  );
}