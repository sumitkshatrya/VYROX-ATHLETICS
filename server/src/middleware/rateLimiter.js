import rateLimit from 'express-rate-limit';

// Rate limiter for AI endpoints (prevent abuse and cost spikes)
export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address. Please wait a few moments before trying again.',
  },
});

// Rate limiter for contact enquiries
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many enquiries sent. Please try again later or reach out via WhatsApp directly.',
  },
});

