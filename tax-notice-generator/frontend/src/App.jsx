import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DocumentUpload from './components/DocumentUpload';
import DocumentAnalyzer from './components/DocumentAnalyzer';
import NoticeForm from './components/NoticeForm';
import NoticeList from './components/NoticeList';
import ReplyUpload from './components/ReplyUpload';
import ReplyList from './components/ReplyList';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import TimeBarringForm from './components/TimeBarringForm';
import CaseDetails from './components/CaseDetails';
import AssessmentSuggestions from './components/AssessmentSuggestions';
import { getDocuments } from './services/api';
import './App.css';

const Navigation = () => (
  <nav className="app-nav">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/upload-document">Upload Document</Link></li>
      <li><Link to="/analyze-document">Analyze Document</Link></li>
      <li><Link to="/generate-notice">Generate Notice</Link></li>
      <li><Link to="/notices">Notices</Link></li>
      <li><Link to="/upload-reply">Upload Reply</Link></li>
      <li><Link to="/replies">Replies</Link></li>
      <li><Link to="/add-reminder">Add Reminder</Link></li>
      <li><Link to="/reminders">Reminders</Link></li>
      <li><Link to="/time-barring">Set Time Barring</Link></li>
      <li><Link to="/case-details">Case Details</Link></li>
      <li><Link to="/assessment-suggestions">Assessment Suggestions</Link></li>
    </ul>
  </nav>
);

function App() {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocuments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Router>
            <div className="app-container">
                <Navigation />
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<h1>Welcome to the Legal App</h1>} />
                        <Route path="/upload-document" element={<DocumentUpload />} />
                        <Route path="/analyze-document" element={<DocumentAnalyzer documents={documents} />} />
                        <Route path="/generate-notice" element={<NoticeForm />} />
                        <Route path="/notices" element={<NoticeList />} />
                        <Route path="/upload-reply" element={<ReplyUpload />} />
                        <Route path="/replies" element={<ReplyList />} />
                        <Route path="/add-reminder" element={<ReminderForm />} />
                        <Route path="/reminders" element={<ReminderList />} />
                        <Route path="/time-barring" element={<TimeBarringForm />} />
                        <Route path="/case-details" element={<CaseDetails />} />
                        <Route path="/assessment-suggestions" element={<AssessmentSuggestions />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
