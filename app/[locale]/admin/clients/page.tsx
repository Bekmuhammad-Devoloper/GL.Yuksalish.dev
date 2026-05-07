'use client';

import { useTranslations } from 'next-intl';
import { Briefcase } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/topbar';

export default function ClientsPage() {
  const t = useTranslations('admin.sidebar');
  const tc = useTranslations('common');

  return (
    <>
      <AdminTopbar title={t('clients')} />
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-card text-primary">
            <Briefcase className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">
            {t('clients')}
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {tc('comingSoon')} — the clients module will surface every business that worked with the studio.
          </p>
        </div>
      </div>
    </>
  );
}
