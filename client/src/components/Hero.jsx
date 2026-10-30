import React from 'react';
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Flame, Award } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function Hero({ onOpenAiAgent }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* High-Resolution Gym Background with Dark Crimson Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
          alt="VYROX Athletics weightlifting arena"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-slow filter brightness-[0.38] contrast-125"
        />
        {/* Athletic Gradient Grids and Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-vyrox-950 via-vyrox-950/70 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-vyrox-950/60 to-vyrox-950" />
        {/* Subtle Crimson Glow in Center-Right */}
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-vyrox-red/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Athletic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vyrox-900/90 border border-vyrox-700/80 shadow-crimson-sm mb-6 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-vyrox-crimson animate-ping" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-200">
            Performance Strength &bull; 24/7 Biometric Access
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-athletic text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-[0.9] text-glow mb-4">
          BUILT <span className="text-vyrox-crimson underline decoration-vyrox-red/40 decoration-4">DIFFERENT.</span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="font-athletic text-2xl sm:text-3xl md:text-4xl tracking-widest text-vyrox-silver uppercase font-semibold mb-6">
          TRAIN WITH PURPOSE.
        </p>

        {/* Supporting Fitness Copy */}
        <p className="max-w-2xl text-base sm:text-lg text-gray-300 font-normal leading-relaxed mb-10 px-4">
          Forged in discipline, built for results. Experience competition-grade iron,
          specialized plate-loaded machinery, an explosive sprint turf, and our dedicated AI-powered fitness assistant.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 mb-16">
          {/* Primary CTA */}
          <a
            href="#memberships"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-vyrox-red hover:bg-vyrox-darkred text-white font-bold text-sm uppercase tracking-wider shadow-crimson hover:shadow-crimson-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <span>Join the Movement</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#programs"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-vyrox-850/90 hover:bg-vyrox-800 border border-vyrox-700 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Explore Programs</span>
          </a>

          {/* AI Agent Instant Trigger */}
          <button
            onClick={onOpenAiAgent}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-vyrox-900/90 hover:bg-vyrox-850 border border-vyrox-red/50 text-vyrox-crimson hover:text-white font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 hover:border-vyrox-red"
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Generate Free AI Plan</span>
          </button>
        </div>

        {/* Configured Real Achievement Counters Badge */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-vyrox-900/80 border border-vyrox-800/80 backdrop-blur-md shadow-2xl">
          {gymConfig.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-3 border-r last:border-r-0 border-vyrox-800/60">
              <span className="font-athletic text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-vyrox-muted uppercase font-semibold tracking-wider text-center mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 hidden md:flex flex-col items-center text-vyrox-muted hover:text-white transition-colors">
          <span className="text-[11px] uppercase tracking-widest font-semibold mb-2">Scroll To Explore</span>
          <a href="#about" aria-label="Scroll to About section" className="animate-bounce p-1 rounded-full hover:bg-vyrox-800">
            <ChevronDown className="w-5 h-5 text-vyrox-crimson" />
          </a>
        </div>
      </div>
    </section>
  );
}

