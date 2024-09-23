import { getFormattedDate, getCurrentHourBaseTime, getShortTermForecastBaseTime, getDailyForecastBaseTime } from './helpers';

export const fetchCurrentWeather = async (x, y) => {
  const baseTime = getCurrentHourBaseTime();
  const response = await fetch(`/api/current/&numOfRows=10&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=${x}&ny=${y}`);
  const data = await response.json();
  if (data.response && data.response.body && data.response.body.items) {
    return data.response.body.items.item;
  } else {
    throw new Error('Unexpected API response structure');
  }
};

export const fetchShortTermForecast = async (x, y) => {
  const baseTime = getShortTermForecastBaseTime();
  const response = await fetch(`/api/short-term/&numOfRows=60&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=${x}&ny=${y}`);
  const data = await response.json();
  if (data.response && data.response.body && data.response.body.items) {
    return data.response.body.items.item;
  } else {
    throw new Error('Unexpected API response structure');
  }
};

export const fetchDailyForecast = async (x, y) => {
  const baseTime = getDailyForecastBaseTime();
  const response = await fetch(`/api/daily/&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${getFormattedDate()}&base_time=${baseTime}&nx=${x}&ny=${y}`);
  const data = await response.json();
  if (data.response && data.response.body && data.response.body.items) {
    return data.response.body.items.item;
  } else {
    throw new Error('Unexpected API response structure');
  }
};
