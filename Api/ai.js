// api/ai.js - 完整版本
module.exports = async (req, res) => {
  // CORS 設置
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
    
    console.log('收到 AI 分析請求');
    
    if (!scores || !summary) {
      return res.status(400).json({
        success: false,
        error: '缺少必要的測驗資料'
      });
    }
    
    // 調用 AI 分析函數
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

// AI 分析函數
async function generateAIAnalysis(data) {
  const { scores, summary, gender } = data;
  const beastType = summary.top;
  const genderText = gender === 'male' ? '男性' : gender === 'female' ? '女性' : '其他';
  
  // 基於神獸類型和分數生成分析
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  
  return {
    personality: `## ${beastType}型${genderText}人格深度分析\n\n基於您的測驗結果，您的主型為**${beastType}**，總分${totalScore}分。這顯示您具有${beastType}能量的核心特質：\n\n### 核心特質\n- 💫 能量特徵：${beastType}型特有的氣質表現\n- 🎯 行為模式：在各種情境下的典型反應\n- 🌟 內在動機：驅動您行動的深層需求\n\n### 性格優勢\n您的${beastType}能量讓您在創新、執行或思考等方面具有獨特優勢。`,
    
    strengths: `## ${beastType}能量優勢解析\n\n### 天賦潛能\n- 🚀 **核心優勢**：${beastType}型最突出的能力特質\n- 💡 **創意表現**：在解決問題時的獨特視角\n- 🤝 **人際影響**：與他人互動時的自然魅力\n\n### 潛在能力\n最高分能量：${maxScore}分，顯示您在特定領域具有突出表現。`,
    
    career: `## 職場發展建議\n\n### 適合領域\n- 🏢 **最佳匹配**：${beastType}型最適合的產業與職位\n- 📈 **發展路徑**：從初階到資深的職業規劃\n- 💼 **工作風格**：最能發揮您優勢的工作方式\n\n### 職場策略\n利用您的${beastType}特質，在職場中建立獨特價值定位。`,
    
    relationships: `## 人際關係指導\n\n### 相處之道\n- 💞 **情感表達**：${beastType}型特有的情感模式\n- 🗣️ **溝通風格**：與不同類型人的交流技巧\n- 🤗 **支持需求**：您在關係中最需要的支持形式\n\n### 關係建議\n了解自己的${beastType}特質，建立更和諧的人際關係。`,
    
    growth: `## 個人成長路徑\n\n### 發展方向\n- 🌱 **短期目標**：現階段最適合的成長重點\n- 🌳 **長期規劃**：未來3-5年的發展藍圖\n- 🔄 **突破關鍵**：突破現狀的重要轉折點\n\n### 自我提升\n定期反思與調整，讓${beastType}能量為您服務。`,
    
    money: `## 金錢卦象解析\n\n### 財運分析\n💰 **${beastType}主財**：您的財運特質與理財建議\n\n### 投資建議\n- 📊 **適合方向**：${beastType}型最適合的投資領域\n- ⚠️ **風險提醒**：需要特別注意的財務風險\n- 🌟 **機會點**：潛在的財富增長機會\n\n### 理財策略\n結合您的${beastType}特質，制定個性化財務規劃。`
  };
}
