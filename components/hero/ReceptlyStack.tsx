// src/components/hero/ReceptlyStack.tsx
"use client";

import React, { useState, useEffect, useTransition, useMemo } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cardAnim, getPos } from "@/components/motion/motionConfig";
import { cardConfigs as configs } from "@/lib/receptlyData";
import { FormBuilderCard, AnalyticsCard, LiveFeedbackCard, ShareLinkCard } from "./CardContent";

export default function ReceptlyStack() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cardConfigs = useMemo(() => configs, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      startTransition(() => setCurrentCard((c) => (c + 1) % cardConfigs.length));
    }, 3000);
    return () => clearInterval(t);
  }, [isPaused, cardConfigs.length]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setIsPaused(true);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
      `}</style>

      <button
        className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-2.5 md:py-4 rounded-lg md:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl mb-8 md:mb-16 flex items-center space-x-2 text-sm md:text-base font-medium group focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        aria-label="Start creating feedback forms"
      >
        <span>Start Free Trial</span>
        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <LayoutGroup>
        <div
          className="relative w-full max-w-3xl mx-auto px-2 md:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Interactive feedback platform features"
          aria-live="polite"
          style={{
            perspective: 1100,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative h-[460px] md:h-[500px]">
            {cardConfigs.map((cfg, i) => {
              const pos = getPos(i, currentCard, cardConfigs.length);
              const isFront = pos === 0;

              return (
                <motion.div
                  key={i}
                  className={`absolute inset-0 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 flex flex-col ${cfg.bgColor}`}
                  custom={{ pos }}
                  initial={false}
                  animate="target"
                  whileHover="hover"
                  variants={cardAnim}
                  style={{
                    pointerEvents: isFront ? "auto" : "none",
                    willChange: "transform, opacity",
                    transformOrigin: "50% 60%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    filter: pos === 1 ? "blur(0.3px)" : pos === 2 ? "blur(0.6px)" : "none",
                    boxShadow:
                      pos === 0
                        ? "0 10px 30px rgba(0,0,0,0.25)"
                        : pos === 1
                        ? "0 8px 24px rgba(0,0,0,0.18)"
                        : pos === 2
                        ? "0 6px 18px rgba(0,0,0,0.14)"
                        : "none",
                  }}
                  aria-hidden={!isFront}
                >
                  <div className="bg-white/25 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1.5 md:space-x-2" role="group" aria-label="Window controls">
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-400 rounded-full" />
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full" />
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full" />
                      </div>
                      <motion.span
                        layoutId="card-title"
                        className="text-xs md:text-sm text-black/70 font-medium bg-white/30 px-2 md:px-3 py-1 rounded-full whitespace-nowrap max-w-[180px] md:max-w-none truncate"
                      >
                        {cfg.content.title}
                      </motion.span>
                    </div>

                    <div className="space-y-2.5 md:space-y-4 overflow-y-auto max-h-80 md:max-h-[380px] pr-1">
                      {cfg.content.type === "form-builder" && <FormBuilderCard />}
                      {cfg.content.type === "analytics" && <AnalyticsCard />}
                      {cfg.content.type === "recent-feedback" && <LiveFeedbackCard />}
                      {cfg.content.type === "share-link" && <ShareLinkCard />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-2 mt-6 md:mt-8" role="tablist" aria-label="Feature cards">
            {cardConfigs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${
                  currentCard === index ? "w-8 bg-purple-600 scale-110" : "w-2 bg-gray-400 hover:bg-gray-600"
                }`}
                role="tab"
                aria-selected={currentCard === index}
                aria-label={`View ${cardConfigs[index].content.title}`}
              />
            ))}
          </div>
        </div>
      </LayoutGroup>

      <div className="mt-8 md:mt-12 text-center px-4 w-full">
        <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
          Trusted by 500+ companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 text-xs text-gray-600">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            No credit card required
          </span>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <span className="whitespace-nowrap">14-day free trial</span>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <span className="whitespace-nowrap">Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
