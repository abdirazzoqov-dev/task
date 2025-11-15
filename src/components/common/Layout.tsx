// src/components/common/Layout.tsx
import React from 'react';
import { Header } from './Header';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      {/* Ixtiyoriy Footer */}
      <footer className="w-full text-center py-3 text-sm text-gray-500 border-t mt-auto">
        &copy; {new Date().getFullYear()} React Task
      </footer>
    </div>
  );
};