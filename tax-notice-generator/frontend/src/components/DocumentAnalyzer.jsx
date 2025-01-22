import React, { useState } from 'react';
import { analyzeDocument } from '../services/api';

const DocumentAnalyzer = ({ documents }) => {
    const [selectedDocument, setSelectedDocument] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [llm, setLlm] = useState('mistral');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!selectedDocument) {
            alert('Please select a document to analyze.');
            return;
        }
        setLoading(true);
        try {
            const selectedDoc = documents.find(doc => doc.filename === selectedDocument);
            if (selectedDoc) {
                const { content } = selectedDoc;
                const result = await analyzeDocument(content, llm);
                setAnalysisResult(result.analysis);
            } else {
                setAnalysisResult('Document not found.');
            }
        } catch (error) {
            setAnalysisResult('Failed to analyze document.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Analyze Document</h2>
            <select value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)}>
                <option value="">Select a document</option>
                {documents.map((doc, index) => (
                    <option key={index} value={doc.filename}>{doc.filename}</option>
                ))}
            </select>
            <select value={llm} onChange={(e) => setLlm(e.target.value)}>
                <option value="llama">Llama</option>
                <option value="deepseek">DeepSeek</option>
                <option value="gemini">Gemini</option>
                <option value="mistral">Mistral</option>
                <option value="awesomellm">AwesomeLLM</option>
            </select>
            <button onClick={handleAnalyze} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze'}
            </button>
            {analysisResult && <p>Analysis Result: {analysisResult}</p>}
        </div>
    );
};

export default DocumentAnalyzer;
