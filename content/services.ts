import {
  Brain,
  Bot,
  Globe,
  Smartphone,
  Database,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';

export type ServiceSlug =
  | 'crm'
  | 'erp'
  | 'mobile'
  | 'web'
  | 'telegram-bots'
  | 'ai';

export type Service = {
  slug: ServiceSlug;
  icon: LucideIcon;
  number: string;
  stack: string[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: 'crm',
    icon: LayoutDashboard,
    number: '01',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'WebSocket'],
    deliverables: [
      'Sales pipeline & kanban',
      'Lead capture & scoring',
      'Telegram & WhatsApp inbox',
      'Role-based access control',
      'Reporting & analytics',
      'API & integrations',
    ],
  },
  {
    slug: 'erp',
    icon: Database,
    number: '02',
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker'],
    deliverables: [
      'Inventory & warehousing',
      'Finance & accounting',
      'HR & payroll',
      'Procurement & vendors',
      'Multi-branch support',
      '1C / accounting integrations',
    ],
  },
  {
    slug: 'mobile',
    icon: Smartphone,
    number: '03',
    stack: ['React Native', 'Expo', 'Swift', 'Kotlin', 'Firebase'],
    deliverables: [
      'iOS & Android apps',
      'Push notifications',
      'Offline-first architecture',
      'Payment SDKs',
      'Biometric auth',
      'Analytics & crash reporting',
    ],
  },
  {
    slug: 'web',
    icon: Globe,
    number: '04',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Sanity', 'Vercel'],
    deliverables: [
      'Marketing sites',
      'SaaS dashboards',
      'E-commerce platforms',
      'Headless CMS',
      'SEO & performance',
      'A/B testing & analytics',
    ],
  },
  {
    slug: 'telegram-bots',
    icon: Bot,
    number: '05',
    stack: ['grammY', 'Telegram WebApp', 'Click', 'Payme', 'Stripe'],
    deliverables: [
      'Conversational bots',
      'WebApp mini-apps',
      'Click & Payme payments',
      'Stripe subscriptions',
      'Admin broadcast tooling',
      'Multi-language flows',
    ],
  },
  {
    slug: 'ai',
    icon: Brain,
    number: '06',
    stack: ['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'Whisper'],
    deliverables: [
      'LLM-powered chat & search',
      'Document Q&A (RAG)',
      'Voice-to-action agents',
      'Workflow automation',
      'Custom fine-tuning',
      'On-prem deployments',
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
