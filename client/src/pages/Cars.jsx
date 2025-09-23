import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Card from '../components/Cards'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from "../context/AppContext"
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Cars = () => {
  const [input, setInput] = useState('')
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('location')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')
  
  const { cars, axios } = useAppContext()
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(false)

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const searchCarAvailability = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/booking/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate
      })
      
      if (data.success) {
        setFilteredCars(data.data || [])
        if (data.data && data.data.length === 0) {
          toast('No Cars Available')
        }
      } else {
        toast.error(data.message || 'Failed to search cars')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const applyFilter = () => {
    setFilteredCars(cars);
  }

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else if (cars.length > 0) {
      applyFilter();
    }
  }, [isSearchData, pickupLocation, pickupDate, returnDate, cars.length]);

  // Filter cars based on search input
  const displayedCars = filteredCars.filter(car =>
    car.brand?.toLowerCase().includes(input.toLowerCase()) ||
    car.model?.toLowerCase().includes(input.toLowerCase()) ||
    car.category?.toLowerCase().includes(input.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

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
    }
  }

  const searchBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center py-20 max-md:px-4 min-h-screen"
    >
      {/* Title Section */}
      <motion.div variants={itemVariants} className="w-full">
        <Title
          title="Available Cars"
          subTitle="Choose your favorite car from our premium collection."
        />
      </motion.div>

      {/* Search + Filter Bar */}
      <motion.div
        variants={searchBarVariants}
        className="flex items-center w-full max-w-xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-2xl px-4 py-3 mt-10 shadow-lg"
      >
        {/* Search Icon */}
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={assets.search_icon}
          alt="Search Icon"
          className="w-5 h-5 mr-3 filter invert"
        />

        {/* Input */}
        <motion.input
          type="text"
          placeholder="Search cars by brand, model, or category..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 outline-none text-white bg-transparent placeholder-gray-400"
          whileFocus={{ scale: 1.02 }}
        />

        {/* Filter Icon */}
        <motion.img
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          src={assets.filter_icon}
          alt="Filter Icon"
          className="w-5 h-5 ml-3 cursor-pointer filter invert"
        />
      </motion.div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10 w-full'>
        <AnimatePresence mode="wait">
          {/* Loading state */}
          {loading && (
            <motion.div
              key="loading"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-center py-10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white text-lg"
              >
                Searching for available cars...
              </motion.p>
            </motion.div>
          )}

          {/* Search info */}
          {!loading && isSearchData && (
            <motion.div
              key="search-info"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl border border-blue-500/20"
            >
              <motion.p 
                className="text-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                🔍 Searching cars in <strong className="text-white">{pickupLocation}</strong> from{' '}
                <strong className="text-white">{new Date(pickupDate).toLocaleDateString()}</strong> to{' '}
                <strong className="text-white">{new Date(returnDate).toLocaleDateString()}</strong>
              </motion.p>
            </motion.div>
          )}

          {/* Show all cars info when not searching */}
          {!loading && !isSearchData && (
            <motion.div
              key="all-cars-info"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-gray-900/30 to-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50"
            >
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                🚗 Showing all available premium cars
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white font-semibold text-lg mb-6"
        >
          Showing {displayedCars.length} {displayedCars.length === 1 ? 'Car' : 'Cars'}
        </motion.p>
        
        <AnimatePresence mode="wait">
          {displayedCars.length === 0 && !loading ? (
            <motion.div
              key="no-cars"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🚗
              </motion.div>
              <motion.p 
                className="text-gray-400 text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {isSearchData ? 'No cars available for your search criteria' : 'No cars found'}
              </motion.p>
              <motion.p 
                className="text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Try adjusting your search terms or filters
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="cars-grid"
              variants={cardContainerVariants}
              initial="hidden"
              animate="visible"
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 xl:px-10 max-w-7xl mx-auto'
            >
              <AnimatePresence>
                {displayedCars.map((car, index) => (
                  <motion.div
                    key={car._id || index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                  >
                    <Card car={car} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Cars