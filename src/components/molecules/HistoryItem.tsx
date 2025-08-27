import React from 'react';
import { Place } from '../../domain/weather/types';

export type HistoryEntry = Place & {
  label: string;
};

export const HistoryItem: React.FC<{
  item: HistoryEntry;
  onSelect: (x: HistoryEntry) => void;
  onRemove: (x: HistoryEntry) => void;
}> = ({ item, onSelect, onRemove }) => (
  <li className="group flex items-center justify-between gap-2 rounded-xl border p-2 hover:bg-gray-50">
    <button
      onClick={() => onSelect(item)}
      className="text-left flex-1 truncate"
      title={item.label}
      aria-label={`Load weather for ${item.label}`}
      type="button"
    >
      {item.label}
    </button>
    <button
      onClick={() => onRemove(item)}
      className="opacity-60 group-hover:opacity-100 px-2 py-1 rounded-lg hover:bg-gray-100"
      aria-label={`Remove ${item.label} from history`}
      type="button"
    >
      ✕
    </button>
  </li>
);
