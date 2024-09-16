const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, '.')));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/pretty-print', (req, res) => {
    try {
        const json = JSON.parse(req.body.jsonData);
        const prettyJson = JSON.stringify(json, null, 4);
        res.send(prettyJson);
    } catch (error) {
        res.send('Invalid JSON');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});