'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CtaBanner() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="px-4 py-20 sm:py-24 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card sm:rounded-[32px] sm:p-16"
        >
          {/* gradient backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,_hsl(20_95%_54%/0.35),_transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,_hsl(28_100%_62%/0.2),_transparent_70%)] blur-3xl" />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t('eyebrow')}
              </span>
              <h2 className="mt-5 font-display text-[26px] font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {t('title')}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] text-muted-foreground sm:text-lg text-pretty">
                {t('description')}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link href={`/${locale}/contact`} className="w-full lg:w-auto">
                <Button size="lg" className="w-full lg:w-auto">
                  {t('primary')}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <a
                href="https://t.me/Yuksalish_development"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full lg:w-auto">
                  <Send className="h-4 w-4" />
                  {t('secondary')}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
