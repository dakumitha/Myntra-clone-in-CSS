import React, { useState, useEffect } from 'react';
import { getReplies } from '../services/api';

const ReplyList = () => {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const data = await getReplies();
                setReplies(data);
            } catch (error) {
                console.error("Error fetching replies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReplies();
    }, []);

    return (
        <div>
            <h2>Replies</h2>
            {loading ? (
                <p>Loading replies...</p>
            ) : replies.length === 0 ? (
                <p>No replies uploaded yet.</p>
            ) : (
                <ul>
                    {replies.map((reply, index) => (
                        <li key={index}>
                            <p>Filename: {reply.filename}</p>
                            <small>Uploaded at: {new Date(reply.uploadedAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReplyList;
