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
//               ₹399 Package Inclusions
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
//               <span className="font-display font-black text-lg text-primary-navy dark:text-white">₹399.00</span>
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























import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, CheckCircle2, ChevronRight, Award, Trophy, Loader2, XCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// CHANGE LOG (this session — distance fix + full loophole audit)
// ---------------------------------------------------------------------------
//
// CHANGE 1 — VALID_DISTANCE_IDS constant (new, outside component)
//   WHY: The distances array only exists inside the component, recreated every
//        render. Extracting the valid IDs as a module-level Set gives us a
//        single source of truth we can use both in useState initialisation AND
//        in validateForm() — without creating the array twice or risking
//        the two lists drifting out of sync.
//
// CHANGE 2 — useState initialisation changed from:
//     useState(registerData.distance || '10K')
//   to:
//     useState(VALID_DISTANCE_IDS.has(registerData.distance) ? registerData.distance : null)
//
//   WHY (two problems fixed):
//   a) '10K' (capital K) does not match any distances[].id ('10k', lowercase).
//      The old default produced a truthy non-empty string that visually
//      highlighted no card, yet made the `if (!distance)` check in
//      validateForm() return true — so validation passed silently with an
//      invalid distance every single time.
//   b) If a parent component passes a stale or malformed registerData.distance
//      (e.g. from a previous session with different casing), the same bypass
//      would occur. Validating the incoming value against VALID_DISTANCE_IDS
//      before accepting it closes that door too.
//   RESULT: distance starts as null → no card highlighted → user must pick one.
//
// CHANGE 3 — validateForm() distance check changed from:
//     if (!distance) { ... }
//   to:
//     if (!distance || !VALID_DISTANCE_IDS.has(distance)) { ... }
//
//   WHY: A falsy check alone only catches null/undefined/''. Any non-empty
//        string — including the old default '10K', or any value injected via
//        props — would pass. The Set membership check ensures the stored value
//        is actually one of the five known distance IDs and nothing else.
//
// LOOPHOLE AUDIT — all other fields (no changes needed, confirmed solid):
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
//     already works correctly — with distance=null, no card matches, so nothing
//     is highlighted until the user clicks. No JSX was modified.
// ---------------------------------------------------------------------------


// CHANGE 1: Module-level Set of all valid distance IDs.
// Single source of truth — used in useState init AND validateForm().
// Defined outside the component so it is never recreated on re-renders.
const VALID_DISTANCE_IDS = new Set(['1600m', '3k', '5k', '10k', '21k']);


export default function Registration({ registerData, setRegisterData }) {
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
  const navigate = useNavigate();

  // On mount: check if returning from Cashfree redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');

    if (!orderId) return;

    // Restore saved form data
    const saved = localStorage.getItem('paceup_register_data');
    if (saved) {
      const data = JSON.parse(saved);
      setRegisterData(data);
      setDistance(data.distance);
      setIsValidating(true);

      const API_URL  = import.meta.env.VITE_API_URL;
      const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      fetch(`${API_URL}/validate`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey':        ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({ order_id: orderId, ...data }),
      })
        .then(async r => {
          const json = await r.json();
          if (r.ok) {
            setPaymentDetails(json);
            setPaymentSuccess(true);
            localStorage.removeItem('paceup_register_data');
          } else {
            setPaymentFailed(true);
          }
          navigate('/register', { replace: true });
        })
        .catch(() => setPaymentFailed(true))
        .finally(() => setIsValidating(false));
    }
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

    if (!registerData.address?.trim())
      tempErrors.address = 'Detailed shipping address is required for courier delivery';

    if (!registerData.city?.trim())
      tempErrors.city = 'City name is required';

    if (!registerData.state?.trim())
      tempErrors.state = 'State name is required';

    if (!registerData.pincode?.trim()) {
      tempErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(registerData.pincode.replace(/\s+/g, ''))) {
      tempErrors.pincode = 'Please enter a valid 6-digit Pincode';
    }

    // CHANGE 3: Dual guard — falsy check AND Set membership check.
    // A truthy-but-invalid string like '10K' passes `!distance` but fails
    // `!VALID_DISTANCE_IDS.has(distance)`, so it is correctly rejected.
    if (!distance || !VALID_DISTANCE_IDS.has(distance)) {
      tempErrors.distance = 'Please select a challenge distance to continue';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
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
        }),
      });

      if (!orderResponse.ok) {
        throw new Error(`Order creation failed: ${orderResponse.status}`);
      }

      const { payment_session_id } = await orderResponse.json();

      // Save form data before redirect (Cashfree navigates away)
      localStorage.setItem('paceup_register_data', JSON.stringify(finalData));

      const cashfree = window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_MODE || 'production',
      });

      cashfree.checkout({
        paymentSessionId: payment_session_id,
        returnUrl: `${window.location.origin}/register?order_id={order_id}&payment_status={payment_status}`,
      });

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
    ctx.fillText("Run for India's Glory 2026  —  Virtual Challenge", 40, 80);

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
      registerData.phone || '—',
      '₹399.00',
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
    ctx.fillText(paymentDetails?.orderId || '—', 40, 363);
    ctx.fillText(paymentDetails?.paymentId || '—', 470, 363);

    // ── SHIPPING ──
    ctx.fillStyle = slate; ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('SHIPPING TO', 40, 395);

    ctx.fillStyle = white; ctx.font = '13px system-ui, sans-serif';
    const addr = `${registerData.address || ''}, ${registerData.city || ''}, ${registerData.state || ''} — ${registerData.pincode || ''}`;
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
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

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
            <span className="font-semibold text-green-600">₹399.00</span>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          A confirmation will be sent to <span className="font-medium">{registerData.email}</span>.
          Your trophy will be shipped to {registerData.city}, {registerData.state} – {registerData.pincode}.
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
                <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400 mb-2">
                  Physical Address (House / Office / Area) *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={registerData.address || ''}
                  onChange={handleInputChange}
                  placeholder="Enter full shipping address with street name and landmark"
                  rows={3}
                  className={`w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-850 dark:text-black transition-colors duration-200 outline-none text-sm resize-none ${
                    errors.address
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-slate-200 dark:border-slate-750 focus:border-primary-royal dark:focus:border-accent-gold'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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

          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full font-display font-bold uppercase tracking-wider text-center 
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
                  <span>Proceed to Checkout (₹399)</span>
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

        </form>

        {/* Right Info Sidebar — unchanged */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-base text-primary-navy dark:text-white">
              ₹399 Package Inclusions
            </h3>

            <div className="space-y-3 text-xs text-slate-650 dark:text-slate-350">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                <span>Theme-Based Premium Trophy Crafted for Excellence.</span>
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

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Price:</span>
              <span className="font-display font-black text-lg text-primary-navy dark:text-white">₹399.00</span>
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

