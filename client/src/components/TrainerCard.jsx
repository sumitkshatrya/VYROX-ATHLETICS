import React from 'react';
import { Award, CheckCircle, ArrowUpRight } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function TrainerCard({ trainer }) {
  const whatsappUrl = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(trainer.whatsappText)}`;

  return (
    <div className="flex flex-col rounded-2xl bg-vyrox-900/80 border border-vyrox-800 hover:border-vyrox-red/50 overflow-hidden transition-all duration-300 group shadow-lg">
      {/* Photo with Overlay */}
      <div className="relative h-72 overflow-hidden bg-vyrox-950">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vyrox-950 via-vyrox-950/20 to-transparent" />

        {/* Clearly Labeled Sample Data Notice */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-gray-700 text-[10px] text-gray-300 uppercase tracking-widest font-semibold">
          {trainer.sampleNotice}
        </div>

        {/* Experience Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-vyrox-red text-white text-[11px] font-bold uppercase tracking-wider shadow-crimson-sm">
          {trainer.experience}
        </div>
      </div>

      {/* Trainer Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-wide group-hover:text-vyrox-crimson transition-colors">
            {trainer.name}
          </h3>
          <p className="text-xs text-vyrox-crimson font-bold uppercase tracking-wider mt-0.5 mb-3">
            {trainer.role}
          </p>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
            {trainer.bio}
          </p>

          {/* Specializations */}
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block mb-1.5">
              Specialties:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {trainer.specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-vyrox-850 text-gray-300 text-[11px] font-medium border border-vyrox-800"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block mb-1">
              Certifications:
            </span>
            <ul className="space-y-1">
              {trainer.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Award className="w-3.5 h-3.5 text-vyrox-crimson shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-vyrox-800/80">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-vyrox-850 hover:bg-vyrox-red text-white text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <span>Enquire Coaching</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

