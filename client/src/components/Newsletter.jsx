import React from 'react'

export const Newsletter = () => {
  return (
    <section className="relative min-h-[350px] sm:min-h-[600px] md:min-h-[450px] lg:min-h-[300px] flex flex-col items-center justify-center 
      px-4 py-1 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden ">
      
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-26 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-16 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* Newsletter Content */}
      <div className="relative z-10  rounded-2xl flex flex-col items-center justify-center
      p-6 sm:p-8 md:p-12 text-white text-center">
        
        <div className="flex flex-col items-center   max-w-lg md:w-full w-11/12 md:py-8 ">
            <div className="flex items-center justify-center p-3 bg-red-100 rounded-full">
                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/model/faceIcon.svg" alt="faceIcon" />
            </div>
            <h2 className="text-slate-900 font-medium mt-3 text-lg">Enjoying this post?</h2>
            <p className="text-sm text-slate-900/60 mt-1 md:w-80 w-72 text-center">Subscribe to get more content like this delivered to your inbox for free!</p>
            <div className="flex items-center mt-5 w-full md:px-16 px-6">
                <input type="email" placeholder="Enter Your Email" className="text-sm border-r-0 outline-none border border-gray-500/50 pl-3 w-full h-10 rounded-l-md" />
                <button type="button" className="font-medium text-sm text-white bg-gray-900/90 w-36 h-10 rounded-r-md">Subscribe</button>
            </div>
            
        </div>

      </div>
    </section>
  );
};