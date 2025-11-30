const express = require('express');
const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  console.log('REQUEST:', req.method, req.url);
  next();
});

app.use(express.json());

app.post('/track/pageview', (req, res) => {
  console.log('BODY:', req.body);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`TEST server listening on http://localhost:${PORT}`);
});
