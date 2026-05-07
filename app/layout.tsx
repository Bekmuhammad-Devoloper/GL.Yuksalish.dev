import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://itgroup.germaniya-live.uz'),
  title: {
    default: 'ITGroup Germaniya Live — CRM, ERP, Mobile, AI',
    template: '%s — ITGroup Germaniya Live',
  },
  description:
    'We build CRM, ERP, mobile apps, web platforms, Telegram bots and AI integrations for businesses that move fast.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0a08' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
