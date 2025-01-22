import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Add retry logic
axiosRetry(api, { 
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
    }
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const uploadDocument = async (formData) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/upload-document', formData, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error uploading document:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const getDocuments = async () => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.get('/documents', {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error fetching documents:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const uploadReply = async (formData) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/upload-reply', formData, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error uploading reply:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const getReplies = async () => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.get('/replies', {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error fetching replies:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const generateNotice = async (prompt, llm) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/generate-notice', { prompt, llm }, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error generating notice:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const getNotices = async () => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.get('/notices', {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error fetching notices:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const addReminder = async (reminder) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/add-reminder', reminder, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error adding reminder:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const getReminders = async () => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.get('/reminders', {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error fetching reminders:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const setTimeBarring = async (timeBarringDate) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/set-time-barring', { timeBarringDate }, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error setting time barring date:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const getCaseDetails = async () => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.get('/case-details', {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error fetching case details:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const analyzeDocument = async (content, llm) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/analyze-document', { content, llm }, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error analyzing document:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const getAssessmentSuggestions = async () => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.get('/assessment-suggestions', {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error fetching assessment suggestions:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};

export const performOCR = async (content, llm) => {
    const cancelToken = axios.CancelToken.source();
    try {
        const response = await api.post('/perform-ocr', { content, llm }, {
            cancelToken: cancelToken.token
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled');
        } else {
            console.error("Error performing OCR:", error);
            throw error;
        }
    }
    return () => cancelToken.cancel();
};
