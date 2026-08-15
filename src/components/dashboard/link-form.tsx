"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toast-context";
import { linksService } from "@/services/links";
import { CreatorLink, LinkType } from "@/types";
import { Globe, ShoppingBag, Star, Gift, Lock } from "lucide-react";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  url: z.string().url("Enter a valid URL"),
  description: z.string().max(140, "Keep it under 140 characters").optional(),
  type: z.enum(["free", "paid", "password"]),
  price: z.coerce.number().optional(),
  currency: z.enum(["USD", "INR"]).optional(),
  buttonText: z.string().optional(),
  showOnPage: z.boolean().optional()
});
type FormValues = z.infer<typeof schema>;

const ICON_OPTIONS = [
  { icon: "globe", label: "Website", Icon: Globe },
  { icon: "shopping-bag", label: "Product", Icon: ShoppingBag },
  { icon: "star", label: "Tutorial", Icon: Star },
  { icon: "gift", label: "Consultation", Icon: Gift },
  { icon: "lock", label: "Private", Icon: Lock }
];

export function LinkForm({ initial }: { initial?: CreatorLink }) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedIcon, setSelectedIcon] = useState(initial?.icon ?? "globe");
  const {
    register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? "",
      url: initial?.url ?? "",
      description: initial?.description ?? "",
      type: initial?.type ?? "free",
      price: initial?.price,
      currency: initial?.currency ?? "USD",
      buttonText: "Unlock",
      showOnPage: initial?.isActive ?? true
    }
  });

  const type = watch("type") as LinkType;

  const onSubmit = async (values: FormValues) => {
    const payload = {
      title: values.title,
      url: values.url,
      description: values.description,
      type: values.type,
      price: values.type === "paid" ? values.price : undefined,
      currency: values.currency,
      icon: selectedIcon,
      color: "brand",
      isActive: values.showOnPage ?? true
    };

    const res = initial ? await linksService.update(initial.id, payload) : await linksService.create(payload);

    if (!res.success) {
      toast("Couldn't save link", { description: res.error, variant: "error" });
      return;
    }
    toast(initial ? "Link updated" : "Link created", { variant: "success" });
    router.push("/dashboard/links");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <Input label="Link title" placeholder="Exclusive Tutorials" error={errors.title?.message} {...register("title")} />
      <Input label="Destination URL" placeholder="https://yourlink.com/ebook" error={errors.url?.message} {...register("url")} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-800 dark:text-paper-100">Description (optional)</label>
        <textarea
          rows={3}
          placeholder="Get my exclusive eBook on business growth & strategies."
          className="rounded-xl2 border border-ink-900/10 bg-white px-3.5 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-white/10 dark:bg-ink-900 dark:text-paper-50"
          {...register("description")}
        />
        {errors.description && <p className="text-xs font-medium text-danger">{errors.description.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-ink-800 dark:text-paper-100">Icon</label>
        <div className="mt-2 flex gap-2">
          {ICON_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.icon}
              onClick={() => setSelectedIcon(opt.icon)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl2 border transition ${selectedIcon === opt.icon ? "border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300" : "border-ink-900/10 text-ink-400 hover:border-ink-900/20 dark:border-white/10"}`}
              aria-label={opt.label}
            >
              <opt.Icon className="h-4.5 w-4.5" />
            </button>
          ))}
        </div>
      </div>

      <Select label="Link type" {...register("type")}>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
        <option value="password">Password protected</option>
      </Select>

      {type === "paid" && (
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-brand-100 bg-brand-50/50 p-4 dark:border-brand-500/20 dark:bg-brand-500/5">
          <Input label="Price" type="number" step="0.01" min={0} error={errors.price?.message} {...register("price")} />
          <Select label="Currency" {...register("currency")}>
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
          </Select>
          <div className="col-span-2">
            <Input label="Button text" placeholder="Unlock for $2.99" {...register("buttonText")} />
          </div>
        </div>
      )}

      <Toggle
        checked={watch("showOnPage") ?? true}
        onChange={(checked) => setValue("showOnPage", checked)}
        label="Show on my page"
        description="Turn off to hide this link without deleting it"
      />

      <div className="mt-2 flex gap-3">
        <Button type="submit" loading={isSubmitting} className="flex-1">{initial ? "Save changes" : "Create link"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
