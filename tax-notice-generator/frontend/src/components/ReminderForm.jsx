import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReminderForm() {
    const navigate = useNavigate();
    const [reminderData, setReminderData] = useState({
        caseNumber: '',
        assessmentYear: '',
        dueDate: '',
        priority: 'medium',
        description: '',
        notificationType: 'email',
        assignedTo: '',
        status: 'pending'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReminderData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/reminders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reminderData)
            });

            if (response.ok) {
                navigate('/reminders');
            }
        } catch (error) {
            console.error('Error creating reminder:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Create Assessment Reminder</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700">
                        Case Number
                    </label>
                    <input
                        type="text"
                        id="caseNumber"
                        name="caseNumber"
                        value={reminderData.caseNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="assessmentYear" className="block text-sm font-medium text-gray-700">
                        Assessment Year
                    </label>
                    <input
                        type="text"
                        id="assessmentYear"
                        name="assessmentYear"
                        value={reminderData.assessmentYear}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                    </label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={reminderData.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={reminderData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={reminderData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px]"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="notificationType" className="block text-sm font-medium text-gray-700">
                        Notification Type
                    </label>
                    <select
                        id="notificationType"
                        name="notificationType"
                        value={reminderData.notificationType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                        Assigned To
                    </label>
                    <input
                        type="text"
                        id="assignedTo"
                        name="assignedTo"
                        value={reminderData.assignedTo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                    Create Reminder
                </button>
            </form>
        </div>
    );
}

export default ReminderForm;
