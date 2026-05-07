'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/topbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { adminUsers } from '@/lib/mock-users';

export default function UsersPage() {
  const t = useTranslations('admin.users');
  const [query, setQuery] = React.useState('');

  const filtered = adminUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <AdminTopbar title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4" />
              {t('addUser')}
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 font-medium">{t('table.name')}</th>
                    <th className="px-5 py-3 font-medium">{t('table.role')}</th>
                    <th className="px-5 py-3 font-medium">{t('table.status')}</th>
                    <th className="px-5 py-3 font-medium">{t('table.created')}</th>
                    <th className="px-5 py-3 font-medium text-right">{t('table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="group border-b border-border/40 last:border-0 transition-colors hover:bg-accent/50"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 font-display text-sm font-semibold text-primary">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{u.name}</div>
                            <div className="text-xs text-muted-foreground">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={u.role === 'Admin' ? 'default' : 'secondary'}>
                          {u.role}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        {u.active ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="muted">Inactive</Badge>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end gap-1">
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
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
                filtered.map((u) => (
                  <li key={u.id} className="flex items-start gap-3 p-4 transition-colors active:bg-accent/70">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 font-display text-base font-semibold text-primary">
                      {u.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">{u.name}</p>
                        {u.active ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="muted">Inactive</Badge>
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant={u.role === 'Admin' ? 'default' : 'secondary'}>
                          {u.role}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
