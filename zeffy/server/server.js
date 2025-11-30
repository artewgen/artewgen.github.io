const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 4000;

const COUNTER_ID = 'ТВОЙ_ID_СЧЁТЧИКА';
const TOKEN = 'ТВОЙ_MEASUREMENT_TOKEN';

app.use(express.json());

app.post('/track/pageview', async (req, res) => {
  const { url, title, clientId } = req.body;

  try {
    const body = {
      counter_id: COUNTER_ID,
      client_id: clientId,
      events: [
        { name: 'page_view', url, title },
      ],
    };

    const resp = await fetch(
      'https://api-metrika.yandex.net/measurement_protocol/v1/send',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!resp.ok) {
      console.error('Metrica error', resp.status, await resp.text());
      return res.status(500).json({ ok: false });
    }

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
