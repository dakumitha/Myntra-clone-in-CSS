import React, { useState } from 'react';
import { setTimeBarring } from '../services/api';

const TimeBarringForm = () => {
    const [timeBarringDate, setTimeBarringDate] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setTimeBarring(timeBarringDate);
            setStatus('Time barring date set successfully!');
        } catch (error) {
            setStatus('Failed to set time barring date.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Set Time Barring Date</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    value={timeBarringDate}
                    onChange={(e) => setTimeBarringDate(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Setting...' : 'Set Date'}
                </button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default TimeBarringForm;
