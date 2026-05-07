'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Command,
  Menu,
  LogOut,
  User,
  Settings,
  Inbox,
  MessageSquare,
  FolderKanban,
  Sparkles,
  Check,
  RadioTower,
  type LucideIcon,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useAdminMobile } from '@/components/admin/mobile-context';
import {
  seedNotifications,
  type Notification,
  type NotificationKind,
} from '@/lib/mock-notifications';
import { cn } from '@/lib/utils';

const KIND_ICON: Record<NotificationKind, LucideIcon> = {
  lead: Inbox,
  message: MessageSquare,
  project: FolderKanban,
  system: Sparkles,
};

export function AdminTopbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const t = useTranslations('admin.topbar');
  const tSidebar = useTranslations('admin.sidebar');
  const locale = useLocale();
  const { setOpen: setMobileOpen } = useAdminMobile();

  const [notifications, setNotifications] = React.useState<Notification[]>(seedNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border/60 bg-background/80 px-3 backdrop-blur-xl sm:gap-4 sm:px-6">
      {/* mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h1 className="truncate font-display text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h1>
          <LiveIndicator />
        </div>
        {subtitle && (
          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">{subtitle}</p>
        )}
      </div>

      {/* desktop search */}
      <button className="hidden h-10 items-center gap-2.5 rounded-full border border-border/60 bg-background px-4 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground md:inline-flex">
        <Search className="h-4 w-4" />
        <span>{t('search')}</span>
        <kbd className="ml-2 inline-flex h-5 items-center gap-0.5 rounded-md border border-border/60 bg-muted px-1.5 font-mono text-[10px]">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      <div className="flex items-center gap-1">
        {/* mobile search icon */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={t('search')}
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={t('notifications')}
            >
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground ring-2 ring-background">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[340px] sm:w-[380px]">
            <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
              <div>
                <p className="font-display text-sm font-semibold tracking-tight">
                  {t('notifications')}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} yangi bildirishnoma`
                    : 'Hammasi o\'qildi'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  <Check className="h-3 w-3" />
                  Mark all read
                </button>
              )}
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Bildirishnomalar yo'q
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = KIND_ICON[n.kind];
                  return (
                    <DropdownMenuItem
                      key={n.id}
                      asChild
                      className={cn(
                        'cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5',
                        !n.read && 'bg-primary/5',
                      )}
                    >
                      <Link href={n.href ? `/${locale}${n.href}` : '#'}>
                        <div
                          className={cn(
                            'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                            n.read
                              ? 'border-border bg-card text-muted-foreground'
                              : 'border-primary/30 bg-primary/10 text-primary',
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.7} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{n.title}</p>
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {n.description}
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                            {n.time}
                          </p>
                        </div>
                        {!n.read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </Link>
                    </DropdownMenuItem>
                  );
                })
              )}
            </div>
            <DropdownMenuSeparator />
            <Link
              href={`/${locale}/admin/leads`}
              className="block rounded-lg px-3 py-2 text-center text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            >
              View all activity
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* language + theme — hidden on smallest screens */}
        <div className="hidden items-center gap-1 sm:flex">
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>

        {/* profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Profile"
              className="ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-border transition-all hover:ring-primary/40"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-display text-sm font-semibold text-primary">
                A
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px]">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 py-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 font-display text-base font-semibold text-primary">
                  A
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-medium text-foreground">Admin</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    admin@germaniya-live.uz
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/${locale}/admin/settings`}>
                <User className="h-4 w-4" />
                {tSidebar('settings')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/${locale}/admin/settings`}>
                <Settings className="h-4 w-4" />
                Preferences
              </Link>
            </DropdownMenuItem>
            {/* show language/theme on smallest screens here */}
            <div className="flex items-center justify-between gap-1 px-2 py-1.5 sm:hidden">
              <LanguageSwitcher compact />
              <ThemeToggle />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer text-destructive focus:text-destructive">
              <Link href={`/${locale}/login`}>
                <LogOut className="h-4 w-4" />
                {tSidebar('logout')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function LiveIndicator() {
  return (
    <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 sm:inline-flex">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      LIVE
    </span>
  );
}
