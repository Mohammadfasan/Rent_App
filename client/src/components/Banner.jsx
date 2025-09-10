import bannerImage from "../assets/banner_car_image.png";

export const Banner = () => {
  return (
    <section className="relative min-h-[350px] sm:min-h-[600px] md:min-h-[450px] lg:min-h-[500px] flex flex-col items-center justify-center 
      px-4 py-1 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden ">

      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-26 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-16 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 bg-gradient-to-r from-purple-600/90 to-blue-500/90 rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 py-8 sm:py-12 text-white">
        
        {/* Left Section - Text */}
        <div className="max-w-lg space-y-4 text-center md:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            Do You Own a Luxury Car?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-100">
            Monetize your vehicle effortlessly by listing it on CarRental.
            <br />
            We take care of insurance, driver verification and secure payments — 
            so you can earn passive income, stress-free.
          </p>
          <button className="bg-white text-blue-600 font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow hover:bg-blue-50 transition">
            List your car
          </button>
        </div>

        {/* Right Section - Car Image */}
        <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
          <img
            src={bannerImage}
            alt="Luxury Car"
            className="w-[240px] sm:w-[300px] md:w-[380px] lg:w-[460px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};
