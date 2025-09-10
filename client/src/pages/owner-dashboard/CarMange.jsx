import React from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/Title";

const CarMange = () => {
  const [car, setCar] = React.useState(null);

  const fetchCarData = async () => {
    setCar(dummyCarData);
  };

  React.useEffect(() => {
    fetchCarData();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Cars" subTitle="View and manage your car listings" />

      <div className="w-full overflow-hidden mt-10 rounded-lg border border-borderColor">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border-b text-left">Image</th>
              <th className="p-4 border-b text-left">Category</th>
              <th className="p-4 border-b text-left">Price</th>
              <th className="p-4 border-b text-center max-md:hidden">Status</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {car ? (
              car.map((car, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border-b">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 border-b">{car.brand}</td>
                  <td className="p-4 border-b">${car.pricePerDay}</td>
                  <td className="p-4 border-b text-center max-md:hidden">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        car.isAvaliable
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.isAvaliable ? "Available" : "Not Available"}
                    </span>
                  </td>
                  {/* ✅ Updated Actions column */}
                  <td className="p-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={
                          car.isAvaliable
                            ? assets.eye_close_icon
                            : assets.open_icon
                        }
                        alt="toggle"
                        className="w-8 h-8 cursor-pointer hover:scale-110 transition" width={20}
                      />
                      <img
                        src={assets.delete_icon}
                        alt="delete"
                        className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Loading...
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
