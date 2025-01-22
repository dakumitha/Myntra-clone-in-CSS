import React, { useState, useEffect } from 'react';
import { getNotices } from '../services/api';

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const data = await getNotices();
                setNotices(data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    return (
        <div>
            <h2>Notices</h2>
            {loading ? (
                <p>Loading notices...</p>
            ) : notices.length === 0 ? (
                <p>No notices generated yet.</p>
            ) : (
                <ul>
                    {notices.map((notice, index) => (
                        <li key={index}>
                            <p>{notice.content}</p>
                            <small>Generated at: {new Date(notice.generatedAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoticeList;
