export type AdminRole = 'Admin' | 'Manager' | 'Member';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
};

export const adminUsers: AdminUser[] = [
  {
    id: 'u-001',
    name: 'Bekmuhammad Devoloper',
    email: 'bekmuhammad.devoloper@gmail.com',
    role: 'Admin',
    active: true,
    createdAt: '2024-12-01',
  },
  {
    id: 'u-002',
    name: 'Sardor Tursunov',
    email: 'sardor@germaniya-live.uz',
    role: 'Manager',
    active: true,
    createdAt: '2025-02-14',
  },
  {
    id: 'u-003',
    name: 'Aziza Yusupova',
    email: 'aziza@germaniya-live.uz',
    role: 'Member',
    active: true,
    createdAt: '2025-04-22',
  },
  {
    id: 'u-004',
    name: 'Diyor Karimov',
    email: 'diyor@germaniya-live.uz',
    role: 'Member',
    active: false,
    createdAt: '2025-06-10',
  },
  {
    id: 'u-005',
    name: 'Madina Saidova',
    email: 'madina@germaniya-live.uz',
    role: 'Manager',
    active: true,
    createdAt: '2025-09-03',
  },
];
