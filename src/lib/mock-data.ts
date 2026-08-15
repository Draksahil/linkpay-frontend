import {
  AnalyticsSummary,
  CreatorLink,
  CreatorProfile,
  Notification,
  Payout,
  Transaction
} from "@/types";

export const mockCreator: CreatorProfile = {
  id: "creator_1",
  userId: "user_1",
  username: "alexsmith",
  displayName: "Alex Smith",
  bio: "Content creator & entrepreneur. I write about design systems and indie products.",
  avatarUrl: "https://i.pravatar.cc/160?img=13",
  verified: true,
  socials: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "twitter", url: "https://twitter.com" },
    { platform: "youtube", url: "https://youtube.com" },
    { platform: "tiktok", url: "https://tiktok.com" }
  ],
  theme: {
    background: "gradient",
    backgroundValue: "brand",
    buttonStyle: "soft",
    buttonRadius: "rounded",
    font: "space-grotesk"
  }
};

export const mockLinks: CreatorLink[] = [
  { id: "link_1", creatorId: "creator_1", title: "My Website", description: "Visit my official website", url: "https://alexsmith.com", icon: "globe", color: "brand", type: "free", isActive: true, clicks: 3120, order: 0 },
  { id: "link_2", creatorId: "creator_1", title: "My Digital Products", description: "Check out my premium products", url: "https://alexsmith.com/shop", icon: "shopping-bag", color: "emerald", type: "paid", price: 12, currency: "USD", isActive: true, clicks: 964, order: 1 },
  { id: "link_3", creatorId: "creator_1", title: "Exclusive Tutorials", description: "Premium guides & tutorials", url: "https://alexsmith.com/tutorials", icon: "star", color: "rose", type: "paid", price: 2.99, currency: "USD", isActive: true, clicks: 845, order: 2 },
  { id: "link_4", creatorId: "creator_1", title: "1:1 Consultation", description: "Book a private session with me", url: "https://alexsmith.com/consult", icon: "gift", color: "amber", type: "paid", price: 19.99, currency: "USD", isActive: true, clicks: 645, order: 3 },
  { id: "link_5", creatorId: "creator_1", title: "Private Notes", description: "Password protected archive", url: "https://alexsmith.com/notes", icon: "lock", color: "slate", type: "password", isActive: false, clicks: 88, order: 4 }
];

export const mockTransactions: Transaction[] = [
  { id: "txn_1", linkId: "link_4", linkTitle: "1:1 Consultation", buyerEmail: "john.doe@example.com", amount: 19.99, currency: "USD", platformFee: 1.0, status: "success", createdAt: "2026-08-09T10:12:00Z" },
  { id: "txn_2", linkId: "link_3", linkTitle: "Exclusive Tutorials", buyerEmail: "mike.brown@example.com", amount: 2.99, currency: "USD", platformFee: 0.15, status: "success", createdAt: "2026-08-08T15:40:00Z" },
  { id: "txn_3", linkId: "link_2", linkTitle: "My Digital Products", buyerEmail: "sarah.wilson@example.com", amount: 4.99, currency: "USD", platformFee: 0.25, status: "success", createdAt: "2026-08-07T09:05:00Z" },
  { id: "txn_4", linkId: "link_3", linkTitle: "Exclusive Tutorials", buyerEmail: "priya.k@example.com", amount: 2.99, currency: "USD", platformFee: 0.15, status: "pending", createdAt: "2026-08-06T18:22:00Z" },
  { id: "txn_5", linkId: "link_4", linkTitle: "1:1 Consultation", buyerEmail: "leo.n@example.com", amount: 19.99, currency: "USD", platformFee: 1.0, status: "failed", createdAt: "2026-08-05T12:00:00Z" },
  { id: "txn_6", linkId: "link_2", linkTitle: "My Digital Products", buyerEmail: "amara.o@example.com", amount: 4.99, currency: "USD", platformFee: 0.25, status: "refunded", createdAt: "2026-08-02T08:31:00Z" }
];

export const mockPayouts: Payout[] = [
  { id: "po_1", amount: 850, currency: "USD", method: "bank", status: "completed", requestedAt: "2026-05-15T00:00:00Z", completedAt: "2026-05-17T00:00:00Z" },
  { id: "po_2", amount: 620, currency: "USD", method: "upi", status: "completed", requestedAt: "2026-04-30T00:00:00Z", completedAt: "2026-05-01T00:00:00Z" },
  { id: "po_3", amount: 246, currency: "USD", method: "paypal", status: "processing", requestedAt: "2026-08-10T00:00:00Z" }
];

export const mockAnalytics: AnalyticsSummary = {
  views: 18420,
  uniqueVisitors: 12980,
  clicks: 7832,
  ctr: 4.8,
  revenue: 24580,
  conversionRate: 4.8,
  series: [
    { date: "Aug 1", views: 420, clicks: 180, revenue: 320 },
    { date: "Aug 2", views: 512, clicks: 210, revenue: 410 },
    { date: "Aug 3", views: 380, clicks: 160, revenue: 260 },
    { date: "Aug 4", views: 610, clicks: 260, revenue: 520 },
    { date: "Aug 5", views: 705, clicks: 300, revenue: 640 },
    { date: "Aug 6", views: 590, clicks: 240, revenue: 480 },
    { date: "Aug 7", views: 820, clicks: 350, revenue: 710 },
    { date: "Aug 8", views: 940, clicks: 402, revenue: 890 },
    { date: "Aug 9", views: 880, clicks: 375, revenue: 820 },
    { date: "Aug 10", views: 1020, clicks: 440, revenue: 990 }
  ],
  topLinks: [
    { title: "My Website", clicks: 1200, revenue: 0 },
    { title: "Exclusive Tutorials", clicks: 845, revenue: 2526 },
    { title: "1:1 Consultation", clicks: 645, revenue: 12893 },
    { title: "Design Resources", clicks: 320, revenue: 1596 }
  ]
};

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Payment received", body: "Sarah Wilson unlocked Exclusive Tutorials for $2.99", read: false, createdAt: "2026-08-10T09:00:00Z" },
  { id: "n2", title: "Payout completed", body: "Your withdrawal of $850.00 has been sent to your bank account", read: false, createdAt: "2026-08-09T14:00:00Z" },
  { id: "n3", title: "New follower milestone", body: "Your page just crossed 10,000 profile views", read: true, createdAt: "2026-08-05T11:00:00Z" }
];
