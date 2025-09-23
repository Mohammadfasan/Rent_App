import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CarMange = () => {
  const [car, setCar] = useState([]);
  const { isOwner, axios } = useAppContext();

  const fetchCarData = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars');
      if (data.success) {
        setCar(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchCarData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?");
      if (!confirm) return;
      
      const { data } = await axios.post('/api/owner/delete-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchCarData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchCarData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Cars" subTitle="View and manage your car listings" />

      <div className="w-full overflow-hidden mt-10 rounded-lg border border-borderColor">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-4 border-b text-left">Image</th>
              <th className="p-4 border-b text-left">Brand & Model</th>
              <th className="p-4 border-b text-left">Price/Day</th>
              <th className="p-4 border-b text-center max-md:hidden">Status</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {car && car.length > 0 ? (
              car.map((carItem, index) => (
                <tr key={index} className="hover:bg-gray-900">
                  <td className="p-4 border-b">
                    <img
                      src={carItem.image}
                      alt={carItem.model}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 border-b">
                    {carItem.brand} {carItem.model}
                  </td>
                  <td className="p-4 border-b">${carItem.pricePerDay}</td>
                  <td className="p-4 border-b text-center max-md:hidden">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        carItem.isAvailable
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {carItem.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="p-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={carItem.isAvailable ? assets.eye_close_icon : assets.open_icon}
                        alt="toggle"
                        className="w-9 h-9 cursor-pointer hover:scale-110 transition filter invert brightness-0"
                        onClick={() => toggleAvailability(carItem._id)}
                      />
                      <img
                        src={assets.delete_icon}
                        alt="delete"
                        className="w-9 h-9 cursor-pointer hover:scale-110 transition tex-red-800 filter invert brightness-0"
                        onClick={() => deleteCar(carItem._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  {car.length === 0 ? "No cars found" : "Loading..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarMange;