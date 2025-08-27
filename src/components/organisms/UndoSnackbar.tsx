import React from 'react';

export const UndoSnackbar: React.FC<{
  visible: boolean;
  text: string;
  onUndo: () => void;
  onClose: () => void;
}> = ({ visible, text, onUndo, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
      <div className="flex items-center gap-4 rounded-2xl shadow-lg border bg-white px-4 py-3">
        <span className="text-sm">Removed “{text}”.</span>
        <button
          onClick={onUndo}
          className="text-blue-600 font-medium hover:underline"
          type="button"
        >
          Undo
        </button>
        <button onClick={onClose} className="text-gray-500 hover:underline" type="button">
          Dismiss
        </button>
      </div>
    </div>
  );
};
