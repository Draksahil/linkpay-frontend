import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-ink-400">Last updated: August 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-600 dark:text-paper-100/60">
          <p>This is placeholder terms copy for the frontend build. Replace with your real terms before launch.</p>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">1. Using LinkPay</h2>
            <p className="mt-2">You&apos;re responsible for the content and pricing of the links you publish on your page.</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">2. Fees</h2>
            <p className="mt-2">LinkPay deducts a platform fee from each successful paid unlock before payout.</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">3. Payouts</h2>
            <p className="mt-2">Payouts are sent to the withdrawal method you configure in Settings, subject to provider processing times.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
