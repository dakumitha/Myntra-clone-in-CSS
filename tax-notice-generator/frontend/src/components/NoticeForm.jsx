import React, { useState } from 'react';
import { generateNotice } from '../services/api';

const NoticeForm = () => {
    const [prompt, setPrompt] = useState('');
    const [notice, setNotice] = useState('');
    const [llm, setLlm] = useState('mistral');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await generateNotice(prompt, llm);
            setNotice(result.notice);
        } catch (error) {
            setNotice('Failed to generate notice.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Generate Notice</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here"
                />
                <select value={llm} onChange={(e) => setLlm(e.target.value)}>
                    <option value="llama">Llama</option>
                    <option value="deepseek">DeepSeek</option>
                    <option value="gemini">Gemini</option>
                    <option value="mistral">Mistral</option>
                    <option value="awesomellm">AwesomeLLM</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>
            {notice && <p>Generated Notice: {notice}</p>}
        </div>
    );
};

export default NoticeForm;
