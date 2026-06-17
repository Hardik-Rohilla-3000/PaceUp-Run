// import React, { useState } from 'react';
// import { Sun, Moon, Menu, X, Trophy } from 'lucide-react';

// export default function Navbar({ currentPage, setPage, darkMode, setDarkMode }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'event', label: 'Event' },
//     { id: 'how-it-works', label: 'How It Works' },
//     { id: 'faq', label: 'FAQ' },
//   ];

//   const handleNavClick = (pageId) => {
//     setPage(pageId);
//     setMobileMenuOpen(false);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-slate-200/50 dark:border-slate-800/50
//      bg-white/80 dark:bg-[#081B3A]/80 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 sm:h-20">
          
//           {/* Logo Section */}
//           <div 
//             onClick={() => handleNavClick('home')} 
//             className="flex items-center space-x-2 cursor-pointer group"
//           >
//             <div className="p-2 bg-gradient-to-br from-primary-royal to-blue-600 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
//               <Trophy className="h-6 w-6 text-accent-gold" />
//             </div>
//             <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-primary-navy dark:text-white">
//               PACEUP<span className="text-primary-blue dark:text-accent-gold">RUN</span>
//             </span>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavClick(item.id)}
//                 className={`font-display text-md font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
//                   currentPage === item.id || (item.id === 'event' && currentPage === 'details')
//                     ? 'text-primary-royal dark:text-accent-gold border-b-2 border-primary-royal dark:border-accent-gold pb-1'
//                     : 'text-slate-600 dark:text-slate-300 hover:text-primary-royal dark:hover:text-accent-gold'
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* Right Action Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Theme Toggle Button */}
//             {/* <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors duration-200 cursor-pointer"
//               aria-label="Toggle Theme"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-accent-gold" /> : <Moon className="h-5 w-5 text-primary-navy" />}
//             </button> */}

//             {/* CTA Button */}
//             <button
//               onClick={() => handleNavClick('register')}
//               className="font-display text-sm font-bold tracking-wider uppercase px-6 py-2.5 rounded-full bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
//             >
//               Join Challenge
//             </button>
//           </div>

//           {/* Mobile menu controls */}
//           <div className="flex md:hidden items-center space-x-3">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
//               aria-label="Toggle Theme"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-accent-gold" /> : <Moon className="h-5 w-5 text-primary-navy" />}
//             </button>

//             {/* <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
//               aria-label="Toggle Menu"
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button> */}
//           </div>

//         </div>
//       </div>

//       {/* Mobile Drawer menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden w-full transition-all duration-300 ease-in border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#081B3A] shadow-xl">
//           <div className="px-4 pt-2 pb-6 space-y-3">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => handleNavClick(item.id)}
//                 className={`block w-full text-left px-4 py-3 rounded-lg font-display text-base font-semibold transition-all duration-200 ${
//                   currentPage === item.id || (item.id === 'event' && currentPage === 'details')
//                     ? 'bg-slate-100 dark:bg-slate-800 text-primary-royal dark:text-accent-gold'
//                     : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
            
//             <div className="pt-4 px-4">
//               <button
//                 onClick={() => handleNavClick('register')}
//                 className="block w-full font-display text-center font-bold tracking-wider uppercase py-3 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 text-primary-navy shadow-lg shadow-yellow-500/10 cursor-pointer"
//               >
//                 Join Challenge
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }









import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'event', label: 'Event', path: '/event' },
    { id: 'how-it-works', label: 'How It Works', path: '/how-it-works' },
    { id: 'faq', label: 'FAQ', path: '/faq' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if a nav item is active based on current URL pathname
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    // Highlight "Event" for both /event and /details
    if (path === '/event') return location.pathname === '/event' || location.pathname === '/details';
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-slate-200/50 dark:border-slate-800/50
     bg-white/80 dark:bg-[#081B3A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo Section */}
         <div
  onClick={() => handleNavClick('/')}
  className="flex items-center space-x-2 cursor-pointer group"
>
  {/* <div className="p-2 bg-gradient-to-br from-primary-royal to-blue-600 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
    <Trophy className="h-6 w-6 text-accent-gold" />
  </div> */}
   <img
    src="/favicon.png"
    alt="PACEUPRUN"
    className="h-12 w-auto object-contain"
  />

  <img
    src="/logotext.png"
    alt="PACEUPRUN"
    className="h-6 w-auto object-contain"
  />
</div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`font-display text-md font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive(item.path)
                    ? 'text-primary-royal dark:text-accent-gold border-b-2 border-primary-royal dark:border-accent-gold pb-1'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-royal dark:hover:text-accent-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('/register')}
              className="font-display text-sm font-bold tracking-wider uppercase px-6 py-2.5 
              rounded-full bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-400 hover:to-accent-gold text-primary-navy shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              Join Challenge
            </button>
          </div>

          {/* Mobile menu controls */}
          <div className="flex md:hidden items-center space-x-3">
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-5 w-5 text-accent-gold" /> : <Moon className="h-5 w-5 text-primary-navy" />}
            </button> */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full transition-all duration-300 ease-in border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#081B3A] shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-display text-base font-semibold transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-slate-100 dark:bg-slate-800 text-primary-royal dark:text-accent-gold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 px-4">
              <button
                onClick={() => handleNavClick('/register')}
                className="block w-full font-display text-center font-bold tracking-wider uppercase py-3 rounded-xl bg-gradient-to-r from-accent-gold to-yellow-600 text-primary-navy shadow-lg shadow-yellow-500/10 cursor-pointer"
              >
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}