import React from 'react';
import { motion } from 'framer-motion';

export const Testimonial = () => {
  const carRentals = [
    {
      id: 1,
      userName: "Donald Jackman",
      userRole: "BMW X5 Renter",
      userImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100",
      carName: "BMW X5",
      rentalPeriod: "3 days",
      review: "The BMW X5 was amazing! Smooth booking and the car was in perfect condition.",
      rating: 5,
    },
    {
      id: 2,
      userName: "Richard Nelson",
      userRole: "Toyota Corolla Renter",
      userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
      carName: "Toyota Corolla",
      rentalPeriod: "5 days",
      review: "CarRental handled everything perfectly. The car was clean and well-maintained.",
      rating: 5,
    },
    {
      id: 3,
      userName: "James Washington",
      userRole: "Jeep Wrangler Renter",
      userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
      carName: "Jeep Wrangler",
      rentalPeriod: "2 days",
      review: "Awesome experience! The Jeep was powerful and the process was hassle-free.",
      rating: 5,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        
        {/* Heading Section with Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-xl text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Customers</span> Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Discover why discerning travelers choose Wheelify for their luxury car rentals around Sri Lanka.
          </p>
        </motion.div>

        {/* Testimonial Cards with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {carRentals.map((rental, index) => (
            <motion.div
              key={rental.id}
              variants={cardVariants}
              whileHover="hover"
              className="text-sm w-80 pb-6 rounded-lg bg-gray-900/80 backdrop-blur-md shadow-lg overflow-hidden text-gray-300 border border-gray-700/50 hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
            >
              
              {/* User Info with Gradient Background */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40"
              >
                <motion.img 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="h-12 w-12 rounded-full border-2 border-white/20"
                  src={rental.userImage} 
                  alt={rental.userName}
                />
                <div>
                  <motion.h1 
                    whileHover={{ x: 5 }}
                    className="text-lg font-medium text-white"
                  >
                    {rental.userName}
                  </motion.h1>
                  <motion.p 
                    whileHover={{ x: 5 }}
                    className="text-gray-300/80 text-sm"
                  >
                    {rental.userRole}
                  </motion.p>
                </div>
              </motion.div>

              {/* Car & Review */}
              <motion.div 
                className="p-5 pb-7"
                whileHover={{ backgroundColor: 'rgba(17, 24, 39, 0.9)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  whileHover={{ color: '#ffffff' }}
                  className="text-gray-200 font-medium mb-1"
                >
                  {rental.carName}
                </motion.h2>
                <motion.p 
                  whileHover={{ color: '#d1d5db' }}
                  className="text-gray-400 text-sm mb-3"
                >
                  Rental Period: {rental.rentalPeriod}
                </motion.p>
                <motion.p 
                  whileHover={{ color: '#e5e7eb' }}
                  className="text-gray-400 leading-relaxed"
                >
                  {rental.review}
                </motion.p>

                {/* Animated Rating Stars */}
                <motion.div 
                  className="flex gap-0.5 mt-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                >
                  {Array(rental.rating).fill(0).map((_, i) => (
                    <motion.svg 
                      key={i}
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      width="22" 
                      height="20" 
                      viewBox="0 0 22 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" 
                        fill="#FFC107"
                      />
                    </motion.svg>
                  ))}
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(to right, #2563eb, #7c3aed)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            Read More Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};