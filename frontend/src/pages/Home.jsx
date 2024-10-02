import React, { useState, useEffect } from 'react';
import { convertObjectIdToSixDigits } from '../components/GenerateCode';
import { useNavigate } from 'react-router-dom';

const InternForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        domain: '',
        startDate: '',
        endDate: '',
        linkedIn: '',
        github: '',
    });

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [generatedCode, setGeneratedCode] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (value) {
            setErrors({ ...errors, [name]: false });
        }
    };

    const handleNext = () => {
        const newErrors = {};
        const requiredFields = ['name', 'email', 'phone', 'domain', 'startDate', 'endDate'];

        requiredFields.forEach((field) => {
            if (step === 1 && !formData[field]) {
                newErrors[field] = true;
            }
        });

        if (Object.keys(newErrors).length === 0) {
            setStep(step + 1);
        } else {
            setErrors(newErrors);
        }
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };
     
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/interns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure sending JSON data
                },
                body: JSON.stringify(formData),  // Send formData as a JSON string
            });
    
            const data = await response.json();
    
            if (data.intern  && data.intern._id) {
                const sixDigitCode = convertObjectIdToSixDigits(data.intern._id);  // Convert ObjectId
                setGeneratedCode(sixDigitCode);  // Set the generated code
                setSubmitted(true);
            } else {
                throw new Error('No ObjectId returned');
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };   const navigate = useNavigate();

    const handleGetCertificate = () => {
      navigate('/certificate');
    };
    
     

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Intern Registration</h1>
                {!submitted ? (
                    <form action='uploads' onSubmit={handleSubmit} encType="multipart/form-data">
                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'focus:ring-blue-500'}`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'focus:ring-blue-500'}`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">Phone:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500' : 'focus:ring-blue-500'}`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">Domain:</label>
                                    <select
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.domain ? 'border-red-500' : 'focus:ring-blue-500'}`}
                                    >
                                        <option value="" disabled>Select a domain</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Teaching">Teaching</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Telecalling">Telecalling</option>
                                        <option value="Fundraising">Fundraising</option>
                                        <option value="Social Media Marketing">Social Media Marketing</option>
                                        <option value="Talent Acquisition">Talent Acquisition</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Video Editing">Video Editing</option>
                                        <option value="Content Writing">Content Writing</option>
                                        <option value="NGO Management">NGO Management</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">Start Date:</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.startDate ? 'border-red-500' : 'focus:ring-blue-500'}`}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">End Date:</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.endDate ? 'border-red-500' : 'focus:ring-blue-500'}`}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fadeIn">
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">LinkedIn:</label>
                                    <input
                                        type="text"
                                        name="linkedIn"
                                        value={formData.linkedIn}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700">GitHub:</label>
                                    <input
                                        type="text"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                               
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-lg font-bold mb-4">Review Your Information</h2>
                                <div className="mb-4">
                                    <strong>Name:</strong> {formData.name}
                                </div>
                                <div className="mb-4">
                                    <strong>Email:</strong> {formData.email}
                                </div>
                                <div className="mb-4">
                                    <strong>Phone:</strong> {formData.phone}
                                </div>
                                <div className="mb-4">
                                    <strong>Domain:</strong> {formData.domain}
                                </div>
                                <div className="mb-4">
                                    <strong>Start Date:</strong> {formData.startDate}
                                </div>
                                <div className="mb-4">
                                    <strong>End Date:</strong> {formData.endDate}
                                </div>
                                <div className="mb-4">
                                    <strong>LinkedIn:</strong> {formData.linkedIn}
                                </div>
                                <div className="mb-4">
                                    <strong>GitHub:</strong> {formData.github}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-fadeIn text-center">
                                <h2 className="text-lg font-bold mb-6 text-green-600">Thank You for Submitting!</h2>
                            </div>
                        )}

                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                disabled={step === 1}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out"
                            >
                                Previous
                            </button>
                            {step < 4 && (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 ease-in-out"
                                >
                                    Next
                                </button>
                            )}
                            {step === 4 && (
    <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 ease-in-out"
    >
        Submit
    </button>
)}
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Thank You!</h2>
        <p>Your registration has been submitted.</p>
        {generatedCode && (
            <p className="mt-2">Generated Code: {generatedCode}
             <button onClick={handleGetCertificate} className="btn-get-certificate">
            Get Certificate
          </button>
            </p>
        )}
    </div>
                )}
            </div>
        </div>
    );
};

export default InternForm;
