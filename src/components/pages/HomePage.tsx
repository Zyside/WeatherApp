import React, { useMemo, useRef, useState } from 'react';
import { UnitToggle } from '../molecules/UnitToggle';
import { SearchBar } from '../molecules/SearchBar';
import { Spinner } from '../atoms/Spinner';
import { ErrorBanner } from '../molecules/ErrorBanner';
import { WeatherCard } from '../organisms/WeatherCard';
import { HistoryList } from '../organisms/HistoryList';
import { UndoSnackbar } from '../organisms/UndoSnackbar';
import { Place, Weather } from '../../domain/weather/types';
import { geocodeCity, fetchWeather } from '../../domain/weather/weatherService';
import { cToF } from '../../shared/utils/format';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import { MatchesList } from '../organisms/MatchesList';

export const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useLocalStorage<'C' | 'F'>('weather.unit.v1', 'C');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState<Place | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [matches, setMatches] = useState<Place[]>([]);
  const [history, setHistory] = useLocalStorage<Array<Place & { label: string }>>(
    'weather.history.v1',
    [],
  );

  const undoTimer = useRef<number | null>(null);
  const lastRemovedRef = useRef<{ item: any; index: number } | null>(null);
  const [undoVisible, setUndoVisible] = useState(false);
  const [undoText, setUndoText] = useState('');

  const abortRef = useRef<AbortController | null>(null);
  function resetAbort() {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    return abortRef.current;
  }

  async function handleSearch() {
    const q = query.trim();
    setError('');
    setMatches([]);
    if (!q) return;

    const ctrl = resetAbort();
    setLoading(true);
    try {
      const results = await geocodeCity(q, ctrl.signal);
      if (!results.length) throw new Error('No matching cities found.');
      setMatches(results.slice(1));
      const best = results[0];
      await loadPlace(best, { addToHistory: true, signal: ctrl.signal });
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setError(err?.message || 'Something went wrong.');
      setPlace(null);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadPlace(
    place: Place,
    { addToHistory = false, signal }: { addToHistory?: boolean; signal?: AbortSignal } = {},
  ) {
    setError('');
    setPlace(place);
    try {
      const w = await fetchWeather(place.latitude, place.longitude, signal);
      setWeather(w);
      if (addToHistory) {
        const label = [place.name, place.admin1, place.country].filter(Boolean).join(', ');
        const entry = { ...place, label };
        setHistory((prevHistory) => {
          const ids = new Set(prevHistory.map((x) => x.id));
          const arr = ids.has(entry.id) ? prevHistory : [entry, ...prevHistory];
          return arr.slice(0, 12);
        });
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setError(err?.message || 'Failed to load weather.');
      setWeather(null);
    }
  }

  function removeHistory(item: { id: string; label: string }) {
    setHistory((h) => {
      const idx = h.findIndex((x) => x.id === item.id);
      if (idx === -1) return h;
      const clone = h.slice();
      clone.splice(idx, 1);
      lastRemovedRef.current = { item, index: idx };
      setUndoText(item.label);
      setUndoVisible(true);
      if (undoTimer.current) window.clearTimeout(undoTimer.current);
      undoTimer.current = window.setTimeout(() => setUndoVisible(false), 6000);
      return clone;
    });
  }

  function undoRemove() {
    const last = lastRemovedRef.current;
    if (!last) return;
    setHistory((prevHistory) => {
      const clone = prevHistory.slice();
      clone.splice(last.index, 0, last.item);
      return clone;
    });
    setUndoVisible(false);
    lastRemovedRef.current = null;
  }

  function clearAllHistory() {
    if (!history.length) return;
    if (!confirm('Clear all search history?')) return;
    setHistory([]);
  }

  const tempDisplay = useMemo(() => {
    if (!weather) return null;
    const toF = unit === 'F';
    const t = toF ? cToF(weather.temp) : weather.temp;
    const tmin = toF ? cToF(weather.min) : weather.min;
    const tmax = toF ? cToF(weather.max) : weather.max;
    return { t, tmin, tmax, unitSymbol: unit === 'F' ? '°F' : '°C' };
  }, [weather, unit]);

  return (
    <>
      <header className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Weather Forecast</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} loading={loading} />

      <ErrorBanner message={error} onClose={() => setError('')} />

      {loading && (
        <div className="mb-6">
          <Spinner />
        </div>
      )}

      {place && weather && tempDisplay && (
        <WeatherCard place={place} weather={weather} temp={tempDisplay} />
      )}

      {matches.length > 0 && (
        <div className="mb-6">
          <MatchesList matches={matches} onPick={(place) => loadPlace(place)} />
        </div>
      )}

      <HistoryList
        items={history}
        onSelect={(it) => loadPlace(it)}
        onRemove={removeHistory}
        onClearAll={clearAllHistory}
      />

      <UndoSnackbar
        visible={undoVisible}
        text={undoText}
        onUndo={undoRemove}
        onClose={() => setUndoVisible(false)}
      />
    </>
  );
};
