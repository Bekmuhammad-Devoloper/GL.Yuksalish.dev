import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Logo } from '@/components/brand/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.15),_transparent_70%)] blur-3xl" />
      </div>

      <header className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
        <LocaleLogo />
        <div className="flex gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex min-h-screen items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}

function LocaleLogo() {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className="flex items-center">
      <Logo />
    </Link>
  );
}
