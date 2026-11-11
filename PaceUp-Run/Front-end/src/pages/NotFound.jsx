import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Shown for any URL that is not a real page, e.g. /abc or /register/xyz.
export default function NotFound() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const previous = document.title;
    document.title = 'Page Not Found | PaceUp Run';
    // Keep search engines from indexing made-up URLs.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.title = previous;
      meta.remove();
    };
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="text-center space-y-6 max-w-md">
        <p className="font-display font-black text-7xl sm:text-8xl text-accent-gold leading-none">404</p>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
          Page Not Found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm break-words">
          The page <span className="font-mono text-slate-600 dark:text-slate-300">{pathname}</span> doesn't exist.
          It may have been moved, or the link may be wrong.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="font-display font-bold uppercase tracking-wider px-8 py-3 rounded-xl bg-accent-gold hover:bg-yellow-400 text-[#040D1D] transition-colors cursor-pointer"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate('/event')}
            className="font-display font-bold uppercase tracking-wider px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-primary-navy dark:text-white hover:border-accent-gold transition-colors cursor-pointer"
          >
            View Event
          </button>
        </div>
      </div>
    </div>
  );
}
