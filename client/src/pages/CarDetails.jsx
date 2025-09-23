import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { cars, axios, pickupDate, returnDate, setPickupDate, setReturnDate } = useAppContext();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cars && cars.length > 0) {
      const foundCar = cars.find(car => car._id === id);
      setCar(foundCar);
    }
  }, [cars, id]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post('/api/booking/create', {
        car: id,
        pickupDate,
        returnDate
      });
      
      if (data.success) {
        toast.success(data.message);
        navigate('/bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950">
        <h1 className="text-3xl font-bold text-red-500">Car not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 py-8">
      {/* Background Effects like Hero Section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-indigo-500/15 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjIyIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 mt-12 px-6 md:px-16 lg:px-24 xl:px-32">
        
        {/* Left: Car Image & Details with Dark Theme */}
        <div className="lg:flex-1 space-y-6">
          {/* Car Image with Hero-like Animation */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ x: "100%", scale: 0.8, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {/* Floating Particles like Hero */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 10}s`
                  }}
                ></div>
              ))}
            </div>
          </motion.div>

          {/* Title Section */}
          <motion.div 
            className="space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-white">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-300 text-lg">
              {car.category} · {car.year}
            </p>
          </motion.div>

          {/* Features Grid with Dark Theme */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity || car.seats || 4} Seats`, color: "blue" },
              { icon: assets.fuel_icon, text: car.fuel_type || "Petrol", color: "green" },
              { icon: assets.car_icon, text: car.transmission || "Automatic", color: "purple" },
              { icon: assets.location_icon, text: car.location, color: "orange" }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-700/50"
              >
                <div className={`p-2 rounded-full bg-${feature.color}-900/30 mb-2`}>
                  <img src={feature.icon} alt={feature.text} className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-200 text-center">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-gray-300 mt-4 leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {car.description}
          </motion.p>

          {/* Car Features */}
          <motion.div 
            className="mt-6 lg:mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h1 className="text-2xl font-bold text-white mb-4">
              Car Features
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Air Conditioning", "Leather Seats", "Bluetooth Connectivity", "Backup Camera", "GPS Navigation", "Sunroof"].map((feature, index) => (
                <div
                  key={index}
                  className="text-gray-200 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-700/60 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-700/30"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Booking Card with Dark Glass Morphism */}
        <motion.div
          className="lg:w-1/3 bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl space-y-6 lg:sticky lg:top-8 lg:max-h-[500px] border border-gray-700/50"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          {/* Price Section */}
          <motion.div 
            className="text-center"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-3xl font-bold text-white">
              ${car.pricePerDay}{" "}
              <span className="text-gray-400 text-lg font-normal">/ day</span>
            </p>
            <p className="text-gray-400 text-sm mt-1">Inclusive of all taxes</p>
          </motion.div>

          {/* Date Inputs */}
          <div className="space-y-4">
            <div>
              <label className="text-gray-300 font-medium text-sm mb-2 block">Pickup Date</label>
              <input
                type="date"
                className="w-full bg-gray-800/70 border border-gray-600/50 rounded-xl px-4 py-3 text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
                transition-all duration-200"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <label className="text-gray-300 font-medium text-sm mb-2 block">Return Date</label>
              <input
                type="date"
                className="w-full bg-gray-800/70 border border-gray-600/50 rounded-xl px-4 py-3 text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/50 
                transition-all duration-200"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          {/* Total Price Calculation */}
          {pickupDate && returnDate && (
            <motion.div 
              className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-xl border border-blue-500/20"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-gray-300">
                Total for {Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))} days:
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                ${Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)) * car.pricePerDay}
              </p>
            </motion.div>
          )}

          {/* Book Button */}
          <motion.button 
            onClick={HandleSubmit} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:bg-gray-700 disabled:transform-none relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Book Now
                </>
              )}
            </span>
          </motion.button>

          <p className="text-gray-400 text-sm text-center">
            ✓ No credit card required to reserve<br />
            ✓ Free cancellation within 24 hours
          </p>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        }
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CarDetails;