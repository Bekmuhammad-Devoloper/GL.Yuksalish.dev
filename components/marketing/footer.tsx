'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Send, Instagram, Linkedin, Github, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { services } from '@/content/services';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services.items');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Send, href: 'https://t.me/Yuksalish_development', label: 'Telegram' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'Github' },
  ];

  return (
    <footer className="relative border-t border-border/60 bg-card/50">
      <div className="container py-12 sm:py-16">
        {/* mobile-first stacked layout */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand block */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <Logo />
            <p className="max-w-xs text-[14px] text-muted-foreground sm:text-sm">
              {t('tagline')}
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all active:scale-95 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — stack 2-col on mobile, 1-col each on desktop */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:contents">
            <div className="flex flex-col gap-3.5 sm:gap-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                {t('company')}
              </h4>
              <ul className="space-y-2.5 text-[14px] sm:text-sm">
                <li>
                  <Link href={`/${locale}/about`} className="transition-colors hover:text-primary">
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/cases`} className="transition-colors hover:text-primary">
                    {tNav('cases')}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="transition-colors hover:text-primary">
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                {t('services')}
              </h4>
              <ul className="space-y-2.5 text-[14px] sm:text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${locale}/services/${s.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {tServices(`${s.slug}.title` as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              {t('newsletter')}
            </h4>
            <p className="text-[14px] text-muted-foreground sm:text-sm">
              {t('newsletterDesc')}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex w-full items-stretch overflow-hidden rounded-full border border-input bg-background transition-colors focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/15"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label={t('subscribe')}
                className="m-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-brand text-primary-foreground transition-transform active:scale-95 hover:scale-[1.04]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-[12px] text-muted-foreground sm:mt-14 sm:flex-row sm:items-center sm:pt-8 sm:text-xs">
          <p>© {year} ITGroup Germaniya Live. {t('rights')}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="#" className="transition-colors hover:text-foreground">
              {t('privacy')}
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              {t('terms')}
            </Link>
            <span className="font-mono">itgroup.germaniya-live.uz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
