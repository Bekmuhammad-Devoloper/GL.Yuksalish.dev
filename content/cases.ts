export type CaseStudy = {
  slug: string;
  client: string;
  subtitle?: string;
  vertical: string;
  year: number;
  service: string;
  cover: string;
  link?: string;
  metrics: { label: string; value: string }[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'imkon-crm',
    client: 'IMKON CRM',
    subtitle: 'Mehnat migratsiyasi yechimlari',
    vertical: 'CRM',
    year: 2025,
    service: 'crm',
    cover: '/banner(imkon).png',
    link: 'https://imkon-live.bekmuhammad.uz',
    metrics: [
      { label: 'Manual ops cut', value: '−80%' },
      { label: 'Roles unified', value: '5' },
      { label: 'Go-live', value: '11 wk' },
    ],
  },
  {
    slug: 'retail-crm',
    client: 'Marja Edu',
    subtitle: 'Wildberries · Import · Uzum · Brend',
    vertical: 'Retail',
    year: 2025,
    service: 'crm',
    cover: '/banner(marja edu).png',
    link: 'https://marjagroup.uz',
    metrics: [
      { label: 'Wildberries savdosi', value: '+3.5x' },
      { label: 'Import narxi', value: '−38%' },
      { label: 'Uzum CTR', value: '+42%' },
      { label: 'Brend tanilishi', value: '×2' },
    ],
  },
  {
    slug: 'fintech-bot',
    client: 'TenzorPay',
    vertical: 'Fintech',
    year: 2025,
    service: 'telegram-bots',
    cover:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
    metrics: [
      { label: 'Daily active users', value: '38k' },
      { label: 'Payment success', value: '99.4%' },
      { label: 'GMV / month', value: '$1.2M' },
    ],
  },
  {
    slug: 'realestate-mobile',
    client: 'Uy.uz',
    vertical: 'Real estate',
    year: 2024,
    service: 'mobile',
    cover:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    metrics: [
      { label: 'App store rating', value: '4.8★' },
      { label: 'Listings synced', value: '50k+' },
      { label: 'Time-to-lead', value: '−55%' },
    ],
  },
  {
    slug: 'edtech-ai',
    client: 'OqishGo',
    vertical: 'EdTech',
    year: 2025,
    service: 'ai',
    cover:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    metrics: [
      { label: 'Tutor hours saved', value: '7,400/mo' },
      { label: 'Student NPS', value: '+62' },
      { label: 'Languages', value: 'UZ · RU · EN' },
    ],
  },
  {
    slug: 'clinic-platform',
    client: 'MediHub',
    vertical: 'Healthcare',
    year: 2024,
    service: 'web',
    cover:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    metrics: [
      { label: 'Online bookings', value: '+210%' },
      { label: 'Page speed', value: '99 / 100' },
      { label: 'Clinics', value: '23' },
    ],
  },
];
