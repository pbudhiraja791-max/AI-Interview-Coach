export const seedQuestions = [
  // TECHNICAL - Core Java & OOP
  {
    id: "tech-java-01",
    role: "Software Engineer",
    topic: "Java",
    subtopic: "Collections",
    category: "Technical",
    difficulty: "Medium",
    difficultyLevel: 2,
    question: "You mentioned Java in your profile. Can you explain the difference between ArrayList and LinkedList and tell me when you would choose one over the other in a production application?",
    expectedConcepts: [
      "Dynamic array vs Doubly linked list backing structure",
      "O(1) random access vs O(N) traversal",
      "O(1) amortized insertion at end vs O(1) node pointer manipulation",
      "Memory overhead with Node objects vs contiguous array blocks"
    ],
    sampleAnswer: "ArrayList is backed by a dynamic resizing array, providing O(1) constant time random access by index via direct memory offset calculations. LinkedList is a doubly-linked list where each node contains pointers to previous and next elements, leading to O(n) element access. In production, ArrayList is preferred 95% of the time due to CPU cache locality and lower memory footprint. LinkedList is only advantageous if you have frequent insertions/deletions at the head/middle and already hold a reference to that iterator.",
    followUps: [
      "What is the time complexity and internal resizing mechanism of ArrayList when capacity is exceeded?",
      "How does CPU cache locality affect ArrayList performance compared to LinkedList?",
      "How would you make an ArrayList thread-safe in a multi-threaded web server?"
    ]
  },
  {
    id: "tech-java-02",
    role: "Software Engineer",
    topic: "OOP",
    subtopic: "Polymorphism",
    category: "Technical",
    difficulty: "Easy",
    difficultyLevel: 1,
    question: "Can you explain the difference between compile-time polymorphism and runtime polymorphism with a clear real-world example?",
    expectedConcepts: [
      "Method Overloading vs Method Overriding",
      "Static binding vs Dynamic dispatch (vtable)",
      "Inheritance and interfaces"
    ],
    sampleAnswer: "Compile-time polymorphism (Static Binding) is achieved via method overloading, where methods in the same class share the same name but differ in signature (e.g., calculateArea(int r) vs calculateArea(int l, int w)). The compiler resolves the target method at compile time. Runtime polymorphism (Dynamic Binding) is achieved via method overriding, where a subclass provides a specific implementation of a parent/interface method (e.g., PaymentMethod.pay() overridden by CreditCardPayment and UpiPayment). The JVM resolves the actual implementation at runtime via dynamic method dispatch using the virtual method table (vtable).",
    followUps: [
      "How does the JVM internally implement dynamic method dispatch?",
      "Can private, static, or final methods be overridden? Why or why not?"
    ]
  },
  {
    id: "tech-js-01",
    role: "Frontend Developer",
    topic: "JavaScript",
    subtopic: "Event Loop",
    category: "Technical",
    difficulty: "Medium",
    difficultyLevel: 2,
    question: "How does the JavaScript event loop handle Microtasks versus Macrotasks? Walk me through what happens when a Promise, setTimeout, and synchronous code execute together.",
    expectedConcepts: [
      "Call stack execution",
      "Microtask queue (Promises, queueMicrotask, MutationObserver)",
      "Macrotask queue (setTimeout, setInterval, I/O)",
      "Microtask queue drain after every call stack frame / before next macrotask"
    ],
    sampleAnswer: "JavaScript is single-threaded. Synchronous code runs immediately on the Call Stack. When asynchronous tasks are initiated, their callbacks are delegated to web APIs and queued upon completion. Microtasks (Promise.then, queueMicrotask) have higher priority than Macrotasks (setTimeout, setInterval, setImmediate). Once the Call Stack is empty, the Event Loop executes and completely drains the entire Microtask queue (including any microtasks queued during that drain) before pulling the next single task from the Macrotask queue and triggering a browser render.",
    followUps: [
      "What happens if a microtask recursively enqueues another microtask?",
      "How does requestAnimationFrame fit into this rendering and event loop lifecycle?"
    ]
  },
  {
    id: "tech-react-01",
    role: "Frontend Developer",
    topic: "React",
    subtopic: "Performance & Hooks",
    category: "Technical",
    difficulty: "Hard",
    difficultyLevel: 3,
    question: "In a React application with high-frequency updates, how do you prevent unnecessary re-renders, and what are the exact trade-offs of useMemo and useCallback?",
    expectedConcepts: [
      "Virtual DOM reconciliation",
      "Referential equality of props",
      "React.memo, useMemo, useCallback overhead vs benefit",
      "State colocation and component composition patterns"
    ],
    sampleAnswer: "Re-renders in React happen when state or props change. To prevent unnecessary child re-renders, wrap pure components in React.memo combined with useCallback to maintain stable function references and useMemo for expensive derived calculations. However, useMemo/useCallback have a memory and computation overhead because React must allocate closure dependencies and compare array references on every render. If the computation is trivial (e.g., basic filtering of 10 items), useMemo adds more overhead than it saves. Prefer component composition (pushing state down or lifting JSX up as children) before reaching for memoization.",
    followUps: [
      "How does React 18 Concurrent Mode (useTransition, useDeferredValue) change how we handle heavy render loads?",
      "How does the React Compiler (React Forget) automate this memoization?"
    ]
  },
  {
    id: "tech-backend-01",
    role: "Backend Developer",
    topic: "DBMS & SQL",
    subtopic: "Indexing & Performance",
    category: "Technical",
    difficulty: "Hard",
    difficultyLevel: 3,
    question: "Explain how B-Tree indexes work in relational databases like PostgreSQL/MySQL. Why might a query with `SELECT * WHERE age > 25 AND city = 'NY'` fail to use a composite index on `(age, city)` efficiently?",
    expectedConcepts: [
      "B-Tree / B+Tree structure (root, internal branch, leaf nodes)",
      "Composite index column ordering (Leftmost prefix rule)",
      "Range predicate stopping multi-column index scan efficiency",
      "Index scan vs Index seek"
    ],
    sampleAnswer: "B-Trees organize keys in sorted order across balanced tree pages. In a composite index on (age, city), data is sorted primarily by `age`, and only secondarily by `city` within matching `age` values. When a range condition like `age > 25` is evaluated, the database engine can seek to age=25, but because all rows after 25 have varying ages, the secondary ordering on `city` cannot be leveraged for direct seeks. To optimize this, the index should be ordered as `(city, age)`—equality columns first, range columns last.",
    followUps: [
      "What is a covering index and how does index-only scan avoid heap lookups?",
      "How do clustered indexes differ between InnoDB and PostgreSQL heap tables?"
    ]
  },
  {
    id: "tech-sysdesign-01",
    role: "Full Stack Developer",
    topic: "System Design",
    subtopic: "Scalability & Caching",
    category: "Technical",
    difficulty: "Hard",
    difficultyLevel: 3,
    question: "Design a high-throughput URL shortening service (like Bitly) handling 100M new URLs/month and 10B reads/month. How do you handle ID generation, collisions, and caching?",
    expectedConcepts: [
      "Base62 encoding of 64-bit integer IDs (Snowflake or DB auto-increment range)",
      "Read-heavy caching strategy (Redis LRU cache with 80/20 rule)",
      "Database selection (NoSQL key-value / relational with partitioning)",
      "Handling race conditions and distributed counters"
    ],
    sampleAnswer: "With 10B reads vs 100M writes (100:1 read-to-write ratio), caching is critical. For unique ID generation, we use a distributed ID generator (like Twitter Snowflake or pre-allocated range coordination in Zookeeper) to get a 64-bit counter, then encode it to Base62 (A-Z, a-z, 0-9) yielding 6-7 character hashes without collisions. We store mappings in Cassandra or DynamoDB with `short_key` as primary partition key. Redis clusters with LRU eviction cache top 20% URLs serving 80% traffic with sub-millisecond latency. Rate limiters and CDN edge caches sit in front.",
    followUps: [
      "How do you handle custom alias collisions gracefully?",
      "How do you purge expired links without causing read spikes or locking tables?"
    ]
  },

  // BEHAVIORAL & HR (STAR FRAMEWORK)
  {
    id: "hr-star-01",
    role: "All",
    topic: "Behavioral",
    subtopic: "Conflict Resolution",
    category: "Behavioral",
    difficulty: "Medium",
    difficultyLevel: 2,
    question: "Tell me about a time when you strongly disagreed with a senior engineer or product manager on a technical or product decision. How did you handle it and what was the outcome?",
    expectedConcepts: [
      "Situation: Clear context and technical disagreement",
      "Task: Your responsibility and objective",
      "Action: Objective data/benchmarks, respectful communication, constructive compromise",
      "Result: Positive project outcome, learnings, and team alignment"
    ],
    sampleAnswer: "At my previous role, our lead wanted to rewrite our core microservice in a new framework two weeks before launch. I was concerned about stability and missing deadline SLAs. I scheduled a 1-on-1, presented benchmark data comparing latency under load, and showed a risk matrix illustrating how the current codebase fulfilled all SLA requirements. I proposed a phased migration for the following quarter instead. We agreed on this plan, shipped on time with 99.99% uptime, and successfully migrated cleanly in Q2 with dedicated test coverage.",
    followUps: [
      "What would you have done if they insisted on proceeding despite your data?",
      "What did you learn about cross-functional communication from that experience?"
    ]
  },
  {
    id: "hr-star-02",
    role: "All",
    topic: "Behavioral",
    subtopic: "Handling Failure",
    category: "Behavioral",
    difficulty: "Medium",
    difficultyLevel: 2,
    question: "Can you describe a situation where a project you were working on failed or an unexpected critical production bug slipped through your testing? What did you do?",
    expectedConcepts: [
      "Ownership & accountability (no blaming others)",
      "Immediate mitigation & incident response",
      "Blameless post-mortem",
      "Permanent architectural/process fixes implemented"
    ],
    sampleAnswer: "During a major release, an unhandled null pointer exception in our payment webhook handler caused 5% of order confirmations to fail. As soon as PagerDuty alerted, I owned the incident, rolled back the deployment within 8 minutes, and verified transactions were reconciled via manual audit scripts. Afterward, I authored a blameless post-mortem, identified that our staging mock wasn't sending optional customer payload fields, and implemented comprehensive schema validation and end-to-end integration tests that run on every pull request.",
    followUps: [
      "How do you communicate with non-technical stakeholders during an active outage?",
      "How do you balance rapid feature delivery with robust test coverage?"
    ]
  },
  {
    id: "hr-general-01",
    role: "All",
    topic: "HR",
    subtopic: "Introduction",
    category: "HR",
    difficulty: "Easy",
    difficultyLevel: 1,
    question: "Walk me through your background and what motivated you to pursue this specific engineering role.",
    expectedConcepts: [
      "Concise professional summary (past, present, future)",
      "Key technical highlights and domain passion",
      "Clear alignment with the company and role mission"
    ],
    sampleAnswer: "I am a full-stack engineer with strong background in building scalable web applications and distributed systems using React, Node.js, and cloud infrastructure. Most recently, I led development of high-concurrency microservices and real-time dashboard systems. I am excited about this role because your team tackles challenging scaling problems at the intersection of AI and user productivity, where my strengths in performance optimization and product-focused engineering can create immediate impact.",
    followUps: [
      "Where do you see your technical trajectory evolving over the next 2 to 3 years?",
      "What types of engineering cultures do you thrive in best?"
    ]
  }
];
