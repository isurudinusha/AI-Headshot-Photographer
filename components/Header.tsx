
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">
          AI Headshot Photographer
        </span>
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
        Transform your selfie into a polished, professional headshot in seconds.
      </p>
    </header>
  );
};
