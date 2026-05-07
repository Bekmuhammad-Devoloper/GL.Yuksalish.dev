import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  variant?: 'full' | 'mark';
  monochrome?: boolean;
};

export function Logo({ className, variant = 'full', monochrome = false }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark monochrome={monochrome} />
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-[0.04em]">
            GERMANIYA
          </span>
          <span className="font-display text-[12px] font-bold tracking-[0.32em] text-muted-foreground">
            LIVE
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoMark({
  className,
  monochrome = false,
}: {
  className?: string;
  monochrome?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 70 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-8', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="brandG" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFAA00" />
          <stop offset="45%" stopColor="#FF5500" />
          <stop offset="100%" stopColor="#CC2000" />
        </linearGradient>
      </defs>
      {/* G arc — thick rounded arc ~300° */}
      <path
        d="M44 17a20 20 0 1 0 4.7 22"
        fill="none"
        stroke={monochrome ? 'currentColor' : 'url(#brandG)'}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* G crossbar */}
      <path
        d="M34 32h12"
        stroke={monochrome ? 'currentColor' : 'url(#brandG)'}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* Eagle head silhouette in G opening */}
      <path
        d="M44 17
           C 46 10 58 11 60 19
           L 67 23
           L 61 29
           C 56 27 51 30 49 34
           C 48 37 49 39 49 39
           C 47 37 44 34 44 31
           C 44 24 43 22 44 17 Z"
        fill={monochrome ? 'currentColor' : '#1A0800'}
      />
      {/* Eagle eye */}
      <circle cx="56" cy="21" r="2.2" fill={monochrome ? 'white' : '#FF9900'} />
      <circle cx="56" cy="21" r="1.1" fill={monochrome ? 'currentColor' : '#1A0800'} />
    </svg>
  );
}
