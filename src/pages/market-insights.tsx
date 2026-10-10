import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, RefreshCw, MessageCircle, Phone, Calendar, Tag } from 'lucide-react';
import { market_insights } from 'virtual:content';

interface GoldRate {
  purity: string;
  label: string;
  perGram: number;
  per10g: number;
  change: number;
}

interface RatesData {
  rates: GoldRate[];
  updatedAt: string;
  source: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
  if (diff < 86400) return Math.floor(diff / 3600) + ' hr ago';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MarketInsightsPage() {
  const [data, setData] = useState<RatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRates = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/gold-rates');
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch {
      // silently fail — show stale data
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchRates(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const site = 'https://ahmedabadgoldprocess.com';
  const url = site + '/market-insights';

  return (
    <>
      <Helmet>
        <title>Live Gold Rates & Market Insights — Ahmedabad Gold Process</title>
        <meta name="description" content="Today's gold rates in Ahmedabad — 24K, 22K, 18K per gram and per 10g. Updated by our trading desk. Plus market insights and investment outlook." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Live Gold Rates — Ahmedabad Gold Process" />
        <meta property="og:description" content="Today's 24K, 22K, 18K gold rates in Ahmedabad, updated by our trading desk." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': url + '#webpage',
          name: 'Live Gold Rates & Market Insights — Ahmedabad Gold Process',
          url,
          isPartOf: { '@id': site + '/#website' },
          about: { '@id': site + '/#organization' },
        }).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="relative py-28 overflow-hidden flex items-center">
          <img
            src="/airo-assets/images/pages/market-insights/hero"
            alt="Gold market rates and financial data"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={600}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(10,15,44,0.95) 0%, rgba(10,15,44,0.82) 60%, rgba(10,15,44,0.92) 100%)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  {market_insights.hero.eyebrow}
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {market_insights.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.75)' }}>
                {market_insights.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* RATES TABLE */}
        <section className="py-16" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                >
                  Today's Gold Rates
                </h2>
                {data && (
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Updated {timeAgo(data.updatedAt)} · {data.source}
                  </p>
                )}
              </div>
              <button
                onClick={() => fetchRates(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold border transition-all hover:bg-white/5 disabled:opacity-50"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              >
                <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing…' : 'Refresh Rates'}
              </button>
            </div>

            {/* Rate cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-44 rounded-lg animate-pulse"
                    style={{ background: 'hsl(var(--card))' }}
                  />
                ))}
              </div>
            ) : data ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
              >
                {data.rates.map((rate) => (
                  <motion.div
                    key={rate.purity}
                    variants={fadeUp}
                    className="p-6 rounded-lg border flex flex-col gap-3"
                    style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                        style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}
                      >
                        {rate.purity}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs font-semibold"
                        style={{ color: rate.change >= 0 ? '#22c55e' : '#ef4444' }}
                      >
                        {rate.change >= 0
                          ? <TrendingUp size={13} />
                          : <TrendingDown size={13} />}
                        {rate.change >= 0 ? '+' : ''}{formatINR(rate.change)}/g
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{rate.label}</p>
                    <div>
                      <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                        {formatINR(rate.perGram)}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>per gram</p>
                    </div>
                    <div
                      className="pt-3 border-t flex items-center justify-between"
                      style={{ borderColor: 'hsl(var(--border))' }}
                    >
                      <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Per 10g</span>
                      <span className="text-base font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                        {formatINR(rate.per10g)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : null}

            {/* Disclaimer */}
            <p
              className="text-xs text-center leading-relaxed px-4"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              {market_insights.disclaimer}
            </p>
          </div>
        </section>

        {/* WHAT DRIVES GOLD PRICES */}
        <section className="py-20" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-12"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  Price Drivers
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {market_insights.factors.heading}
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {market_insights.factors.items.map((factor, i) => (
                <motion.div
                  key={factor.id}
                  variants={fadeUp}
                  className="p-6 rounded-lg border flex gap-4"
                  style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold"
                    style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3
                      className="text-sm font-semibold mb-1.5"
                      style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                    >
                      {factor.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {factor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MARKET INSIGHTS ARTICLES */}
        <section className="py-20" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-12"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  From Our Desk
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {market_insights.insights.heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base max-w-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {market_insights.insights.subheading}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              {market_insights.insights.articles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={fadeUp}
                  className="p-7 rounded-lg border"
                  style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}
                    >
                      <Tag size={10} />
                      {article.tag}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      <Calendar size={11} />
                      {article.date}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {article.summary}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Live Pricing</span>
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {market_insights.cta.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base mb-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {market_insights.cta.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/918905064477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: '#25D366', color: '#ffffff' }}
                >
                  <MessageCircle size={16} />
                  {market_insights.cta.cta_whatsapp}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
                >
                  <Phone size={16} />
                  {market_insights.cta.cta_call}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
