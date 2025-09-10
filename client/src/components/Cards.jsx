import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Cards = ({ car }) => {
  const navigate = useNavigate();

  // Add a check to ensure 'car' exists before rendering anything
  if (!car) {
    return null; // Or some placeholder/error message
  }

  const handleClick = () => {
    // Add a check for car._id before navigating
    if (car._id) {
      navigate(`/car-details/${car._id}`);
      window.scrollTo(0, 0); // Corrected from scrollTo(0,0)
    }
  };

  return (
    <div
      onClick={handleClick}
      className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 
      shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
    >
      {/* Car Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={car.image || assets.placeholder_car_image} // Add a fallback image
          alt={car.brand + " " + car.model || "Car image"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price Badge */}
        <p
          className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 
          text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md"
        >
          ${car.pricePerDay || "N/A"} / day
        </p>

        {/* Availability Badge */}
        {(car.isAvailable || car.isAvaliable) && (
          <p
            className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 
            rounded-full shadow-md animate-pulse"
          >
            Available Now
          </p>
        )}
      </div>

      {/* Car Details Section */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">
          {car.brand || "Unknown"} {car.model || "Car"}
        </h3>
        <p className="text-sm text-gray-600 mt-0.5">
          {car.category || "Unknown"} · {car.year || "N/A"}
        </p>

        {/* Car Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-blue-100">
              <img
                src={assets.users_icon}
                alt="Seats"
                className="w-4 h-4 text-blue-600"
              />
            </div>
            <span>{car.seating_capacity || "N/A"} Seats</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-green-100">
              <img
                src={assets.fuel_icon}
                alt="Fuel"
                className="w-4 h-4 text-green-600"
              />
            </div>
            <span>{car.fuel_type || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-purple-100">
              <img
                src={assets.car_icon}
                alt="Transmission"
                className="w-4 h-4 text-purple-600"
              />
            </div>
            <span>{car.transmission || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-orange-100">
              <img
                src={assets.location_icon}
                alt="Location"
                className="w-4 h-4 text-orange-600"
              />
            </div>
            <span>{car.location || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;