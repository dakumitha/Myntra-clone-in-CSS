import React, { useState, useEffect } from 'react';
import { getCaseDetails } from '../services/api';

const CaseDetails = () => {
    const [caseDetails, setCaseDetails] = useState({ timeBarringDate: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseDetails = async () => {
            try {
                const data = await getCaseDetails();
                setCaseDetails(data);
            } catch (error) {
                console.error("Error fetching case details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCaseDetails();
    }, []);

    return (
        <div>
            <h2>Case Details</h2>
            {loading ? (
                <p>Loading case details...</p>
            ) : (
                <div>
                    {caseDetails.timeBarringDate ? (
                        <p>Time Barring Date: {new Date(caseDetails.timeBarringDate).toLocaleString()}</p>
                    ) : (
                        <p>Time Barring Date not set.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CaseDetails;
