import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { gymConfig } from '../config/gymConfig.js';

// Setup providers
let geminiClient = null;
let openaiClient = null;

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(apiKey);
  }
  return geminiClient;
};

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
};

// Grounding system prompt for VYROX Athletics
const buildSystemPrompt = () => {
  return `You are the Official AI Fitness & Member Advisor for VYROX ATHLETICS.
Brand: ${gymConfig.brand.name}
Tagline: "${gymConfig.brand.tagline}"
Mission: ${gymConfig.brand.mission}

GYM DETAILS & FACTS (Ground your answers strictly in these facts):
- Address: ${gymConfig.contact.address}
- Phone: ${gymConfig.contact.phone}
- Email: ${gymConfig.contact.email}
- WhatsApp Enquiries: Available via website buttons or phone ${gymConfig.contact.phone}
- Social Channels: Instagram (${gymConfig.contact.instagramUrl}), Facebook (${gymConfig.contact.facebookUrl}), YouTube (${gymConfig.contact.youtubeUrl})
- Operating Hours: 
  * Gym Access: ${gymConfig.hours.access}
  * Staffed Hours: ${gymConfig.hours.staffed.weekdays}, ${gymConfig.hours.staffed.weekends}
  * Coaching Hours: ${gymConfig.hours.coaching}
- Facility Highlights:
  ${gymConfig.facilities.map(f => `* ${f}`).join('\n  ')}
- Membership Plans:
  ${gymConfig.memberships.map(m => `* ${m.name} (${m.duration}): ${m.price} - ${m.features.join(', ')}`).join('\n  ')}
- Available Workout Programs:
  ${gymConfig.programs.map(p => `* ${p.title} (${p.level}): ${p.description}`).join('\n  ')}

ROLE & BEHAVIORAL GUIDELINES:
1. Tone: High-energy, elite athletic, motivating, respectful, and authoritative yet welcoming.
2. Fitness advice: Provide evidence-based, practical fitness guidance (e.g., progressive overload, protein intake, recovery, form tips).
3. Accuracy: Only state facts about VYROX Athletics that are listed above. If asked about a service or feature not listed (e.g., swimming pool, daycare, boxing ring), clearly state: "VYROX Athletics currently does not feature that facility" and highlight our core strengths (Olympic platforms, turf, recovery suite).
4. Conversions: When a user shows interest in training, programs, or membership, warmly invite them to enquire via WhatsApp or visit for a tour.
5. Medical Safety: Never diagnose injuries or give medical prescriptions. If a user reports significant pain or medical conditions, advise them to consult a medical professional.
6. Keep responses concise, well-formatted with markdown bullets where helpful, and avoid endless walls of text.`;
};

/**
 * Handle conversational chat
 */
export async function handleAIChat(message, history = [], context = {}) {
  const systemPrompt = buildSystemPrompt();

  // Try Google Gemini first if key is present
  const gemini = getGeminiClient();
  if (gemini) {
    try {
      const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const model = gemini.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt
      });

      // Format previous history for Gemini
      const contents = [];
      for (const item of history.slice(-8)) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content || '' }]
        });
      }
      
      // Append current user message with context hint
      const contextPrefix = context.page ? `[User is currently viewing the ${context.page} page]\n` : '';
      contents.push({
        role: 'user',
        parts: [{ text: `${contextPrefix}${message}` }]
      });

      const response = await model.generateContent({ contents });
      const text = response.response.text();
      return {
        reply: text,
        provider: 'gemini'
      };
    } catch (err) {
      console.warn('Gemini chat failed, checking OpenAI fallback:', err.message);
      // Fall through to OpenAI if configured
    }
  }

  // Try OpenAI if configured
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.slice(-8).map(h => ({
          role: h.role === 'assistant' ? 'assistant' : 'user',
          content: h.content
        })),
        { role: 'user', content: `${context.page ? `[Page: ${context.page}] ` : ''}${message}` }
      ];

      const completion = await openai.chat.completions.create({
        model: modelName,
        messages,
        temperature: 0.7,
        max_tokens: 600
      });

      return {
        reply: completion.choices[0].message.content,
        provider: 'openai'
      };
    } catch (err) {
      console.warn('OpenAI chat failed:', err.message);
    }
  }

  // Intelligent fallback responder grounded in gym facts
  return getIntelligentFallbackChat(message, context);
}

/**
 * Handle structured Fitness Agent plan generation
 */
export async function generateFitnessPlan(preferences) {
  const { goal, experience, daysPerWeek, duration, equipment, location, limitations } = preferences;

  const prompt = `Create a complete, realistic, science-based weekly workout plan for an athlete at VYROX ATHLETICS with the following parameters:
- Goal: ${goal}
- Experience Level: ${experience || 'Intermediate'}
- Workout Frequency: ${daysPerWeek || 4} days per week
- Target Workout Duration: ${duration || '60'} minutes per session
- Available Equipment: ${equipment || 'Full Commercial Gym'}
- Training Location: ${location || 'Gym'}
- Special Considerations / Limitations: ${limitations || 'None reported'}

Return a strictly valid JSON object (no markdown code blocks, just raw JSON) matching this exact structure:
{
  "planName": "string (e.g. Iron Forge Hypertrophy Protocol)",
  "goal": "${goal}",
  "experienceLevel": "${experience || 'Intermediate'}",
  "daysPerWeek": ${daysPerWeek || 4},
  "splitType": "string (e.g. Upper / Lower 4-Day Split)",
  "weeklyOverview": "string (2-3 sentences explaining the science and focus)",
  "schedule": [
    {
      "day": "Day 1",
      "title": "string (e.g. Upper Body Strength)",
      "focus": "string (e.g. Chest, Lats & Shoulders)",
      "estimatedDuration": "${duration || '60'} mins",
      "warmup": ["string (warmup drill 1)", "string (warmup drill 2)"],
      "exercises": [
        {
          "id": "d1-e1",
          "name": "string (Exercise Name)",
          "sets": "string (e.g. 4)",
          "reps": "string (e.g. 6-8)",
          "rest": "string (e.g. 90-120s)",
          "notes": "string (form focus, RPE, or tempo)"
        }
      ],
      "cooldown": ["string (mobility/stretch 1)", "string (mobility/stretch 2)"]
    }
  ],
  "nutritionGuidelines": [
    "string (guideline 1)",
    "string (guideline 2)",
    "string (guideline 3)"
  ],
  "recoveryProtocols": [
    "string (recovery tip 1, mention VYROX sauna/cold plunge where relevant)",
    "string (recovery tip 2)",
    "string (recovery tip 3)"
  ],
  "trackingTips": [
    "string (tracking tip 1)",
    "string (tracking tip 2)"
  ],
  "disclaimer": "This fitness plan is generated for educational and guidance purposes. It does not replace medical or qualified 1-on-1 coaching advice. Always warm up properly and consult a physician if you experience pain."
}`;

  // Try Google Gemini
  const gemini = getGeminiClient();
  if (gemini) {
    try {
      const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const model = gemini.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json" }
      });
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const plan = JSON.parse(text);
      if (validatePlan(plan)) {
        return { plan, provider: 'gemini' };
      }
    } catch (err) {
      console.warn('Gemini plan generation failed:', err.message);
    }
  }

  // Try OpenAI
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const modelName = process.env.OPENAI_MODEL || 'gpt-4o-mini';
      const completion = await openai.chat.completions.create({
        model: modelName,
        messages: [
          { role: 'system', content: 'You are an elite master strength and conditioning specialist. Respond only with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
      });
      const plan = JSON.parse(completion.choices[0].message.content);
      if (validatePlan(plan)) {
        return { plan, provider: 'openai' };
      }
    } catch (err) {
      console.warn('OpenAI plan generation failed:', err.message);
    }
  }

  // Fallback to high-quality curated template
  return {
    plan: generateCuratedPlan(preferences),
    provider: 'curated-template',
    notice: 'Generated using VYROX Athletics science-backed foundational protocol.'
  };
}

/**
 * Validate that the returned plan meets structure requirements
 */
function validatePlan(plan) {
  return (
    plan &&
    typeof plan.planName === 'string' &&
    Array.isArray(plan.schedule) &&
    plan.schedule.length > 0 &&
    plan.schedule[0].exercises &&
    Array.isArray(plan.schedule[0].exercises)
  );
}

/**
 * Intelligent Fallback Chatbot when API keys are being set up
 */
function getIntelligentFallbackChat(message, context) {
  const lower = message.toLowerCase();

  if (lower.includes('membership') || lower.includes('cost') || lower.includes('price') || lower.includes('plan')) {
    return {
      reply: `At **VYROX ATHLETICS**, we offer three flexible membership tiers:\n\n` +
        `• **Monthly Athlete (₹2,999/mo)**: Full 24/7 access to all training floors, cardio, locker rooms, and sauna. Cancel anytime.\n` +
        `• **Quarterly Pro (₹7,999 / 3 mos)**: *Most Popular!* Save ₹998, includes unlimited Cold Plunge & Sauna, 3 InBody scans, and a free 60-min personal coaching session.\n` +
        `• **Black Card VIP (₹24,999/yr)**: Unlimited 24/7 access, VIP locker, 4 personal training sessions, unlimited guest passes, and gear discounts.\n\n` +
        `Would you like to connect directly on WhatsApp to claim a trial pass?`,
      provider: 'vyrox-knowledge-base'
    };
  }

  if (lower.includes('timing') || lower.includes('hour') || lower.includes('open') || lower.includes('close')) {
    return {
      reply: `**VYROX ATHLETICS Operating Hours:**\n\n` +
        `• **Gym Access**: **24/7** for all members using biometric and mobile keycard access.\n` +
        `• **Staffed Hours**:\n  - Mon–Fri: 6:00 AM – 10:00 PM\n  - Sat–Sun: 7:00 AM – 8:00 PM\n` +
        `• **Coaching Sessions**: Available daily 6:00 AM – 9:00 PM by appointment.\n\n` +
        `Visit us anytime during staffed hours at **742 Iron Forge Blvd** for a facility walkthrough!`,
      provider: 'vyrox-knowledge-base'
    };
  }

  if (lower.includes('weight loss') || lower.includes('lose fat') || lower.includes('cardio') || lower.includes('diet')) {
    return {
      reply: `For optimal fat loss while preserving lean athletic muscle, our **Weight Loss & Conditioning** program is designed around high-density intervals and metabolic strength circuits.\n\n` +
        `**Key principles we practice:**\n` +
        `1. Maintain a moderate 300–500 calorie deficit.\n` +
        `2. Keep protein high (1.6–2.2g per kg of body weight).\n` +
        `3. Combine compound resistance training with 2–3 HIIT / sled push conditioning sessions.\n\n` +
        `You can also use our **AI Fitness Agent** tab to generate a complete custom weekly workout split tailored to your exact schedule!`,
      provider: 'vyrox-knowledge-base'
    };
  }

  if (lower.includes('muscle') || lower.includes('build') || lower.includes('hypertrophy') || lower.includes('bulk')) {
    return {
      reply: `To maximize hypertrophy, our **Hypertrophy & Muscle Building** track uses science-proven progressive tension overload.\n\n` +
        `**Essential hypertrophy guidelines:**\n` +
        `1. Train each muscle group 2x per week with 10–20 total challenging sets.\n` +
        `2. Focus on rep ranges between 6–12 reps within 1–2 reps in reserve (RIR).\n` +
        `3. Ensure adequate rest (2–3 minutes on major compound movements).\n\n` +
        `Check out our dedicated **AI Fitness Agent** above to build a custom multi-day hypertrophy split today!`,
      provider: 'vyrox-knowledge-base'
    };
  }

  if (lower.includes('contact') || lower.includes('phone') || lower.includes('location') || lower.includes('address') || lower.includes('instagram') || lower.includes('facebook') || lower.includes('youtube') || lower.includes('social')) {
    return {
      reply: `You can reach and connect with **VYROX ATHLETICS** anytime through:\n\n` +
        `• **Phone & WhatsApp**: +91 99584 58048\n` +
        `• **Email**: enquiries@vyroxathletics.com\n` +
        `• **Address**: 742 Iron Forge Boulevard, Performance District, Metro City\n` +
        `• **Instagram**: [@vyroxathletics](https://instagram.com/vyroxathletics) (Daily PRs & form cues)\n` +
        `• **Facebook**: [VYROX Athletics Official](https://facebook.com/vyroxathletics)\n` +
        `• **YouTube**: [VYROX Performance TV](https://youtube.com/@vyroxathletics) (Workout tutorials)\n\n` +
        `Feel free to message us on Instagram DM or WhatsApp for instant membership assistance!`,
      provider: 'vyrox-knowledge-base'
    };
  }

  // Default helpful message
  return {
    reply: `Welcome to **VYROX ATHLETICS**! I am your AI Fitness Advisor.\n\n` +
      `I can help you explore our **workout programs**, explain our **24/7 facility & recovery suite**, recommend a **membership plan**, or provide tailored advice on strength, fat loss, and hypertrophy.\n\n` +
      `Feel free to try the quick buttons below or ask any specific question!`,
    provider: 'vyrox-knowledge-base'
  };
}

/**
 * Curated science-based fitness plan generator
 */
function generateCuratedPlan(preferences) {
  const goal = preferences.goal || 'Build Muscle';
  const days = Number(preferences.daysPerWeek) || 4;
  const duration = preferences.duration || '60';

  const schedule = [
    {
      day: "Day 1",
      title: "Upper Body Power & Primary Press",
      focus: "Chest, Upper Back, Shoulders & Triceps",
      estimatedDuration: `${duration} mins`,
      warmup: [
        "Band Over-and-Backs: 2 sets x 15 reps",
        "Scapular Push-ups: 2 sets x 12 reps",
        "Empty Barbell Warmup Sets: 2 x 10 reps"
      ],
      exercises: [
        { id: "d1-e1", name: "Barbell Bench Press", sets: "4", reps: "6-8", rest: "120s", notes: "Control the eccentric, pause slightly at chest." },
        { id: "d1-e2", name: "Chest-Supported Dumbbell Row", sets: "4", reps: "8-10", rest: "90s", notes: "Squeeze shoulder blades together at peak contraction." },
        { id: "d1-e3", name: "Overhead Barbell Military Press", sets: "3", reps: "8-10", rest: "90s", notes: "Brace core and glutes throughout the press." },
        { id: "d1-e4", name: "Lat Pulldown (Neutral Grip)", sets: "3", reps: "10-12", rest: "75s", notes: "Full stretch at the top, drive elbows downward." },
        { id: "d1-e5", name: "Dumbbell Lateral Raises", sets: "3", reps: "12-15", rest: "60s", notes: "Strict form, slight forward torso lean." },
        { id: "d1-e6", name: "Cable Triceps Rope Pushdown", sets: "3", reps: "12-15", rest: "60s", notes: "Lock elbows to sides, spread rope at lockout." }
      ],
      cooldown: [
        "Doorway Pectoral Stretch: 60s per side",
        "Cross-Body Shoulder Stretch: 45s per side"
      ]
    },
    {
      day: "Day 2",
      title: "Lower Body Strength & Posterior Chain",
      focus: "Quadriceps, Hamstrings & Glutes",
      estimatedDuration: `${duration} mins`,
      warmup: [
        "World's Greatest Stretch: 5 reps per side",
        "Bodyweight Deep Squats with Prying: 2 sets x 10 reps",
        "Glute Bridges: 2 sets x 15 reps"
      ],
      exercises: [
        { id: "d2-e1", name: "Barbell Back Squat", sets: "4", reps: "6-8", rest: "150s", notes: "Hit parallel depth, push knees out over toes." },
        { id: "d2-e2", name: "Romanian Deadlift (RDL)", sets: "3", reps: "8-10", rest: "120s", notes: "Hinge at the hips, maintain neutral lumbar spine." },
        { id: "d2-e3", name: "Bulgarian Split Squats", sets: "3", reps: "10 per leg", rest: "90s", notes: "Control descent, drive through lead heel." },
        { id: "d2-e4", name: "Lying Leg Hamstring Curl", sets: "3", reps: "12-15", rest: "75s", notes: "Slow 3-second negative eccentric." },
        { id: "d2-e5", name: "Standing Calf Raises", sets: "4", reps: "12-15", rest: "60s", notes: "Hold stretch at bottom for 2 full seconds." }
      ],
      cooldown: [
        "Kneeling Hip Flexor Stretch: 60s per side",
        "Seated Hamstring Floss: 60s per side"
      ]
    },
    {
      day: "Day 3",
      title: "Active Recovery & Mobility Protocol",
      focus: "Recovery, Core & Soft Tissue",
      estimatedDuration: "40 mins",
      warmup: [
        "Cat-Cow Spine Mobilization: 10 reps",
        "Bird-Dog Core Stability: 10 reps per side"
      ],
      exercises: [
        { id: "d3-e1", name: "Zone 2 Low-Intensity Incline Walk / Concept2 Row", sets: "1", reps: "25-30 mins", rest: "N/A", notes: "Maintain conversational breathing pace (Heart Rate ~120-135 bpm)." },
        { id: "d3-e2", name: "Hanging Knee / Leg Raises", sets: "3", reps: "12-15", rest: "60s", notes: "Tuck pelvis at top, avoid swinging." },
        { id: "d3-e3", name: "Pallof Press (Cable or Resistance Band)", sets: "3", reps: "12 per side", rest: "60s", notes: "Resist rotational pull, brace abdominal wall." },
        { id: "d3-e4", name: "Infrared Sauna & Contrast Cold Plunge (VYROX Suite)", sets: "3 rounds", reps: "15m sauna / 3m plunge", rest: "2m", notes: "Accelerates clearance of metabolic waste and reduces DOMS." }
      ],
      cooldown: [
        "Pigeon Pose Hip Opener: 90s per side",
        "Deep Diaphragmatic Box Breathing: 5 minutes"
      ]
    },
    {
      day: "Day 4",
      title: "Hypertrophy Upper Pump & Accessory",
      focus: "Back Thickness, Shoulders & Arms",
      estimatedDuration: `${duration} mins`,
      warmup: [
        "PVC Pipe Dislocates: 15 reps",
        "Push-up to Downward Dog: 8 reps"
      ],
      exercises: [
        { id: "d4-e1", name: "Incline Dumbbell Press (30 Degree)", sets: "4", reps: "8-10", rest: "90s", notes: "Target upper clavicular pectoral head." },
        { id: "d4-e2", name: "Seated Cable Row (Wide Grip)", sets: "4", reps: "10-12", rest: "90s", notes: "Pull to sternum, squeeze rear delts and mid-traps." },
        { id: "d4-e3", name: "Cable Lateral Raises", sets: "3", reps: "12-15", rest: "60s", notes: "Constant mechanical tension on medial deltoid." },
        { id: "d4-e4", name: "Incline Dumbbell Biceps Curls", sets: "3", reps: "10-12", rest: "60s", notes: "Maximum stretch on the long head of the bicep." },
        { id: "d4-e5", name: "Dips or Assisted Triceps Machine", sets: "3", reps: "10-12", rest: "75s", notes: "Upright posture targets triceps lockout." }
      ],
      cooldown: [
        "Biceps & Forearm Wall Stretch: 45s per side",
        "Thoracic Foam Rolling: 3 minutes"
      ]
    }
  ];

  return {
    planName: `VYROX High-Impact ${goal} Protocol`,
    goal,
    experienceLevel: preferences.experience || "Intermediate",
    daysPerWeek: days,
    splitType: days >= 4 ? "Upper / Lower Periodized Split" : "Full Body High-Density Split",
    weeklyOverview: `Engineered specifically for your goal of "${goal}". This protocol incorporates heavy compound foundational lifts for mechanical load paired with targeted hypertrophy assistance and structured recovery.`,
    schedule: schedule.slice(0, days > 4 ? 4 : days),
    nutritionGuidelines: [
      "Consume 1.8g to 2.2g of high-quality protein per kilogram of body mass daily.",
      "Time complex carbohydrates around your training window (pre-workout fuel and post-workout glycogen replenishment).",
      "Hydrate consistently with 3.5 to 4.5 liters of clean water and electrolytes daily."
    ],
    recoveryProtocols: [
      "Target 7.5 to 9 hours of uninterrupted sleep in a cool, dark room.",
      "Take advantage of the VYROX Recovery Lounge: contrast 15 minutes of infrared sauna with 3 minutes of cold plunge (45°F).",
      "Perform 10 minutes of daily mobility and thoracic extension work on rest days."
    ],
    trackingTips: [
      "Record every working set, weight, and repetition in your training logbook to guarantee progressive overload.",
      "Schedule a quarterly InBody 770 body composition scan at the VYROX coaching desk to track muscle mass and body fat."
    ],
    disclaimer: "This plan is generated for educational and training guidance. It does not replace individualized medical advice or certified 1-on-1 coaching. Stop immediately if you experience sharp pain or dizziness."
  };
}

