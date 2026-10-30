import React from 'react';
import { Dumbbell, Flame, HeartPulse, Shield, Zap, Activity, CheckCircle2 } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function About() {
  const iconMap = {
    Dumbbell: Dumbbell,
    Flame: Flame,
    HeartPulse: HeartPulse,
    Shield: Shield,
    Zap: Zap,
    Activity: Activity,
  };

  return (
    <section id="about" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
            About VYROX
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
            Forged In Iron. <span className="text-vyrox-crimson">Powered By Science.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            {gymConfig.brand.mission}
          </p>
        </div>

        {/* 2-Column Story & Atmosphere */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden border border-vyrox-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                alt="VYROX Training Facility"
                className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vyrox-950 via-transparent to-transparent opacity-80" />
            </div>
            {/* Athletic Floating Metric Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 p-5 rounded-xl bg-vyrox-900/95 border border-vyrox-700/80 shadow-crimson backdrop-blur-md max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-vyrox-red/20 border border-vyrox-red/40 flex items-center justify-center text-vyrox-crimson font-bold">
                  24/7
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-white tracking-wider">Unrestricted Access</p>
                  <p className="text-[11px] text-gray-400">Zero excuses. Train on your exact schedule.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-vyrox-850 text-vyrox-crimson text-xs font-bold uppercase tracking-wider">
              The VYROX Standard
            </div>
            <h3 className="font-athletic text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
              No Gimmicks. No Crowded Waiting Lines. Just Pure Performance.
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Commercial fitness gyms cut corners with cheap plastic machines and crowded peak-hour bottlenecks.
              At **VYROX ATHLETICS**, every square foot was engineered around serious training intent:
              heavy steel, calibrated competition barbells, custom multi-grip dumbbells, and clinical body analysis.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Eleiko & Texas Power Bars calibrated for powerlifters & athletes",
                "Full Arsenal Strength & Hammer Strength plate-loaded lineup",
                "Dedicated recovery lounge with infrared heat and contrast hydrotherapy",
                "Zero aggressive sales tactics—honest pricing with transparent memberships"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-vyrox-crimson shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a
                href="#memberships"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>View Membership Options</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Training Philosophy */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-athletic text-3xl sm:text-4xl font-bold text-white uppercase">
              Our 4 Pillars of Physical Mastery
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Every training session and AI-generated workout plan follows these non-negotiable athletic principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymConfig.brand.philosophy.map((item) => {
              const IconComponent = iconMap[item.icon] || Dumbbell;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-vyrox-900/60 border border-vyrox-800 hover:border-vyrox-red/50 transition-all duration-300 hover:bg-vyrox-900 group shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-vyrox-850 group-hover:bg-vyrox-red/20 border border-vyrox-700/60 group-hover:border-vyrox-red/40 flex items-center justify-center mb-5 transition-colors">
                    <IconComponent className="w-6 h-6 text-vyrox-crimson" />
                  </div>
                  <h4 className="font-athletic text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-vyrox-crimson transition-colors">
                    {item.pillar}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Facility Highlights Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-athletic text-3xl sm:text-4xl font-bold text-white uppercase">
              World-Class Facilities & Equipment
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Designed for athletes who demand the finest gear to fuel their transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gymConfig.facilities.map((fac, idx) => {
              const IconComponent = iconMap[fac.icon] || Dumbbell;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-vyrox-900/40 border border-vyrox-850 hover:border-vyrox-700 transition-colors flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-vyrox-850 text-vyrox-crimson shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {fac.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

