'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { Check } from 'lucide-react';
import { locales, type Locale } from '@/i18n';
import { cn } from '@/lib/utils';

const labels: Record<Locale, { name: string; native: string; code: string; flagSrc: string }> = {
  uz: { name: "O'zbek", native: "O'zbekcha", code: 'UZ', flagSrc: 'https://flagcdn.com/w40/uz.png' },
  ru: { name: 'Russian', native: 'Русский', code: 'RU', flagSrc: 'https://flagcdn.com/w40/ru.png' },
  en: { name: 'English', native: 'English', code: 'EN', flagSrc: 'https://flagcdn.com/w40/gb.png' },
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={compact ? 'icon' : 'sm'} className="rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={labels[locale].flagSrc} alt={labels[locale].code} className="w-5 h-auto rounded-sm" />
          {!compact && (
            <span className="ml-1.5 text-xs font-semibold tracking-wider">
              {labels[locale].code}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchTo(l)}
            className={cn(
              'flex items-center justify-between gap-3 cursor-pointer',
              locale === l && 'bg-accent text-accent-foreground',
            )}
          >
            <span className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={labels[l].flagSrc} alt={labels[l].code} className="w-6 h-auto rounded-sm" />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{labels[l].native}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {labels[l].code}
                </span>
              </span>
            </span>
            {locale === l && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
