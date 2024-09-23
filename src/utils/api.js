import { API_KEY, getFormattedDate, getCurrentHourBaseTime, getShortTermForecastBaseTime, getDailyForecastBaseTime } from './helpers';

const BASE_URL = '/api';

export const fetchCurrentWeather = async () => {
  const baseTime = getCurrentHourBaseTime();
  const response = await fetch(`${BASE_URL}/getUltraSrtNcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=55&ny=127`);
  const data = await response.json();
  if (data.response && data.response.body && data.response.body.items) {
    return data.response.body.items.item;
  } else {
    throw new Error('Unexpected API response structure');
  }
};

export const fetchShortTermForecast = async () => {
  const baseTime = getShortTermForecastBaseTime();
  const response = await fetch(`${BASE_URL}/getUltraSrtFcst?serviceKey=${API_KEY}&numOfRows=60&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=55&ny=127`);
  const data = await response.json();
  if (data.response && data.response.body && data.response.body.items) {
    return data.response.body.items.item;
  } else {
    throw new Error('Unexpected API response structure');
  }
};

export const fetchDailyForecast = async () => {
  const baseTime = getDailyForecastBaseTime();
  const response = await fetch(`${BASE_URL}/getVilageFcst?serviceKey=${API_KEY}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=55&ny=127`);
  const data = await response.json();
  if (data.response && data.response.body && data.response.body.items) {
    return data.response.body.items.item;
  } else {
    throw new Error('Unexpected API response structure');
  }
};
