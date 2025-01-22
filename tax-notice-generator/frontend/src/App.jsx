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
  <nav className="bg-white shadow-lg fixed w-full z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-indigo-600">LegalTech</Link>
        </div>
        <div className="hidden lg:block">
          <div className="ml-4 flex items-center space-x-2">
            <Link to="/upload-document" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Upload Document</Link>
            <Link to="/analyze-document" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Analyze Document</Link>
            <Link to="/generate-notice" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Generate Notice</Link>
            <Link to="/notices" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Notices</Link>
            <Link to="/upload-reply" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Upload Reply</Link>
            <Link to="/replies" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Replies</Link>
            <Link to="/add-reminder" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Add Reminder</Link>
            <Link to="/reminders" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Reminders</Link>
            <Link to="/time-barring" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Time Barring</Link>
            <Link to="/case-details" className="text-gray-600 hover:text-indigo-600 px-2 py-2 rounded-md text-sm font-medium transition-colors">Case Details</Link>
            <Link to="/assessment-suggestions" className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">Assessment</Link>
          </div>
        </div>
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
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

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl text-indigo-600">Loading...</div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl text-red-600">Error: {error}</div>
        </div>
    );

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navigation />
                <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/" element={
                            <div className="text-center">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">Welcome to</span>
                                    <span className="block text-indigo-600">Legal Document Management</span>
                                </h1>
                                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                    Streamline your legal document processing with AI-powered analysis and case management.
                                </p>
                            </div>
                        } />
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
