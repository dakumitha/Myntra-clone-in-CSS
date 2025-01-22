import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const defaultData = {
    documents: [],
    notices: [],
    replies: [],
    reminders: [],
    caseDetails: { timeBarringDate: null },
    assessmentSuggestions: []
};
const db = new Low(adapter, defaultData);

await db.read();

db.data ||= defaultData;

app.get('/documents', (req, res) => {
    res.json(db.data.documents);
});

app.post('/documents', (req, res) => {
    const newDocument = req.body;
    newDocument.uploadedAt = new Date();
    db.data.documents.push(newDocument);
    db.write();
    res.status(201).json(newDocument);
});

app.get('/notices', (req, res) => {
    res.json(db.data.notices);
});

app.post('/notices', (req, res) => {
    const newNotice = req.body;
    newNotice.generatedAt = new Date();
    db.data.notices.push(newNotice);
    db.write();
    res.status(201).json(newNotice);
});

app.get('/replies', (req, res) => {
    res.json(db.data.replies);
});

app.post('/replies', (req, res) => {
    const newReply = req.body;
    newReply.uploadedAt = new Date();
    db.data.replies.push(newReply);
    db.write();
    res.status(201).json(newReply);
});

app.get('/reminders', (req, res) => {
    res.json(db.data.reminders);
});

app.post('/reminders', (req, res) => {
    const newReminder = req.body;
    newReminder.addedAt = new Date();
    db.data.reminders.push(newReminder);
    db.write();
    res.status(201).json(newReminder);
});

app.get('/case-details', (req, res) => {
    res.json(db.data.caseDetails);
});

app.post('/case-details', (req, res) => {
    const { timeBarringDate } = req.body;
    db.data.caseDetails.timeBarringDate = timeBarringDate;
    db.write();
    res.status(201).json(db.data.caseDetails);
});

app.get('/assessment-suggestions', (req, res) => {
    res.json(db.data.assessmentSuggestions);
});

app.post('/assessment-suggestions', (req, res) => {
    const newSuggestion = req.body;
    newSuggestion.generatedAt = new Date();
    db.data.assessmentSuggestions.push(newSuggestion);
    db.write();
    res.status(201).json(newSuggestion);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
