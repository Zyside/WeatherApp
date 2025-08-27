import React from 'react';
import { Card } from '../atoms/Card';
import { Weather, Place } from '../../domain/weather/types';

export const WeatherCard: React.FC<{
  place: Place;
  weather: Weather;
  temp: { t: number; tmin: number; tmax: number; unitSymbol: string };
}> = ({ place, weather, temp }) => (
  <section className="mb-6">
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {[place.name, place.admin1, place.country].filter(Boolean).join(', ')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Updated: {new Date(weather.when).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold leading-none">
            {Math.round(temp.t)}
            <span className="text-2xl align-top ml-1">{temp.unitSymbol}</span>
          </div>
          <div className="text-gray-600 mt-1">{weather.desc}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="rounded-2xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Min</div>
          <div className="text-lg font-medium">
            {Math.round(temp.tmin)}
            {temp.unitSymbol}
          </div>
        </div>
        <div className="rounded-2xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Max</div>
          <div className="text-lg font-medium">
            {Math.round(temp.tmax)}
            {temp.unitSymbol}
          </div>
        </div>
        <div className="rounded-2xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Wind</div>
          <div className="text-lg font-medium">{Math.round(weather.wind)} km/h</div>
        </div>
        <div className="rounded-2xl bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Code</div>
          <div className="text-lg font-medium">{weather.code}</div>
        </div>
      </div>
    </Card>
  </section>
);
