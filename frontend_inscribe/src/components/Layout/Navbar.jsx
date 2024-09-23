import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/User/UserContext';


const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');


  const handleLogout = () => {
    logout(); // Calls the logout function from context
    window.location.reload(); // Reload or redirect if needed
  };

  return (
    <nav className="text-white p-4 inline-flex justify-between w-full">
      <div className='flex items-center w-1/3 justify-between'>
        <Link to="/about" className="mr-4 hover:underline">About</Link>
        <Link to="/articles" className="mr-4 hover:underline">Inscriptions</Link>
        <Link to="/articles/create" className="mr-4 hover:underline">Inscribe</Link>
      </div>
      <div className='flex justify-between'>
        {user ? (
          <div className='inline-flex items-center'>
            <div className="mr-4 text-yellow-500 font-mono">@{user.username}</div>
            <button onClick={handleLogout} className="hover:bg-white hover:text-gray-700 bg-yellow-500 py-1.5 px-2.5">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="ml-4 hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
