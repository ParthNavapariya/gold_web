import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'hsl(var(--background))', borderTop: '1px solid hsl(var(--border))' }}>
      {/* Gold rule divider */}
      <div className="h-px w-full" style={{ background: 'hsl(var(--primary) / 0.6)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/airo-assets/images/logo/horizontal"
                alt="Ahmedabad Gold Process"
                className="block h-auto max-h-12 w-auto max-w-full object-contain" />
              
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Ahmedabad's most trusted gold trading and bullion dealer. Serving jewellers and retailers across Gujarat with transparent pricing and certified quality since 2005

            </p>
            <a
              href="https://wa.me/918905064477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: '#25D366', color: '#fff' }}>
              
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'hsl(var(--primary))' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Gold Rates', href: '/gold-rates' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' }].
              map((link) =>
              <li key={link.href}>
                  <Link
                  to={link.href}
                  className="text-sm transition-colors hover:text-primary"
                  style={{ color: 'hsl(var(--muted-foreground))' }}>
                  
                    {link.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'hsl(var(--primary))' }}>
              Contact Us
            </h3>
            <ul className="space-y-4"><li className="flex items-start gap-3"><span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Manechowk, Ahmedabad,<br />Gujarat — 380001</span></li><li className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone shrink-0" style={{ color: 'hsl(var(--primary))' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg><a href="tel:+918905064477" className="text-sm hover:text-primary transition-colors" style={{ color: 'hsl(var(--muted-foreground))' }}>+91 89050 64477</a></li><li className="flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail shrink-0" style={{ color: 'hsl(var(--primary))' }}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg><a href="mailto:info@ahmedabadgoldprocess.com" className="text-sm hover:text-primary transition-colors" style={{ color: 'hsl(var(--muted-foreground))' }}>info@ahmedabadgoldprocess.com</a></li>


















            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
            © {currentYear} Ahmedabad Gold Process. All rights reserved.
          </p>
          

          
        </div>
      </div>
    </footer>);

}