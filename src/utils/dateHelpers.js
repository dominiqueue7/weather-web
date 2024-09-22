export const getFormattedDateFromFcstDate = (fcstDate) => {
  const year = fcstDate.slice(0, 4);
  const month = fcstDate.slice(4, 6);
  const day = fcstDate.slice(6, 8);
  return `${year}-${month}-${day}`;
};
