import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertTriangle, Loader2, Instagram, Facebook, Youtube } from 'lucide-react';
import { gymConfig } from '../data/gymConfig';
import { submitContact } from '../services/apiService';

export default function ContactSection({ selectedPlanInterest, onClearPlanInterest }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: selectedPlanInterest || 'General Enquiry',
    message: '',
    _honey: '', // Honeypot anti-spam field
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    referenceId: null,
    successMessage: '',
  });

  // Update interest if passed from props
  React.useEffect(() => {
    if (selectedPlanInterest) {
      setFormData((prev) => ({ ...prev, interest: selectedPlanInterest }));
    }
  }, [selectedPlanInterest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error) setStatus((prev) => ({ ...prev, error: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side quick checks
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ submitting: false, success: false, error: 'Please enter your full name (minimum 2 characters).' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, error: 'Please provide a message with at least 10 characters.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null, referenceId: null, successMessage: '' });

    try {
      const response = await submitContact(formData);
      setStatus({
        submitting: false,
        success: true,
        error: null,
        referenceId: response.referenceId,
        successMessage: response.message,
      });
      // Reset fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'General Enquiry',
        message: '',
        _honey: '',
      });
      if (onClearPlanInterest) onClearPlanInterest();
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Unable to submit enquiry. Please try again or reach out on WhatsApp.',
        referenceId: null,
        successMessage: '',
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-vyrox-950 relative border-t border-vyrox-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vyrox-900 border border-vyrox-800 text-vyrox-crimson text-xs font-bold uppercase tracking-widest mb-3">
            Contact & Location
          </div>
          <h2 className="font-athletic text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-none">
            Visit the Arena. <span className="text-vyrox-crimson">Start Today.</span>
          </h2>
          <p className="mt-4 text-base text-gray-300">
            Have questions about memberships, private coaching, or want to arrange a facility walkthrough?
            Reach out through our direct form or connect with our front desk on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gym Information & Map (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Address */}
              <div className="p-5 rounded-2xl bg-vyrox-900/60 border border-vyrox-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-vyrox-850 text-vyrox-crimson shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Facility Address</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">{gymConfig.contact.address}</p>
                  <a
                    href={gymConfig.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold text-vyrox-crimson hover:underline mt-1"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="p-5 rounded-2xl bg-vyrox-900/60 border border-vyrox-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-vyrox-850 text-vyrox-crimson shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Hours of Operation</h4>
                  <p className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wide">
                    {gymConfig.hours.access}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">{gymConfig.hours.staffed.weekdays}</p>
                  <p className="text-xs text-gray-300">{gymConfig.hours.staffed.weekends}</p>
                </div>
              </div>

              {/* Direct Phone & Email */}
              <div className="p-5 rounded-2xl bg-vyrox-900/60 border border-vyrox-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-vyrox-850 text-vyrox-crimson shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">Direct Enquiries</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">{gymConfig.contact.phone}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{gymConfig.contact.email}</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-vyrox-900 border border-emerald-500/40 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">Instant WhatsApp Concierge</h4>
              </div>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Connect directly with our Member Services staff for real-time facility tours, guest passes, and questions.
              </p>
              <a
                href={gymConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Chat with Member Services</span>
                &rarr;
              </a>
            </div>

            {/* Direct Social Channels (Instagram, Facebook, YouTube) */}
            <div className="p-5 rounded-2xl bg-vyrox-900/60 border border-vyrox-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                  Official Social Channels
                </h4>
                <span className="text-[10px] text-vyrox-crimson font-bold uppercase">
                  DM & Community
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <a
                  href={gymConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700/80 hover:border-pink-500/50 flex flex-col items-center text-center gap-1.5 transition-all group"
                >
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-pink-400 transition-colors" />
                  <span className="text-[11px] font-bold text-white">Instagram</span>
                  <span className="text-[9px] text-gray-400 group-hover:text-gray-200">DM & Reels</span>
                </a>

                <a
                  href={gymConfig.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700/80 hover:border-blue-500/50 flex flex-col items-center text-center gap-1.5 transition-all group"
                >
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                  <span className="text-[11px] font-bold text-white">Facebook</span>
                  <span className="text-[9px] text-gray-400 group-hover:text-gray-200">Community</span>
                </a>

                <a
                  href={gymConfig.contact.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-vyrox-850 hover:bg-vyrox-800 border border-vyrox-700/80 hover:border-red-500/50 flex flex-col items-center text-center gap-1.5 transition-all group"
                >
                  <Youtube className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors" />
                  <span className="text-[11px] font-bold text-white">YouTube</span>
                  <span className="text-[9px] text-gray-400 group-hover:text-gray-200">Tutorials</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed / Location Preview */}
            <div className="rounded-2xl overflow-hidden border border-vyrox-800 h-56 relative shadow-lg">
              <iframe
                title="VYROX Athletics Location"
                src={gymConfig.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-vyrox-900/70 border border-vyrox-800 shadow-2xl relative">
              <h3 className="font-athletic text-3xl font-bold text-white uppercase tracking-wide mb-2">
                Send an Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Fill in your details below and our team will get in touch to schedule your visit.
              </p>

              {/* Feedback States */}
              {status.success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Enquiry Received!</p>
                    <p className="text-xs mt-1 text-emerald-200">{status.successMessage}</p>
                    <span className="inline-block mt-2 text-[11px] font-mono bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-300">
                      Ref: #{status.referenceId}
                    </span>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-300 text-sm flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Submission Error</p>
                    <p className="text-xs mt-1 text-red-200">{status.error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Spam Protection Field - Hidden from humans, traps automated spam bots */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_honey">Do not fill this field</label>
                  <input
                    type="text"
                    id="_honey"
                    name="_honey"
                    value={formData._honey}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Full Name <span className="text-vyrox-crimson">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-vyrox-red focus:ring-1 focus:ring-vyrox-red transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Email Address <span className="text-vyrox-crimson">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-vyrox-red focus:ring-1 focus:ring-vyrox-red transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-vyrox-red focus:ring-1 focus:ring-vyrox-red transition-colors"
                    />
                  </div>

                  {/* Interest Track */}
                  <div>
                    <label htmlFor="interest" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Program / Plan of Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white text-sm focus:outline-none focus:border-vyrox-red focus:ring-1 focus:ring-vyrox-red transition-colors"
                    >
                      <option value="General Enquiry">General Facility Walkthrough</option>
                      <option value="Monthly Athlete (₹2,999/mo)">Monthly Athlete (₹2,999/mo)</option>
                      <option value="Quarterly Pro (₹7,999/quarter)">Quarterly Pro (₹7,999/quarter)</option>
                      <option value="Black Card VIP (₹24,999/year)">Black Card VIP (₹24,999/year)</option>
                      <option value="Strength & Powerlifting Program">Strength & Powerlifting Program</option>
                      <option value="Weight Loss & Conditioning">Weight Loss & Conditioning</option>
                      <option value="Hypertrophy & Muscle Building">Hypertrophy & Muscle Building</option>
                      <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
                      <option value="Beginner Fundamentals">Beginner Fundamentals</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Message / Fitness Goals <span className="text-vyrox-crimson">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current training routine, goals, or any specific questions you have..."
                    className="w-full px-4 py-3 rounded-xl bg-vyrox-850 border border-vyrox-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-vyrox-red focus:ring-1 focus:ring-vyrox-red transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full py-4 rounded-xl bg-vyrox-red hover:bg-vyrox-darkred disabled:bg-vyrox-800 text-white font-bold text-xs uppercase tracking-wider shadow-crimson hover:shadow-crimson-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Secure Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Membership Enquiry</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

