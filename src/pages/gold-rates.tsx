import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, RefreshCw, MessageCircle, Phone, FileText, ChevronDown, Clock, ShieldCheck, Award } from 'lucide-react';
import { gold_rates } from 'virtual:content';

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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

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



function FaqInline() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {gold_rates.faq.map((item) =>
      <div
        key={item.id}
        className="border rounded-lg overflow-hidden"
        style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}>
        
          <button
          onClick={() => setOpenId(openId === item.id ? null : item.id)}
          className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 transition-colors hover:bg-white/5">
          
            <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))', fontFamily: 'var(--font-heading)' }}>
              {item.question}
            </span>
            <ChevronDown
            size={16}
            className="shrink-0 transition-transform duration-200"
            style={{ color: 'hsl(var(--primary))', transform: openId === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          
          </button>
          <AnimatePresence initial={false}>
            {openId === item.id &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' as const }}
            className="overflow-hidden">
            
                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {item.answer}
                </p>
              </motion.div>
          }
          </AnimatePresence>
        </div>
      )}
    </div>);

}

export default function GoldRatesPage() {
  const [data, setData] = useState<RatesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [, setLastRefreshed] = useState<Date>(new Date());

  const fetchRates = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const url = isRefresh ? '/api/gold-rates?refresh=true' : '/api/gold-rates';
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setLastRefreshed(new Date());
      }
    } catch {


      // silently fail — show stale data
    } finally {setLoading(false);setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(() => fetchRates(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const site = 'https://ahmedabadgoldprocess.com';
  const url = site + '/gold-rates';

  const goldRatesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        name: 'Live Gold Rates Today in Ahmedabad — Ahmedabad Gold Process',
        url,
        isPartOf: { '@id': site + '/#website' },
        about: { '@id': site + '/#organization' },
      },
      {
        '@type': 'FAQPage',
        '@id': url + '#faqpage',
        mainEntity: gold_rates.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Live Gold Rates Today in Ahmedabad — 24K, 22K, 18K | Ahmedabad Gold Process</title>
        <meta name="description" content="Today's gold rates in Ahmedabad — 24K, 22K and 18K per gram and per 10g. Updated by Ahmedabad Gold Process trading desk. Call for bulk pricing." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Live Gold Rates Ahmedabad — Ahmedabad Gold Process" />
        <meta property="og:description" content="Today's 24K, 22K, 18K gold rates in Ahmedabad. Updated by our trading desk. Call for bulk transaction pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(goldRatesJsonLd).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO STRIP */}
        <section
          className="py-16 border-b"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  {gold_rates.hero.eyebrow}
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                
                {gold_rates.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base max-w-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {gold_rates.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* RATE CARDS */}
        <section className="py-14" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-2">
                <Clock size={13} style={{ color: 'hsl(var(--muted-foreground))' }} />
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {data ?
                  <>Last updated: <strong style={{ color: 'hsl(var(--foreground))' }}>{timeAgo(data.updatedAt)}</strong></> :
                  'Loading rates…'}
                </span>
              </div>
              <button
                onClick={() => fetchRates(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold border transition-all hover:bg-white/5 disabled:opacity-50 self-start sm:self-auto"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                
                <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing…' : 'Refresh Rates'}
              </button>
            </div>

            {/* Cards */}
            {loading ?
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((i) =>
              <div key={i} className="h-52 rounded-xl animate-pulse" style={{ background: 'hsl(var(--card))' }} />
              )}
              </div> :
            data ?
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              
                {data.rates.map((rate, i) =>
              <motion.div
                key={rate.purity}
                variants={fadeUp}
                className="rounded-xl border flex flex-col overflow-hidden"
                style={{ background: 'hsl(var(--card))', borderColor: i === 0 ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--border))' }}>
                
                    {/* Card header */}
                    <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ background: i === 0 ? 'hsl(var(--primary) / 0.08)' : 'transparent', borderBottom: '1px solid hsl(var(--border))' }}>
                  
                      <div>
                        <span
                      className="text-lg font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: i === 0 ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}>
                      
                          {rate.purity}
                        </span>
                        <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{rate.label}</p>
                      </div>
                      <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded"
                    style={{
                      background: rate.change >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                      color: rate.change >= 0 ? '#22c55e' : '#ef4444'
                    }}>
                    
                        {rate.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {rate.change >= 0 ? '+' : ''}{formatINR(rate.change)}
                      </span>
                    </div>

                    {/* Per gram */}
                    <div className="px-6 py-5 flex-1">
                      <p className="text-xs mb-1 text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>Per Gram</p>
                      <p
                        className="text-4xl font-bold text-center"
                        style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                        {formatINR(rate.perGram)}
                      </p>
                    </div>

                    {/* Per 10g */}
                    <div
                      className="px-6 py-4 flex items-center justify-between"
                      style={{ borderTop: '1px solid hsl(var(--border))' }}>
                      <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Per 10 grams</span>
                      <span className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                        {formatINR(rate.per10g)}
                      </span>
                    </div>
                  </motion.div>
              )}
              </motion.div> :
            null}

            {/* Disclaimer */}
            <div
              className="flex items-start gap-3 p-4 rounded-lg border text-xs leading-relaxed"
              style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
              
              <ShieldCheck size={14} className="shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
              <span>{gold_rates.disclaimer}</span>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section
          className="py-10 border-y"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
              { icon: Award, label: 'BIS Hallmarked', sub: 'Certified purity' },
              { icon: ShieldCheck, label: 'SEBI Registered', sub: 'Regulated entity' },
              { icon: Award, label: 'IBJA Member', sub: 'Industry body' },
              { icon: Clock, label: 'Since 1998', sub: '25+ years trusted' }].
              map(({ icon: Icon, label, sub }) => null
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  Common Questions
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                
                Frequently Asked Questions
              </motion.h2>
            </motion.div>
            <FaqInline />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  Bulk Orders
                </span>
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                
                {gold_rates.cta.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base mb-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {gold_rates.cta.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/918905064477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: '#25D366', color: '#ffffff' }}>
                  
                  <MessageCircle size={16} />
                  {gold_rates.cta.whatsapp}
                </a>
                <a
                  href="tel:+918905064477"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}>
                  
                  <Phone size={16} />
                  {gold_rates.cta.call}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
                  
                  <FileText size={16} />
                  {gold_rates.cta.enquire}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>);

}