'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/ui/section';
import { cn } from '@/lib/utils';

const steps = ['discovery', 'design', 'build', 'launch', 'care'] as const;

export function ProcessSection() {
  const t = useTranslations('process');

  return (
    <Section className="relative">
      <div className="container">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          {/* mobile: vertical connector behind circles */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:hidden"
          />
          {/* desktop: horizontal connector through circle row */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-9 -z-10 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />

          <ol className="grid gap-12 sm:gap-14 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, idx) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  className={cn(
                    'relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border bg-background shadow-card transition-transform duration-300',
                    idx === 0
                      ? 'border-primary/40 shadow-glow-soft'
                      : 'border-border',
                  )}
                >
                  <span className="font-display text-xl font-semibold tracking-tight">
                    0{idx + 1}
                  </span>
                  {idx === 0 && (
                    <span className="absolute -inset-1 -z-10 animate-breathe rounded-full bg-primary/15 blur-md" />
                  )}
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight sm:mt-6 sm:text-xl">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-muted-foreground sm:max-w-xs sm:text-sm">
                  {t(`steps.${step}.description`)}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
