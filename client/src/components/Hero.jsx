import React, { useState } from "react";
import carImage from "../assets/car.png";

export default function Hero() {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center 
      px-4 py-16 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden"
    >
      {/* Background design - Refined glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">
        {/* Heading of the section */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-10 sm:mb-12 text-gray-900 leading-tight drop-shadow-lg">
          Pick Your <span className="text-blue-600">Dream Ride</span>
        </h1>

        {/* Search Form - Modified Design */}
        <div
          className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-4xl 
          grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6
          transition-all duration-300 transform hover:scale-[1.01] hover:shadow-3xl"
        >
          {/* Pickup Location */}
          <div className="flex flex-col text-sm w-full">
            <label className="font-semibold mb-1 text-gray-700">
              Pickup Location
            </label>
            <select
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Please select a location</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col text-sm w-full">
            <label className="font-semibold mb-1 text-gray-700">
              Pick-up Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col text-sm w-full">
            <label className="font-semibold mb-1 text-gray-700">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          {/* Search Button */}
            <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
              <button
                type="button"
               
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full
                flex items-center justify-center gap-2
                hover:from-blue-700 hover:to-purple-700 transition-all duration-200 ease-in-out
                shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {/* Search icon from a public CDN */}
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Search</span>
              </button>
            </div>
          
        </div>

        {/* Car Image - Enhanced styling */}
        <div className="relative mt-10 w-full max-w-4xl">
          <img
            src={carImage}
            alt="Luxury Car"
            className="w-full h-auto   transition-transform duration-500 transform hover:scale-105"
          />
          {/* Glow effect behind car - updated color and size */}
          <div className="absolute -z-10 inset-0 flex justify-center items-center">
            <div className="w-[80%] h-[40%] bg-blue-400/30 blur-3xl rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}