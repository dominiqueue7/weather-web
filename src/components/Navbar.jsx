import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">날씨</Link>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-blue-200">현재 날씨</Link>
            <Link to="/short-term" className="text-white hover:text-blue-200">시간대별 예보</Link>
            <Link to="/daily" className="text-white hover:text-blue-200">단기 예보</Link>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
