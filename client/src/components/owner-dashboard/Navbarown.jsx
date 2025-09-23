import React from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const Navbarown = () => {
  const {user} = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-3 
                    bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 shadow-md border-b border-gray-700 
                    sticky top-0 z-50 transition-all duration-300 text-white">
      
      {/* Logo - Matching Navbar styling */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 cursor-pointer" 
      >
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11 text-white drop-shadow-lg">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
            <path d="M12 14v6" />
            <path d="M12 2v6" />
            <path d="M8 12h8" />
            <path d="M16 8v8" />
            <path d="M8 8v8" />
          </svg>
          <span className="text-2xl font-extrabold text-white drop-shadow-md">
            <span className="text-yellow-300 font-pacifico">Fsn</span>rent
          </span>
        </Link>
      </motion.div>

      {/* Welcome Text - Enhanced styling */}
      <p className="text-white font-medium text-base md:text-lg">
        Welcome, <span className="text-yellow-300 font-semibold">{user?.name || "Owner"}</span>
      </p>

    </div>
  )
}

export default Navbarown