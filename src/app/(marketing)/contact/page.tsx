"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toast-context";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-20 sm:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            <Mail className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50">Get in touch</h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-paper-100/50">Questions, partnership ideas, or just feedback — we read everything.</p>
        </div>
        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              toast("Message sent", { description: "We'll get back to you within one business day.", variant: "success" });
            }, 900);
          }}
        >
          <Input label="Your name" placeholder="Alex Smith" required />
          <Input label="Email" type="email" placeholder="you@example.com" required />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-ink-800 dark:text-paper-100">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="How can we help?"
              className="rounded-xl2 border border-ink-900/10 bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-900 dark:text-paper-50"
            />
          </div>
          <Button type="submit" loading={loading} className="mt-2">Send message</Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
