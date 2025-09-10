import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const foundCar = dummyCarData.find((car) => car?._id === id);
    setCar(foundCar || null);
  }, [id]);

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-red-500">Car not found.</h1>
      </div>
    );
  }
  const HandleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 mt-12 px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen">
      
      {/* Left: Car Image & Details */}
      <div className="lg:flex-1 space-y-6">
        <div className="relative rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-500 text-lg">
            {car.category} · {car.year}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
            <img src={assets.users_icon} alt="Seats" className="w-6 mb-1" />
            <span className="text-sm font-medium text-gray-700">
              {car.seating_capacity} Seats
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
            <img src={assets.fuel_icon} alt="Fuel" className="w-6 mb-1" />
            <span className="text-sm font-medium text-gray-700">
              {car.fuel_type}
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
            <img src={assets.car_icon} alt="Transmission" className="w-6 mb-1" />
            <span className="text-sm font-medium text-gray-700">
              {car.transmission}
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
            <img src={assets.location_icon} alt="Location" className="w-6 mb-1" />
            <span className="text-sm font-medium text-gray-700">
              {car.location}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mt-4 leading-relaxed">{car.description}</p>

        {/* Car Features - 🔥 margin reduced (mt-2 instead of mt-4) */}
        <div className="mt-2 lg:mt-4 lg:mb-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Car Features
          </h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside">
            <li className="text-gray-700 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Air Conditioning
            </li>
            <li className="text-gray-700 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Leather Seats
            </li>
            <li className="text-gray-700 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Bluetooth Connectivity
            </li>
            <li className="text-gray-700 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Backup Camera
            </li>
            <li className="text-gray-700 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              GPS Navigation
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Booking Card (compact on lg devices) */}
      <div className="lg:w-1/3 bg-white p-6 lg:p-4 rounded-2xl shadow-lg space-y-5 lg:sticky lg:top-32 lg:max-h-[420px]">
        <p className="text-2xl font-bold text-gray-800 lg:text-xl">
          ${car.pricePerDay}{" "}
          <span className="text-gray-500 text-base font-normal">/ day</span>
        </p>

        <div className="space-y-2 lg:space-y-1">
          <label className="text-gray-500 font-medium text-sm">Pickup Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2 lg:p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2 lg:space-y-1">
          <label className="text-gray-500 font-medium text-sm">Return Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2 lg:p-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button  onClick={HandleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-base lg:text-sm">
          Book Now
        </button>

        <p className="text-gray-400 text-sm lg:text-xs mt-1 text-center">
          No credit card required to reserve
        </p>
      </div>
    </div>
  );
};

export default CarDetails;
