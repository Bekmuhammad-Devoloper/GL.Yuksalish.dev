'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}#services`, label: t('services') },
    { href: `/${locale}/cases`, label: t('cases') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <motion.nav
        animate={{
          maxWidth: scrolled ? 880 : 1400,
          paddingLeft: scrolled ? 16 : 24,
          paddingRight: scrolled ? 8 : 16,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'mx-auto flex h-16 items-center justify-between rounded-full transition-all duration-500',
          scrolled
            ? 'glass shadow-card'
            : 'bg-background/40 backdrop-blur-md border border-transparent',
        )}
      >
        <Link href={`/${locale}`} className="flex items-center gap-2 pr-4">
          <Logo variant="mark" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link href={`/${locale}/contact`} className="hidden md:inline-flex">
            <Button size="sm" className="ml-2">
              {t('startProject')}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* mobile drawer */}
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden md:hidden"
      >
        <div className="mx-auto mt-2 max-w-md rounded-3xl border border-border/60 bg-background/90 p-4 backdrop-blur-xl shadow-card">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
            <div className="flex gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
              <Button size="sm">
                {t('startProject')}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
