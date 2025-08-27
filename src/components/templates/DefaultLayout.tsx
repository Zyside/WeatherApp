import React from 'react';

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 text-gray-900">
    <div className="max-w-3xl mx-auto px-4 py-8">{children}</div>
  </div>
);
