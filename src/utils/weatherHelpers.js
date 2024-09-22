export const getSkyCondition = (code) => {
  switch (parseInt(code)) {
    case 1: return '맑음';
    case 3: return '구름많음';
    case 4: return '흐림';
    default: return '정보없음';
  }
};

export const getPrecipitationType = (code) => {
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
