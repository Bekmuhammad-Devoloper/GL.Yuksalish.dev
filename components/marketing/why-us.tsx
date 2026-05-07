'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  LifeBuoy,
  Globe2,
  SlidersHorizontal,
  Shield,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';

const items = [
  { key: 'senior', icon: Users },
  { key: 'transparent', icon: Eye },
  { key: 'support', icon: LifeBuoy },
  { key: 'global', icon: Globe2 },
  { key: 'flexible', icon: SlidersHorizontal },
  { key: 'secure', icon: Shield },
] as const;

export function WhyUs() {
  const t = useTranslations('why');

  return (
    <Section className="relative">
      <div className="container">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-card sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-card p-5 transition-colors hover:bg-accent/40 sm:p-8"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-accent/40 to-background text-primary transition-transform group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight sm:mt-6 sm:text-lg">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground sm:mt-2 sm:text-sm">
                  {t(`items.${item.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
