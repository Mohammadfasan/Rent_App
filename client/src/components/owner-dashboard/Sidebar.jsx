// src/components/owner-dashboard/Sidebar.jsx

import React, { useState } from 'react';
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const user = dummyUserData; 
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateImage = () => {
    console.log("Updating profile picture with:", image.name);
    setImage(null);
  };

  return (
    <div className="flex h-screen flex-col bg-white border-r border-gray-200 w-20 md:w-64 flex-shrink-0 transition-all duration-300 ease-in-out">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center p-4 border-b border-gray-200">
        <div className="group relative">
          <label htmlFor="image">
            <img
              src={preview}
              alt="Profile"
              className="h-16 w-16 md:h-24 md:w-24 rounded-full border-2 border-primary object-cover cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <button
              className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full
                         transform translate-x-1/4 translate-y-1/4
                         hover:bg-primary-dark transition-colors duration-200"
              onClick={updateImage}
            >
              <img src={assets.check_icon} className="h-4 w-4" alt="Save" />
            </button>
          )}
        </div>
        <div className="flex flex-col items-center mt-2">
          {image && (
            <button
              className="mt-2 bg-primary text-white text-sm rounded-md hidden md:flex items-center gap-1"
              onClick={updateImage}
            >
              Save <img src={assets.check_icon} width={13} alt="Save" />
            </button>
          )}
          <p className="mt-2 text-base font-semibold text-gray-700 hidden md:block truncate">{user?.name}</p>
        </div>
      </div>

      {/* Menu Links */}
      <nav className="flex-grow p-4">
        <ul className="flex flex-col gap-y-2">
          {ownerMenuLinks.map((link, index) => {
           const isBackgroundActive = location.pathname.startsWith(link.path); // for BG highlight
           const isIconActive = location.pathname === link.path; // for icon only exact match

            return (
    <li key={index}>
      <NavLink
        to={link.path}
        className={`
          flex items-center gap-x-4 p-3 rounded-lg
          justify-center md:justify-start
          hover:bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600  transition-colors duration-200
        `}
        
      >
        {/* Icon only active on exact match */}
        <img
          src={isIconActive ? link.coloredIcon : link.icon}
          alt={`${link.name} icon`}
          className="h-6 w-6"
        />
        <span className="text-sm font-medium text-gray-700 hidden md:block">
          {link.name}
        </span>
      </NavLink>
    </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;