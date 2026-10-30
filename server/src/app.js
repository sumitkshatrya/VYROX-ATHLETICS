import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import aiRoutes from './routes/aiRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin in development)
      if (!origin || origin === allowedOrigin || origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by Access-Control-Allow-Origin'));
    },
    credentials: true,
  })
);

// Body parsing with safe size limit
app.use(express.json({ limit: '100kb' }));

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

