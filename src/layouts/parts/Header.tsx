import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Gold Rates', href: '/gold-rates' },
    { label: 'About', href: '/about' },
    { label: 'Market Insights', href: '/market-insights' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header style={{ background: 'hsl(var(--background))', borderBottom: '1px solid hsl(var(--border))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Ahmedabad Gold Process"
              className="block h-auto max-h-12 w-auto max-w-full object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive(link.href)
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--foreground) / 0.8)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="px-5 py-2.5 text-sm font-semibold rounded transition-all duration-200 hover:opacity-90"
              style={{
                background: 'hsl(var(--primary))',
                color: 'hsl(var(--background))',
              }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav aria-label="Mobile navigation" className="md:hidden py-4 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-3 py-2.5 text-sm font-medium rounded transition-colors"
                  style={{
                    color: isActive(link.href) ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.8)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 mx-3 px-5 py-2.5 text-sm font-semibold rounded text-center transition-all"
                style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--background))' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
