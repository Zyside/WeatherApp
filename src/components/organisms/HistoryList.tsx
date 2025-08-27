import React from 'react';
import { HistoryEntry, HistoryItem } from '../molecules/HistoryItem';

export const HistoryList: React.FC<{
  items: HistoryEntry[];
  onSelect: (x: HistoryEntry) => void;
  onRemove: (x: HistoryEntry) => void;
  onClearAll: () => void;
}> = ({ items, onSelect, onRemove, onClearAll }) => (
  <section className="mb-24">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">Search history</h3>
      <button
        onClick={onClearAll}
        className="text-sm text-gray-500 hover:underline"
        disabled={!items.length}
        type="button"
      >
        Clear all
      </button>
    </div>
    {items.length === 0 ? (
      <p className="text-sm text-gray-500">No history yet. Your recent cities will appear here.</p>
    ) : (
      <ul className="space-y-2">
        {items.map((item) => (
          <HistoryItem key={item.id} item={item} onSelect={onSelect} onRemove={onRemove} />
        ))}
      </ul>
    )}
  </section>
);
