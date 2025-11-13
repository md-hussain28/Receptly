// src/components/Navbar.tsx
import { MessageSquare } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full fixed top-2 px-4 pt-2 md:pt-6 flex justify-center  z-50">
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
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors rounded px-2 py-1"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors rounded px-2 py-1"
            >
              Templates
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors rounded px-2 py-1"
            >
              Pricing
            </a>
            <a
              href="#examples"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors rounded px-2 py-1"
            >
              Examples
            </a>
          </div>

          <a
            href="/login"
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
          </a>
        </div>
      </nav>
    </div>
  );
}
