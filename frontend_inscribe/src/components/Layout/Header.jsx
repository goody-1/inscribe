import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-1 px-5 pl-10 space-x-40 flex justify-between ">
      <Link to='/' className="text-xl font-bold inline-flex items-center text-white hover:text-yellow-500">Inscribe</Link>
      <Navbar />
    </header>
  );
};

export default Header;
