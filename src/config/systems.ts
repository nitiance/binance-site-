export type SystemId = "pos" | "inventory" | "analytics" | "offline-sync";

export type SystemCard = {
  id: SystemId;
  title: string;
  shortLine: string;
  path: string;
  accent: string;
};

export type SystemDetail = SystemCard & {
  intro: string;
  highlights: string[];
  delivery: string[];
  previews: Array<{ title: string; detail: string }>;
};

export const systemDetails: SystemDetail[] = [
  {
    id: "pos",
    title: "POS Terminal",
    shortLine: "Fast checkout with barcode scanning",
    path: "/systems/pos",
    accent: "#0B1F3B",
    intro:
      "A fast, keyboard-first point-of-sale module within the BinanceXI business system suite. Built for daily volume and low-friction checkout, with barcode scanning, cash handling, and receipt generation.",
    highlights: [
      "Rapid item lookup with scanner and hotkeys",
      "Discount rules and clean cashier workflow",
      "Receipt printing and transaction history",
      "Works in low-connectivity environments",
    ],
    delivery: [
      "Operational POS workflow mapped to your store",
      "Cashier training notes and onboarding checklist",
      "Deployment options for single-branch or multi-branch",
    ],
    previews: [
      { title: "Checkout lane", detail: "Barcode-first cart and quick tender controls" },
      { title: "Receipt flow", detail: "Digital and print-friendly receipt output" },
      { title: "Daily close", detail: "Shift summary and transaction reconciliation" },
    ],
  },
  {
    id: "inventory",
    title: "Inventory Dashboard",
    shortLine: "Stock tracking & alerts",
    path: "/systems/inventory",
    accent: "#0F2A1D",
    intro:
      "An inventory control module within the BinanceXI business system suite for tracking stock movement, low-stock alerts, and purchase planning across one or multiple locations.",
    highlights: [
      "Current stock visibility by product and branch",
      "Low-stock and out-of-stock alert thresholds",
      "Stock movement audit trail",
      "Supplier-aware replenishment planning",
    ],
    delivery: [
      "Category and SKU structure tailored to your business",
      "Transfer and adjustment workflows",
      "Reporting views for procurement decisions",
    ],
    previews: [
      { title: "Stock board", detail: "At-a-glance levels by product and branch" },
      { title: "Alert console", detail: "Threshold warnings for restock actions" },
      { title: "Movement log", detail: "Auditable inflow, outflow, and adjustments" },
    ],
  },
  {
    id: "analytics",
    title: "Sales Analytics",
    shortLine: "Profit analysis & reporting",
    path: "/systems/analytics",
    accent: "#3B0D0D",
    intro:
      "An analytics module within the BinanceXI business system suite that turns daily transactions into clear profit, margin, and performance signals your team can act on quickly.",
    highlights: [
      "Revenue, margin, and trend summaries",
      "Top products, categories, and branch comparisons",
      "Expense-aware profitability views",
      "Export-ready monthly and quarterly reports",
    ],
    delivery: [
      "Executive summary dashboard",
      "Operator-level detail reports",
      "KPI definitions aligned with your operating model",
    ],
    previews: [
      { title: "Profit map", detail: "Margin and contribution by category" },
      { title: "Branch compare", detail: "Performance spread across locations" },
      { title: "Period reports", detail: "Monthly and quarterly exports" },
    ],
  },
  {
    id: "offline-sync",
    title: "Offline Sync Engine",
    shortLine: "Hybrid operation with automatic reconciliation",
    path: "/systems/offline-sync",
    accent: "#B08D57",
    intro:
      "A resilience module within the BinanceXI business system suite that keeps operations running offline and synchronizes safely when internet access returns, reducing downtime risk.",
    highlights: [
      "Offline-first transaction capture",
      "Conflict-aware sync and reconciliation",
      "Queue visibility for pending operations",
      "Designed for unstable connectivity regions",
    ],
    delivery: [
      "Hybrid architecture recommendations",
      "Sync policy and conflict rules",
      "Recovery runbook for support teams",
    ],
    previews: [
      { title: "Offline queue", detail: "Local operations captured without internet" },
      { title: "Sync monitor", detail: "Pending, success, and retry visibility" },
      { title: "Conflict review", detail: "Safe merge and reconciliation tools" },
    ],
  },
];

export const systemCards: SystemCard[] = systemDetails.map(
  ({ id, title, shortLine, path, accent }) => ({
    id,
    title,
    shortLine,
    path,
    accent,
  }),
);

export const getSystemById = (systemId: string) =>
  systemDetails.find((system) => system.id === systemId);
