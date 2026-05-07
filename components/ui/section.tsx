import * as React from 'react';
import { cn } from '@/lib/utils';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'article';
};

export function Section({ className, as: As = 'section', ...props }: SectionProps) {
  return (
    <As
      className={cn('relative py-16 sm:py-24 lg:py-28', className)}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto max-w-3xl flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[28px] font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-[15px] text-muted-foreground sm:text-lg max-w-2xl text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
