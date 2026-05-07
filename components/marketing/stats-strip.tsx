'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Section, SectionHeading } from '@/components/ui/section';

const items = [
  { key: 'years', target: 3, suffix: '' },
  { key: 'projects', target: 50, suffix: '+' },
  { key: 'countries', target: 2, suffix: '' },
  { key: 'team', target: 12, suffix: '' },
] as const;

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const t = useTranslations('stats');

  return (
    <Section className="relative">
      <div className="container">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover sm:rounded-3xl sm:p-7 lg:p-9"
            >
              <p className="font-display text-[36px] font-semibold leading-none tracking-tight gradient-text-brand sm:text-4xl lg:text-5xl">
                <Counter to={item.target} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-[13px] text-muted-foreground sm:text-sm">
                {t(`items.${item.key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
