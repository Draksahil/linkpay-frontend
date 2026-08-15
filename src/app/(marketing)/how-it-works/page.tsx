import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink-950 dark:text-paper-50">How LinkPay works</h1>
          <p className="mt-3 text-ink-500 dark:text-paper-100/50">From your first link to your first payout — here&apos;s the whole loop.</p>
        </div>
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
