import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-1 pl-5 space-x-40 flex justify-between ">
      <div className="text-base font-bold inline-flex items-center">Inscribe</div>
      <Navbar />
    </header>
  );
};

export default Header;
