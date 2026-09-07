// Full E2E Automated Verification Test Suite
const BASE_URL = 'http://127.0.0.1:5050/api';

async function runTests() {
  console.log("🚀 Starting E2E API Verification for AI Interview Coach...\n");
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`⏳ Testing: ${name}... `);
      await fn();
      console.log("✅ PASSED");
      passed++;
    } catch (e) {
      console.log(`❌ FAILED: ${e.message}`);
      failed++;
    }
  }

  let token = "";
  let interviewId = "";

  // 1. Health
  await test("Backend Health Check", async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (data.status !== 'healthy') throw new Error("Health status not healthy");
  });

  // 2. Demo Login
  await test("Auth Demo Login (Alex Sharma)", async () => {
    const res = await fetch(`${BASE_URL}/auth/demo-login`, { method: 'POST' });
    const data = await res.json();
    if (!data.success || !data.token) throw new Error("Demo login failed");
    token = data.token;
  });

  const authHeaders = () => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  // 3. Dashboard
  await test("Dashboard Aggregated Data", async () => {
    const res = await fetch(`${BASE_URL}/progress/dashboard`, { headers: authHeaders() });
    const data = await res.json();
    if (!data.success || !data.dashboard.user.readinessScore) throw new Error("Dashboard data invalid");
  });

  // 4. Interview Setup
  await test("Interview Setup & First Adaptive Question", async () => {
    const res = await fetch(`${BASE_URL}/interviews/setup`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        role: "Full Stack Developer",
        interviewType: "Technical",
        difficulty: "Adaptive",
        personality: "Professional",
        durationMinutes: 20,
        totalQuestions: 5
      })
    });
    const data = await res.json();
    if (!data.success || !data.interview._id || data.interview.questions.length === 0) {
      throw new Error("Interview setup failed");
    }
    interviewId = data.interview._id;
  });

  // 5. Submit Answer & Evaluation
  await test("Submit Answer & AI Bar Raiser Evaluation", async () => {
    const res = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        questionIndex: 0,
        answer: "ArrayList is backed by an array with O(1) random access and excellent CPU cache locality. LinkedList is a doubly linked list with O(N) access and pointer memory overhead."
      })
    });
    const data = await res.json();
    if (!data.success || !data.evaluation?.score) throw new Error("Answer evaluation failed");
  });

  // 6. Next Question (Adaptive)
  await test("Fetch Adaptive Next Question / Follow-Up", async () => {
    const res = await fetch(`${BASE_URL}/interviews/${interviewId}/next-question`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (!data.success || !data.question?.questionText) throw new Error("Next question failed");
  });

  // 7. Complete Interview & Final Report
  await test("Complete Interview & Generate Interview Mirror", async () => {
    const res = await fetch(`${BASE_URL}/interviews/${interviewId}/complete`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (!data.success || !data.interview.overallEvaluation?.overallScore) {
      throw new Error("Complete interview report generation failed");
    }
  });

  // 8. Resume Upload & Project Questions
  await test("Resume Analysis & Deep Dive Question Generator", async () => {
    const res = await fetch(`${BASE_URL}/resume/upload`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        rawText: "Alex Sharma | Skills: React, Node.js, Java, SQL, Redis, Docker. Project: Real-time Analytics Dashboard."
      })
    });
    const data = await res.json();
    if (!data.success || !data.resume.generatedQuestions?.length) throw new Error("Resume parsing failed");
  });

  // 9. Job Description Matching & Gap Analysis
  await test("Job Description Match Score & Gap Matrix", async () => {
    const res = await fetch(`${BASE_URL}/jobs/analyze`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        jobText: "Looking for a Full Stack Engineer proficient in React, Node.js, SQL, and System Design.",
        company: "Stripe",
        role: "Full Stack Engineer"
      })
    });
    const data = await res.json();
    if (!data.success || !data.job.matchScore) throw new Error("Job matching failed");
  });

  // 10. Coding Test Runner & Evaluation
  await test("Coding Sandbox Execution & Complexity Review", async () => {
    const execRes = await fetch(`${BASE_URL}/coding/execute`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        problemId: "prob-01",
        language: "javascript",
        code: `function twoSum(nums, target) {
          const map = new Map();
          for (let i = 0; i < nums.length; i++) {
            const comp = target - nums[i];
            if (map.has(comp)) return [map.get(comp), i];
            map.set(nums[i], i);
          }
          return [];
        }`
      })
    });
    const execData = await execRes.json();
    if (!execData.success || execData.status !== 'passed') throw new Error("Code execution failed");

    const evalRes = await fetch(`${BASE_URL}/coding/evaluate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        problemId: "prob-01",
        language: "javascript",
        code: "function twoSum(nums, target) { ... }",
        testResults: execData.testResults
      })
    });
    const evalData = await evalRes.json();
    if (!evalData.success || !evalData.evaluation?.timeComplexity) throw new Error("Code evaluation failed");
  });

  // 11. Question Bank & Bookmarking
  await test("Question Bank Filtering & Bookmarking", async () => {
    const res = await fetch(`${BASE_URL}/questions?category=Technical&difficulty=Medium`, { headers: authHeaders() });
    const data = await res.json();
    if (!data.success || data.questions.length === 0) throw new Error("Question bank query failed");

    const bmRes = await fetch(`${BASE_URL}/questions/${data.questions[0].id}/bookmark`, {
      method: 'POST',
      headers: authHeaders()
    });
    const bmData = await bmRes.json();
    if (!bmData.success) throw new Error("Bookmark toggle failed");
  });

  // 12. Progress Analytics & 7-Day Plan
  await test("Progress Analytics & 7-Day Study Plan Generation", async () => {
    const res = await fetch(`${BASE_URL}/progress/analytics`, { headers: authHeaders() });
    const data = await res.json();
    if (!data.success || !data.timelineData.length) throw new Error("Progress analytics failed");

    const planRes = await fetch(`${BASE_URL}/progress/plan/generate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({})
    });
    const planData = await planRes.json();
    if (!planData.success || !planData.plan.days.length) throw new Error("Plan generation failed");
  });

  console.log(`\n========================================`);
  console.log(`🏁 E2E Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests();
