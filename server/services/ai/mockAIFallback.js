// Smart Contextual AI Reasoning Engine for Demo & Offline Resilience

export class MockAIEngine {
  // 1. DIVERSE QUESTION CATALOG
  static QUESTION_POOL = [
    // Java & Backend Systems
    {
      id: "pool-java-01",
      topic: "Java & Memory",
      level: 2,
      q: "Can you explain the difference between ArrayList and LinkedList in Java collections, and how CPU cache locality makes one vastly superior in real-world memory access?",
      concepts: ["Contiguous memory vs pointer overhead", "O(1) index access", "Cache line prefetching", "Amortized resizing"]
    },
    {
      id: "pool-java-02",
      topic: "Java & Concurrency",
      level: 3,
      q: "How does the Java Memory Model (JMM) handle the `volatile` keyword, and how does it prevent instruction reordering and guarantee visibility across CPU cores without full locking?",
      concepts: ["Memory barriers / Fences", "Instruction reordering prevention", "Cache coherence protocols", "Happens-before relationship"]
    },
    {
      id: "pool-java-03",
      topic: "OOP & Design Patterns",
      level: 1,
      q: "Explain the difference between compile-time polymorphism (overloading) and runtime polymorphism (overriding) with a clear real-world example.",
      concepts: ["Method overloading vs overriding", "Static binding vs dynamic dispatch", "vtable lookup", "Subclassing"]
    },

    // JavaScript & Frontend
    {
      id: "pool-js-01",
      topic: "JavaScript Runtime",
      level: 2,
      q: "How does the JavaScript event loop prioritize the Microtask queue over the Macrotask queue? Walk me through what happens when a Promise, setTimeout, and synchronous code execute together.",
      concepts: ["Call stack execution", "Microtask queue drain", "Macrotask queue (Timer/IO)", "Render lifecycle"]
    },
    {
      id: "pool-js-02",
      topic: "JavaScript Closures & Memory",
      level: 2,
      q: "What is a closure in JavaScript, and what are common scenarios where improper closure retention causes memory leaks in Single Page Applications?",
      concepts: ["Lexical scope binding", "Retained references in heap", "Detached DOM elements", "Event listeners cleanup"]
    },
    {
      id: "pool-react-01",
      topic: "React Architecture",
      level: 3,
      q: "In a React application with high-frequency state updates, how does the Fiber reconciliation algorithm work, and what are the exact performance trade-offs of useMemo and useCallback?",
      concepts: ["Fiber tree work loop", "Virtual DOM diffing", "Referential equality overhead", "Component composition vs memoization"]
    },
    {
      id: "pool-react-02",
      topic: "React State Management",
      level: 2,
      q: "When would you choose React Context API versus an external state management library like Redux or Zustand for enterprise application state?",
      concepts: ["Context re-render cascading", "Selective component subscriptions", "State colocation", "Middleware & Devtools"]
    },

    // Databases & SQL
    {
      id: "pool-db-01",
      topic: "DBMS & Indexing",
      level: 3,
      q: "Explain how B-Tree indexes work in relational databases like PostgreSQL/MySQL. Why might a query with `WHERE age > 25 AND city = 'NY'` fail to use a composite index on `(age, city)` efficiently?",
      concepts: ["B-Tree balanced pages", "Leftmost prefix rule", "Range predicate halting composite seek", "Index scan vs Seek"]
    },
    {
      id: "pool-db-02",
      topic: "DBMS & Concurrency",
      level: 2,
      q: "What is the difference between Optimistic Concurrency Control (OCC) and Pessimistic Locking (SELECT FOR UPDATE) in database transactions, and when would you use each?",
      concepts: ["Row-level locking", "Version column / Timestamp checking", "Deadlock risk", "High vs low contention workloads"]
    },
    {
      id: "pool-db-03",
      topic: "SQL & Normalization",
      level: 1,
      q: "What is the primary purpose of database normalization, and in what production scenarios would you deliberately choose to denormalize tables?",
      concepts: ["1NF, 2NF, 3NF", "Eliminating data anomalies", "Read performance optimization", "Write complexity trade-offs"]
    },

    // System Design & Architecture
    {
      id: "pool-sys-01",
      topic: "System Design & Caching",
      level: 3,
      q: "How would you design a distributed caching layer using Redis that prevents Cache Avalanche, Cache Stampede (Thundering Herd), and Cache Penetration under 100,000 requests/sec?",
      concepts: ["Jittered TTL expirations", "Mutex locks on cache miss", "Bloom filters for nonexistent keys", "Cache-aside vs Write-through"]
    },
    {
      id: "pool-sys-02",
      topic: "System Design & API Reliability",
      level: 2,
      q: "How do you achieve idempotency in distributed REST APIs, especially for critical operations like payment checkout or order creation across multiple microservices?",
      concepts: ["Unique Idempotency Keys in headers", "Atomic database state checks", "Distributed locks (Redis SETNX)", "Handling retries cleanly"]
    },
    {
      id: "pool-sys-03",
      topic: "Distributed Systems & Microservices",
      level: 3,
      q: "Compare the 2-Phase Commit (2PC) protocol with the Saga pattern (Orchestration vs Choreography) for maintaining consistency across microservices.",
      concepts: ["2PC blocking coordinator bottleneck", "Compensating transactions in Saga", "Eventual consistency", "Outbox pattern with Kafka"]
    },

    // Data Structures & Algorithms
    {
      id: "pool-dsa-01",
      topic: "Algorithms & Search",
      level: 2,
      q: "Compare Breadth-First Search (BFS) and Depth-First Search (DFS). When is BFS strictly preferred for finding the shortest path, and what are their respective memory complexities?",
      concepts: ["Queue vs Recursion stack", "Shortest path in unweighted graphs", "O(V + E) runtime", "Memory proportional to maximum breadth"]
    },
    {
      id: "pool-dsa-02",
      topic: "Data Structures & Hashing",
      level: 2,
      q: "How does a Hash Table resolve hash collisions using Separate Chaining versus Open Addressing, and what is treeification in Java 8 HashMap?",
      concepts: ["Hash function distribution", "Linked list to Red-Black tree conversion after threshold", "Linear probing vs chaining", "Load factor and resizing"]
    },

    // Behavioral & Leadership (STAR)
    {
      id: "pool-star-01",
      topic: "Behavioral & Prioritization",
      level: 2,
      q: "Tell me about a time when you were facing multiple high-priority deadlines with conflicting technical priorities. How did you decide what to sacrifice, and how did you communicate that to stakeholders?",
      concepts: ["Situation & Task context", "Prioritization framework (impact vs effort)", "Proactive stakeholder communication", "Measurable project result"]
    },
    {
      id: "pool-star-02",
      topic: "Behavioral & Conflict",
      level: 2,
      q: "Describe a situation where you had a strong technical disagreement with a senior teammate or tech lead. How did you present your case and navigate the disagreement constructively?",
      concepts: ["Data/benchmark-driven argument", "Respectful 1-on-1 dialogue", "Constructive compromise", "Team alignment without ego"]
    },
    {
      id: "pool-star-03",
      topic: "Behavioral & Production Outages",
      level: 2,
      q: "Walk me through the most severe production incident or bug you were responsible for. How did you triage the outage under pressure, and what permanent systemic safeguards did you introduce?",
      concepts: ["Immediate incident mitigation & rollback", "Blameless post-mortem analysis", "Root cause determination", "Automated regression tests / alerting"]
    },
    {
      id: "pool-star-04",
      topic: "Behavioral & Leadership",
      level: 1,
      q: "Why are you interested in this specific role at this stage of your career, and what is a technical accomplishment you are most proud of?",
      concepts: ["Clear career trajectory", "Technical problem ownership", "Direct business impact", "Cultural fit"]
    }
  ];

  // 1. ADAPTIVE QUESTION GENERATOR (NON-REPETITIVE & CONTEXTUAL)
  static generateQuestion({
    role,
    interviewType,
    difficultyLevel = 2,
    personality = "Professional",
    previousQuestions = [],
    previousAnswers = [],
    jobData = null
  }) {
    const qCount = previousQuestions.length + 1;
    const prevTexts = previousQuestions.map(q => (q.questionText || q.question || '').toLowerCase());

    // Personality tone prefixes
    let prefix = "";
    if (personality === "Strict" || personality === "Stress Interviewer") {
      prefix = "Let's be direct. ";
    } else if (personality === "Friendly") {
      prefix = "Good! Moving to the next question: ";
    } else if (personality === "Technical Expert") {
      prefix = "Looking at technical system trade-offs: ";
    }

    // B. Job-Specific Interview
    if (interviewType === "Job-Specific" && jobData) {
      const required = jobData.requiredSkills || ["System Design", "SQL", "React", "Node.js"];
      const unusedSkills = required.filter(s => !prevTexts.some(pt => pt.includes(s.toLowerCase())));
      const targetSkill = unusedSkills[0] || required[(qCount - 1) % required.length];
      return {
        questionText: `${prefix}This role requires strong hands-on proficiency with ${targetSkill}. Can you describe a real-world scenario where you used ${targetSkill} to optimize performance or solve a production bottleneck?`,
        topic: targetSkill,
        difficultyLevel: difficultyLevel || 2,
        isFollowUp: false,
        expectedConcepts: [`Production experience with ${targetSkill}`, "Best practices", "Trade-offs", "Edge case handling"]
      };
    }

    // C. Behavioral / HR (STAR Framework)
    if (interviewType === "Behavioral" || interviewType === "HR") {
      const starPool = this.QUESTION_POOL.filter(item => item.topic.startsWith("Behavioral"));
      const available = starPool.filter(item => !prevTexts.some(pt => pt.includes(item.q.slice(0, 30).toLowerCase())));
      const picked = available[0] || starPool[(qCount - 1) % starPool.length];
      return {
        questionText: `${prefix}${picked.q}`,
        topic: picked.topic,
        difficultyLevel: picked.level,
        isFollowUp: false,
        expectedConcepts: picked.concepts
      };
    }

    // D. Technical & Adaptive Default: Filter out previously asked questions
    const targetLevel = Math.min(3, Math.max(1, difficultyLevel || 2));
    
    // Find questions matching difficulty level that HAVEN'T been asked yet
    let availableQuestions = this.QUESTION_POOL.filter(item => {
      if (item.topic.startsWith("Behavioral")) return false;
      const isAlreadyAsked = prevTexts.some(pt => pt.includes(item.q.slice(0, 35).toLowerCase()));
      return !isAlreadyAsked;
    });

    // Try to match target difficulty, or fall back to any available question
    let matchingLevel = availableQuestions.filter(item => item.level === targetLevel);
    if (matchingLevel.length === 0) {
      matchingLevel = availableQuestions;
    }

    // If all questions exhausted, fall back to random pick from pool
    if (matchingLevel.length === 0) {
      matchingLevel = this.QUESTION_POOL.filter(item => !item.topic.startsWith("Behavioral"));
    }

    // Randomize selection so each interview is unique
    const randomIndex = Math.floor(Math.random() * matchingLevel.length);
    const picked = matchingLevel[randomIndex];

    return {
      questionText: `${prefix}${picked.q}`,
      topic: picked.topic,
      difficultyLevel: picked.level,
      isFollowUp: false,
      expectedConcepts: picked.concepts
    };
  }

  // 2. DYNAMIC & ACCURATE ANSWER EVALUATION
  static evaluateAnswer({
    questionText = "",
    candidateAnswer = "",
    topic = "Technical",
    difficultyLevel = 2,
    personality = "Professional",
    interviewType = "Technical"
  }) {
    const rawAnswer = (candidateAnswer || "").trim();
    const lower = rawAnswer.toLowerCase();
    const wordCount = rawAnswer.split(/\s+/).filter(Boolean).length;

    // A. DETECT "I DON'T KNOW" / PASS / BLANK / EVASIVE ANSWERS
    const dontKnowPhrases = [
      "i don't know", "i dont know", "don't know", "dont know", "no idea", "have no idea",
      "not sure", "i am not sure", "i'm not sure", "no clue", "haven't worked with",
      "haven't used", "pass", "skip", "can you skip", "next question", "i do not know",
      "i forget", "forgot", "can't remember", "cannot remember", "idk"
    ];

    const isExplicitDontKnow = dontKnowPhrases.some(phrase => {
      return lower === phrase || lower.startsWith(phrase) || lower.includes(` ${phrase} `) || (lower.includes(phrase) && wordCount < 12);
    });

    if (rawAnswer.length === 0 || isExplicitDontKnow || (wordCount < 4 && !lower.includes('array') && !lower.includes('dom'))) {
      return {
        score: 2,
        technicalKnowledge: 1,
        clarity: 6,
        relevance: 1,
        depth: 1,
        strengths: [
          "Honesty and directness in acknowledging knowledge boundaries instead of guessing or hallucinating"
        ],
        improvements: [
          "Review core technical fundamentals and architecture for this topic before the real interview",
          "If unsure, explain your problem-solving intuition or relate it to a similar technology you know"
        ],
        betterAnswer: `For questions on "${topic}", start by stating the core definition and primary use-case in one sentence, then outline the underlying mechanics, and conclude with the trade-offs.`,
        interviewerPerspective: "The candidate was honest about not knowing this concept. In a real interview, passing gracefully is better than bluffing, but this marks a distinct knowledge gap that needs preparation.",
        mistakeExplanation: {
          missing: ["Fundamental understanding of the concept", "Core architecture & execution flow"],
          incorrect: ["No technical substance provided"],
          whyItMatters: "This is a standard technical interview concept for software engineering roles.",
          howToImprove: `Study "${topic}" fundamentals. Practice explaining the 'What', 'How it works internally', and 'When to use it' in 2 minutes.`
        },
        starAnalysis: null,
        difficultyAdjustment: "decrease",
        suggestedFollowUp: "That's okay. Let's pivot to a foundational concept: Can you explain how you structure database tables and when to use indexes?"
      };
    }

    // B. SUBSTANTIVE TECHNICAL EVALUATION
    let baseScore = 6;
    let technical = 6;
    let clarity = 7;
    let relevance = 7;
    let depth = 6;
    let strengths = [];
    let improvements = [];
    let difficultyAdjustment = "maintain";

    // Check depth & keywords
    const keywordsFound = [];
    const technicalTerms = [
      "o(1)", "o(n)", "o(log n)", "memory", "cache", "cpu", "index", "pointer", "contiguous",
      "latency", "throughput", "concurrency", "thread", "virtual dom", "reconciliation",
      "b-tree", "redis", "lock", "async", "promise", "event loop", "microtask", "macrotask",
      "stack", "heap", "closure", "idempotent", "saga", "2pc", "load balancer", "sharding"
    ];

    technicalTerms.forEach(term => {
      if (lower.includes(term)) keywordsFound.push(term);
    });

    if (keywordsFound.length >= 4 && wordCount >= 30) {
      baseScore = 9;
      technical = 9;
      depth = 9;
      clarity = 9;
      relevance = 9;
      strengths.push(
        "Strong technical depth with precise architectural terminology",
        `Accurately addressed key technical concepts: ${keywordsFound.slice(0, 3).join(', ')}`,
        "Well-structured explanation with clear logical progression"
      );
      improvements.push(
        "Consider highlighting specific failure modes or real-world production metrics from your projects"
      );
      difficultyAdjustment = "increase";
    } else if (keywordsFound.length >= 2 || wordCount >= 25) {
      baseScore = 7;
      technical = 7;
      depth = 7;
      clarity = 8;
      relevance = 8;
      strengths.push(
        "Good foundational explanation covering the main concept",
        "Clear communication and accurate general definitions"
      );
      improvements.push(
        "Elaborate on low-level memory/CPU execution and trade-offs",
        "Give a concrete production scenario where this made a measurable difference"
      );
      difficultyAdjustment = "maintain";
    } else if (wordCount < 15) {
      baseScore = 4;
      technical = 4;
      depth = 3;
      clarity = 5;
      relevance = 5;
      strengths.push("Direct response attempt");
      improvements.push(
        "Answer is too superficial. A senior panel expects detailed mechanics and trade-offs rather than a brief definition."
      );
      difficultyAdjustment = "decrease";
    } else {
      baseScore = 6;
      technical = 5;
      depth = 5;
      clarity = 6;
      relevance = 6;
      strengths.push("General concept understood");
      improvements.push(
        "Deepen technical precision with specific complexity analysis and architectural trade-offs."
      );
      difficultyAdjustment = "maintain";
    }

    // Personality styling for interviewer perspective
    let perspective = "";
    if (personality === "Strict" || personality === "Stress Interviewer") {
      perspective = baseScore >= 8
        ? "Good solid response. In a Bar Raiser round, I will now test your knowledge on distributed edge cases and heavy memory contention."
        : "The answer touched the surface. You must demonstrate deeper architectural mastery to pass a Staff-level committee.";
    } else if (personality === "Friendly") {
      perspective = baseScore >= 8
        ? "Great articulate breakdown! You demonstrated strong mastery of the underlying engineering concepts."
        : "Nice start! Elaborating a bit more on memory and real-world trade-offs will make your answer stand out.";
    } else {
      perspective = baseScore >= 8
        ? "Excellent structured explanation with good technical depth. Top percentile delivery."
        : "Solid foundational explanation. Focus on elaborating internal runtime mechanisms to elevate this to an 'Exceeds Bar' rating.";
    }

    // Adaptive follow-up probe
    let followUp = "";
    if (baseScore >= 8) {
      followUp = `Great explanation. Let's push further: What happens in worst-case thread contention or network partition, and how would you prevent cascading failures?`;
    } else {
      followUp = `Good start. Can you walk me through the internal memory layout or trade-offs of this approach using a concrete scenario from your experience?`;
    }

    // STAR Analysis for Behavioral rounds
    const isBehavioral = interviewType === "Behavioral" || interviewType === "HR";
    const starAnalysis = isBehavioral ? {
      situation: wordCount > 25 ? "Clear context provided regarding the project challenge." : "Context was somewhat generic; specify team size and constraints.",
      task: "Defined individual responsibility.",
      action: wordCount > 40 ? "Strong detailing of personal engineering decisions taken." : "Focus more on the exact actions YOU personally drove versus the team.",
      result: "Mentioned outcome. Quantify impact with percentage metrics (e.g. reduced latency by 35%) for maximum punch.",
      feedback: "Followed STAR structure well. Always conclude with key takeaways and business impact."
    } : null;

    return {
      score: baseScore,
      technicalKnowledge: technical,
      clarity,
      relevance,
      depth,
      strengths,
      improvements,
      betterAnswer: `A senior engineer would structure this answer by: 1) Defining the core concept in 1 sentence, 2) Breaking down the internal memory/runtime mechanics, 3) Comparing trade-offs with alternatives, and 4) Sharing a production lesson learned.`,
      interviewerPerspective: perspective,
      mistakeExplanation: {
        missing: baseScore >= 8 ? ["Minor production edge case nuances"] : ["Low-level memory/runtime mechanics", "Explicit time/space complexity analysis"],
        incorrect: [],
        whyItMatters: "Interviewers evaluate candidates on whether they understand underlying architectural trade-offs rather than memorized textbook definitions.",
        howToImprove: "Lead with the direct answer, explain the internal execution flow, and illustrate with a trade-off example."
      },
      starAnalysis,
      difficultyAdjustment,
      suggestedFollowUp: followUp
    };
  }

  // 3. OVERALL EVALUATION REPORT
  static generateOverallEvaluation(questions = []) {
    if (questions.length === 0) {
      return {
        overallScore: 75,
        technicalScore: 78,
        communicationScore: 74,
        problemSolvingScore: 76,
        clarityScore: 77,
        answerStructureScore: 72,
        topStrengths: ["Foundational Technical Knowledge", "Clear Articulation"],
        topWeaknesses: ["Edge Case Thoroughness", "Time Complexity Explanations"],
        interviewMirror: {
          technicalImpression: "Competent software engineer with solid fundamentals.",
          communicationImpression: "Articulate and pleasant to converse with.",
          problemSolvingImpression: "Approaches questions methodically.",
          overallImpression: "Positive interview performance with strong upside potential."
        },
        recommendedActionPlan: ["Practice System Design drills", "Deep-dive into database indexing"]
      };
    }

    let totalScore = 0;
    let totalTech = 0;
    let totalClarity = 0;
    let totalRel = 0;
    let totalDepth = 0;

    questions.forEach(q => {
      const ev = q.evaluation || {};
      totalScore += ev.score || 7;
      totalTech += ev.technicalKnowledge || 7;
      totalClarity += ev.clarity || 7;
      totalRel += ev.relevance || 8;
      totalDepth += ev.depth || 7;
    });

    const count = questions.length;
    const avgScore = Math.round((totalScore / count) * 10);
    const avgTech = Math.round((totalTech / count) * 10);
    const avgClarity = Math.round((totalClarity / count) * 10);
    const avgRel = Math.round((totalRel / count) * 10);
    const avgDepth = Math.round((totalDepth / count) * 10);

    return {
      overallScore: avgScore,
      technicalScore: avgTech,
      communicationScore: avgClarity,
      problemSolvingScore: avgDepth,
      clarityScore: avgClarity,
      answerStructureScore: avgRel,
      topStrengths: ["Foundational knowledge", "Structured problem explanation", "Good communication pace"],
      topWeaknesses: ["Quantifying business metrics in STAR stories", "Deep dive into OS memory cache locality"],
      interviewMirror: {
        technicalImpression: avgTech >= 80 ? "High technical capability with strong architectural instincts." : "Solid fundamentals with opportunity for deeper system internals mastery.",
        communicationImpression: avgClarity >= 80 ? "Confident, articulate, and structured communicator." : "Good clarity; can be more concise in initial summaries.",
        problemSolvingImpression: avgDepth >= 80 ? "Thorough, handles trade-offs and complexity proactively." : "Solves main path well; needs to consider edge cases and failure modes.",
        overallImpression: avgScore >= 80 ? "Strong recommendation for hiring. Clear technical and cultural fit." : "Promising candidate; recommended for targeted practice before final rounds."
      },
      recommendedActionPlan: [
        "Complete 3 System Design high-throughput architecture drills",
        "Practice 5 SQL optimization and index range queries",
        "Refine behavioral stories with quantified business impact metrics"
      ]
    };
  }
}
