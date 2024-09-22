import React, {useState, useEffect} from 'react';
import {ChevronDown, ChevronUp, CloudRain, Thermometer, Droplets, Wind, Cloud, Compass, Sun, Zap} from 'lucide-react';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherApp = () => {
  const [location, setLocation] = useState({lat: 55, lon: 127}); // Seoul coordinates
  const [currentWeather, setCurrentWeather] = useState(null);
  const [shortTermForecast, setShortTermForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000); // 30분마다 갱신
    return () => clearInterval(interval);
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const currentWeatherData = await fetchCurrentWeather();
      const shortTermForecastData = await fetchShortTermForecast();
      const dailyForecastData = await fetchDailyForecast();

      setCurrentWeather(currentWeatherData);
      setShortTermForecast(shortTermForecastData);
      setDailyForecast(dailyForecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchCurrentWeather = async () => {
    const baseTime = getCurrentHourBaseTime();
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=${location.lat}&ny=${location.lon}`);
    const data = await response.json();
    if (data.response && data.response.body && data.response.body.items) {
      return data.response.body.items.item;
    } else {
      throw new Error('Unexpected API response structure');
    }
  };

  const fetchShortTermForecast = async () => {
    const baseTime = getShortTermForecastBaseTime();
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${API_KEY}&numOfRows=60&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=${location.lat}&ny=${location.lon}`);
    const data = await response.json();
    if (data.response && data.response.body && data.response.body.items) {
      return data.response.body.items.item;
    } else {
      throw new Error('Unexpected API response structure');
    }
  };

  const fetchDailyForecast = async () => {
    const baseTime = getDailyForecastBaseTime();
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=${location.lat}&ny=${location.lon}`);
    const data = await response.json();
    if (data.response && data.response.body && data.response.body.items) {
      return data.response.body.items.item;
    } else {
      throw new Error('Unexpected API response structure');
    }
  };

  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  };

  const getCurrentHourBaseTime = () => {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}00`;
  };

  const getShortTermForecastBaseTime = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (minute >= 30) {
      return `${hour.toString().padStart(2, '0')}30`;
    } else {
      const prevHour = (hour - 1 + 24) % 24;
      return `${prevHour.toString().padStart(2, '0')}30`;
    }
  };

  const getDailyForecastBaseTime = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 2) return '2300';
    if (hour < 5) return '0200';
    if (hour < 8) return '0500';
    if (hour < 11) return '0800';
    if (hour < 14) return '1100';
    if (hour < 17) return '1400';
    if (hour < 20) return '1700';
    if (hour < 23) return '2000';
    return '2300';
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getSkyCondition = (code) => {
    switch (parseInt(code)) {
      case 1: return '맑음';
      case 3: return '구름많음';
      case 4: return '흐림';
      default: return '알 수 없음';
    }
  };

  const getPrecipitationType = (code) => {
    switch (parseInt(code)) {
      case 0: return '없음';
      case 1: return '비';
      case 2: return '비/눈';
      case 3: return '눈';
      case 5: return '빗방울';
      case 6: return '빗방울눈날림';
      case 7: return '눈날림';
      default: return '알 수 없음';
    }
  };

  const renderCurrentWeather = () => {
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

    return (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div className="flex items-center">
        <Thermometer className="text-red-500 mr-2"/>
        <p className="text-lg">기온: {weatherData.T1H}℃</p>
      </div>
      <div className="flex items-center">
        <CloudRain className="text-blue-500 mr-2"/>
        <p className="text-lg">강수량: {weatherData.RN1}mm</p>
      </div>
      <div className="flex items-center">
        <Cloud className="text-gray-500 mr-2"/>
        <p className="text-lg">하늘상태: {getSkyCondition(weatherData.SKY)}</p>
      </div>
      <div className="flex items-center">
        <Wind className="text-indigo-500 mr-2"/>
        <p className="text-lg">동서바람: {weatherData.UUU}m/s</p>
      </div>
      <div className="flex items-center">
        <Wind className="text-purple-500 mr-2"/>
        <p className="text-lg">남북바람: {weatherData.VVV}m/s</p>
      </div>
      <div className="flex items-center">
        <Droplets className="text-green-500 mr-2"/>
        <p className="text-lg">습도: {weatherData.REH}%</p>
      </div>
      <div className="flex items-center">
        <Sun className="text-yellow-500 mr-2"/>
        <p className="text-lg">강수형태: {getPrecipitationType(weatherData.PTY)}</p>
      </div>
      <div className="flex items-center">
        <Zap className="text-yellow-600 mr-2"/>
        <p className="text-lg">낙뢰: {weatherData.LGT}kA</p>
      </div>
      <div className="flex items-center">
        <Compass className="text-blue-600 mr-2"/>
        <p className="text-lg">풍향: {weatherData.VEC}°</p>
      </div>
      <div className="flex items-center">
        <Wind className="text-gray-500 mr-2"/>
        <p className="text-lg">풍속: {weatherData.WSD}m/s</p>
      </div>
    </div>);
  };

  const renderShortTermForecast = () => {
    if (!shortTermForecast) return <p className="text-gray-600">초단기 예보를 불러오는 중...</p>;

    const forecasts = shortTermForecast.filter(item => item.category === 'T1H');
    return (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {forecasts.map((item, index) => (<div key={index} className="bg-blue-50 p-4 rounded-lg">
        <p className="font-semibold text-blue-800">{item.fcstTime.slice(0, 2)}:{item.fcstTime.slice(2)}</p>
        <p className="text-lg">기온: {item.fcstValue}°C</p>
      </div>))}
    </div>);
  };

  const renderDailyForecast = () => {
    if (!dailyForecast) return <p className="text-gray-600">단기 예보를 불러오는 중...</p>;

    const forecasts = dailyForecast.filter(item => item.category === 'TMP' && item.fcstTime === '1200');
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {forecasts.slice(0, 3).map((item, index) => (<div key={index} className="bg-blue-50 p-4 rounded-lg">
        <p className="font-semibold text-blue-800">{getFormattedDateFromFcstDate(item.fcstDate)}</p>
        <p className="text-lg">기온: {item.fcstValue}°C</p>
      </div>))}
    </div>);
  };

  const getFormattedDateFromFcstDate = (fcstDate) => {
    const year = fcstDate.slice(0, 4);
    const month = fcstDate.slice(4, 6);
    const day = fcstDate.slice(6, 8);
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-white min-h-screen p-2">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">한국 일기예보</h1>

      <div className="bg-gray-50 rounded shadow p-3 mb-3">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">현재 날씨</h2>
        {renderCurrentWeather()}
      </div>

      <div className="bg-gray-50 rounded shadow p-3 mb-3">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">초단기 예보</h2>
        {renderShortTermForecast()}
      </div>

      <div className="bg-gray-50 rounded shadow p-3">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">단기 예보</h2>
        {renderDailyForecast()}
      </div>
    </div>
  );
};

export default WeatherApp;