import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4 tracking-tight">404</h1>
          
          <div className="relative inline-block">
            <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" className="fill-primary opacity-10"/>
              <path d="M60 85 Q70 80, 80 85" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" className="text-primary"/>
              <path d="M120 85 Q130 80, 140 85" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" className="text-primary"/>
              <circle cx="70" cy="95" r="6" className="fill-primary"/>
              <circle cx="130" cy="95" r="6" className="fill-primary"/>
              <path d="M70 135 Q100 120, 130 135" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" className="text-primary"/>
            </svg>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-base-content mb-4">
          Oops! Artwork Not Found
        </h2>
        <p className="text-lg text-base-content opacity-70 mb-8">
          The masterpiece you're looking for seems to have vanished into the creative void. Let's get you back to the gallery!
        </p>
        
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <Link to="/explore" className="btn btn-outline btn-primary btn-lg">
            Explore Artworks
          </Link>
        </div>

        <div className="mt-12 flex justify-center gap-8">
          <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
