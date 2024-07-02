const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'your_db_password',
    port: 5432,
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('user_file'), async (req, res) => {
    console.log('Request received');
    console.log('req.file:', req.file);
    
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const { originalname, buffer } = req.file;

    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO images (name, data) VALUES ($1, $2) RETURNING id',
            [originalname, buffer]
        );
        client.release();
        res.send(`File uploaded with ID: ${result.rows[0].id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file');
    }
});

// Endpoint to retrieve all images
app.get('/images', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT id, name FROM images');
        client.release();

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving images');
    }
});

// Endpoint to retrieve an image by ID and serve it
app.get('/image/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT name, data FROM images WHERE id = $1', [id]);
        client.release();

        if (result.rows.length > 0) {
            const { name, data } = result.rows[0];
            res.setHeader('Content-Disposition', `inline; filename=${name}`);
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(data);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving image');
    }
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
