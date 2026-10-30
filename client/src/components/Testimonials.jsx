import React from 'react';
import { Quote, AlertCircle, Sparkles } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
            Member Spotlights
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
            Built by Athletes. <span className="text-vyrox-crimson">Proven by Results.</span>
          </h2>

          {/* Explicit Transparency Notice per prompt instructions */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-vyrox-900/60 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Sample member transformation testimonials for demonstration purposes.</span>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-vyrox-900/60 border border-vyrox-800 hover:border-vyrox-red/40 transition-all duration-300 relative group shadow-lg"
            >
              <div>
                <Quote className="w-8 h-8 text-vyrox-red/40 mb-4 group-hover:text-vyrox-crimson transition-colors" />
                <p className="text-sm text-gray-300 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-vyrox-800/80">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base font-athletic tracking-wide">
                    {item.athleteName}
                  </h4>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-vyrox-850 text-gray-400 border border-vyrox-800">
                    Demo
                  </span>
                </div>
                <p className="text-xs text-vyrox-crimson font-medium">
                  {item.role}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Goal: <span className="text-gray-300 font-semibold">{item.goal}</span>
                </p>
                <span className="inline-block mt-2 text-[10px] text-vyrox-muted uppercase font-bold tracking-wider">
                  {item.membership}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

