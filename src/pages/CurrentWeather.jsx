import React, { useState, useEffect } from 'react';
import { Thermometer, CloudRain, Cloud, Wind, Droplets, Sun, Zap, Compass } from 'lucide-react';
import { fetchCurrentWeather } from '../utils/api';
import { getSkyCondition, getPrecipitationType } from '../utils/weatherHelpers';

const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchCurrentWeather();
      setCurrentWeather(data);
    };
    getWeatherData();
  }, []);

  if (!currentWeather) return <p className="text-gray-600">날씨 정보를 불러오는 중...</p>;

  const weatherData = {
    T1H: currentWeather.find(item => item.category === 'T1H')?.obsrValue,
    RN1: currentWeather.find(item => item.category === 'RN1')?.obsrValue,
    SKY: currentWeather.find(item => item.category === 'SKY')?.obsrValue,
    UUU: currentWeather.find(item => item.category === 'UUU')?.obsrValue,
    VVV: currentWeather.find(item => item.category === 'VVV')?.obsrValue,
    REH: currentWeather.find(item => item.category === 'REH')?.obsrValue,
    PTY: currentWeather.find(item => item.category === 'PTY')?.obsrValue,
    LGT: currentWeather.find(item => item.category === 'LGT')?.obsrValue,
    VEC: currentWeather.find(item => item.category === 'VEC')?.obsrValue,
    WSD: currentWeather.find(item => item.category === 'WSD')?.obsrValue,
  };

  return (
      <div className="bg-gray-50 rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">현재 날씨</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WeatherItem icon={<Thermometer className="text-red-500" />} label="기온" value={`${weatherData.T1H}℃`} />
          <WeatherItem icon={<CloudRain className="text-blue-500" />} label="강수량" value={`${weatherData.RN1}mm`} />
          <WeatherItem icon={<Cloud className="text-gray-500" />} label="하늘상태" value={getSkyCondition(weatherData.SKY)} />
          <WeatherItem icon={<Wind className="text-indigo-500" />} label="동서바람" value={`${weatherData.UUU}m/s`} />
          <WeatherItem icon={<Wind className="text-purple-500" />} label="남북바람" value={`${weatherData.VVV}m/s`} />
          <WeatherItem icon={<Droplets className="text-green-500" />} label="습도" value={`${weatherData.REH}%`} />
          <WeatherItem icon={<Sun className="text-yellow-500" />} label="강수형태" value={getPrecipitationType(weatherData.PTY)} />
          <WeatherItem icon={<Zap className="text-yellow-600" />} label="낙뢰" value={weatherData.LGT !== undefined ? `${weatherData.LGT}kA` : "정보없음"} />
          <WeatherItem icon={<Compass className="text-blue-600" />} label="풍향" value={`${weatherData.VEC}°`} />
          <WeatherItem icon={<Wind className="text-gray-500" />} label="풍속" value={`${weatherData.WSD}m/s`} />
        </div>
      </div>
  );
};

const WeatherItem = ({ icon, label, value }) => (
    <div className="flex items-center bg-white p-4 rounded-lg shadow">
      {icon}
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
);

export default CurrentWeather;
