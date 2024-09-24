import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/register/', formData)
      .then(response => {
        // Redirect to login page on successful signup
        navigate('/login');
      })
      .catch(error => {
        console.log(error.response.data);
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError('Failed to create account. Please try again.');
        }
      });
  };

  const renderErrorMessages = () => {
    if (!error) return null;

    if (typeof error === 'string') {
      // If the error is a simple string, display it directly
      return <p className="text-red-500">{error}</p>;
    }

    // If the error is an object, map through it and display each field's errors
    return (
      <div className="text-red-500">
        {Object.entries(error).map(([field, messages]) => (
          <div key={field}>
            <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>

        {/* Render error messages */}
        {renderErrorMessages()}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
