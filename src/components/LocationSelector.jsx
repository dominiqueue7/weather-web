import React, { useState, useEffect } from 'react';
import { getCities, getDistricts, getDongs, getLocationInfo } from '../utils/locationData';

const LocationSelector = ({ onLocationChange }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dongs, setDongs] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  useEffect(() => {
    setCities(getCities());
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setDistricts(getDistricts(selectedCity));
      setSelectedDistrict('');
      setSelectedDong('');
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      setDongs(getDongs(selectedCity, selectedDistrict));
      setSelectedDong('');
    }
  }, [selectedCity, selectedDistrict]);

  useEffect(() => {
    if (selectedCity) {
      const locationInfo = getLocationInfo(selectedCity, selectedDistrict, selectedDong);
      onLocationChange(locationInfo);
    }
  }, [selectedCity, selectedDistrict, selectedDong, onLocationChange]);

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option value="">시/도 선택</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
        disabled={!selectedCity}
      >
        <option value="">시/군/구 선택</option>
        {districts.map((district) => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
      <select
        value={selectedDong}
        onChange={(e) => setSelectedDong(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
        disabled={!selectedDistrict}
      >
        <option value="">읍/면/동 선택</option>
        {dongs.map((dong) => (
          <option key={dong} value={dong}>{dong}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;