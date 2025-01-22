import React, { useState } from 'react';
import { performOCR } from '../services/api';

const OCRModal = ({ isOpen, onClose, content }) => {
    const [ocrText, setOcrText] = useState('');
    const [llm, setLlm] = useState('mistral');
    const [loading, setLoading] = useState(false);

    const handleOCR = async () => {
        setLoading(true);
        try {
            const result = await performOCR(content, llm);
            setOcrText(result.ocrText);
        } catch (error) {
            setOcrText('Failed to perform OCR.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Perform OCR</h2>
                <p>Content: {content}</p>
                <select value={llm} onChange={(e) => setLlm(e.target.value)}>
                    <option value="llama">Llama</option>
                    <option value="deepseek">DeepSeek</option>
                    <option value="gemini">Gemini</option>
                    <option value="mistral">Mistral</option>
                    <option value="awesomellm">AwesomeLLM</option>
                </select>
                <button onClick={handleOCR} disabled={loading}>
                    {loading ? 'Performing OCR...' : 'Perform OCR'}
                </button>
                {ocrText && <p>OCR Text: {ocrText}</p>}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default OCRModal;
