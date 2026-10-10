import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Lock, RefreshCw, CheckCircle, AlertCircle, LogOut, TrendingUp, TrendingDown } from 'lucide-react';

interface RateField {
  purity: string;
  label: string;
  perGram: string;
  per10g: string;
  change: string;
}

const DEFAULT_RATES: RateField[] = [
  { purity: '24K', label: '24 Karat (999.9)', perGram: '', per10g: '', change: '' },
  { purity: '22K', label: '22 Karat (916)', perGram: '', per10g: '', change: '' },
  { purity: '18K', label: '18 Karat (750)', perGram: '', per10g: '', change: '' },
];

export default function AdminGoldRates() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [rates, setRates] = useState<RateField[]>(DEFAULT_RATES);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [currentRates, setCurrentRates] = useState<RateField[]>(DEFAULT_RATES);

  const fetchCurrentRates = async () => {
    try {
      const res = await fetch('/api/gold-rates');
      const data = await res.json();
      if (data.success) {
        const fetched: RateField[] = data.data.rates.map((r: { purity: string; label: string; perGram: number; per10g: number; change: number }) => ({
          purity: r.purity,
          label: r.label,
          perGram: String(r.perGram),
          per10g: String(r.per10g),
          change: String(r.change),
        }));
        setCurrentRates(fetched);
        setRates(fetched);
        setUpdatedAt(data.data.updatedAt);
      }
    } catch {
      // silently ignore
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/gold-rates/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, rates: [] }),
      });
      if (res.status === 401) {
        setLoginError('Incorrect password. Please try again.');
        return;
      }
      setIsLoggedIn(true);
      await fetchCurrentRates();
    } catch {
      setLoginError('Connection error. Please try again.');
    }
  };

  const handleRateChange = (index: number, field: keyof RateField, value: string) => {
    const updated = [...rates];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'perGram' && value) {
      const pg = parseFloat(value);
      if (!isNaN(pg)) updated[index].per10g = String(Math.round(pg * 10));
    }
    setRates(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const payload = rates.map((r) => ({
      purity: r.purity,
      label: r.label,
      perGram: parseFloat(r.perGram),
      per10g: parseFloat(r.per10g),
      change: parseFloat(r.change) || 0,
    }));

    const invalid = payload.find((r) => isNaN(r.perGram) || isNaN(r.per10g));
    if (invalid) {
      setStatus('error');
      setMessage('Please fill in all rate fields with valid numbers.');
      return;
    }

    try {
      const res = await fetch('/api/gold-rates/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, rates: payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setUpdatedAt(data.data.updatedAt);
        setCurrentRates(rates);
        setMessage('Gold rates updated successfully.');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Update failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection.');
    }
  };

  const formatTime = (iso: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Ahmedabad Gold Process</title>
          <meta name="description" content="Admin login for Ahmedabad Gold Process trading desk." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main
          className="min-h-screen flex items-center justify-center p-6"
          style={{ background: 'hsl(var(--background))' }}
        >
          <div
            className="w-full max-w-sm rounded-2xl border p-8"
            style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
          >
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'hsl(var(--primary) / 0.15)' }}
              >
                <Lock className="w-7 h-7" style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <h1
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                Admin Login
              </h1>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Ahmedabad Gold Process — Trading Desk
              </p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
                  style={{
                    background: 'hsl(var(--background))',
                    borderColor: loginError ? 'hsl(var(--destructive))' : 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                {loginError && (
                  <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: 'hsl(var(--destructive))' }}>
                    <AlertCircle className="w-3.5 h-3.5" /> {loginError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                Login
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
          <title>Update Gold Rates | Ahmedabad Gold Process Admin</title>
          <meta name="description" content="Internal admin panel to update live gold rates for Ahmedabad Gold Process." />
          <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main
        className="min-h-screen p-4 md:p-8"
        style={{ background: 'hsl(var(--background))' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}
              >
                Gold Rate Admin
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Ahmedabad Gold Process — Trading Desk
              </p>
            </div>
            <button
              onClick={() => { setIsLoggedIn(false); setPassword(''); }}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
              style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {updatedAt && (
            <div
              className="rounded-xl border p-4 mb-6"
              style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
            >
              <p className="text-xs font-medium mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                CURRENT LIVE RATES — Last updated: {formatTime(updatedAt)}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {currentRates.map((r) => (
                  <div key={r.purity} className="text-center">
                    <p className="text-xs font-semibold mb-0.5" style={{ color: 'hsl(var(--primary))' }}>{r.purity}</p>
                    <p className="text-sm font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                      ₹{r.perGram ? Number(r.perGram).toLocaleString('en-IN') : '—'}/g
                    </p>
                    <p className="text-xs flex items-center justify-center gap-0.5" style={{ color: parseFloat(r.change) >= 0 ? '#22c55e' : '#ef4444' }}>
                      {parseFloat(r.change) >= 0
                        ? <TrendingUp className="w-3 h-3" />
                        : <TrendingDown className="w-3 h-3" />}
                      {parseFloat(r.change) >= 0 ? '+' : ''}{r.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
          >
            <h2
              className="text-lg font-semibold mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
            >
              Update Today's Rates
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {rates.map((rate, i) => (
                <div
                  key={rate.purity}
                  className="rounded-xl border p-4"
                  style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--background))' }}
                >
                  <p className="text-sm font-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
                    {rate.label}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Per Gram (₹)
                      </label>
                      <input
                        type="number"
                        value={rate.perGram}
                        onChange={(e) => handleRateChange(i, 'perGram', e.target.value)}
                        placeholder="e.g. 7720"
                        required
                        className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                        style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Per 10g (₹)
                      </label>
                      <input
                        type="number"
                        value={rate.per10g}
                        onChange={(e) => handleRateChange(i, 'per10g', e.target.value)}
                        placeholder="e.g. 77200"
                        required
                        className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                        style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Daily Change (₹/g)
                      </label>
                      <input
                        type="number"
                        value={rate.change}
                        onChange={(e) => handleRateChange(i, 'change', e.target.value)}
                        placeholder="e.g. 45 or -12"
                        className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                        style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {status === 'success' && (
                <div
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'hsl(142 76% 36% / 0.15)', color: '#22c55e' }}
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{message} Updated at {formatTime(updatedAt)}.</span>
                </div>
              )}
              {status === 'error' && (
                <div
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'hsl(var(--destructive) / 0.15)', color: 'hsl(var(--destructive))' }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
              >
                {status === 'loading' ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Updating…</>
                ) : (
                  'Update Gold Rates'
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
            This page is for internal use only. Changes take effect immediately on the live site.
          </p>
        </div>
      </main>
    </>
  );
}
