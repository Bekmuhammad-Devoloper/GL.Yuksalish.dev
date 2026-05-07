import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  variant?: 'full' | 'mark';
  monochrome?: boolean;
};

export function Logo({ className, variant = 'full', monochrome = false }: LogoProps) {
  if (variant === 'mark') {
    return <LogoMark className={className} monochrome={monochrome} />;
  }
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark monochrome={monochrome} className="h-12 w-12" />
      <span className="font-display font-bold leading-[0.92] tracking-tight">
        <span className="block text-[18px]">GERMANIYA</span>
        <span className="block text-[18px]">LIVE</span>
      </span>
    </span>
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
      src="/favicon.svg"
      alt="Germaniya Live"
      width={96}
      height={96}
      className={cn('h-10 w-10 object-contain', className)}
      style={monochrome ? { filter: 'grayscale(1)' } : undefined}
    />
  );
}


