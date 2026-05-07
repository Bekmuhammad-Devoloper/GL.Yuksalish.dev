'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';

export function Testimonials() {
  const t = useTranslations('testimonials');
  const ids = ['1', '2', '3'] as const;

  return (
    <Section className="relative">
      <div className="container">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        {/* mobile: horizontal snap scroll · desktop: 3-col grid */}
        <div className="mt-12 sm:mt-14">
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 scroll-pl-4 sm:-mx-6 sm:px-6 sm:scroll-pl-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 scrollbar-none">
            {ids.map((id, idx) => (
              <motion.figure
                key={id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex w-[88%] shrink-0 snap-start flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:w-[70%] sm:gap-6 sm:p-7 lg:w-auto lg:shrink lg:snap-align-none lg:p-8"
              >
                <Quote className="h-7 w-7 text-primary/60" strokeWidth={1.6} />
                <blockquote className="text-pretty text-[15px] leading-relaxed text-foreground/90 sm:text-base lg:text-lg">
                  "{t(`items.${id}.quote`)}"
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 font-display text-sm font-semibold text-primary">
                    {t(`items.${id}.author`).charAt(0)}
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-medium">
                      {t(`items.${id}.author`)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t(`items.${id}.role`)}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* mobile-only scroll hint dots */}
          <div className="mt-3 flex justify-center gap-1.5 lg:hidden" aria-hidden>
            {ids.map((id, idx) => (
              <span
                key={id}
                className={
                  idx === 0
                    ? 'h-1.5 w-5 rounded-full bg-primary/60'
                    : 'h-1.5 w-1.5 rounded-full bg-border'
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
