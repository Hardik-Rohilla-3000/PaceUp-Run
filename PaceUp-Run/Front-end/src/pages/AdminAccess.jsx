import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Lock, Loader2, Mail, LogOut,
  LayoutList, LayoutDashboard, ImageIcon,
  ArrowUpDown, ArrowUp, ArrowDown, Download,
  ExternalLink, ChevronDown, Package, Truck, CheckCircle2, Clock,
  Search, Camera,
} from 'lucide-react';
import * as XLSX from 'xlsx';

const SESSION_KEY = 'pa_admin_v1';
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

const API_URL  = import.meta.env.VITE_API_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function apiHeaders() {
  return {
    'Content-Type': 'application/json',
    'apikey': ANON_KEY,
    'Authorization': `Bearer ${ANON_KEY}`,
  };
}

const DELIVERY_OPTIONS = [
  { value: 'not_shipped', label: 'Not Shipped', color: 'slate'  },
  { value: 'processing',  label: 'Processing',  color: 'blue'   },
  { value: 'shipped',     label: 'Shipped',      color: 'yellow' },
  { value: 'delivered',   label: 'Delivered',    color: 'green'  },
];

function deliveryBadgeClass(status) {
  const map = {
    not_shipped: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
    processing:  'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    shipped:     'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    delivered:   'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  };
  return map[status] || map.not_shipped;
}

// Excel download helper
function downloadExcel(rows, filename = 'paceup-registrations.xlsx') {
  const headers = [
    'Name', 'Email', 'Phone', 'Distance', 'City', 'State', 'Pincode',
    'Address', 'Registered At', 'Payment Status', 'Delivery Status', 'Tracking ID', 'Cashfree Order ID',
  ];
  const data = rows.map(u => ({
    'Name': u.name || '',
    'Email': u.email || '',
    'Phone': u.phone || '',
    'Distance': u.distance || '',
    'City': u.city || '',
    'State': u.state || '',
    'Pincode': u.pincode || '',
    'Address': u.address || '',
    'Registered At': u.created_at ? new Date(u.created_at).toLocaleString('en-IN') : '',
    'Payment Status': u.payment_status || '',
    'Delivery Status': u.delivery_status || 'not_shipped',
    'Tracking ID': u.tracking_id || '',
    'Cashfree Order ID': u.cashfree_order_id || '',
  }));
  const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  ws['!cols'] = headers.map(h => ({ wch: Math.max(h.length, 14) }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registrations');
  XLSX.writeFile(wb, filename);
}

async function downloadAllProofImages(proofs) {
  for (const proof of proofs) {
    if (!proof.screenshot_url) continue;
    const phone = proof.registrations?.phone || proof.email;
    try {
      const resp = await fetch(proof.screenshot_url);
      const blob = await resp.blob();
      const ext = blob.type.includes('png') ? 'png' : 'jpg';
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${phone}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      await new Promise(r => setTimeout(r, 300));
    } catch { /* skip failed */ }
  }
}

async function downloadSingleProofImage(proof) {
  if (!proof.screenshot_url) return;
  const phone = proof.registrations?.phone || proof.email;
  try {
    const resp = await fetch(proof.screenshot_url);
    const blob = await resp.blob();
    const ext = blob.type.includes('png') ? 'png' : 'jpg';
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${phone}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  } catch { /* skip */ }
}

// ─────────────────────────────────────────────
export default function AdminAccess() {
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers]                     = useState([]);
  const [proofs, setProofs]                   = useState([]);
  const [error, setError]                     = useState('');
  const [isLoading, setIsLoading]             = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [credentials, setCredentials]         = useState({ email: '', password: '' });
  const [activeTab, setActiveTab]             = useState('registrations');

  // Dashboard sort & search state
  const [sortKey, setSortKey]   = useState('created_at');
  const [sortDir, setSortDir]   = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [togglingSubmission, setTogglingSubmission] = useState(false);

  const callAdminData = (em, pw) =>
    fetch(`${API_URL}/admin-data`, {
      method: 'POST', headers: apiHeaders(),
      body: JSON.stringify({ email: em, password: pw }),
    });

  const fetchProofs = useCallback(async (em, pw) => {
    try {
      const res = await fetch(`${API_URL}/admin-proofs`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({ email: em, password: pw }),
      });
      if (res.ok) setProofs(await res.json());
    } catch { /* proofs not critical */ }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/get-settings`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({}),
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissionOpen(data.submission_open === 'true');
      }
    } catch { /* settings not critical */ }
  }, []);

  const toggleSubmission = async () => {
    setTogglingSubmission(true);
    const newValue = submissionOpen ? 'false' : 'true';
    try {
      const res = await fetch(`${API_URL}/toggle-setting`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({
          email: credentials.email, password: credentials.password,
          key: 'submission_open', value: newValue,
        }),
      });
      if (res.ok) setSubmissionOpen(!submissionOpen);
    } catch { /* ignore */ }
    setTogglingSubmission(false);
  };

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
          fetchProofs(em, pw);
          fetchSettings();
        } else if (res.status === 401) {
          localStorage.removeItem(SESSION_KEY);
        } else {
          // Network/server error - trust saved session, don't logout
          setIsAuthenticated(true);
          setCredentials({ email: em, password: pw });
        }
      } catch {
        // Network error - trust saved session, don't logout
        setIsAuthenticated(true);
        setCredentials({ email: em, password: pw });
      }
      setCheckingSession(false);
    };
    restore();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); setError('');
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
      fetchProofs(email, password);
      fetchSettings();
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setUsers([]); setProofs([]);
    setEmail(''); setPassword('');
  };

  };

  const handleDeliveryUpdate = async (userId, newStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, delivery_status: newStatus } : u));
    try {
      await fetch(`${API_URL}/update-delivery`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({
          email: credentials.email, password: credentials.password,
          id: userId, delivery_status: newStatus,
        }),
      });
    } catch { /* revert on failure is optional */ }
  };

  const handleTrackingUpdate = (userId, trackingId) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, tracking_id: trackingId, tracking_dirty: true } : u));
  };

  const saveTrackingId = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    try {
      await fetch(`${API_URL}/update-delivery`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({
          email: credentials.email, password: credentials.password,
          id: userId, delivery_status: user.delivery_status || 'not_shipped',
          tracking_id: user.tracking_id || '',
        }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, tracking_dirty: false } : u));
    } catch { alert('Failed to save tracking ID'); }
  };

  // Sort helper
  const sortedUsers = (list) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      let av = a[sortKey] ?? '';
      let bv = b[sortKey] ?? '';
      if (sortKey === 'created_at') {
        return dir * (new Date(av) - new Date(bv));
      }
      return dir * av.toString().localeCompare(bv.toString());
    });
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filterBySearch = (list) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.trim().toLowerCase();
    return list.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.phone || '').includes(q)
    );
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />;
    return sortDir === 'asc'
      ? <ArrowUp className="h-3.5 w-3.5 text-accent-gold" />
      : <ArrowDown className="h-3.5 w-3.5 text-accent-gold" />;
  };

  // ── Loading screen ──
  if (checkingSession) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  // ── Login form ──
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
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Admin email" autoComplete="off"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" autoComplete="off"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            <button type="submit" disabled={isLoading || !email || !password}
              className="w-full py-3 rounded-xl bg-primary-navy dark:bg-accent-gold text-white dark:text-primary-navy font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
            >
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying…</> : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const SEASON1_CUTOFF = new Date('2026-08-07T00:00:00+05:30');

  const paid    = users.filter(u => u.payment_status === 'paid');
  const pending = users.filter(u => u.payment_status === 'pending');
  const newPaid = paid.filter(u => new Date(u.created_at) >= SEASON1_CUTOFF);
  const oldPaid = paid.filter(u => new Date(u.created_at) < SEASON1_CUTOFF);


  // Proof image lightbox
  const imageLightbox = proofImage && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setProofImage(null)}
    >
      <img src={proofImage} alt="proof" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl" />
    </div>
  );

  const TABS = [
    { id: 'registrations', label: 'Overview', icon: LayoutList },
    { id: 'dashboard',     label: 'Registrations', icon: LayoutDashboard },
    { id: 'proofs',        label: `Proofs (${proofs.length})`, icon: ImageIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {imageLightbox}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-primary-navy dark:text-white">
            Admin Panel
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {newPaid.length} new · {oldPaid.length} old · {pending.length} pending · {proofs.length} proofs
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Submission toggle */}
          <button
            onClick={toggleSubmission}
            disabled={togglingSubmission}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              submissionOpen
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
            }`}
          >
            <div className={`relative w-8 h-4 rounded-full transition-colors ${submissionOpen ? 'bg-green-500' : 'bg-red-400'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${submissionOpen ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
            {togglingSubmission ? 'Saving…' : submissionOpen ? 'Submissions ON' : 'Submissions OFF'}
          </button>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-900 text-primary-navy dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Registrations ── */}
      {activeTab === 'registrations' && (
        <div className="space-y-10">
          {/* New Registrations */}
          <Section
            title="New Registrations"
            count={newPaid.length}
            dotColor="bg-green-500"
          >
            {newPaid.length === 0
              ? <EmptyState msg="No new registrations yet." />
              : newPaid.map((u, i) => (
                  <UserCard key={u.id} user={u} index={i} />
                ))
            }
          </Section>

          {/* Draft / Pending */}
          <Section
            title="Draft Payments"
            count={pending.length}
            dotColor="bg-yellow-400"
            subtitle="Form bhara, payment ka pata nahi - inhe contact karo."
          >
            {pending.length === 0
              ? <EmptyState msg="No pending payments." />
              : pending.map((u, i) => (
                  <UserCard key={u.id} user={u} index={i} isDraft />
                ))
            }
          </Section>

          {/* Divider */}
          {oldPaid.length > 0 && (
            <>
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-50 dark:bg-[#040D1D] px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Season 1 - Previous Registrations
                  </span>
                </div>
              </div>

              <Section
                title="Season 1 Registrations"
                count={oldPaid.length}
                dotColor="bg-slate-400"
              >
                {oldPaid.map((u, i) => (
                  <UserCard key={u.id} user={u} index={i} />
                ))}
              </Section>
            </>
          )}
        </div>
      )}

      {/* ── TAB: Full Dashboard ── */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name or phone..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => downloadExcel(newPaid, 'paceup-registrations.xlsx')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold text-primary-navy text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <Download className="h-3.5 w-3.5" />
                Export Excel Sheet
              </button>
            </div>
          </div>

          {/* Sort bar */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'name',            label: 'Name' },
              { key: 'created_at',      label: 'Date' },
              { key: 'distance',        label: 'Distance' },
              { key: 'city',            label: 'City' },
              { key: 'delivery_status', label: 'Delivery' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  sortKey === key
                    ? 'bg-accent-gold text-primary-navy'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {label} <SortIcon col={key} />
              </button>
            ))}
          </div>

          {/* New registrations */}
          {newPaid.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-primary-navy dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                New Registrations ({newPaid.length})
              </h3>
              {sortedUsers(filterBySearch(newPaid)).map((u, i) => {
                const proof = proofs.find(p => p.email === u.email);
                return (
                  <DashboardRow
                    key={u.id}
                    user={u}
                    index={i}
                    proof={proof}
                    onDeliveryChange={handleDeliveryUpdate}
                    onTrackingChange={handleTrackingUpdate}
                    onTrackingSave={saveTrackingId}
                                       onViewImage={(url) => setProofImage(url)}
                  />
                );
              })}
            </div>
          )}

          {/* Divider */}
          {oldPaid.length > 0 && newPaid.length > 0 && (
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-50 dark:bg-[#040D1D] px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Season 1 - Previous Registrations
                </span>
              </div>
            </div>
          )}

          {/* Old registrations */}
          {oldPaid.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                Season 1 ({oldPaid.length})
              </h3>
              {sortedUsers(filterBySearch(oldPaid)).map((u, i) => {
                const proof = proofs.find(p => p.email === u.email);
                return (
                  <DashboardRow
                    key={u.id}
                    user={u}
                    index={i}
                    proof={proof}
                    onDeliveryChange={handleDeliveryUpdate}
                    onTrackingChange={handleTrackingUpdate}
                    onTrackingSave={saveTrackingId}
                                       onViewImage={(url) => setProofImage(url)}
                  />
                );
              })}
            </div>
          )}

          {paid.length === 0 && <EmptyState msg="No paid registrations yet." />}
        </div>
      )}

      {/* ── TAB: Proofs ── */}
      {activeTab === 'proofs' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-sm text-slate-400">{proofs.length} submissions received</p>
            {proofs.length > 0 && (
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => downloadAllProofImages(proofs)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <Camera className="h-3.5 w-3.5" />
                  Download All Images
                </button>
                <button
                  onClick={() => {
                    const data = proofs.map(p => ({
                      'Name': p.registrations?.name ?? '',
                      'Email': p.email,
                      'Phone': p.registrations?.phone ?? '',
                      'Distance': p.registrations?.distance ?? '',
                      'City': p.registrations?.city ?? '',
                      'State': p.registrations?.state ?? '',
                      'KM Logged': p.km_logged || '',
                      'Submitted At': p.created_at ? new Date(p.created_at).toLocaleString('en-IN') : '',
                      'Screenshot URL': p.screenshot_url || '',
                    }));
                    const ws = XLSX.utils.json_to_sheet(data);
                    ws['!cols'] = Object.keys(data[0]).map(h => ({ wch: Math.max(h.length, 14) }));
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Proofs');
                    XLSX.writeFile(wb, 'paceup-proofs.xlsx');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold text-primary-navy text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Excel Sheet
                </button>
              </div>
            )}
          </div>

          {proofs.length === 0 ? (
            <EmptyState msg="No proof submissions yet." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {proofs.map(proof => (
                <ProofCard key={proof.id} proof={proof} onView={() => setProofImage(proof.screenshot_url)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Section wrapper ───
function Section({ title, count, dotColor, subtitle, children }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display font-bold text-lg text-primary-navy dark:text-white flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor} inline-block`} />
          {title} ({count})
        </h2>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5 ml-4">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
}

// ─── Empty state ───
function EmptyState({ msg }) {
  return <div className="text-center py-10 text-slate-400 text-sm">{msg}</div>;
}

// ─── Registration card (Registrations tab) ───
function UserCard({ user, index, isDraft = false }) {
  const registeredAt = user.created_at
    ? new Date(user.created_at).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '-';

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
            {user.distance || '-'}
          </span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            user.payment_status === 'paid'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
          }`}>
            {user.payment_status === 'paid' ? 'Paid' : 'Pending'}
          </span>
        </div>
      </div>
      <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        <Field label="Phone"      value={user.phone} />
        <Field label="City"       value={user.city} />
        <Field label="State"      value={user.state} />
        <Field label="Pincode"    value={user.pincode} />
        <Field label="Registered" value={registeredAt} />
        <div className="col-span-2 sm:col-span-3">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Address</p>
          <p className="text-sm text-primary-navy dark:text-white font-medium">{user.address || '-'}</p>
        </div>
        <div className="col-span-2 sm:col-span-3 border-t border-slate-100 dark:border-slate-800 pt-3">
          <Field label="Cashfree Order ID" value={user.cashfree_order_id} mono />
        </div>
      </div>
    </div>
  );
}

// ─── Compact dashboard row (Registrations tab) ───
function DashboardRow({ user, index, proof, onDeliveryChange, onTrackingChange, onTrackingSave, onViewImage }) {
  const registeredAt = user.created_at
    ? new Date(user.created_at).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      })
    : '-';

  const currentStatus = user.delivery_status || 'not_shipped';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="flex gap-3 p-4">
        {/* Proof thumbnail */}
        {proof?.screenshot_url ? (
          <div
            className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer shrink-0 group"
            onClick={() => onViewImage(proof.screenshot_url)}
          >
            <img src={proof.screenshot_url} alt="proof" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
            <ImageIcon className="h-5 w-5 text-slate-300 dark:text-slate-600" />
          </div>
        )}

        {/* Main info */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Name + badges */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-sm text-primary-navy dark:text-white truncate">{user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email} · {user.phone || '-'}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full uppercase">
                {user.distance || '-'}
              </span>
              {proof && (
                <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Proof
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Details inline */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{user.city || '-'}, {user.state || '-'} · {user.pincode || '-'}</span>
            <span>{registeredAt}</span>
            {proof && <span className="text-primary-navy dark:text-white font-semibold">{proof.km_logged} logged</span>}
          </div>

          {/* Row 3: Address + Tracking + Delivery */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <p className="text-[11px] text-slate-400 truncate max-w-xs" title={user.address}>
              {user.address || 'No address'}
            </p>
            <input
              type="text"
              value={user.tracking_id || ''}
              onChange={e => onTrackingChange(user.id, e.target.value)}
              placeholder="Tracking ID"
              className="px-2 py-1 rounded-md text-[11px] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none focus:border-accent-gold transition-colors w-32"
            />
            {user.tracking_dirty && (
              <button
                onClick={() => onTrackingSave(user.id)}
                className="px-2 py-1 rounded-md text-[10px] font-bold bg-accent-gold text-white hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            )}
            <div className="relative inline-block ml-auto">
              <select
                value={currentStatus}
                onChange={e => onDeliveryChange(user.id, e.target.value)}
                className={`appearance-none pl-2.5 pr-7 py-1 rounded-md text-[11px] font-bold border-0 outline-none cursor-pointer ${deliveryBadgeClass(currentStatus)}`}
              >
                {DELIVERY_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1.5 top-1.5 h-3 w-3 pointer-events-none opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Proof card (Proofs tab) ───
function ProofCard({ proof, onView }) {
  const submittedAt = proof.created_at
    ? new Date(proof.created_at).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : '-';

  const reg = proof.registrations ?? {};

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      {/* Screenshot thumbnail */}
      <div
        className="relative h-32 bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden group"
        onClick={onView}
      >
        {proof.screenshot_url
          ? <img src={proof.screenshot_url} alt="proof" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon className="h-8 w-8" /></div>
        }
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <ExternalLink className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div>
          <p className="font-bold text-xs text-primary-navy dark:text-white truncate">{reg.name || proof.email}</p>
          <p className="text-[10px] text-slate-400 truncate">{proof.email}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-medium">Logged</p>
            <p className="text-xs font-bold text-primary-navy dark:text-white">{proof.km_logged || '-'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-medium">Category</p>
            <p className="text-xs font-bold text-primary-navy dark:text-white uppercase">{reg.distance || '-'}</p>
          </div>
        </div>
        <p className="text-[10px] text-slate-400">{submittedAt}</p>
        <div className="flex gap-1.5">
          <button onClick={onView}
            className="flex-1 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-primary-navy dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => downloadSingleProofImage(proof)}
            className="flex-1 py-1.5 rounded-lg bg-accent-gold/10 text-accent-gold text-[10px] font-bold text-center hover:bg-accent-gold/20 transition-colors flex items-center justify-center gap-1"
          >
            <Download className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Field ───
function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">{label}</p>
      <p className={`text-primary-navy dark:text-white ${mono ? 'font-mono text-xs break-all' : 'text-sm font-medium'}`}>
        {value || '-'}
      </p>
    </div>
  );
}
