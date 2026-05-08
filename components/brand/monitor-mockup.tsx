'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type MonitorMockupProps = {
  className?: string;
};

export function MonitorMockup({ className }: MonitorMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 110, damping: 18, mass: 0.6 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [5, -5]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    const onLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full max-w-[420px] mx-auto sm:max-w-[520px] lg:max-w-[640px]', className)}
      style={{ perspective: '1600px' }}
    >
      {/* ambient halo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 animate-breathe blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, hsl(20 95% 54% / 0.55), transparent 70%)',
        }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* monitor body */}
        <div className="relative rounded-[28px] bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 p-[10px] shadow-2xl ring-1 ring-black/10">
          {/* bezel */}
          <div className="relative rounded-[20px] bg-zinc-950 p-[6px]">
            {/* screen */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-white">
              {/* screen content backdrop */}
              <div className="absolute inset-0 bg-white">
                {/* faux app chrome — design tool top bar */}
                <div className="flex items-center gap-1.5 border-b border-black/8 bg-zinc-50 px-3 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                  <div className="ml-3 hidden flex-1 items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-wider text-black/30 sm:flex">
                    <span className="font-mono">germaniya-live.svg</span>
                  </div>
                </div>

                {/* logo filling the full screen */}
                <div className="absolute inset-x-0 bottom-0 top-9">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2,
                    }}
                    className="h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/favicon.svg"
                      alt="GERMANIYA LIVE"
                      width={640}
                      height={640}
                      className="h-full w-full select-none object-contain"
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* subtle glare */}
                <div className="pointer-events-none absolute -top-1/2 left-0 h-full w-1/3 -rotate-12 bg-gradient-to-b from-white/20 to-transparent blur-2xl" />
              </div>
            </div>
          </div>

          {/* speaker/sensor strip under screen */}
          <div className="mt-2 flex justify-center">
            <span className="h-1 w-12 rounded-full bg-zinc-400/60 dark:bg-zinc-600/60" />
          </div>
        </div>

        {/* stand neck */}
        <div className="mx-auto mt-1 h-10 w-24 rounded-b-2xl bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-800 dark:to-zinc-900 shadow-md" />
        {/* stand foot */}
        <div className="mx-auto mt-0 h-2 w-56 rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-800 dark:to-zinc-900 shadow-lg" />
        {/* floor reflection */}
        <div className="pointer-events-none absolute -bottom-12 left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.18),_transparent_70%)] blur-2xl" />
      </motion.div>
    </div>
  );
}
