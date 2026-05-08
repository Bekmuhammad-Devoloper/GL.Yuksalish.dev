'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { cases, type CaseStudy } from '@/content/cases';
import { cn } from '@/lib/utils';

export function CasesSection({ limit = 4 }: { limit?: number }) {
  const t = useTranslations('cases');
  const locale = useLocale();
  const tServices = useTranslations('services.items');

  const featured = cases[0];
  const supporting = cases.slice(1, limit);

  return (
    <Section className="relative">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
            align="left"
          />
          <Link
            href={`/${locale}/cases`}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            {t('viewAll')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="mt-12 space-y-4 sm:mt-14 lg:space-y-5">
          <FeaturedCase
            study={featured}
            href={`/${locale}/cases`}
            t={t}
            tServices={tServices}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {supporting.map((c, idx) => (
              <SupportingCase
                key={c.slug}
                study={c}
                href={`/${locale}/cases`}
                index={idx}
                tServices={tServices}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeaturedCase({
  study,
  href,
  t,
  tServices,
}: {
  study: CaseStudy;
  href: string;
  t: ReturnType<typeof useTranslations>;
  tServices: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-soft"
    >
      <Link
        href={href}
        className="grid lg:grid-cols-[1.15fr_1fr] lg:items-stretch"
      >
        {/* IMAGE — left on desktop, top on mobile */}
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full">
          <Image
            src={study.cover}
            alt={study.client}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/0" />

          {/* feature badge */}
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Featured
          </div>

          {/* mobile-only overlay title */}
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6 lg:hidden">
            <Badge variant="muted" className="border-white/20 bg-white/15 text-white">
              {study.vertical}
            </Badge>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {study.client}
            </h3>
          </div>
        </div>

        {/* CONTENT — right on desktop, below on mobile */}
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
          <div>
            {/* desktop-only header */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{study.vertical}</Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {study.year}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance xl:text-[40px]">
                {study.client}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground sm:text-[15px]">
                {study.subtitle ?? tServices(`${study.service}.title` as any)} · {study.year}
              </p>
            </div>

            {/* mobile-only meta line */}
            <p className="text-sm text-muted-foreground lg:hidden">
              {tServices(`${study.service}.title` as any)} · {study.year}
            </p>
          </div>

          {/* metrics — clean layout */}
          <ul className="grid grid-cols-3 gap-3 border-t border-border pt-6 lg:gap-5">
            {study.metrics.map((m) => (
              <li key={m.label} className="min-w-0">
                <p className="font-display text-xl font-semibold leading-none tracking-tight gradient-text-brand sm:text-2xl lg:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1.5 truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>

          {/* CTA arrow */}
          <span className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary lg:inline-flex">
            {t('viewCase')}
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-all group-hover:rotate-45 group-hover:border-primary/40 group-hover:bg-primary/5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function SupportingCase({
  study,
  href,
  index,
  tServices,
}: {
  study: CaseStudy;
  href: string;
  index: number;
  tServices: ReturnType<typeof useTranslations>;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-soft"
    >
      <Link href={href} className="block">
        <div className="relative aspect-[16/11] w-full overflow-hidden">
          <Image
            src={study.cover}
            alt={study.client}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white sm:p-5">
            <div className="min-w-0">
              <Badge variant="muted" className="border-white/20 bg-white/15 text-white">
                {study.vertical}
              </Badge>
              <h3 className="mt-2.5 truncate font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {study.client}
              </h3>
            </div>
            <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-transform group-hover:rotate-45 sm:inline-flex">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
          <p className="truncate text-xs text-muted-foreground">
            {tServices(`${study.service}.title` as any)} · {study.year}
          </p>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {String(index + 2).padStart(2, '0')}
          </span>
        </div>

        <ul className="grid grid-cols-3 divide-x divide-border border-t border-border">
          {study.metrics.map((m) => (
            <li key={m.label} className="min-w-0 px-3 py-3.5 text-center">
              <p className="font-display text-base font-semibold tracking-tight sm:text-lg">
                {m.value}
              </p>
              <p className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      </Link>
    </motion.article>
  );
}
