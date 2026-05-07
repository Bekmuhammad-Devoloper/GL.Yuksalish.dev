import Image from 'next/image';
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
        <Image
          src="/logo.svg"
          alt="Germaniya Live"
          width={200}
          height={40}
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
    <Image
      src="/logo.svg"
      alt="Germaniya Live"
      width={160}
      height={32}
      className={cn('h-8 w-auto', className)}
      style={monochrome ? { filter: 'grayscale(1)' } : undefined}
    />
  );
}


