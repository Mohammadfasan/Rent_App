import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext(); 
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      
      const { data } = await axios.post('/api/owner/update-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (data.success) {
        await fetchUser();
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error(error.response?.data?.message || "Failed to update image");
    }
  };

  return (
    <div className="flex h-screen-full flex-col bg-gradient-to-br from-gray-900 via-black to-gray-950 border-r border-gray-700 w-20 md:w-64 flex-shrink-0 transition-all duration-300 ease-in-out">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center p-4 border-b border-gray-700">
        <div className="group relative">
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={preview || user?.image || assets.default_avatar}
              alt="Profile"
              className="h-16 w-16 md:h-24 md:w-24 rounded-full border-2 border-primary object-cover"
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
              className="mt-2 bg-primary text-white px-3 py-1 text-sm rounded-md hidden md:flex items-center gap-1"
              onClick={updateImage}
            >
              <img src={assets.check_icon} width={13} alt="Save" />
              Save
            </button>
          )}
          <p className="mt-2 text-base font-semibold text-white hidden md:block truncate">
            {user?.name}
          </p>
        </div>
      </div>

      {/* Menu Links */}
      <nav className="flex-grow p-4">
        <ul className="flex flex-col gap-y-2">
          {ownerMenuLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  flex items-center gap-x-4 p-3 rounded-lg
                  justify-center md:justify-start
                  transition-colors duration-200
                  ${isActive ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-600 text-white' : 
                              'hover:bg-gradient-to-r from-purple-800/50 via-indigo-800/50 to-blue-800/50 text-gray-300 hover:text-white'}
                `}
                end={link.path === '/owner-dashboard'}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? link.coloredIcon : link.icon}
                      alt={`${link.name} icon`}
                      className="h-6 w-6"
                    />
                    <span className="text-sm font-medium hidden md:block">
                      {link.name}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;