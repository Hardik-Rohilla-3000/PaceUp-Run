// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';





// import Home from './pages/Home';
// import Event from './pages/Event';
// import EventDetails from './pages/EventDetails';
// import HowItWorks from './pages/HowItWorks';
// import FAQ from './pages/FAQ';
// import Registration from './pages/Registration';
// import Payment from './pages/Payment';

// export default function App() {
//   const [darkMode, setDarkMode] = useState(true);

//   const [registerData, setRegisterData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     distance: '10K',
//   });

//   // Apply dark mode styling class to root HTML node
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       document.body.classList.add('bg-[#040D1D]', 'text-slate-100');
//       document.body.classList.remove('bg-slate-50', 'text-slate-900');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.body.classList.add('bg-slate-50', 'text-slate-900');
//       document.body.classList.remove('bg-[#040D1D]', 'text-slate-100');
//     }
//   }, [darkMode]);

//   return (
//     <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-[#040D1D] dark:text-slate-100 transition-colors duration-300">
//       {/* Navbar — reads active route via useLocation internally */}
//       <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

//       {/* Main Content Area */}
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/event" element={<Event />} />
//           <Route path="/details" element={<EventDetails />} />
//           <Route path="/how-it-works" element={<HowItWorks />} />
//           <Route path="/faq" element={<FAQ />} />
//           <Route
//             path="/register"
//             element={
//               <Registration
//                 registerData={registerData}
//                 setRegisterData={setRegisterData}
//               />
//             }
//           />
//           <Route path="/payment" element={<Payment />} />
//           {/* Fallback: redirect unknown routes to home */}
//           <Route path="*" element={<Home />} />
//         </Routes>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }


























// import React, { useState, useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// import Home from './pages/Home';
// import Event from './pages/Event';
// import EventDetails from './pages/EventDetails';
// import HowItWorks from './pages/HowItWorks';
// import FAQ from './pages/FAQ';
// import Registration from './pages/Registration';
// import Payment from './pages/Payment';

// export default function App() {
//   const [darkMode, setDarkMode] = useState(true);

//   const [registerData, setRegisterData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     distance: '10K',
//   });

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       document.body.classList.add('bg-[#040D1D]', 'text-slate-100');
//       document.body.classList.remove('bg-slate-50', 'text-slate-900');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.body.classList.add('bg-slate-50', 'text-slate-900');
//       document.body.classList.remove('bg-[#040D1D]', 'text-slate-100');
//     }
//   }, [darkMode]);

//   return (
//     <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-[#040D1D] dark:text-slate-100 transition-colors duration-300">

//       <Navbar
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route path="/event" element={<Event />} />

//           <Route path="/details" element={<EventDetails />} />

//           <Route path="/how-it-works" element={<HowItWorks />} />

//           <Route path="/faq" element={<FAQ />} />

//           <Route
//             path="/register"
//             element={
//               <Registration
//                 registerData={registerData}
//                 setRegisterData={setRegisterData}
//               />
//             }
//           />

//           <Route
//             path="/payment"
//             element={
//               <Payment
//                 registerData={registerData}
//               />
//             }
//           />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }








import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Event from './pages/Event';
import EventDetails from './pages/EventDetails';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Registration from './pages/Registration';

import AboutUs from './pages/AboutUs';
import AdminAccess from './pages/AdminAccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy'; // Added Refund Policy Import

// Payment import removed — Payment page has been removed from the app.
// Re-add when Razorpay integration is ready:
// import Payment from './pages/Payment';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    distance: '10K',
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-[#040D1D]', 'text-slate-100');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
      document.body.classList.remove('bg-[#040D1D]', 'text-slate-100');
    }
  }, [darkMode]);

  return (
    <>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-[#040D1D] dark:text-slate-100 transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/details" element={<EventDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Dedicated Policy & Info Routes */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} /> {/* Added Refund Policy Route */}

            <Route
              path="/register"
              element={
                <Registration
                  registerData={registerData}
                  setRegisterData={setRegisterData}
                />
              }
            />

            {/* Payment route removed — re-add when Razorpay integration is ready:
            <Route
              path="/payment"
              element={<Payment registerData={registerData} />}
            /> */}

            <Route path="/event/confidential/admin-access" element={<AdminAccess />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}