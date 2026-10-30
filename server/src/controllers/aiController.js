import { handleAIChat, generateFitnessPlan } from '../services/aiService.js';

export async function chatHandler(req, res) {
  try {
    const { message, history = [], context = {} } = req.body;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a valid non-empty string.'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message exceeds maximum allowed length of 1000 characters.'
      });
    }

    // Sanitize and validate history
    let sanitizedHistory = [];
    if (Array.isArray(history)) {
      sanitizedHistory = history
        .slice(-10) // Limit to last 10 messages
        .filter(item => item && typeof item === 'object' && ['user', 'assistant'].includes(item.role))
        .map(item => ({
          role: item.role,
          content: String(item.content || '').slice(0, 1000)
        }));
    }

    // Call service
    const result = await handleAIChat(message.trim(), sanitizedHistory, context);

    return res.json({
      success: true,
      reply: result.reply,
      provider: result.provider
    });
  } catch (error) {
    console.error('Error in chatHandler:', error.message);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while communicating with the AI service. Please try again or enquire via WhatsApp.'
    });
  }
}

export async function fitnessPlanHandler(req, res) {
  try {
    const { goal, experience, daysPerWeek, duration, equipment, location, limitations } = req.body;

    if (!goal || typeof goal !== 'string' || goal.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'A fitness goal must be selected to generate a tailored workout plan.'
      });
    }

    const preferences = {
      goal: goal.trim().slice(0, 100),
      experience: typeof experience === 'string' ? experience.slice(0, 50) : 'Intermediate',
      daysPerWeek: Math.min(Math.max(Number(daysPerWeek) || 4, 1), 7),
      duration: typeof duration === 'string' ? duration.slice(0, 30) : '60',
      equipment: typeof equipment === 'string' ? equipment.slice(0, 100) : 'Full Commercial Gym',
      location: typeof location === 'string' ? location.slice(0, 50) : 'Gym',
      limitations: typeof limitations === 'string' ? limitations.slice(0, 500) : 'None'
    };

    const result = await generateFitnessPlan(preferences);

    return res.json({
      success: true,
      plan: result.plan,
      provider: result.provider,
      notice: result.notice
    });
  } catch (error) {
    console.error('Error in fitnessPlanHandler:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Unable to generate workout plan at this time. Please try again.'
    });
  }
}

export async function aiStatusHandler(req, res) {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

  return res.json({
    status: 'online',
    providers: {
      gemini: hasGemini,
      openai: hasOpenAI,
    },
    activeProvider: hasGemini ? 'Gemini' : hasOpenAI ? 'OpenAI' : 'Fallback Knowledgebase'
  });
}

