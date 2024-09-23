import React, { useState, useEffect } from 'react';
import { fetchDailyForecast } from '../utils/api';
import { getFormattedDateFromFcstDate } from '../utils/dateHelpers';
import { getDailyPrecipitationType, getSkyCondition } from '../utils/weatherHelpers';
import { Thermometer, CloudRain, Cloud, Wind, Droplets, Sun, Compass, Snowflake } from 'lucide-react';

const DailyForecast = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getForecastData = async () => {
      const data = await fetchDailyForecast();
      setForecast(data);
    };
    getForecastData();
  }, []);

  if (!forecast) return <p className="text-gray-600">일일 예보를 불러오는 중...</p>;

  const groupForecastByDate = (forecastData) => {
    return forecastData.reduce((acc, item) => {
      if (!acc[item.fcstDate]) {
        acc[item.fcstDate] = {};
      }
      acc[item.fcstDate][item.category] = item.fcstValue;
      return acc;
    }, {});
  };

  const groupedForecasts = groupForecastByDate(forecast);
  const dates = Object.keys(groupedForecasts).slice(0, 4);  // 오늘부터 4일치

  const weatherItems = [
    { key: 'POP', label: '강수확률', unit: '%', icon: <CloudRain className="text-blue-500" /> },
    { key: 'PTY', label: '강수형태', format: (value) => getDailyPrecipitationType(value), icon: <Sun className="text-yellow-500" /> },
    { key: 'PCP', label: '1시간 강수량', unit: 'mm', icon: <CloudRain className="text-blue-500" /> },
    { key: 'REH', label: '습도', unit: '%', icon: <Droplets className="text-green-500" /> },
    { key: 'SNO', label: '1시간 신적설', unit: 'cm', icon: <Snowflake className="text-blue-300" /> },
    { key: 'SKY', label: '하늘상태', format: (value) => getSkyCondition(value), icon: <Cloud className="text-gray-500" /> },
    { key: 'TMP', label: '1시간 기온', unit: '℃', icon: <Thermometer className="text-red-500" /> },
    { key: 'TMN', label: '일 최저기온', unit: '℃', icon: <Thermometer className="text-blue-500" /> },
    { key: 'TMX', label: '일 최고기온', unit: '℃', icon: <Thermometer className="text-red-500" /> },
    { key: 'UUU', label: '풍속(동서성분)', unit: 'm/s', icon: <Wind className="text-indigo-500" /> },
    { key: 'VVV', label: '풍속(남북성분)', unit: 'm/s', icon: <Wind className="text-purple-500" /> },
    { key: 'WAV', label: '파고', unit: 'M', icon: <Wind className="text-blue-500" /> },
    { key: 'VEC', label: '풍향', unit: 'deg', icon: <Compass className="text-blue-600" /> },
    { key: 'WSD', label: '풍속', unit: 'm/s', icon: <Wind className="text-gray-500" /> },
  ];

  return (
    <div className="bg-gray-50 rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">일일 예보</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dates.map((date, index) => (
          <div key={date} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">
              {index === 0 ? '오늘' : index === 1 ? '내일' : index === 2 ? '모레' : '글피'}
              <span className="text-sm text-gray-500 ml-2">({getFormattedDateFromFcstDate(date)})</span>
            </h3>
            <div className="space-y-2">
              {weatherItems.map((item) => (
                <div key={item.key} className="flex items-center text-sm">
                  <span className="mr-2">{item.icon}</span>
                  <span className="font-medium">{item.label}:</span>{' '}
                  <span className="ml-1">
                    {item.format
                      ? item.format(groupedForecasts[date][item.key])
                      : `${groupedForecasts[date][item.key] || '-'}${item.unit || ''}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;