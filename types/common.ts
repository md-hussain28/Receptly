// src/types/receptly.ts
export type CardKind = "form-builder" | "analytics" | "recent-feedback" | "share-link";

export interface CardConfig {
  bgColor: string;
  content: {
    type: CardKind;
    title: string;
    subtitle: string;
  };
}
