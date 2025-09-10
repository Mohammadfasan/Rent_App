import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar({ setShowLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    // The 'fixed top-0 w-full z-50' classes make the navbar sticky at the top of the viewport.
    <nav className={`sticky top-0 w-full z-50 relative flex items-center justify-between px-8 py-4 
      bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 
      shadow-xl backdrop-blur-md ${location.pathname === "/" ? "bg-light" : ""}`}>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11 text-white drop-shadow-lg">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
          <path d="M12 14v6" />
          <path d="M12 2v6" />
          <path d="M8 12h8" />
          <path d="M16 8v8" />
          <path d="M8 8v8" />
        </svg>
        <span className="text-2xl font-extrabold text-white drop-shadow-md">
          <span className="text-yellow-300">Wheel</span>ify
        </span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 text-white font-medium">
        <li><button onClick={() => navigate("/")} className="hover:text-yellow-300 transition-colors duration-300">Home</button></li>
        <li><button onClick={() => navigate("/cars")} className="hover:text-yellow-300 transition-colors duration-300">Cars</button></li>
        <li><button onClick={() => navigate("/bookings")} className="hover:text-yellow-300 transition-colors duration-300">My Bookings</button></li>
      </ul>

      {/* Search (Desktop only) */}
      <div className="hidden md:flex items-center border border-white/30 rounded-full 
        px-3 py-1 shadow-md bg-white/10 backdrop-blur-sm">
        <input type="text" placeholder="Search cars..." 
          className="outline-none px-2 text-sm text-white bg-transparent placeholder-gray-300" />
        <button className="text-white">🔍</button>
      </div>

      {/* Desktop Dashboard + Login */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => navigate("/owner-dashboard")}
          className="text-white font-medium hover:text-yellow-300 transition-colors duration-300"
        >
          Dashboard
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-yellow-300 text-blue-700 px-4 py-2 rounded-xl 
            hover:bg-yellow-400 shadow-md transition-transform duration-300 hover:scale-105"
        >
          Login
        </button>
      </div>

      {/* Mobile Menu Button - Toggles the `isOpen` state */}
      <button className="sm:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown - Conditionally rendered based on `isOpen` state */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50
          bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 
          shadow-2xl flex flex-col items-center gap-6 py-6 block md:hidden backdrop-blur-md">
          <button onClick={() => { navigate("/"); setIsOpen(false); }} className="text-white hover:text-yellow-300">Home</button>
          <button onClick={() => { navigate("/cars"); setIsOpen(false); }} className="text-white hover:text-yellow-300">Cars</button>
          <button onClick={() => { navigate("/bookings"); setIsOpen(false); }} className="text-white hover:text-yellow-300">My Bookings</button>
          <button onClick={() => { navigate("/owner-dashboard"); setIsOpen(false); }} className="text-white hover:text-yellow-300">Dashboard</button>
          <button
            onClick={() => { setShowLogin(true); setIsOpen(false); }}
            className="bg-yellow-300 text-blue-700 px-5 py-2 rounded-xl hover:bg-yellow-400 shadow-md hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
