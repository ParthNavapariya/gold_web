import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ShieldCheck, MessageCircle, Phone, Star, Package, Coins, BarChart3, TrendingUp } from 'lucide-react';
import { products } from 'virtual:content';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string; style?: Record<string, string> }>> = {
  'Gold Bars': Package,
  'Gold Coins': Coins,
  'Certified Bullion': ShieldCheck,
  'Investment Schemes': TrendingUp,
};

export default function ProductsPage() {
  const site = 'https://ahmedabadgoldprocess.com';
  const url = site + '/products';

  const productItems = products.categories.flatMap((cat) =>
    cat.products.map((p) => ({
      '@type': 'Product',
      name: p.name,
      description: p.note + '. Purity: ' + p.purity + '. Weight: ' + p.weight + '.',
      brand: { '@type': 'Brand', name: 'Ahmedabad Gold Process' },
      material: 'Gold',
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Purity', value: p.purity },
        { '@type': 'PropertyValue', name: 'Weight', value: p.weight },
        { '@type': 'PropertyValue', name: 'Hallmark', value: p.hallmark },
      ],
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        seller: { '@id': site + '/#organization' },
        description: 'MCX-linked pricing. Contact for current rates.',
      },
    }))
  );

  const productsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        name: 'Gold Products — Bars, Coins & Bullion | Ahmedabad Gold Process',
        url,
        isPartOf: { '@id': site + '/#website' },
        about: { '@id': site + '/#organization' },
      },
      {
        '@type': 'ItemList',
        '@id': url + '#itemlist',
        name: 'Gold Products — Ahmedabad Gold Process',
        description: 'BIS hallmarked gold bars, coins, certified bullion and investment schemes with MCX-linked pricing.',
        numberOfItems: productItems.length,
        itemListElement: productItems.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: p,
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Gold Products — Bars, Coins & Bullion | Ahmedabad Gold Process</title>
        <meta name="description" content="Buy BIS hallmarked gold bars, coins, certified bullion and investment schemes in Ahmedabad. MCX-linked pricing, 24K/22K/18K available. Serving jewellers since 1998." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Gold Products — Bars, Coins & Bullion | Ahmedabad Gold Process" />
        <meta property="og:description" content="BIS hallmarked gold bars, coins, certified bullion and investment schemes. MCX-linked pricing for jewellers and retailers in Ahmedabad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${site}/airo-assets/images/pages/products/hero`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${site}/airo-assets/images/pages/products/hero`} />
        <script type="application/ld+json">{JSON.stringify(productsJsonLd).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* Hero */}
        <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden">
          <img
            src="/airo-assets/images/pages/products/hero"
            alt="Premium gold bars and coins collection"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1400}
            height={420}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(10,15,44,0.92) 0%, rgba(10,15,44,0.75) 100%)' }} />
          <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'hsl(var(--primary))' }}
            >
              <span>{products.hero.eyebrow}</span>
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}
            >
              <span>{products.hero.title}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: 'hsl(var(--foreground) / 0.75)' }}
            >
              <span>{products.hero.subtitle}</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href={products.cta.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp for Rates</span>
              </a>
              <a
                href={products.cta.phone}
                className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all hover:opacity-90 border"
                style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))', background: 'transparent' }}
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Trust strip */}
        <section style={{ background: 'hsl(var(--primary))' }}>
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-6 md:gap-10">
            {['BIS Hallmarked', 'SEBI Registered', 'MCX-Linked Pricing', 'Since 1998'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: 'hsl(var(--background))' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(var(--background))' }}>{badge}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Categories */}
        {products.categories.map((cat, catIdx) => {
          const Icon = categoryIcons[cat.name] ?? BarChart3;
          return (
            <section
              key={cat.id}
              className="py-16 md:py-20"
              style={{ background: catIdx % 2 === 0 ? 'hsl(var(--background))' : 'hsl(var(--card))' }}
            >
              <div className="max-w-6xl mx-auto px-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                  className="mb-10"
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--primary) / 0.15)' }}>
                      <Icon size={20} style={{ color: 'hsl(var(--primary))' }} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                      <span>{cat.name}</span>
                    </h2>
                  </motion.div>
                  <motion.p variants={fadeUp} className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span>{cat.description}</span>
                  </motion.p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {cat.products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={fadeUp}
                      className="rounded-xl border p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-lg"
                      style={{ background: catIdx % 2 === 0 ? 'hsl(var(--card))' : 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                    >
                      {/* Purity badge */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--primary))' }}
                        >
                          <span>{product.purity}</span>
                        </span>
                        <Star size={14} style={{ color: 'hsl(var(--primary))' }} />
                      </div>

                      {/* Name */}
                      <h3 className="text-base font-bold leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                        <span>{product.name}</span>
                      </h3>

                      {/* Details */}
                      <div className="flex flex-col gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Weight</span>
                          <span style={{ color: 'hsl(var(--foreground))' }}><span>{product.weight}</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Certification</span>
                          <span style={{ color: 'hsl(var(--foreground))' }}><span>{product.hallmark}</span></span>
                        </div>
                      </div>

                      {/* Note */}
                      <p className="text-xs leading-relaxed pt-1 border-t" style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
                        <span>{product.note}</span>
                      </p>

                      {/* Enquire CTA */}
                      <a
                        href={`https://wa.me/918905064477?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.purity)})%20-%20please%20share%20today%27s%20rate.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center justify-center gap-2 py-2.5 rounded text-xs font-semibold transition-all hover:opacity-90"
                        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                      >
                        <MessageCircle size={13} />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          );
        })}

        {/* Pricing note */}
        <section className="py-8" style={{ background: 'hsl(var(--card))' }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <BarChart3 size={14} className="inline mr-1.5 mb-0.5" style={{ color: 'hsl(var(--primary))' }} />
              <span>{products.pricing_note}</span>
              {' '}
              <Link to="/gold-rates" className="font-semibold hover:underline" style={{ color: 'hsl(var(--primary))' }}>
                View live rates →
              </Link>
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                <span>{products.cta.title}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base mb-8 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <span>{products.cta.subtitle}</span>
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
                <a
                  href={products.cta.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: '#25D366', color: '#fff' }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp for a Quote</span>
                </a>
                <a
                  href={products.cta.phone}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold transition-all hover:opacity-90 border"
                  style={{ borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))', background: 'transparent' }}
                >
                  <Phone size={16} />
                  <span>+91 89050 64477</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
