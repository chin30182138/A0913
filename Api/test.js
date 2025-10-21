// api/test.js
module.exports = (req, res) => {
  res.json({ message: 'TEST WORKS', timestamp: Date.now() });
};
