module.exports = async (req, res) => {
  // CORS 和請求處理邏輯
  // api/ai.js
module.exports = async (req, res) => {
  // 設置 CORS 頭部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 處理 OPTIONS 請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 只處理 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 請求' });
  }
  
  try {
    const { scores, summary, gender, questions } = req.body;
    
    console.log('收到請求:', { scores, summary, gender });
    
    if (!scores || !summary) {
      return res.status(400).json({
        success: false,
        error: '缺少必要的測驗資料'
      });
    }
    
    // 調用您的 AI 分析函數
    const analysis = await generateAIAnalysis({
      scores,
      summary, 
      gender,
      questions
    });
    
    console.log('分析完成:', analysis);
    
    res.json({
      success: true,
      analysis: analysis
    });
    
  } catch (error) {
    console.error('AI分析錯誤:', error);
    res.status(500).json({
      success: false,
      error: 'AI分析服務暫時不可用: ' + error.message
    });
  }
};

// 這裡是您原有的 generateAIAnalysis 函數
async function generateAIAnalysis(data) {
  const { scores, summary, gender } = data;
  const beastType = summary.top;
  
  // 這裡放置您真正的 AI 分析邏輯
  // 暫時返回測試數據
  return {
    personality: `這是${beastType}型人格的真實AI分析結果`,
    strengths: `您的${beastType}能量優勢分析`,
    career: `基於${beastType}特質的職場建議`,
    relationships: `${beastType}型的人際關係指導`,
    growth: `個人成長發展路徑`,
    money: `金錢卦象與財運分析`
  };
}
