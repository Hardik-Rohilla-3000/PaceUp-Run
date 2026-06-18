// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, Search, MessageSquare, ShieldAlert, Award } from 'lucide-react';

// export default function FAQ() {
//   const [activeId, setActiveId] = useState(null);
//   const [activeCategory, setActiveCategory] = useState('all');

//   const categories = [
//     { id: 'all', label: 'All FAQs' },
//     { id: 'general', label: 'General Info' },
//     { id: 'tracking', label: 'Tracking & Apps' },
//     { id: 'delivery', label: 'Trophy & Shipping' },
//   ];

//   const faqs = [
//     {
//       id: 1,
//       category: 'general',
//       question: 'What is a virtual run?',
//       answer: 'A virtual run is a self-paced running event that allows you to participate from any location. Unlike conventional marathons with crowded starting lines, you select your own starting point, time, and pace. You can run inside your local neighborhood, on a treadmill, in a park, or on an athletic track. Once you complete the distance, you submit proof to receive your finisher awards.',
//     },
//     {
//       id: 2,
//       category: 'tracking',
//       question: 'How do I submit proof of my run?',
//       answer: 'Submitting proof is extremely simple. Once you complete your run, take a screenshot of your activity details from your mobile GPS running application (or take a photo of the treadmill display screen). The dashboard screenshot must clearly show the date, completed distance, and duration. Upload this image to our validation portal using the link sent in your confirmation email, or log in to your runner profile on our website.',
//     },
//     {
//       id: 3,
//       category: 'delivery',
//       question: 'When will I receive my physical acrylic trophy?',
//       answer: 'After you upload your workout screenshot, our validation staff reviews the submission within 24 to 48 hours. Once approved, your name and running records are sent for custom laser-engraving on the acrylic plate. The personalized trophy is packed and dispatched within 7-14 working days. You will receive an automated Email and SMS/WhatsApp notification containing a courier tracking ID.',
//     },
//     {
//       id: 4,
//       category: 'delivery',
//       question: 'Is shipping free across India?',
//       answer: 'Yes! Free shipping is included with your ₹399 entry fee. There are absolutely no hidden delivery costs, packing surcharges, or regional logistics fees. We ship to all valid pin codes across India through leading shipping partners like BlueDart, Delhivery, and DTDC.',
//     },
//     {
//       id: 5,
//       category: 'tracking',
//       question: 'Which running apps and fitness devices can I use?',
//       answer: 'We accept data from any GPS-enabled running application or wearable device. Popular options include Strava, Nike Run Club (NRC), Adidas Running, Garmin Connect, Fitbit, Samsung Health, Apple Health, MapMyRun, and Google Fit. We also accept treadmill panel photos showing your final speed/distance readout.',
//     },
//     {
//       id: 6,
//       category: 'general',
//       question: 'Is there a time limit or pace limit to complete the run?',
//       answer: 'No! There is absolutely no pace limit or rigid time limit to complete your distance. You can run as fast or walk as slowly as you need. You can also split the run across multiple days if you are building up your stamina. The goal is to finish strong at your own convenience.',
//     },
//     // {
//     //   id: 7,
//     //   category: 'general',
//     //   question: 'What is included in the ₹399 entry package?',
//     //   answer: 'The ₹399 package is all-inclusive. It includes: (1) One customized 7-inch acrylic finisher trophy engraved with your name and run achievements, (2) One high-resolution downloadable digital e-certificate, and (3) Free delivery anywhere in India.',
//     // },
//   ];

//   const toggleAccordion = (id) => {
//     if (activeId === id) {
//       setActiveId(null);
//     } else {
//       setActiveId(id);
//     }
//   };

//   const filteredFaqs = faqs.filter(faq => 
//     activeCategory === 'all' || faq.category === activeCategory
//   );

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in text-left">
      
//       {/* Page Header */}
//       <div className="text-center space-y-4">
//         <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
//           Support Desk
//         </span>
//         <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
//           Frequently Asked Questions
//         </h1>
//         <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base text-center">
//           Have questions about registrations, run tracking, or trophy logistics? Find quick answers below.
//         </p>
//       </div>

//       {/* Categories Filtering tabs */}
//       <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => {
//               setActiveCategory(cat.id);
//               setActiveId(null);
//             }}
//             className={`font-display text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
//               activeCategory === cat.id
//                 ? 'bg-primary-navy dark:bg-accent-gold text-white dark:text-[#081B3A] shadow-md shadow-slate-900/10'
//                 : 'text-slate-650 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
//             }`}
//           >
//             {cat.label}
//           </button>
//         ))}
//       </div>

//       {/* Accordions */}
//       <div className="space-y-4">
//         {filteredFaqs.map((faq) => {
//           const isOpen = activeId === faq.id;
//           return (
//             <div 
//               key={faq.id}
//               className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
//             >
//               <button
//                 onClick={() => toggleAccordion(faq.id)}
//                 className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group hover:bg-slate-700  dark:hover:bg-slate-850 transition-colors"
//               >
//                 <span className="font-display font-bold text-base sm:text-lg text-primary-navy dark:text-white pr-4">
//                   {faq.question}
//                 </span>
//                 <span className="shrink-0 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-350 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
//                   {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//                 </span>
//               </button>

//               {/* Collapsible Answer */}
//               {isOpen && (
//                 <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-850 animate-slide-down">
//                   {faq.answer}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Contact Support CTA Box */}
//       <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//         <div className="space-y-2">
//           <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center space-x-2">
//             <MessageSquare className="h-5 w-5 text-accent-gold" />
//             <span>Still have questions?</span>
//           </h3>
//           <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed">
//             Our support team is available via email to assist with runner queries, bulk corporate entries, address updates, and validation concerns.
//           </p>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
//           <a
//             href="paceuprunofficial@gmail.com "
//             className="font-display text-center font-bold text-xs uppercase tracking-widest px-6 py-3 border border-slate-350 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//           >
//             Email Support
//           </a>
//           {/* <a
//             href="tel:+919876543210"
//             className="font-display text-center font-bold text-xs uppercase tracking-widest px-6 py-3 bg-primary-royal hover:bg-blue-600 text-white rounded-xl shadow-md transition-colors"
//           >
//             Call Helpline
//           </a> */}
//         </div>
//       </div>

//     </div>
//   );
// }


















import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'general', label: 'General Info' },
    { id: 'tracking', label: 'Tracking & Apps' },
    { id: 'delivery', label: 'Trophy & Shipping' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: 'What is a virtual run?',
      answer: 'A virtual run is a self-paced running event that allows you to participate from any location. Unlike conventional marathons with crowded starting lines, you select your own starting point, time, and pace. You can run inside your local neighborhood, on a treadmill, in a park, or on an athletic track. Once you complete the distance, you submit proof to receive your finisher awards.',
    },
    {
      id: 2,
      category: 'tracking',
      question: 'How do I submit proof of my run?',
      answer: 'Submitting proof is extremely simple. Once you complete your run, take a screenshot of your activity details from your mobile GPS running application (or take a photo of the treadmill display screen). The dashboard screenshot must clearly show the date, completed distance, and duration. Send your challenge screenshot to our official email address (shared in your confirmation email) for verification.',
    },
    {
      id: 3,
      category: 'delivery',
      question: 'When will I receive my physical acrylic trophy?',
      answer: 'After the event concludes, all verified participants become eligible for the themed acrylic trophy and certificate. Trophies are carefully packed and dispatched within 7–8 days after the event ends. Once your order is shipped, you will receive a SMS notification containing your courier tracking details.',
    },
    {
      id: 4,
      category: 'delivery',
      question: 'Is shipping free across India?',
      answer: 'Yes! Free shipping is included with your ₹399 entry fee. There are absolutely no hidden delivery costs, packing surcharges, or regional logistics fees. We ship to all valid pin codes across India through India Post.',
    },
    {
      id: 5,
      category: 'tracking',
      question: 'Which running apps and fitness devices can I use?',
      answer: 'We accept data from any GPS-enabled running application or wearable device. Popular options include Strava, Nike Run Club (NRC), Adidas Running, Garmin Connect, Fitbit, Samsung Health, Apple Health, MapMyRun, and Google Fit. We also accept treadmill panel photos showing your final speed/distance readout.',
    },
    {
      id: 6,
      category: 'general',
      question: 'Is there a time limit or pace limit to complete the run?',
      answer: 'No! There is absolutely no pace limit or rigid time limit to complete your distance. You can run as fast or walk as slowly as you need. The goal is to finish strong at your own convenience.',
    },
  ];

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq =>
    activeCategory === 'all' || faq.category === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in text-left">

      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="font-display font-bold text-xs tracking-widest text-primary-royal dark:text-accent-gold uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
          Support Desk
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-primary-navy dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base text-center">
          Have questions about registrations, run tracking, or trophy logistics? Find quick answers below.
        </p>
      </div>

      {/* Categories Filtering tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setActiveId(null);
            }}
            className={`font-display text-sm font-semibold tracking-wider uppercase px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-primary-navy dark:bg-accent-gold text-white dark:text-[#081B3A] shadow-md shadow-slate-900/10'
                : 'text-slate-650 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = activeId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group hover:bg-slate-700 dark:hover:bg-slate-850 transition-colors"
              >
                <span className="font-display font-bold text-base sm:text-lg text-primary-navy dark:text-white pr-4">
                  {faq.question}
                </span>
                <span className="shrink-0 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-350 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </span>
              </button>

              {/* Collapsible Answer */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-850 animate-slide-down">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support CTA Box */}
      <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
          <h3 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-accent-gold" />
            <span>Still have questions?</span>
          </h3>
          <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed">
            Our support team is available via email to assist with runner queries, bulk corporate entries, address updates, and validation concerns.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <a
            href="mailto:paceuprunofficial@gmail.com"
            className="font-display text-center font-bold text-xs uppercase tracking-widest px-6 py-3 bg-accent-gold text-primary-navy rounded-xl hover:opacity-90 transition-opacity"
          >
            Email Support
          </a>
        </div>
      </div>

    </div>
  );
}