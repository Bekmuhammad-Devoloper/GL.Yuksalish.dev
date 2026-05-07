'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { AdminSidebar, AdminMobileSidebar } from '@/components/admin/sidebar';
import { AdminMobileContext } from '@/components/admin/mobile-context';
import { useLiveLeads } from '@/hooks/use-live-leads';
import { isAuthenticated } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const router = useRouter();
  const locale = useLocale();

  useLiveLeads({ intervalMs: 60000 });

  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(`/${locale}/login`);
    } else {
      setChecked(true);
    }
  }, [locale, router]);

  if (!checked) return null;

  return (
    <AdminMobileContext.Provider value={{ open: mobileOpen, setOpen: setMobileOpen }}>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <AdminMobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </AdminMobileContext.Provider>
  );
}
