'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { liveLeadPool } from '@/lib/mock-notifications';
import { Inbox } from 'lucide-react';

/**
 * Simulates a real-time stream of incoming leads.
 * Mounts in admin shell once, fires a toast every `intervalMs` (jitter ±30%).
 */
export function useLiveLeads({
  enabled = true,
  intervalMs = 45000,
}: { enabled?: boolean; intervalMs?: number } = {}) {
  const [stats, setStats] = React.useState({ count: 0 });

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    if (sessionStorage.getItem('live-leads-running')) return;
    sessionStorage.setItem('live-leads-running', '1');

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const jitter = intervalMs * (0.7 + Math.random() * 0.6);
      timer = setTimeout(fire, jitter);
    };

    const fire = () => {
      const lead = liveLeadPool[Math.floor(Math.random() * liveLeadPool.length)];
      setStats((s) => ({ count: s.count + 1 }));
      toast.success(`Yangi murojaat — ${lead.company}`, {
        description: `${lead.name} · ${lead.service}`,
        icon: React.createElement(Inbox, { className: 'h-4 w-4' }),
        duration: 5000,
      });
      schedule();
    };

    schedule();
    return () => {
      clearTimeout(timer);
      sessionStorage.removeItem('live-leads-running');
    };
  }, [enabled, intervalMs]);

  return stats;
}
