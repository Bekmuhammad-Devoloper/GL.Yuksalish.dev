'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Briefcase,
  FolderKanban,
  Settings,
  LogOut,
  ChevronLeft,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Logo, LogoMark } from '@/components/brand/logo';
import { cn } from '@/lib/utils';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

type NavConfig = {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
};

function useNavConfig() {
  const locale = useLocale();
  const t = useTranslations('admin.sidebar');

  const main: NavConfig[] = [
    { href: `/${locale}/admin`, icon: LayoutDashboard, label: t('dashboard') },
    { href: `/${locale}/admin/leads`, icon: Inbox, label: t('leads'), badge: 12 },
    { href: `/${locale}/admin/clients`, icon: Briefcase, label: t('clients') },
    { href: `/${locale}/admin/projects`, icon: FolderKanban, label: t('projects') },
  ];

  const management: NavConfig[] = [
    { href: `/${locale}/admin/users`, icon: Users, label: t('users') },
    { href: `/${locale}/admin/settings`, icon: Settings, label: t('settings') },
  ];

  return { main, management };
}

/* DESKTOP SIDEBAR */
export function AdminSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations('admin.sidebar');
  const { main, management } = useNavConfig();

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen flex-col border-r border-border/60 bg-card/30 transition-[width] duration-300 ease-out-expo lg:flex',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
        <Link href={main[0].href} className="flex items-center">
          {collapsed ? <LogoMark /> : <Logo />}
        </Link>
        <button
          onClick={onToggle}
          aria-label="Collapse sidebar"
          className={cn(
            'inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground',
            collapsed && 'rotate-180',
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <SectionLabel label={t('main')} collapsed={collapsed} />
        <ul className="mt-2 space-y-0.5">
          {main.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              active={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </ul>

        <div className="mt-8">
          <SectionLabel label={t('management')} collapsed={collapsed} />
          <ul className="mt-2 space-y-0.5">
            {management.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={pathname === item.href}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </div>
      </nav>

      <ProfileFooter collapsed={collapsed} />
    </aside>
  );
}

/* MOBILE DRAWER SIDEBAR */
export function AdminMobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations('admin.sidebar');
  const { main, management } = useNavConfig();

  // close drawer when route changes
  React.useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // lock body scroll while open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 z-50 flex h-screen w-[80%] max-w-[300px] flex-col border-r border-border/60 bg-card shadow-2xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
              <Link href={main[0].href} onClick={onClose}>
                <Logo />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-5">
              <SectionLabel label={t('main')} collapsed={false} />
              <ul className="mt-2 space-y-0.5">
                {main.map((item) => (
                  <NavItem
                    key={item.href}
                    {...item}
                    active={pathname === item.href}
                    collapsed={false}
                    onClick={onClose}
                  />
                ))}
              </ul>

              <div className="mt-8">
                <SectionLabel label={t('management')} collapsed={false} />
                <ul className="mt-2 space-y-0.5">
                  {management.map((item) => (
                    <NavItem
                      key={item.href}
                      {...item}
                      active={pathname === item.href}
                      collapsed={false}
                      onClick={onClose}
                    />
                  ))}
                </ul>
              </div>
            </nav>

            <ProfileFooter collapsed={false} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ProfileFooter({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose?: () => void;
}) {
  const locale = useLocale();
  const router = useRouter();

  function handleLogout() {
    onClose?.();
    logout();
    router.push(`/${locale}`);
  }

  return (
    <div className="border-t border-border/60 p-3">
      <button
        type="button"
        onClick={handleLogout}
        className={cn(
          'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
          collapsed && 'justify-center',
        )}
      >
        <div className="relative shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-display text-sm font-semibold text-primary">
            A
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
        </div>
        {!collapsed && (
          <div className="flex flex-1 items-center justify-between">
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">GL2026</p>
            </div>
            <LogOut className="h-4 w-4" />
          </div>
        )}
      </button>
    </div>
  );
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return null;
  return (
    <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {label}
    </p>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  badge,
  active,
  collapsed,
  onClick,
}: NavConfig & {
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          collapsed && 'justify-center px-0',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        )}
      >
        {active && !collapsed && (
          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
        )}
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.7} />
        {!collapsed && (
          <>
            <span className="flex-1">{label}</span>
            {badge !== undefined && (
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {badge}
              </span>
            )}
          </>
        )}
      </Link>
    </li>
  );
}
