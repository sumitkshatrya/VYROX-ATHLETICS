import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ProgramCard from '../components/ProgramCard';
import MembershipCard from '../components/MembershipCard';
import TrainerCard from '../components/TrainerCard';
import GalleryModal from '../components/GalleryModal';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import { programs } from '../data/programs';
import { memberships } from '../data/memberships';
import { trainers } from '../data/trainers';
import { galleryImages, galleryCategories } from '../data/gallery';
import { gymConfig } from '../data/gymConfig';
import { Sparkles, Maximize2, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export default function Home({ onOpenAiAgent, onSelectProgramForAgent }) {
  // Gallery states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // FAQ Accordion state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  // Selected plan interest for contact form
  const [selectedPlanInterest, setSelectedPlanInterest] = useState('');

  // Filter gallery
  const filteredGallery = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const handleNavigateLightbox = (direction) => {
    if (!activeLightboxImage) return;
    const currentIndex = filteredGallery.findIndex((img) => img.id === activeLightboxImage.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = filteredGallery.length - 1;
    if (nextIndex >= filteredGallery.length) nextIndex = 0;
    setActiveLightboxImage(filteredGallery[nextIndex]);
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlanInterest(planName);
    // Smooth scroll down to contact section
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 1. Hero Section */}
      <Hero onOpenAiAgent={onOpenAiAgent} />

      {/* 2. About the Gym Section */}
      <About />

      {/* 3. Workout Programs Section */}
      <section id="programs" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
              Training Disciplines
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
              Engineered For Results. <span className="text-vyrox-crimson">Choose Your Discipline.</span>
            </h2>
            <p className="mt-4 text-base text-gray-300">
              Whether your goal is shattering powerlifting records, dropping body fat on the turf,
              or mastering foundational biomechanics, our structured protocols are built without compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                onSelectProgram={(selected) => {
                  if (onSelectProgramForAgent) onSelectProgramForAgent(selected.title);
                  else onOpenAiAgent();
                }}
              />
            ))}
          </div>

          {/* AI Callout Banner below Programs */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-vyrox-900 via-vyrox-850 to-vyrox-900 border border-vyrox-red/40 shadow-crimson flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-vyrox-red/20 border border-vyrox-red/50 flex items-center justify-center text-vyrox-crimson shrink-0 shadow-crimson-sm">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-athletic text-2xl font-bold text-white uppercase">
                  Unsure Which Program Fits Your Schedule?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  Our interactive AI Fitness Agent can analyze your workout days, experience, and equipment to design a customized split in seconds.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenAiAgent}
              className="px-6 py-3.5 rounded-xl bg-vyrox-red hover:bg-vyrox-darkred text-white text-xs font-bold uppercase tracking-wider shadow-crimson transition-all shrink-0 flex items-center gap-2"
            >
              <span>Build Custom Split</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Trainers Section */}
      <section id="trainers" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
              Coaching Staff
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
              Master Strength Coaches. <span className="text-vyrox-crimson">Elite Mentorship.</span>
            </h2>
            <p className="mt-4 text-base text-gray-300">
              Our certified coaches hold national credentials and real-world athletic backgrounds.
              Every member receives world-class biomechanical instruction and zero ego.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Membership Plans Section */}
      <section id="memberships" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
              Membership Tiers
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
              Invest In Your Potential. <span className="text-vyrox-crimson">Transparent Pricing.</span>
            </h2>
            <p className="mt-4 text-base text-gray-300">
              No hidden enrollment fees or confusing fine print. Choose the membership tier that fits your athletic dedication.
              Enquire directly via WhatsApp for immediate concierge assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {memberships.map((plan) => (
              <MembershipCard
                key={plan.id}
                plan={plan}
                onSelectForInquiry={handleSelectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Photo Gallery with Click-To-Expand Lightbox */}
      <section id="gallery" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
              Inside The Facility
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
              The Arena. <span className="text-vyrox-crimson">Every Angle.</span>
            </h2>
            <p className="mt-4 text-base text-gray-300">
              Take a visual tour through our lifting platforms, recovery plunge tubs, and athletic conditioning turf.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === category
                    ? 'bg-vyrox-red border-vyrox-red text-white shadow-crimson-sm'
                    : 'bg-vyrox-900 hover:bg-vyrox-850 text-gray-300 border-vyrox-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveLightboxImage(img)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer border border-vyrox-850 hover:border-vyrox-red/60 shadow-lg transition-all duration-300 h-64 bg-vyrox-900"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vyrox-950 via-vyrox-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] font-bold text-vyrox-crimson uppercase tracking-wider block">
                      {img.category}
                    </span>
                    <h3 className="text-xs font-bold truncate max-w-[200px]">
                      {img.title}
                    </h3>
                  </div>
                  <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md group-hover:bg-vyrox-red text-white transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {activeLightboxImage && (
          <GalleryModal
            image={activeLightboxImage}
            images={filteredGallery}
            onClose={() => setActiveLightboxImage(null)}
            onNavigate={handleNavigateLightbox}
          />
        )}
      </section>

      {/* 7. Testimonials Section */}
      <Testimonials />

      {/* 8. Frequently Asked Questions Accordion */}
      <section className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
              Member Questions
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-none">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Clear answers regarding our 24/7 access, equipment, coaching, and rules.
            </p>
          </div>

          <div className="space-y-4">
            {gymConfig.faqs.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-vyrox-900/60 border border-vyrox-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-vyrox-red"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-white text-base">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-lg bg-vyrox-850 text-vyrox-crimson shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-vyrox-800/40 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Contact & Location Section with Validated Form */}
      <ContactSection
        selectedPlanInterest={selectedPlanInterest}
        onClearPlanInterest={() => setSelectedPlanInterest('')}
      />
    </main>
  );
}

