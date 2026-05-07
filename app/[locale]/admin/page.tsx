'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Inbox,
  TrendingUp,
  Loader2,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  FolderKanban,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { AdminTopbar } from '@/components/admin/topbar';
import { StatCard } from '@/components/admin/stat-card';
import { Badge } from '@/components/ui/badge';
import { leads, getLeadCountByStatus } from '@/lib/mock-leads';
import { services } from '@/content/services';
import { seedNotifications } from '@/lib/mock-notifications';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const t = useTranslations('admin.dashboard');
  const tServices = useTranslations('services.items');
  const tLeads = useTranslations('admin.leads');
  const locale = useLocale();

  const stats = [
    {
      label: t('stats.leads'),
      value: leads.length,
      delta: 18,
      icon: Inbox,
      spark: [4, 7, 6, 9, 11, 14, 12, 16, 19, 22, 21, 25],
    },
    {
      label: t('stats.newWeek'),
      value: getLeadCountByStatus('new'),
      delta: 32,
      icon: TrendingUp,
      spark: [1, 2, 1, 3, 2, 4, 5, 4, 6, 5, 7, 8],
    },
    {
      label: t('stats.inProgress'),
      value: getLeadCountByStatus('inProgress'),
      delta: -4,
      icon: Loader2,
      spark: [9, 8, 9, 7, 8, 6, 7, 5, 6, 5, 5, 4],
    },
    {
      label: t('stats.closed'),
      value: getLeadCountByStatus('won'),
      delta: 12,
      icon: CheckCircle2,
      spark: [2, 3, 4, 3, 5, 6, 7, 6, 8, 9, 10, 11],
    },
  ];

  const recent = leads.slice(0, 6);

  // service mix
  const serviceMix = services.map((s) => ({
    slug: s.slug,
    label: tServices(`${s.slug}.title` as any),
    count: leads.filter((l) => l.service === s.slug).length,
  }));
  const total = serviceMix.reduce((sum, s) => sum + s.count, 0) || 1;

  return (
    <>
      <AdminTopbar title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
          {/* stats */}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} index={i} />
            ))}
          </div>

          {/* charts row */}
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.6fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {t('leadsOverTime')}
                </h3>
                <Badge variant="secondary">Last 30 days</Badge>
              </div>
              <LeadsChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6"
            >
              <h3 className="font-display text-base font-semibold tracking-tight">
                {t('serviceMix')}
              </h3>
              <div className="mt-5 space-y-3 sm:mt-6">
                {serviceMix.map((s) => {
                  const pct = Math.round((s.count / total) * 100);
                  return (
                    <div key={s.slug}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{s.label}</span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full gradient-brand"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* recent leads + activity feed */}
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.6fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              <div className="flex items-center justify-between border-b border-border/60 p-5">
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {t('recentLeads')}
                </h3>
                <Link
                  href={`/${locale}/admin/leads`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  {t('viewAll')}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              {/* desktop: table · mobile: cards */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3 font-medium">{tLeads('table.id')}</th>
                      <th className="px-5 py-3 font-medium">{tLeads('table.client')}</th>
                      <th className="px-5 py-3 font-medium">{tLeads('table.service')}</th>
                      <th className="px-5 py-3 font-medium">{tLeads('table.source')}</th>
                      <th className="px-5 py-3 font-medium">{tLeads('table.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((l) => (
                      <tr
                        key={l.id}
                        className="group border-b border-border/40 last:border-0 transition-colors hover:bg-accent/50"
                      >
                        <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">
                          {l.id}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-medium">{l.name}</div>
                          <div className="text-xs text-muted-foreground">{l.company}</div>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {tServices(`${l.service}.title` as any)}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">{l.source}</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={l.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* mobile cards */}
              <ul className="divide-y divide-border/40 md:hidden">
                {recent.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-start gap-3 p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 font-display text-sm font-semibold text-primary">
                      {l.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">{l.name}</p>
                        <StatusBadge status={l.status} />
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {l.company} · {tServices(`${l.service}.title` as any)}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                        {l.id} · {l.source}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Activity feed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              <div className="flex items-center justify-between border-b border-border/60 p-5">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base font-semibold tracking-tight">
                    Activity
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                    Live
                  </span>
                </div>
              </div>
              <ul className="space-y-0">
                {seedNotifications.slice(0, 5).map((n, idx) => {
                  const Icon = ACTIVITY_ICON[n.kind] ?? Sparkles;
                  return (
                    <li
                      key={n.id}
                      className={cn(
                        'flex items-start gap-3 border-b border-border/40 p-4 last:border-0',
                        idx === 0 && 'bg-primary/[0.03]',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                          idx === 0
                            ? 'border-primary/30 bg-primary/10 text-primary'
                            : 'border-border bg-background text-muted-foreground',
                        )}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{n.title}</p>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {n.description}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {n.time}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

const ACTIVITY_ICON: Record<string, LucideIcon> = {
  lead: Inbox,
  message: MessageSquare,
  project: FolderKanban,
  system: Sparkles,
};

function LeadsChart() {
  const data = [12, 15, 18, 14, 20, 22, 18, 25, 28, 24, 30, 32, 28, 35, 38, 34, 40];
  const w = 600;
  const h = 180;
  const max = Math.max(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (v / max) * (h - 20) - 10;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-5 h-36 w-full sm:mt-6 sm:h-44">
      <defs>
        <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(20 95% 54%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(20 95% 54%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line
          key={p}
          x1="0"
          y1={h * p}
          x2={w}
          y2={h * p}
          stroke="hsl(var(--border))"
          strokeWidth="0.5"
          strokeDasharray="3 3"
        />
      ))}
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#leadsGrad)" />
      <polyline
        points={points}
        fill="none"
        stroke="hsl(20 95% 54%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variant = (
    {
      new: 'default',
      contacted: 'secondary',
      qualified: 'warning',
      inProgress: 'warning',
      won: 'success',
      lost: 'muted',
    } as const
  )[status as keyof any] as any;

  return (
    <Badge variant={variant} className="capitalize">
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status === 'won' && 'bg-emerald-500',
          status === 'new' && 'bg-primary',
          status === 'contacted' && 'bg-blue-500',
          status === 'qualified' && 'bg-amber-500',
          status === 'inProgress' && 'bg-amber-500',
          status === 'lost' && 'bg-muted-foreground',
        )}
      />
      {status}
    </Badge>
  );
}
