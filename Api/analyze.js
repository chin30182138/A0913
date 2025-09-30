const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/analyze', (req, res) => {
    console.log('收到請求:', req.body); // 調試日誌
    const { person1, person2 } = req.body;
    if (!person1 || !person2) {
        return res.status(400).json({ error: '缺少 person1 或 person2 數據' });
    }
    const p1Liqin = person1.liqin;
    const p1Liushou = person1.liushou;
    const p1Dizhi = person1.dizhi;
    const p2Liqin = person2.liqin;
    const p2Liushou = person2.liushou;
    const p2Dizhi = person2.dizhi;

    let compatibility = 50, trust = 50, pace = 50, innovation = 50, communication = 50;
    if (p1Liushou === '青龍') innovation += 10;
    if (p2Liushou === '朱雀') communication += 10;

    const analysis = `- 雙方信息：\n  甲方: ${p1Liqin}, ${p1Liushou}, ${p1Dizhi}\n  乙方: ${p2Liqin}, ${p2Liushou}, ${p2Dizhi}\n- 分析：甲方${p1Liushou}特質進取，乙方${p2Liushou}擅溝通，建議注重團隊協調。`;

    res.json({
        analysis,
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

process.on('uncaughtException', (err) => {
    console.error('未捕獲的錯誤:', err);
});
