'use client';

export function useLiveLeads({
  enabled = true,
  intervalMs = 45000,
}: { enabled?: boolean; intervalMs?: number } = {}) {
  return { count: 0 };
}
