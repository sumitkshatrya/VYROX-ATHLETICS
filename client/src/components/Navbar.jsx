import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';

export default function Navbar({ onOpenAiAgent, onOpenChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Memberships', href: '#memberships' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-vyrox-950/95 backdrop-blur-md border-b border-vyrox-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-vyrox-950 via-vyrox-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-vyrox-red rounded-lg p-1">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-vyrox-red to-vyrox-darkred flex items-center justify-center shadow-crimson-sm group-hover:shadow-crimson transition-all duration-300">
            <Dumbbell className="w-5 h-5 text-white transform -rotate-45 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-athletic text-2xl sm:text-3xl tracking-wider font-bold text-white group-hover:text-vyrox-crimson transition-colors">
              VYROX
            </span>
            <span className="text-[10px] tracking-widest text-vyrox-muted -mt-1 font-semibold uppercase">
              ATHLETICS
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-vyrox-red hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* AI Fitness Agent CTA */}
          <button
            onClick={onOpenAiAgent}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700/60 text-xs font-semibold text-gray-200 hover:text-white transition-all duration-200 group shadow-sm hover:border-vyrox-red/50"
            title="Launch AI Fitness Agent"
          >
            <Sparkles className="w-3.5 h-3.5 text-vyrox-crimson animate-pulse" />
            <span>AI Fitness Agent</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-vyrox-red/20 text-vyrox-crimson rounded border border-vyrox-red/30 uppercase tracking-wider">
              Free
            </span>
          </button>

          {/* Join Now Primary CTA */}
          <a
            href="#memberships"
            className="px-5 py-2 rounded-lg bg-vyrox-red hover:bg-vyrox-darkred text-white text-xs font-bold uppercase tracking-wider shadow-crimson transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-vyrox-crimson"
          >
            Join Now
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg bg-vyrox-850 border border-vyrox-700/60 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-vyrox-red"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6 text-vyrox-crimson" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-vyrox-900/98 border-b border-vyrox-800 px-6 py-6 mt-3 space-y-4 backdrop-blur-xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-vyrox-crimson hover:pl-2 transition-all duration-200 py-1 border-b border-vyrox-800/40"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAiAgent();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-vyrox-800 border border-vyrox-700 text-sm font-semibold text-white hover:bg-vyrox-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-vyrox-crimson" />
              <span>Launch AI Fitness Agent</span>
            </button>

            <a
              href="#memberships"
              onClick={() => setIsOpen(false)}
              className="w-full block text-center py-3 rounded-lg bg-vyrox-red hover:bg-vyrox-darkred text-white text-sm font-bold uppercase tracking-wider shadow-crimson transition-colors"
            >
              View Membership Plans
            </a>

            <a
              href={gymConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Quick WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

