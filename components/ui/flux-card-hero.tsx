import React, { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { Zap } from 'lucide-react';

const MinimalHero = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Memoize card configurations to prevent recreation on each render
  const cardConfigs = useMemo(() => [
    {
      bgColor: 'bg-green-400',
      content: {
        greeting: 'Hi again, James. How can I help you?',
        subtitle: 'What else do you want to know?'
      }
    },
    {
      bgColor: 'bg-blue-400',
      content: {
        type: 'analytics',
        greeting: 'Performance Analytics',
        subtitle: 'AI Usage This Month'
      }
    },
    {
      bgColor: 'bg-purple-400',
      content: {
        type: 'projects',
        title: 'Active Projects',
        subtitle: 'Your AI Workflows'
      }
    },
    {
      bgColor: 'bg-yellow-300',
      content: {
        type: 'chat-history'
      }
    }
  ], []);

  // Handle card change with useTransition for smoother updates
  const handleCardChange = useCallback((index: number) => {
    startTransition(() => {
      setCurrentCard(index);
    });
  }, []);

  // Auto-rotate cards with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleCardChange((currentCard + 1) % cardConfigs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentCard, cardConfigs.length, isPaused, handleCardChange]);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  const currentConfig = cardConfigs[currentCard];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-pink-50 to-purple-100 w-full overflow-hidden max-w-screen relative">
      {/* Floating Navigation */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav 
          className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-white/20"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center space-x-8 md:space-x-36">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center" aria-hidden="true">
                <div className="w-5 h-5 border-2 border-white rounded-full relative">
                  <div className="absolute inset-0.5 border border-white rounded-full"></div>
                </div>
              </div>
              <span className="text-lg font-medium text-gray-900">Mysh.ai</span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1">
                Features
              </a>
              <a href="#benefits" className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1">
                Benefits
              </a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1">
                Pricing
              </a>
              <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded px-2 py-1">
                Contact
              </a>
            </div>

            <button 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 flex items-center space-x-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              aria-label="Login to your account"
            >
              <span>Login</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center px-6 pt-40 pb-16 max-w-7xl mx-auto">
        {/* Main Heading */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl xl:text-8xl font-thin text-gray-900 leading-tight mb-6 tracking-tight">
            AI Reimagined,<br />
            Possibilities Amplified
          </h1>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Crafting intelligent solutions that turn your tech dreams into reality.
          </p>
        </header>

        {/* CTA Button */}
        <button 
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-xl mb-16 flex items-center space-x-2 text-base font-medium group focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          aria-label="Get started with Mysh.ai"
        >
          <span>Get started</span>
          <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
        </button>

        {/* Animated Layered Cards Interface */}
        <div 
          className="relative w-full max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Interactive AI features showcase"
          aria-live="polite"
        >
          {/* Background Cards with staggered animations */}
          <div className="absolute inset-0 transform rotate-3 scale-95 transition-all duration-1000 ease-in-out" aria-hidden="true">
            <div className={`w-full h-72 bg-orange-300 rounded-3xl shadow-2xl opacity-50 transition-all duration-1000 ${currentCard === 1 ? 'scale-105 opacity-70' : ''}`}></div>
          </div>
          <div className="absolute inset-0 transform -rotate-2 scale-96 transition-all duration-1000 ease-in-out delay-150" aria-hidden="true">
            <div className={`w-full h-72 bg-purple-400 rounded-3xl shadow-2xl opacity-60 transition-all duration-1000 ${currentCard === 2 ? 'scale-105 opacity-80' : ''}`}></div>
          </div>
          <div className="absolute inset-0 transform rotate-1 scale-97 transition-all duration-1000 ease-in-out delay-300" aria-hidden="true">
            <div className={`w-full h-72 bg-pink-400 rounded-3xl shadow-2xl opacity-50 transition-all duration-1000 ${currentCard === 3 ? 'scale-105 opacity-70' : ''}`}></div>
          </div>
          <div className="absolute inset-0 transform -rotate-1 scale-98 transition-all duration-1000 ease-in-out delay-500" aria-hidden="true">
            <div className={`w-full h-72 bg-yellow-300 rounded-3xl shadow-2xl opacity-40 transition-all duration-1000 ${currentCard === 0 ? 'scale-105 opacity-60' : ''}`}></div>
          </div>

          {/* Main Animated Card */}
          <div className={`relative z-10 w-full h-80 ${currentConfig.bgColor} rounded-3xl shadow-2xl p-6 flex flex-col transition-all duration-1000 ease-in-out transform hover:scale-[1.02] ${isPending ? 'opacity-70' : 'opacity-100'}`}>
            {/* Chat Interface */}
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-5 flex-1 transition-all duration-500">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2" role="group" aria-label="Window controls">
                  <button className="w-3 h-3 bg-red-400 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600" aria-label="Close"></button>
                  <button className="w-3 h-3 bg-yellow-400 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-600" aria-label="Minimize"></button>
                  <button className="w-3 h-3 bg-green-500 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-600" aria-label="Maximize"></button>
                </div>
                <span className="text-xs text-black/70 font-medium bg-white/30 px-2 py-1 rounded-full">AI Assistant</span>
              </div>

              {/* Chat Content with Animation */}
              <div className="space-y-4">
                {currentConfig.content.type === 'chat-history' ? (
                  // Chat History Interface
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-black/90">Chat history</h3>
                      <div className="w-12 h-1 bg-white/60 rounded-full" aria-hidden="true"></div>
                    </div>

                    <div className="space-y-3">
                      {/* Chat Item 1 */}
                      <button className="w-full flex items-center space-x-3 p-3 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-black/90">Improve writing</div>
                          <div className="text-xs text-black/60">12 min ago</div>
                        </div>
                        <div className="text-xs text-black/60 bg-white/40 px-2 py-1 rounded-full">Neu 1.6</div>
                      </button>

                      {/* Chat Item 2 */}
                      <button className="w-full flex items-center space-x-3 p-3 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shrink-0" aria-hidden="true">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-black/90">Fix spelling</div>
                          <div className="text-xs text-black/60">1 hour ago</div>
                        </div>
                        <div className="text-xs text-black/60 bg-white/40 px-2 py-1 rounded-full">Neu 2.0</div>
                      </button>
                    </div>
                  </div>
                ) : currentConfig.content.type === 'projects' ? (
                  // Projects Interface workflow
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-black/90">AI Workflow</h3>
                      <div className="w-12 h-1 bg-white/60 rounded-full" aria-hidden="true"></div>
                    </div>

                    <div className="bg-white/20 rounded-xl p-3 mb-2">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-xs text-black/60 bg-white/40 px-2 py-1 rounded-full">Demo Workflow</div>
                        <div className="text-xs text-green-500 font-medium">● Running</div>
                      </div>

                      <div className="mt-2 relative">
                        {/* Workflow Nodes */}
                        <div className="flex items-center space-x-2">
                          {/* Trigger Node */}
                          <div className="z-10 shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center mb-2 shadow-lg" aria-label="Webhook trigger">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="text-center text-xs text-black/80">Webhook</div>
                          </div>

                          {/* Connection */}
                          <div className="z-0 flex-1 h-0.5 bg-white/30 relative min-w-10">
                            <div className="absolute -top-1 right-0 w-3 h-3 rounded-full bg-blue-400 animate-ping"></div>
                          </div>

                          {/* AI Node */}
                          <div className="z-10 shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center mb-2 shadow-lg" aria-label="AI processor">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M12 21v-1m-3.364-3.364l-.707-.707m2.828-2.828l.707-.707M11 13H7a4 4 0 00-4 4v2a2 2 0 002 2h14a2 2 0 002-2v-2a4 4 0 00-4-4h-4z" />
                              </svg>
                            </div>
                            <div className="text-center text-xs text-black/80">AI</div>
                          </div>

                          {/* Connection */}
                          <div className="z-0 flex-1 h-0.5 bg-white/30 relative min-w-10">
                            <div className="absolute -top-1 right-0 w-3 h-3 rounded-full bg-purple-400 animate-ping"></div>
                          </div>

                          {/* Output Node */}
                          <div className="z-10 shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-2 shadow-lg" aria-label="Output">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="text-center text-xs text-black/80">Output</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/20">
                        <div className="flex justify-between text-xs">
                          <div className="text-black/60">Last run:</div>
                          <div className="font-medium text-black/90">2 min ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentConfig.content.type === 'analytics' ? (
                  // Analytics Interface
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-black/90">Usage Analytics</h3>
                      <div className="w-12 h-1 bg-white/60 rounded-full" aria-hidden="true"></div>
                    </div>

                    <div className="space-y-4">
                      {/* Token Usage */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-black/90">Tokens used today</span>
                          <span className="text-sm text-black/70">14,280 / 50,000</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2.5" role="progressbar" aria-valuenow={28.56} aria-valuemin={0} aria-valuemax={100} aria-label="Token usage">
                          <div 
                            className="bg-linear-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: '28.56%' }}
                          ></div>
                        </div>
                        <div className="mt-1 text-xs text-black/60">28.56% of monthly quota</div>
                      </div>

                      {/* Quota Summary */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/20 rounded-xl p-3">
                          <div className="text-xs text-black/60 mb-1">Remaining</div>
                          <div className="text-xl font-bold text-black/90">35,720</div>
                          <div className="text-xs text-green-500 mt-1">≈ 1,786 requests</div>
                        </div>

                        <div className="bg-white/20 rounded-xl p-3">
                          <div className="text-xs text-black/60 mb-1">Reset in</div>
                          <div className="text-xl font-bold text-black/90">23h 59m</div>
                          <div className="text-xs text-purple-500 mt-1">Daily refresh</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Chat Interface
                  <div>
                    <div className="text-black/80 transition-all duration-500 transform mb-2">
                      <span className="text-sm font-light">{currentConfig.content.greeting}</span>
                    </div>
                    <div className="text-xs text-black/60 font-light transition-all duration-500">
                      {currentConfig.content.subtitle}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Indicators */}
          <div className="flex justify-center space-x-2 mt-8" role="tablist" aria-label="Feature cards">
            {cardConfigs.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                  currentCard === index ? 'bg-gray-800 scale-125' : 'bg-gray-400 hover:bg-gray-600'
                }`}
                role="tab"
                aria-selected={currentCard === index}
                aria-label={`View feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalHero;
