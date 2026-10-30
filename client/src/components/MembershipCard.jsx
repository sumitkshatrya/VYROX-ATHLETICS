import React from 'react';
import { Check, MessageSquare, ArrowRight, Star } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function MembershipCard({ plan, onSelectForInquiry }) {
  const whatsappUrl = `https://wa.me/${gymConfig.contact.whatsappNumber}?text=${encodeURIComponent(plan.whatsappText)}`;

  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? 'bg-gradient-to-b from-vyrox-900 to-vyrox-950 border-2 border-vyrox-red shadow-crimson md:-translate-y-2'
          : 'bg-vyrox-900/60 border border-vyrox-800 hover:border-vyrox-700'
      }`}
    >
      {/* Popular Highlight Badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-vyrox-red to-vyrox-crimson text-white text-[11px] font-bold uppercase tracking-widest shadow-crimson flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-white" />
          <span>{plan.badge || 'Most Popular'}</span>
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-athletic text-3xl font-bold text-white uppercase tracking-wide">
              {plan.name}
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-1">
              {plan.tagline}
            </p>
          </div>
          {!plan.popular && plan.badge && (
            <span className="px-2.5 py-1 rounded-md bg-vyrox-850 border border-vyrox-700 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
              {plan.badge}
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="py-4 border-y border-vyrox-800/80 mb-6">
          <div className="flex items-baseline gap-2">
            <span className="font-athletic text-5xl font-bold text-white tracking-tight">
              {plan.price}
            </span>
            <span className="text-sm font-semibold text-vyrox-muted uppercase">
              / {plan.duration}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            {plan.billingCycle}
          </p>
        </div>

        {/* Included Facilities */}
        <div className="mb-6 space-y-2.5">
          <span className="text-xs uppercase tracking-wider text-vyrox-silver font-bold block mb-2">
            Included Facilities & Access:
          </span>
          {plan.facilities.map((facility, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
              <div className="w-4 h-4 rounded-full bg-vyrox-800 border border-vyrox-700 flex items-center justify-center shrink-0 mt-0.5 text-vyrox-crimson">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>{facility}</span>
            </div>
          ))}
        </div>

        {/* Exclusive Benefits */}
        <div className="mb-8 space-y-2.5 pt-4 border-t border-vyrox-800/60">
          <span className="text-xs uppercase tracking-wider text-vyrox-crimson font-bold block mb-2">
            Tier Perks & Coaching:
          </span>
          {plan.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
              <div className="w-4 h-4 rounded-full bg-vyrox-red/20 border border-vyrox-red/40 flex items-center justify-center shrink-0 mt-0.5 text-vyrox-crimson">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-4 border-t border-vyrox-800/80">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 ${
            plan.popular
              ? 'bg-vyrox-red hover:bg-vyrox-darkred text-white shadow-crimson'
              : 'bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700 text-white hover:border-vyrox-crimson'
          }`}
        >
          <span>Enquire via WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <button
          onClick={() => onSelectForInquiry && onSelectForInquiry(plan.name)}
          className="w-full py-2.5 text-center text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          Or enquire via email contact form &rarr;
        </button>
      </div>
    </div>
  );
}

