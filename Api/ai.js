// api/ai.js
module.exports = async (req, res) => {
  // CORS 設置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 請求' });
  }
  
  try {
    const { scores, summary, gender, questions } = req.body;
    
    console.log('收到 AI 分析請求:', { beastType: summary?.top });
    
    if (!scores || !summary) {
      return res.status(400).json({
        success: false,
        error: '缺少必要的測驗資料'
      });
    }
    
    // 直接調用您原有的 AI 分析邏輯
    const analysis = await generateAIAnalysis({
      scores,
      summary,
      gender,
      questions
    });
    
    console.log('分析完成');
    
    res.json({
      success: true,
      analysis: analysis
    });
    
  } catch (error) {
    console.error('AI分析錯誤:', error);
    res.status(500).json({
      success: false,
      error: 'AI分析服務暫時不可用'
    });
  }
};

// 使用您原有的 generateAIAnalysis 函數
async function generateAIAnalysis(data) {
  const { scores, summary, gender } = data;
  const beastType = summary.top;
  
  // 這裡放您原本就寫好的 AI 分析邏輯
  // 您之前說已經有後端 API key，就放在這裡使用
  
  return {
    personality: `這是${beastType}型人格的真實AI分析結果`,
    strengths: `您的${beastType}能量優勢分析`, 
    career: `基於${beastType}特質的職場建議`,
    relationships: `${beastType}型的人際關係指導`,
    growth: `個人成長發展路徑`,
    money: `金錢卦象與財運分析`
  };
}
