import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  VYROX ATHLETICS - AI & API Server Online    `);
  console.log(`  Port: ${PORT}                                `);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  Gemini Key: ${process.env.GEMINI_API_KEY ? 'Configured (Active)' : 'Not set'}`);
  console.log(`  OpenAI Key: ${process.env.OPENAI_API_KEY ? 'Configured (Active)' : 'Not set'}`);
  console.log(`===============================================`);
});

