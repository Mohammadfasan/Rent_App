import React, { useState } from "react";
import Title from "../../components/owner-dashboard/Title";
import { assets } from "../../assets/assets";

const AddCar = () => {
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
  });

  // handle text inputs
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Car Data:", car);
    console.log("Car Image:", image);
    // TODO: send data to backend / firebase
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add New Car" subTitle="Fill in the details below" />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div>
          <label htmlFor="car-image" className="mb-2 block">
            Car Image
          </label>
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_icon}
            alt="Car"
            className="w-full h-64 object-cover border border-gray-300 rounded-md cursor-pointer"
            onClick={() => document.getElementById("car-image").click()}
          />
          <input
            type="file"
            id="car-image"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Brand & Model */}
        <div className="flex gap-3">
          <input
            type="text"
            name="brand"
            value={car.brand}
            onChange={onChangeHandler}
            placeholder="e.g BMW, Mercedes, Audi"
            className="rounded-md p-2 mt-2 w-full border border-gray-300"
          />
          <input
            type="text"
            name="model"
            value={car.model}
            onChange={onChangeHandler}
            placeholder="e.g X5, GLA, A6"
            className="rounded-md p-2 mt-2 w-full border border-gray-300"
          />
        </div>

        {/* Add other fields like year, category, price, etc */}
        <input
          type="number"
          name="year"
          value={car.year}
          onChange={onChangeHandler}
          placeholder="Year"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        <input
          type="text"
          name="category"
          value={car.category}
          onChange={onChangeHandler}
          placeholder="Category (e.g SUV, Sedan)"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        <textarea
          name="description"
          value={car.description}
          onChange={onChangeHandler}
          placeholder="Description"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        <input
          type="number"
          name="pricePerDay"
          value={car.pricePerDay}
          onChange={onChangeHandler}
          placeholder="Price per day"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        <input
          type="text"
          name="location"
          value={car.location}
          onChange={onChangeHandler}
          placeholder="Location"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        <input
          type="text"
          name="fuelType"
          value={car.fuelType}
          onChange={onChangeHandler}
          placeholder="Fuel type (Petrol, Diesel, Electric)"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        <input
          type="number"
          name="seatingCapacity"
          value={car.seatingCapacity}
          onChange={onChangeHandler}
          placeholder="Seating Capacity"
          className="rounded-md p-2 mt-2 border border-gray-300"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
