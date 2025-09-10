import React, { useEffect, useState } from 'react';
import { assets, dummyMyBookingsData } from '../assets/assets';
import Title from '../components/Title';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto py-10">
      <Title title="My Bookings" subTitle="Manage your bookings" />

      <div className="space-y-6 md:space-y-8">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={booking._id || index}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out p-4 md:p-6"
            >
              {/* Car Image + Details */}
              <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                <img
                  src={booking.car?.image}
                  alt={booking.car?.model || "Car"}
                  className="w-full h-40 md:h-44 rounded-xl object-cover mb-4 shadow-sm"
                />
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {booking.car?.brand} {booking.car?.model}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.car?.year} · {booking.car?.category} · {booking.car?.location}
                </p>
              </div>

              {/* Booking Info */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  <span className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    Booking #{index + 1}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {booking.status || "pending"}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt="calendar"
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Rental Period</p>
                    <p className="text-base font-semibold text-gray-800">
                      {booking.pickupDate ? booking.pickupDate.split('T')[0] : "N/A"} →{" "}
                      {booking.returnDate ? booking.returnDate.split('T')[0] : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    src={assets.location_icon}
                    alt="location"
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Pick-up Location</p>
                    <p className="text-base font-semibold text-gray-800">{booking.car?.location || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="md:col-span-1 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <h1 className="text-3xl font-bold text-primary">{booking.price || "N/A"}</h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Booked on {booking.date ? booking.date.split('T')[0] : "N/A"}
                  </p>
                </div>
                <button className="mt-4 w-full px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You don't have any bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;