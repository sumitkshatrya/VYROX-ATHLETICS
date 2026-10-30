// Central Gym Configuration for VYROX ATHLETICS
// Used by the backend to ground AI responses and validate requests

export const gymConfig = {
  brand: {
    name: "VYROX ATHLETICS",
    shortName: "VYROX",
    tagline: "BUILT DIFFERENT. TRAIN WITH PURPOSE.",
    mission: "Empowering athletes and fitness enthusiasts of all levels to forge exceptional strength, relentless conditioning, and unstoppable discipline through science-backed training and elite facilities.",
    philosophy: [
      {
        pillar: "Progressive Overload",
        description: "Systematic, measured progression across strength, hypertrophy, and functional capacity."
      },
      {
        pillar: "Metabolic Conditioning",
        description: "High-output, high-density anaerobic and aerobic conditioning designed to burn fat and build stamina."
      },
      {
        pillar: "Intelligent Recovery",
        description: "Contrast therapy, mobility protocols, and restorative amenities to ensure peak performance daily."
      },
      {
        pillar: "Accountability Community",
        description: "A culture of high standards, zero ego, and mutual drive toward greatness."
      }
    ]
  },
  contact: {
    phone: "+91 99584 58048",
    email: "enquiries@vyroxathletics.com",
    address: "742 Iron Forge Boulevard, Performance District, Metro City",
    whatsappNumber: "919958458048",
    instagramUrl: "https://instagram.com/vyroxathletics",
    facebookUrl: "https://facebook.com/vyroxathletics",
    youtubeUrl: "https://youtube.com/@vyroxathletics",
    googleMapsUrl: "https://maps.google.com/?q=742+Iron+Forge+Blvd+Performance+District",
  },
  socials: [
    { name: "Instagram", handle: "@vyroxathletics", url: "https://instagram.com/vyroxathletics" },
    { name: "Facebook", handle: "VYROX Athletics Official", url: "https://facebook.com/vyroxathletics" },
    { name: "YouTube", handle: "VYROX Performance TV", url: "https://youtube.com/@vyroxathletics" }
  ],
  hours: {
    access: "24/7 Access for Members (Keycard & Biometric access)",
    staffed: {
      weekdays: "6:00 AM – 10:00 PM (Monday – Friday)",
      weekends: "7:00 AM – 8:00 PM (Saturday – Sunday)"
    },
    coaching: "Daily 6:00 AM – 9:00 PM (By appointment or scheduled classes)"
  },
  stats: {
    facilitySize: "15,000+ sq ft",
    equipmentCount: "80+ elite training stations",
    coaches: "12 master certified strength coaches",
    accessType: "24/7 Keyless Security"
  },
  facilities: [
    "Olympic Weightlifting Platforms with Eleiko Barbells and Competition Plates",
    "Arsenal Strength & Hammer Strength heavy plate-loaded sector",
    "40-Yard synthetic turf sprint track & sled lanes",
    "Cardio Theater featuring Woodway Curve treadmills, Concept2 ergs & SkiErgs",
    "Recovery Lounge with Cold Plunge tubs (45°F) & Finnish Infrared Saunas",
    "Functional Rig with monkey bars, ropes, gymnastic rings & plyo boxes",
    "Luxury locker rooms with digital lockers, rainfall showers & grooming essentials",
    "InBody 770 Clinical Body Composition Analyzer for quarterly member scans"
  ],
  programs: [
    {
      id: "strength-training",
      title: "Strength & Powerlifting",
      level: "Intermediate to Advanced",
      description: "Master the big compound lifts—squat, bench press, deadlift, and overhead press—with periodized strength cycles and velocity-based tracking.",
      benefits: ["Maximal neural drive & muscular strength", "Barbell technical mastery", "Structural bone density & joint resilience"]
    },
    {
      id: "weight-loss-conditioning",
      title: "Weight Loss & Conditioning",
      level: "All Fitness Levels",
      description: "Torch body fat and supercharge cardiovascular endurance with high-density metabolic circuits, sled pushes, battle ropes, and kettlebell complexes.",
      benefits: ["High caloric expenditure & EPOC afterburn", "Enhanced aerobic base & VO2 max", "Athletic stamina without muscle loss"]
    },
    {
      id: "muscle-building",
      title: "Hypertrophy & Muscle Building",
      level: "Beginner to Advanced",
      description: "A precision aesthetic protocol targeting optimal muscle volume, mechanical tension, metabolic stress, and complete physique balance.",
      benefits: ["Targeted muscular growth", "Mind-muscle connection & execution mastery", "Symmetrical, defined physique"]
    },
    {
      id: "personal-training",
      title: "1-on-1 Elite Coaching",
      level: "Tailored to You",
      description: "Dedicated mentorship with our certified head coaches. Includes biometric assessment, custom programming, nutrition mapping, and form biomechanics.",
      benefits: ["100% customized program design", "Direct biomechanical feedback & safety", "Uncompromised weekly accountability"]
    },
    {
      id: "functional-fitness",
      title: "Functional & Athletic Movement",
      level: "All Fitness Levels",
      description: "Train like a pro athlete. Focus on multi-planar agility, core rotational power, explosive power cleans, box jumps, and functional mobility.",
      benefits: ["Bulletproof injury prevention", "Explosive agility and balance", "Effortless everyday functional vitality"]
    },
    {
      id: "beginner-fitness",
      title: "Beginner Fundamentals",
      level: "Beginner",
      description: "Designed for those new to the gym or returning after a break. Learn lifting mechanics safely, build consistency, and gain confident autonomy in the weight room.",
      benefits: ["Safe, injury-free foundational mechanics", "Overcome gym intimidation", "Sustainable routine & habit formation"]
    }
  ],
  memberships: [
    {
      id: "monthly",
      name: "Monthly Athlete",
      duration: "1 Month",
      billing: "Monthly auto-renew (cancel anytime)",
      price: "₹2,999",
      priceNumeric: 2999,
      popular: false,
      features: [
        "Full 24/7 access to all training floors & equipment",
        "Access to functional turf & cardio theater",
        "Free locker room & sauna access",
        "1 Complimentary InBody body composition scan",
        "Access to VYROX community events"
      ],
      whatsappMessage: "Hello VYROX Athletics, I'd like to enquire about the Monthly Athlete Membership (₹2,999/mo)."
    },
    {
      id: "quarterly",
      name: "Quarterly Pro",
      duration: "3 Months",
      billing: "Billed every 3 months",
      price: "₹7,999",
      priceNumeric: 7999,
      savings: "Save ₹998 compared to monthly",
      popular: true,
      features: [
        "Full 24/7 priority access to gym & recovery suite",
        "Unlimited Cold Plunge & Infrared Sauna access",
        "3 InBody 770 body composition scans with coach review",
        "1 Free 60-minute 1-on-1 personal coaching session",
        "10% discount on VYROX athletic merchandise & supplements",
        "Guest passes (2 per month)"
      ],
      whatsappMessage: "Hello VYROX Athletics, I'm interested in joining with the Quarterly Pro Membership (₹7,999/quarter)."
    },
    {
      id: "yearly",
      name: "Black Card VIP",
      duration: "12 Months",
      billing: "Billed annually",
      price: "₹24,999",
      priceNumeric: 24999,
      savings: "Best Value: Save ₹10,989 per year",
      popular: false,
      features: [
        "All-Inclusive 24/7 unlimited access",
        "Unlimited Cold Plunge, Sauna & Normatec recovery boots",
        "Monthly InBody scans & progress tracking consultations",
        "4 Free 1-on-1 personal training sessions with Head Coach",
        "Permanent reserved luxury locker & towel service",
        "Unlimited guest passes (1 friend per visit)",
        "Exclusive VIP apparel kit & 20% off all gym retail"
      ],
      whatsappMessage: "Hello VYROX Athletics, I want to enquire about the Black Card VIP Annual Membership (₹24,999/yr)."
    }
  ],
  faqs: [
    {
      q: "What are your operating hours?",
      a: "VYROX Athletics is accessible 24 hours a day, 7 days a week for active members via digital keypass and biometric access. Staffed hours are Monday through Friday from 6:00 AM to 10:00 PM, and Saturday through Sunday from 7:00 AM to 8:00 PM."
    },
    {
      q: "Where is VYROX Athletics located?",
      a: "We are located at 742 Iron Forge Boulevard, Performance District, Metro City. Free member parking is available directly behind the facility."
    },
    {
      q: "Can beginners join VYROX Athletics?",
      a: "Yes! While we offer world-class equipment for competitive athletes, over 40% of our members started as complete beginners. Our 'Beginner Fundamentals' program and friendly coaching staff will guide you step-by-step."
    },
    {
      q: "Do you offer personal training?",
      a: "Yes, we offer tailored 1-on-1 coaching packages and semi-private training. All new Quarterly and Yearly memberships also include complimentary coaching sessions."
    },
    {
      q: "How do I enquire or sign up for a membership?",
      a: "You can click 'Enquire Now' on any membership card to connect with our member services team on WhatsApp with your selected plan prefilled, or fill out the contact form on our website to schedule a facility walkthrough."
    },
    {
      q: "Is there a long-term contract or cancellation fee?",
      a: "Our Monthly plan has no lock-in contract and can be cancelled with 7 days' notice before your billing cycle. Quarterly and Yearly plans are paid upfront for maximum savings."
    }
  ]
};
