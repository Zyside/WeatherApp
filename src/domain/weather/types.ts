export type Place = {
  id: string;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export type Weather = {
  temp: number;
  min: number;
  max: number;
  wind: number;
  code: number;
  desc: string;
  when: string;
};
