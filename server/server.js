import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import questionsRoutes from './routes/questionsRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the server directory, with fallback to root cwd
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiMode: process.env.GEMINI_API_KEY ? 'Live Gemini Pro/Flash AI' : 'Smart AI Fallback Engine (Demo Mode Ready)'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/resume', resumeRoutes);

// Central Error Handler
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🤖 AI Interview Coach Server running on http://127.0.0.1:${PORT}`);
  console.log(`📡 AI Mode: ${process.env.GEMINI_API_KEY ? 'Live Gemini Engine Enabled' : 'Smart Contextual Fallback Active'}`);
});
