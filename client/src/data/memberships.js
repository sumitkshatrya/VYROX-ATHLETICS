// Membership Plans for VYROX ATHLETICS
// Configurable tiers with WhatsApp enquiry deep-links (in INR / Rupees)

export const memberships = [
  {
    id: "monthly",
    name: "Monthly Athlete",
    tagline: "Total Flexibility, Zero Lock-In",
    duration: "1 Month",
    billingCycle: "Billed monthly • Cancel anytime",
    price: "₹2,999",
    priceNumeric: 2999,
    popular: false,
    badge: "Flexible",
    facilities: [
      "Full 24/7 access to all weight training floors",
      "Cardio theater & 40-yard sprint turf",
      "Infrared Sauna & luxury locker rooms",
      "Mobile digital keypass & biometric entry",
      "VYROX member mobile app access"
    ],
    benefits: [
      "1 Free InBody 770 body composition analysis",
      "Complimentary locker towel service",
      "Access to all VYROX weekend athletic workshops"
    ],
    whatsappText: "Hello VYROX Athletics, I'd like to enquire about the Monthly Athlete Membership (₹2,999/month)."
  },
  {
    id: "quarterly",
    name: "Quarterly Pro",
    tagline: "The Serious Lifter's Choice",
    duration: "3 Months",
    billingCycle: "Billed quarterly • Save ₹998",
    price: "₹7,999",
    priceNumeric: 7999,
    savings: "Save ₹998 compared to monthly",
    popular: true,
    badge: "Most Popular",
    facilities: [
      "Everything in Monthly Athlete tier",
      "Priority 24/7 keycard access & peak privileges",
      "Unlimited Cold Plunge (45°F) & Contrast Therapy suite",
      "Dedicated barbell and chalk station access",
      "Access to private posing and assessment rooms"
    ],
    benefits: [
      "1 Complimentary 60-Minute 1-on-1 Personal Training Session",
      "3 InBody 770 composition scans with coach review",
      "2 Monthly guest passes for training partners",
      "10% discount on all VYROX merchandise and supplement bar"
    ],
    whatsappText: "Hello VYROX Athletics, I'm interested in joining with the Quarterly Pro Membership (₹7,999/quarter)."
  },
  {
    id: "yearly",
    name: "Black Card VIP",
    tagline: "The Pinnacle Athletic Experience",
    duration: "12 Months",
    billingCycle: "Billed annually • Save ₹10,989",
    price: "₹24,999",
    priceNumeric: 24999,
    savings: "Best Value: Save ₹10,989 per year",
    popular: false,
    badge: "Best Value",
    facilities: [
      "All-Inclusive 24/7 VIP access to entire facility",
      "Unlimited Cold Plunge, Infrared Sauna & Normatec recovery boots",
      "Dedicated permanent luxury locker with custom engraved lock",
      "Permanent private parking space access"
    ],
    benefits: [
      "4 Complimentary 60-Minute 1-on-1 Personal Training Sessions",
      "Monthly InBody 770 body composition audits with Head Coach",
      "Unlimited guest passes (bring 1 friend per session)",
      "Official VYROX Athletic gear pack (hoodie, gym bag, shaker)",
      "20% VIP discount on all private coaching and retail"
    ],
    whatsappText: "Hello VYROX Athletics, I want to enquire about the Black Card VIP Annual Membership (₹24,999/year)."
  }
];
