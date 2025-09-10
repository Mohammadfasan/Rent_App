import React from 'react';

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

  return (
    <section className="relative min-h-[350px] sm:min-h-[600px] md:min-h-[450px] lg:min-h-[500px] flex flex-col items-center justify-center 
      px-4 py-1 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden ">
      
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-26 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-16 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      
        
        {/* Heading Section */}
        <div className="max-w-xl text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-100">
            Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {carRentals.map((rental) => (
            <div key={rental.id} className="text-sm w-80 pb-6 rounded-lg bg-white shadow-md overflow-hidden text-gray-800">
              
              {/* User Info */}
              <div className="flex items-center gap-4 px-5 py-4 bg-blue-100/20">
                <img className="h-12 w-12 rounded-full" src={rental.userImage} alt={rental.userName} />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">{rental.userName}</h1>
                  <p className="text-gray-800/80">{rental.userRole}</p>
                </div>
              </div>

              {/* Car & Review */}
              <div className="p-5 pb-7">
                <h2 className="text-gray-700 font-medium">{rental.carName}</h2>
                <p className="text-gray-500 text-sm mb-2">Rental Period: {rental.rentalPeriod}</p>
                <p className="text-gray-500">{rental.review}</p>

                {/* Rating */}
                <div className="flex gap-0.5 mt-3">
                  {Array(rental.rating).fill(0).map((_, i) => (
                    <svg key={i} width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

    </section>
  );
};