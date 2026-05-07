'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const locale = useLocale();

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

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label htmlFor="name" className="text-sm">
            {t('name')}
          </Label>
          <Input id="name" placeholder="Jamshid Karimov" className="mt-2" />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm">
            {t('email')}
          </Label>
          <Input id="email" type="email" placeholder="you@company.com" className="mt-2" />
        </div>
        <div>
          <Label htmlFor="password" className="text-sm">
            {t('password')}
          </Label>
          <Input id="password" type="password" placeholder="••••••••" className="mt-2" />
        </div>
        <Button type="submit" className="w-full" size="lg">
          {t('submit')}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t('haveAccount')}{' '}
        <Link href={`/${locale}/login`} className="font-medium text-primary hover:underline">
          {t('login')}
        </Link>
      </p>
    </motion.div>
  );
}
