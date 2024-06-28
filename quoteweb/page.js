import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/quotes', async (req, res) => {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const quotes = await response.json();
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`);
    console.log(`Server is running on port At   http://localhost:3000/`);
});
