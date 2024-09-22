import React, { useState, useEffect } from 'react';
import { fetchDailyForecast } from '../utils/api';
import { getFormattedDateFromFcstDate } from '../utils/dateHelpers';

const DailyForecast = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getForecastData = async () => {
      const data = await fetchDailyForecast();
      setForecast(data);
    };
    getForecastData();
  }, []);

  if (!forecast) return <p className="text-gray-600">단기 예보를 불러오는 중...</p>;

  const forecasts = forecast.filter(item => item.category === 'TMP' && item.fcstTime === '1200');

  return (
      <div className="bg-gray-50 rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">단기 예보</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecasts.slice(0, 3).map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="font-semibold text-blue-800">{getFormattedDateFromFcstDate(item.fcstDate)}</p>
                <p className="text-lg">기온: {item.fcstValue}°C</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default DailyForecast;
