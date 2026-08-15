export type UserRole = "guest" | "creator" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  socials: { platform: SocialPlatform; url: string }[];
  theme: ProfileTheme;
}

export type SocialPlatform = "instagram" | "twitter" | "youtube" | "tiktok" | "website";

export interface ProfileTheme {
  background: "solid" | "gradient" | "image";
  backgroundValue: string;
  buttonStyle: "filled" | "outline" | "soft";
  buttonRadius: "sharp" | "rounded" | "pill";
  font: "inter" | "space-grotesk" | "manrope";
}

export type LinkType = "free" | "paid" | "password";

export interface CreatorLink {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  url: string;
  icon: string;
  color: string;
  type: LinkType;
  price?: number;
  currency?: "USD" | "INR";
  isActive: boolean;
  clicks: number;
  order: number;
}

export type TransactionStatus = "pending" | "success" | "failed" | "refunded";

export interface Transaction {
  id: string;
  linkId: string;
  linkTitle: string;
  buyerEmail: string;
  amount: number;
  currency: "USD" | "INR";
  platformFee: number;
  status: TransactionStatus;
  createdAt: string;
}

export type PayoutStatus = "pending" | "processing" | "completed" | "failed";

export interface Payout {
  id: string;
  amount: number;
  currency: "USD" | "INR";
  method: "bank" | "upi" | "paypal";
  status: PayoutStatus;
  requestedAt: string;
  completedAt?: string;
}

export interface AnalyticsPoint {
  date: string;
  views: number;
  clicks: number;
  revenue: number;
}

export interface AnalyticsSummary {
  views: number;
  uniqueVisitors: number;
  clicks: number;
  ctr: number;
  revenue: number;
  conversionRate: number;
  series: AnalyticsPoint[];
  topLinks: { title: string; clicks: number; revenue: number }[];
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export type ToastVariant = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}
