import { Helmet } from '@dr.pogodin/react-helmet';
import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { contact } from 'virtual:content';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

const inputClass = 'w-full px-4 py-3 rounded text-sm outline-none transition-all border focus:ring-2';

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [enquiryType, setEnquiryType] = useState('Bulk Gold Order');

  const site = 'https://ahmedabadgoldprocess.com';
  const url = site + '/contact';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const quantity = String(formData.get('quantity') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (dropdowns, radios, checkboxes) must be added to conversation.data as { "Label": value } pairs.
      const res = await fetch('/api/contact/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New enquiry submitted' }],
            data: {
              __gd_contact_form_title: 'Gold Trading Enquiry',
              'Enquiry Type': enquiryType,
              'Phone Number': phone,
              'Quantity / Amount': quantity
            }
          },
          user: { email, name }
        })
      });

      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
        setEnquiryType('Bulk Gold Order');
      } else {
        throw new Error(json.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — Ahmedabad Gold Process</title>
        <meta name="description" content="Contact Ahmedabad Gold Process for bulk gold enquiries, purity testing, gold loans, and investment advisory. Call, WhatsApp, or send an enquiry online." />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Contact Us — Ahmedabad Gold Process" />
        <meta property="og:description" content="Reach our trading desk for bulk gold orders, purity testing, and investment advisory." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
            <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ContactPage',
                '@id': url + '#webpage',
                name: 'Contact Us — Ahmedabad Gold Process',
                url,
                isPartOf: { '@id': site + '/#website' },
                about: { '@id': site + '/#organization' },
              },
              {
                '@type': 'GoldDealer',
                '@id': site + '/#organization',
                name: 'Ahmedabad Gold Process',
                url: site,
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
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+918905064477',
                  contactType: 'customer service',
                  availableLanguage: ['English', 'Hindi', 'Gujarati'],
                },
              },
            ],
          }).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: 'hsl(var(--card))' }}>
          
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(var(--primary) / 0.07) 0%, transparent 65%)' }} />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
              <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <div className="h-px w-8" style={{ background: 'hsl(var(--primary))' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  {contact.hero.eyebrow}
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                
                {contact.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {contact.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-20" style={{ background: 'hsl(var(--background))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* LEFT — Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="lg:col-span-2 flex flex-col gap-8">
                
                {/* WhatsApp CTA */}
                <motion.a
                  variants={fadeUp}
                  href="https://wa.me/918905064477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-lg border transition-all hover:opacity-90"
                  style={{ background: '#25D366', borderColor: '#25D366' }}>
                  
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={22} style={{ color: '#ffffff' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{contact.info.whatsapp_label}</p>
                    <p className="text-sm text-white/80">{contact.info.whatsapp}</p>
                    <p className="text-xs text-white/60 mt-0.5">Tap to chat instantly</p>
                  </div>
                </motion.a>

                {/* Info cards */}
                {[
                { id: 'addr', icon: MapPin, label: contact.info.address_label, value: contact.info.address },
                { id: 'ph', icon: Phone, label: contact.info.phone_label, value: contact.info.phone, href: 'tel:+918905064477' },
                { id: 'em', icon: Mail, label: contact.info.email_label, value: contact.info.email, href: 'mailto:enquiries@ahmedabadgoldprocess.com' },
                { id: 'hr', icon: Clock, label: contact.info.hours_label, value: contact.info.hours }].
                map(({ id, icon: Icon, label, value, href }) =>
                <motion.div
                  key={id}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-5 rounded-lg border"
                  style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                  
                    <div
                    className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                    style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}>
                    
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--primary))' }}>
                        {label}
                      </p>
                      {href ?
                    <a
                      href={href}
                      className="text-sm leading-relaxed transition-opacity hover:opacity-70"
                      style={{ color: 'hsl(var(--foreground))' }}>
                      
                          {value}
                        </a> :

                    <span className="font-bold">{value}</span>
                    }
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* RIGHT — Enquiry Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="lg:col-span-3">
                
                <motion.div
                  variants={fadeUp}
                  className="p-8 sm:p-10 rounded-lg border"
                  style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                  
                  {status === 'success' ?
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                      <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'hsl(var(--primary) / 0.12)', color: 'hsl(var(--primary))' }}>
                      
                        <CheckCircle2 size={32} />
                      </div>
                      <h2
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                      
                        {contact.form.success_heading}
                      </h2>
                      <p className="text-sm max-w-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {contact.form.success_message}
                      </p>
                      <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 text-xs font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
                      style={{ color: 'hsl(var(--primary))' }}>
                      
                        Send another enquiry
                      </button>
                    </div> :

                  <>
                      <div className="mb-8">
                        <h2
                        className="text-2xl font-bold mb-2"
                        style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--foreground))' }}>
                        
                          {contact.form.heading}
                        </h2>
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                          {contact.form.subheading}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                        {/* Honeypot */}
                        <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ position: 'absolute', left: '-9999px' }}
                        aria-hidden="true" />
                      

                        {/* Enquiry type */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                            Enquiry Type
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['Bulk Gold Order', 'Purity Testing', 'Gold Loan', 'Buy / Sell Gold', 'Investment Advisory', 'Other'].map((type) =>
                          <button
                            key={type}
                            type="button"
                            onClick={() => setEnquiryType(type)}
                            className="px-4 py-2 rounded-full text-xs font-medium border transition-all"
                            style={
                            enquiryType === type ?
                            { background: 'hsl(var(--primary))', color: 'hsl(var(--background))', borderColor: 'hsl(var(--primary))' } :
                            { background: 'transparent', color: 'hsl(var(--foreground) / 0.7)', borderColor: 'hsl(var(--border))' }
                            }>
                            
                                {type}
                              </button>
                          )}
                          </div>
                        </div>

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                              Full Name <span style={{ color: 'hsl(var(--primary))' }}>*</span>
                            </label>
                            <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Ramesh Shah"
                            className={inputClass}
                            style={{
                              background: 'hsl(var(--background))',
                              borderColor: 'hsl(var(--border))',
                              color: 'hsl(var(--foreground))'
                            }} />
                          
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                              Email Address <span style={{ color: 'hsl(var(--primary))' }}>*</span>
                            </label>
                            <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="ramesh@jewellers.com"
                            className={inputClass}
                            style={{
                              background: 'hsl(var(--background))',
                              borderColor: 'hsl(var(--border))',
                              color: 'hsl(var(--foreground))'
                            }} />
                          
                          </div>
                        </div>

                        {/* Phone + Quantity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                              Phone Number
                            </label>
                            <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            className={inputClass}
                            style={{
                              background: 'hsl(var(--background))',
                              borderColor: 'hsl(var(--border))',
                              color: 'hsl(var(--foreground))'
                            }} />
                          
                          </div>
                          <div>
                            <label htmlFor="quantity" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                              Quantity / Amount
                            </label>
                            <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            placeholder="e.g. 500g, 1kg, ₹5 lakh"
                            className={inputClass}
                            style={{
                              background: 'hsl(var(--background))',
                              borderColor: 'hsl(var(--border))',
                              color: 'hsl(var(--foreground))'
                            }} />
                          
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
                            Message
                          </label>
                          <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your requirement — gold type, purity, quantity, timeline, or any questions."
                          className={inputClass}
                          style={{
                            background: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            color: 'hsl(var(--foreground))',
                            resize: 'vertical'
                          }} />
                        
                        </div>

                        {status === 'error' &&
                      <div
                        className="flex items-start gap-3 p-4 rounded-lg border text-sm"
                        role="alert"
                        style={{ background: 'hsl(var(--destructive) / 0.08)', borderColor: 'hsl(var(--destructive) / 0.3)', color: 'hsl(var(--destructive))' }}>
                        
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{errorMsg}</span>
                          </div>
                      }

                        <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}>
                        
                          {status === 'sending' ? 'Sending Enquiry…' : 'Send Enquiry'}
                        </button>
                      </form>
                    </>
                  }
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>);

}