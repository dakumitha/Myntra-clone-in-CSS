import React, { useState, useCallback } from 'react';
import { uploadDocument } from '../services/api';
import axios from 'axios';


const DocumentUpload = () => {
    const [documents, setDocuments] = useState([{ id: 1, file: null, name: '', description: '' }]);
    const [uploadStatus, setUploadStatus] = useState({});
    const [overallStatus, setOverallStatus] = useState('');

    const addDocumentField = () => {
        if (documents.length < 50) {
            setDocuments([
                ...documents,
                { 
                    id: documents.length + 1, 
                    file: null, 
                    name: '', 
                    description: '' 
                }
            ]);
        }
    };

    const removeDocumentField = (id) => {
        setDocuments(documents.filter(doc => doc.id !== id));
        setUploadStatus(prev => {
            const newStatus = { ...prev };
            delete newStatus[id];
            return newStatus;
        });
    };

    const handleFileChange = useCallback((id, event) => {
        const file = event.target.files[0];
        setDocuments(prev => 
            prev.map(doc => 
                doc.id === id ? { ...doc, file, name: file.name } : doc
            )
        );
    }, []);

    const handleDescriptionChange = useCallback((id, value) => {
        setDocuments(prev =>
            prev.map(doc =>
                doc.id === id ? { ...doc, description: value } : doc
            )
        );
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-blue-500');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500');
    };

    const handleDrop = useCallback((id, e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500');
        const file = e.dataTransfer.files[0];
        setDocuments(prev =>
            prev.map(doc =>
                doc.id === id ? { ...doc, file, name: file.name } : doc
            )
        );
    }, []);

    const uploadSingleDocument = async (document) => {
        try {
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onload = async (event) => {
                    try {
                        const base64Content = event.target.result.split(',')[1];
                        const formData = {
                            filename: document.name,
                            filetype: document.file.type,
                            content: base64Content,
                            description: document.description
                        };
                        
                        const response = await uploadDocument(formData);
                        setUploadStatus(prev => ({
                            ...prev,
                            [document.id]: 'Success'
                        }));
                        resolve(response);
                    } catch (error) {
                        setUploadStatus(prev => ({
                            ...prev,
                            [document.id]: 'Failed'
                        }));
                        reject(error);
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(document.file);
            });
        } catch (error) {
            setUploadStatus(prev => ({
                ...prev,
                [document.id]: 'Failed'
            }));
            throw error;
        }
    };

    const handleUpload = async () => {
        const documentsToUpload = documents.filter(doc => doc.file);
        if (documentsToUpload.length === 0) {
            setOverallStatus('Please select at least one file.');
            return;
        }

        setOverallStatus('Uploading documents...');
        
        try {
            await Promise.all(documentsToUpload.map(uploadSingleDocument));
            setOverallStatus('All documents uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            setOverallStatus('Some documents failed to upload. Check individual status.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Upload Documents</h2>
                <button
                    onClick={addDocumentField}
                    disabled={documents.length >= 50}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Document ({documents.length}/50)
                </button>
            </div>

            <div className="space-y-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(doc.id, e)}
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors"
                                    >
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileChange(doc.id, e)}
                                            className="hidden"
                                            id={`file-${doc.id}`}
                                        />
                                        <label
                                            htmlFor={`file-${doc.id}`}
                                            className="cursor-pointer flex flex-col items-center gap-2"
                                        >
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span className="text-sm text-gray-500">
                                                {doc.file ? doc.file.name : 'Click or drag file here'}
                                            </span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Document description (optional)"
                                        value={doc.description}
                                        onChange={(e) => handleDescriptionChange(doc.id, e.target.value)}
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    {uploadStatus[doc.id] && (
                                        <span className={`text-sm ${uploadStatus[doc.id] === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                                            {uploadStatus[doc.id]}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => removeDocumentField(doc.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={handleUpload}
                    disabled={!documents.some(doc => doc.file)}
                    className="w-full max-w-md py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Upload All Documents
                </button>
                {overallStatus && (
                    <p className={`text-center ${
                        overallStatus.includes('successfully') ? 'text-green-600' : 
                        overallStatus.includes('failed') ? 'text-red-600' : 
                        'text-blue-600'
                    }`}>
                        {overallStatus}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DocumentUpload;
