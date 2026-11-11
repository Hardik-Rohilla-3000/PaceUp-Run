// import React, { useState } from 'react';
// import { User, Mail, Phone, MapPin, CheckCircle2, ChevronRight, Award, Trophy } from 'lucide-react';

// export default function Registration({ registerData, setRegisterData, setPage }) {
//   const [errors, setErrors] = useState({});
//   const [distance, setDistance] = useState(registerData.distance || '10K');

//   const distances = [
//     { id: '1600m', label: '1600m Run', desc: 'Perfect short-distance challenge for beginners and speed practice' },
//   { id: '3k', label: '3K Run', desc: 'Light endurance run for beginners building stamina' },
//   { id: '5k', label: '5K Run', desc: 'Popular fitness distance for all-level runners' },
//   { id: '10k', label: '10K Challenge', desc: 'Intermediate endurance challenge for regular runners' },
//   { id: '21k', label: '21K', desc: 'Half-marathon milestone for experienced and dedicated runners' }
//     // { id: '42K', label: 'Full Marathon', desc: 'Ultimate endurance challenge' },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRegisterData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error as user types
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const tempErrors = {};
//     if (!registerData.name?.trim()) tempErrors.name = 'Full Name is required for trophy engraving';
//     if (!registerData.email?.trim()) {
//       tempErrors.email = 'Email address is required';
//     } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
//       tempErrors.email = 'Please enter a valid email address';
//     }
    
//     if (!registerData.phone?.trim()) {
//       tempErrors.phone = 'Phone number is required';
//     } else if (!/^[6-9]\d{9}$/.test(registerData.phone.replace(/\s+/g, ''))) {
//       tempErrors.phone = 'Please enter a valid 10-digit mobile number';
//     }
    
//     if (!registerData.address?.trim()) tempErrors.address = 'Detailed shipping address is required for courier delivery';
//     if (!registerData.city?.trim()) tempErrors.city = 'City name is required';
//     if (!registerData.state?.trim()) tempErrors.state = 'State name is required';
    
//     if (!registerData.pincode?.trim()) {
//       tempErrors.pincode = 'Pincode is required';
//     } else if (!/^\d{6}$/.test(registerData.pincode.replace(/\s+/g, ''))) {
//       tempErrors.pincode = 'Please enter a valid 6-digit Pincode';
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setRegisterData(prev => ({
//         ...prev,
//         distance
//       }));
//       setPage('payment');
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in text-left">
      
//       {/* Page Header */}
//       <div className="text-center space-y-4">
//         <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
//           Event Registration
//         </h1>
//         <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
//           Fill in your details below to register for the Run for India’s Glory 2026– Virtual Challenge. Your participation will be honored with a premium themed acrylic trophy.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
//         {/* Left Form Panel */}
//         <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
          
//           <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center space-x-2">
//             <Trophy className="h-5 w-5 text-accent-gold" />
//             <span>Runner Information</span>
//           </h2>

//           <div className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={registerData.name || ''}
//                   onChange={handleInputChange}
//                   placeholder="name"
//                   maxLength={25}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
//                     errors.name ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                   }`}
//                 />
//               </div>
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>

//             {/* Email and Phone */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                   Email Address *
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={registerData.email || ''}
//                     onChange={handleInputChange}
//                     placeholder="name@example.com"
//                     className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
//                       errors.email ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                     }`}
//                   />
//                 </div>
//                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                   Mobile Number *
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={registerData.phone || ''}
//                     onChange={handleInputChange}
//                     placeholder="9876543210"
//                     maxLength={10}
//                     className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
//                       errors.phone ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                     }`}
//                   />
//                 </div>
//                 {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//               </div>
//             </div>
//           </div>

//           {/* Distance Selection */}
//           {/* <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
//               Select Challenge Distance *
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {distances.map((dist) => (
//                 <div
//                   key={dist.id}
//                   onClick={() => setDistance(dist.id)}
//                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left relative flex flex-col justify-between ${
//                     distance === dist.id
//                       ? 'border-primary-royal bg-primary-royal/5 dark:border-accent-gold dark:bg-accent-gold/5'
//                       : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-850/50'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-display font-extrabold text-lg text-primary-navy dark:text-black">
//                       {dist.label}
//                     </span>
//                     <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
//                       distance === dist.id 
//                         ? 'border-primary-royal bg-primary-royal dark:border-accent-gold dark:bg-accent-gold' 
//                         : 'border-slate-400'
//                     }`}>
//                       {distance === dist.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
//                     </span>
//                   </div>
//                   <span className="text-xs text-slate-400 dark:text-slate-450 mt-1">
//                     {dist.desc}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div> */}

// {/* Distance Selection */}
// <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//   <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
//     Select Challenge Distance *
//   </label>

//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//     {distances.map((dist) => {
//       const isSelected = distance === dist.id;

//       return (
//         <div
//           key={dist.id}
//           onClick={() => setDistance(dist.id)}
//           className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left relative flex flex-col justify-between ${
//             isSelected
//               ? "border-primary-royal bg-primary-royal dark:border-accent-gold dark:bg-accent-gold"
//               : "border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-850/50"
//           }`}
//         >
//           {/* Top row */}
//           <div className="flex items-center justify-between">
            
//             {/* LABEL */}
//             <span
//               className={`font-display font-extrabold text-lg transition-colors ${
//                 isSelected
//                   ? "text-white"
//                   : "text-slate-900 dark:text-black"
//               }`}
//             >
//               {dist.label}
//             </span>

//             {/* RADIO */}
//             <span
//               className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
//                 isSelected
//                   ? "border-white bg-white"
//                   : "border-slate-400"
//               }`}
//             >
//               {isSelected && (
//                 <div className="w-1.5 h-1.5 rounded-full bg-primary-royal"></div>
//               )}
//             </span>
//           </div>

//           {/* DESCRIPTION */}
//           <span
//             className={`text-xs mt-1 transition-colors ${
//               isSelected
//                 ? "text-white/80"
//                 : "text-slate-500 dark:text-slate-400"
//             }`}
//           >
//             {dist.desc}
//           </span>
//         </div>
//       );
//     })}
//   </div>
// </div>















          

//           {/* Shipping Address */}
//           <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
//             <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white pb-1 flex items-center space-x-2">
//               <MapPin className="h-5 w-5 text-accent-gold" />
//               <span>Courier Delivery Address</span>
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                   Physical Address (House / Office / Area) *
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     id="address"
//                     name="address"
//                     value={registerData.address || ''}
//                     onChange={handleInputChange}
//                     placeholder="Enter full shipping address with street name and landmark"
//                     rows={3}
//                     className={`w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm resize-none ${
//                       errors.address ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                     }`}
//                   />
//                 </div>
//                 {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div>
//                   <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                     City *
//                   </label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={registerData.city || ''}
//                     onChange={handleInputChange}
//                     placeholder=""
//                     className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
//                       errors.city ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                     }`}
//                   />
//                   {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                     State *
//                   </label>
//                   <input
//                     type="text"
//                     id="state"
//                     name="state"
//                     value={registerData.state || ''}
//                     onChange={handleInputChange}
//                     placeholder=""
//                     className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
//                       errors.state ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                     }`}
//                   />
//                   {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
//                     Pincode *
//                   </label>
//                   <input
//                     type="text"
//                     id="pincode"
//                     name="pincode"
//                     value={registerData.pincode || ''}
//                     onChange={handleInputChange}
//                     placeholder=""
//                     maxLength={6}
//                     className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
//                       errors.pincode ? 'border-red-500 dark:border-red-500' : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
//                     }`}
//                   />
//                   {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="pt-4">
//             <button
//               type="submit"
//               className="w-full font-display font-bold uppercase tracking-wider text-center py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
//             >
//               <span>Proceed to Checkout (₹1)</span>
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>

//         </form>

//         {/* Right Info Sidebar */}
//         <div className="lg:col-span-4 space-y-6">
//           {/* Package Inclusions Box */}
//           <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
//             <h3 className="font-display font-bold text-base text-primary-navy dark:text-white">
//               ₹499 Package Inclusions
//             </h3>
            
//             <div className="space-y-3 text-xs text-slate-650 dark:text-slate-350">
//               <div className="flex items-start space-x-2">
//                 <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
//                 <span>Theme-Based Premium Trophy Crafted for Excellence.</span>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
//                 <span>Digital E-Certificate for download immediately on run validation.</span>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
//                 <span>Free Insured Delivery directly to your doorstep.</span>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
//                 <span>Pan-India shipping coverage (no regional fee additions).</span>
//               </div>
//             </div>
            
//             <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center text-xs">
//               <span className="text-slate-400">Total Price:</span>
//               <span className="font-display font-black text-lg text-primary-navy dark:text-white">₹499.00</span>
//             </div>
//           </div>

//           {/* Secure transaction info */}
//           <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start space-x-3 bg-slate-50 dark:bg-slate-900/50">
//             <Award className="h-6 w-6 text-primary-blue dark:text-accent-gold shrink-0 mt-0.5" />
//             <div className="space-y-1">
//               <h4 className="font-display font-bold text-xs text-primary-navy dark:text-white">Secure Checkout Guarantee</h4>
//               <p className="text-[10px] text-slate-400 leading-relaxed">
//                 Your payment is processed through a secure, encrypted system. We use safe and trusted payment gateways for all transactions.
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }























import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, CheckCircle2, ChevronRight, Award, Trophy, Loader2, XCircle, Lock } from 'lucide-react';

// ---------------------------------------------------------------------------
// CHANGE LOG (this session - distance fix + full loophole audit)
// ---------------------------------------------------------------------------
//
// CHANGE 1 - VALID_DISTANCE_IDS constant (new, outside component)
//   WHY: The distances array only exists inside the component, recreated every
//        render. Extracting the valid IDs as a module-level Set gives us a
//        single source of truth we can use both in useState initialisation AND
//        in validateForm() - without creating the array twice or risking
//        the two lists drifting out of sync.
//
// CHANGE 2 - useState initialisation changed from:
//     useState(registerData.distance || '10K')
//   to:
//     useState(VALID_DISTANCE_IDS.has(registerData.distance) ? registerData.distance : null)
//
//   WHY (two problems fixed):
//   a) '10K' (capital K) does not match any distances[].id ('10k', lowercase).
//      The old default produced a truthy non-empty string that visually
//      highlighted no card, yet made the `if (!distance)` check in
//      validateForm() return true - so validation passed silently with an
//      invalid distance every single time.
//   b) If a parent component passes a stale or malformed registerData.distance
//      (e.g. from a previous session with different casing), the same bypass
//      would occur. Validating the incoming value against VALID_DISTANCE_IDS
//      before accepting it closes that door too.
//   RESULT: distance starts as null → no card highlighted → user must pick one.
//
// CHANGE 3 - validateForm() distance check changed from:
//     if (!distance) { ... }
//   to:
//     if (!distance || !VALID_DISTANCE_IDS.has(distance)) { ... }
//
//   WHY: A falsy check alone only catches null/undefined/''. Any non-empty
//        string - including the old default '10K', or any value injected via
//        props - would pass. The Set membership check ensures the stored value
//        is actually one of the five known distance IDs and nothing else.
//
// LOOPHOLE AUDIT - all other fields (no changes needed, confirmed solid):
//   name    → trim() + empty check                     ✅
//   email   → trim() + /\S+@\S+\.\S+/ regex           ✅
//   phone   → trim() + /^[6-9]\d{9}$/ regex           ✅
//   address → trim() + empty check                     ✅
//   city    → trim() + empty check                     ✅
//   state   → trim() + empty check                     ✅
//   pincode → trim() + /^\d{6}$/ regex                 ✅
//   distance → was broken (see above), now fixed       ✅
//
// UI: Zero visual changes. The card highlight logic (isSelected = distance === dist.id)
//     already works correctly - with distance=null, no card matches, so nothing
//     is highlighted until the user clicks. No JSX was modified.
// ---------------------------------------------------------------------------


// CHANGE 1: Module-level Set of all valid distance IDs.
// Single source of truth - used in useState init AND validateForm().
// Defined outside the component so it is never recreated on re-renders.
// ---------------------------------------------------------------------------
// CHANGE MADE BY VIKAS - PARTICIPANT DETAILS AND DISCOUNT COUPONS
// ---------------------------------------------------------------------------
// This is a later update. The earlier "zero visual changes" note applies only
// to the distance fix documented above.
//
// 1. Added required gender, age, and employment status fields with validation.
// 2. Added discount coupons. Coupon codes are checked only by the server
//    (`coupon` Edge Function); no coupon list is shipped to the browser.
// 3. Checkout sends the new participant fields and coupon to the Edge Function.
// 4. Price summaries, payment confirmation, and tickets use the final amount.
// 5. The Edge Function remains the authority for the payment order amount.
// ---------------------------------------------------------------------------
const VALID_DISTANCE_IDS = new Set(['1600m', '3k', '5k', '10k', '21k']);
const BASE_PRICE = 499;
const VALID_GENDERS = new Set(['Male', 'Female', 'Other', 'Prefer not to say']);
const VALID_EMPLOYMENT_STATUSES = new Set(['School Student', 'College Student', 'Working Professional']);

const normalizeCoupon = (value = '') => value.trim().replace(/\s+/g, '').toUpperCase();

// Shown as a big button on the "Registration Confirmed" screen.
const WHATSAPP_GROUP_URL = 'https://whatsapp.com/channel/0029VbD5Aj684Om3hsOSTK2N';


export default function Registration({ registerData, setRegisterData, registrationOpen = true }) {
  const [errors, setErrors]             = useState({});
  const [distance, setDistance] = useState(
    VALID_DISTANCE_IDS.has(registerData.distance) ? registerData.distance : null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isValidating, setIsValidating] = useState(
    !!new URLSearchParams(window.location.search).get('order_id')
  );
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentFailed, setPaymentFailed]   = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const ticketAutoDownloaded = useRef(false);
  // Server-confirmed coupon: { input, code, discount }. Only counts while the
  // text box still holds the same code that was checked.
  const [couponResult, setCouponResult] = useState(null);
  const [couponChecking, setCouponChecking] = useState(false);
  const navigate = useNavigate();
  const appliedCoupon =
    couponResult && couponResult.input === normalizeCoupon(registerData.coupon_code || '')
      ? couponResult
      : null;
  const isCouponApplied = Boolean(appliedCoupon);
  const couponDiscount = appliedCoupon?.discount || 0;
  const payableAmount = BASE_PRICE - couponDiscount;
  const displayedAmount = Number(paymentDetails?.amountPaid ?? registerData.amount_paid ?? payableAmount);

  if (!registrationOpen && !isValidating) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">Registrations are Closed</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Registrations for this event are currently closed. Follow us for updates on upcoming events.</p>
          <button onClick={() => navigate('/')} className="font-display font-bold uppercase tracking-wider px-8 py-3 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] transition-colors cursor-pointer">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // On mount: check if returning from PayU (via the payu-return function redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');

    if (!orderId) return;

    // Form data saved before the PayU redirect. It can be missing (different
    // domain, e.g. vercel.app vs www, another browser, cleared storage), so the
    // server's copy of the registration is used as the fallback. Never wait
    // on localStorage alone, or the page spins forever.
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem('paceup_register_data') || 'null');
    } catch {
      saved = null;
    }
    if (saved) {
      setRegisterData(saved);
      setDistance(saved.distance);
    }
    setIsValidating(true);

    const API_URL  = import.meta.env.VITE_API_URL;
    const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    fetch(`${API_URL}/validate`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey':        ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ order_id: orderId }),
      signal: controller.signal,
    })
      .then(async r => {
        const json = await r.json().catch(() => ({}));
        if (r.ok) {
          const reg = json.registration || {};
          const restored = {
            ...(saved || {}),
            name:          saved?.name          || reg.name     || '',
            email:         saved?.email         || reg.email    || '',
            phone:         saved?.phone         || reg.phone    || '',
            distance:      saved?.distance      || reg.distance || '',
            address_line1: saved?.address_line1 || reg.address  || '',
            address_line2: saved?.address_line2 || '',
            address_line3: saved?.address_line3 || '',
            city:          saved?.city          || reg.city     || '',
            state:         saved?.state         || reg.state    || '',
            pincode:       saved?.pincode       || reg.pincode  || '',
            coupon_code:   json.couponCode || '',
            discount_amount: json.discountAmount || 0,
            amount_paid:   json.amountPaid,
          };
          setRegisterData(restored);
          setDistance(restored.distance);
          setPaymentDetails(json);
          setPaymentSuccess(true);
          localStorage.removeItem('paceup_register_data');
        } else {
          setPaymentFailed(true);
        }
        navigate('/register', { replace: true });
      })
      .catch(() => setPaymentFailed(true))
      .finally(() => {
        clearTimeout(timeout);
        setIsValidating(false);
      });
  }, []);

  useEffect(() => {
    if (paymentSuccess) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paymentSuccess]);

  const distances = [
    { id: '1600m', label: '1600m Run',     desc: 'Perfect short-distance challenge for beginners and speed practice' },
    { id: '3k',    label: '3K Run',        desc: 'Light endurance run for beginners building stamina' },
    { id: '5k',    label: '5K Run',        desc: 'Popular fitness distance for all-level runners' },
    { id: '10k',   label: '10K Challenge', desc: 'Intermediate endurance challenge for regular runners' },
    { id: '21k',   label: '21K',           desc: 'Half-marathon milestone for experienced and dedicated runners' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};

    if (!registerData.name?.trim())
      tempErrors.name = 'Full Name is required for trophy engraving';

    if (!registerData.email?.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!registerData.phone?.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(registerData.phone.replace(/\s+/g, ''))) {
      tempErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!VALID_GENDERS.has(registerData.gender))
      tempErrors.gender = 'Please select your gender';

    const age = Number(registerData.age);
    if (!Number.isInteger(age) || age < 5 || age > 100)
      tempErrors.age = 'Please enter an age between 5 and 100';

    if (!VALID_EMPLOYMENT_STATUSES.has(registerData.employment_status))
      tempErrors.employment_status = 'Please select your employment status';

    if (!registerData.address_line1?.trim())
      tempErrors.address_line1 = 'Address Line 1 is required for courier delivery';

    if (!registerData.city?.trim())
      tempErrors.city = 'City name is required';

    if (!registerData.state?.trim())
      tempErrors.state = 'State name is required';

    if (!registerData.pincode?.trim()) {
      tempErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(registerData.pincode.replace(/\s+/g, ''))) {
      tempErrors.pincode = 'Please enter a valid 6-digit Pincode';
    }

    // CHANGE 3: Dual guard - falsy check AND Set membership check.
    // A truthy-but-invalid string like '10K' passes `!distance` but fails
    // `!VALID_DISTANCE_IDS.has(distance)`, so it is correctly rejected.
    if (!distance || !VALID_DISTANCE_IDS.has(distance)) {
      tempErrors.distance = 'Please select a challenge distance to continue';
    }

    if (registerData.coupon_code?.trim() && !isCouponApplied)
      tempErrors.coupon_code = 'Tap Apply to use this coupon, or clear the box';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Ask the server whether this one coupon code is valid.
  const applyCoupon = async () => {
    const input = normalizeCoupon(registerData.coupon_code || '');
    if (!input) return;
    setCouponChecking(true);
    try {
      const API_URL  = import.meta.env.VITE_API_URL;
      const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const response = await fetch(`${API_URL}/coupon`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey':        ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({ code: registerData.coupon_code }),
      });
      const data = response.ok ? await response.json() : null;
      if (data?.valid && Number(data.discount) > 0) {
        setCouponResult({ input, code: data.code, discount: Number(data.discount) });
        setErrors(prev => ({ ...prev, coupon_code: '' }));
      } else {
        setCouponResult(null);
        setErrors(prev => ({ ...prev, coupon_code: 'Invalid coupon code' }));
      }
    } catch {
      setCouponResult(null);
      setErrors(prev => ({ ...prev, coupon_code: 'Could not check coupon. Please try again.' }));
    } finally {
      setCouponChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const finalData = { ...registerData, distance };
    setRegisterData(finalData);
    setIsProcessing(true);

    try {
      const API_URL  = import.meta.env.VITE_API_URL;
      const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const orderResponse = await fetch(`${API_URL}/order`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey':        ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({
          customer_name:  finalData.name,
          customer_email: finalData.email,
          customer_phone: finalData.phone,
          address:        [finalData.address_line1, finalData.address_line2, finalData.address_line3].filter(Boolean).join(', '),
          city:           finalData.city,
          state:          finalData.state,
          pincode:        finalData.pincode,
          distance:       finalData.distance,
          gender:         finalData.gender,
          age:            Number(finalData.age),
          employment_status: finalData.employment_status,
          coupon_code:    finalData.coupon_code,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error(`Order creation failed: ${orderResponse.status}`);
      }

      const orderData = await orderResponse.json();
      const checkoutData = {
        ...finalData,
        coupon_code: orderData.coupon_code || '',
        discount_amount: orderData.discount_amount || 0,
        amount_paid: orderData.amount,
      };
      setRegisterData(checkoutData);

      // Save form data before redirect (PayU navigates away)
      localStorage.setItem('paceup_register_data', JSON.stringify(checkoutData));

      if (!orderData.payu_url || !orderData.payu_params) {
        throw new Error('Payment details missing from order response');
      }

      // PayU checkout: POST the signed fields to PayU's hosted payment page.
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = orderData.payu_url;
      Object.entries(orderData.payu_params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong while initiating payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const downloadTicket = () => {
    const W = 900, H = 560, S = 2;
    const canvas = document.createElement('canvas');
    canvas.width  = W * S;
    canvas.height = H * S;
    const ctx = canvas.getContext('2d');
    ctx.scale(S, S);

    const navy  = '#0B1A35';
    const dark  = '#071020';
    const gold  = '#F5A800';
    const white = '#FFFFFF';
    const slate = '#94A3B8';
    const light = '#CBD5E1';
    const green = '#22C55E';
    const panel = '#0F2040';

    // Rounded background clip
    const r = 16;
    ctx.beginPath();
    ctx.moveTo(r, 0); ctx.lineTo(W - r, 0);
    ctx.quadraticCurveTo(W, 0, W, r);
    ctx.lineTo(W, H - r);
    ctx.quadraticCurveTo(W, H, W - r, H);
    ctx.lineTo(r, H);
    ctx.quadraticCurveTo(0, H, 0, H - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fillStyle = navy;
    ctx.fill();
    ctx.clip();

    // Gold top stripe
    ctx.fillStyle = gold;
    ctx.fillRect(0, 0, W, 5);

    // ── HEADER ──
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillStyle = white;
    ctx.fillText('PACEUP', 40, 58);
    const pw = ctx.measureText('PACEUP').width;
    ctx.fillStyle = gold;
    ctx.fillText('RUN', 40 + pw + 7, 58);

    ctx.fillStyle = slate;
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText("Run for India's Glory 2026  -  Virtual Challenge", 40, 80);

    // Divider
    ctx.strokeStyle = panel;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(40, 100); ctx.lineTo(W - 40, 100); ctx.stroke();

    // ── CONFIRMED BADGE ──
    ctx.fillStyle = green;
    ctx.beginPath(); ctx.arc(57, 138, 16, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = white; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(49, 138); ctx.lineTo(55, 145); ctx.lineTo(66, 130); ctx.stroke();

    ctx.fillStyle = gold;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('REGISTRATION CONFIRMED', 84, 143);

    // ── NAME ──
    ctx.fillStyle = white;
    ctx.font = 'bold 34px system-ui, sans-serif';
    const displayName = (registerData.name || '').toUpperCase();
    ctx.fillText(displayName, 40, 200);

    ctx.fillStyle = slate;
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(registerData.email || '', 40, 222);

    // ── INFO GRID ──
    const cols   = [40, 230, 430, 650];
    const labelY = 268, valY = 290;
    const labels = ['DISTANCE', 'PHONE', 'AMOUNT PAID', 'DATE'];
    const values = [
      (registerData.distance || '').toUpperCase(),
      registerData.phone || '-',
      `₹${displayedAmount.toFixed(2)}`,
      new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    ];

    labels.forEach((lbl, i) => {
      ctx.fillStyle = slate;
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText(lbl, cols[i], labelY);

      ctx.fillStyle = i === 2 ? green : white;
      ctx.font = `bold 17px system-ui, sans-serif`;
      ctx.fillText(values[i], cols[i], valY);
    });

    // ── DASHED PERFORATION ──
    ctx.strokeStyle = '#1E3A5F';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(40, 318); ctx.lineTo(W - 40, 318); ctx.stroke();
    ctx.setLineDash([]);

    // ── PAYMENT IDs ──
    ctx.fillStyle = slate; ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('ORDER ID', 40, 345);
    ctx.fillText('PAYMENT ID', 470, 345);

    ctx.fillStyle = light; ctx.font = '12px monospace';
    ctx.fillText(paymentDetails?.orderId || '-', 40, 363);
    ctx.fillText(paymentDetails?.paymentId || '-', 470, 363);

    // ── SHIPPING ──
    ctx.fillStyle = slate; ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('SHIPPING TO', 40, 395);

    ctx.fillStyle = white; ctx.font = '13px system-ui, sans-serif';
    const addr = `${registerData.address_line1 || ''}, ${registerData.address_line2 || ''}, ${registerData.address_line3 || ''}, ${registerData.city || ''}, ${registerData.state || ''} - ${registerData.pincode || ''}`;
    ctx.fillText(addr, 40, 413, W - 80);

    // ── FOOTER ──
    ctx.fillStyle = dark;
    ctx.fillRect(0, H - 52, W, 52);

    ctx.fillStyle = gold; ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('paceuprunofficial@gmail.com', 40, H - 18);

    ctx.fillStyle = slate; ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Official Registration Proof  •  paceuprun.com', W - 40, H - 18);
    ctx.textAlign = 'left';

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `PaceUp-Ticket-${registerData.name || 'Registration'}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revoking immediately can cancel the download on some mobile browsers.
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  };

  // Auto-download the registration ticket once, right after payment is verified.
  useEffect(() => {
    if (!paymentSuccess || ticketAutoDownloaded.current) return;
    ticketAutoDownloaded.current = true;
    const timer = setTimeout(() => downloadTicket(), 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentSuccess]);

  if (isValidating) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4">
        <Loader2 className="h-14 w-14 animate-spin text-accent-gold" />
        <div className="space-y-2">
          <p className="font-display font-bold text-xl text-primary-navy dark:text-white">Verifying Payment…</p>
          <p className="text-slate-400 text-sm">Please wait, do not close this tab.</p>
        </div>
      </div>
    );
  }

  if (paymentFailed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <XCircle className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
          Payment Failed
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Your payment was not completed or was cancelled. No amount has been deducted.
        </p>
        <button
          onClick={() => { setPaymentFailed(false); localStorage.removeItem('paceup_register_data'); }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
        >
          Try Again
        </button>
        <p className="text-xs text-slate-400">
          If money was deducted, contact us at{' '}
          <a href="mailto:paceuprunofficial@gmail.com" className="underline">paceuprunofficial@gmail.com</a>
        </p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
          Registration Confirmed!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Thank you, <span className="font-semibold text-primary-navy dark:text-white">{registerData.name}</span>!
          Your payment was successful and your spot in the Run for India's Glory 2026 is secured.
        </p>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 text-left shadow-md">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Booking Details</p>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Order ID</span>
            <span className="font-mono text-primary-navy dark:text-white">{paymentDetails?.orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Payment ID</span>
            <span className="font-mono text-primary-navy dark:text-white">{paymentDetails?.paymentId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Distance</span>
            <span className="font-semibold text-primary-navy dark:text-white uppercase">{registerData.distance}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Amount Paid</span>
            <span className="font-semibold text-green-600">₹{displayedAmount.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          A confirmation will be sent to <span className="font-medium">{registerData.email}</span>.
          Your trophy will be shipped to {registerData.city}, {registerData.state} – {registerData.pincode}.
        </p>

        {/* WhatsApp updates - big, prominent call to action */}
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-2xl bg-green-500 hover:bg-green-400 text-white px-6 py-5 sm:py-6 shadow-lg shadow-green-500/30 ring-4 ring-green-500/20 transition-colors"
        >
          <span className="flex items-center justify-center gap-3">
            <svg className="h-8 w-8 sm:h-9 sm:w-9 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="font-display font-black uppercase tracking-wide text-lg sm:text-2xl">
              Join WhatsApp for Updates
            </span>
          </span>
          <span className="block mt-1 text-sm text-white/90">
            Run dates, proof submission and trophy shipping updates come here first.
          </span>
        </a>

        <p className="text-xs text-slate-400">
          Your registration ticket has been downloaded. Didn't get it? Use the button below.
        </p>

        <button
          onClick={downloadTicket}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Registration Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in text-left">

      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
          Event Registration
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base">
          Fill in your details below to register for the Run for India's Glory 2026 – Virtual Challenge. Your participation will be honored with a premium themed acrylic trophy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Form Panel */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">

          <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent-gold" />
            <span>Runner Information</span>
          </h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registerData.name || ''}
                  onChange={handleInputChange}
                  placeholder="name"
                  maxLength={25}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                    errors.name
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={registerData.email || ''}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.email
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={registerData.phone || ''}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.phone
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="gender" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={registerData.gender || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                    errors.gender
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="5"
                  max="100"
                  step="1"
                  value={registerData.age || ''}
                  onChange={handleInputChange}
                  placeholder="Age"
                  className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                    errors.age
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                  }`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <label htmlFor="employment_status" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Employment Status *
                </label>
                <select
                  id="employment_status"
                  name="employment_status"
                  value={registerData.employment_status || ''}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                    errors.employment_status
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                  }`}
                >
                  <option value="">Select status</option>
                  <option value="School Student">School Student</option>
                  <option value="College Student">College Student</option>
                  <option value="Working Professional">Working Professional</option>
                </select>
                {errors.employment_status && <p className="text-red-500 text-xs mt-1">{errors.employment_status}</p>}
              </div>
            </div>
          </div>

          {/* Distance Selection */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
              Select Challenge Distance *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {distances.map((dist) => {
                const isSelected = distance === dist.id;
                return (
                  <div
                    key={dist.id}
                    onClick={() => {
                      setDistance(dist.id);
                      if (errors.distance) {
                        setErrors(prev => ({ ...prev, distance: '' }));
                      }
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary-royal bg-primary-royal dark:border-accent-gold dark:bg-accent-gold'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-850/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-display font-extrabold text-lg transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-900 dark:text-black'
                        }`}
                      >
                        {dist.label}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-white bg-white' : 'border-slate-400'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-royal"></div>
                        )}
                      </span>
                    </div>
                    <span
                      className={`text-xs mt-1 transition-colors ${
                        isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {dist.desc}
                    </span>
                  </div>
                );
              })}
            </div>
            {errors.distance && (
              <p className="text-red-500 text-xs mt-1">{errors.distance}</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="font-display font-bold text-xl text-primary-navy dark:text-white pb-1 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-accent-gold" />
              <span>Courier Delivery Address</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Physical Address (House / Office / Area) *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="address_line1"
                    value={registerData.address_line1 || ''}
                    onChange={handleInputChange}
                    placeholder="Address Line 1 (House No, Building)"
                    maxLength={30}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.address_line1
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                  <input
                    type="text"
                    name="address_line2"
                    value={registerData.address_line2 || ''}
                    onChange={handleInputChange}
                    placeholder="Address Line 2 (Street, Area)"
                    maxLength={30}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.address_line2
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                  <input
                    type="text"
                    name="address_line3"
                    value={registerData.address_line3 || ''}
                    onChange={handleInputChange}
                    placeholder="Address Line 3 (Landmark)"
                    maxLength={30}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.address_line3
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                </div>
                {(errors.address_line1) && <p className="text-red-500 text-xs mt-1">{errors.address_line1}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={registerData.city || ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.city
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={registerData.state || ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.state
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={registerData.pincode || ''}
                    onChange={handleInputChange}
                    maxLength={6}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm ${
                      errors.pincode
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                    }`}
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label htmlFor="coupon_code" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
              Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="coupon_code"
                name="coupon_code"
                value={registerData.coupon_code || ''}
                onChange={handleInputChange}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); } }}
                placeholder="Enter coupon code"
                maxLength={20}
                className={`flex-1 min-w-0 px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm  ${
                  errors.coupon_code
                    ? 'border-red-500 dark:border-red-500'
                    : isCouponApplied
                      ? 'border-green-500 dark:border-green-500'
                      : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                }`}
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={couponChecking || !registerData.coupon_code?.trim() || isCouponApplied}
                className="shrink-0 px-5 py-3 rounded-xl bg-primary-navy dark:bg-accent-gold text-white dark:text-primary-navy font-bold text-sm uppercase tracking-wider transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {couponChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : isCouponApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {errors.coupon_code && <p className="text-red-500 text-xs">{errors.coupon_code}</p>}
            {isCouponApplied && !errors.coupon_code && (
              <p className="text-green-600 dark:text-green-400 text-xs font-semibold">
                {appliedCoupon.code} applied. You saved ₹{couponDiscount}.
              </p>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 font-display font-bold uppercase tracking-wider text-center
              py-4 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600
               hover:from-yellow-400 hover:to-accent-gold text-primary-navy
               shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5
                transition-all duration-200 flex items-center justify-center space-x-2
                disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing Payment…</span>
                </>
              ) : (
                <>
                  <span>Proceed to Checkout (₹{payableAmount})</span>
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </button>

          </div>

        </form>

        {/* Right Info Sidebar - unchanged */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-base text-primary-navy dark:text-white">
              ₹{BASE_PRICE} Package Inclusions
            </h3>

            <div className="space-y-3 text-xs text-slate-650 dark:text-slate-350">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                <span>Theme-Based Premium Trophy and Sticker Pack.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                <span>Digital E-Certificate for download immediately on run validation.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                <span>Free Insured Delivery directly to your doorstep.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                <span>Pan-India shipping coverage (no regional fee additions).</span>
              </div>
            </div>

            {isCouponApplied && (
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Registration fee</span>
                  <span className="text-slate-500 dark:text-slate-300">₹{BASE_PRICE}.00</span>
                </div>
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>{appliedCoupon.code} discount</span>
                  <span>-₹{couponDiscount}.00</span>
                </div>
              </div>
            )}

            <div className={`${isCouponApplied ? '' : 'border-t border-slate-200 dark:border-slate-800 pt-3'} flex justify-between items-center text-xs`}>
              <span className="text-slate-400">Total Price:</span>
              <span className="font-display font-black text-lg text-primary-navy dark:text-white">₹{payableAmount}.00</span>
            </div>
          </div>

          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start space-x-3 bg-slate-50 dark:bg-slate-900/50">
            <Award className="h-6 w-6 text-primary-blue dark:text-accent-gold shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs text-primary-navy dark:text-white">Secure Checkout Guarantee</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Your payment is processed through a secure, encrypted system. We use safe and trusted payment gateways for all transactions.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

