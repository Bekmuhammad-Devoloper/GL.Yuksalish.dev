'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Palette } from 'lucide-react';
import { AdminTopbar } from '@/components/admin/topbar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const t = useTranslations('admin.settings');

  const sections = [
    { key: 'profile', icon: User },
    { key: 'security', icon: Lock },
    { key: 'notifications', icon: Bell },
    { key: 'appearance', icon: Palette },
  ] as const;

  return (
    <>
      <AdminTopbar title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[220px_1fr]">
          <nav className="lg:sticky lg:top-24 lg:self-start">
            <ul className="flex flex-row gap-1 overflow-x-auto rounded-2xl border border-border/60 bg-card p-1.5 lg:flex-col lg:overflow-visible">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.key}>
                    <a
                      href={`#${s.key}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.7} />
                      {t(s.key)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-6">
            <SettingCard id="profile" title={t('profile')} icon={User}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm">Name</Label>
                  <Input defaultValue="Admin" className="mt-2" />
                </div>
                <div>
                  <Label className="text-sm">Email</Label>
                  <Input
                    type="email"
                    defaultValue="admin@germaniya-live.uz"
                    disabled
                    className="mt-2"
                  />
                </div>
              </div>
              <Button className="mt-6">{t('save')}</Button>
            </SettingCard>

            <SettingCard id="security" title={t('security')} icon={Lock}>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Current password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-2" />
                </div>
                <div>
                  <Label className="text-sm">New password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-2" />
                </div>
                <div>
                  <Label className="text-sm">Confirm password</Label>
                  <Input type="password" placeholder="••••••••" className="mt-2" />
                </div>
              </div>
              <Button className="mt-6">{t('save')}</Button>
            </SettingCard>

            <SettingCard id="notifications" title={t('notifications')} icon={Bell}>
              <ul className="space-y-3">
                {[
                  { label: 'Email digest', desc: 'Daily summary of new leads', defaultOn: true },
                  {
                    label: 'Browser notifications',
                    desc: 'Real-time alerts on this device',
                    defaultOn: true,
                  },
                  {
                    label: 'Sound on new lead',
                    desc: 'Play a chime when a new lead arrives',
                    defaultOn: false,
                  },
                ].map((opt) => (
                  <li
                    key={opt.label}
                    className="flex items-center justify-between rounded-xl border border-border/60 p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                    <Toggle defaultOn={opt.defaultOn} />
                  </li>
                ))}
              </ul>
            </SettingCard>

            <SettingCard id="appearance" title={t('appearance')} icon={Palette}>
              <p className="text-sm text-muted-foreground">
                Use the toggle in the top bar to switch between light and dark themes.
              </p>
            </SettingCard>
          </div>
        </div>
      </div>
    </>
  );
}

function SettingCard({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background text-primary">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
        </div>
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
        on ? 'bg-primary' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-md ring-0 transition-transform',
          on ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  );
}
