import React from 'react'
import { Link } from 'react-router-dom';
import { assets, dummyCarData } from '../../assets/assets';

const Navbarown = () => {
  const user = dummyCarData;

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-3 
                    bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 shadow-md border-b border-gray-200 
                    sticky top-0 z-50 transition-all duration-300 text-white">
      
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* Welcome Text */}
      <p className="text-white font-medium text-base">
        Welcome, <span className="text-primary font-semibold">{user.name || "Owner"}</span>
      </p>

     
    </div>
  )
}

export default Navbarown
