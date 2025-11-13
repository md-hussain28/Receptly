


import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
} from "react";
import {
  MessageSquare,
  Link2,
  BarChart3,
  FileText,
  Star,
  TrendingUp,
  Users,
  Send,
} from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import type { Variants, TargetAndTransition, Transition } from "framer-motion";

// Compute relative position of a card to the current front card in a circular list
const getPos = (i: number, current: number, total: number) => {
  const raw = (i - current + total) % total;
  // 0 = front, 1/2 = behind, 3 = hidden (anything further back)
  return raw <= 2 ? raw : 3;
};

// Explicitly typed transitions to avoid TS widening "spring" to string
const springMain: Transition = { type: "spring", stiffness: 420, damping: 38, mass: 0.9 };
const springHover: Transition = { type: "spring", stiffness: 600, damping: 30 };

// Resolve TargetAndTransition for each layer position
const resolveForPos = (pos: number): TargetAndTransition => {
  // Tuned offsets for clearer depth and alignment
  const conf =
    [
      { x: 0, y: 0, scale: 1.0, rotateY: 0, opacity: 1, zIndex: 30 },     // front
      { x: 24, y: 10, scale: 0.95, rotateY: -6, opacity: 0.88, zIndex: 20 }, // mid-back
      { x: -36, y: 18, scale: 0.9, rotateY: 6, opacity: 0.72, zIndex: 10 },  // far-back
      { x: 0, y: 0, scale: 0.9, rotateY: 0, opacity: 0, zIndex: 0 },      // hidden
    ][pos] || { x: 0, y: 0, scale: 0.9, rotateY: 0, opacity: 0, zIndex: 0 };

  return { ...conf, transition: springMain };
};

// Variants typed via satisfies for better TS interoperability
const cardAnim = {
  target: (custom: { pos: number }) => resolveForPos(custom.pos),
  hover: (custom: { pos: number }): TargetAndTransition =>
    custom.pos === 0 ? { y: -2, scale: 1.01, transition: springHover } : {},
} satisfies Variants;

const ReceptlyHero = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Memoize card configurations
  const cardConfigs = useMemo(
    () => [
      {
        bgColor: "bg-blue-400",
        content: {
          type: "form-builder" as const,
          title: "Create Your Form",
          subtitle: "Drag & Drop Builder",
        },
      },
      {
        bgColor: "bg-purple-400",
        content: {
          type: "analytics" as const,
          title: "Response Analytics",
          subtitle: "Real-Time Insights",
        },
      },
      {
        bgColor: "bg-green-400",
        content: {
          type: "recent-feedback" as const,
          title: "Recent Feedback",
          subtitle: "Live Responses",
        },
      },
      {
        bgColor: "bg-orange-400",
        content: {
          type: "share-link" as const,
          title: "Share Your Form",
          subtitle: "One Click Distribution",
        },
      },
    ],
    []
  );

  // Handle card change
  const handleCardChange = useCallback((index: number) => {
    startTransition(() => setCurrentCard(index));
  }, []);

  // Auto-rotate cards
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const nextIndex = (currentCard + 1) % cardConfigs.length;
      handleCardChange(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentCard, cardConfigs.length, isPaused, handleCardChange]);

  // Respect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) setIsPaused(true);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 w-full overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Navigation */}
      <div className="w-full px-4 pt-4 md:pt-6 flex justify-center relative z-50">
        <nav
          className="bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-3 shadow-lg border border-white/20 w-full max-w-5xl"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center space-x-2 shrink-0">
              <div
                className="w-6 h-6 md:w-7 md:h-7 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                aria-hidden="true"
              >
                <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <span className="text-sm md:text-lg font-semibold text-gray-900">
                Receptly
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <a
                href="#features"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1"
              >
                Features
              </a>
              <a
                href="#templates"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1"
              >
                Templates
              </a>
              <a
                href="#pricing"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1"
              >
                Pricing
              </a>
              <a
                href="#examples"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1"
              >
                Examples
              </a>
            </div>

            <button
              className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 shrink-0"
              aria-label="Login to your account"
            >
              <span>Login</span>
              <svg
                className="w-2.5 h-2.5 md:w-3 md:h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center px-4 md:px-6 pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-16 max-w-7xl mx-auto w-full">
        {/* Main Heading */}
        <header className="text-center mb-6 md:mb-12 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-gray-900 leading-tight mb-3 md:mb-6 tracking-tight px-2">
            Collect Feedback,
            <br />
            Drive Improvements
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Create shareable feedback forms in minutes. Share a link with
            customers and get actionable insights instantly—no coding required.
          </p>
        </header>

        {/* CTA Button */}
        <button
          className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-2.5 md:py-4 rounded-lg md:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl mb-8 md:mb-16 flex items-center space-x-2 text-sm md:text-base font-medium group focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          aria-label="Start creating feedback forms"
        >
          <span>Start Free Trial</span>
          <Send
            className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300"
            aria-hidden="true"
          />
        </button>

        {/* Stacked Card Swap */}
        <LayoutGroup>
          <div
            className="relative w-full max-w-3xl mx-auto px-2 md:px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-label="Interactive feedback platform features"
            aria-live="polite"
            style={{
              perspective: 1100,             // depth
              transformStyle: "preserve-3d", // keep children in 3D
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
                    variants={cardAnim}
                    whileHover="hover"
                    style={{
                      pointerEvents: isFront ? "auto" : "none",
                      willChange: "transform, opacity",
                      transformOrigin: "50% 60%",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      // Subtle blur/shadow to emphasize depth
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
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="flex items-center space-x-1.5 md:space-x-2"
                          role="group"
                          aria-label="Window controls"
                        >
                          <button
                            className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-400 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600"
                            aria-label="Close"
                          />
                          <button
                            className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            aria-label="Minimize"
                          />
                          <button
                            className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-600"
                            aria-label="Maximize"
                          />
                        </div>
                        <motion.span
                          layoutId="card-title"
                          className="text-xs md:text-sm text-black/70 font-medium bg-white/30 px-2 md:px-3 py-1 rounded-full whitespace-nowrap max-w-[180px] md:max-w-none truncate"
                        >
                          {cfg.content.title}
                        </motion.span>
                      </div>

                      {/* Card Body */}
                      <div className="space-y-2.5 md:space-y-4 overflow-y-auto max-h-80 md:max-h-[380px] pr-1">
                        {cfg.content.type === "form-builder" && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-black/90 flex items-center gap-2">
                                <FileText className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                <span className="truncate">Customer Survey</span>
                              </h3>
                            </div>

                            <div className="space-y-2 md:space-y-3">
                              <div className="bg-white/30 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/40 transition-all duration-200">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1 min-w-0 pr-2">
                                    <div className="text-xs md:text-sm font-medium text-black/90 mb-1.5">
                                      How satisfied are you with our product?
                                    </div>
                                    <div className="text-xs text-black/60 bg-white/40 px-2 py-0.5 rounded-full inline-block">
                                      Rating Scale
                                    </div>
                                  </div>
                                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-600 shrink-0" />
                                </div>
                                <div className="flex gap-1.5 mt-2">
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <div
                                      key={num}
                                      className="flex-1 min-w-0 max-w-[50px] aspect-square bg-white/40 rounded-lg flex items-center justify-center text-xs font-medium hover:bg-white/60 transition-colors cursor-pointer"
                                    >
                                      {num}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-white/30 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/40 transition-all duration-200">
                                <div className="text-xs md:text-sm font-medium text-black/90 mb-2">
                                  What can we improve?
                                </div>
                                <div className="bg-white/40 rounded-lg p-2.5 text-xs text-black/50 min-h-[60px]">
                                  Type your answer here...
                                </div>
                                <div className="text-xs text-black/60 bg-white/40 px-2 py-0.5 rounded-full inline-block mt-2">
                                  Open Text
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {cfg.content.type === "analytics" && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-black/90 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                <span>Response Analytics</span>
                              </h3>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                              <div className="grid grid-cols-2 gap-2 md:gap-3">
                                <div className="bg-white/20 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/30 transition-all">
                                  <div className="text-xs text-black/60 mb-1">
                                    Total Responses
                                  </div>
                                  <div className="text-xl md:text-2xl font-bold text-black/90">
                                    1,247
                                  </div>
                                  <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 shrink-0" />
                                    <span>+23% week</span>
                                  </div>
                                </div>

                                <div className="bg-white/20 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/30 transition-all">
                                  <div className="text-xs text-black/60 mb-1">
                                    Avg. Rating
                                  </div>
                                  <div className="text-xl md:text-2xl font-bold text-black/90 flex items-center gap-1">
                                    4.8
                                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500 shrink-0" />
                                  </div>
                                  <div className="text-xs text-purple-600 mt-1">
                                    Excellent
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white/20 rounded-lg md:rounded-xl p-2.5 md:p-3">
                                <div className="flex justify-between mb-2">
                                  <span className="text-xs md:text-sm font-medium text-black/90">
                                    Satisfaction Score
                                  </span>
                                  <span className="text-xs md:text-sm text-black/70">
                                    96% positive
                                  </span>
                                </div>
                                <div
                                  className="w-full bg-white/30 rounded-full h-3"
                                  role="progressbar"
                                  aria-valuenow={96}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                >
                                  <div
                                    className="bg-linear-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-1"
                                    style={{ width: "96%" }}
                                  >
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {cfg.content.type === "recent-feedback" && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-black/90 flex items-center gap-2">
                                <Users className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                <span>Live Feedback</span>
                              </h3>
                              <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                Live
                              </div>
                            </div>

                            <div className="space-y-2 md:space-y-3">
                              <div className="bg-white/30 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/40 transition-all duration-200">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                                      SJ
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="text-xs md:text-sm font-medium text-black/90 truncate">
                                        Sarah Johnson
                                      </div>
                                      <div className="text-xs text-black/60">
                                        2 min ago
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-0.5 shrink-0">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <Star
                                        key={i}
                                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-500 fill-yellow-500"
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="text-xs md:text-sm text-black/80 bg-white/30 rounded-lg p-2">
                                  "The onboarding process was incredibly smooth!"
                                </div>
                              </div>

                              <div className="bg-white/30 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/40 transition-all duration-200">
                                <div className="flex items-start justify-between mb-2 gap-2">
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-linear-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                                      MK
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="text-xs md:text-sm font-medium text-black/90 truncate">
                                        Mike Kumar
                                      </div>
                                      <div className="text-xs text-black/60">
                                        5 min ago
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-0.5 shrink-0">
                                    {[1, 2, 3, 4].map((i) => (
                                      <Star
                                        key={i}
                                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-500 fill-yellow-500"
                                      />
                                    ))}
                                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-400" />
                                  </div>
                                </div>
                                <div className="text-xs md:text-sm text-black/80 bg-white/30 rounded-lg p-2">
                                  "Great platform! Would love more customization."
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {cfg.content.type === "share-link" && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-black/90 flex items-center gap-2">
                                <Link2 className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                <span>Share Your Form</span>
                              </h3>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                              <div>
                                <div className="text-xs text-black/60 mb-2">
                                  Your unique feedback link
                                </div>
                                <div className="bg-white/30 rounded-lg md:rounded-xl p-2.5 md:p-3 flex items-center justify-between group hover:bg-white/40 transition-all">
                                  <div className="text-xs md:text-sm text-black/80 font-mono truncate flex-1 min-w-0 mr-2">
                                    receptly.com/f/cx-survey
                                  </div>
                                  <button className="bg-white/50 hover:bg-white/70 rounded-lg p-1.5 md:p-2 transition-all shrink-0">
                                    <svg
                                      className="w-3.5 h-3.5 md:w-4 md:h-4 text-black/70"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div>
                                <div className="text-xs text-black/60 mb-2">
                                  Share via
                                </div>
                                <div className="grid grid-cols-4 gap-1.5 md:gap-2">
                                  <button className="bg-white/30 hover:bg-white/50 rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center gap-1 transition-all group">
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                      <svg
                                        className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                                        />
                                      </svg>
                                    </div>
                                    <span className="text-xs text-black/70">Email</span>
                                  </button>

                                  <button className="bg-white/30 hover:bg-white/50 rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center gap-1 transition-all group">
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                      <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                                    </div>
                                    <span className="text-xs text-black/70">SMS</span>
                                  </button>

                                  <button className="bg-white/30 hover:bg-white/50 rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center gap-1 transition-all group">
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                                      <svg
                                        className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                      </svg>
                                    </div>
                                    <span className="text-xs text-black/70">
                                      Social
                                    </span>
                                  </button>

                                  <button className="bg-white/30 hover:bg-white/50 rounded-lg md:rounded-xl p-2 md:p-3 flex flex-col items-center gap-1 transition-all group">
                                    <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                                      <svg
                                        className="w-3.5 h-3.5 md:w-4 md:h-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                        />
                                      </svg>
                                    </div>
                                    <span className="text-xs text-black/70">QR</span>
                                  </button>
                                </div>
                              </div>

                              <div className="bg-white/20 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/30 transition-all">
                                <div className="flex justify-between items-center">
                                  <div className="text-xs text-black/60">
                                    Link clicks today
                                  </div>
                                  <div className="text-lg md:text-xl font-bold text-black/90">
                                    127
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Card Indicators */}
            <div
              className="flex justify-center space-x-2 mt-6 md:mt-8"
              role="tablist"
              aria-label="Feature cards"
            >
              {cardConfigs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardChange(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${
                    currentCard === index
                      ? "w-8 bg-purple-600 scale-110"
                      : "w-2 bg-gray-400 hover:bg-gray-600"
                  }`}
                  role="tab"
                  aria-selected={currentCard === index}
                  aria-label={`View ${cardConfigs[index].content.title}`}
                />
              ))}
            </div>
          </div>
        </LayoutGroup>

        {/* Trust Badge */}
        <div className="mt-8 md:mt-12 text-center px-4 w-full">
          <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
            Trusted by 500+ companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 text-xs text-gray-600">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              No credit card required
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="whitespace-nowrap">14-day free trial</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="whitespace-nowrap">Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptlyHero;
