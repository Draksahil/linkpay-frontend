import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-400">Last updated: August 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-600 dark:text-paper-100/60">
          <p>This is placeholder policy copy for the frontend build. Replace with your real privacy policy before launch.</p>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">1. Information we collect</h2>
            <p className="mt-2">Account details, profile content, and transaction metadata needed to operate LinkPay.</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">2. How we use it</h2>
            <p className="mt-2">To operate creator pages, process payments through our providers, and improve the product.</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-paper-50">3. Payment data</h2>
            <p className="mt-2">Card details are handled entirely by our payment providers and never touch LinkPay&apos;s servers.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
