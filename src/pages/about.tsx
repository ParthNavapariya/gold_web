import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight, MessageCircle } from 'lucide-react';
import { about } from 'virtual:content';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export default function AboutPage() {
  const site = 'https://ahmedabadgoldprocess.com';
  const url = site + '/about';

  return (
    <>
      <Helmet>
        <title>About Us — Ahmedabad Gold Process</title>
        <meta name="description" content="Founded in 1998 in Zaveri Bazaar, Ahmedabad Gold Process is Gujarat's most trusted bullion dealer. BIS hallmarked, SEBI registered, ISO certified." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="About Us — Ahmedabad Gold Process" />
        <meta property="og:description" content="25+ years of trusted gold trading in Ahmedabad. BIS hallmarked, SEBI registered, ISO certified." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'AboutPage',
              '@id': url + '#webpage',
              name: 'About Us — Ahmedabad Gold Process',
              url,
              isPartOf: { '@id': site + '/#website' },
              about: { '@id': site + '/#organization' },
            },
            {
              '@type': 'GoldDealer',
              '@id': site + '/#organization',
              name: 'Ahmedabad Gold Process',
              url: site,
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
              numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10 },
              areaServed: { '@type': 'State', name: 'Gujarat' },
            },
          ],
        }).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="relative py-28 overflow-hidden flex items-center">
          <img
            src="/airo-assets/images/pages/about/hero"
            alt="Ahmedabad Gold Process — our story"
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
                  {about.hero.eyebrow}
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {about.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.75)' }}>
                {about.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {about.stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--background))' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--background) / 0.7)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-24" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                    Est. 1998
                  </span>
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl font-bold mb-8"
                  style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                >
                  {about.story.heading}
                </motion.h2>
                <div className="flex flex-col gap-5">
                  {about.story.body.map((para) => (
                    <motion.p
                      key={para.id}
                      variants={fadeUp}
                      className="text-sm leading-relaxed"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      {para.text}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' as const }}
                className="relative"
              >
                <div
                  className="absolute -inset-4 rounded-lg opacity-20 blur-xl"
                  style={{ background: 'hsl(var(--primary))' }}
                />
                <img
                  src="/airo-assets/images/pages/about/team-trading-floor"
                  alt="Ahmedabad Gold Process trading floor and vault"
                  className="relative rounded-lg w-full object-cover"
                  style={{ maxHeight: '480px' }}
                  loading="lazy"
                  width={800}
                  height={480}
                />
                <div
                  className="absolute bottom-6 right-6 px-5 py-4 rounded-lg"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                >
                  <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Since 1998</p>
                  <p className="text-xs font-medium" style={{ color: 'hsl(var(--background) / 0.75)' }}>Manek Chowk, Ahmedabad</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section className="py-24" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="mb-14"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  Verified & Certified
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {about.credentials.heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base max-w-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {about.credentials.subheading}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {about.credentials.items.map((cred) => (
                <motion.div
                  key={cred.id}
                  variants={fadeUp}
                  className="p-7 rounded-lg border flex gap-5"
                  style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}
                  >
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                    >
                      {cred.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {cred.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-24" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="text-center mb-14"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Our Principles</span>
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {about.values.heading}
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ background: 'hsl(var(--border))' }}
            >
              {about.values.items.map((val, i) => (
                <motion.div
                  key={val.id}
                  variants={fadeUp}
                  className="p-8 flex flex-col gap-3"
                  style={{ background: i % 2 === 0 ? 'hsl(var(--card))' : 'hsl(var(--background))' }}
                >
                  <div
                    className="text-4xl font-bold"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary) / 0.25)' }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {val.description}
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
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>Work With Us</span>
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
              >
                {about.cta.headline}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base mb-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {about.cta.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                >
                  <MessageCircle size={16} />
                  {about.cta.cta_contact}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }}
                >
                  {about.cta.cta_services} <ChevronRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
