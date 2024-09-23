import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CurrentWeather from './pages/CurrentWeather';
import ShortTermForecast from './pages/ShortTermForecast';
import DailyForecast from './pages/DailyForecast';
import LocationSelector from './components/LocationSelector.jsx';
import { getCurrentLocation } from './utils/locationUtils';

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation().then(setLocation).catch(console.error);
  }, []);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    console.log(newLocation);
  };

  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="flex items-center space-x-4 my-4">
            <div className="flex-grow">
              <LocationSelector onLocationChange={handleLocationChange} />
            </div>
            <button
              onClick={() => getCurrentLocation().then(setLocation).catch(console.error)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              현재 위치 사용
            </button>
          </div>
          {location && (
            <Routes>
              <Route path="/" element={<CurrentWeather x={location.x} y={location.y} />} />
              <Route path="/short-term" element={<ShortTermForecast x={location.x} y={location.y} />} />
              <Route path="/daily" element={<DailyForecast x={location.x} y={location.y} />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;

