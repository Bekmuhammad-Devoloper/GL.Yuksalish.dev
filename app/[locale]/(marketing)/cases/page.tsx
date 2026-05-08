'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeading } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { cases } from '@/content/cases';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';

export default function CasesPage() {
  const t = useTranslations('casesPage');
  const tServices = useTranslations('services.items');
  const locale = useLocale();
  const [filter, setFilter] = React.useState<string>('all');

  const filtered = filter === 'all' ? cases : cases.filter((c) => c.service === filter);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.18),_transparent_70%)] blur-2xl" />
        </div>
        <div className="container">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

          <div className="mt-12 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                filter === 'all'
                  ? 'border-primary/40 bg-primary/10 text-primary'
                  : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-border',
              )}
            >
              {t('filterAll')}
            </button>
            {services.map((s) => (
              <button
                key={s.slug}
                onClick={() => setFilter(s.slug)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  filter === s.slug
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-border',
                )}
              >
                {tServices(`${s.slug}.title` as any)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Section className="!pt-0">
        <div className="container">
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, idx) => (
                <motion.article
                  key={c.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition-shadow hover:shadow-glow-soft"
                >
                  {(() => {
                    const inner = (
                      <>
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={c.cover}
                            alt={c.client}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{c.vertical}</Badge>
                            <span className="font-mono text-xs text-muted-foreground">
                              {c.year}
                            </span>
                          </div>
                          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                            {c.client}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {tServices(`${c.service}.title` as any)}
                          </p>
                          <div className={`mt-4 grid gap-2 border-t border-border/60 pt-4 ${c.metrics.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {c.metrics.map((m) => (
                              <div key={m.label}>
                                <p className="font-display text-base font-semibold tracking-tight">
                                  {m.value}
                                </p>
                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                  {m.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                    return c.link ? (
                      <Link href={c.link} target="_blank" rel="noopener noreferrer" className="block">
                        {inner}
                      </Link>
                    ) : inner;
                  })()}
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
