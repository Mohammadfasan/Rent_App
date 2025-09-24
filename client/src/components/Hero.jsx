import React, { useState } from "react";
import carImage from "../assets/car.png";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

export default function Hero() {
  const [location, setLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location || !pickupDate || !returnDate) {
      alert("Please fill all fields");
      return;
    }
    navigate(`/cars?location=${location}&pickupDate=${pickupDate}&returnDate=${returnDate}`);
  };

  // Animation variants for heading letters
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // delay between letters
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.5 },
    },
  };

  const headingText = "Pick Your Dream Ride";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center 
      px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/40 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/40 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute inset-0 bg-radial-gradient at-center from-transparent via-blue-900/5 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
        <div className="text-center mb-10 sm:mb-12">
          {/* Letter-by-letter animated heading */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold text-center drop-shadow-xl mt-32"
          >
            {headingText.split(" ").map((word, wi) => (
              <span key={wi} className="mr-2">
                {word.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letter}
                    className={
                      word === "Dream" || word === "Ride"
                        ? "text-white font-extrabold"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-extrabold "
                    }
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Discover the perfect car for your journey with our premium selection of vehicles
          </motion.p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-4xl 
          grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7
          border border-gray-800/50
          transition-all duration-300 transform hover:scale-[1.01] hover:shadow-blue-500/30"
        >
          {/* Pickup Location */}
          <div className="flex flex-col text-sm w-full">
            <label className="font-semibold mb-2 text-gray-300 flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pickup Location
            </label>
            <select
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-800/70 border border-gray-700/50 rounded-xl px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
              transition-all duration-200 shadow-inner"
            >
              <option value="">Please select a location</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col text-sm w-full">
            <label className="font-semibold mb-2 text-gray-300 flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Pick-up Date
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="bg-gray-800/70 border border-gray-700/50 rounded-xl px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
              transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col text-sm w-full">
            <label className="font-semibold mb-2 text-gray-300 flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Return Date
            </label>
            <input
              type="date"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="bg-gray-800/70 border border-gray-700/50 rounded-xl px-4 py-3 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
              transition-all duration-200 shadow-inner"
            />
          </div>

          {/* Search Button */}
          <div className="col-span-1 md:col-span-3 flex justify-center mt-6">
            <button
              type="submit"
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-10 rounded-xl
              flex items-center justify-center gap-2 group
              hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ease-in-out
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="relative">Search Vehicles</span>
            </button>
          </div>
        </form>

        {/* Animated Car */}
        <div className="relative mt-14 w-full max-w-5xl group overflow-hidden">
          <motion.img
            src={carImage}
            alt="Luxury Car"
            className="w-full h-auto drop-shadow-2xl"
            initial={{ x: "100%", scale: 0.5, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Light glow behind car */}
          <div className="absolute -z-10 inset-0 flex justify-center items-center">
            <div className="w-[80%] h-[40%] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full animate-pulse-slow group-hover:scale-110 transition-transform duration-1000"></div>
          </div>

          {/* Floating particles */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/70 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        }
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        .bg-radial-gradient {
          background-image: radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(59, 130, 246, 0.05) 100%);
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}