import React from 'react';

const MainContainer = ({ children }) => {
  return (
    <main className="flex-1 bg-white min-h-screen filter drop-shadow rounded-lg">
      {children}
    </main>
  );
};

export default MainContainer;
