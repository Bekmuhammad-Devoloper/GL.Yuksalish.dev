import { Hero } from '@/components/marketing/hero';
import { TrustStrip } from '@/components/marketing/trust-strip';
import { ServicesGrid } from '@/components/marketing/services-grid';
import { ProcessSection } from '@/components/marketing/process-section';
import { CasesSection } from '@/components/marketing/cases-section';
import { WhyUs } from '@/components/marketing/why-us';
import { StatsStrip } from '@/components/marketing/stats-strip';
import { Testimonials } from '@/components/marketing/testimonials';
import { CtaBanner } from '@/components/marketing/cta-banner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <ProcessSection />
      <CasesSection />
      <WhyUs />
      <StatsStrip />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
