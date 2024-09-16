import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { Maniiifest } from 'maniiifest';

// Define __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        try {
            new Maniiifest(json);
            const prettyJson = JSON.stringify(json, null, 4);
            res.send(prettyJson);
        } catch (error) {
            const stackTrace = error.stack.split('\n').slice(0, 3).join('\n');
            res.status(400).send(error.message + stackTrace);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});