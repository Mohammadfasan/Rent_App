import React, { useState, useEffect } from "react";
import { dummyMyBookingsData, assets } from "../../assets/assets";
import Title from "../../components/Title";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title title="Manage Bookings" subTitle="View and manage your bookings" />

      <div className="w-full overflow-hidden mt-10 rounded-lg border border-borderColor">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border-b">Car</th>
              <th className="p-4 border-b">Pickup Date</th>
              <th className="p-4 border-b">Return Date</th>
              <th className="p-4 border-b">Price</th>
              <th className="p-4 border-b text-center max-md:hidden">Status</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Car Image + Name */}
                  <td className="p-4 border-b flex items-center gap-3">
                    <img
                      src={booking.car.image}
                      alt={booking.car.model}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-800">
                      {booking.car.brand} {booking.car.model}
                    </span>
                  </td>

                  {/* Pickup Date */}
                  <td className="p-4 border-b">
                    {new Date(booking.pickupDate).toLocaleDateString()}
                  </td>

                  {/* Return Date */}
                  <td className="p-4 border-b">
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </td>

                  {/* Price */}
                  <td className="p-4 border-b font-semibold text-gray-800">
                    ${booking.price}
                  </td>

                  {/* Status */}
                  <td className="p-4 border-b text-center max-md:hidden">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 border-b text-center">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={assets.edit_icon}
                        alt="edit"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                        title="Edit Booking"
                      />
                      <img
                        src={assets.delete_icon}
                        alt="delete"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                        title="Cancel Booking"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No bookings found...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
