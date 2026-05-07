export type NotificationKind = 'lead' | 'message' | 'project' | 'system';

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string; // ISO or relative
  read: boolean;
  href?: string;
};

export const seedNotifications: Notification[] = [
  {
    id: 'n-001',
    kind: 'lead',
    title: 'Yangi murojaat — TenzorPay',
    description: 'WebApp + Click + Payme to`lov boti',
    time: '2 daqiqa avval',
    read: false,
    href: '/admin/leads',
  },
  {
    id: 'n-002',
    kind: 'lead',
    title: 'Yangi murojaat — OqishGo',
    description: 'AI tutor + RAG hujjatlardan savol-javob',
    time: '14 daqiqa avval',
    read: false,
    href: '/admin/leads',
  },
  {
    id: 'n-003',
    kind: 'message',
    title: 'Bekzod Rakhimov javob qoldirdi',
    description: '"Smetani 15-iyungacha kuting"',
    time: '1 soat avval',
    read: false,
    href: '/admin/leads',
  },
  {
    id: 'n-004',
    kind: 'project',
    title: 'Markaz Market — milestone yopildi',
    description: 'CRM Sales pipeline modul qabul qilindi',
    time: '3 soat avval',
    read: true,
    href: '/admin/projects',
  },
  {
    id: 'n-005',
    kind: 'system',
    title: 'Hafta hisoboti tayyor',
    description: '38 ta murojaat · 12 yopilgan · konversiya +14%',
    time: 'kecha',
    read: true,
  },
];

// pool of mock leads to simulate real-time arrivals
export const liveLeadPool = [
  { name: 'Alisher Saidov', company: 'StonePro', service: 'CRM' },
  { name: 'Madina Karimova', company: 'BeautyHub', service: 'Mobile ilova' },
  { name: 'Sherzod Komilov', company: 'AutoFlow', service: 'Telegram bot' },
  { name: 'Dilnoza Rahmonova', company: 'EduTech', service: 'AI integratsiya' },
  { name: 'Otabek Yo`ldoshev', company: 'AgroLink', service: 'ERP' },
  { name: 'Lola Ismoilova', company: 'CafeNet', service: 'Sayt' },
];
