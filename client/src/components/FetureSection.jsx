// FeatureSection.jsx
import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const FeatureSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center overflow-hidden">
      {/* Content - No background, will use Hero's background */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center py-16">
        {/* Section Title */}
        <Title
          title="Featured Luxury Cars"
          subTitle="Explore our handpicked selection of premium vehicles, ready for your next adventure."
          align="center"
        />
        
        {/* Car Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full">
          {cars.slice(0, 3).map((car, index) => (
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