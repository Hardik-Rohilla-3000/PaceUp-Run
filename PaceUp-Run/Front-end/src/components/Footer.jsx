// import React, { useState } from 'react';
// import { Mail, Phone, MapPin, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

// export default function Footer({ setPage }) {
//   const [showTerms, setShowTerms] = useState(false);
//   const [showPrivacy, setShowPrivacy] = useState(false);

//   const handleLinkClick = (pageId) => {
//     setPage(pageId);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="bg-[#081B3A] text-slate-300 border-t border-slate-800/80 pt-16 pb-8 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
//         {/* Brand Information */}
//         <div className="space-y-4">
//           <div className="flex items-center space-x-2">
//             <span className="font-display font-black text-2xl tracking-wider text-white">
//               PACEUP<span className="text-accent-gold">RUN</span>
//             </span>
//           </div>
//           <p className="text-sm text-slate-400 leading-relaxed">
//             Empowering runners across India to reach their personal goals. Complete your race on your own terms, log your distance, and claim your custom acrylic finisher trophy.
//           </p>
//           <div className="flex space-x-4 pt-2">
//    <a
//   href="https://www.instagram.com/paceup_run?igsh=YnBoZ2d5cWxveWdu"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="flex items-center gap-2 hover:text-accent-gold transition-colors duration-200"
//   aria-label="Instagram"
// >
//   <svg
//     className="h-5 w-5"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
//   </svg>

//   <span>Instagram</span>
// </a>
//             {/* <a href="#" className="hover:text-accent-gold transition-colors duration-200" aria-label="Facebook">
//               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//               </svg>
//             </a> */}
//             {/* <a href="#" className="hover:text-accent-gold transition-colors duration-200" aria-label="Twitter">
//               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
//               </svg>
//             </a> */}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="font-display font-bold text-lg text-white mb-6 border-l-4 border-accent-gold pl-3">
//             Quick Navigation
//           </h3>
//           <ul className="space-y-3 text-sm">
//             {['home', 'event', 'how-it-works', 'faq'].map((pageId) => (
//               <li key={pageId}>
//                 <button
//                   onClick={() => handleLinkClick(pageId)}
//                   className="hover:text-accent-gold transition-colors capitalize cursor-pointer text-left"
//                 >
//                   {pageId.replace('-', ' ')}
//                 </button>
//               </li>
//             ))}
//             <li>
//               <button
//                 onClick={() => handleLinkClick('register')}
//                 className="text-accent-gold hover:underline font-semibold cursor-pointer text-left"
//               >
//                 Join Active Challenge
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Legal & Help */}
//         <div>
//           <h3 className="font-display font-bold text-lg text-white mb-6 border-l-4 border-accent-gold pl-3">
//             Policies & Help
//           </h3>
//           <ul className="space-y-3 text-sm">
//             <li>
//               <button 
//                 onClick={() => setShowTerms(true)}
//                 className="hover:text-accent-gold flex items-center space-x-2 transition-colors cursor-pointer text-left"
//               >
//                 <FileText className="h-4 w-4" />
//                 <span>Terms & Conditions</span>
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setShowPrivacy(true)}
//                 className="hover:text-accent-gold flex items-center space-x-2 transition-colors cursor-pointer text-left"
//               >
//                 <ShieldCheck className="h-4 w-4" />
//                 <span>Privacy Policy</span>
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleLinkClick('faq')}
//                 className="hover:text-accent-gold transition-colors cursor-pointer text-left"
//               >
//                 Submission Help Desk
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="font-display font-bold text-lg text-white mb-6 border-l-4 border-accent-gold pl-3">
//             Get in Touch
//           </h3>
//           <ul className="space-y-4 text-sm">
//             <li className="flex items-start space-x-3">
//               <Mail className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
//               <span className="text-slate-400">paceuprunofficial@gmail.com </span>
//             </li>
//             {/* <li className="flex items-start space-x-3">
//               <Phone className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
//               <span className="text-slate-400">+91 70235 33480</span>
//             </li> */}
//             {/* <li className="flex items-start space-x-3">
//               <MapPin className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
//               <span className="text-slate-400">
//                 PaceUp Run HQ, Sports City Complex,<br />
//                 Mumbai, Maharashtra, India - 400001
//               </span>
//             </li> */}
//           </ul>
//         </div>

//       </div>

//       {/* Lower Footer */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-850 text-center text-xs text-slate-500">
//         <p>&copy; {new Date().getFullYear()} PaceUp Run. All rights reserved. Developed for running enthusiasts.</p>
//       </div>

//       {/* Modal - Terms and Conditions */}
//       {showTerms && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
//           <div className="bg-white dark:bg-[#081B3A] text-slate-800 dark:text-slate-100 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 relative border border-slate-200 dark:border-slate-800 shadow-2xl">
//             <h2 className="font-display font-black text-2xl mb-6 text-primary-navy dark:text-white flex items-center space-x-2">
//               <FileText className="h-6 w-6 text-accent-gold" />
//               <span>Terms & Conditions</span>
//             </h2>
//             <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 pr-2 leading-relaxed">
//               <p className="font-semibold text-primary-navy dark:text-white">Please read the runner guidelines carefully before registering.</p>
//               <ul className="list-disc pl-5 space-y-2">
//                 <li><strong>Registration Fee:</strong> The challenge entry fee of ₹399 is inclusive of taxes, trophy engraving, e-certificate generation, and delivery across India. Once paid, the fee is non-refundable.</li>
//                 <li><strong>Run Tracking:</strong> You can complete your run in a single session or multiple sessions using any GPS-enabled running application (e.g., Strava, Nike Run Club, Garmin, MapMyRun, Fitbit, Apple Health, Google Fit).</li>
//                 <li><strong>Submission of Proof:</strong> A screenshot of your tracking dashboard showing elapsed time, date, and covered distance must be uploaded through our validation portal. Activity proof must be submitted within the 
// dates specified by the organizers for the challenge.</li>
//                 <li><strong>Delivery Timeline:</strong> Upon successful validation of your submitted workout screenshot, the premium acrylic finisher trophy is personalized with your name and dispatched within 7-14 working days. E-certificates are available for immediate download in the user dashboard.</li>
//                 <li><strong>Shipping:</strong> Free shipping is provided across all pin codes in India. PaceUp Run is not liable for shipping delays caused by courier service limitations or incorrect delivery addresses supplied during checkout.</li>
//               </ul>
//             </div>
//             <div className="mt-8 flex justify-end">
//               <button 
//                 onClick={() => setShowTerms(false)}
//                 className="px-6 py-2.5 bg-primary-royal hover:bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal - Privacy Policy */}
//       {showPrivacy && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
//           <div className="bg-white dark:bg-[#081B3A] text-slate-800 dark:text-slate-100 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 relative border border-slate-200 dark:border-slate-800 shadow-2xl">
//             <h2 className="font-display font-black text-2xl mb-6 text-primary-navy dark:text-white flex items-center space-x-2">
//               <ShieldCheck className="h-6 w-6 text-accent-gold" />
//               <span>Privacy Policy</span>
//             </h2>
//             <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 pr-2 leading-relaxed">
//               <p>At PaceUp Run, we prioritize the confidentiality and protection of our participant data. This policy details how your details are handled:</p>
//               <h3 className="font-bold text-primary-navy dark:text-white">1. Information We Collect</h3>
//               <p className="pl-4">We collect full names, email addresses, telephone numbers, and physical shipping addresses during registration to execute the personalized engraving and courier fulfillment process.</p>
//               <h3 className="font-bold text-primary-navy dark:text-white">2. Run Submission Data</h3>
//               <p className="pl-4">Workout screenshots uploaded for distance confirmation are utilized solely for verification. These screenshots are deleted immediately upon validation of the trophy reward dispatch.</p>
//               <h3 className="font-bold text-primary-navy dark:text-white">3. Third Party Integrations</h3>
//               <p className="pl-4">We do not sell, rent, or distribute candidate shipping addresses or telephone numbers to advertising firms. Data is securely relayed to certified logistics agencies exclusively for shipping execution.</p>
//             </div>
//             <div className="mt-8 flex justify-end">
//               <button 
//                 onClick={() => setShowPrivacy(false)}
//                 className="px-6 py-2.5 bg-primary-royal hover:bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </footer>
//   );
// }






import React from 'react';
import { Mail, ShieldCheck, FileText, RefreshCcw } from 'lucide-react'; // Added RefreshCcw icon
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081B3A] text-slate-300 border-t border-slate-800/80 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img
              src="/logotext.png"
              alt="PACEUPRUN"
              className="h-6 w-auto object-contain"
            />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering runners across India to reach their personal goals. Complete your race on your own terms, log your distance, and claim your custom acrylic finisher trophy.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="https://www.instagram.com/paceup_run?igsh=YnBoZ2d5cWxveWdu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-gold transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display font-bold text-lg text-white mb-6 border-l-4 border-accent-gold pl-3">
            Quick Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'home', path: '/' },
              { label: 'about us', path: '/about-us' },
              { label: 'event', path: '/event' },
              { label: 'how it works', path: '/how-it-works' },
              { label: 'faq', path: '/faq' },
            ].map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleLinkClick(item.path)}
                  className="hover:text-accent-gold transition-colors capitalize cursor-pointer text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleLinkClick('/register')}
                className="text-accent-gold hover:underline font-semibold cursor-pointer text-left"
              >
                Join Active Challenge
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Help */}
        <div>
          <h3 className="font-display font-bold text-lg text-white mb-6 border-l-4 border-accent-gold pl-3">
            Policies & Help
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => handleLinkClick('/terms-and-conditions')}
                className="hover:text-accent-gold flex items-center space-x-2 transition-colors cursor-pointer text-left"
              >
                <FileText className="h-4 w-4" />
                <span>Terms & Conditions</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('/privacy-policy')}
                className="hover:text-accent-gold flex items-center space-x-2 transition-colors cursor-pointer text-left"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Privacy Policy</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('/refund-policy')}
                className="hover:text-accent-gold flex items-center space-x-2 transition-colors cursor-pointer text-left"
              >
                <RefreshCcw className="h-4 w-4" />
                <span>Refund Policy</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick('/faq')}
                className="hover:text-accent-gold transition-colors cursor-pointer text-left mt-2"
              >
                Submission Help Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-display font-bold text-lg text-white mb-6 border-l-4 border-accent-gold pl-3">
            Get in Touch
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
              <span className="text-slate-400">paceuprunofficial@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Lower Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-850 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} PaceUp Run. All rights reserved. Developed for running enthusiasts.</p>
      </div>
    </footer>
  );
}