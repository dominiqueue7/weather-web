import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">날씨</Link>
          <div className="space-x-4">
            <Link to="/forecast" className="text-white hover:text-blue-200">현재 날씨</Link>
            <Link to="/forecast/short-term" className="text-white hover:text-blue-200">초단기 예보</Link>
            <Link to="/forecast/daily" className="text-white hover:text-blue-200">단기 예보</Link>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
