import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import aiRoutes from './routes/aiRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - support client on Render, custom origins, and localhost
const defaultAllowedOrigins = [
  'https://vyrox-athletics.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
];

const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...configuredOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) {
        return callback(null, true);
      }

      const cleanOrigin = origin.replace(/\/+$/, '');
      const isAllowed =
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.startsWith('http://localhost:') ||
        cleanOrigin.startsWith('http://127.0.0.1:') ||
        cleanOrigin.endsWith('.onrender.com');

      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: Origin ${origin} not allowed by Access-Control-Allow-Origin`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsing with safe size limit
app.use(express.json({ limit: '100kb' }));

// Root welcome & status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    brand: 'VYROX ATHLETICS API',
    tagline: 'BUILT DIFFERENT. TRAIN WITH PURPOSE.',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      aiChat: '/api/ai/chat',
      fitnessPlan: '/api/ai/fitness-plan',
      contact: '/api/contact/submit',
    },
    clientOrigin: 'https://vyrox-athletics.onrender.com',
  });
});

// API Routes
app.use('/api/ai', aiRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'VYROX ATHLETICS',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 Handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found.'
  });
});

// Centralized safe error handler (never leaks stack traces to production)
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'An internal server error occurred.'
  });
});

export default app;
