import React from 'react';
import { Place } from '../../domain/weather/types';

export const MatchesList: React.FC<{ matches: Place[]; onPick: (p: Place) => void }> = ({
  matches,
  onPick,
}) => {
  if (!matches.length) return null;
  return (
    <section className="mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Other matches</h3>
      <ul className="grid sm:grid-cols-2 gap-2">
        {matches.map((match) => (
          <li key={match.id}>
            <button
              onClick={() => onPick(match)}
              className="w-full text-left rounded-xl border bg-white p-3 hover:bg-gray-50"
              type="button"
            >
              {[match.name, match.admin1, match.country].filter(Boolean).join(', ')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
