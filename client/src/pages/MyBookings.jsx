import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const { axios } = useAppContext();

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/booking/user-bookings');
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        toast.error(data.message || 'Failed to fetch bookings');
        setBookings([]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingId(bookingId);
      const { data } = await axios.delete('/api/booking/delete', {
        data: { bookingId }
      });

      if (data.success) {
        toast.success('Booking cancelled successfully');
        // Refresh the bookings list
        fetchMyBookings();
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.4
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (loading) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto py-10 min-h-screen"
      >
        <motion.div variants={itemVariants}>
          <Title title="My Bookings" subTitle="Manage your bookings" />
        </motion.div>
        
        <motion.div
          variants={loadingVariants}
          className="text-center py-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white text-xl"
          >
            Loading your bookings...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 mt-2"
          >
            Please wait while we fetch your booking details
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto py-10 min-h-screen"
    >
      <motion.div variants={itemVariants}>
        <Title title="My Bookings" subTitle="Manage your bookings" />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
        <AnimatePresence mode="wait">
          {bookings.length > 0 ? (
            <motion.div
              key="bookings-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 md:space-y-8"
            >
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id || index}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  variant={cardHoverVariants}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-4 md:p-6"
                >
                  {/* Car Image + Details */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={booking.car?.image}
                      alt={booking.car?.model || "Car"}
                      className="w-full h-40 md:h-44 rounded-xl object-cover mb-4 shadow-lg"
                    />
                    <motion.p 
                      whileHover={{ color: "#ffffff" }}
                      className="text-xl font-bold text-white mb-1"
                    >
                      {booking.car?.brand} {booking.car?.model}
                    </motion.p>
                    <motion.p 
                      whileHover={{ color: "#d1d5db" }}
                      className="text-sm text-gray-400"
                    >
                      {booking.car?.year} · {booking.car?.category} · {booking.car?.location}
                    </motion.p>
                  </motion.div>

                  {/* Booking Info */}
                  <motion.div 
                    className="col-span-1 md:col-span-2 flex flex-col gap-5"
                    variants={containerVariants}
                  >
                    <motion.div 
                      variants={itemVariants}
                      className="flex flex-wrap items-center gap-2 md:gap-4"
                    >
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 text-xs font-medium bg-gray-800 text-gray-300 rounded-full"
                      >
                        Booking #{index + 1}
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                          booking.status === 'confirmed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : booking.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : booking.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : booking.status === 'completed'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {booking.status || "pending"}
                      </motion.span>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <motion.img
                        whileHover={{ rotate: 360 }}
                        src={assets.calendar_icon_colored}
                        alt="calendar"
                        className="w-6 h-6 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm text-gray-400">Rental Period</p>
                        <p className="text-base font-semibold text-white">
                          {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : "N/A"} →{" "}
                          {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <motion.img
                        whileHover={{ scale: 1.2 }}
                        src={assets.location_icon}
                        alt="location"
                        className="w-6 h-6 flex-shrink-0 filter invert"
                      />
                      <div>
                        <p className="text-sm text-gray-400">Pick-up Location</p>
                        <p className="text-base font-semibold text-white">{booking.car?.location || "N/A"}</p>
                      </div>
                    </motion.div>

                    {booking.owner && (
                      <motion.div 
                        variants={itemVariants}
                        className="flex items-start gap-3"
                      >
                        <motion.img
                          whileHover={{ scale: 1.2 }}
                          src={assets.user_icon}
                          alt="owner"
                          className="w-6 h-6 flex-shrink-0 filter invert"
                        />
                        <div>
                          <p className="text-sm text-gray-400">Car Owner</p>
                          <p className="text-base font-semibold text-white">{booking.owner.name || "N/A"}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Price Section */}
                  <motion.div 
                    variants={itemVariants}
                    className="md:col-span-1 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-700/50 pt-4 md:pt-0 md:pl-6"
                  >
                    <div>
                      <p className="text-sm text-gray-400">Total Price</p>
                      <motion.h1 
                        whileHover={{ scale: 1.1 }}
                        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                      >
                        ${booking.price || "N/A"}
                      </motion.h1>
                      <p className="text-xs text-gray-500 mt-1">
                        Booked on {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <motion.div 
                      variants={containerVariants}
                      className="mt-4 space-y-2"
                    >
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        View Details
                      </motion.button>
                      {booking.status === 'pending' && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="w-full px-4 py-2 bg-red-600/80 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cancellingId === booking._id ? (
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Cancelling...
                            </motion.span>
                          ) : (
                            'Cancel Booking'
                          )}
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-bookings"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                📋
              </motion.div>
              <motion.p 
                className="text-gray-300 text-xl mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You don't have any bookings yet.
              </motion.p>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Book your first car to see it here!
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => window.location.href = '/cars'}
              >
                Browse Cars
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MyBookings;