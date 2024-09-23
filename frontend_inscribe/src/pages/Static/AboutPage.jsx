import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About Inscribe Blog
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Inscribe Blog is a platform where writers can share their thoughts and
          ideas with the world. We believe in the power of writing and the
          ability to inspire change through words.
        </p>
        <p className="text-md text-gray-600 text-center">
          Our mission is to provide a space where individuals from different
          backgrounds can connect, express themselves, and learn from one
          another through insightful and meaningful articles.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
