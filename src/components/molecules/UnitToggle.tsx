import React from 'react';

interface Props {
  unit: 'C' | 'F';
  onChange: (u: 'C' | 'F') => void;
}

export const UnitToggle: React.FC<Props> = ({ unit, onChange }) => (
  <div className="flex items-center gap-2">
    <label className="text-sm" htmlFor="buttons-wrapper">
      Units:
    </label>
    <div className="grid grid-cols-2 rounded-xl border overflow-hidden" id="buttons-wrapper">
      <button
        className={`px-3 py-1 ${unit === 'C' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => onChange('C')}
        aria-pressed={unit === 'C'}
        type="button"
      >
        °C
      </button>
      <button
        className={`px-3 py-1 ${unit === 'F' ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
        onClick={() => onChange('F')}
        aria-pressed={unit === 'F'}
        type="button"
      >
        °F
      </button>
    </div>
  </div>
);
