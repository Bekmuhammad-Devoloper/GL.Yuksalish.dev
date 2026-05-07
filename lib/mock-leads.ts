export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'inProgress'
  | 'won'
  | 'lost';

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  source: string;
  status: LeadStatus;
  message: string;
  createdAt: string;
};

export const leads: Lead[] = [];

export function getLeadCountByStatus(status: LeadStatus | 'all'): number {
  if (status === 'all') return leads.length;
  return leads.filter((l) => l.status === status).length;
}
