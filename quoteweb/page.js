const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const dirname = __dirname;

app.use(express.static(path.join(dirname, 'public')));

app.get('/api/quotes', async (req, res) => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default('https://type.fit/api/quotes');
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        const quotes = await response.json();
        res.json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error.message);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
