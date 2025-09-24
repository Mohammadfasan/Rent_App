import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const {  setShowLogin, user, isOwner, logout, setIsOwner } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const isOwnerPath = location.pathname.startsWith("/owner-dashboard");

  const changeRoles = async () => {
    try {
      const { data } = await axios.post('/api/owner/change-owner');
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner-dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing role");
    }
  };

  const handleDashboardClick = () => {
    if (isOwner) {
      navigate("/owner-dashboard");
    } else if (user) {
      changeRoles();
    } else {
      setShowLogin(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (isOwnerPath) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`fixed top-0 right-0 left-0  w-full z-50  flex items-center justify-between px-8 py-4 
      bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 
      shadow-xl backdrop-blur-md ${location.pathname === "/" ? "bg-light" : ""}`}
    >

      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={itemVariants}
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11 text-white drop-shadow-lg">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
          <path d="M12 14v6" />
          <path d="M12 2v6" />
          <path d="M8 12h8" />
          <path d="M16 8v8" />
          <path d="M8 8v8" />
        </svg>
        <span className="text-2xl font-extrabold text-white drop-shadow-md">
          <span className="text-yellow-300 font-pacifico
">Fsn</span>rent
        </span>
      </motion.div>

      

      {/* Desktop Links */}
      <motion.ul 
        variants={containerVariants}
        className="hidden md:flex items-center gap-8 text-white font-medium"
      >
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button onClick={() => navigate("/")} className="hover:text-yellow-300 transition-colors duration-300">Home</button>
        </motion.li>
        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button onClick={() => navigate("/cars")} className="hover:text-yellow-300 transition-colors duration-300">Cars</button>
        </motion.li>
        {user && (
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button onClick={() => navigate("/bookings")} className="hover:text-yellow-300 transition-colors duration-300">My Bookings</button>
          </motion.li>
        )}
      </motion.ul>

      {/* Desktop Dashboard + Login */}
      <motion.div 
        variants={containerVariants}
        className="hidden md:flex items-center gap-4"
      >
        {user && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white font-medium"
          >
            Welcome, {user.name}
          </motion.span>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDashboardClick}
          className="bg-yellow-300 text-blue-700 px-4 py-2 rounded-xl 
            hover:bg-yellow-400 shadow-md transition-transform duration-300 hover:scale-105"
        >
          {user ? (isOwner ? "Dashboard" : "List Car") : "List Car"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { user ? logout() : setShowLogin(true); }}
          className="bg-white text-blue-700 px-4 py-2 rounded-xl 
            hover:bg-gray-100 shadow-md transition-transform duration-300 hover:scale-105"
        >
          {user ? "Logout" : "Login"}
        </motion.button>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        className="md:hidden text-white" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="absolute top-full left-0 w-full z-50 overflow-hidden
              bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 
              shadow-2xl flex flex-col items-center gap-6 py-6 md:hidden backdrop-blur-md"
          >
            
            {/* Mobile Search Bar */}
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSearch} 
              className="flex items-center bg-white rounded-full px-4 py-2 w-4/5"
            >
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-800"
              />
            </motion.form>

            {user && (
              <motion.span 
                variants={itemVariants}
                className="text-white font-medium"
              >
                Welcome, {user.name}
              </motion.span>
            )}

            <motion.button variants={itemVariants} onClick={() => { navigate("/"); setIsOpen(false); }} className="text-white hover:text-yellow-300">Home</motion.button>
            <motion.button variants={itemVariants} onClick={() => { navigate("/cars"); setIsOpen(false); }} className="text-white hover:text-yellow-300">Cars</motion.button>
            {user && (
              <motion.button variants={itemVariants} onClick={() => { navigate("/bookings"); setIsOpen(false); }} className="text-white hover:text-yellow-300">My Bookings</motion.button>
            )}

            <motion.button variants={itemVariants} onClick={handleDashboardClick} className="text-white hover:text-yellow-300">
              {user ? (isOwner ? "Dashboard" : "List Car") : "List Car"}
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { user ? logout() : setShowLogin(true); setIsOpen(false); }}
              className="bg-yellow-300 text-blue-700 px-5 py-2 rounded-xl hover:bg-yellow-400 shadow-md hover:scale-105 transition-transform duration-300"
            >
              {user ? "Logout" : "Login"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}