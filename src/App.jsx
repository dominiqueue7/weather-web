import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CurrentWeather from './pages/CurrentWeather';
import ShortTermForecast from './pages/ShortTermForecast';
import DailyForecast from './pages/DailyForecast';

function App() {
  return (
      <Router>
        <div className="bg-white min-h-screen">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<CurrentWeather />} />
              <Route path="/short-term" element={<ShortTermForecast />} />
              <Route path="/daily" element={<DailyForecast />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;

