import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  BarChart3, Layers, ShieldCheck, ArrowLeftRight, Banknote, TrendingUp,
  CheckCircle2, ChevronRight, MessageCircle, Phone
} from 'lucide-react';
import { services } from 'virtual:content';

type IconName = 'BarChart3' | 'Layers' | 'ShieldCheck' | 'ArrowLeftRight' | 'Banknote' | 'TrendingUp';
const iconMap: Record<IconName, React.ComponentType<{ size?: number }>> = {
  BarChart3, Layers, ShieldCheck, ArrowLeftRight, Banknote, TrendingUp,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ServicesPage() {
  const site = 'https://ahmedabadgoldprocess.com';
  const url = site + '/services';

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        name: 'Gold Trading Services — Ahmedabad Gold Process',
        url,
        isPartOf: { '@id': site + '/#website' },
        about: { '@id': site + '/#organization' },
      },
      {
        '@type': 'ItemList',
        '@id': url + '#servicelist',
        name: 'Gold Trading Services',
        itemListElement: services.services.map((svc, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            name: svc.title,
            description: svc.description,
            provider: { '@id': site + '/#organization' },
            areaServed: { '@type': 'State', name: 'Gujarat' },
          },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Gold Trading Services — Ahmedabad Gold Process</title>
        <meta name="description" content="Bullion trading, gold bars and coins, purity testing, buy/sell gold, gold loans, and investment schemes. Serving jewellers and retailers in Ahmedabad." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Gold Trading Services — Ahmedabad Gold Process" />
        <meta property="og:description" content="Comprehensive gold trading services for jewellers and retailers in Ahmedabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(servicesJsonLd).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="relative py-28 overflow-hidden flex items-center">
          <img
            src="/airo-assets/images/pages/services/hero"
            alt="Gold bullion and trading"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={600}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(10,15,44,0.94) 0%, rgba(10,15,44,0.80) 60%, rgba(10,15,44,0.90) 100%)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  {services.hero.eyebrow}
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {services.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.75)' }}>
                {services.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SERVICES LIST */}
        <section className="py-24" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-0">
              {services.services.map((service, index) => {
                const Icon = iconMap[service.icon as IconName] ?? BarChart3;
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={service.id}
                    id={service.slug}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    {/* Icon panel */}
                    <motion.div
                      variants={fadeUp}
                      className={
                        'flex flex-col justify-center p-10 lg:p-16 ' +
                        (isEven ? 'lg:order-1' : 'lg:order-2')
                      }
                      style={{ background: isEven ? 'hsl(var(--card))' : 'hsl(var(--background))' }}
                    >
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                        style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}
                      >
                        <Icon size={28} />
                      </div>
                      <h2
                        className="text-2xl sm:text-3xl font-bold mb-3"
                        style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                      >
                        {service.title}
                      </h2>
                      <p className="text-base font-medium mb-4" style={{ color: 'hsl(var(--primary))' }}>
                        {service.tagline}
                      </p>
                      <p className="text-sm leading-relaxed mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {service.description}
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 self-start px-6 py-3 rounded text-sm font-semibold transition-all hover:opacity-90"
                        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                      >
                        Enquire Now <ChevronRight size={14} />
                      </Link>
                    </motion.div>

                    {/* Features panel */}
                    <motion.div
                      variants={fadeUp}
                      className={
                        'flex flex-col justify-center p-10 lg:p-16 ' +
                        (isEven ? 'lg:order-2' : 'lg:order-1')
                      }
                      style={{ background: isEven ? 'hsl(var(--background))' : 'hsl(var(--card))' }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'hsl(var(--primary))' }}>
                        Key Features
                      </p>
                      <ul className="flex flex-col gap-4">
                        {service.features.map((feat) => (
                          <li key={feat.id} className="flex items-start gap-3">
                            <CheckCircle2
                              size={18}
                              className="mt-0.5 shrink-0"
                              style={{ color: 'hsl(var(--primary))' }}
                            />
                            <span className="text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.85)' }}>
                              {feat.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Get in Touch</span>
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {services.cta.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base mb-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {services.cta.subheadline}
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
                  {services.cta.cta_whatsapp}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
                >
                  <Phone size={16} />
                  {services.cta.cta_enquire}
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                >
                  View Our Products
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
