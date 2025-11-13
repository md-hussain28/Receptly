// src/lib/receptlyData.ts
import type { CardConfig } from "@/types/common";

export const cardConfigs: CardConfig[] = [
  {
    bgColor: "bg-blue-400",
    content: { type: "form-builder", title: "Create Your Form", subtitle: "Drag & Drop Builder" },
  },
  {
    bgColor: "bg-purple-400",
    content: { type: "analytics", title: "Response Analytics", subtitle: "Real-Time Insights" },
  },
  {
    bgColor: "bg-green-400",
    content: { type: "recent-feedback", title: "Recent Feedback", subtitle: "Live Responses" },
  },
  {
    bgColor: "bg-orange-400",
    content: { type: "share-link", title: "Share Your Form", subtitle: "One Click Distribution" },
  },
];
