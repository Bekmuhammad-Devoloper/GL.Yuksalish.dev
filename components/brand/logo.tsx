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
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-8', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="brandG" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="hsl(28, 100%, 62%)" />
          <stop offset="55%" stopColor="hsl(20, 95%, 54%)" />
          <stop offset="100%" stopColor="hsl(14, 85%, 42%)" />
        </linearGradient>
      </defs>
      {/* G shape — open ring */}
      <path
        d="M44 17a20 20 0 1 0 4.7 22"
        fill="none"
        stroke={monochrome ? 'currentColor' : 'url(#brandG)'}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* G inner crossbar */}
      <path
        d="M34 32h12"
        stroke={monochrome ? 'currentColor' : 'url(#brandG)'}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {/* eagle beak — assertive triangle */}
      <path
        d="M44 17l9 5-9 5z"
        fill={monochrome ? 'currentColor' : 'url(#brandG)'}
      />
      {/* eye notch */}
      <circle cx="40" cy="22" r="1.5" fill="hsl(20, 14%, 8%)" />
    </svg>
  );
}
