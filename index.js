const express = require('express');
const path = require('path');
const sharp = require('sharp');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/ping', (req, res) => res.send('pong'));

// POST /api/convert
// body: { svg: string, width?: number, height?: number, density?: number }
app.post('/api/convert', async (req, res) => {
  try {
    const { svg, width, height } = req.body;
    if (!svg) return res.status(400).json({ error: 'svg field is required (string)' });

    const input = Buffer.from(svg);
    let pipeline = sharp(input).png();

    if (width || height) pipeline = pipeline.resize(width || null, height || null, { fit: 'contain' });

    const buffer = await pipeline.toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('convert error', err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
