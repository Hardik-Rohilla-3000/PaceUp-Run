import React, { useState, useEffect } from 'react';
import { Shield, Lock, Loader2, Mail, LogOut, Trash2 } from 'lucide-react';

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
  const [credentials, setCredentials]         = useState({ email: '', password: '' });
  const [deleteTarget, setDeleteTarget]       = useState(null);
  const [isDeleting, setIsDeleting]           = useState(false);

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
          setCredentials({ email: em, password: pw });
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
      setCredentials({ email, password });
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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin-delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey':        import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password, id: deleteTarget.id }),
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert('Delete failed. Try again.');
      }
    } catch {
      alert('Something went wrong.');
    } finally {
      setIsDeleting(false);
    }
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

  const paid    = users.filter(u => u.payment_status === 'paid');
  const pending = users.filter(u => u.payment_status === 'pending');

  const confirmModal = deleteTarget && (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <Trash2 className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="font-bold text-sm text-primary-navy dark:text-white">Delete Registration?</p>
            <p className="text-xs text-slate-400 mt-0.5">{deleteTarget.name}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Yeh action undo nahi hoga. Database se permanently delete ho jayega.
        </p>
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => setDeleteTarget(null)}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {confirmModal}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
            Admin Panel
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {paid.length} paid · {pending.length} pending
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

      {/* Paid Registrations */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
          Confirmed Registrations ({paid.length})
        </h2>
        {paid.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">No paid registrations yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {paid.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} onDelete={() => setDeleteTarget(user)} />
            ))}
          </div>
        )}
      </div>

      {/* Draft / Pending */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
          Draft Payments ({pending.length})
        </h2>
        <p className="text-xs text-slate-400 -mt-2">Form bhara, payment ka pata nahi — inhe contact karo.</p>
        {pending.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">No pending payments.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pending.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} isDraft onDelete={() => setDeleteTarget(user)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserCard({ user, index, isDraft = false, onDelete }) {
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
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
          }`}>
            {user.payment_status === 'paid' ? 'Paid' : 'Pending'}
          </span>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
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
          <Field label="Cashfree Order ID" value={user.cashfree_order_id} mono />
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
