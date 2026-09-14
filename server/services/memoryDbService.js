import bcrypt from 'bcryptjs';
import { seedQuestions } from '../data/seedQuestions.js';
import { codingProblems } from '../data/codingProblems.js';

// Pre-seeded Demo Candidate & Initial Database
const DEMO_USER_ID = "usr_alex_sharma_01";
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync("demo12345", 10);

class MemoryDbService {
  constructor() {
    this.users = new Map();
    this.interviews = new Map();
    this.jobDescriptions = new Map();
    this.codingSubmissions = new Map();
    this.preparationPlans = new Map();
    this.bookmarkedQuestions = new Set();
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Create Alex Sharma demo profile
    const demoUser = {
      _id: DEMO_USER_ID,
      name: "Alex Sharma",
      email: "alex.sharma@example.com",
      password: DEFAULT_PASSWORD_HASH,
      targetRole: "Full Stack Developer",
      experienceLevel: "1-3 years",
      skills: ["React", "Node.js", "Java", "SQL", "TypeScript", "System Design", "MongoDB"],
      interviewGoals: ["Master System Design", "Improve STAR behavioral stories", "Ace SQL optimization"],
      readinessScore: 78,
      readinessBreakdown: {
        technical: 84,
        communication: 72,
        problemSolving: 81,
        confidence: 68,
        clarity: 79
      },
      xp: 920,
      streakDays: 7,
      lastActiveDate: new Date(),
      badges: [
        { id: "badge_first_interview", name: "First Step", icon: "Target", unlockedAt: new Date(Date.now() - 6 * 86400000) },
        { id: "badge_7_streak", name: "7-Day Streak Master", icon: "Flame", unlockedAt: new Date() },
        { id: "badge_tech_expert", name: "Algorithm Ace", icon: "Code", unlockedAt: new Date(Date.now() - 2 * 86400000) },
        { id: "badge_star_pro", name: "STAR Storyteller", icon: "Award", unlockedAt: new Date(Date.now() - 4 * 86400000) }
      ],
      createdAt: new Date(Date.now() - 14 * 86400000)
    };
    this.users.set(DEMO_USER_ID, demoUser);

    // 2. Demo Past Interviews for Alex
    const pastInterview1 = {
      _id: "int_alex_hist_01",
      userId: DEMO_USER_ID,
      role: "Full Stack Developer",
      interviewType: "Technical",
      difficulty: "Adaptive",
      personality: "Professional",
      mode: "Text",
      durationMinutes: 20,
      totalQuestions: 4,
      status: "completed",
      questions: [
        {
          questionId: "tech-java-01",
          questionText: "Can you explain the difference between ArrayList and LinkedList and tell me when you would choose one over the other?",
          topic: "Java",
          difficultyLevel: 2,
          isFollowUp: false,
          candidateAnswer: "ArrayList uses a contiguous dynamic array under the hood so index lookups are O(1). LinkedList is a doubly linked list of pointers so lookup is O(N). ArrayList is almost always better due to CPU caching and contiguous memory.",
          speechMetrics: { wpm: 138, fillerWordCount: 1, fillerWords: ["basically"], durationSeconds: 45, pauseCount: 1, clarityScore: 92 },
          evaluation: {
            score: 9,
            technicalKnowledge: 9,
            clarity: 9,
            relevance: 10,
            depth: 8,
            strengths: ["Highlighted CPU cache locality", "Accurate time complexities"],
            improvements: ["Mention memory overhead of LinkedList node objects"],
            betterAnswer: "ArrayList is backed by an array with O(1) random access and superior CPU cache locality. LinkedList stores nodes with two pointers each, adding 24-32 bytes overhead per element. ArrayList is preferred in 99% of workloads unless frequent O(1) insertions at the head are required.",
            interviewerPerspective: "Demonstrates strong foundational memory and data structure knowledge.",
            mistakeExplanation: {
              missing: ["Pointer overhead comparison"],
              incorrect: [],
              whyItMatters: "Illustrates low-level hardware memory awareness",
              howToImprove: "Discuss 64-bit JVM object header and reference sizes."
            }
          },
          answeredAt: new Date(Date.now() - 3 * 86400000)
        },
        {
          questionId: "tech-backend-01",
          questionText: "Explain how B-Tree indexes work in relational databases. Why might a query with `WHERE age > 25 AND city = 'NY'` fail to use a composite index on `(age, city)` efficiently?",
          topic: "DBMS & SQL",
          difficultyLevel: 3,
          isFollowUp: true,
          candidateAnswer: "A composite index on (age, city) sorts primarily by age. Because age > 25 is a range condition, the database finds the first age > 25, but after that it cannot jump to city='NY' because records are ordered by age first. The index should be (city, age).",
          evaluation: {
            score: 9,
            technicalKnowledge: 10,
            clarity: 9,
            relevance: 9,
            depth: 9,
            strengths: ["Correctly stated leftmost prefix and range condition limitation", "Proposed optimal index column order"],
            improvements: ["Mention index-only scans"],
            betterAnswer: "In composite indexes, range predicates prevent the engine from using subsequent index columns for seeks. An index on (city, age) allows an exact seek on city followed by a range scan on age.",
            interviewerPerspective: "Senior-level database performance insight.",
            mistakeExplanation: { missing: [], incorrect: [], whyItMatters: "Directly prevents slow table scans in high-load queries.", howToImprove: "Add EXPLAIN ANALYZE examples." }
          },
          answeredAt: new Date(Date.now() - 3 * 86400000)
        }
      ],
      overallEvaluation: {
        overallScore: 86,
        technicalScore: 92,
        communicationScore: 80,
        problemSolvingScore: 88,
        clarityScore: 87,
        answerStructureScore: 84,
        topStrengths: ["Java Collections", "Database Index Optimization", "Algorithmic Complexity"],
        topWeaknesses: ["Filler word reduction in spoken transitions", "STAR story structure depth"],
        interviewMirror: {
          technicalImpression: "Very strong senior technical depth and architectural reasoning.",
          communicationImpression: "Clear, concise, and structured. Minimal hesitation.",
          problemSolvingImpression: "Breaks down edge cases systematically before proposing solutions.",
          overallImpression: "Strong Hire recommendation for Full Stack Engineer role."
        },
        recommendedActionPlan: [
          "Practice 5 SQL optimization and window function problems",
          "Refine STAR answers for behavioral conflict resolution",
          "Practice live voice pace control (aim for 130-145 WPM)"
        ]
      },
      createdAt: new Date(Date.now() - 3 * 86400000),
      completedAt: new Date(Date.now() - 3 * 86400000)
    };
    this.interviews.set(pastInterview1._id, pastInterview1);

    // 4. Demo Preparation Plan
    const demoPlan = {
      _id: "plan_alex_01",
      userId: DEMO_USER_ID,
      title: "7-Day Personalized Full-Stack Preparation Plan",
      detectedWeaknesses: ["Complex SQL Joins & Window Functions", "Behavioral STAR Action Detailing", "Distributed System Consensus (Raft/Paxos)"],
      days: [
        {
          dayNumber: 1,
          topic: "SQL Joins & Index Optimization",
          description: "Master B-Tree index ordering, EXPLAIN query plans, and complex multi-table aggregations.",
          completed: true,
          tasks: [
            { id: "t1_1", title: "Complete 5 SQL query optimization drills in Practice mode", type: "practice", completed: true },
            { id: "t1_2", title: "Review composite index leftmost prefix rule", type: "study", completed: true }
          ]
        },
        {
          dayNumber: 2,
          topic: "React Performance & Concurrent Mode",
          description: "Deep dive into Virtual DOM reconciliation, useTransition, and useMemo edge cases.",
          completed: true,
          tasks: [
            { id: "t2_1", title: "Practice React hooks rendering lifecycle questions", type: "questions", completed: true },
            { id: "t2_2", title: "Solve Sliding Window coding challenge", type: "coding", completed: true }
          ]
        },
        {
          dayNumber: 3,
          topic: "Behavioral & Conflict Resolution (STAR)",
          description: "Structure high-impact stories with clear Situation, Task, personal Action, and quantified Result.",
          completed: true,
          tasks: [
            { id: "t3_1", title: "Complete a 15-min Behavioral Mock Interview", type: "interview", completed: true },
            { id: "t3_2", title: "Refine personal story on technical disagreement", type: "study", completed: true }
          ]
        },
        {
          dayNumber: 4,
          topic: "Distributed Systems & Caching Strategies",
          description: "Review cache-aside, write-through, Redis cluster partitioning, and consistency models.",
          completed: false,
          tasks: [
            { id: "t4_1", title: "Design a high-throughput URL shortener with rate limiting", type: "system_design", completed: false },
            { id: "t4_2", title: "Practice 3 System Design questions in Question Bank", type: "questions", completed: false }
          ]
        },
        {
          dayNumber: 5,
          topic: "Data Structures & Tree Traversals",
          description: "Solve Medium/Hard Binary Tree, Heap, and Graph search problems.",
          completed: false,
          tasks: [
            { id: "t5_1", title: "Solve 2 Graph/Tree coding challenges in Coding Studio", type: "coding", completed: false },
            { id: "t5_2", title: "Practice voice delivery for time complexity explanations", type: "practice", completed: false }
          ]
        },
        {
          dayNumber: 6,
          topic: "Stress & Strict Interview Simulation",
          description: "Practice answering under challenging follow-up probes with strict interviewer personality.",
          completed: false,
          tasks: [
            { id: "t6_1", title: "Complete a 20-min Stress Mode Mock Interview", type: "interview", completed: false }
          ]
        },
        {
          dayNumber: 7,
          topic: "Final Full-Length Mock Interview & Review",
          description: "Complete full 30-minute mixed technical & behavioral interview to calibrate final readiness score.",
          completed: false,
          tasks: [
            { id: "t7_1", title: "Full 30-min Mock Interview", type: "interview", completed: false },
            { id: "t7_2", title: "Inspect Interview Mirror and final readiness score", type: "review", completed: false }
          ]
        }
      ],
      updatedAt: new Date()
    };
    this.preparationPlans.set(demoPlan._id, demoPlan);
    this.preparationPlans.set(DEMO_USER_ID, demoPlan);

    // Bookmarked question
    this.bookmarkedQuestions.add("tech-backend-01");
  }

  // --- USER METHODS ---
  async findUserByEmail(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    for (const u of this.users.values()) {
      if (u.email && u.email.toLowerCase() === normalized) {
        return u;
      }
    }
    return null;
  }

  async findUserById(id) {
    if (!id) return null;
    return this.users.get(id) || null;
  }

  async createUser(userData) {
    const id = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const user = {
      _id: id,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      targetRole: userData.targetRole || "Software Engineer",
      experienceLevel: userData.experienceLevel || "1-3 years",
      skills: userData.skills || ["JavaScript", "React", "Node.js"],
      interviewGoals: userData.interviewGoals || ["Prepare for upcoming interviews"],
      readinessScore: 65,
      readinessBreakdown: {
        technical: 68,
        communication: 64,
        problemSolving: 66,
        confidence: 60,
        clarity: 67
      },
      xp: 100,
      streakDays: 1,
      lastActiveDate: new Date(),
      badges: [{ id: "badge_welcome", name: "Welcome Aboard", icon: "Sparkles", unlockedAt: new Date() }],
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id, updateData) {
    const user = this.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...updateData, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }

  // --- INTERVIEW METHODS ---
  async createInterview(interviewData) {
    const id = `int_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const interview = {
      _id: id,
      status: "in_progress",
      currentDifficultyScore: interviewData.difficulty === "Easy" ? 1 : interviewData.difficulty === "Hard" ? 3 : 2,
      questions: [],
      createdAt: new Date(),
      ...interviewData
    };
    this.interviews.set(id, interview);
    return interview;
  }

  async getInterviewById(id) {
    return this.interviews.get(id) || null;
  }

  async listUserInterviews(userId) {
    const list = [];
    for (const item of this.interviews.values()) {
      if (item.userId === userId) list.push(item);
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async updateInterview(id, updates) {
    const interview = this.interviews.get(id);
    if (!interview) return null;
    const updated = { ...interview, ...updates };
    this.interviews.set(id, updated);
    return updated;
  }

  // --- JOB DESCRIPTION METHODS ---
  async saveJobDescription(jobData) {
    const id = `jd_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const job = { _id: id, createdAt: new Date(), ...jobData };
    this.jobDescriptions.set(id, job);
    this.jobDescriptions.set(jobData.userId, job);
    return job;
  }

  async getJobDescriptionByUserId(userId) {
    return this.jobDescriptions.get(userId) || null;
  }

  // --- PREPARATION PLAN METHODS ---
  async getPreparationPlan(userId) {
    return this.preparationPlans.get(userId) || null;
  }

  async savePreparationPlan(userId, planData) {
    const id = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const plan = { _id: id, userId, updatedAt: new Date(), ...planData };
    this.preparationPlans.set(id, plan);
    this.preparationPlans.set(userId, plan);
    return plan;
  }

  async updateTaskStatus(userId, dayNumber, taskId, completed) {
    const plan = this.preparationPlans.get(userId);
    if (!plan) return null;
    const day = plan.days.find(d => d.dayNumber === Number(dayNumber));
    if (day) {
      const task = day.tasks.find(t => t.id === taskId);
      if (task) task.completed = completed;
      day.completed = day.tasks.every(t => t.completed);
    }
    plan.updatedAt = new Date();
    this.preparationPlans.set(userId, plan);
    return plan;
  }

  // --- QUESTIONS & BOOKMARKS ---
  getAllQuestions() {
    return seedQuestions;
  }

  getBookmarkedQuestionIds(userId) {
    return Array.from(this.bookmarkedQuestions);
  }

  toggleBookmark(userId, questionId) {
    if (this.bookmarkedQuestions.has(questionId)) {
      this.bookmarkedQuestions.delete(questionId);
      return { bookmarked: false };
    } else {
      this.bookmarkedQuestions.add(questionId);
      return { bookmarked: true };
    }
  }

  // --- CODING PROBLEMS & SUBMISSIONS ---
  getCodingProblems() {
    return codingProblems;
  }

  getCodingProblemById(id) {
    return codingProblems.find(p => p.id === id) || null;
  }

  saveCodingSubmission(submission) {
    const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const record = { _id: id, submittedAt: new Date(), ...submission };
    this.codingSubmissions.set(id, record);
    return record;
  }
}

export const db = new MemoryDbService();
