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

export const leads: Lead[] = [
  {
    id: 'GL-2451',
    name: 'Bekzod Rakhimov',
    company: 'TransLogix',
    email: 'bekzod@translogix.uz',
    phone: '+998 90 123 45 67',
    service: 'erp',
    source: 'Telegram',
    status: 'inProgress',
    message: '14 ta filial uchun ERP — 1C bilan integratsiya kerak.',
    createdAt: '2026-05-04T09:12:00Z',
  },
  {
    id: 'GL-2450',
    name: 'Nodira Yusupova',
    company: 'Markaz Market',
    email: 'nodira@markazmarket.uz',
    phone: '+998 91 222 33 44',
    service: 'crm',
    source: 'Website',
    status: 'qualified',
    message: 'Sotuv jamoasi uchun real-time CRM kerak.',
    createdAt: '2026-05-03T18:42:00Z',
  },
  {
    id: 'GL-2449',
    name: 'Anvar Karimov',
    company: 'TenzorPay',
    email: 'anvar@tenzorpay.uz',
    phone: '+998 99 555 66 77',
    service: 'telegram-bots',
    source: 'Referral',
    status: 'won',
    message: 'WebApp + Click + Payme to`lov boti.',
    createdAt: '2026-05-03T11:05:00Z',
  },
  {
    id: 'GL-2448',
    name: 'Saidakbar Tursunov',
    company: 'OqishGo',
    email: 'said@oqishgo.uz',
    phone: '+998 93 444 55 66',
    service: 'ai',
    source: 'LinkedIn',
    status: 'new',
    message: 'AI tutor + RAG hujjatlardan savol-javob.',
    createdAt: '2026-05-04T07:30:00Z',
  },
  {
    id: 'GL-2447',
    name: 'Madina Yo`ldosheva',
    company: 'Uy.uz',
    email: 'madina@uy.uz',
    phone: '+998 97 111 22 33',
    service: 'mobile',
    source: 'Instagram',
    status: 'contacted',
    message: 'iOS + Android e`lonlar ilovasi.',
    createdAt: '2026-05-02T15:24:00Z',
  },
  {
    id: 'GL-2446',
    name: 'Otabek Ergashev',
    company: 'MediHub',
    email: 'otabek@medihub.uz',
    phone: '+998 90 777 88 99',
    service: 'web',
    source: 'Telegram',
    status: 'won',
    message: 'Klinikalar uchun bron tizimli sayt.',
    createdAt: '2026-05-01T10:12:00Z',
  },
  {
    id: 'GL-2445',
    name: 'Dilfuza Ismoilova',
    company: 'GreenGrocery',
    email: 'dilfuza@greengrocery.uz',
    phone: '+998 88 333 44 55',
    service: 'erp',
    source: 'Website',
    status: 'new',
    message: '5 ta filial — ombor + moliya birlashtirilgan.',
    createdAt: '2026-05-04T08:01:00Z',
  },
  {
    id: 'GL-2444',
    name: 'Jasur Abdullaev',
    company: 'AutoParts UZ',
    email: 'jasur@autoparts.uz',
    phone: '+998 90 999 11 22',
    service: 'crm',
    source: 'Referral',
    status: 'lost',
    message: 'CRM — ammo budget uchun moslashmadi.',
    createdAt: '2026-04-29T13:50:00Z',
  },
  {
    id: 'GL-2443',
    name: 'Kamola Mirzayeva',
    company: 'BookHive',
    email: 'kamola@bookhive.uz',
    phone: '+998 91 888 77 66',
    service: 'web',
    source: 'Instagram',
    status: 'qualified',
    message: 'Online kitoblar do`koni — Next.js + Sanity.',
    createdAt: '2026-05-02T09:33:00Z',
  },
  {
    id: 'GL-2442',
    name: 'Akmal Yusupov',
    company: 'FitClub',
    email: 'akmal@fitclub.uz',
    phone: '+998 99 666 55 44',
    service: 'mobile',
    source: 'LinkedIn',
    status: 'inProgress',
    message: 'Sport zal — abonement va trener bron.',
    createdAt: '2026-05-03T16:20:00Z',
  },
];

export function getLeadCountByStatus(status: LeadStatus | 'all'): number {
  if (status === 'all') return leads.length;
  return leads.filter((l) => l.status === status).length;
}
