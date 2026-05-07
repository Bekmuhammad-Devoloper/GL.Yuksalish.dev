import { getRequestConfig } from 'next-intl/server';

export const locales = ['uz', 'ru', 'en'] as const;
export const defaultLocale = 'uz';
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested as Locale)
    ? (requested as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
