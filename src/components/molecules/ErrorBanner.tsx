import React from 'react';

export const ErrorBanner: React.FC<{ message?: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  if (!message) return null;
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 text-red-800 p-3 text-sm flex items-start justify-between gap-3 mb-4">
      <div className="font-medium">{message}</div>
      <button onClick={onClose} className="px-2 py-1 rounded-lg hover:bg-red-100" type="button">
        Dismiss
      </button>
    </div>
  );
};
