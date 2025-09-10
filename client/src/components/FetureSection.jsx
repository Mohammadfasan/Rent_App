// FeatureSection.jsx
import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative  px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center overflow-hidden bg-gray-50">
      
      {/* Background Blobs - Same as Hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        {/* Section Title */}
        <Title
  title="Customer Testimonials"
  subTitle="Hear from people who loved our service"
  align="center"
/>
        {/* Car Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full">
  {dummyCarData.slice(0, 3).map((car, index) => (
    <div key={index}>
      <Cards car={car} />
    </div>
  ))}
</div>


        {/* Explore All Cars Button */}
        <button
          onClick={() => navigate("/cars")}
          className="mt-10 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl mb-2"
        >
          <span>Explore All Cars</span>
          <img src={assets.arrow_icon} alt="Arrow Icon" className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default FeatureSection;
