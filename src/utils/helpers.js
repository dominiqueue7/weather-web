export const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getFormattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
};

export const getCurrentHourBaseTime = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  // 현재 시간이 정각으로부터 11분 이내인 경우, 이전 시간의 데이터를 사용
  if (minutes < 10) {
    const previousHour = (hours - 1 + 24) % 24; // 자정을 넘어가는 경우를 처리
    return `${previousHour.toString().padStart(2, '0')}00`;
  }

  return `${hours.toString().padStart(2, '0')}00`;
};

export const getShortTermForecastBaseTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (minute < 45) {
    // 현재 시간이 45분 이전이면, 이전 시간의 30분 데이터를 사용
    const prevHour = (hour - 1 + 24) % 24;
    return `${prevHour.toString().padStart(2, '0')}30`;
  } else {
    // 현재 시간이 45분 이후면, 현재 시간의 30분 데이터를 사용
    return `${hour.toString().padStart(2, '0')}30`;
  }
};

export const getDailyForecastBaseTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (hour === 23 && minute >= 10) return '2300';
  if (hour < 2 || (hour === 2 && minute < 10)) return '2300';
  if (hour < 5 || (hour === 5 && minute < 10)) return '0200';
  if (hour < 8 || (hour === 8 && minute < 10)) return '0500';
  if (hour < 11 || (hour === 11 && minute < 10)) return '0800';
  if (hour < 14 || (hour === 14 && minute < 10)) return '1100';
  if (hour < 17 || (hour === 17 && minute < 10)) return '1400';
  if (hour < 20 || (hour === 20 && minute < 10)) return '1700';
  if (hour < 23 || (hour === 23 && minute < 10)) return '2000';

  // 이 줄에 도달하면 오류가 있는 것이므로, 기본값으로 가장 최근의 예보 시간을 반환
  console.error('Unexpected time in getDailyForecastBaseTime');
  return '2300';

};
