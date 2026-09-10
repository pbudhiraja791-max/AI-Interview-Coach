# 🤖 AI Interview Coach

A complete, production-grade, state-of-the-art AI interview preparation platform designed to simulate realistic adaptive mock interviews, deeply evaluate candidate responses across technical and communication dimensions, diagnose skill gaps, and generate personalized preparation roadmaps.

---

## 🌟 Key Features

### 1. 🎯 Adaptive AI Mock Interview Engine
- **Non-Chatbot Realistic Interviewing**: The AI interviewer listens, evaluates, and dynamically changes difficulty (Level 1 Foundations → Level 2 Standard → Level 3 Bar Raiser).
- **Intelligent Follow-Ups**: Probes candidate's exact answer depth. Good answers trigger deeper architectural/scaling trade-offs; weaker answers trigger helpful analogies and step-by-step guidance.
- **Interviewer Personalities**:
  - *Professional & Objective* (Standard Senior Panel)
  - *Friendly & Supportive* (Scaffolding tone)
  - *Technical Specialist* (Low-level internals, OS memory & cache locality)
  - *Strict & Direct* (Concise, high-standard assessment)
  - *Stress Interviewer* (High-pressure edge cases)

### 2. 🎙️ Voice Mode & Live Communication Analytics
- **Live Speech Recognition**: Browser-native Web Speech API with continuous streaming.
- **Communication Indicators**:
  - Speaking Pace (WPM) gauge (detects slow < 120 vs optimal 130–155 vs rushed > 165)
  - Filler Words Detector (`"um"`, `"uh"`, `"like"`, `"basically"`, `"you know"`)
  - Answer Duration & Long Silence (>3s) detection
- **Speech Synthesis**: AI interviewer speaks questions out loud with adjustable rate and voice selection.

### 3. 💼 Job Description Skill Gap Matcher
- Compares target job requirements against candidate's verified skills.
- Computes **Job Match Score %** and generates an actionable gap matrix.

### 4. 💻 Live Coding Studio
- Data structure problem catalog with starter templates in **JavaScript, Python, Java, and C++**.
- Live client-side JavaScript execution sandbox with instant test case results.
- AI evaluation of **Time Complexity O(N)**, **Space Complexity O(N)**, Code Quality, Edge Cases, and optimization tips.

### 5. 🪞 AI Interview Mirror & STAR Evaluation
- **Behavioral Evaluation**: Evaluates answers using the **STAR Framework** (Situation, Task, Action, Result).
- **Interview Mirror**: Synthesizes the exact perception profile of the candidate from the hiring committee's viewpoint.
- **Deep Mistake Explorer**: Explains *"What was missing"*, *"What was incorrect"*, *"Why it matters"*, and *"How to improve"*.

### 6. 📅 7-Day Personalized Study Roadmap & Analytics
- Analyzes weaknesses across past interviews to generate customized daily study plans with interactive checklists.
- **Recharts Analytics**: Score trends over time, radar capability polygons, XP levels, and milestone badges.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Recharts, React Router v6, Canvas Confetti, Web Speech API (STT & TTS).
- **Backend**: Node.js, Express.js (ES Modules), JWT Authentication, bcryptjs password hashing, Multer file handling, `pdf-parse` & `mammoth` text extraction.
- **AI Service Layer**: Google Gemini Generative AI SDK with structured JSON schemas and seamless smart fallback reasoning engine for 100% reliable offline/demo execution.
- **Data Layer**: In-memory persistent database service with pre-seeded demo user (*Alex Sharma*), past interviews, question bank, and coding challenges.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Start the Backend Server
```bash
cd server
npm install
node server.js
```
The server will run on `http://localhost:5050`.

### 2. Start the Frontend Application
```bash
cd client
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## ⚡ 1-Click Demo Candidate Mode
For quick evaluation, click the **"1-Click Demo"** button on the landing page or login screen to immediately sign in as:
- **Candidate**: Alex Sharma
- **Target Role**: Full Stack Developer
- **Readiness Score**: 78%
- **Streak**: 7 Days (920 XP)
- Pre-loaded with past completed interviews, resume project analyses, and active 7-day preparation roadmap.

---

## 🔐 Environment Variables

### `server/.env`
```env
PORT=5050
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_optional
CLIENT_URL=http://localhost:5173
```
*Note: If `GEMINI_API_KEY` is omitted, the application runs on the smart offline reasoning engine.*

---

## 📋 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/demo-login` | 1-Click demo authentication |
| `POST` | `/api/auth/login` | Email/password sign in |
| `POST` | `/api/auth/register` | Create user profile |
| `GET` | `/api/progress/dashboard` | Aggregated dashboard readiness & stats |
| `POST` | `/api/interviews/setup` | Initialize adaptive mock interview |
| `POST` | `/api/interviews/:id/answer` | Submit answer with speech metrics & receive AI feedback |
| `POST` | `/api/interviews/:id/next-question` | Generate adaptive next question or follow-up |
| `POST` | `/api/interviews/:id/complete` | Finalize report & generate Interview Mirror |
| `POST` | `/api/jobs/analyze` | Benchmark candidate skills against Job Description |
| `POST` | `/api/coding/execute` | Run code against problem test cases |
| `POST` | `/api/coding/evaluate` | AI complexity & code quality review |
| `GET` | `/api/questions` | Filterable Question Bank with bookmarks |
| `GET` | `/api/progress/plan` | 7-Day dynamic study roadmap |
