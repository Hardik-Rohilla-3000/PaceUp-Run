// import React from 'react';
// import { ClipboardList, Play, CheckSquare, Award, ArrowRight, Activity, MapPin, Truck } from 'lucide-react';

// export default function HowItWorks({ setPage }) {
//   const steps = [
//     {
//       step: '01',
//       title: 'Register Online',
//       icon: <ClipboardList className="h-6 w-6 text-white" />,
//       badgeColor: 'bg-primary-blue',
//       desc: 'Fill out our secure registration form and sign up for the challenge. The fee is ₹399, which covers your theme-based trophy, digital certificate, and free delivery across India.',
//       tips: 'Ensure your spelling is correct! Your registered name will appear on your certificate and official challenge records.',
//     },
//     {
//       step: '02',
//       title: 'Complete Your Run',
//       icon: <Play className="h-6 w-6 text-white" />,
//       badgeColor: 'bg-primary-royal',
//       desc: 'Run, walk, hike, or jog at your own pace, on your own terms. You can complete your distance in one go or split it across multiple days. Outdoors, parks, roads, or treadmills are all accepted.',
//       tips: 'Use any popular tracking app like Strava, Nike Run Club, Garmin, Fitbit, Adidas Running, or Apple Health to log your workout details.',
//     },
//     {
//       step: '03',
//       title: 'Upload Run Proof',
//       icon: <CheckSquare className="h-6 w-6 text-white" />,
//       badgeColor: 'bg-indigo-600',
//       desc: 'Capture a screenshot of your tracking dashboard showing your total distance, duration, and run date. Submit it directly to our verification portal or via the validation link sent to your email.',
//       tips: 'Treadmill runners can submit a photo of the treadmill screen showing the distance and workout time.',
//     },
//     {
//       step: '04',
//       title: 'Receive Custom Rewards',
//       icon: <Award className="h-6 w-6 text-white" />,
//       badgeColor: 'bg-accent-gold',
//       desc: '"Our validation desk carefully reviews your submitted information. Once verified, we prepare your theme-based trophy, print your certificate, and dispatch them directly to your doorstep. Shipping is completely free!"',
//       tips: 'You will receive a real-time WhatsApp and Email notification with a courier tracking ID as soon as your trophy leaves our workshop.',
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-left">
      
//       {/* Page Header */}
//       <div className="text-center space-y-4">
//         <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
//           Guidelines
//         </span>
//         <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
//           How It Works
//         </h1>
//         <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base text-center">
//           Our virtual running challenge is designed to be simple, flexible, and rewarding. Here is how your journey unfolds.
//         </p>
//       </div>

//       {/* Timeline Layout */}
//       <div className="max-w-4xl mx-auto relative">
//         {/* Central timeline indicator line (Desktop only) */}
//         <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

//         <div className="space-y-12">
//           {steps.map((item, idx) => {
//             const isEven = idx % 2 === 0;
//             return (
//               <div 
//                 key={idx} 
//                 className={`flex flex-col md:flex-row items-stretch md:items-center ${
//                   isEven ? '' : 'md:flex-row-reverse'
//                 } relative`}
//               >
//                 {/* Timeline circle indicator (Centered on desktop, left on mobile) */}
//                 <div className="absolute top-6 left-4 md:left-1/2 md:transform md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${item.badgeColor} border-4 border-slate-50 dark:border-[#040D1D]`}>
//                     {item.icon}
//                   </div>
//                 </div>

//                 {/* Left/Right Content Block */}
//                 <div className="w-full md:w-[45%] pl-16 md:pl-0 md:px-6">
//                   <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="font-display font-black text-3xl text-slate-355 dark:text-slate-700">
//                         {item.step}
//                       </span>
//                       <span className="text-xs font-semibold text-primary-royal dark:text-accent-gold uppercase tracking-wider bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded">
//                         Step {idx + 1}
//                       </span>
//                     </div>

//                     <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
//                       {item.title}
//                     </h3>
                    
//                     <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
//                       {item.desc}
//                     </p>

//                     <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg border-l-4 border-primary-blue dark:border-accent-gold text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
//                       <strong>Tip:</strong> {item.tips}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Spacer to push opposite content */}
//                 <div className="hidden md:block w-[10%]"></div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Inclusions summary banner */}
//       <div className="bg-gradient-to-r from-primary-navy to-slate-900 rounded-3xl p-8 max-w-4xl mx-auto border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
//         <div className="md:col-span-2 space-y-2">
//           <h3 className="font-display font-bold text-lg text-white">
//             Ready to take the challenge?
//           </h3>
//           <p className="text-xs text-slate-350 leading-relaxed font-light">
//             You are fully covered by our validation guarantee. Complete your run on the scheduled date at your own pace—indoors or outdoors—and receive a premium acrylic trophy delivered to your doorstep for free.
//           </p>
//         </div>
//         <div className="flex justify-center md:justify-end">
//           <button 
//             onClick={() => setPage('register')}
//             className="font-display font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/10 cursor-pointer"
//           >
//             Register slots - ₹399
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }





























import React from 'react';
import { ClipboardList, Play, CheckSquare, Award, ArrowRight, Activity, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      step: '01',
      title: 'Register Online',
      icon: <ClipboardList className="h-6 w-6 text-white" />,
      badgeColor: 'bg-primary-blue',
      desc: 'Fill out our secure registration form and sign up for the challenge. The fee is ₹399, which covers your theme-based trophy, digital certificate, and free delivery across India.',
      tips: 'Ensure your spelling is correct! Your registered name will appear on your certificate and official challenge records.',
    },
    {
      step: '02',
      title: 'Complete Your Run',
      icon: <Play className="h-6 w-6 text-white" />,
      badgeColor: 'bg-primary-royal',
      desc: 'Run, walk or jog at your own pace, on your own terms. You can complete your distance in one go or split it across multiple days. Outdoors, parks, roads, or treadmills are all accepted.',
      tips: 'Use any popular tracking app like Strava, Nike Run Club, Garmin, Fitbit, Adidas Running, or Apple Health to log your workout details.',
    },
    {
      step: '03',
      title: 'Upload Run Proof',
      icon: <CheckSquare className="h-6 w-6 text-white" />,
      badgeColor: 'bg-indigo-600',
      desc: 'Capture a screenshot of your tracking dashboard showing your total distance, duration, and run date. Submit it directly to our verification portal or via the validation link sent to your email.',
      tips: 'Treadmill runners can submit a photo of the treadmill screen showing the distance and workout time.',
    },
    {
      step: '04',
      title: 'Receive Custom Rewards',
      icon: <Award className="h-6 w-6 text-white" />,
      badgeColor: 'bg-accent-gold',
      desc: 'Our validation desk carefully reviews your submitted information. Once verified, we prepare your theme-based trophy, E-certificate, and dispatch your trophy directly to your doorstep. Shipping is completely free!',
      tips: 'You will receive a real-time WhatsApp and Email notification with a courier tracking ID as soon as your trophy leaves our workshop.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-left">

      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
          Guidelines
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
          How It Works
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base text-center">
          Our virtual running challenge is designed to be simple, flexible, and rewarding. Here is how your journey unfolds.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto relative">
        {/* Central timeline indicator line (Desktop only) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-10 bottom-10 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

        <div className="space-y-12">
          {steps.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-stretch md:items-center ${
                  isEven ? '' : 'md:flex-row-reverse'
                } relative`}
              >
                {/* Timeline circle indicator */}
                <div className="absolute top-6 left-4 md:left-1/2 md:transform md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${item.badgeColor} border-4 border-slate-50 dark:border-[#040D1D]`}>
                    {item.icon}
                  </div>
                </div>

                {/* Left/Right Content Block */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0 md:px-6">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-3xl text-slate-355 dark:text-slate-700">
                        {item.step}
                      </span>
                      <span className="text-xs font-semibold text-primary-royal dark:text-accent-gold uppercase tracking-wider bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded">
                        Step {idx + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-primary-navy dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg border-l-4 border-primary-blue dark:border-accent-gold text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                      <strong>Tip:</strong> {item.tips}
                    </div>
                  </div>
                </div>

                {/* Spacer to push opposite content */}
                <div className="hidden md:block w-[10%]"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inclusions summary banner */}
      <div className="bg-gradient-to-r from-primary-navy to-slate-900 rounded-3xl p-8 max-w-4xl mx-auto border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        <div className="md:col-span-2 space-y-2">
          <h3 className="font-display font-bold text-lg text-white">
            Ready to take the challenge?
          </h3>
          <p className="text-xs text-slate-350 leading-relaxed font-light">
            You are fully covered by our validation guarantee. Complete your run on the scheduled date at your own pace—indoors or outdoors—and receive a premium acrylic trophy delivered to your doorstep for free.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => navigate('/register')}
            className="font-display font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/10 cursor-pointer"
          >
            Register slots - ₹399
          </button>
        </div>
      </div>

    </div>
  );
}