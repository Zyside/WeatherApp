import { Place, Weather } from './types';
import { weatherCodeToDescription } from './weatherCodes';

export const buildPlaceId = (rec: {
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
}) => [rec.name, rec.admin1 || '', rec.country || '', rec.latitude, rec.longitude].join('|');

export const mapPlace = (r: any): Place => ({
  id: buildPlaceId(r),
  name: r.name,
  country: r.country,
  admin1: r.admin1,
  latitude: r.latitude,
  longitude: r.longitude,
});

export const mapWeather = (j: any): Weather => {
  const current = j.current || {};
  const daily = j.daily || {};
  const idxToday = 0;
  return {
    temp: Number(current.temperature_2m),
    wind: Number(current.wind_speed_10m),
    code: Number(current.weather_code),
    desc: weatherCodeToDescription(Number(current.weather_code)),
    min: Number(daily.temperature_2m_min?.[idxToday] ?? NaN),
    max: Number(daily.temperature_2m_max?.[idxToday] ?? NaN),
    when: current.time || new Date().toISOString(),
  };
};
