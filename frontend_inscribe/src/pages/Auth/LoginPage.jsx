import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../components/User/UserContext';


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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/token/', credentials)
      .then(response => {
        const { access } = response.data;
        localStorage.setItem('token', access); // Store the token in local storage

        // Decode the token to get the user ID
        const decodedToken = jwtDecode(access);
        const userId = decodedToken.user_id;

        // Fetch user and profile info
        axios.get(`http://localhost:8000/api/users/${userId}/`)
          .then(userResponse => {
            axios.get(`http://localhost:8000/api/users/${userId}/profile/`)
              .then(profileResponse => {
                // Store both user and profile in the context
                setUser({
                  ...userResponse.data,
                  ...profileResponse.data
                });
                navigate('/'); // Redirect to home page
              });
          });
      })
      .catch(error => {
        console.log(error);
        setError('Login failed. Please check your credentials.');
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

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
