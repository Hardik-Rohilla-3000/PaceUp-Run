import React, { useState, useEffect } from 'react';
import { Shield, Lock, Loader2, Mail, LogOut } from 'lucide-react';

const SESSION_KEY = 'pa_admin_v1';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export default function AdminAccess() {
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers]                     = useState([]);
  const [error, setError]                     = useState('');
  const [isLoading, setIsLoading]             = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const callAdminData = (em, pw) =>
    fetch(`${import.meta.env.VITE_API_URL}/admin-data`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey':        import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email: em, password: pw }),
    });

  // Restore session on mount
  useEffect(() => {
    const restore = async () => {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) { setCheckingSession(false); return; }
      try {
        const { email: em, password: pw, expiry } = JSON.parse(raw);
        if (Date.now() >= expiry) {
          localStorage.removeItem(SESSION_KEY);
          setCheckingSession(false);
          return;
        }
        const res = await callAdminData(em, pw);
        if (res.ok) {
          setUsers(await res.json());
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
      setCheckingSession(false);
    };
    restore();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await callAdminData(email, password);
      if (res.status === 401) { setError('Incorrect email or password.'); return; }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        email, password, expiry: Date.now() + SESSION_TTL,
      }));
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setUsers([]);
    setEmail('');
    setPassword('');
  };

  if (checkingSession) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-14 h-14 bg-primary-navy dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                <Shield className="h-7 w-7 text-accent-gold" />
              </div>
            </div>
            <h1 className="font-display font-black text-xl text-primary-navy dark:text-white">Admin Access</h1>
            <p className="text-xs text-slate-400">Restricted area. Authorized personnel only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors duration-200"
              />
            </div>

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 rounded-xl bg-primary-navy dark:bg-accent-gold text-white dark:text-primary-navy font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
            >
              {isLoading
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</>
                : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
            Admin Panel
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {users.length} registered participant{users.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
            <Shield className="h-3.5 w-3.5" />
            Authenticated
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-24 text-slate-400 text-sm">No registrations yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function UserCard({ user, index }) {
  const registeredAt = user.created_at
    ? new Date(user.created_at).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '—';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-navy dark:bg-slate-700 flex items-center justify-center text-sm font-black text-white shrink-0">
            {index + 1}
          </div>
          <div>
            <p className="font-bold text-sm text-primary-navy dark:text-white">{user.name}</p>
            <p className="text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full uppercase">
            {user.distance || '—'}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            user.payment_status === 'paid'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {user.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
          </span>
        </div>
      </div>

      <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <Field label="Phone"   value={user.phone} />
        <Field label="City"    value={user.city} />
        <Field label="State"   value={user.state} />
        <Field label="Pincode" value={user.pincode} />
        <Field label="Registered" value={registeredAt} />
        <div className="col-span-2 sm:col-span-3">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Address</p>
          <p className="text-sm text-primary-navy dark:text-white font-medium">{user.address || '—'}</p>
        </div>
        <div className="col-span-2 sm:col-span-3 border-t border-slate-100 dark:border-slate-800 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Razorpay Order ID"   value={user.razorpay_order_id}   mono />
          <Field label="Razorpay Payment ID" value={user.razorpay_payment_id} mono />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">{label}</p>
      <p className={`text-primary-navy dark:text-white ${mono ? 'font-mono text-xs break-all' : 'text-sm font-medium'}`}>
        {value || '—'}
      </p>
    </div>
  );
}
