import React, { useState, useEffect } from 'react';
import { getAssessmentSuggestions } from '../services/api';

const AssessmentSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const data = await getAssessmentSuggestions();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching assessment suggestions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, []);

    return (
        <div>
            <h2>Assessment Suggestions</h2>
            {loading ? (
                <p>Loading assessment suggestions...</p>
            ) : suggestions.length === 0 ? (
                <p>No assessment suggestions available.</p>
            ) : (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <p>{suggestion.suggestion}</p>
                            <small>Generated at: {new Date(suggestion.generatedAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AssessmentSuggestions;
