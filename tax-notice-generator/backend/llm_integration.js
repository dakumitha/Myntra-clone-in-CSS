const axios = require('axios');
require('dotenv').config();

const generateNotice = async (prompt, llm) => {
    try {
        let response;
        switch (llm) {
            case 'llama':
                response = await axios.post('https://api.example.com/llama', { prompt });
                return response.data.text;
            case 'deepseek':
                response = await axios.post('https://api.example.com/deepseek', { prompt });
                return response.data.text;
            case 'gemini':
                response = await axios.post('https://api.example.com/gemini', { prompt });
                return response.data.text;
            case 'mistral':
                response = await axios.post(
                    'https://api.mistral.ai/v1/chat/completions',
                    {
                        model: 'mistral-tiny', // or 'mistral-small', 'mistral-medium'
                        messages: [{ role: 'user', content: prompt }],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data.choices[0].message.content;
            case 'awesomellm':
                response = await axios.post(
                    'https://api.awesomellm.com/generate',
                    { prompt },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.AWESOMELLM_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data.text;
            default:
                throw new Error("Invalid LLM selected");
        }
    } catch (error) {
        console.error("Error calling LLM:", error);
        throw new Error("Failed to generate notice with LLM");
    }
};

const analyzeDocument = async (content, llm) => {
    try {
        let response;
        switch (llm) {
            case 'llama':
                response = await axios.post('https://api.example.com/llama/analyze', { content });
                return response.data.analysis;
            case 'deepseek':
                response = await axios.post('https://api.example.com/deepseek/analyze', { content });
                return response.data.analysis;
            case 'gemini':
                response = await axios.post('https://api.example.com/gemini/analyze', { content });
                return response.data.analysis;
            case 'mistral':
                response = await axios.post(
                    'https://api.mistral.ai/v1/chat/completions',
                    {
                        model: 'mistral-tiny',
                        messages: [{ role: 'user', content: `Analyze this document: ${content}` }],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data.choices[0].message.content;
            case 'awesomellm':
                response = await axios.post(
                    'https://api.awesomellm.com/analyze',
                    { content },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.AWESOMELLM_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data.analysis;
            default:
                throw new Error("Invalid LLM selected");
        }
    } catch (error) {
        console.error("Error calling LLM for analysis:", error);
        throw new Error("Failed to analyze document with LLM");
    }
};

const performOCR = async (content, llm) => {
    try {
        let response;
        switch (llm) {
            case 'llama':
                response = await axios.post('https://api.example.com/llama/ocr', { content });
                return response.data.text;
            case 'deepseek':
                response = await axios.post('https://api.example.com/deepseek/ocr', { content });
                return response.data.text;
            case 'gemini':
                response = await axios.post('https://api.example.com/gemini/ocr', { content });
                return response.data.text;
            case 'mistral':
                response = await axios.post(
                    'https://api.mistral.ai/v1/chat/completions',
                    {
                        model: 'mistral-tiny',
                        messages: [{ role: 'user', content: `Perform OCR on this content: ${content}` }],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data.choices[0].message.content;
            case 'awesomellm':
                response = await axios.post(
                    'https://api.awesomellm.com/ocr',
                    { content },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.AWESOMELLM_API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                return response.data.text;
            default:
                throw new Error("Invalid LLM selected");
        }
    } catch (error) {
        console.error("Error calling LLM for OCR:", error);
        throw new Error("Failed to perform OCR with LLM");
    }
};

module.exports = { generateNotice, analyzeDocument, performOCR };
