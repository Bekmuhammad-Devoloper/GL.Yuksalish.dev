'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  LayoutGrid,
  Table as TableIcon,
  X,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { AdminTopbar } from '@/components/admin/topbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { leads as initialLeads, type Lead, type LeadStatus, getLeadCountByStatus } from '@/lib/mock-leads';
import { cn } from '@/lib/utils';

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'inProgress', 'won', 'lost'];

export default function LeadsPage() {
  const t = useTranslations('admin.leads');
  const tServices = useTranslations('services.items');
  const [tab, setTab] = React.useState<'all' | LeadStatus>('all');
  const [query, setQuery] = React.useState('');
  const [view, setView] = React.useState<'table' | 'kanban'>('table');
  const [selected, setSelected] = React.useState<Lead | null>(null);

  const filtered = initialLeads.filter((l) => {
    if (tab !== 'all' && l.status !== tab) return false;
    if (query) {
      const q = query.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <>
      <AdminTopbar title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-4 sm:space-y-5">
          {/* tabs */}
          <div className="scrollbar-none flex gap-1.5 overflow-x-auto rounded-full border border-border/60 bg-card p-1">
            {(['all', ...STATUSES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setTab(s)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  tab === s
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t(`tabs.${s}`)}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                    tab === s ? 'bg-white/20' : 'bg-muted',
                  )}
                >
                  {getLeadCountByStatus(s)}
                </span>
              </button>
            ))}
          </div>

          {/* toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search')}
                className="pl-11"
              />
            </div>
            <Button variant="outline" size="default">
              <Calendar className="h-4 w-4" />
              May 2026
            </Button>
            <div className="inline-flex rounded-full border border-border/60 bg-card p-1">
              <button
                onClick={() => setView('table')}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  view === 'table' ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
                )}
              >
                <TableIcon className="h-3.5 w-3.5" />
                {t('view.table')}
              </button>
              <button
                onClick={() => setView('kanban')}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  view === 'kanban' ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                {t('view.kanban')}
              </button>
            </div>
          </div>

          {/* views */}
          {view === 'table' ? (
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
              {/* desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3 font-medium">{t('table.id')}</th>
                      <th className="px-5 py-3 font-medium">{t('table.client')}</th>
                      <th className="px-5 py-3 font-medium">{t('table.service')}</th>
                      <th className="px-5 py-3 font-medium">{t('table.source')}</th>
                      <th className="px-5 py-3 font-medium">{t('table.date')}</th>
                      <th className="px-5 py-3 font-medium">{t('table.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr
                        key={l.id}
                        onClick={() => setSelected(l)}
                        className="group cursor-pointer border-b border-border/40 last:border-0 transition-colors hover:bg-accent/50"
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
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {new Date(l.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3.5">
                          <KStatusPill status={l.status} t={t} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* mobile cards */}
              <ul className="divide-y divide-border/40 md:hidden">
                {filtered.length === 0 ? (
                  <li className="p-8 text-center text-sm text-muted-foreground">
                    Hech narsa topilmadi
                  </li>
                ) : (
                  filtered.map((l) => (
                    <li
                      key={l.id}
                      onClick={() => setSelected(l)}
                      className="flex cursor-pointer items-start gap-3 p-4 transition-colors active:bg-accent/70"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 font-display text-sm font-semibold text-primary">
                        {l.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">{l.name}</p>
                          <KStatusPill status={l.status} t={t} />
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {l.company} · {tServices(`${l.service}.title` as any)}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="font-mono">{l.id}</span>
                          <span>·</span>
                          <span>{l.source}</span>
                          <span>·</span>
                          <span>{new Date(l.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {STATUSES.map((status) => {
                const items = initialLeads.filter((l) => l.status === status);
                return (
                  <div key={status} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider">
                        {t(`tabs.${status}`)}
                      </h4>
                      <span className="text-xs text-muted-foreground">{items.length}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => setSelected(l)}
                          className="cursor-pointer rounded-xl border border-border/60 bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-card"
                        >
                          <p className="font-mono text-[10px] text-muted-foreground">{l.id}</p>
                          <p className="mt-1.5 text-sm font-medium">{l.name}</p>
                          <p className="text-xs text-muted-foreground">{l.company}</p>
                          <p className="mt-2 text-[11px] text-muted-foreground line-clamp-2">
                            {l.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-border/60 bg-card shadow-2xl sm:max-w-lg"
            >
              <div className="flex items-center justify-between border-b border-border/60 p-5">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{selected.id}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selected.company}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto p-5">
                <section>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('drawer.contact')}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    <ContactRow icon={Phone} value={selected.phone} />
                    <ContactRow icon={Mail} value={selected.email} />
                  </ul>
                </section>

                <section>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('drawer.request')}
                  </h4>
                  <p className="mt-3 text-sm">{selected.message}</p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="secondary">
                      {tServices(`${selected.service}.title` as any)}
                    </Badge>
                    <Badge variant="muted">{selected.source}</Badge>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('drawer.status')}
                  </h4>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        className={cn(
                          'rounded-lg border px-2 py-2 text-xs font-medium transition-all',
                          s === selected.status
                            ? 'border-primary/40 bg-primary/10 text-primary'
                            : 'border-border/60 text-muted-foreground hover:border-border',
                        )}
                      >
                        {t(`tabs.${s}`)}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('drawer.timeline')}
                  </h4>
                  <ul className="mt-3 space-y-3 border-l border-border/60 pl-4">
                    {[
                      { label: 'Lead created', time: '2 hours ago' },
                      { label: 'Auto-replied via Telegram', time: '1 hour ago' },
                      { label: 'Assigned to Sardor', time: '40 min ago' },
                    ].map((e, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                        <p className="text-sm font-medium">{e.label}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {e.time}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('drawer.comments')}
                  </h4>
                  <textarea
                    placeholder="Add internal note..."
                    rows={3}
                    className="mt-3 w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/15 resize-none"
                  />
                </section>
              </div>

              <div className="flex gap-2 border-t border-border/60 p-5">
                <Button variant="outline" onClick={() => setSelected(null)} className="flex-1">
                  Close
                </Button>
                <Button className="flex-1">
                  <MessageSquare className="h-4 w-4" />
                  {t('drawer.save')}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function KStatusPill({ status, t }: { status: LeadStatus; t: any }) {
  const map: Record<LeadStatus, string> = {
    new: 'bg-primary/10 text-primary border-primary/20',
    contacted: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    qualified: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    inProgress: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    won: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    lost: 'bg-muted text-muted-foreground border-border',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        map[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(`tabs.${status}`)}
    </span>
  );
}

function ContactRow({
  icon: Icon,
  value,
}: {
  icon: LucideIcon;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-border/60 bg-background px-3 py-2.5 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.6} />
      {value}
    </li>
  );
}
