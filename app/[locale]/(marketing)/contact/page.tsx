'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  Instagram,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  MoreHorizontal,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';

function makeSchema(t: (key: string) => string) {
  return z.object({
    service: z
      .string({ required_error: t('validation.service') })
      .min(1, t('validation.service')),
    firstName: z.string().min(2, t('validation.firstName')),
    lastName: z.string().min(2, t('validation.lastName')),
    phone: z.string().min(7, t('validation.phone')),
    description: z.string().optional().or(z.literal('')),
  });
}

type FormData = z.infer<ReturnType<typeof makeSchema>>;

export default function ContactPage() {
  return (
    <React.Suspense fallback={null}>
      <ContactContent />
    </React.Suspense>
  );
}

function ContactContent() {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const tServices = useTranslations('services.items');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const preselect = searchParams.get('service');

  const [submitted, setSubmitted] = React.useState(false);
  const schema = React.useMemo(() => makeSchema(tForm), [tForm]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: preselect ?? undefined },
  });

  const selectedService = watch('service');
  const isOther = selectedService === 'other';

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    toast.success(tForm('successTitle'));
  };

  const onReset = () => {
    reset({ service: undefined, firstName: '', lastName: '', phone: '', description: '' });
    setSubmitted(false);
  };

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-28 sm:pb-12 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(20_95%_54%/0.18),_transparent_70%)] blur-2xl" />
        </div>
        <div className="container">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </div>
      </section>

      <Section className="!pt-2 !pb-16 sm:!pt-4 sm:!pb-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
            {/* ORDER FORM */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[480px] flex-col items-center justify-center p-8 text-center sm:p-10"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.15,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                      <CheckCircle2 className="h-10 w-10" strokeWidth={1.6} />
                    </motion.div>
                    <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      {tForm('successTitle')}
                    </h3>
                    <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                      {tForm('successDesc')}
                    </p>
                    <Button variant="outline" onClick={onReset} className="mt-8">
                      {tForm('newOrder')}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-5 sm:p-8 lg:p-10"
                    noValidate
                  >
                    {/* STEP 1 — service */}
                    <StepHeader number="01" label={tForm('stepService')} />
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {services.map((s) => (
                        <ServiceTile
                          key={s.slug}
                          slug={s.slug}
                          icon={s.icon}
                          title={tServices(`${s.slug}.title` as any)}
                          tagline={tServices(`${s.slug}.tagline` as any)}
                          active={selectedService === s.slug}
                          onClick={() =>
                            setValue('service', s.slug, { shouldValidate: true })
                          }
                        />
                      ))}
                      <ServiceTile
                        slug="other"
                        icon={MoreHorizontal}
                        title={tForm('other')}
                        tagline={tForm('otherTagline')}
                        active={isOther}
                        dashed
                        fullSpan
                        onClick={() =>
                          setValue('service', 'other', { shouldValidate: true })
                        }
                      />
                    </div>
                    {errors.service?.message && (
                      <p className="mt-3 text-xs text-destructive">{errors.service.message}</p>
                    )}

                    <Divider />

                    {/* STEP 2 — contact */}
                    <StepHeader number="02" label={tForm('stepContact')} />
                    <div className="mt-5 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label={tForm('firstName')}
                          error={errors.firstName?.message}
                        >
                          <Input
                            {...register('firstName')}
                            placeholder={tForm('firstNamePlaceholder')}
                            autoComplete="given-name"
                          />
                        </Field>
                        <Field
                          label={tForm('lastName')}
                          error={errors.lastName?.message}
                        >
                          <Input
                            {...register('lastName')}
                            placeholder={tForm('lastNamePlaceholder')}
                            autoComplete="family-name"
                          />
                        </Field>
                      </div>
                      <Field label={tForm('phone')} error={errors.phone?.message}>
                        <PhoneInput
                          register={register('phone')}
                          placeholder={tForm('phonePlaceholder')}
                        />
                      </Field>
                      <Field
                        label={tForm('description')}
                        optional={tForm('descriptionOptional')}
                        error={errors.description?.message}
                      >
                        <Textarea
                          {...register('description')}
                          rows={4}
                          placeholder={
                            isOther
                              ? tForm('descriptionPlaceholderOther')
                              : tForm('descriptionPlaceholder')
                          }
                        />
                      </Field>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="mt-8 w-full sm:w-auto"
                    >
                      {isSubmitting ? tForm('sending') : tForm('submit')}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CHANNELS */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <h3 className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t('channels.title')}
              </h3>
              <Channel
                icon={Phone}
                label={t('channels.phone')}
                value="+998 71 200 00 00"
                href="tel:+998712000000"
              />
              <Channel
                icon={Send}
                label={t('channels.telegram')}
                value="@germaniya_live"
                href="https://t.me/Yuksalish_development"
              />
              <Channel
                icon={Instagram}
                label={t('channels.instagram')}
                value="@germaniya.live"
                href="https://instagram.com/germaniya.live"
              />
              <Channel
                icon={Mail}
                label={t('channels.email')}
                value="hello@germaniya-live.uz"
                href="mailto:hello@germaniya-live.uz"
              />
            </motion.aside>
          </div>
        </div>
      </Section>
    </>
  );
}

function ServiceTile({
  slug,
  icon: Icon,
  title,
  tagline,
  active,
  dashed,
  fullSpan,
  onClick,
}: {
  slug: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  tagline: string;
  active: boolean;
  dashed?: boolean;
  fullSpan?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group relative flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all min-h-[68px] active:scale-[0.99] sm:p-4',
        dashed && !active && 'border-dashed',
        active
          ? 'border-primary/50 bg-primary/5 shadow-[0_0_0_4px_hsl(20_95%_54%/0.1)]'
          : 'border-border bg-background hover:border-primary/30 hover:bg-accent/30',
        fullSpan && 'sm:col-span-2',
      )}
    >
      <div
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors',
          active
            ? 'border-primary/40 bg-primary/10 text-primary'
            : 'border-border bg-card text-muted-foreground group-hover:text-primary',
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{tagline}</p>
      </div>
      {active && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}

function PhoneInput({
  register,
  placeholder,
}: {
  register: ReturnType<ReturnType<typeof useForm<FormData>>['register']>;
  placeholder: string;
}) {
  return (
    <div className="flex h-12 w-full items-stretch overflow-hidden rounded-xl border border-input bg-background transition-colors focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/15 sm:h-11">
      <span className="flex shrink-0 items-center gap-2 border-r border-border bg-muted/50 px-3.5 text-sm font-medium text-muted-foreground sm:px-4">
        <span aria-hidden className="text-base">🇺🇿</span>
        +998
      </span>
      <input
        {...register}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
      />
    </div>
  );
}

function StepHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-mono text-[11px] font-semibold text-primary">
        {number}
      </span>
      <h3 className="font-display text-base font-semibold tracking-tight sm:text-lg">
        {label}
      </h3>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Divider() {
  return <div className="my-7 h-px bg-border sm:my-8" />;
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label className="text-sm">{label}</Label>
        {optional && (
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {optional}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Channel({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href: string;
}) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-card transition-all active:scale-[0.99] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover sm:p-5"
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-accent/40 to-background text-primary">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 truncate text-sm font-medium">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-foreground" />
    </a>
  );
}
