'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Contrast } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/components/LanguageProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, setLanguage, t } = useLanguage();
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize high contrast from localStorage
    try {
      const stored = localStorage.getItem('highContrast');
      const val = stored === 'true';
      setHighContrast(val);
      document.documentElement.classList.toggle('high-contrast', val);
    } catch (e) {
      // ignore (SSR or blocked storage)
    }
  }, []);

  const toggleHighContrast = () => {
    try {
      const next = !highContrast;
      setHighContrast(next);
      localStorage.setItem('highContrast', next ? 'true' : 'false');
      document.documentElement.classList.toggle('high-contrast', next);
    } catch (e) {
      // ignore
    }
  };

  const navItems = [
    { name: t.nav.features, href: '#features' },
    { name: t.nav.howItWorks, href: '#how-it-works' },
    { name: t.nav.pricing, href: '#pricing' },
    { name: t.nav.testimonials, href: '#testimonials' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 dark:bg-card/95 backdrop-blur-xl border-b border-border/70 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold gradient-text">
              BizAudit AI
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={toggleHighContrast}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
              aria-pressed={highContrast}
              aria-label="Toggle high contrast"
              title={highContrast ? 'High contrast: on' : 'High contrast: off'}
            >
              <Contrast
                size={18}
                style={{ color: highContrast ? 'hsl(var(--accent))' : 'hsl(var(--secondary))' }}
              />
            </button>
            <select
              value={lang}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
              className="rounded-xl border border-border bg-card/80 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
            <a href="#pricing" className="btn-primary shadow-xl">
              {t.nav.getStarted}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={toggleHighContrast}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
              aria-pressed={highContrast}
              aria-label="Toggle high contrast"
              title={highContrast ? 'High contrast: on' : 'High contrast: off'}
            >
              <Contrast
                size={18}
                style={{ color: highContrast ? 'hsl(var(--accent))' : 'hsl(var(--secondary))' }}
              />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-card/95 border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-foreground hover:bg-secondary/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a href="#pricing" className="block px-3 py-2 rounded-2xl bg-primary text-primary-foreground text-center font-semibold hover:bg-primary/95 transition-colors">
                {t.nav.getStarted}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}