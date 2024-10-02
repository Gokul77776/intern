import React, { useState } from 'react';

const CertificatePage = () => {
  const [userId, setUserId] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCertificate = async () => {
    const trimmedUserId = userId.trim();

    if (trimmedUserId.length !== 6 || isNaN(trimmedUserId)) {
      setIsValid(false);
      return;
    }

    setIsLoading(true);  // Show loading indicator
    setIsValid(null);    // Reset validation state

    try {
      const response = await fetch(`/api/validate-user/${trimmedUserId}`);
      const data = await response.json();

      if (data.isValid) {
        setCertificateData(data);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error('Error fetching certificate data:', error);
      setIsValid(false);
    } finally {
      setIsLoading(false);  // Hide loading indicator
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Enter Your 6-Digit Code to Generate Your Certificate
        </h2>
        <input
          type="text"
          maxLength="6"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter 6-digit code"
          className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerateCertificate}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Certificate'}
        </button>

        {isValid === false && (
          <p className="text-red-500 text-center mt-4">Invalid ID</p>
        )}

        {certificateData && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center">
            <h2 className="text-xl font-semibold">Certificate of Completion</h2>
            <p className="mt-2">Name: {certificateData.name}</p>
            <p>Duration: {certificateData.duration}</p>
            <p>Date: {certificateData.date}</p>
            <p className="mt-2">Unique ID: {userId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatePage;
