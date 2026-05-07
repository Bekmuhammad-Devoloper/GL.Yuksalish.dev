import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  variant?: 'full' | 'mark';
  monochrome?: boolean;
};

export function Logo({ className, variant = 'full', monochrome = false }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center', className)}>
      {variant === 'full' ? (
        <img
          src="/logo.svg"
          alt="Germaniya Live"
          className="h-10 w-auto"
          style={monochrome ? { filter: 'grayscale(1)' } : undefined}
        />
      ) : (
        <LogoMark monochrome={monochrome} />
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
    <img
      src="/logo.svg"
      alt="Germaniya Live"
      className={cn('h-8 w-auto', className)}
      style={monochrome ? { filter: 'grayscale(1)' } : undefined}
    />
  );
}


