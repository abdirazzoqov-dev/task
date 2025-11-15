// src/components/common/Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const activeClass = "border-b-2 border-indigo-500 text-indigo-600 font-bold";
  const baseClass = "px-4 py-2 hover:text-indigo-600 transition-colors";

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-xl font-extrabold text-gray-900">
          React Task
        </div>
        <nav className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
          >
            Users
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) => `${baseClass} ${isActive ? activeClass : 'text-gray-700'}`}
          >
            Map
          </NavLink>
        </nav>
      </div>
    </header>
  );
};