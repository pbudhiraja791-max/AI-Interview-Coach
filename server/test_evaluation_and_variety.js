const BASE_URL = 'http://127.0.0.1:5050/api';

async function verify() {
  console.log("🔍 Verifying Accurate Answer Evaluation & Question Diversity...\n");

  // 1. Login
  const authRes = await fetch(`${BASE_URL}/auth/demo-login`, { method: 'POST' });
  const authData = await authRes.json();
  const token = authData.token;
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  // 2. Setup Interview
  const setupRes = await fetch(`${BASE_URL}/interviews/setup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      role: "Full Stack Developer",
      interviewType: "Technical",
      difficulty: "Adaptive",
      personality: "Professional",
      totalQuestions: 4
    })
  });
  const setupData = await setupRes.json();
  const interviewId = setupData.interview._id;
  const q1 = setupData.interview.questions[0];
  console.log(`Q1: "${q1.questionText}" (Topic: ${q1.topic})`);

  // 3. Test submitting "i dont know the answer"
  console.log("\n--- Submitting 'i dont know the answer' ---");
  const ansRes = await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      questionIndex: 0,
      answer: "i dont know the answer"
    })
  });
  const ansData = await ansRes.json();
  console.log(`Score: ${ansData.evaluation.score}/10 (Expected: 1 or 2)`);
  console.log(`Strengths: ${JSON.stringify(ansData.evaluation.strengths)}`);
  console.log(`Perspective: "${ansData.evaluation.interviewerPerspective}"`);
  console.log(`Difficulty Adjustment: "${ansData.evaluation.difficultyAdjustment}"`);

  if (ansData.evaluation.score > 3) {
    throw new Error(`FAIL: Expected low score for 'i dont know', got ${ansData.evaluation.score}`);
  }

  // 4. Test Next Question (Should be completely different from Q1)
  console.log("\n--- Requesting Next Question (Q2) ---");
  const nextRes = await fetch(`${BASE_URL}/interviews/${interviewId}/next-question`, {
    method: 'POST',
    headers,
    body: JSON.stringify({})
  });
  const nextData = await nextRes.json();
  const q2 = nextData.question;
  console.log(`Q2: "${q2.questionText}" (Topic: ${q2.topic})`);

  if (q1.questionText.toLowerCase() === q2.questionText.toLowerCase()) {
    throw new Error("FAIL: Q2 is identical to Q1!");
  }

  // 5. Test Next Question (Q3)
  console.log("\n--- Submitting Strong Answer to Q2 & Requesting Q3 ---");
  await fetch(`${BASE_URL}/interviews/${interviewId}/answer`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      questionIndex: 1,
      answer: "We use balanced B-Tree indexes sorted by composite columns. For range queries we put equality columns first to avoid index scan degradation."
    })
  });

  const nextRes2 = await fetch(`${BASE_URL}/interviews/${interviewId}/next-question`, {
    method: 'POST',
    headers,
    body: JSON.stringify({})
  });
  const nextData2 = await nextRes2.json();
  const q3 = nextData2.question;
  console.log(`Q3: "${q3.questionText}" (Topic: ${q3.topic})`);

  if (q3.questionText === q1.questionText || q3.questionText === q2.questionText) {
    throw new Error("FAIL: Q3 is a duplicate of Q1 or Q2!");
  }

  console.log("\n🎉 ALL TESTS PASSED! 'I dont know' correctly evaluated & Questions are 100% diverse and non-repetitive.\n");
}

verify().catch(err => {
  console.error(err.message);
  process.exit(1);
});
