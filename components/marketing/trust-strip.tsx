'use client';

import { useTranslations } from 'next-intl';

const partners = [
  'AWS',
  'Vercel',
  'Stripe',
  'Click',
  'Payme',
  'Telegram',
  'OpenAI',
  'Anthropic',
  'Google Cloud',
  'PostgreSQL',
];

export function TrustStrip() {
  const t = useTranslations('trust');

  return (
    <section className="border-y border-border/60 bg-background/40 py-8 sm:py-10">
      <div className="container">
        <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:mb-6 sm:text-xs">
          {t('label')}
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />
          <div className="flex animate-marquee gap-8 whitespace-nowrap sm:gap-12">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="font-display text-lg font-semibold tracking-tight text-muted-foreground/80 sm:text-2xl"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
