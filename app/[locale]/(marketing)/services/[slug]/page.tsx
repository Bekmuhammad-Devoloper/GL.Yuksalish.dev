import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { ProcessSection } from '@/components/marketing/process-section';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { services, getService } from '@/content/services';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(params.locale);

  const { locale, slug } = params;
  const service = getService(slug);
  if (!service) notFound();

  const t = useTranslations('service');
  const ts = useTranslations('services.items');
  const Icon = service.icon;

  const adjacent = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.18),_transparent_70%)] blur-2xl" />
        </div>
        <div className="container">
          <Link
            href={`/${locale}#services`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToServices')}
          </Link>

          <div className="mt-8 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium backdrop-blur">
              <Icon className="h-4 w-4 text-primary" strokeWidth={1.6} />
              <span className="font-mono text-xs text-muted-foreground">
                {service.number}
              </span>
              <span>{ts(`${slug}.tagline` as any)}</span>
            </div>
            <h1 className="font-display text-[34px] font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
              {ts(`${slug}.title` as any)}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg text-pretty">
              {ts(`${slug}.description` as any)}
            </p>
            <Link href={`/${locale}/contact?service=${slug}`} className="w-full sm:w-auto">
              <Button size="lg" className="mt-2 w-full sm:w-auto">
                {t('startProject')}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Section className="!py-12 sm:!py-16">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t('deliverables')}
              </h2>
              <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:border-primary/30"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t('stack')}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                {service.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-full px-4 py-2 text-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Adjacent services
                </p>
                <ul className="mt-4 space-y-1">
                  {adjacent.map((s) => {
                    const SIcon = s.icon;
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/${locale}/services/${s.slug}`}
                          className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                        >
                          <span className="flex items-center gap-2.5">
                            <SIcon className="h-4 w-4 text-primary" strokeWidth={1.6} />
                            {ts(`${s.slug}.title` as any)}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-foreground" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
