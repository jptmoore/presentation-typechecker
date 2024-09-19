import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { Maniiifest } from 'maniiifest';
import fs from 'fs';

// Define __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 10000;

const handleError = (error, res) => {
    const stackTrace = error.stack.split('\n').slice(0, 4).map(line => line.trim()).join('\n');
    res.status(400).send(`${stackTrace}`);
};

// Middleware to parse JSON
app.use(bodyParser.json({ limit: '10mb' })); // Set a limit for the JSON payload

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
        switch (json.type) {
            case "Manifest":
            case "Collection":
                new Maniiifest(json);
                break;
            case "Annotation":
                new Maniiifest(json, "Annotation");
                break;
            case "AnnotationPage":
                new Maniiifest(json, "AnnotationPage");
                break;
            case "AnnotationCollection":
                new Maniiifest(json, "AnnotationCollection");
                break;
            default:
                throw new Error("Must be one of Manifest, Collection, Annotation, AnnotationPage, AnnotationCollection");
        }
        const prettyJson = JSON.stringify(json, null, 4);
        res.send(prettyJson);
    } catch (error) {
        handleError(error, res);
    }
});

// Version endpoint
app.get('/version', (req, res) => {
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    fs.readFile(packageJsonPath, 'utf8', (err, data) => {
        if (err) {
            handleError(err, res);
            return;
        }
        try {
            const packageJson = JSON.parse(data);
            res.send({ maniiifest: packageJson.devDependencies.maniiifest });
        } catch (parseError) {
            handleError(parseError, res);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});