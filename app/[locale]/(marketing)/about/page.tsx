'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/ui/section';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { StatsStrip } from '@/components/marketing/stats-strip';

const values = ['craft', 'ownership', 'speed', 'honesty'] as const;

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.18),_transparent_70%)] blur-2xl" />
        </div>
        <div className="container">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('lead')}
          />
        </div>
      </section>

      <Section className="!pt-0">
        <div className="container">
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-10"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {t('mission.title')}
              </h3>
              <p className="mt-4 text-[15px] text-muted-foreground sm:text-base">
                {t('mission.description')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-10"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {t('team.title')}
              </h3>
              <p className="mt-4 text-[15px] text-muted-foreground sm:text-base">
                {t('team.description')}
              </p>
            </motion.div>
          </div>

          <div className="mt-16 sm:mt-20">
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('values.title')}
            </h3>
            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {values.map((v, idx) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    0{idx + 1}
                  </span>
                  <h4 className="mt-3 font-display text-base font-semibold tracking-tight sm:text-lg">
                    {t(`values.items.${v}.title`)}
                  </h4>
                  <p className="mt-2 text-[14px] text-muted-foreground sm:text-sm">
                    {t(`values.items.${v}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <StatsStrip />
      <CtaBanner />
    </>
  );
}
