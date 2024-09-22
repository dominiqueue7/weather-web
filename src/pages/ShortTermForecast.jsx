import React, { useState, useEffect } from 'react';
import { fetchShortTermForecast } from '../utils/api';

const ShortTermForecast = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getForecastData = async () => {
      const data = await fetchShortTermForecast();
      setForecast(data);
    };
    getForecastData();
  }, []);

  if (!forecast) return <p className="text-gray-600">초단기 예보를 불러오는 중...</p>;

  const forecasts = forecast.filter(item => item.category === 'T1H');

  return (
      <div className="bg-gray-50 rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">초단기 예보</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {forecasts.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-blue-800">{item.fcstTime.slice(0, 2)}:{item.fcstTime.slice(2)}</p>
                <p className="text-lg">기온: {item.fcstValue}°C</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default ShortTermForecast;
