import React from "react";
import { Button } from "../atoms/Button";


interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}


export const SearchBar: React.FC<Props> = ({ value, onChange, onSubmit, loading }) => (
  <form
    onSubmit={(e) => {
  e.preventDefault();
  onSubmit();
}}
className="flex gap-2 mb-4"
>
<input
  value={value}
onChange={(e) => onChange(e.target.value)}
placeholder="Enter a city (e.g., Berlin)"
className="flex-1 px-4 py-3 rounded-2xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
aria-label="City name"
/>
<Button type="submit" disabled={loading}>{loading ? "Searching…" : "Search"}</Button>
  </form>
);
