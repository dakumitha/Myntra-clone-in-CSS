import React, { useState, useEffect } from 'react';
import { getReminders } from '../services/api';

const ReminderList = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const data = await getReminders();
                setReminders(data);
            } catch (error) {
                console.error("Error fetching reminders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReminders();
    }, []);

    return (
        <div>
            <h2>Reminders</h2>
            {loading ? (
                <p>Loading reminders...</p>
            ) : reminders.length === 0 ? (
                <p>No reminders added yet.</p>
            ) : (
                <ul>
                    {reminders.map((reminder, index) => (
                        <li key={index}>
                            <p>Title: {reminder.title}</p>
                            <p>Description: {reminder.description}</p>
                            <p>Date: {new Date(reminder.date).toLocaleString()}</p>
                            <small>Added at: {new Date(reminder.addedAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReminderList;
