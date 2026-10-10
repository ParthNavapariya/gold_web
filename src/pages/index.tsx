import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  BarChart3, Layers, ShieldCheck, ArrowLeftRight, Banknote, TrendingUp,
  Phone, MessageCircle, ChevronRight, Star } from
'lucide-react';
import { home } from 'virtual:content';

type IconName = 'BarChart3' | 'Layers' | 'ShieldCheck' | 'ArrowLeftRight' | 'Banknote' | 'TrendingUp';
const iconMap: Record<IconName, React.ComponentType<{size?: number;}>> = {
  BarChart3, Layers, ShieldCheck, ArrowLeftRight, Banknote, TrendingUp
};

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting && !started) setStarted(true);},
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let startTime = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return { count, ref };
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function HomePage() {
  const site = 'https://ahmedabadgoldprocess.com';

  // Live gold rates from MCX-aligned API
  interface LiveRate { purity: string; label: string; perGram: number; per10g: number; change: number; }
  const [liveRates, setLiveRates] = useState<LiveRate[] | null>(null);
  const [ratesUpdatedAt, setRatesUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/gold-rates');
        const json = await res.json();
        if (json.success) {
          setLiveRates(json.data.rates);
          setRatesUpdatedAt(json.data.updatedAt);
        }
      } catch { /* show static fallback */ }
    };
    load();
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');
  const timeAgoShort = (iso: string) => {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GoldDealer',
        '@id': site + '/#organization',
        name: 'Ahmedabad Gold Process',
        url: site,
        logo: site + '/airo-assets/images/logo/horizontal',
        description: 'Ahmedabad trusted gold trading and bullion dealer. Serving jewellers and retailers across Gujarat with BIS hallmarked gold bars, coins, and certified bullion since 1998.',
        foundingDate: '1998',
        telephone: '+918905064477',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Manek Chowk',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          postalCode: '380001',
          addressCountry: 'IN',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            opens: '11:00',
            closes: '20:00',
          },
        ],
        hasCredential: [
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'BIS Hallmarking' },
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'SEBI Registered' },
          { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISO 9001:2015' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+918905064477',
          contactType: 'sales',
          availableLanguage: ['English', 'Hindi', 'Gujarati'],
        },
        areaServed: { '@type': 'State', name: 'Gujarat' },
      },
      {
        '@type': 'WebSite',
        '@id': site + '/#website',
        url: site,
        name: 'Ahmedabad Gold Process',
        publisher: { '@id': site + '/#organization' },
      },
      {
        '@type': 'WebPage',
        '@id': site + '/#webpage',
        url: site,
        name: 'Ahmedabad Gold Process — Trusted Bullion Dealer and Gold Trading',
        isPartOf: { '@id': site + '/#website' },
        about: { '@id': site + '/#organization' },
        description: 'Ahmedabad premier gold trading and bullion dealer. Buy/sell gold bars, coins, purity testing, gold loans, and investment schemes. Serving jewellers since 1998.',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Ahmedabad Gold Process — Trusted Bullion Dealer and Gold Trading</title>
        <meta name="description" content="Ahmedabad's premier gold trading and bullion dealer. Buy/sell gold bars, coins, purity testing, gold loans, and investment schemes. Serving jewellers since 1998." />
        <link rel="canonical" href={site} />
        <meta property="og:title" content="Ahmedabad Gold Process — Trusted Bullion Dealer" />
        <meta property="og:description" content="Bulk gold supply for jewellers and retailers. Transparent pricing, BIS certified, 25+ years of trust." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(homeJsonLd).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt="Gold bars and bullion"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080} />
          
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(10,15,44,0.93) 0%, rgba(10,15,44,0.78) 55%, rgba(10,15,44,0.88) 100%)' }} />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
                <div className="h-px w-10" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  Est. 1998 · Ahmedabad
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                
                {home.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-10 max-w-xl"
                style={{ color: 'hsl(var(--foreground) / 0.75)' }}>
                
                {home.hero.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
                <Link
                  to="/gold-rates"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}>
                  
                  {home.hero.cta_primary}
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}>
                  
                  {home.hero.cta_secondary}
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {home.hero.trust_badges.map((badge) =>
                <>
                  <Star size={10} fill="currentColor" />
                  {badge.label}
                </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* GOLD RATE TICKER */}
        <section aria-label="Today's gold rates" style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <div className="shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(var(--background) / 0.7)' }}>
                  <span>{home.ticker.label}</span>
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--background) / 0.55)' }}>
                  {ratesUpdatedAt ? 'Updated: ' + timeAgoShort(ratesUpdatedAt) : home.ticker.updated_at}
                </p>
              </div>
              <div className="hidden sm:block h-8 w-px" style={{ background: 'hsl(var(--background) / 0.3)' }} />
              <div className="flex flex-wrap gap-6 sm:gap-10">
                {(liveRates ?? home.ticker.rates.map((r) => ({
                  purity: r.purity,
                  label: r.purity,
                  perGram: parseFloat(r.per_gram.replace(/[₹,]/g, '')),
                  per10g: parseFloat(r.per_10g.replace(/[₹,]/g, '')),
                  change: 0,
                }))).map((rate, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xs font-semibold" style={{ color: 'hsl(var(--background) / 0.65)' }}>
                      {rate.purity}
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'hsl(var(--background))' }}>
                      {formatINR(rate.perGram)}<span className="text-xs font-normal">/g</span>
                    </span>
                    <span className="text-xs" style={{ color: 'hsl(var(--background) / 0.6)' }}>
                      {formatINR(rate.per10g)}/10g
                    </span>
                    {rate.change !== 0 && (
                      <span className="text-xs font-medium mt-0.5" style={{ color: rate.change > 0 ? '#4ade80' : '#f87171' }}>
                        {rate.change > 0 ? '+' : ''}{formatINR(rate.change)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="sm:ml-auto shrink-0">
                <Link
                  to="/gold-rates"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: 'hsl(var(--background))' }}>
                  
                  View full rates <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-14">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>What We Offer</span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}>
                
                {home.services.heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base max-w-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {home.services.subheading}
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
              style={{ background: 'hsl(var(--border))' }}>
              
              {home.services.items.map((service) => {
                const Icon = iconMap[service.icon as IconName] ?? BarChart3;
                return (
                  <motion.div
                    key={service.id}
                    variants={fadeUp}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-8 flex flex-col gap-4"
                    style={{ background: 'hsl(var(--background))' }}>
                    
                    <div
                      className="w-12 h-12 rounded flex items-center justify-center"
                      style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}>
                      
                      <Icon size={22} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {service.description}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1 text-xs font-semibold mt-auto transition-opacity hover:opacity-70"
                      style={{ color: 'hsl(var(--primary))' }}>
                      
                      Learn more <ChevronRight size={12} />
                    </Link>
                  </motion.div>);

              })}
            </motion.div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' as const }}
                className="relative">
                
                <div className="absolute -inset-4 rounded-lg opacity-20 blur-xl" style={{ background: 'hsl(var(--primary))' }} />
                <img
                  src="/airo-assets/images/pages/home/why-choose-us"
                  alt="Gold bars and bullion trading"
                  className="relative rounded-lg w-full object-cover"
                  style={{ maxHeight: '480px' }}
                  loading="lazy"
                  width={800}
                  height={480} />
                
                <div
                  className="absolute bottom-6 left-6 px-5 py-4 rounded-lg"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}>
                  
                  
                  <p className="text-xs font-medium" style={{ color: 'hsl(var(--background) / 0.75)' }}>Hallmarked Quality Assured</p>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Our Track Record</span>
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                  
                  {home.stats.heading}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-base mb-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {home.stats.subheading}
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                  {home.stats.items.map((stat) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const { count, ref } = useCounter(stat.value);
                    return (
                      <div key={stat.id} ref={ref} className="text-center">
                        <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}>
                          {count.toLocaleString('en-IN')}<span>{stat.suffix}</span>
                        </div>
                        <div className="text-sm font-medium uppercase tracking-wider" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                          {stat.label}
                        </div>
                      </div>);

                  })}
                </div>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                    style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}>
                    
                    Our Story <ChevronRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}>
                    
                    Start Trading
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Client Voices</span>
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                
                {home.testimonials.heading}
              </motion.h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {home.testimonials.items.map((t) =>
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="p-8 rounded-lg border flex flex-col gap-5"
                style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}>
                
                  <div className="text-5xl leading-none" style={{ color: 'hsl(var(--primary))', fontFamily: 'var(--font-heading)' }}>"</div>
                  <p className="text-sm leading-relaxed italic flex-1" style={{ color: 'hsl(var(--foreground) / 0.8)', fontFamily: 'var(--font-heading)' }}>
                    {t.quote}
                  </p>
                  <div className="border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
                    <p className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{t.author}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--primary))' }}>{t.business}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 70% 50%, hsl(var(--primary) / 0.08) 0%, transparent 70%)' }} />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Get in Touch</span>
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                  
                  {home.cta.headline}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-base mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {home.cta.subheadline}
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/918905064477"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: '#25D366', color: '#ffffff' }}>
                    
                    <MessageCircle size={16} />
                    {home.cta.cta_whatsapp}
                  </a>
                  <a
                    href="tel:+918905064477"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                    style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}>
                    
                    <Phone size={16} />
                    {home.cta.cta_call}
                  </a>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' as const }}
                className="relative">
                
                <img
                  src="/airo-assets/images/pages/home/gold-bars-coins"
                  alt="Gold bars and coins"
                  className="rounded-lg w-full object-cover"
                  style={{ maxHeight: '380px' }}
                  loading="lazy"
                  width={800}
                  height={380} />
                
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{ background: 'linear-gradient(to right, hsl(var(--background) / 0.3), transparent)' }} />
                
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>);

}