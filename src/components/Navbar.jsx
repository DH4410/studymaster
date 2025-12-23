import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">StudyMaster</Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-600 hover:text-indigo-600">Features</Link>
        <Link to="/" className="text-gray-600 hover:text-indigo-600">Testimonials</Link>
        <Link to="/pricing" className="text-gray-600 hover:text-indigo-600">Pricing</Link>
      </div>
      <div>
        <Link to="/pricing" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;