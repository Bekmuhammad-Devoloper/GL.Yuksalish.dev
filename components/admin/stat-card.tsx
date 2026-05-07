'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  spark,
  index = 0,
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: LucideIcon;
  spark?: number[];
  index?: number;
}) {
  const positive = delta !== undefined ? delta >= 0 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-border/60 bg-card p-5 transition-shadow hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background text-primary">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
        </div>
        {delta !== undefined && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[11px] font-medium',
              positive
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400',
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-semibold tracking-tight">{value}</p>
      </div>

      {spark && (
        <Sparkline data={spark} positive={positive ?? true} className="mt-4" />
      )}
    </motion.div>
  );
}

function Sparkline({
  data,
  positive,
  className,
}: {
  data: number[];
  positive: boolean;
  className?: string;
}) {
  const w = 120;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn('h-8 w-full', className)}
    >
      <defs>
        <linearGradient id={`spark-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive ? 'hsl(20 95% 54%)' : 'hsl(0 75% 55%)'} stopOpacity="0.4" />
          <stop offset="100%" stopColor={positive ? 'hsl(20 95% 54%)' : 'hsl(0 75% 55%)'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={positive ? 'hsl(20 95% 54%)' : 'hsl(0 75% 55%)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#spark-${positive})`} />
    </svg>
  );
}
