// 在前端保持這個簡單的 API 呼叫
async function callExistingVercelAPI(userData) {
  const API_URL = '/api/ai';
  
  const requestData = {
    scores: userData.scores,
    summary: userData.summary,
    gender: userData.gender,
    questions: BANK
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const result = await response.json();
  return result.analysis;
}
