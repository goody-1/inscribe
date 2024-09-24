import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/User/UserContext';

// Function to manually decode the JWT
const decodeJWT = (token) => {
  const base64Url = token.split('.')[1]; // Get the payload part of the JWT
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Adjust for URL-safe base64 encoding
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload); // Return the parsed JSON payload
};

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext); // Use context to store user data
  const navigate = useNavigate();

  // Handle input changes and update the state
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login credentials to backend to get token
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      const { access } = response.data;
      localStorage.setItem('token', access); // Store token in localStorage

      // Manually decode JWT to get user ID
      const decodedToken = decodeJWT(access);
      const userId = decodedToken.user_id;

      // Fetch user and profile info after decoding token
      const userResponse = await axios.get(`http://localhost:8000/api/users/${userId}/`);
      const profileResponse = await axios.get(`http://localhost:8000/api/users/${userId}/profile/`);

      // Store both user and profile in the context
      setUser({
        ...userResponse.data,
        ...profileResponse.data,
      });

      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        {/* Render error messages */}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Log In
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
