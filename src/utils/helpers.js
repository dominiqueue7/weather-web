export const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getFormattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
};

export const getCurrentHourBaseTime = () => {
  const date = new Date();
  return `${date.getHours().toString().padStart(2, '0')}00`;
};

export const getShortTermForecastBaseTime = () => {
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

export const getDailyForecastBaseTime = () => {
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
