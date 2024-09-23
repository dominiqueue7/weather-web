import {locationData} from "./locationData.js";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구의 반경 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const getNearestLocation = (latitude, longitude) => {
  return locationData.reduce((nearest, location) => {
    const distance = getDistance(latitude, longitude, location.latitude, location.longitude);
    return distance < nearest.distance ? { ...location, distance } : nearest;
  }, { distance: Infinity });
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const nearestLocation = getNearestLocation(latitude, longitude);
            resolve(nearestLocation);
          },
          (error) => {
            reject(error);
          }
      );
    }
  });
};