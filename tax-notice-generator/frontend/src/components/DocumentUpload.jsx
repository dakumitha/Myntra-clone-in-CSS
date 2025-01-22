import React, { useState } from 'react';
import { uploadDocument } from '../services/api';

const DocumentUpload = () => {
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

                await uploadDocument(formData);
                setUploadStatus('Document uploaded successfully!');
                setSelectedFile(null);
            };
            reader.readAsDataURL(selectedFile);
        } catch (error) {
            setUploadStatus('Failed to upload document.');
        }
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>
                Upload
            </button>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default DocumentUpload;
