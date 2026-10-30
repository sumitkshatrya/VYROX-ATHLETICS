import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, ArrowUpRight, Instagram, Facebook, Youtube, MessageSquare } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function Footer({ onOpenAiAgent }) {
  const socialIcons = {
    Instagram: Instagram,
    Facebook: Facebook,
    Youtube: Youtube,
  };

  return (
    <footer className="bg-vyrox-950 border-t border-vyrox-900 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Social Media Contact Cards Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-vyrox-900 via-vyrox-850 to-vyrox-900 border border-vyrox-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-vyrox-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-950 border border-vyrox-800 text-vyrox-crimson text-[11px] font-bold uppercase tracking-widest mb-1.5">
                Official Channels
              </div>
              <h3 className="font-athletic text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                Connect With VYROX On Social Media
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Reach out via direct message, join community workshops, or watch coaching masterclasses.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-gray-300">Quick Contact:</span>
              <a
                href={gymConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {gymConfig.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Instagram;
              const isInstagram = social.id === 'instagram';
              const isFacebook = social.id === 'facebook';
              const isYoutube = social.id === 'youtube';

              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 rounded-2xl border transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-md ${
                    isInstagram
                      ? 'bg-gradient-to-br from-pink-950/20 via-vyrox-900 to-vyrox-950 border-pink-900/40 hover:border-pink-500/60'
                      : isFacebook
                      ? 'bg-gradient-to-br from-blue-950/20 via-vyrox-900 to-vyrox-950 border-blue-900/40 hover:border-blue-500/60'
                      : 'bg-gradient-to-br from-red-950/20 via-vyrox-900 to-vyrox-950 border-red-900/40 hover:border-red-500/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${
                            isInstagram
                              ? 'bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600'
                              : isFacebook
                              ? 'bg-blue-600'
                              : 'bg-red-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-vyrox-crimson transition-colors">
                            {social.name}
                          </h4>
                          <span className="text-[11px] font-mono text-gray-400">
                            {social.handle}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-vyrox-850 text-gray-300 border border-vyrox-700">
                        {social.highlight}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      {social.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-vyrox-800/60 flex items-center justify-between text-xs font-bold text-white group-hover:text-vyrox-crimson transition-colors">
                    <span>{social.actionText}</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-vyrox-850">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-vyrox-red to-vyrox-darkred flex items-center justify-center shadow-crimson-sm">
                <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-athletic text-2xl font-bold text-white tracking-wider">
                  VYROX
                </span>
                <span className="text-[10px] tracking-widest text-vyrox-muted -mt-1 font-semibold uppercase">
                  ATHLETICS
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {gymConfig.brand.description}
            </p>

            {/* Quick Social Icon Badges */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mr-1">
                Follow Us:
              </span>
              {gymConfig.socials.map((social) => {
                const Icon = socialIcons[social.icon] || Instagram;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-vyrox-850 hover:bg-vyrox-red border border-vyrox-700 hover:border-vyrox-red flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                    title={`Visit ${social.name} (${social.handle})`}
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
              <a
                href={gymConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-vyrox-850 hover:bg-emerald-600 border border-vyrox-700 hover:border-emerald-500 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase font-bold tracking-widest text-white">
                {gymConfig.brand.tagline}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-athletic text-sm uppercase tracking-wider text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['About', 'Programs', 'Trainers', 'Memberships', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-vyrox-crimson transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Tracks */}
          <div className="space-y-3">
            <h4 className="font-athletic text-sm uppercase tracking-wider text-white font-bold">
              Programs
            </h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-white">Strength & Powerlifting</a></li>
              <li><a href="#programs" className="hover:text-white">Weight Loss & Conditioning</a></li>
              <li><a href="#programs" className="hover:text-white">Hypertrophy & Muscle</a></li>
              <li><a href="#programs" className="hover:text-white">1-on-1 Coaching</a></li>
              <li><a href="#programs" className="hover:text-white">Functional Fitness</a></li>
              <li><a href="#programs" className="hover:text-white">Beginner Fundamentals</a></li>
            </ul>
          </div>

          {/* Facilities & Access */}
          <div className="space-y-3">
            <h4 className="font-athletic text-sm uppercase tracking-wider text-white font-bold">
              Facility Info
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-emerald-400 font-bold uppercase tracking-wider">
                {gymConfig.hours.access}
              </p>
              <p>{gymConfig.hours.staffed.weekdays}</p>
              <p>{gymConfig.hours.staffed.weekends}</p>
              <p className="text-gray-300 mt-2 font-semibold">Phone: {gymConfig.contact.phone}</p>
              <p className="text-gray-400">{gymConfig.contact.address}</p>
              <div className="pt-2">
                <a
                  href={gymConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-vyrox-crimson font-bold hover:underline"
                >
                  <span>WhatsApp Enquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Medical Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-[11px]">
            &copy; {new Date().getFullYear()} {gymConfig.brand.name}. All rights reserved. Built for athletic excellence.
          </p>

          <p className="text-gray-500 text-[11px] max-w-md">
            * Medical Notice: Consult your physician before initiating any rigorous athletic or training protocol. AI recommendations are educational.
          </p>
        </div>
      </div>
    </footer>
  );
}
