'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MonitorMockup } from '@/components/brand/monitor-mockup';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const stats = [
    { value: '20+', label: t('stats.clients') },
    { value: '50+', label: t('stats.projects') },
    { value: '99.9%', label: t('stats.uptime') },
    { value: '24/7', label: t('stats.support') },
  ];

  return (
    <section className="relative overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-36 lg:pb-24 lg:pt-44">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.18),_transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,hsl(var(--background)))] " />
        <div
          className="absolute inset-0 grid-radial-fade opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-center">
          <div className="flex flex-col items-start">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t('eyebrow')}
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 font-display text-[34px] font-semibold leading-[1.08] tracking-tight text-balance sm:mt-6 sm:text-5xl lg:text-[64px] lg:leading-[1.02]"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-5 max-w-xl text-[15px] text-muted-foreground sm:mt-6 sm:text-lg text-pretty"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('primary')}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}#services`} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('secondary')}
                </Button>
              </Link>
            </motion.div>

            <motion.dl
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 grid w-full max-w-lg grid-cols-2 gap-x-6 gap-y-5 sm:mt-12 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[11px] text-muted-foreground sm:text-[13px]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mt-4 lg:mt-0"
          >
            <MonitorMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
