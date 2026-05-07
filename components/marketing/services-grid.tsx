'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';

export function ServicesGrid() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <Section id="services" className="relative">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-6 sm:gap-5">
          {services.map((service, idx) => {
            const span = SPAN_MAP[idx];
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn('group relative', span)}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className={cn(
                    'relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-card transition-all duration-500',
                    'hover:border-primary/40 hover:shadow-glow-soft active:scale-[0.99] sm:hover:-translate-y-1',
                    'sm:p-7 sm:gap-0',
                  )}
                >
                  {/* gradient corner */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,_hsl(20_95%_54%/0.15),_transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/40 to-background text-primary transition-colors group-hover:border-primary/40">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[19px] font-semibold tracking-tight sm:mt-6 sm:text-2xl">
                      {t(`items.${service.slug}.title`)}
                    </h3>
                    <p className="mt-2 text-[14px] text-muted-foreground sm:text-[15px]">
                      {t(`items.${service.slug}.tagline`)}
                    </p>
                  </div>

                  <div className="relative flex items-center justify-between text-sm font-medium sm:mt-8">
                    <span className="text-muted-foreground transition-colors group-hover:text-primary">
                      {t('learnMore')}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 transition-all group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// asymmetric magazine layout
const SPAN_MAP = [
  'sm:col-span-3',
  'sm:col-span-3',
  'sm:col-span-2',
  'sm:col-span-2',
  'sm:col-span-2',
  'sm:col-span-3 sm:col-start-2',
];
