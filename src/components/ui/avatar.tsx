import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps { src?: string; name: string; size?: number; className?: string; }

export function Avatar({ src, name, size = 40, className }: AvatarProps) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className={cn("flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-semibold text-white", className)}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}
