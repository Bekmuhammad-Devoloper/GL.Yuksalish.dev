'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/auth';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const locale = useLocale();
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      router.push(`/${locale}/admin`);
    } else {
      setError('Login yoki parol noto\'g\'ri');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-border/60 bg-card p-8 shadow-card sm:p-10"
    >
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {t('title')}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username" className="text-sm">
            Login
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="GL2026"
            className="mt-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-sm">
            {t('password')}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <Button type="submit" className="w-full" size="lg">
          {t('submit')}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
}
