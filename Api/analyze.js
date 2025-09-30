// analyze.js (假設內容)
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/analyze', (req, res) => {
    const { person1, person2 } = req.body;
    const p1Liqin = person1.liqin;
    const p1Liushou = person1.liushou;
    const p1Dizhi = person1.dizhi;
    const p2Liqin = person2.liqin;
    const p2Liushou = person2.liushou;
    const p2Dizhi = person2.dizhi;

    // 簡單的分析邏輯（可替換為你的實際算法）
    let compatibility = 50, trust = 50, pace = 50, innovation = 50, communication = 50;
    if (p1Liushou === '青龍') innovation += 10;
    if (p2Liushou === '朱雀') communication += 10;
    if (p1Dizhi === '寅' && p2Dizhi === '申') trust -= 10; // 木剋金影響

    const analysis = `- 雙方信息：\n  甲方: ${p1Liqin}, ${p1Liushou}, ${p1Dizhi}\n  乙方: ${p2Liqin}, ${p2Liushou}, ${p2Dizhi}\n- 分析：甲方${p1Liushou}特質與乙方${p2Liushou}互動，${p1Dizhi}與${p2Dizhi}五行${(trust < 50 ? '剋制' : '相生')}，建議注重${trust < 50 ? '信任修復' : '合作深化'}。`;

    res.json({
        analysis: analysis,
        scores: {
            compatibility: Math.min(100, compatibility),
            trust: Math.min(100, trust),
            pace: Math.min(100, pace),
            innovation: Math.min(100, innovation),
            communication: Math.min(100, communication)
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
