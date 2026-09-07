const BASE_URL = 'http://127.0.0.1:5050/api';

async function testCodingProblems() {
  console.log("🚀 Testing 50 Coding Practice Problems API & Sandbox...\n");

  // 1. Login
  const authRes = await fetch(`${BASE_URL}/auth/demo-login`, { method: 'POST' });
  const { token } = await authRes.json();
  const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

  // 2. Fetch all problems
  const probsRes = await fetch(`${BASE_URL}/coding/problems`, { headers });
  const { problems } = await probsRes.json();
  console.log(`Total Problems Loaded: ${problems.length} (Expected: 50)`);

  if (problems.length < 50) {
    throw new Error(`Expected at least 50 problems, got ${problems.length}`);
  }

  // 3. Test running code for each problem
  let passedCount = 0;
  for (const prob of problems) {
    const execRes = await fetch(`${BASE_URL}/coding/execute`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        problemId: prob.id,
        language: 'javascript',
        code: prob.starterCode.javascript
      })
    });
    const execData = await execRes.json();

    if (!execData.success || execData.status !== 'passed') {
      console.error(`❌ FAILED for Problem [${prob.id}] "${prob.title}":`, execData.testResults);
      throw new Error(`Execution failed for ${prob.title}`);
    }
    passedCount++;
  }

  console.log(`\n🎉 ALL ${passedCount} / ${problems.length} CODING PROBLEMS EXECUTED AND PASSED SUCCESSFULLY!\n`);
}

testCodingProblems().catch(err => {
  console.error("Test error:", err.message);
  process.exit(1);
});
