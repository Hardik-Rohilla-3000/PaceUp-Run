import React, { useState, useEffect } from 'react';
import { Mail, KeyRound, Upload, CheckCircle2, Loader2, ArrowLeft, ImageIcon, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL    = import.meta.env.VITE_API_URL;
const ANON_KEY   = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const PRESET     = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function apiHeaders() {
  return {
    'Content-Type': 'application/json',
    'apikey': ANON_KEY,
    'Authorization': `Bearer ${ANON_KEY}`,
  };
}

export default function SubmitRecord() {
  const navigate = useNavigate();

  const [step, setStep]         = useState(1);
  const [email, setEmail]       = useState('');
  const [otp, setOtp]           = useState('');
  const [userData, setUserData] = useState(null);
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [kmLogged, setKmLogged] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/get-settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` },
      body: JSON.stringify({}),
    })
      .then(r => r.json())
      .then(data => setSubmissionOpen(data.submission_open === 'true'))
      .catch(() => setSubmissionOpen(false));
  }, []);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Step 1: Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/send-otp`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');
      setUserData(data.user);
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Upload proof
  const uploadProof = async (e) => {
    e.preventDefault();
    if (!file) { setError('Please select a screenshot'); return; }
    setLoading(true); setError('');
    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', PRESET);
      const cloudRes  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST', body: formData,
      });
      const cloudData = await cloudRes.json();
      if (!cloudRes.ok) throw new Error('Image upload failed. Try again.');

      // Save to DB
      const res = await fetch(`${API_URL}/submit-proof`, {
        method: 'POST', headers: apiHeaders(),
        body: JSON.stringify({
          email,
          screenshot_url: cloudData.secure_url,
          km_logged: kmLogged,
          registration_id: userData.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submissionOpen === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  if (submissionOpen === false) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4 animate-fade-in">
        <XCircle className="h-20 w-20 text-slate-400" />
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
            Submissions Closed
          </h1>
          <p className="text-slate-400 max-w-md text-sm">
            The proof submission window is currently closed. Please check back later or follow our updates.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-4 animate-fade-in">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-primary-navy dark:text-white">
            Record Submitted!
          </h1>
          <p className="text-slate-400 max-w-md text-sm">
            Your proof has been submitted successfully. We'll verify your record Soon.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/event')}
        className="flex items-center gap-2 text-slate-400 hover:text-accent-gold transition-colors text-sm mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Event
      </button>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { n: 1, label: 'Email' },
          { n: 2, label: 'OTP' },
          { n: 3, label: 'Upload' },
        ].map((s, i, arr) => (
          <React.Fragment key={s.n}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s.n
                  ? 'bg-accent-gold text-primary-navy'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}>
                {s.n}
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:block">{s.label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className={`flex-1 h-0.5 mb-4 transition-colors ${step > s.n ? 'bg-accent-gold' : 'bg-slate-200 dark:bg-slate-800'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">

        {/* ─── STEP 1: Email ─── */}
        {step === 1 && (
          <>
            <div className="space-y-1">
              <h1 className="font-display font-black text-2xl text-primary-navy dark:text-white">
                Submit Your Record
              </h1>
              <p className="text-slate-400 text-sm">
                Enter your registered email. We'll send an OTP to verify it's you.
              </p>
            </div>
            <form onSubmit={sendOtp} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending OTP…</> : 'Send OTP'}
              </button>
            </form>
          </>
        )}

        {/* ─── STEP 2: OTP ─── */}
        {step === 2 && (
          <>
            <div className="space-y-1">
              <h1 className="font-display font-black text-2xl text-primary-navy dark:text-white">
                Enter OTP
              </h1>
              <p className="text-slate-400 text-sm">
                We sent a 6-digit code to{' '}
                <strong className="text-primary-navy dark:text-white">{email}</strong>
              </p>
            </div>
            <form onSubmit={verifyOtp} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength={6}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors font-mono tracking-widest"
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying…</> : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => { setStep(1); setError(''); setOtp(''); }}
                className="w-full text-xs text-slate-400 hover:text-accent-gold transition-colors py-1"
              >
                ← Change email
              </button>
            </form>
          </>
        )}

        {/* ─── STEP 3: Upload ─── */}
        {step === 3 && userData && (
          <>
            <div className="space-y-1">
              <h1 className="font-display font-black text-2xl text-primary-navy dark:text-white">
                Upload Screenshot
              </h1>
              <p className="text-slate-400 text-sm">Identity verified! Now upload your run screenshot.</p>
            </div>

            {/* User info card */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-2 text-sm">
              {[
                { label: 'Name',     value: userData.name },
                { label: 'Email',    value: userData.email },
                { label: 'Category',value: userData.distance?.toUpperCase() },
                { label: 'City',     value: userData.city },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-primary-navy dark:text-white text-right">{value || '-'}</span>
                </div>
              ))}
            </div>

            <form onSubmit={uploadProof} className="space-y-5">
              {/* KM logged */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Actual Distance Logged
                </label>
                <input
                  type="text"
                  value={kmLogged}
                  onChange={e => setKmLogged(e.target.value)}
                  placeholder="Enter Distance in KM"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-accent-gold transition-colors"
                />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Run Screenshot
                </label>
                <label
                  className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
                    file
                      ? 'border-accent-gold bg-accent-gold/5'
                      : 'border-slate-200 dark:border-slate-700 hover:border-accent-gold hover:bg-accent-gold/5'
                  }`}
                >
                  {preview
                    ? <img src={preview} alt="preview" className="w-full max-h-48 object-cover rounded-xl" />
                    : <>
                        <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                        <span className="text-sm text-slate-400">Click to upload screenshot</span>
                        <span className="text-xs text-slate-300 dark:text-slate-600">JPG, PNG, WEBP accepted</span>
                      </>
                  }
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleFile(e.target.files[0])}
                  />
                </label>
                {file && (
                  <button
                    type="button"
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="mt-2 text-xs text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Remove image
                  </button>
                )}
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading || !file || !kmLogged}
                className="w-full py-3 rounded-xl bg-accent-gold text-primary-navy font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
              >
                {loading
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
                  : <><Upload className="h-4 w-4" /> Submit Record</>
                }
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
