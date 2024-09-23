import React, { useState, useEffect } from 'react';
import { Thermometer, CloudRain, Cloud, Wind, Droplets, Sun, Zap, Compass } from 'lucide-react';
import { fetchShortTermForecast } from '../utils/api';
import { getSkyCondition, getPrecipitationType } from '../utils/weatherHelpers';

const ShortTermForecast = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getForecastData = async () => {
      const data = await fetchShortTermForecast();
      setForecast(data);
    };
    getForecastData();
  }, []);

  if (!forecast) return <p className="text-gray-600">시간대별 예보를 불러오는 중...</p>;

  const groupedForecasts = forecast.reduce((acc, item) => {
    if (!acc[item.fcstTime]) {
      acc[item.fcstTime] = {};
    }
    acc[item.fcstTime][item.category] = item.fcstValue;
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">시간대별 예보</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedForecasts).map(([time, data]) => (
          <div key={time} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{time.slice(0, 2)}:{time.slice(2)}</h3>
            <div className="grid grid-cols-2 gap-2">
              <WeatherItem icon={<Thermometer className="text-red-500" />} label="기온" value={`${data.T1H}°C`} />
              <WeatherItem icon={<CloudRain className="text-blue-500" />} label="강수량" value={`${data.RN1}mm`} />
              <WeatherItem icon={<Cloud className="text-gray-500" />} label="하늘상태" value={getSkyCondition(data.SKY)} />
              <WeatherItem icon={<Wind className="text-indigo-500" />} label="동서바람" value={`${data.UUU}m/s`} />
              <WeatherItem icon={<Wind className="text-purple-500" />} label="남북바람" value={`${data.VVV}m/s`} />
              <WeatherItem icon={<Droplets className="text-green-500" />} label="습도" value={`${data.REH}%`} />
              <WeatherItem icon={<Sun className="text-yellow-500" />} label="강수형태" value={getPrecipitationType(data.PTY)} />
              <WeatherItem icon={<Zap className="text-yellow-600" />} label="낙뢰" value={`${data.LGT}kA`} />
              <WeatherItem icon={<Compass className="text-blue-600" />} label="풍향" value={`${data.VEC}°`} />
              <WeatherItem icon={<Wind className="text-gray-500" />} label="풍속" value={`${data.WSD}m/s`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    {icon}
    <div className="ml-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export default ShortTermForecast;
