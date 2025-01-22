import React, { useState } from 'react';
import { uploadReply } from '../services/api';

const ReplyUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file.');
            return;
        }

        setUploadStatus('Uploading...');

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64Content = event.target.result.split(',')[1];
                const formData = {
                    filename: selectedFile.name,
                    filetype: selectedFile.type,
                    content: base64Content,
                };

                await uploadReply(formData);
                setUploadStatus('Reply uploaded successfully!');
                setSelectedFile(null);
            };
            reader.readAsDataURL(selectedFile);
        } catch (error) {
            setUploadStatus('Failed to upload reply.');
        }
    };

    return (
        <div>
            <h2>Upload Reply</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>
                Upload
            </button>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default ReplyUpload;
