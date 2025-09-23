import React, { useState } from "react";
import Title from "../../components/owner-dashboard/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { axios } = useAppContext();
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    category: "",
    description: "",
    pricePerDay: "",
    location: "",
    fuelType: "",
    seatingCapacity: "",
    transmission: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    if (
      !car.brand ||
      !car.model ||
      !car.pricePerDay ||
      !car.transmission ||
      !car.fuelType ||
      !car.seatingCapacity
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const carData = {
        brand: car.brand,
        model: car.model,
        year: car.year,
        category: car.category,
        description: car.description,
        pricePerDay: car.pricePerDay,
        location: car.location,
        fuel_type: car.fuelType,
        seating_capacity: car.seatingCapacity,
        transmission: car.transmission,
      };

      formData.append("carData", JSON.stringify(carData));

      const { data } = await axios.post("/api/owner/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: "",
          category: "",
          description: "",
          pricePerDay: "",
          location: "",
          fuelType: "",
          seatingCapacity: "",
          transmission: "",
        });
      } else {
        toast.error(data.message || "Failed to add car");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 md:px-6 flex-1 h-full overflow-y-auto ">
      <Title title="Add New Car" subTitle="Fill in the details below" />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 text-gray-300 text-sm mt-4 max-w-3xl mx-auto h-full"
      >
        {/* Scrollable form content */}
        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
          {/* Car Image */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="car-image"
              className="mb-2 block text-gray-200 text-center font-medium"
            >
              Car Image *
            </label>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Car"
              className="w-48 h-36 object-cover border-2 border-dashed border-gray-600 rounded-lg cursor-pointer mx-auto hover:border-blue-500 transition-colors"
              onClick={() => document.getElementById("car-image").click()}
            />
            <p className="text-gray-400 text-xs mt-1 text-center">
              Click to upload image
            </p>
            <input
              type="file"
              id="car-image"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          {/* Grid layout for inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand */}
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={onChangeHandler}
              placeholder="Brand (e.g BMW, Mercedes) *"
              className="rounded-md p-2 w-full border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            {/* Model */}
            <input
              type="text"
              name="model"
              value={car.model}
              onChange={onChangeHandler}
              placeholder="Model (e.g X5, GLA) *"
              className="rounded-md p-2 w-full border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            {/* Year */}
            <input
              type="number"
              name="year"
              value={car.year}
              onChange={onChangeHandler}
              placeholder="Year *"
              min="1900"
              max={new Date().getFullYear() + 1}
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            {/* Category */}
            <input
              type="text"
              name="category"
              value={car.category}
              onChange={onChangeHandler}
              placeholder="Category (SUV, Sedan, etc) *"
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            {/* Price per day */}
            <input
              type="number"
              name="pricePerDay"
              value={car.pricePerDay}
              onChange={onChangeHandler}
              placeholder="Price per day *"
              min="0"
              step="0.01"
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            {/* Location */}
            <input
              type="text"
              name="location"
              value={car.location}
              onChange={onChangeHandler}
              placeholder="Location *"
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            {/* Fuel Type */}
            <select
              name="fuelType"
              value={car.fuelType}
              onChange={onChangeHandler}
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="" className="bg-gray-800">Select Fuel Type *</option>
              <option value="Petrol" className="bg-gray-800">Petrol</option>
              <option value="Diesel" className="bg-gray-800">Diesel</option>
              <option value="Electric" className="bg-gray-800">Electric</option>
              <option value="Hybrid" className="bg-gray-800">Hybrid</option>
            </select>

            {/* Transmission */}
            <select
              name="transmission"
              value={car.transmission}
              onChange={onChangeHandler}
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="" className="bg-gray-800">Select Transmission *</option>
              <option value="Manual" className="bg-gray-800">Manual</option>
              <option value="Automatic" className="bg-gray-800">Automatic</option>
            </select>

            {/* Seating Capacity */}
            <select
              name="seatingCapacity"
              value={car.seatingCapacity}
              onChange={onChangeHandler}
              className="rounded-md p-2 border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="" className="bg-gray-800">Select Seating Capacity *</option>
              <option value="2" className="bg-gray-800">2 Seaters</option>
              <option value="4" className="bg-gray-800">4 Seaters</option>
              <option value="5" className="bg-gray-800">5 Seaters</option>
              <option value="7" className="bg-gray-800">7 Seaters</option>
              <option value="8" className="bg-gray-800">8+ Seaters</option>
            </select>

            {/* Description (full width) */}
            <textarea
              name="description"
              value={car.description}
              onChange={onChangeHandler}
              placeholder="Description *"
              rows="3"
              className="col-span-1 md:col-span-2 rounded-md p-2 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              required
            />
          </div>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="pt-2 border-t border-gray-700">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-md transition font-medium hover:from-blue-700 hover:to-purple-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-blue-500/20"
            }`}
          >
            {isLoading ? "Listing..." : "List your Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;