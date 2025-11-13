// src/components/hero/CardContent.tsx
import {
  BarChart3,
  FileText,
  Link2,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export function FormBuilderCard() {
  return (
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
  );
}

export function AnalyticsCard() {
  return (
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
            <div className="text-xs text-black/60 mb-1">Total Responses</div>
            <div className="text-xl md:text-2xl font-bold text-black/90">
              1,247
            </div>
            <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 shrink-0" />
              <span>+23% week</span>
            </div>
          </div>

          <div className="bg-white/20 rounded-lg md:rounded-xl p-2.5 md:p-3 hover:bg-white/30 transition-all">
            <div className="text-xs text-black/60 mb-1">Avg. Rating</div>
            <div className="text-xl md:text-2xl font-bold text-black/90 flex items-center gap-1">
              4.8
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500 shrink-0" />
            </div>
            <div className="text-xs text-purple-600 mt-1">Excellent</div>
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
  );
}

export function LiveFeedbackCard() {
  return (
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
                <div className="text-xs text-black/60">2 min ago</div>
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
                <div className="text-xs text-black/60">5 min ago</div>
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
  );
}

export function ShareLinkCard() {
  return (
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
          <div className="text-xs text-black/60 mb-2">Share via</div>
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
                    d="M7 8h10M7 12h8M7 16h6"
                  />
                </svg>
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
              <span className="text-xs text-black/70">Social</span>
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
            <div className="text-xs text-black/60">Link clicks today</div>
            <div className="text-lg md:text-xl font-bold text-black/90">
              127
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
