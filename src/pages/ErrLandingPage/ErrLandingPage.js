import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ErrLandingPage.css';

const ErrLandingPage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative">
        <div className="text-9xl font-bold text-gray-300 flex">
          <span className="animate-bounce-left">4</span>
          <span className="animate-bounce-up">0</span>
          <span className="animate-bounce-right">4</span>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-24 h-12 bg-red-400 rounded-full animate-blush opacity-60"></div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-2xl font-semibold text-gray-700 mb-4 animate-fade-in">
          Oops! We're blushing with embarrassment.
        </p>
        <p className="text-gray-600 mb-8 animate-fade-in delay-1000">
          We can't seem to find the page you're looking for.
        </p>
        {showMessage && (
          <p className="text-sm text-gray-500 italic animate-fade-in">
            "I told you we should have asked for directions!" - Zero
          </p>
        )}
        <Link 
          to="/" 
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrLandingPage;