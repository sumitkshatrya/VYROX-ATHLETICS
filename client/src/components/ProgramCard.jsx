import React from 'react';
import { Check, ArrowUpRight, Flame, Shield, Dumbbell } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function ProgramCard({ program, onSelectProgram }) {
  const whatsappUrl = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(program.whatsappText)}`;

  return (
    <div className="flex flex-col rounded-2xl bg-vyrox-900/80 border border-vyrox-800 hover:border-vyrox-red/50 overflow-hidden transition-all duration-300 hover:shadow-crimson group">
      {/* Program Header Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vyrox-950 via-vyrox-950/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-md bg-vyrox-950/80 backdrop-blur-md border border-vyrox-700/60 text-[11px] font-bold text-gray-200 uppercase tracking-wider">
            {program.level}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-vyrox-red/80 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
            {program.intensity}
          </span>
        </div>
      </div>

      {/* Program Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-wide group-hover:text-vyrox-crimson transition-colors">
            {program.title}
          </h3>
          <p className="text-xs text-vyrox-muted uppercase font-semibold tracking-wider mt-0.5 mb-3">
            {program.subtitle}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {program.description}
          </p>

          {/* Benefits List */}
          <div className="space-y-2 mb-6">
            <span className="text-xs uppercase tracking-wider text-vyrox-muted font-bold block">
              Core Athletic Benefits:
            </span>
            {program.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                <div className="w-4 h-4 rounded-full bg-vyrox-850 border border-vyrox-red/40 flex items-center justify-center shrink-0 mt-0.5 text-vyrox-crimson">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-vyrox-800/80 flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-vyrox-850 hover:bg-vyrox-red text-white text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-crimson-sm"
          >
            <span>Enquire on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => onSelectProgram && onSelectProgram(program)}
            className="px-3.5 py-3 rounded-xl bg-vyrox-900 border border-vyrox-700/60 hover:border-vyrox-crimson text-gray-300 hover:text-white text-xs font-semibold transition-colors"
            title="Discuss with AI Fitness Agent"
          >
            AI Plan
          </button>
        </div>
      </div>
    </div>
  );
}

