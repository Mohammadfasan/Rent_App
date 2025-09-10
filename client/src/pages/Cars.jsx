import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import Card from '../components/Cards'
export const Cars = () => {
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
      <Title
        title="Available Cars"
        subTitle="Choose your favorite car from our collection."
      />

      {/* Search + Filter Bar */}
      <div className="flex items-center w-full max-w-xl bg-white border border-gray-300 rounded-lg px-3 py-2 mt-10 shadow-sm">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="Search Icon"
          className="w-5 h-5 mr-2"
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search cars..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 outline-none text-gray-700"
        />

        {/* Filter Icon */}
        <img
          src={assets.filter_icon}
          alt="Filter Icon"
          className="w-5 h-5 ml-2 cursor-pointer"
        />
      </div>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        {/* Car Cards */}
        <p>Showing {dummyCarData.length} Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 xl:px-10 max-w-7xl mx-auto'>
          {dummyCarData.map((car,index)=>
          <div key={index}>
            <Card car={car} />
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Cars
